import axios from "axios";

export const userService = {
    login,
    logout,
    register,
    getProfile,
    updateProfile
}

function login(email, password) {
    return new Promise((resolve, reject) => {
        axios.post('login', { email, password })
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(new Error(`Error ${error}`))
            })
    })
};

function logout() {
    return new Promise((resolve, reject) => {
        axios.get('logout')
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(new Error(`Error ${error}`))
            });
    })
};

function register(user) {
    return new Promise((resolve, reject) => {
        axios.post('register', user)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error.response.data)
            });
    })
};

function getProfile(id) {
    return new Promise((resolve, reject) => {
        axios.get(`user/${id}`)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error.response.data)
            });
    })
};

function updateProfile(user) {
    return new Promise((resolve, reject) => {
        axios.put(`user/${user._id}`, user)
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error.response.data)
            });
    })
};