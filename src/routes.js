import React from 'react';

//Pages
import Website from './pages/Website'; // redirect to login

import SignIn from './pages/Auth/SignIn'; // switch to panel if logged
// import SignUp from './pages/Auth/SignUp';
// reset password

import Dashboard from './pages/Panel/Dashboard';
import DataOrtuAnak from "./pages/Panel/Data";

// import Cards from './pages/Cards';
import Charts from './pages/Charts';

import { config, separate } from './config';

const routes = [
    {
        path: config.routes_frontend.website.home,
        for: ['index', 'webmenu'],
        title: 'Home',
        render: (props) => (
            <Website {...props} title={'Selamat Datang' + separate + config.app_name} />
        ),
    },

    // Auth
    {
        path: config.routes_frontend.auth.login,
        for: [config.routes_frontend.layout.auth],
        title: 'Login',
        render: (props) => <SignIn {...props} title={'Login' + separate + config.app_name} />,
    },
    // {
    //     path: config.routes_frontend.auth.reset_password,
    //     for: [
    //         config.routes_frontend.layout.auth,
    //     ],
    //     title: "Reset Password",
    //     render: (props) => (
    //         <AuthResetPassword
    //             {...props}
    //             title={"Reset Password" + separate + config.app_name}
    //         />
    //     ),
    // },

    // Panel
    {
        path: config.routes_frontend.panel.dashboard,
        for: [config.routes_frontend.layout.panel, 'sidebar'],
        title: 'Dashboard',
        icon: 'bi bi-house-door',
        render: (props) => (
            <Dashboard {...props} title={'Dashboard' + separate + config.app_name} />
        ),
    },
    {
        path: config.routes_frontend.panel.data_ortu,
        for: [config.routes_frontend.layout.panel, 'sidebar'],
        title: 'Data Orang Tua & Anak',
        icon: 'bi bi-house-door',
        render: (props) => (
            <DataOrtuAnak {...props} title={'Data Orang Tua & Anak' + separate + config.app_name} />
        ),
    },

    // {
    //     path: config.routes_frontend.panel.notifications,
    //     for: [
    //         config.routes_frontend.layout.panel,
    //         "sidebar",
    //     ],
    //     title: "Notifications",
    //     icon: "bi bi-bell",
    //     render: (props) => (
    //         <PanelNotifications
    //             {...props}
    //             title={"Notifications" + separate + config.app_name}
    //         />
    //     ),
    // },
    // {
    //     path: config.routes_frontend.panel.user,
    //     for: [
    //         config.routes_frontend.layout.panel,
    //         "sidebar",
    //     ],
    //     title: "Account",
    //     icon: "bi bi-person-square",
    //     render: (props) => (
    //         <PanelAccount
    //             {...props}
    //             title={"Account" + separate + config.app_name}
    //         />
    //     ),
    // },

    {
        path: config.routes_frontend.panel.charts,
        for: [config.routes_frontend.layout.panel, 'sidebar'],
        title: 'Charts',
        icon: 'bi bi-bar-chart-line',
        render: (props) => <Charts {...props} title={'Charts' + separate + config.app_name} />,
    },
    // {
    //     path: config.routes_frontend.panel.help,
    //     for: [
    //         config.routes_frontend.layout.panel,
    //         "sidebar",
    //     ],
    //     title: "Help",
    //     icon: "bi bi-question-circle",
    //     render: (props) => (
    //         <PanelHelp
    //             {...props}
    //             title={"Help" + separate + config.app_name}
    //         />
    //     ),
    // },

    // {
    //     path: config.routes_frontend.panel.settings,
    //     for: [
    //         config.routes_frontend.layout.panel,
    //         "panel-footer",
    //     ],
    //     title: "Settings",
    //     icon: "bi bi-gear",
    //     render: (props) => (
    //         <Settings
    //             {...props}
    //             title={"Settings" + separate + config.app_name}
    //         />
    //     ),
    // },
];

export default routes;
