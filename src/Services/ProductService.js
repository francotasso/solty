import axios from "axios";
import URL from '../API/API';

export const productService = {
    getProducts,
    getProduct
}

function getProducts(numPage) {
    let url = URL.url.concat(`/products/${numPage}`);
    return new Promise((resolve, reject) => {
      axios.get(url, { withCredentials: true })
        .then(res => {
            resolve(res.data)
        })
        .catch(error => {
            reject(new Error(`Error ${error}`));
        });
    })
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
