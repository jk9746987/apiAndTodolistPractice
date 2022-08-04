import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './auth_module'
import Home from './home_module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Auth,
    Home
  }
})
