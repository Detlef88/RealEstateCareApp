import { createStore } from 'vuex';
import router from '@/router';
import axios from 'axios';

const reportsJsonBin = 'https://api.jsonbin.io/v3/b/655223f90574da7622c60f35?meta=false'
const reportsJsonAccessKey = { 'X-Access-Key': '$2a$10$bebL2uGSKqniJxYQgKr4SesdUPmE6je/vdzFWnn5Dm8FyPWNyhPxG' }

const usersJsonBin = 'https://api.jsonbin.io/v3/b/6559f3510574da7622c8cbfc?meta=false'
const usersJsonAccessKey = { 'X-Access-Key': '$2a$10$AMIoeVZnxdhmCkOAwb90H.XdQ1QlBdGqAzgzpr/K1Bv5eNoRRlTtO' }

export default createStore({
    state: {
        reports: [],
        user: null,
        authCode: null,
        errors: [],
        success: [],
        logoutTimer: null,
    },
    mutations: {
        SET_USER(state, user) {
            // Generate a random 6-digit number
            const authenticationCode = Math.floor(100000 + Math.random() * 900000);
            
            // Append authCode to the user object
            state.authCode = authenticationCode;

            state.user = user;
        },
        UNSET_USER(state) {
            state.user = null;
            localStorage.removeItem('user'); // Clear user data on logout
        },
        READ_REPORTS(state, payload) {
            state.reports = payload
        },
        UPDATE_REPORT(state, payload) {
            const index = state.reports.findIndex((report) => report.id === payload.id);
            if (index !== -1) {
                state.reports.splice(index, 1, payload);
            } else {
                state.reports.push(payload);
            }
            localStorage.removeItem('pendingReport');
        },
        UPDATE_REPORT_STATUS(state, { index, status }) {
            if (index !== -1) {
                state.reports[index].status = status;
            }
        },
        ADD_ERROR(state, payload) {
            state.errors = [...state.errors, payload]
        }
    },
    getters: {
        openReports: state => state.reports.filter(report => report.status === 'Open'),
        closedReports: state => state.reports.filter(report => report.status === 'Closed'),
    },
    actions: {
        resetLogoutTimer(context) {
            clearTimeout(context.state.logoutTimer);
            context.state.logoutTimer = setTimeout(() => {
                context.dispatch('logoutUser');
            }, 900000); // 15 minutes in milliseconds
        },
        loginUser(context, { email, password }) {
            return axios.get(usersJsonBin, { headers: usersJsonAccessKey })
            .then((response) => {
                const users = response.data;
                const foundUser = users.find(user => user.email === email && user.password === password);

                if (foundUser) {
                    context.commit('SET_USER', foundUser);
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
                context.commit('ADD_ERROR', error);
            });
        },
        authenticateUser(context, userCode) {
            if (userCode === context.state.authCode) {
                // Authenticated successfully, navigate to home
                router.push('/home');
            } else {
                // Incorrect authentication code, handle accordingly (e.g., show an error)
                context.commit('ADD_ERROR', 'Incorrect authentication code');
            }
        },
        logoutUser(context) {
            clearTimeout(context.state.logoutTimer);

            window.removeEventListener('mousemove', () => context.dispatch('resetLogoutTimer'));
            window.removeEventListener('keydown', () => context.dispatch('resetLogoutTimer'));
            window.removeEventListener('touchstart', () => context.dispatch('resetLogoutTimer'));
            window.removeEventListener('touchmove', () => context.dispatch('resetLogoutTimer'));

            context.commit('UNSET_USER');
            router.push('/login'); // Redirect to the login page after logout
        },
        fetchReports(context) {
            return axios.get(reportsJsonBin, { headers: reportsJsonAccessKey })
            .then((response) => {
                context.commit('READ_REPORTS', response.data);
            })
            .catch((error) => {
                context.commit('ADD_ERROR', error);
            });
        },
        updateReport(context, payload) {
            const index = context.state.reports.findIndex(report => report.id === payload.id);
    
            if (index !== -1) {
                const reportsKey = payload.modalType;
                context.state.reports[index].reports[reportsKey] = {
                    ...context.state.reports[index].reports[reportsKey],
                    ...payload.reports[reportsKey],
                };
    
            context.commit('UPDATE_REPORT', context.state.reports[index]);
            } else {
                context.commit('ADD_ERROR', ('Report not found for ID ' + reportId));
                localStorage.setItem('pendingReport', JSON.stringify(payload));
            }
        },
        updateReportsJsonBin(context, updatedReports) {
            return axios.put(reportsJsonBin, updatedReports, { headers: reportsJsonAccessKey })
            .then(() => {
                console.log('JSONBin updated successfully');
            })
            .catch(error => {
                context.commit('ADD_ERROR', error);
            });
        },
        completeReport(context, reportId) {
            const index = context.state.reports.findIndex(report => report.id === reportId);
            if (index !== -1) {
                context.commit('UPDATE_REPORT_STATUS', { index, status: 'Closed' });
        
                const updatedReports = context.state.reports;
        
                return context.dispatch('updateReportsJsonBin', updatedReports)
                    .then(() => {
                        console.log('JSONBin updated after completing report');
                    })
                    .catch(error => {
                        context.commit('ADD_ERROR', error);
                    });
            } else {
                context.commit('ADD_ERROR', ('Report not found for ID: ' + reportId));
                localStorage.setItem('pendingReport', JSON.stringify(payload));
            }
        }
    }
});
