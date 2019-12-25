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
        let quantity = 0;
        for(let item of state.shoppingCart){
            quantity+= parseInt(item.quantity);
        }
        return quantity;
    },
    shoppingCartTotalPrice(state){
        let totalPrice = 0;
        for(let item of state.shoppingCart){
            totalPrice+=parseFloat(item.totalPrice);
        }
        return totalPrice;
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
        let cart = state.shoppingCart;
        let u = undefined;
        if (cart !== null && cart.find(item => item.id === product.id)!==u && cart.find(item => item.size === product.size)!==u && cart.find(item => item.color === product.color)!==u) {
            state.shoppingCart.forEach(item => {
                if(item.productName === product.productName && item.size === product.size && item.color === product.color){
                    item.quantity++; 
                    item.totalPrice=parseFloat(product.price)*item.quantity; 
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
                unitPrice: product.price,
                totalPrice: product.price
            }
            state.shoppingCart.push(newProduct);
        }
    },
    updatePrice(state, product){
        let i = state.shoppingCart.indexOf(product);
        state.shoppingCart[i].totalPrice = product.unitPrice * product.quantity;
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
    getProducts({ commit }, numPage) {
        productService.getProducts(numPage).then(res => {
            commit('setProducts', res);
            router.push({ name: 'Products', params: { numPage: numPage } });
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
