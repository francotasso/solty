import axios from "axios";

export const productService = {
    getProducts,
    getProductsByGender,
    getProduct
}

function getProducts(payload) {
    return new Promise((resolve, reject) => {
        axios.get(`products/${payload.numPage}?perPage=${payload.perPage}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(error => {
            reject(new Error(`Error ${error}`))
        })
    })
};

function getProductsByGender(gender) {
    return new Promise((resolve, reject) => {
        axios.get(`products/gender/${gender}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(error => {
            reject(new Error(`Error ${error}`))
        })
    })
}

function getProduct(productId) {
    return new Promise((resolve, reject) => {
        axios.get(`product/${productId}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(error => {
            reject(new Error(`Error ${error}`))
        })
    })
};