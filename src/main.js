import Vue from 'vue'
import '@/common/polyfills'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './assets/style/main.scss'
import 'nprogress/nprogress.css'
import '@/plugins/element.js'
import '@/plugins/vuejs-logger'
import '@/common/interceptor'
import '@/filters/filters'
import './registerServiceWorker'


import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
