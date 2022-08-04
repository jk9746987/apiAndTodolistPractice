import Vue from 'vue'
import Vuex from 'vuex'
import Login from './login_module'
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
    Login,
    Home
  }
})
