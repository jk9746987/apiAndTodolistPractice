import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
// import store from '@/store'
// import { USER_CHECK } from '@/store/action_type'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 登入驗證
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('set_token')) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
