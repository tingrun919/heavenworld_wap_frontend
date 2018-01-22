// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'


import App from './App'
import {router} from './router/index';

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(VueAwesomeSwiper)
// Vue.use(VueMaterial)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
