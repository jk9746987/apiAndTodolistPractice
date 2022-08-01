import Api from '@/common/api'
import { SET_NICKNAME } from './mutation_type'
import { POST_REGISTER, POST_SIGN_IN } from './action_type'

const state = {
    nickname: null,
}

const mutations = {
    [SET_NICKNAME](state, payload) {
        state.nickname = payload
    }
}

const actions = {
    [POST_REGISTER](context, { email, nickname, password }) {
        return new Promise((resolve, reject) => {
            Api.post('users', {
                user: {
                    email: email,
                    nickname: nickname,
                    password: password,
                }
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    [POST_SIGN_IN](context, { email, password }) {
        return new Promise((resolve, reject) => {
            Api.post('users/sign_in', {
                user: {
                    email: email,
                    password: password
                }
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
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