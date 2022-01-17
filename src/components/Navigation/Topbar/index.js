import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickMenuOpen } from '../../../redux/actions';

import { config } from '../../../config';

class Topbar extends Component {
    render() {
        const { clickMenuOpen } = this.props;

        return (
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                {/* <!-- Sidebar Toggle (Topbar) --> */}
                <button
                    onClick={() => {
                        clickMenuOpen();
                    }}
                    id="sidebarToggleTop"
                    className="btn btn-link d-md-none rounded-circle mr-3"
                >
                    <i className="fa fa-bars"></i>
                </button>

                {/* <!-- Topbar Navbar --> */}
                <ul className="navbar-nav ml-auto">
                    {/* <!-- Nav Item - User Information --> */}
                    <li className="nav-item dropdown no-arrow">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="userDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                                Valerie Luna
                            </span>
                            <img
                                className="img-profile rounded-circle"
                                src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
                            />
                        </a>
                        {/* <!-- Dropdown - User Information --> */}
                        <div
                            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown"
                        >
                            <a className="dropdown-item" href="#">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Profile
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                Settings
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                Activity Log
                            </a>
                            <div className="dropdown-divider"></div>
                            <a
                                className="dropdown-item"
                                href="#logout"
                                data-toggle="modal"
                                data-target="#logoutModal"
                                onClick={(e) => {
                                    e.preventDefault();
                                    localStorage.removeItem('login');
                                    this.props.history.push(
                                        config.routes_frontend.layout.auth +
                                            config.routes_frontend.auth.login,
                                    );
                                }}
                            >
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ clickMenuOpen }, dispatch);

const mapStateToProps = (store) => ({
    toggled: store.menuState.menuOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
