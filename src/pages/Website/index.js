import React, { Component } from 'react';
import { config } from '../../config';

class Website extends Component {
    componentDidMount() {
        this.props.history.push(
            config.routes_frontend.layout.auth + config.routes_frontend.auth.login,
        );
    }

    render() {
        return <div className="container">kosong</div>;
    }
}

export default Website;
