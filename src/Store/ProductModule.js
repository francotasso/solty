import { productService } from '../Services'
import { router } from "../Router"

const state = {
    products: [],
    numPages: 0,
    currentPage: 1,
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
    },
    shoppingCartQuantity(state){
        return state.shoppingCart.reduce((quantity, item) => {return quantity + parseInt(item.quantity)}, 0)
    },
    shoppingCartTotalPrice(state){
        return state.shoppingCart.reduce((totalPrice, item) => {return totalPrice + item.totalPrice}, 0)
    }
}

const mutations = {
    setProducts(state, res) {
        state.products = res.products
        state.numPages = res.numPages
        state.currentPage = res.numPage
    },
    setCurrentProductToBuy(state, product) {
        state.currentProductToBuy = product
    },
    setProductsFilter(state, filter) {
        state.filter = filter
    },
    addProductToShoppingCart(state, product) {
        let currentProduct = state.shoppingCart.find(item => item.id === product.id && item.size === product.size && item.color === product.color)
        if (currentProduct){
            currentProduct.quantity++;
            currentProduct.totalPrice = parseFloat(product.price)*currentProduct.quantity
        } else {
            let newProduct = {
                id : product.id,
                productName: product.productName,
                size: product.size,
                color: product.color,
                quantity: 1,
                unitPrice: product.price,
                totalPrice: product.price
            }
            state.shoppingCart.push(newProduct);
        }
    },
    updatePrice(state, product){
        let i = state.shoppingCart.indexOf(product);
        if(i!==-1) state.shoppingCart[i].totalPrice = product.unitPrice * product.quantity;
    },
    removeProductFromShoppingCart(state, product){
        let i = state.shoppingCart.indexOf(product)
        if(i!==-1) state.shoppingCart.splice(i, 1)
    }
}

const actions = {
    async getProducts({ commit }, numPage) {
        let products = await productService.getProducts(numPage)
        commit('setProducts', products)
        router.push({ name: 'Products', params: { numPage: numPage } })
    },
    async getProduct({ commit }, productId) {
        try {
            let product = await productService.getProduct(productId)
            commit('setCurrentProductToBuy', product)
            router.push({ name: 'ProductDescription' })
        } catch (e) {
            router.push({ name: 'Login' })
        }
    }, 
    async previousPurchase({ commit }, productId) {
        try {
            let product = await productService.getProduct(productId)
            commit('setCurrentProductToBuy', product)
            router.push({ name: 'Product', params: { id: productId } })
        } catch (e) {
            router.push({ name: 'Login' })
        }     
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
