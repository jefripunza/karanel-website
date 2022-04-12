import React, { Component } from 'react';

import Loading from '../../../components/Animates/Loading';

import {
    getRequest,
} from "../../../utils/Fetcher";

import "../../../assets/css/table-custom.css"
import { data } from 'jquery';

export default class ModalDetailAnak extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            data: {},
            isLoaded: false,
            error: false,
        }
    }

    componentDidMount() {
        const {
            id,
        } = this.props;
        getRequest({ url: "/v1/api/child/id/" + id, token: localStorage.getItem("login") })
            .then(res => {
                const data = res.data;
                console.log({ data });
                this.setState({
                    data,
                    isLoaded: true,
                })
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                })
            })
    }

    render() {
        const {
            data,
            isLoaded,
            error,
        } = this.state
        if (!isLoaded) {
            return <Loading
                size={50}
                fontSize={20}
                message={"Sedang Request..."}
            />
        } else if (error) {
            return error
        } else {
            return <>
                <table className='table-custom'>
                    <tr>
                        <td>ID</td>
                        <td>{data.id}</td>
                    </tr>
                    <tr>
                        <td>Nama</td>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <td>Kelamin</td>
                        <td>{data.gender}</td>
                    </tr>
                    <tr>
                        <td>NIK</td>
                        <td>{data.nik}</td>
                    </tr>
                    <tr>
                        <td>TTL</td>
                        <td>{data.birth_place + ", " + String(data.birth_date).split("-").reverse().join("-")}</td>
                    </tr>
                    <tr>
                        <td>Umur</td>
                        <td>{data.age_of_birth} Bulan</td>
                    </tr>
                    <tr>
                        <td>Gol. Darah</td>
                        <td>{data.blood}</td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>
                            <ul style={{ listStyleType: "none" }}>
                                <li>
                                    BBTB : {data.status.BBTB}
                                </li>
                                <li>
                                    BBU : {data.status.BBU}
                                </li>
                                <li>
                                    LKU : {data.status.LKU}
                                </li>
                                <li>
                                    PBU : {data.status.PBU}
                                </li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </>;
        }
    }
}
