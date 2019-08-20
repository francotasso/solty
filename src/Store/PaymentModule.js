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
    executePurchase({ commit }, payment) {
        paymentService.executePurchase(payment).then(res => {
            commit('purchaseSuccess', res);
            router.push({ name: 'Products' });
        }, error => {
            commit('purchaseError', error);
        })
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