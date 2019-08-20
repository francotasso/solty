import axios from "axios";
import URL from '../API/API';

export const productService = {
    getProducts,
    getProduct
}

function getProducts() {
    let url = URL.url.concat('/products');
    return axios
        .get(
            url,
            { withCredentials: true }
        )
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return Promise.reject(new Error(err));
        });
};

function getProduct(productId) {
    let url = URL.url.concat(`/product/${productId}`);
    return axios
        .get(
            url,
            { withCredentials: true }
        )
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return Promise.reject(new Error(err));
        });
};
