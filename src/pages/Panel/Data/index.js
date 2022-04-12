import React, { Component } from 'react';

// Navigation
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';

// react component for creating dynamic tables
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

// reactstrap components
import { UncontrolledTooltip } from 'reactstrap';

import PageHeading from '../../../components/PageHeading';

import Footer from '../../../components/Footer';
import { config, pagination } from '../../../config';

import { getRequest } from '../../../utils/Fetcher';

import { createModal } from '../../../utils/SweetAlert';
import ModalDetailAnak from './ModalDetailAnak';

import ExportExcel from '../../../utils/ExportExcel';
import excelName from '../../../helpers/excelName';
import { createPromise } from '../../../helpers/promise';

const { SearchBar } = Search;

class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            error: false,
            olah_data: [],
        };
        this.olah_data = React.createRef();
        this.olah_data.current = [];
    }

    componentWillMount() {
        document.getElementById('body').className = 'page-top';
        document.title = this.props.title;
        console.log('start');
        getRequest({
            token: localStorage.getItem('login'),
            url: '/v1/api/parent?page=1&limit=100000000&search=',
        })
            .then((response) => {
                console.log({ response });
                const data = response.data.map((value, i) => {
                    return {
                        no: i + 1,
                        id: value.id,
                        nama_ortu: value.name_father + ' & ' + value.name_mother,
                        alamat: value.address,
                        anak: value.child.map((anak, j) => {
                            const new_anak = anak;
                            delete new_anak.name;
                            return {
                                no: j + 1,
                                nama: anak.name,
                                tgl_lahir: 1623343248734,
                                ...new_anak,
                            };
                        }),
                    };
                });
                this.setState({
                    data: data.length > 0 ? data : [],
                    isLoaded: true,
                });
            })
            .catch((error) => {
                console.log({ error });
            });
    }

    listAnak(cell, row, rowIndex, formatExtraData) {
        // console.log({ anak: row.anak });
        return (
            <>
                {row.anak.map((data_anak, i) => {
                    return (
                        <>
                            <a
                                href="#show_child"
                                onClick={(e) => {
                                    e.preventDefault();
                                    createModal(
                                        'Detail Anak',
                                        <ModalDetailAnak id={data_anak.id} />,
                                    );
                                }}
                                key={'data_anak_' + i}
                            >
                                {i + 1}. {data_anak.nik}
                            </a>
                            <br />
                        </>
                    );
                })}
            </>
        );
    }

    downloadExcel(e, row) {
        e.preventDefault();
        // add here
    }

    showDetail(e, row) {
        e.preventDefault();
    }

    ActionColumn = (cell, row, rowIndex, formatExtraData) => {
        // console.log({row}) // debug
        return (
            <>
                <a
                    className="table-action mr-4"
                    href="!#"
                    id={'tooltip_download_' + row.id}
                    onClick={(e) => this.downloadExcel(e, row)}
                >
                    <i className="fas fa-download" />
                </a>
                <UncontrolledTooltip delay={0} target={'tooltip_download_' + row.id}>
                    Download Excel : {row.nama_ortu}
                </UncontrolledTooltip>

                {/* <a
                    className="table-action"
                    href="!#"
                    id={'tooltip_edit_' + row.id}
                    onClick={(e) => this.showDetail(e, row)}
                >
                    <i className="fas fa-user-edit" />
                </a>
                <UncontrolledTooltip delay={0} target={'tooltip_edit_' + row.id}>
                    Edit Data : {row.nama_ortu}
                </UncontrolledTooltip> */}
            </>
        );
    };

    render() {
        const { data, isLoaded, error } = this.state;
        if (error) {
            return error;
        } else {
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
                                <Topbar
                                    {...this.props}
                                    name={localStorage.getItem('posyandu_name')}
                                />
                                {/* <!-- End of Topbar --> */}

                                {/* <!-- Begin Page Content --> */}
                                <div className="container-fluid">
                                    {/* <!-- Page Heading --> */}

                                    <PageHeading title="Data Orang Tua & Anak" />

                                    {!isLoaded ? (
                                        <>Loading...</>
                                    ) : (
                                        <>
                                            {/* <!-- Table --> */}
                                            <ToolkitProvider
                                                data={data}
                                                keyField="name"
                                                columns={[
                                                    // editable
                                                    {
                                                        dataField: 'no',
                                                        text: 'NO',
                                                        sort: true,
                                                    },
                                                    {
                                                        dataField: 'nama_ortu',
                                                        text: 'Nama Orang Tua',
                                                        sort: true,
                                                    },
                                                    {
                                                        dataField: 'anak',
                                                        text: 'Anak',
                                                        formatter: this.listAnak,
                                                    },
                                                    {
                                                        dataField: 'alamat',
                                                        text: 'Alamat',
                                                    },
                                                    // {
                                                    //     dataField: '',
                                                    //     text: 'Action',
                                                    //     formatter: this.ActionColumn,
                                                    // },
                                                ]}
                                                search
                                            >
                                                {(props) => (
                                                    <div className="py-4 table-responsive">
                                                        <div className="row">
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
                                                            <div className="col-md-4 col-xl-4">
                                                                <button
                                                                    class="btn btn-round"
                                                                    data-toggle="modal"
                                                                    data-target="#project-add-modal"
                                                                    style={{
                                                                        padding: 0,
                                                                        marginLeft: 10,
                                                                    }}
                                                                    onClick={async () => {
                                                                        let hasil =
                                                                            await createPromise(
                                                                                data,
                                                                                (row, resolved) => {
                                                                                    getRequest({
                                                                                        token: localStorage.getItem(
                                                                                            'login',
                                                                                        ),
                                                                                        url: `/v1/api/parent/id/${row.id}`,
                                                                                    }).then(
                                                                                        ({
                                                                                            data,
                                                                                        }) => {
                                                                                            // reduce data
                                                                                            delete data.address;
                                                                                            delete data.child;
                                                                                            delete data.count_child;
                                                                                            delete data.count_child_stunting;
                                                                                            delete data.created_at;
                                                                                            delete data.deleted_at;
                                                                                            delete data.id;
                                                                                            delete data.id_karnel;
                                                                                            delete data.image_karnel_id;
                                                                                            delete data.image_karnel_path;
                                                                                            delete data.phone_father;
                                                                                            delete data.phone_mother;
                                                                                            delete data.posyandu;
                                                                                            delete data.posyandu_id;
                                                                                            delete data.profile_image;
                                                                                            delete data.profile_image_id;
                                                                                            delete data.role_name;
                                                                                            delete data.updated_at;

                                                                                            // add
                                                                                            data.id =
                                                                                                row.id;
                                                                                            data.anak =
                                                                                                row.anak;
                                                                                            resolved(
                                                                                                data,
                                                                                            );
                                                                                        },
                                                                                    );
                                                                                },
                                                                            );

                                                                        hasil = hasil
                                                                            .reduce(
                                                                                (simpan, ortu) => {
                                                                                    const { anak } =
                                                                                        { ...ortu };
                                                                                    delete ortu.anak;
                                                                                    const anak_dengan_ortu =
                                                                                        anak.map(
                                                                                            (v) => {
                                                                                                return {
                                                                                                    ...v,
                                                                                                    ortu,
                                                                                                };
                                                                                            },
                                                                                        );
                                                                                    return [
                                                                                        ...simpan,
                                                                                        ...anak_dengan_ortu,
                                                                                    ];
                                                                                },
                                                                                [],
                                                                            )
                                                                            .map((v, i) => {
                                                                                v.no = i + 1;

                                                                                // combine
                                                                                v.ttl =
                                                                                    v.birth_place +
                                                                                    ', ' +
                                                                                    String(
                                                                                        v.birth_date,
                                                                                    )
                                                                                        .split('-')
                                                                                        .reverse()
                                                                                        .join('-');
                                                                                v.ttl = String(
                                                                                    v.ttl,
                                                                                ).replace(
                                                                                    /\"/gi,
                                                                                    '',
                                                                                );

                                                                                // reduce data
                                                                                delete v.age_of_birth;
                                                                                delete v.birth_place;
                                                                                delete v.birth_date;
                                                                                delete v.child_order;
                                                                                delete v.created_at;
                                                                                delete v.deleted_at;
                                                                                delete v.parent_id;
                                                                                delete v.profile_image_id;
                                                                                delete v.profile_image_url;
                                                                                delete v.tgl_lahir;
                                                                                delete v.updated_at;
                                                                                delete v.status_gizi;

                                                                                return v;
                                                                            });

                                                                        // bbpb
                                                                        hasil = await createPromise(
                                                                            hasil,
                                                                            async (
                                                                                row,
                                                                                resolved,
                                                                            ) => {
                                                                                getRequest({
                                                                                    token: localStorage.getItem(
                                                                                        'login',
                                                                                    ),
                                                                                    url: `/v1/api/chart/bbpb/${row.id}?page=1&limit=0`,
                                                                                }).then(
                                                                                    ({ data }) => {
                                                                                        resolved({
                                                                                            ...row,
                                                                                            bbpb: data.status,
                                                                                        });
                                                                                    },
                                                                                );
                                                                            },
                                                                        );
                                                                        // bbu
                                                                        hasil = await createPromise(
                                                                            hasil,
                                                                            async (
                                                                                row,
                                                                                resolved,
                                                                            ) => {
                                                                                getRequest({
                                                                                    token: localStorage.getItem(
                                                                                        'login',
                                                                                    ),
                                                                                    url: `/v1/api/chart/bbu/${row.id}?page=1&limit=0`,
                                                                                }).then(
                                                                                    ({ data }) => {
                                                                                        resolved({
                                                                                            ...row,
                                                                                            bbu: data.status,
                                                                                        });
                                                                                    },
                                                                                );
                                                                            },
                                                                        );
                                                                        // lku
                                                                        hasil = await createPromise(
                                                                            hasil,
                                                                            async (
                                                                                row,
                                                                                resolved,
                                                                            ) => {
                                                                                getRequest({
                                                                                    token: localStorage.getItem(
                                                                                        'login',
                                                                                    ),
                                                                                    url: `/v1/api/chart/lku/${row.id}?page=1&limit=0`,
                                                                                }).then(
                                                                                    ({ data }) => {
                                                                                        resolved({
                                                                                            ...row,
                                                                                            lku: data.status,
                                                                                        });
                                                                                    },
                                                                                );
                                                                            },
                                                                        );
                                                                        // pbu
                                                                        hasil = await createPromise(
                                                                            hasil,
                                                                            async (
                                                                                row,
                                                                                resolved,
                                                                            ) => {
                                                                                getRequest({
                                                                                    token: localStorage.getItem(
                                                                                        'login',
                                                                                    ),
                                                                                    url: `/v1/api/chart/pbu/${row.id}?page=1&limit=0`,
                                                                                }).then(
                                                                                    ({ data }) => {
                                                                                        resolved({
                                                                                            ...row,
                                                                                            pbu: data.status,
                                                                                            tgl_pemeriksaan:
                                                                                                data.records !==
                                                                                                null
                                                                                                    ? data
                                                                                                          .records[0]
                                                                                                          .created_at
                                                                                                    : null,
                                                                                        });
                                                                                    },
                                                                                );
                                                                            },
                                                                        );

                                                                        // rapikan hasil akhir
                                                                        hasil = hasil.map((v) => {
                                                                            const { ortu } = {
                                                                                ...v,
                                                                            };
                                                                            ortu.id_ortu = ortu.id;
                                                                            delete v.ortu;
                                                                            v.nama = v.nama
                                                                                ? v.nama
                                                                                : '';
                                                                            v.tgl_pemeriksaan =
                                                                                v.tgl_pemeriksaan
                                                                                    ? v.tgl_pemeriksaan
                                                                                    : '';
                                                                            return {
                                                                                ...v,
                                                                                ...ortu,
                                                                            };
                                                                        });
                                                                        this.olah_data.current =
                                                                            hasil;
                                                                        console.log({
                                                                            hasil: this.olah_data
                                                                                .current,
                                                                        });

                                                                        setTimeout(() => {
                                                                            this.setState({
                                                                                olah_data: hasil,
                                                                            });
                                                                            document
                                                                                .getElementById(
                                                                                    'download-excel-now',
                                                                                )
                                                                                .click();
                                                                        }, 1000);
                                                                    }}
                                                                >
                                                                    <i class="fas fa-download" />{' '}
                                                                    Download Semua
                                                                </button>
                                                                <ExportExcel
                                                                    id={'tooltip_all_download'}
                                                                    filename={excelName('karanel')}
                                                                    data={this.olah_data.current}
                                                                />
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
                                        </>
                                    )}
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

export default Data;
