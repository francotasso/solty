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
    loginError(state) {
        state.errorMessageLogin = { text: 'Email o contraseña inválido' }
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
    updateProfileSuccess(state) {
        state.successMessageUpdateProfile = { title: 'Perfil', body: 'Actualizado correctamente' }
    },
    removeErrorMessageUpdateProfile(state) {
        state.errorMessageUpdateProfile = null
    },
    removeSuccessMessageUpdateProfile(state) {
        state.successMessageUpdateProfile = null
    }
}

const actions = {
    login({ state, commit, dispatch }, { email, password }) {
        userService.login(email, password).then(data => {
            localStorage.setItem('userFullName', data.text);
            localStorage.setItem('userId', data.id);
            commit('loginSuccess');
            dispatch('getProfile', localStorage.getItem('userId'));
            router.push({ name: 'Products' });
        }, error => {
            commit('loginError');
            router.push({ name: 'Login' });
        });
    },
    loginGoogle({ state, commit, dispatch }, { }) {
        userService.loginGoogle().then(data => {
            localStorage.setItem('userFullName', `${data.firstName} ${data.lastName}`);
            localStorage.setItem('userId', data._id);
        }, error => {
            commit('loginError');
            router.push({ name: 'Login' });
        })
    },
    removeErrorMessageLogin({ commit }) {
        commit('removeErrorMessageLogin');
    },
    logout({ commit }) {
        userService.logout().then(data => {
            localStorage.removeItem('userFullName');
            localStorage.removeItem('userId');
            localStorage.removeItem('googleUp');
            router.push({ name: 'Login' });
        }, error => {
        });
    },
    register({ commit }, user) {
        userService.register(user).then(data => {
            commit('registerSuccess');
            router.push({ name: 'Login' });
        }, error => {
            commit('registerError', error);
        });
    },
    removeErrorMessageRegister({ commit }) {
        commit('removeErrorMessageRegister');
    },
    removeSuccessMessageRegister({ commit }) {
        commit('removeSuccessMessageRegister');
    },
    getProfile({ commit }, id) {
        userService.getProfile(id).then(data => {
            commit('setProfileLoggedUser', data);
        }, error => {
        });
    },
    updateProfile({ state, commit, dispatch }, user) {
        userService.updateProfile(user).then(data => {
            commit('updateProfileSuccess');
            dispatch('getProfile', localStorage.getItem('userId'));
            localStorage.userFullName = state.profileLoggedUser.firstName + " " + state.profileLoggedUser.lastName;
            router.push({ name: 'Products' });
        }, error => {
            commit('updateProfileError', error);
            dispatch('getProfile', localStorage.getItem('userId'));
        });
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