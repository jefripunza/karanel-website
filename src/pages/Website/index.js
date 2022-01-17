import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Website extends Component {
    componentDidMount() {
        this.props.history.push('/login');
    }

    render() {
        return <div className="container">kosong</div>;
    }
}

export default withRouter(Website);
