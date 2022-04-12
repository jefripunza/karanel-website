import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Error404 } from './pages/Errors';

import { config, separate } from './config';

import { LayoutAuth, LayoutPanel } from './layouts';

import routes from './routes';

const App = () => (
    <BrowserRouter>
        <Switch>
            {/* Setup Layout */}
            <Route
                path={config.routes_frontend.layout.auth}
                render={(props) => <LayoutAuth {...props} />}
            />
            <Route
                path={config.routes_frontend.layout.panel}
                render={(props) => <LayoutPanel {...props} />}
            />

            {/* if route path "/login" ? redirect to real path */}
            {[
                config.routes_frontend.auth.login,
                '/masuk',
                config.routes_frontend.layout.auth + '/masuk',
            ].map((login, i) => {
                return (
                    <Redirect
                        key={i}
                        from={login}
                        to={config.routes_frontend.layout.auth + config.routes_frontend.auth.login} // real path login
                    />
                );
            })}

            {/* if route path "/reset-password" ? redirect to real path */}
            {/* {[config.routes_frontend.auth.reset_password].map((login, i) => {
                return (
                    <Redirect
                        key={i}
                        from={login}
                        to={
                            config.routes_frontend.layout.auth +
                            config.routes_frontend.auth.reset_password
                        } // real path login
                    />
                );
            })} */}

            {/* if route path "/signup" ? redirect to real path */}
            {/* {[
                config.routes_frontend.auth.signup,
                '/daftar',
                config.routes_frontend.layout.auth + '/daftar',
            ].map((signup, i) => {
                return (
                    <Redirect
                        key={i}
                        from={signup}
                        to={config.routes_frontend.layout.auth + config.routes_frontend.auth.signup} // real path signup
                    />
                );
            })} */}

            {/* if route path "/logout" ? redirect to real path */}
            {[
                config.routes_frontend.auth.logout,
                '/keluar',
                config.routes_frontend.layout.auth + '/keluar',
            ].map((logout, i) => {
                return (
                    <Redirect
                        key={i}
                        from={logout}
                        to={config.routes_frontend.layout.auth + config.routes_frontend.auth.logout} // real path logout
                    />
                );
            })}

            {/* add index routes to routes.js */}
            {routes
                .filter((route) => {
                    return route.for.some((substring) => substring === 'index');
                })
                .map((route, i) => {
                    const Components = route.render;
                    return (
                        <Route
                            key={i}
                            path={route.path}
                            exact
                            render={(routeProps) => <Components {...routeProps} />}
                        />
                    );
                })}

            {/* Error 404 */}
            <Route
                path={'*'}
                render={(props) => (
                    <Error404
                        {...props}
                        title={'404 Page Not Found!' + separate + config.app_name}
                    />
                )}
            />
        </Switch>
    </BrowserRouter>
);

export default App;
