import Api from '@/common/api'
import { POST_SIGN_IN } from './action_type'

const state = {}

const mutations = {}

const actions = {
    [POST_SIGN_IN](context, { email, nickname, password }) {
        return new Promise((resolve, reject) => {
            Api.post('users', {
                email: email,
                nickname: nickname,
                password: password,
            }).then(res => {
                console.log(res)
                resolve()
            }).catch(err => {
                console.log(err)
                reject()
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}