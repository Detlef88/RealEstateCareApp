# RealEstateCareApp
This is a project for the LOI course front-end frameworks

### Installation
Clone repository:

    git clone <repository-url>

Install packages:

    npm install

Start the server:

    ionic serve

### Live version
[https://.netlify.app](https://.netlify.app)

### Logging in
The login information to use the application is provided below. This is a fictitious account and intended for demo purposes.

Email:

    admin@rec.nl

Password:

    Admin123

During the login process, an authentication code is requested. This is displayed in the toaster component after the 'get code' button is clicked. This simulates a two-factor authentication process that will be used in the final version.

### The application
The application contains a header and a tab bar. The header contains Real Estate Care's logo and brand name and a logout button. The logo returns you to the home page and the logout button returns you to the home screen. The tab bar contains buttons to the home page, the open reports page, the closed reports page, the library and settings.

The dashboard of the home page shows the different functionalities through four cards;
- open reports
- closed reports
- library
- settings

On the open reports page you will find all the reports that still need to be completed, the main task is indicated by an icon. If other tasks need to be completed, this option is also provided. After completing all data, the report can be saved and marked as complete. The report can then be found on the closed reports page.

On the closed reports page you will find all the reports that have been completed, again the main task is indicated by an icon. If changes need to be made, this option is also provided. After modifying all data the report can be saved.

On the library page you will find all documentation. From norm sheets to test procedures. These files are displayed in PDF format.

On the settings page you will find settings related to your profile, the appearance and notifications. Currently, only the option to enable or disable darkmode works (it also checks the setting from the user's system preferences when opening the app). The other settings are currently demo only.

### Used Techniques.
- Vue.js is used because it is very small in base and easy to extend.
- Ionic web components are used as well as self-built components. 
- Vue-router is used to navigate between application screens.
- Vuex-store is used for state management to separate and structure data.
- Axios is used to retrieve data from Web APIs.

### Security
In order to use the application securely, a login screen with two-factor authentication will be used. This two-factor authentication is currently simulated but the final version will use a working two-factor authenticator or universal login.

### Usability
Based on the heurastics of Jacob Nielsen;
- Icons are used in combination with text to indicate the operation of the application. 
- Most of the components come from the Ionic library and are therefore consistently developed.
- Controls are consistent thoughout the application
- 1 font is used throughout the application
- Error and success toasts are used to notify the user of their actions
- The same layout is used for all pages
 
### Accessibility
Based on the WCAG 2.1 guidelines;
- Short, clear labels are used for inputs
- Aria labels are applied throughout the application
- All pages have a title and introduction text explaining the page.
- Buttons have a distinct color that contrasts with the background. If more buttons appear next to each other they each have a different color to indicate the difference, in addition to the text contained in the buttons.

### Design patterns, style guides & best practices
- A neat, clear folder structure is used
- The State Management design pattern is used as well aspects of the Builder design pattern
- It uses PascalCase, camelCase, kebab-case as well as snake_case, depending on the best-practices guides
- Only scoped styles are used for better overview and easier maintenance and scaling.

### Conclusie
At the moment, all requested functionalities of the case have been incorporated into the application. In a later stage the demo functionalities, such as the notification settings, will be made working.