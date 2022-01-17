import React from "react"

//dependencies
import paginationFactory from "react-bootstrap-table2-paginator";

const production = String(process.env.NODE_ENV).includes('production') ? true : false;

const config = {
    app_name: 'Karanel Website',

    url_server_development: 'http://localhost:5000',
    routes_frontend: {
        website: {
            home: '/',
        },
        layout: {
            auth: '/auth',
            panel: '/panel',
        },
        auth: {
            login: '/login',
            logout: '/logout',
            //
            reset_password: '/reset-password',
        },
        panel: {
            dashboard: '/dashboard',
            data_ortu: '/data_ortu_anak',
            //
            user: '/user',
            settings: '/settings',
            //
            help: '/help',
        },
    },
    routes_backend: {},
};

const separate = ' | ';

window.chartColors = {
    green: '#75c181', // rgba(117,193,129, 1)
    blue: '#5b99ea', // rgba(91,153,234, 1)
    gray: '#a9b5c9',
    text: '#252930',
    border: '#e7e9ed',
};

var randomDataPoint = function () {
    return Math.round(Math.random() * 100);
};

// dependencies
const pagination = paginationFactory({
    page: 1,
    alwaysShowAllBtns: true,
    showTotal: true,
    withFirstAndLast: false,
    sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
        <div className="dataTables_length" id="datatable-basic_length">
            <label>
                Show{" "}
                {
                    <select
                        name="datatable-basic_length"
                        aria-controls="datatable-basic"
                        className="form-control form-control-sm"
                        onChange={(e) => onSizePerPageChange(e.target.value)}
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                }{" "}
                entries.
            </label>
        </div>
    ),
});

export {
    production,
    config,
    pagination,
    separate,
    randomDataPoint,
};
