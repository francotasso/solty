import { paymentService } from '../Services'
import { router } from "../Router"

const state = {
    payments: [],
    paymentError: null,
    errorMessagePurchase: null,
    successMessagePurchase: null
}

const mutations = {
    purchaseError(state, error) {
        state.errorMessagePurchase = error
    },
    purchaseSuccess(state) {
        state.successMessagePurchase = { title: 'Compra', body: 'Completado correctamente' }
    },
    removeErrorMessagePurchase(state) {
        state.errorMessagePurchase = null
    },
    removeSuccessMessagePurchase(state) {
        state.successMessagePurchase = null
    },
}

const actions = {
    async executePurchase({ state, commit, rootState }, payment) {
        try {
            let checkout = await paymentService.executePurchase(payment)
            commit('purchaseSuccess', checkout)
            rootState.product.shoppingCart = []
            router.push({ name: 'Products', params: { numPage: 1 } })
        } catch (e) {
            commit('purchaseError', error);
        }
    },
    removeErrorMessagePurchase({ commit }) {
        commit('removeErrorMessagePurchase');
    },
    removeSuccessMessagePurchase({ commit }) {
        commit('removeSuccessMessagePurchase');
    },
};

export const payment = {
    namespaced: true,
    state,
    actions,
    mutations
}