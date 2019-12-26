import axios from "axios";
import URL from '../API/API';

export const paymentService = {
    executePurchase
}

function executePurchase(payment) {
    let url = URL.url.concat('/payment');
    return new Promise((resolve, reject) => {
        axios.post(url, payment, { withCredentials: true })
        .then(res => { 
            resolve(res.data)
        })
        .catch(error => {
            reject(error.response.data)
        })
    })
}