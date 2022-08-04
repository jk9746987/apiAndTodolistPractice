import axios from 'axios'
import router from '@/router'
import JwtService from '@/common/jwtService'


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
        if (JwtService.getToken()) {
            _axios.defaults.headers.common['Authorization'] = JwtService.getToken()
        }
        return config
    },
    function (error) {
        switch (error.response.status) {
            case 401:
                router.push({ name: 'Login' })
                _axios.defaults.headers.common['Authorization'] = ''
                localStorage.removeItem("set_token");
                localStorage.removeItem("nickName");
                return Promise.reject(error)
            default:
                return Promise.reject(error)
        }
    }
)

export { _axios }
export default Api