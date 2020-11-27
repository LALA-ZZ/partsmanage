import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import VueCookie from 'vue-cookies'

//第三方包
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './api/config'//引入网络请求api
import  './mock/index'//引入mock
import './icons/index'//引入icon
// import home from './mock/home';

Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookie)
//添加到原型中，使其变成全局变量
Vue.prototype.$http = http

router.beforeEach((to, from, next) => {
  // to and from are Route Object,next() must be called to resolve the hook}
  store.commit('getToken')
  let token = store.state.user.token
  if(!token && to.name !== 'login') {
    next({name: 'login'})
  } else{
    next()
  }
  
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')
