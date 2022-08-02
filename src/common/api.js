import axios from 'axios'
import router from '@/router'

const config = {
    baseURL: 'https://todoo.5xcamp.us/'
}

const _axios = axios.create(config)

const Api = {
    get(resource, params) {
        return _axios.get(resource, params)
    },

    post(resource, params) {
        return _axios.post(resource, params)
    },

    put(resource, params) {
        return _axios.put(resource, params)
    },

    delete(resource, params) {
        return _axios.delete(resource, { params: params })
    },

    patch(resource, params) {
        return _axios.patch(resource, params)
    }

}

_axios.interceptors.request.use(
    function (config) {
        if (localStorage.getItem('set_token')) {
            _axios.defaults.headers.common['Authorization'] = localStorage.getItem('set_token')
        }
        console.log(config)
        return config
    },
    function (error) {
        console.log(error)
        return Promise.reject(error)
    }
)

_axios.interceptors.response.use(
    function (config) {
        console.log(config)
        return config
    },
    function (error) {
        switch (error.response.status) {
            case 401:
                router.push({ name: 'Login' })
                localStorage.clear()
                break;
            default:
                return Promise.reject(error)
        }
    }
)


export default Api