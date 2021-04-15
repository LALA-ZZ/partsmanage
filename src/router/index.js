import Vue from 'vue'
import Router from 'vue-router'


//路由懒加载并打包分组
const Main = () => import(/* webpackChunkName: "Main_welcome" */ '../views/Main.vue')
const Welcome = () => import(/* webpackChunkName: "Main_welcome" */ '../views/Welcome.vue')
const Forecast = () => import(/* webpackChunkName: "Forecast_forecastinfo_forecastlist" */ '../views/PartsDemandForecast/PartsDemandForecast.vue')
const Forecastinfo = () => import(/* webpackChunkName: "Forecast_forecastinfo_forecastlist" */ '../views/InfomationHall/ForecastInfo.vue')
const Forecastlist = () => import(/* webpackChunkName: "Forecast_forecastinfo_forecastlist" */ '../views/PartsDemandForecast/ForecastInfo.vue')
const Optimization = () => import(/* webpackChunkName: "Optimization_optimizationlist" */ '../views/InventoryOptimization/InventoryOptimization.vue')
const Optimizationlist= () => import(/* webpackChunkName: "Optimization_optimizationlist" */ '../views/InventoryOptimization/OptimizationInfo.vue')

// 仓库管理
const Warehouseinfo =() =>import(/* webpackChunkName: "Warehouse" */ '../views/WarehouseInfo/WarehouseInfo.vue' )
const LocaleApply =() => import(/* webpackChunkName: "Warehouse" */ '../views/WarehouseInfo/LocaleApply.vue')
const Waremanage =() => import(/* webpackChunkName: "Warehouse" */ '../components/common/WareManage.vue')
const ApplyList =()=> import(/* webpackChunkName: "Warehouse" */ '../views/WarehouseInfo/ApplyList.vue')
const DispatchingList =()=> import(/* webpackChunkName: "Warehouse" */ '../views/WarehouseInfo/DispatchingList.vue')


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
                component: Welcome
            },
            {
              path: '/usercard',
                name: 'usercard',
                component: () => import('../components/common/UserCard.vue')
            },
            
                {
                path: '/forecastinfo',
                name: 'forecastinfo',
                component: Forecastinfo
              },
              {
                path: '/wareinfo',
                name: 'wareinfo',
                component: Warehouseinfo
               },
               {
                path: '/localeappl',
                name: 'localeappl',
                component: LocaleApply
               },
               {
                path: '/waremanage',
                name: 'waremanage',
                component: Waremanage
               },
               {
                path: '/applylist',
                name: 'applylist',
                component: ApplyList
               },
               {
                path: '/dispatchlist',
                name: 'dispatchlist',
                component: DispatchingList
               },
               
            {
              path: '/optimizationlist',
              name: 'optimizationlist',
              component: Optimizationlist
             },
            {
                path: '/optimization',
                name: 'optimization',
                component: Optimization
            },


            {
                path: '/forecast',
                name: 'forecast',
                component: Forecast
            },
            {
              path: '/forecastlist',
              name: 'forecastlist',
              component: Forecastlist
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
