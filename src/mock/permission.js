import Mock from 'mockjs'

export default {
  getMenu( config){
    const {username, password } = JSON.parse(config.body);//JSON.parse() 方法用于将一个 JSON 字符串转换为对象。
    console.log(JSON.parse(config.body));
     // 先判断用户是否存在 ，两个用户
    if( username === 'admin' || username ==='wp'){
      // 判断账号和密码是否对应
      if(username === 'admin' && password === '111'){
        return{
          code: 200000,
          data: {
            menu: [
                {
                  path: '/',
                  name: 'home',
                  label: '首页',
                  icon: 'home',
                  url: 'Home/Home'//Home组件的地址
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
                      icon: 'data',
                      url: 'BaseInfoManage/EnterpriseResources/EnterpriseResources'
                    },
                    {
                      path: '/partsinfomanage',
                      name: 'partsinfomanage',
                      label: '配件信息',
                      icon: 'data',
                      url: 'BaseInfoManage/PartsInfo/PartsInfo'
                    },
                    {
                      path: '/warehouseinfomanage',
                      name: 'warehouseinfomanage',
                      label: '仓库信息',
                      icon: 'data',
                      url: ''
                    },
                    {
                      path: '/forecastInfomanage',
                      name: 'forecastInfomanage',
                      label: '预测信息',
                      icon: 'data',
                      url: ''
                    },
                    {
                      path: '/optimizationinfomanage',
                      name: 'optimizationinfomanage',
                      label: '优化信息',
                      icon: 'data',
                      url: ''
                    },
                  ]
                },
                {
                  path: '/storage',
                  name: 'storage',
                  label: '入库管理',
                  icon: 'management',
                  children: [
                    {
                      path: '/partsapply',
                      name: 'partsapply',
                      label: '配件申请',
                      icon: 'management',
                      url: ''
                    },
                    {
                      path: '/applycheck',
                      name: 'applycheck',
                      label: '申请审批',
                      icon: 'management',
                      url: ''
                    },
                    {
                      path: '/partsentry',
                      name: 'partsentry',
                      label: '配件入库',
                      icon: 'management',
                      url: ''
                    },
                  ]
                },
                {
                  path: '/instock',
                  name: 'instock',
                  label: '在库管理',
                  icon: 'management',
                  children: [
                    {
                      path: '/partsamountverification',
                      name: 'partsamountverification',
                      label: '库存盘点',
                      icon: 'management',
                      url: ''
                    },
                    {
                      path: '/partsamountwarnning',
                      name: 'partsamountwarnning',
                      label: '库存预警',
                      icon: 'management',
                      url: ''
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
                      path: '/outapply',
                      name: 'outapply',
                      label: '出库申请',
                      icon: 'management',
                      url: ''
                    },
                    {
                      path: '/outcheck',
                      name: 'outcheck',
                      label: '出库审批',
                      icon: 'management',
                      url: ''
                    },
                    {
                      path: '/partsout',
                      name: 'partsout',
                      label: '配件出库',
                      icon: 'management',
                      url: ''
                    },
                  ]
                },
                {
                  path: '/partsDemandforecast',
                  name: 'partsDemandforecast',
                  label: '配件需求预测',
                  icon: 'opportunity',
                  url: ''
                },
                {
                  path: '/inventoryoptimization',
                  name: 'inventoryoptimization',
                  label: '安全库存优化',
                  icon: 'opportunity',
                  url: ''
                },
            ],
            token: Mock.Random.guid(),
            message: '获取成功',
          }
        }
      }else if(username === 'wp' && password === '111' ){
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
                icon: 'data',
                children: [
                  {
                    path: '/eresourcemanage',
                    name: 'eresourcemanage',
                    label: '企业资源',
                    icon: 'data',
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