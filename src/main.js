import Vue from 'vue'
import App from './components/App.vue'
import VueRouter from 'vue-router'
import store from './store'
import { firebaseApp } from './assets/js/firebaseApp'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueResource from'vue-resource';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import bFormSlider from 'vue-bootstrap-slider';
import 'bootstrap-slider/dist/css/bootstrap-slider.css'
import { apiKey } from './apiKey.json'

// VueRouter functionality and imports.
Vue.use(VueRouter)
import Home from './components/Home.vue'
import GoogleMap from './components/GoogleMap.vue'
const router = new VueRouter({
  mode:'history',
  routes: [
    { path: '/', component: Home },
    { path: '/tool', component: GoogleMap }
  ]
})

Vue.use(bFormSlider)
Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(VueGoogleMaps, {
  load: {
    key: apiKey
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
