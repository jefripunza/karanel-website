import React, { Component } from 'react';
import PropTypes from 'prop-types';

// reactstrap components
import { UncontrolledTooltip } from 'reactstrap';

import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ExportExcel extends Component {
    constructor(props) {
        super(props);
        const { filename, id } = this.props;
        this.state = {
            filename: filename ? filename : 'excel_export',
            id,
        };
    }
    render() {
        const { filename, id } = this.state;
        const { data } = this.props;
        console.log({ receive: data });
        return (
            <div id={id}>
                <ExcelFile
                    element={
                        <>
                            <button
                                id="download-excel-now"
                                class="btn btn-round"
                                data-toggle="modal"
                                data-target="#project-add-modal"
                                style={{ padding: 0, marginLeft: 10, display: 'none' }}
                            >
                                <i class="fas fa-download" /> Download Semua
                            </button>
                            <UncontrolledTooltip delay={0} target={id}>
                                Download Excel
                            </UncontrolledTooltip>
                        </>
                    }
                    filename={filename}
                >
                    <ExcelSheet
                        data={data
                            // .sort(function (a, b) {
                            //     if (a.nama < b.nama) { return -1; }
                            //     if (a.nama > b.nama) { return 1; }
                            //     return 0;
                            // })
                            .map((val, i) => {
                                val.no = i + 1;
                                // pengolahan data
                                return val;
                            })}
                        name={'Rekap'} // Sheet
                    >
                        <ExcelColumn label="No" value="no" />
                        <ExcelColumn label="NIK" value="nik" />
                        <ExcelColumn label="Nama Anak" value="nama" />
                        <ExcelColumn label="TTL" value="ttl" />
                        <ExcelColumn label="Kelamin" value="gender" />
                        <ExcelColumn label="Golongan Darah" value="blood" />

                        <ExcelColumn label="NIK Ayah" value="nik_father" />
                        <ExcelColumn label="Nama Ayah" value="name_father" />
                        <ExcelColumn label="Pekerjaan Ayah" value="job_father" />

                        <ExcelColumn label="NIK Ibu" value="nik_mother" />
                        <ExcelColumn label="Nama Ibu" value="name_mother" />
                        <ExcelColumn label="Pekerjaan Ibu" value="job_mother" />

                        <ExcelColumn label="Tanggal Pemeriksaan" value="tgl_pemeriksaan" />

                        <ExcelColumn label="BBPB" value="bbpb" />
                        <ExcelColumn label="BBU" value="bbu" />
                        <ExcelColumn label="LKU" value="lku" />
                        <ExcelColumn label="PBU" value="pbu" />
                    </ExcelSheet>
                </ExcelFile>
            </div>
        );
    }
}

ExportExcel.propTypes = {
    // filename data
    filename: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
};

export default ExportExcel;
