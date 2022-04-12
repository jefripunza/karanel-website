import { config } from "../../config";
import axios from "axios";

/**
 * 
 * @param {{ url:string, header:{}, data:{} }} param0 
 * @returns 
 */
function getRequest({ url, token = false }) {
    const headers = {}
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }
    return new Promise((resolve, reject) => {
        axios
            .get(config.host + url, { headers })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**
 * 
 * @param {{ url:string, header:{}, data:{} }} param0 
 * @returns 
 */
function postRequest({ url, token = false, data }) {
    const headers = {}
    if (token) {
        headers.Authorization = "Bearer " + token;
    }
    return new Promise((resolve, reject) => {
        axios
            .post(config.host + url, data, { headers })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

export {
    getRequest,
    postRequest,
}