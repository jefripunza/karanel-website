import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { postRequest } from '../../../utils/Fetcher';

import { config } from '../../../config';

import { createWarning } from '../../../utils/SweetAlert';

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

    handleSignIn = (e) => {
        e.preventDefault();
        const [email, password, remember] = [
            e.target.elements.email.value,
            e.target.elements.password.value,
            e.target.elements.remember.checked,
        ];
        let success = true;
        postRequest({
            url: '/v1/api/admin/login',
            data: {
                email,
                password,
            },
        })
            .then((res) => {
                const token = res.data.token;
                // console.log({ token, email, password });
                localStorage.setItem('login', token);
                localStorage.setItem('email', email);
                this.props.history.push(
                    config.routes_frontend.layout.panel + config.routes_frontend.panel.dashboard,
                );
            })
            .catch((error) => {
                success = false;
                console.log({ error });
                if (error.response.data.stat_code) {
                    createWarning('Maaf, Email / Password salah!');
                }
            })
            .finally(() => {
                // console.log({ remember });
                if (remember && success) {
                    localStorage.setItem('remember_email', email);
                    localStorage.setItem('remember_password', password);
                }
            });
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
                                                        name="email"
                                                        defaultValue={localStorage.getItem(
                                                            'remember_email',
                                                        )}
                                                        className="form-control form-control-user"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address..."
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        defaultValue={localStorage.getItem(
                                                            'remember_password',
                                                        )}
                                                        className="form-control form-control-user"
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input
                                                            type="checkbox"
                                                            name="remember"
                                                            defaultChecked={true}
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
