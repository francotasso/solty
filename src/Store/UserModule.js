import { userService } from '../Services'
import { router } from "../Router"

const state = {
    errorMessageRegister: null,
    successMessageRegister: null,
    errorMessageLogin: null,
    errorMessageUpdateProfile: null,
    successMessageUpdateProfile: null,
    userAuth: null
};

const mutations = {
    registerError(state, error) {
        state.errorMessageRegister = error
    },
    registerSuccess(state) {
        state.successMessageRegister = { title: 'Registro', body: 'Completado correctamente' }
    },
    removeErrorMessageRegister(state) {
        state.errorMessageRegister = null
    },
    removeSuccessMessageRegister(state) {
        state.successMessageRegister = null
    },
    loginSuccess(state) {
        state.errorMessageLogin = null
    },
    loginError(state, message) {
        state.errorMessageLogin = { text: message }
    },
    removeErrorMessageLogin() {
        state.errorMessageLogin = null
    },
    setUserAuth(state, profile) {
        state.userAuth = profile
    },
    updateProfileError(state, error) {
        state.errorMessageUpdateProfile = error
    },
    updateProfileSuccess(state, text) {
        state.successMessageUpdateProfile = { title: 'Perfil', body: text }
    },
    removeErrorMessageUpdateProfile(state) {
        state.errorMessageUpdateProfile = null
    },
    removeSuccessMessageUpdateProfile(state) {
        state.successMessageUpdateProfile = null
    }
}

const actions = {
    async loginThirdParty({ commit }) {
        try {
            let user = await userService.checkLogin()
            if (user.hasOwnProperty('googleId') || user.hasOwnProperty('facebookId')) {
                commit('setUserAuth', user)
                router.push({ name: 'HomePage' });
            }
        } catch (e) {
            commit('loginError', 'Error al iniciar sesión con terceros, vuelva a intentarlo en unos minutos')
            router.push({ name: 'Login' })
        }
    },

    async checkLogin() {
        try {
            let user = await userService.checkLogin()
            if (Object.keys(user).length === 0) {
                window.localStorage.clear()
                router.push({ name: 'Login' })
            }
        } catch (e) {
            window.localStorage.clear()
            router.push({ name: 'Login' })
        }
    },
    async login({ state, commit, dispatch }, { email, password }) {
        try {
            let user = await userService.login(email, password)
            commit('loginSuccess');
            commit('setUserAuth', user);
            router.push({ name: 'HomePage' });
        } catch (e) {
            commit('loginError', 'Email o contraseña inválido')
            router.push({ name: 'Login' })
        }
    },
    removeErrorMessageLogin({ commit }) {
        commit('removeErrorMessageLogin');
    },
    async logout({ commit }) {
        let session = await userService.logout()
        console.log(session.text)
        commit('setUserAuth', null)
        router.push({ name: 'LoginPage' })
    },
    async register({ commit }, user) {
        try {
            let signup = await userService.register(user)
            console.log(signup.text)
            commit('registerSuccess')
            router.push({ name: 'Login' })
        } catch (e) {
            commit('registerError', error)
        }
    },
    removeErrorMessageRegister({ commit }) {
        commit('removeErrorMessageRegister');
    },
    removeSuccessMessageRegister({ commit }) {
        commit('removeSuccessMessageRegister');
    },
    async getProfile({ commit }, id) {
        let user = await userService.getProfile(id)
        commit('setUserAuth', user)
    },
    async updateProfile({ state, commit, dispatch }, userLogged) {
        try {
            let user = await userService.updateProfile(userLogged)
            if (user) {
                commit('updateProfileSuccess', "Actualizado correctamente")
                commit('setUserAuth', user);
            }
            router.push({ name: 'HomePage' });
        } catch (error) {
            commit('updateProfileError', error);
        }
    },
    removeErrorMessageUpdateProfile({ commit }) {
        commit('removeErrorMessageUpdateProfile');
    },
    removeSuccessMessageUpdateProfile({ commit }) {
        commit('removeSuccessMessageUpdateProfile');
    }
};

export const user = {
    namespaced: true,
    state,
    mutations,
    actions
}