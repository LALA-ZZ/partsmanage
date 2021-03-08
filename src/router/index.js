import Vue from 'vue'
import Router from 'vue-router'


//路由懒加载
// const Home =() => import('../views/Home/Home.vue')
const Main =() => import('../views/Main.vue')




//解决vue中重复点击相同的路由报错问题
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)

const routes = [
  // 由于是动态路由，所以在 permission.js配置了，就不需要配置静态路由
  // {
  //   path: '/login',
  //   name: 'login',
  //   component:  () => import('../views/Login/index.vue')//登录组件
  // },

    {
        path: '/',
        component: Main,
        redirect: '/welcome',
        children: [//因为其他组件都在main组件里面，所以在main组件中二级路由
          
            {
                path: '/welcome',
                name: 'welcome',
                component: () => import('../views/Welcome.vue')
            },
            
                {
                path: '/forecastinfo',
                name: 'forecastinfo',
                component: () => import('../views/InfomationHall/ForecastInfo.vue')
              },
            {
              path: '/optimizationlist',
              name: 'optimizationlist',
              component: () => import('../views/InventoryOptimization/OptimizationInfo.vue')
             },
            {
                path: '/optimization',
                name: 'optimization',
                component: () => import('../views/InventoryOptimization/InventoryOptimization.vue')
            },


            {
                path: '/forecast',
                name: 'forecast',
                component: () => import('../views/PartsDemandForecast/PartsDemandForecast.vue')
            },
            {
              path: '/forecastlist',
              name: 'forecastlist',
              component: () => import('../views/PartsDemandForecast/ForecastInfo.vue')
          },
        ]
    },

    //  {
    //   path: '/', //监听'/'路径，自动重定向要login路径
    //   redirect: '/login' 
    //  },
     
    
    // {
    //   path: '/',
    //   component: Main,
    //   children: [
    //     { 
    //     path: '/addcheck',
    //     name: 'addcheck',
    //     component: AddCheck 
    //   }
    //   ]
    // },
    
]

export default new Router({
    mode: 'history',
    routes
})
