import axios from "axios";
import URL from '../API/API';

export const paymentService = {
    executePurchase
}

function executePurchase(payment) {
    let url = URL.url.concat('/payment');
    return axios.post(url, payment, { withCredentials: true }).then(res => { return res.data; }).catch(err => {
        return Promise.reject(err.response.data);
    })
}