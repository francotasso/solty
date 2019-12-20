import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import { user } from './UserModule'
import { product } from './ProductModule'
import { payment } from './PaymentModule'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        product,
        payment
    },
    plugins: [createPersistedState()]
})