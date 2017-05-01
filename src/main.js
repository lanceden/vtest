// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Loading from './components/Loading'
import store from './store'
import filters from './filters'
import axios from 'axios'
import tw from 'vee-validate/dist/locale/zh_TW'
import VeeValidate, { Validator } from 'vee-validate'

Validator.addLocale(tw)
Validator.updateDictionary({
  zh_TW: { tw }
})
Vue.use(VeeValidate, {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'zh_TW',
  strict: true
})

Vue.config.productionTip = false
Vue.use(Loading)

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

axios.interceptors.request.use(function (config) {
  store.dispatch('ShowLoading')
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  store.dispatch('HideLoading')
  return response
}, function (error) {
  alert('請先登入!')
  store.state.login.auth = false
  router.push('/Login')
  return Promise.reject(error)
})

axios({
  method: 'get',
  url: `/api/Customer/Get`
}).then(model => {
  console.log(model.data)
})
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})