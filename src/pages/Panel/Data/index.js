import React, { Component } from 'react';

// Navigation
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';

// react component for creating dynamic tables
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

// reactstrap components
import {
    UncontrolledTooltip,
} from "reactstrap";

import PageHeading from '../../../components/PageHeading';

import Footer from '../../../components/Footer';
import { config, pagination } from '../../../config';

const { SearchBar } = Search;

class Data extends Component {
    componentWillMount() {
        document.getElementById('body').className = 'page-top';
        document.title = this.props.title;
    }

    listAnak(cell, row, rowIndex, formatExtraData) {
        return (
            <>
                {row.anak.map((data_anak, i) => {
                    return <>
                        <a href="#">
                            {data_anak.nama}
                        </a><br />
                    </>
                })}
            </>
        )
    }

    downloadExcel(e, row) {
        e.preventDefault()
    }

    showDetail(e, row) {
        e.preventDefault()
    }

    ActionColumn = (cell, row, rowIndex, formatExtraData) => {
        // console.log({row}) // debug
        return (
            <>
                <a
                    className="table-action mr-4"
                    href="!#"
                    id={"tooltip_download_" + row.id}
                    onClick={(e) => this.downloadExcel(e, row)}
                >
                    <i className="fas fa-download" />
                </a>
                <UncontrolledTooltip delay={0} target={"tooltip_download_" + row.id}>
                    Download Excel : {row.nama_ortu}
                </UncontrolledTooltip>

                <a
                    className="table-action"
                    href="!#"
                    id={"tooltip_edit_" + row.id}
                    onClick={(e) => this.showDetail(e, row)}
                >
                    <i className="fas fa-user-edit" />
                </a>
                <UncontrolledTooltip delay={0} target={"tooltip_edit_" + row.id}>
                    Edit Data : {row.nama_ortu}
                </UncontrolledTooltip>
            </>
        );
    }

    render() {
        return (
            <div>
                {/* <!-- Page Wrapper --> */}
                <div id="wrapper">
                    {/* <!-- Sidebar --> */}
                    <Sidebar now={config.routes_frontend.panel.data_ortu} />
                    {/* <!-- End of Sidebar --> */}

                    {/* <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/* <!-- Main Content --> */}
                        <div id="content">
                            {/* <!-- Topbar --> */}
                            <Topbar {...this.props} />
                            {/* <!-- End of Topbar --> */}

                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid">
                                {/* <!-- Page Heading --> */}

                                <PageHeading title="Data Orang Tua & Anak" />

                                {/* <!-- Table --> */}
                                <ToolkitProvider
                                    data={[{
                                        no: "1",
                                        id: 123,
                                        nama_ortu: "Paijem Butuh Hiburan",
                                        alamat: "taman ABC",
                                        anak: [
                                            {
                                                id: 1,
                                                nama: "Paijo",
                                                tgl_lahir: 1623343248734,
                                            },
                                            {
                                                id: 2,
                                                nama: "Sukinem",
                                                tgl_lahir: 1623343248734,
                                            },
                                            {
                                                id: 3,
                                                nama: "Marijan",
                                                tgl_lahir: 1623343248734,
                                            },
                                        ],
                                    }]}
                                    keyField="name"
                                    columns={[ // editable
                                        {
                                            dataField: "no",
                                            text: "NO",
                                            sort: true,
                                        },
                                        {
                                            dataField: "nama_ortu",
                                            text: "Nama Orang Tua",
                                            sort: true,
                                        },
                                        {
                                            dataField: "anak",
                                            text: "Anak",
                                            formatter: this.listAnak,
                                        },
                                        {
                                            dataField: "alamat",
                                            text: "Alamat",
                                        },
                                        {
                                            dataField: "",
                                            text: "Action",
                                            formatter: this.ActionColumn,
                                        },
                                    ]}
                                    search
                                >
                                    {(props) => (
                                        <div className="py-4 table-responsive">
                                            <div className="col">
                                                <div className="col-md-4 col-xl-4">
                                                    <div
                                                        id="datatable-basic_filter"
                                                        className="dataTables_filter"
                                                    >
                                                        <label>
                                                            Search:
                                                            <SearchBar
                                                                className="form-control-sm"
                                                                placeholder=""
                                                                {...props.searchProps}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <BootstrapTable
                                                {...props.baseProps}
                                                bootstrap4={true}
                                                pagination={pagination}
                                                bordered={false}
                                            />
                                        </div>
                                    )}
                                </ToolkitProvider>
                                {/* <!-- End of Table --> */}

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

export default Data;
