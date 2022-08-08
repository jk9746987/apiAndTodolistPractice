import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './auth_module'
import Home from './home_module'
import { CHECK_LOGIN } from './mutation_type'
import { GET_CHECK } from './action_type'
import Api from '@/common/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    [CHECK_LOGIN](state, payload) {
      state.isLogin = payload
    }
  },
  actions: {
    [GET_CHECK](context) {
      return new Promise((resolve, reject) => {
        let token = localStorage.getItem('set_token')
        Api.get('todos', {
          headers: {
            Authorization: token
          }
        }).then((res) => {
          context.commit(CHECK_LOGIN, true)
          resolve(res)
        }).catch((err) => {
          context.commit(CHECK_LOGIN, false)
          reject(err)
        })
      })
    }
  },
  modules: {
    Auth,
    Home
  }
})
