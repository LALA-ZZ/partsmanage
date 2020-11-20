import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";


//第三方包
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './api/config'//引入网络请求api
import  './mock/index'//引入mock
import './icons/index'//引入icon

Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.use(ElementUI)

//添加到原型中，使其变成全局变量
Vue.prototype.$http = http

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
