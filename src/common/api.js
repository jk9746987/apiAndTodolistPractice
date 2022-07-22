import axios from 'axios'

const config = {
    baseURL: 'https://todoo.5xcamp.us/'
}

const _axios = axios.create(config)

const Api = {
    get(resource, params) {
        return _axios.get(resource, { params: params })
    },

    post(resource, params) {
        return _axios.post(resource, params)
    },

    put(resource, params) {
        return _axios.put(resource, params)
    },

    delete(resource, params) {
        return _axios.delete(resource, { params: params })
    }

}

export default Api