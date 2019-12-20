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

function checkLogin(){
    let url = URL.url.concat('/auth/check');
    return axios
        .get(
            url,
            {withCredentials: true}
        )
        .then(res =>{
            return res.data;
        })
        .catch(err =>{
            return Promise.reject(new Error(err));
        })
}

function login(email, password) {
    let url = URL.url.concat('/login');
    return axios
        .post(
            url,
            {
                email,
                password
            },
            { withCredentials: true }
        )
        .then(res => {
            return res.data;
        })
        .catch(err => {
            return Promise.reject(new Error(err));
        });
};

function logout() {
    let url = URL.url.concat('/logout');
    return axios.get(url, { withCredentials: true })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return Promise.reject(new Error(err));
        });
};

function register(user) {
    let url = URL.url.concat('/register');
    return axios.post(url, user, { withCredentials: true })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
};

function getProfile(id) {
    let url = URL.url.concat(`/user/${id}`);
    return axios.get(url, { withCredentials: true })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
};

function updateProfile(user) {
    let url = URL.url.concat(`/user/${user._id}`);
    return axios.put(url, user, { withCredentials: true })
        .then(res => {
            return res.data
        })
        .catch(err => {
            return Promise.reject(err.response.data);
        })
}
