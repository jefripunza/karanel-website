import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickMenuOpen, nowNavPage } from '../../../redux/actions';
import { config } from '../../../config';

class Sidebar extends Component {
    // componentDidMount() {
    //   document.getElementById('body').className = 'page-top';
    // }
    // state = {
    //   sidebarToggled: false,
    // }

    // handleSideBarToggle() {
    //   if (this.sidebarToogled === true) {
    //     this.setState({ sidebarToggled: !this.state.sidebarToggled });
    //     document.getElementById('body').className = 'page-top sidebar-toggled';
    //   } else {
    //     this.setState({ sidebarToggled: !this.state.sidebarToggled });
    //     document.getElementById('body').className = 'page-top';
    //   }

    // }

    render() {
        const { clickMenuOpen, toggled } = this.props;
        return (
            <ul
                className={
                    toggled
                        ? 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled'
                        : 'navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
                }
                id="accordionSidebar"
            >
                {/* <!-- Sidebar - Brand --> */}
                <a
                    className="sidebar-brand d-flex align-items-center justify-content-center"
                    href="index.html"
                >
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        SB Admin <sup>2</sup>
                    </div>
                </a>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/* <!-- Nav Item - Dashboard --> */}
                <li
                    className="nav-item"
                    onClick={() => {
                        nowNavPage(config.routes_frontend.panel.dashboard)
                    }}>
                    <Link
                        className="nav-link"
                        to={config.routes_frontend.layout.panel + config.routes_frontend.panel.dashboard}
                    >
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/* <!-- Heading --> */}
                <div className="sidebar-heading">Posyandu</div>

                {/* <!-- Nav Item - Charts --> */}
                <li
                    className="nav-item"
                    onClick={() => {
                        nowNavPage(config.routes_frontend.panel.data_ortu)
                    }}
                >
                    <Link
                        className="nav-link"
                        to={config.routes_frontend.layout.panel + config.routes_frontend.panel.data_ortu}
                    >
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Data Orang Tua & Anak</span>
                    </Link>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider d-none d-md-block" />

                {/* <!-- Sidebar Toggler (Sidebar) --> */}
                <div className="text-center d-none d-md-inline">
                    <button
                        onClick={() => {
                            clickMenuOpen();
                        }}
                        className="rounded-circle border-0"
                        id="sidebarToggle"
                    ></button>
                </div>
            </ul>
        );
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ clickMenuOpen, nowNavPage }, dispatch);

const mapStateToProps = (store) => ({
    toggled: store.menuState.menuOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
