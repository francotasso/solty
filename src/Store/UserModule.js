import { userService } from '../Services'
import { router } from "../Router"

const state = {
    errorMessageRegister: null,
    successMessageRegister: null,
    errorMessageLogin: null,
    errorMessageUpdateProfile: null,
    successMessageUpdateProfile: null,
    profileLoggedUser: null
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
    setProfileLoggedUser(state, profile) {
        state.profileLoggedUser = profile
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
                localStorage.setItem(
                    "userFullName",
                    `${user.firstName} ${user.lastName}`
                );
                commit('setProfileLoggedUser', user)
                localStorage.setItem("userId", user._id)
                router.push({ name: 'Products', params: { numPage: 1 } });
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
            localStorage.setItem('userFullName', `${user.firstName} ${user.lastName}`);
            localStorage.setItem('userId', user._id);
            commit('loginSuccess');
            commit('setProfileLoggedUser', user);
            router.push({ name: 'Products', params: { numPage: 1 } });
        } catch (e) {
            commit('loginError', 'Email o contraseña inválido')
            router.push({ name: 'Login' })
        }
    },
    removeErrorMessageLogin({ commit }) {
        commit('removeErrorMessageLogin');
    },
    async logout() {
        let session = await userService.logout()
        console.log(session.text)
        window.localStorage.clear()
        router.push({ name: 'Login' })
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
        commit('setProfileLoggedUser', user)
    },
    async updateProfile({ state, commit, dispatch }, userLogged) {
        try {
            let user = await userService.updateProfile(userLogged)
            if (user) {
                commit('updateProfileSuccess', "Actualizado correctamente")
                commit('setProfileLoggedUser', user);
                localStorage.userFullName = state.profileLoggedUser.firstName + " " + state.profileLoggedUser.lastName
            }
            router.push({ name: 'Products', params: { numPage: 1 } });
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