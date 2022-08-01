import Api from '@/common/api'
import { GET_TODOS, POST_TODOS } from './action_type'

const state = {
}

const mutations = {
}

const actions = {
    [GET_TODOS]() {
        return new Promise((resolve, reject) => {
            let token = localStorage.getItem('set_token')
            Api.get('todos', {
                headers: {
                    Authorization: token
                }
            }).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    [POST_TODOS](context, { todo }) {
        return new Promise((resolve, reject) => {
            Api.post('todos', {
                todo: {
                    content: todo,
                }
            }).then(res => {
                resolve(res)
            }).catch(err => { reject(err) })
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}