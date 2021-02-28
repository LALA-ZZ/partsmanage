import Mock from 'mockjs'

export default {
  getMenu( config){
    const {username, password } = JSON.parse(config.body);//JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
    console.log(JSON.parse(config.body));
     // 先判断用户是否存在 ，两个用户
    if( username === 'admin' || username ==='wp'){
      // 判断账号和密码是否对应
      if(username === 'admin' && password === '111111'){
        return{
          code: 200000,
          data: {
            menu: [
                {
                  path: '/home',
                  name: 'home',
                  label: '首页',
                  icon: 'home',
                  alwaysShow: true,
                  url: 'Home/Home'//Home组件的地址
                },
                {
                  path: '/userma',
                  name: 'userma',
                  label: '用户管理',
                  icon: 'custom',
                  children: [
                    {
                      path: '/user',
                      name: 'user',
                      label: '用户列表',
                      
                      url: 'UserManage/User'
                    },
                    // {
                    //   path: '/xiaoniu',
                    //   name: 'xiaoniu',
                    //   label: '小妞',
                    //   url: 'XiaoNiu/XiaoNiu'
                    // },
                  ]
                },
                {
                  path: '/permissionmanage',
                  name: 'permissionmanage',
                  label: '权限管理',
                  icon: 'flag',
                  children: [
                    {
                      path: '/roler',
                      name: 'roler',
                      label: '角色列表',
                      
                      url: 'Permission/Roler'
                    },
                    {
                      path: '/permission',
                      name: 'permission',
                      label: '权限列表',
                      
                      url: 'Permission/Permission'
                    },
                  ]
                },
                {
                  path: '/baseinfomation',
                  name: 'baseinfomation',
                  label: '基础信息管理',
                  icon: 'data',
                  children: [
                    {
                      path: '/eresourcemanage',
                      name: 'eresourcemanage',
                      label: '企业资源',
                      
                      url: 'BaseInfoManage/EnterpriseResources/EnterpriseResources'
                    },
                    {
                      path: '/partsinfomanage',
                      name: 'partsinfomanage',
                      label: '配件信息',
                      
                      url: 'BaseInfoManage/PartsInfo/PartsInfo'
                    },
                    {
                      path: '/warehouseinfomanage',
                      name: 'warehouseinfomanage',
                      label: '仓库信息',
                      
                      url: 'BaseInfoManage/WarehouseInfo/WarehouseInfo'
                    },
                    
                  ]
                },
                {
                  path: '/storage',
                  name: 'storage',
                  label: '入库管理',
                  icon: 'shop',
                  children: [
                    {
                      path: '/partsapply',
                      name: 'partsapply',
                      label: '创建入库单',
                      url: 'EntryManage/CreateStockIn'
                    },
                    {
                      path: '/applylist',
                      name: 'applylist',
                      label: '入库单列表',
                      url: 'EntryManage/StockInList'
                    },
                    {
                      path: '/applycheck',
                      name: 'applycheck',
                      label: '入库审批',
                      url: 'EntryManage/StockInApproval'
                    },
                    // {
                    //   path: '/partsentry',
                    //   name: 'partsentry',
                    //   label: '配件入库',
                    //   url: ''
                    // },
                  ]
                },
                {
                  path: '/instock',
                  name: 'instock',
                  label: '在库管理',
                  icon: 'check',
                  children: [
                    {
                      path: '/verification',
                      name: 'verification',
                      label: '库存盘点',
                      url: 'InStockManage/StockCheck'
                    },
                    {
                      path: '/partsamountwarnning',
                      name: 'partsamountwarnning',
                      label: '库存预警',
                      url: 'InStockManage/Warnning'
                    },
                    {
                      path: '/inventoryList',
                      name: 'inventoryList',
                      label: '库存列表',
                      url: 'InStockManage/Inventory'
                    },
                  ]
                },
                {
                  path: '/putstorage',
                  name: 'putstorage',
                  label: '出库管理',
                  icon: 'management',
                  children: [
                    {
                      path: '/creatStockOut',
                      name: 'creatStockOut',
                      label: '创建出库单',
                      url: 'OutManage/CreatStockOut'
                    },
                    {
                      path: '/outapply',
                      name: 'outapply',
                      label: '出库申请',
                      url: 'OutManage/OutApply'
                    },
                    {
                      path: '/outapplylist',
                      name: 'outapplylist',
                      label: '申请列表',
                      url: 'OutManage/OutApplyList'
                    },
                    {
                      path: '/outcheck',
                      name: 'outcheck',
                      label: '出库审批',
                      url: 'OutManage/OutCheck'
                    },
                    {
                      path: '/partsout',
                      name: 'partsout',
                      label: '配件出库',
                      url: ' '
                    },
                    
                  ]
                },
                {
                  path: '/partsDemandforecast',
                  name: 'partsDemandforecast',
                  label: '配件需求预测',
                  icon: 'marketing',
                  children: [
                    // {
                    //   path: '/forecastInfo',
                    //   name: 'forecastInfo',
                    //   label: '预测信息列表',
                    //   url: ''
                    // },
                    {
                      path: '/forecast',
                      name: 'forecast',
                      label: '需求预测',
                      url: 'PartsDemandForecast/PartsDemandForecast',
                    },
                    
                  ]
                },
                {
                  path: '/inventoryoptimization',
                  name: 'inventoryoptimization',
                  label: '安全库存优化',
                  icon: 'opportunity',
                  children: [
                    // {
                    //   path: '/optimizationinfo',
                    //   name: 'optimizationinfo',
                    //   label: '优化信息列表',
                    //   url: ''
                    // },
                    {
                      path: '/optimization',
                      name: 'optimization',
                      label: '库存优化',
                      url: 'InventoryOptimization/InventoryOptimization'
                    },
                  ]
                  
                },
            ],
            token: Mock.Random.guid(),
            message: '获取成功',
          }
        }
      }else if(username === 'wp' && password === '111111' ){
        return{
          code: 200000,
          data: {
            menu: [
              {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home',
                url: 'Home/Home'
              },
              {
                path: '/baseinfomation',
                name: 'baseinfomation',
                label: '基础信息管理',
                
                children: [
                  {
                    path: '/eresourcemanage',
                    name: 'eresourcemanage',
                    label: '企业资源',
                    
                    url: 'BaseInfoManage/EnterpriseResources/EnterpriseResources'
                  },
                  
                ]
              },
            ],
            token: Mock.Random.guid(),
            message: '获取成功',
          },
         
        }
      }else{
        return{
          code: -9999,
          data: {
           message: '密码错误'
          }

        }
      }
    }else{
      return{
        code: -9999,
        data: {
          message: '用户不存在'
        }
      }
    }
  }
}