import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/auth/Login'
import Register from '@/views/auth/Register'
import Auth from '@/views/Auth'

// 解決路由重覆點擊的報錯問題
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          title: 'login'
        }
      },
      {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
          title: 'register'
        }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 登入驗證
router.beforeEach(async (to, from, next) => {
  window.document.title = to.meta.title
  if (to.meta.requiresAuth && !localStorage.getItem('set_token')) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
