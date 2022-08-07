import Api from '@/common/api'
import { POST_REGISTER, POST_SIGN_IN } from './action_type'
import { SET_TOKEN } from './mutation_type'
import JwtService from '@/common/jwtService'

const state = {
}

const mutations = {
    [SET_TOKEN](state, payload) {
        JwtService.saveToken(payload)
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
    // 可用來使用index的mutation
    // context.commit(CHECK_LOGIN, true, { root: true })
    [POST_SIGN_IN](context, { email, password }) {
        return new Promise((resolve, reject) => {
            Api.post('users/sign_in', {
                user: {
                    email: email,
                    password: password
                }
            }).then(res => {
                context.commit(SET_TOKEN, res.headers.authorization)
                localStorage.setItem('nickName', res.data.nickname)
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