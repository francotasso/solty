import { productService } from '../Services'
import { router } from "../Router"

const state = {
    products: [],
    filter: 'all',
    currentProductToBuy: null
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