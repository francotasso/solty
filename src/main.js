import Vue from 'vue'
import App from './Pages/App.vue'
import { router } from './Router'
import store from './Store'
import axios from './helpers/interceptors'
import "bootstrap/dist/css/bootstrap.min.css"
import { BootstrapVue } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import mixins from './globals/mixins'
import _ from 'lodash'
import wrapperSection from './Layouts/Default.vue'
import { ContentLoader } from 'vue-content-loader'

import './scss/_main.scss'

Vue.component('wrapperSection', wrapperSection)
Vue.component('ContentLoader', ContentLoader)

Vue.use(BootstrapVue)
Vue.use(Vuelidate)

// mixin
Vue.mixin(mixins)

Vue.prototype.axios = axios
Vue.prototype._ = _

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})