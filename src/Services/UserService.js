import axios from "axios";
import URL from '../API/API';
import { rejects } from "assert";

export const userService = {
    checkLogin,
    login,
    logout,
    register,
    getProfile,
    updateProfile
}

function checkLogin() {
    let url = URL.url.concat('/auth/check');
    return new Promise((resolve, reject) => {
        axios.get(url, { withCredentials: true })
            .then(res => {
                resolve(res.data.user)
            })
            .catch(error => {
                reject(new Error(`Error ${error}`))
            })
    })
};

function login(email, password) {
    let url = URL.url.concat('/login');
    return new Promise((resolve, reject) => {
        axios.post(url, { email, password }, { withCredentials: true })
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(new Error(`Error ${error}`))
            })
    })
};

function logout() {
    let url = URL.url.concat('/logout');
    return new Promise((resolve, reject) => {
        axios.get(url, { withCredentials: true })
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(new Error(`Error ${error}`))
            });
    })
};

function register(user) {
    let url = URL.url.concat('/register');
    return new Promise((resolve, reject) => {
        axios.post(url, user, { withCredentials: true })
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error.response.data)
            });
    })
};

function getProfile(id) {
    let url = URL.url.concat(`/user/${id}`);
    return new Promise((resolve, reject) => {
        axios.get(url, { withCredentials: true })
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error.response.data)
            });
    })
};

function updateProfile(user) {
    let url = URL.url.concat(`/user/${user._id}`);
    return new Promise((resolve, reject) => {
        axios.put(url, user, { withCredentials: true })
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error.response.data)
            });
    })
};
