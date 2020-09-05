import axios from 'axios'
import store from '../Store'
import { BASE_URL as baseURL } from './constants'
axios.defaults.baseURL = baseURL

axios.interceptors.request.use(config => {
    const token = store.state.user.token;
    config.headers.Authorization =  `Bearer ${token}`;
    //config.withCredentials = true;
    return config
}, err => {
    return Promise.reject(err)
})

axios.interceptors.response.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})

export default axios