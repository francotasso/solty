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
    async executePurchase({ commit }, payment) {
        try {
            let checkout = await paymentService.executePurchase(payment)
            commit('purchaseSuccess', checkout)
            router.push({ name: 'Products', params: { id: 1 } })
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