import Vue from 'vue'
import Router from 'vue-router'


//路由懒加载
const  Main =() => import('../views/Main')//公共侧边栏

Vue.use(Router)

const routes = [
    {
        path: '/',
        component: Main
    }
]

export default new Router({
    mode: 'history',
    routes
})
