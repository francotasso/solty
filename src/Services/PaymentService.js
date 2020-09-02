import axios from "axios";

export const paymentService = {
    executePurchase
}

function executePurchase(payment) {
    return new Promise((resolve, reject) => {
        axios.post('payment', payment, { withCredentials: true })
        .then(res => { 
            resolve(res.data)
        })
        .catch(error => {
            reject(error.response.data)
        })
    })
}