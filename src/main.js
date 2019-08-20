import Vue from 'vue'
import App from './Components/App.vue'
import { router } from './Router'
import store from './Store'
import Snotify from 'vue-snotify';
import "bootstrap/dist/css/bootstrap.min.css"
import 'vue-snotify/styles/material.css';

Vue.use(Snotify);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
