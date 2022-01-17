import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { config } from '../../../config';

class SignIn extends Component {
    componentDidMount() {
        if (localStorage.getItem('login')) {
            this.props.history.push(
                config.routes_frontend.layout.panel + config.routes_frontend.panel.dashboard,
            );
        }
    }

    componentWillMount() {
        document.getElementById('body').className = 'bg-gradient-primary';
        document.title = this.props.title;
    }

    handleSignIn = () => {
        localStorage.setItem('login', true);
        this.props.history.push(
            config.routes_frontend.layout.panel + config.routes_frontend.panel.dashboard,
        );
    };

    render() {
        return (
            <div className="container">
                {/* <!-- Outer Row --> */}
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                {/* <!-- Nested Row within Card Body --> */}
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">
                                                    Welcome Back!
                                                </h1>
                                            </div>
                                            <form onSubmit={this.handleSignIn} className="user">
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-user"
                                                        id="exampleInputEmail"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address..."
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-user"
                                                        id="exampleInputPassword"
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id="customCheck"
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            for="customCheck"
                                                        >
                                                            Remember Me
                                                        </label>
                                                    </div>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-user btn-block"
                                                >
                                                    Login
                                                </button>
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <a className="small" href="forgot-password.html">
                                                    Forgot Password?
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SignIn);
