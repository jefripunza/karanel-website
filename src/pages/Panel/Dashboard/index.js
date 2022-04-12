import React, { Component } from 'react';

//Navigation
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';

import CardInfo from '../../../components/Cards/Info';
import ChartDonut from '../../../components/Charts/Donut';
import ChartLine from '../../../components/Charts/Line';
import PageHeading from '../../../components/PageHeading';

import Footer from '../../../components/Footer';
import { config } from '../../../config';

import Loading from "../../../components/Animates/Loading";

import {
    getRequest,
} from "../../../utils/Fetcher"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoaded: false,
            error: false,
        }
    }

    componentWillMount() {
        document.getElementById('body').className = 'page-top';
        document.title = this.props.title;
        console.log("start");
        getRequest({ token: localStorage.getItem("login"), url: "/v1/api/dashboard/posyandu" })
            .then(response => {
                console.log({ response });
                this.setState({
                    data: response.data,
                    isLoaded: true,
                })
                localStorage.setItem("posyandu_name", response.data.posyandu.name)
            })
            .catch(error => {
                console.log({ error });
            })
    }

    render() {
        const {
            data,
            isLoaded,
            error,
        } = this.state;
        if (error) {
            return error
        } else {
            return (
                <div>
                    {/* <!-- Page Wrapper --> */}
                    <div id="wrapper">
                        {/* <!-- Sidebar --> */}
                        <Sidebar now={config.routes_frontend.panel.dashboard} />
                        {/* <!-- End of Sidebar --> */}

                        {/* <!-- Content Wrapper --> */}
                        <div id="content-wrapper" className="d-flex flex-column">
                            {/* <!-- Main Content --> */}
                            <div id="content">
                                {/* <!-- Topbar --> */}
                                <Topbar {...this.props} name={data.posyandu ? data.posyandu.name : ""} />
                                {/* <!-- End of Topbar --> */}

                                {/* <!-- Begin Page Content --> */}
                                <div className="container-fluid">
                                    {/* <!-- Page Heading --> */}

                                    {!isLoaded ?
                                        <Loading
                                            size={50}
                                            fontSize={20}
                                            message={"Tunggu Sebentar..."}
                                        />
                                        : <>
                                            <PageHeading title="Dashboard" />

                                            {/* <!-- Content Row --> */}
                                            <div className="row">
                                                <CardInfo
                                                    title="Orang Tua"
                                                    icon="calendar"
                                                    color="primary"
                                                    value={data.parent}
                                                />

                                                <CardInfo
                                                    title="Anak"
                                                    icon="clipboard"
                                                    color="info"
                                                    value={data.child}
                                                />

                                                <CardInfo
                                                    title="Anak Sehat"
                                                    icon="calendar"
                                                    color="success"
                                                    value={data.healthy}
                                                />

                                                <CardInfo
                                                    title="Anak Stunting"
                                                    icon="comments"
                                                    color="warning"
                                                    value={data.stunting}
                                                />
                                            </div>
                                            {/* <div className="row">
                                                <div className="col-xl-8 col-lg-6">
                                                    <ChartLine />
                                                </div>
                                                <div className="col-xl-4 col-lg-6">
                                                    <ChartDonut />
                                                </div>
                                            </div> */}
                                        </>
                                    }
                                </div>
                                {/* <!-- /.container-fluid --> */}
                            </div>
                            {/* <!-- End of Main Content --> */}

                            {/* <!-- Footer --> */}
                            <Footer />
                            {/* <!-- End of Footer --> */}
                        </div>
                        {/* <!-- End of Content Wrapper --> */}
                    </div>
                    {/* <!-- End of Page Wrapper --> */}

                    {/* <!-- Scroll to Top Button--> */}
                    <a className="scroll-to-top rounded" href="#page-top">
                        <i className="fas fa-angle-up"></i>
                    </a>
                </div>
            );
        }
    }
}

export default Dashboard;
