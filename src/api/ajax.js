
import axios from 'axios';
import {message} from "antd";


export default function ajax(url,data={},type='POST') {

    return new Promise((resolve ,reject) => {
        let promise
        let parms = new URLSearchParams()
        Object.keys(data).forEach(key => {
            parms.append(key+'',data[key])
        })
            console.log("parms:" + parms)
        if (type == 'GET'){
            promise.get(url, {
                param: data
            })
        }else {
            promise = axios.post(url,parms)
            console.log("promise",promise)
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('请求失败：' + error.message)
        })
    })
}