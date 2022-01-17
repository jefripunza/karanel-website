import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem('login');
        this.props.history.push('/login');
    }

    render() {
        return <div className="container">ini logout</div>;
    }
}

export default withRouter(Logout);
