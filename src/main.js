import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import '@/assets/font/font.css'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.config.devtools = true;

Vue.use(Loading);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
