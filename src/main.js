import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/forecast.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import axios from 'axios'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

Vue.prototype.$http = axios

new Vue({
  el: '#app',
  render: h => h(App)
})