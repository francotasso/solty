import { productService } from '../Services'
import { router } from "../Router"

const state = {
    products: [],
    numPages: 0,
    currentPage: 1,
    filter: { range: 'all', isCategoryActive: false, isSearchActive: false },
    currentProductToBuy: null,
    shoppingCart: [],
    categories: [
        {
            id: 1,
            title: "Polos",
            active: false,
            icon: "https://img.icons8.com/pastel-glyph/64/000000/t-shirt--v3.png",
            iconSelected:
                "https://img.icons8.com/cotton/64/000000/t-shirt--v1.png"
        },
        {
            id: 2,
            title: "Casacas",
            active: false,
            icon: "https://img.icons8.com/ios/64/000000/fireman-coat.png",
            iconSelected: "https://img.icons8.com/office/64/000000/jacket.png"
        },
        {
            id: 3,
            title: "Zapatos",
            active: false,
            icon: "https://img.icons8.com/ios/64/000000/mens-shoe.png",
            iconSelected: "https://img.icons8.com/color/64/000000/mens-shoe.png"
        },
        {
            id: 4,
            title: "Bikinis",
            active: false,
            icon:
                "https://img.icons8.com/ios-glyphs/64/000000/black-woman-bra-.png",
            iconSelected: "https://img.icons8.com/cotton/64/000000/bra.png"
        },
        {
            id: 5,
            title: "Poleras",
            active: false,
            icon: "https://img.icons8.com/ios/64/000000/jacket.png",
            iconSelected: "https://img.icons8.com/dusk/64/000000/jumper.png"
        },
        {
            id: 6,
            title: "Zapatillas",
            active: false,
            icon:
                "https://img.icons8.com/pastel-glyph/64/000000/sneakers--v2.png",
            iconSelected:
                "https://img.icons8.com/cotton/64/000000/sneakers--v2.png"
        }
    ]
}

const getters = {
    productsFiltered(state) {
        if (state.filter.range === 'all') {
            return state.products;
        } else if (state.filter.range === 'lowToHigh') {
            return state.products.sort((a, b) =>
                a.price > b.price ? 1 : a.price < b.price ? -1 : 0
            )
        } else if (state.filter.range === 'highToLow') {
            return state.products.sort((a, b) =>
                a.price < b.price ? 1 : a.price > b.price ? -1 : 0
            )
        } else if (state.filter.range === 'Male') {
            return state.products.filter(
                product => product.gender === 'Male'
            )
        } else if (state.filter.range === 'Female') {
            return state.products.filter(
                product => product.gender === 'Female'
            )
        } else if (state.filter.isSearchActive) {
            return state.products.filter(product => product.productName.toLowerCase().includes(state.filter.range.toLowerCase()) || product.brand.toLowerCase().includes(state.filter.range.toLowerCase()))
        } else if (state.filter.isCategoryActive) {
            return state.products.filter(product => product.category.includes(state.filter.range))
        }
    },
    shoppingCartQuantity(state) {
        return state.shoppingCart.reduce((quantity, item) => { return quantity + parseInt(item.quantity) }, 0)
    },
    shoppingCartTotalPrice(state) {
        return state.shoppingCart.reduce((totalPrice, item) => { return totalPrice + parseFloat(item.totalPrice) }, 0)
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
    setProductsFilter(state, range) {
        state.filter.range = range
    },
    activeSearchFilter(state) {
        state.filter.isSearchActive = true;
    },
    desactiveSearchFilter(state) {
        state.filter.isSearchActive = false;
    },
    activeCategoryFilter(state) {
        state.filter.isCategoryActive = true;
    },
    desactiveCategoryFilter(state) {
        state.filter.isCategoryActive = false;
    },
    addProductToShoppingCart(state, product) {
        let currentProduct = state.shoppingCart.find(item => item.id === product.id && item.size === product.size && item.color === product.color)
        if (currentProduct) {
            currentProduct.quantity++;
            currentProduct.totalPrice = parseFloat(product.price) * currentProduct.quantity
        } else {
            let newProduct = {
                id: product.id,
                productName: product.productName,
                size: product.size,
                color: product.color,
                quantity: 1,
                unitPrice: product.price,
                totalPrice: product.price,
                available: product.available
            }
            state.shoppingCart.push(newProduct);
        }
    },
    updatePrice(state, product) {
        let i = state.shoppingCart.indexOf(product);
        if (i !== -1) {
            let totalPrice = (product.unitPrice * parseInt(product.quantity)).toFixed(2)
            if (isNaN(totalPrice)) {
                state.shoppingCart[i].quantity = 1;
                state.shoppingCart[i].totalPrice = product.unitPrice;
            } else {
                state.shoppingCart[i].totalPrice = totalPrice;
            }
        }
    },
    removeProductFromShoppingCart(state, product) {
        let i = state.shoppingCart.indexOf(product)
        if (i !== -1) state.shoppingCart.splice(i, 1)
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
            router.push({ name: 'ProductDescription', params: { id: productId } })
        } catch (e) {
            router.push({ name: 'Login' })
        }
    },
    setProductsFilter({ commit }, range) {
        commit('setProductsFilter', range);
    },
    activeSearchFilter({ commit }) {
        commit('activeSearchFilter')
    },
    desactiveSearchFilter({ commit }) {
        commit('desactiveSearchFilter')
    },
    activeCategoryFilter({ commit }) {
        commit('activeCategoryFilter')
    },
    desactiveCategoryFilter({ commit }) {
        commit('desactiveCategoryFilter')
    }
};

export const product = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
