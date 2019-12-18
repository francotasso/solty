import { productService } from '../Services'
import { router } from "../Router"

const state = {
    products: [],
    filter: 'all',
    currentProductToBuy: null,
    shoppingCart: []
}

const getters = {
    productsFiltered(state) {
        if (state.filter === 'all') {
            return state.products;
        } else if (state.filter === 'lowToHigh') {
            return state.products.sort((a, b) =>
                a.price > b.price ? 1 : a.price < b.price ? -1 : 0
            )
        } else if (state.filter === 'highToLow') {
            return state.products.sort((a, b) =>
                a.price < b.price ? 1 : a.price > b.price ? -1 : 0
            )
        } else if (state.filter === 'Male') {
            return state.products.filter(
                product => product.gender === 'Male'
            )
        } else if (state.filter === 'Female') {
            return state.products.filter(
                product => product.gender === 'Female'
            )
        } else if (state.filter!== null){
            return state.products.filter(product => product.productName.toLowerCase().includes(state.filter.toLowerCase()) || product.brand.toLowerCase().includes(state.filter.toLowerCase()))
        }
    }
}

const mutations = {
    setProducts(state, products) {
        state.products = products
        state.productsCopy = products
    },
    setCurrentProductToBuy(state, product) {
        state.currentProductToBuy = product
    },
    setProductsFilter(state, filter) {
        state.filter = filter
    },
    addProductToShoppingCart(state, product) {
        let cart = state.shoppingCart;
        if (state.shoppingCart !== null) {
            if (cart.filter(item => item.id === product.id).length>0 && cart.filter(item => item.size === product.size).length>0 && cart.filter(item => item.color === product.color).length>0) {
                state.shoppingCart.forEach(item => {
                    if(item.productName === product.productName && item.size === product.size && item.color === product.color){
                        item.quantity++; 
                        item.totalPrice+=product.price; 
                        state.shoppingCart.push();
                        return;
                    }
                });
            } else {
                let newProduct = {
                    id : product.id,
                    productName: product.productName,
                    size: product.size,
                    color: product.color,
                    quantity: 1,
                    totalPrice: product.price
                }
                state.shoppingCart.push(newProduct);
            }
        } else {
            let newProduct = {
                id : product.id,
                productName: product.productName,
                size: product.size,
                color: product.color,
                quantity: 1,
                totalPrice: product.price
            }
            state.shoppingCart.push(newProduct);
        }
    },
    updateProductFromShoppingCart(state, oldProduct, newProduct){
        if(state.shoppingCart !=null){
            if(state.shoppingCart.includes(oldProduct)){
                for(item of state.shoppingCart){
                    if(item === oldProduct){
                        item = newProduct;
                        return;
                    }
                }
            }
        }
    },
    removeProductFromShoppingCart(state, product){
        if(state.shoppingCart !=null){
            if(state.shoppingCart.includes(product)){
                let i = state.shoppingCart.indexOf(product);
                state.shoppingCart.splice(i, 1);
            }
        }
        console.log(state.shoppingCart);
    }
}

const actions = {
    getProducts({ commit }) {
        productService.getProducts().then(res => {
            commit('setProducts', res);
        },
            error => {
            })
    },
    previousPurchase({ commit }, productId) {
        productService.getProduct(productId).then(res => {
            commit('setCurrentProductToBuy', res);
            router.push({ name: 'Product', params: { id: productId } });
        },
            error => {
                router.push({ name: 'Login' });
            })
    },
    getProduct({ commit }, productId) {
        productService.getProduct(productId).then(res => {
            commit('setCurrentProductToBuy', res);
            router.push({ name: 'ProductDescription' });
        },
            error => {
                router.push({ name: 'Login' });
            })
    },
    setProductsFilter({ commit }, filter) {
        commit('setProductsFilter', filter);
    }
};

export const product = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}