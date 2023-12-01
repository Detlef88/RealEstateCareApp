import { createStore } from 'vuex';
import router from '@/router';
import axios from 'axios';

// API URLs and access keys
const reportsJsonBin = 'https://api.jsonbin.io/v3/b/655223f90574da7622c60f35?meta=false'
const reportsJsonAccessKey = { 'X-Access-Key': '$2a$10$bebL2uGSKqniJxYQgKr4SesdUPmE6je/vdzFWnn5Dm8FyPWNyhPxG' }
const usersJsonBin = 'https://api.jsonbin.io/v3/b/6559f3510574da7622c8cbfc?meta=false'
const usersJsonAccessKey = { 'X-Access-Key': '$2a$10$AMIoeVZnxdhmCkOAwb90H.XdQ1QlBdGqAzgzpr/K1Bv5eNoRRlTtO' }

export default createStore({
    state: {
        reports: [],
        user: null,
        authCode: null,
        authUser: false,
        successes: [],
        errors: [],
        logoutTimer: null,
    },
    mutations: {
        // Sets the authenticated user and generates an authentication code
        SET_USER(state, user) {
          // Generate a random 6-digit number for authentication
          const authenticationCode = Math.floor(100000 + Math.random() * 900000);
          
          // Append authCode to the user object and set the user state
          state.authCode = authenticationCode;
          state.user = user;
        },
      
        // Sets authentication status and clears the authentication code
        SET_AUTH(state) {
          state.authCode = null;
          state.authUser = true;
        },
      
        // Unsets the user and resets the authentication status
        UNSET_USER(state) {
          state.user = null;
          state.authUser = false;
        },
      
        // Reads and sets reports data in the state
        READ_REPORTS(state, payload) {
          state.reports = payload;
        },
      
        // Updates a specific report in the state
        UPDATE_REPORT(state, payload) {
          const index = state.reports.findIndex(report => report.id === payload.id);
          if (index !== -1) {
            state.reports.splice(index, 1, payload);
          } else {
            state.reports.push(payload);
          }
          // Removes pending report data from local storage
          localStorage.removeItem('pendingReport');
        },
      
        // Updates the status of a report in the state
        UPDATE_REPORT_STATUS(state, { index, status }) {
          if (index !== -1) {
            state.reports[index].status = status;
          }
        },
      
        // Adds success message to state
        ADD_SUCCESS(state, payload) {
          state.successes = [payload];
        },
      
        // Adds error message to state
        ADD_ERROR(state, payload) {
          state.errors = [payload];
        },
      
        // Clears success messages from state
        CLEAR_SUCCESSES(state) {
          state.successes = [];
        },
      
        // Clears error messages from state
        CLEAR_ERRORS(state) {
          state.errors = [];
        }
      },
      
    getters: {
        openReports: state => state.reports.filter(report => report.status === 'Open'),
        closedReports: state => state.reports.filter(report => report.status === 'Closed'),
    },
    actions: {
        // Resets the logout timer after a specified time interval
        resetLogoutTimer(context) {
            // Clears the existing timeout
            clearTimeout(context.state.logoutTimer);
            // Sets a new timeout for logout after 15 minutes
            context.state.logoutTimer = setTimeout(() => {
                context.dispatch('logoutUser');
            }, 900000); // 15 minutes in milliseconds
        },
        // Clears the successes array in the state
        clearSuccesses(context) {
            context.commit('CLEAR_SUCCESSES');
        },
        // Clears the errors array in the state
        clearErrors(context) {
            context.commit('CLEAR_ERRORS');
        },
        // Authenticates a user based on email and password
        loginUser(context, { email, password }) {
            // Fetches user data from an external API
            return axios.get(usersJsonBin, { headers: usersJsonAccessKey })
            .then((response) => {
                // Processes the retrieved user data
                const users = response.data;
                const foundUser = users.find(user => user.email === email && user.password === password);

                if (foundUser) {
                    // Set user and authentication code
                    context.commit('SET_USER', foundUser);
                    context.commit('ADD_SUCCESS', 'Login successful');
                    router.push('/authentication');

                    // Reset the logout timer function
                    context.dispatch('resetLogoutTimer');

                    // Add event listeners to reset the logout timer on user interaction
                    window.addEventListener('mousemove', () => context.dispatch('resetLogoutTimer'));
                    window.addEventListener('keydown', () => context.dispatch('resetLogoutTimer'));
                    window.addEventListener('touchstart', () => context.dispatch('resetLogoutTimer'));
                    window.addEventListener('touchmove', () => context.dispatch('resetLogoutTimer'));

                } else {
                    context.commit('ADD_ERROR', 'Invalid credentials');
                }
            })
            .catch((error) => {
                // Handles errors during user login
                context.commit('ADD_ERROR', error);
            });
        },
        // Authenticates the user based on an authentication code
        authenticateUser(context, userCode) {
            // Authenticates the user based on the provided code
            if (userCode === context.state.authCode) {
                context.commit('SET_AUTH');
                context.commit('ADD_SUCCESS', 'Authentication successful');
                router.push('/home');
            } else {
                context.commit('ADD_ERROR', 'Incorrect authentication code');
            }
        },
        // Logs out the user and clears user data from the state
        logoutUser(context) {
            // Clears the logout timer
            clearTimeout(context.state.logoutTimer);

            // Removes event listeners for resetting the timer
            window.removeEventListener('mousemove', () => context.dispatch('resetLogoutTimer'));
            window.removeEventListener('keydown', () => context.dispatch('resetLogoutTimer'));
            window.removeEventListener('touchstart', () => context.dispatch('resetLogoutTimer'));
            window.removeEventListener('touchmove', () => context.dispatch('resetLogoutTimer'));

            // Unsets user data and navigates to the login page
            context.commit('UNSET_USER');
            router.push('/login');
        },
        // Fetches reports from an external API
        fetchReports(context) {
            // Retrieves reports data from an external API
            return axios.get(reportsJsonBin, { headers: reportsJsonAccessKey })
            .then((response) => {
                // Processes the retrieved reports data
                context.commit('ADD_SUCCESS', 'Reports loaded successfully');
                context.commit('READ_REPORTS', response.data);
            })
            .catch((error) => {
                // Handles errors during report fetching
                context.commit('ADD_ERROR', error);
            });
        },
        // Updates a specific report based on the payload
        updateReport(context, payload) {
            // Searches for the index of the report to update
            const index = context.state.reports.findIndex(report => report.id === payload.id);
    
            // If the report is found in the state
            if (index !== -1) {
                const reportsKey = payload.modalType;

                // Merges the updated report data with existing report data
                context.state.reports[index].reports[reportsKey] = {
                    ...context.state.reports[index].reports[reportsKey],
                    ...payload.reports[reportsKey],
                };
    
            // Commits success message for updating the report
            context.commit('ADD_SUCCESS', 'Report saved successfully');
            // Updates the report in the state
            context.commit('UPDATE_REPORT', context.state.reports[index]);
            } else {
                // Commits error message for report not found in the state
                context.commit('ADD_ERROR', error);
                // Stores the pending report data in local storage
                localStorage.setItem('pendingReport', JSON.stringify(payload));
            }
        },
        // Updates reports data on an external API
        updateReportsJsonBin(context, updatedReports) {
            // Updates reports data on an external API
            return axios.put(reportsJsonBin, updatedReports, { headers: reportsJsonAccessKey })
            .then(() => {
                // Logs successful update to the API
                console.log('JSONBin updated successfully');
            })
            .catch(error => {
                // Handles errors during reports update on the API
                context.commit('ADD_ERROR', error);
            });
        },
        // Marks a report as complete and saves it to the server
        completeReport(context, reportId) {
            // Searches for the index of the report to mark as complete
            const index = context.state.reports.findIndex(report => report.id === reportId);

            // If the report is found in the state
            if (index !== -1) {
                // Marks the report status as 'Closed'
                context.commit('UPDATE_REPORT_STATUS', { index, status: 'Closed' });
        
                // Retrieves the updated reports
                const updatedReports = context.state.reports;
        
                // Dispatches an action to update the reports on the server
                return context.dispatch('updateReportsJsonBin', updatedReports)
                    .then(() => {
                        // Commits success message for completing and saving the report to the server
                        context.commit('ADD_SUCCESS', 'Report completed and saved to server successfully');
                    })
                    .catch(error => {
                        // Handles errors during the reports update on the server
                        context.commit('ADD_ERROR', error);
                    });
            } else {
                // Commits error message if the report is not found in the state
                context.commit('ADD_ERROR', error);
                // Stores the pending report data in local storage
                localStorage.setItem('pendingReport', JSON.stringify(payload));
            }
        }
    }
});
