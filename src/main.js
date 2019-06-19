// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

//引入 ELEMENT-UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App'
import router from './router'
import store from './vuex/store'

//引入 axios，便于所有模块共享
import axios from 'axios'
//打印
import Print from 'vue-print-nb'

// axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded'
// axios.defaults.headers.post['Content-type'] = 'application/json'
//挂载在 Vue 的原型上
Vue.prototype.$axios = axios;

//注册打印
Vue.use(Print);
//注册 element-ui
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

