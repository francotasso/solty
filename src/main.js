import Vue from 'vue'
import App from './Pages/App.vue'
import { router } from './Router'
import store from './Store'
import Snotify from 'vue-snotify';
import "bootstrap/dist/css/bootstrap.min.css"
import { BootstrapVue } from 'bootstrap-vue'
import 'vue-snotify/styles/material.css';
import wrapperSection from './Layouts/Default.vue';

Vue.component('wrapperSection', wrapperSection);

Vue.use(Snotify);
Vue.use(BootstrapVue)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
