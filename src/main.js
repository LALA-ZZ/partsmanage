import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import VueCookie from 'vue-cookies'

//第三方包
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './api/request'//引入网络请求api
import  './mock/index'//引入mock
import './icons/index'//引入icon
// import home from './mock/home';

import htmlToPdf from '@/vendor/htmlToPdf'
Vue.use(htmlToPdf)
Vue.prototype.$http = http
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookie)
//添加到原型中，使其变成全局变量
Vue.prototype.$http = http


// 全局路由守卫控制访问权限
router.beforeEach((to, from, next) => {
  // to 跳转到要去的路径
  // from 从某个路径跳转过来的
  // next 是一个函数，表示放行，有两种方式
  //      1.next()  放行    2.next('/login')，放行到某一路径

  // 如果用户访问的是登录页，直接放行
  if(to.name === 'login') return next();
  // 从sessionStorage中获取保存的token值
  const tokenStr = window.sessionStorage.getItem('token')
  //如果没有token，直接跳转到登录页面
  if(!tokenStr){
    return next({name: 'login'})
  }
  next()

  // store.commit('getToken')
  // let token = store.state.user.token
  // if(!token && to.name !== 'login') {
  //   next({name: 'login'})
  // } else{
  //   next()
  // }
  
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    store.commit('addMenu',router) //初始化的时候，需要把菜单进来
  }
}).$mount('#app')
