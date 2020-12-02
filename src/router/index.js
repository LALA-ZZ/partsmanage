import Vue from 'vue'
import Router from 'vue-router'


//路由懒加载
// const  Main =() => import('../views/Main')//公共侧边栏
// const Home =() => import('../views/Home/Home.vue')
// const EnterpriseResources =() => import('../views/BaseInfoManage/EnterpriseResources/EnterpriseResources.vue')
const Login =() => import('@/views/Login')
//解决vue中重复点击相同的路由报错问题
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)

const routes = [
  // 由于是动态路由，所以在 permission.js配置了，就不需要配置静态路由

  
    // {
    //     path: '/',
    //     component: Main,
    //     children: [//因为其他组件都在main组件里面，所以在main组件中二级路由
    //         {
    //             path: '/',
    //             name: 'home',
    //             component: Home
    //         },
    //         {
    //             path: '/eresourcemanage',
    //             name: 'eresourcemanage',
    //             component: EnterpriseResources
    //         },
    //         {
    //             path: '/partsinfomanage',
    //             name: 'partsinfomanage',
    //             component: () => import('../views/BaseInfoManage/PartsInfo/PartsInfo.vue')
    //         },
    //         {
    //             path: '/warehouseinfomanage',
    //             name: 'warehouseinfomanage',
    //             component: () => import('../views/BaseInfoManage/WarehouseInfo/WarehouseInfo.vue')
    //         },
    //         {
    //             path: '/forecastInfomanage',
    //             name: 'forecastInfomanage',
    //             component: () => import('../views/BaseInfoManage/ForecastInfo/ForecastInfo.vue')
    //         },
    //         {
    //             path: '/optimizationinfomanage',
    //             name: 'optimizationinfomanage',
    //             component: () => import('../views/BaseInfoManage/OptimizationInfo/OptimizationInfo.vue')
    //         },


    //         {
    //             path: '/partsapply',
    //             name: 'partsapply',
    //             component: () => import('../views/EntryManage/PartsApply/PartsApply.vue')
    //         },
    //         {
    //             path: '/applycheck',
    //             name: 'applycheck',
    //             component: () => import('../views/EntryManage/ApplyCheck/ApplyCheck.vue')
    //         },
    //         {
    //             path: '/partsentry',
    //             name: 'partsentry',
    //             component: () => import('../views/EntryManage/PartsEntry/PartsEntry.vue')
    //         },


    //         {
    //             path: '/partsamountverification',
    //             name: 'partsamountverification',
    //             component: () => import('../views/InStockManage/PartsAmountVerification/PartsAmountVerification.vue')
    //         },
    //         {
    //             path: '/partsamountwarnning',
    //             name: 'partsamountwarnning',
    //             component: () => import('../views/InStockManage/PartsAmountWarnning/PartsAmountWarnning.vue')
    //         },


    //         {
    //             path: '/outapply',
    //             name: 'outapply',
    //             component: () => import('../views/OutManage/OutApply/OutApply.vue')
    //         },
    //         {
    //             path: '/outcheck',
    //             name: 'outcheck',
    //             component: () => import('../views/OutManage/OutCheck/OutCheck.vue')
    //         },
    //         {
    //             path: '/partsout',
    //             name: 'partsout',
    //             component: () => import('../views/OutManage/PartsOut/PartsOut.vue')
    //         },


    //         {
    //             path: '/inventoryoptimization',
    //             name: 'inventoryoptimization',
    //             component: () => import('../views/InvenrtoryOptimization/InventoryOptimization.vue')
    //         },
    //         {
    //             path: '/partsDemandforecast',
    //             name: 'partsDemandforecast',
    //             component: () => import('../views/PartsDemandForecast/PartsDemandForecast.vue')
    //         },
    //     ]
    // },

     {
      path: '/', //监听'/'路径，自动重定向要login路径
      redirect: '/login' 
     },
    {
      path: '/login',
      name: 'login',
      component:  Login//登录组件
    }
]

export default new Router({
    mode: 'history',
    routes
})
