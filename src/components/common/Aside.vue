<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <el-submenu  :index="item.path" v-for="item in asideMenu" :key="item.path" @click="clickMenu(item)">
      <template slot="title">
        <i :class="'el-icon-s-' + item.icon"></i>
        <span>{{item.label}}</span>
      </template>

      <el-submenu  :index="subItem.path" v-for="subItem in item.children" :key="subItem.path" @click="clickMenu(subItem)">
        <template slot="title">
          <i :class="'el-icon-s-' + subItem.icon"></i>
          <span >{{subItem.label}}</span>
        </template>

        <el-menu-item :index="thirdLevelItem.path" v-for="thirdLevelItem in subItem.children" :key="thirdLevelItem.path" @click="clickMenu(thirdLevelItem)">
          <template slot="title">
            <span>{{thirdLevelItem.label}}</span>
          </template>
          <!--          <el-menu-item index="1-4-1"><span>{{thirdLevelItem.label}}</span></el-menu-item>-->
        </el-menu-item>
      </el-submenu>
    </el-submenu >
  </el-menu>

</template>

<script>
export default {
  name: "CommonAside",
  data(){
    return{
      asideMenu:[
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 'home'
        },
        {
          path: '/baseinfomation',
          name: 'baseinfomation',
          label: '基础信息管理',
          icon: 'data',
          children:[
            {
              path: '/enterpriseres',
              name: 'enterpriseres',
              label: '企业资源',
              icon: 'data',
              children: [
                {
                  path: '/selinfo',
                  name: 'selinfo',
                  icon: 'data',
                  label: '个人信息',
                },
                {
                  path: '/supplierinfo',
                  name: 'supplierinfo',
                  icon: 'data',
                  label: '供应商信息',
                },
                {
                  path: '/logisticsinfo',
                  name: 'logisticsinfo',
                  icon: 'data',
                  label: '物流商信息',
                },
                {
                  path: '/clientinfo',
                  name: 'clientinfo',
                  icon: 'data',
                  label: '客户信息',
                },
              ]

            },
            {
              path: '/partsinfo',
              name: 'partsinfo',
              label: '配件信息',
              icon: 'data',
            },
            {
              path: '/warehouseinfo',
              name: 'warehouseinfo',
              label: '仓库信息',
              icon: 'data',
            },
            {
              path: '/preinfo',
              name: 'preinfo',
              label: '预测信息',
              icon: 'data',
            },
            {
              path: '/optimizeinfo',
              name: 'optimizeinfo',
              label: '优化信息',
              icon: 'data',
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
              path: '/partsapl',
              name: 'partsapl',
              label: '配件申请',
              icon: 'management',
            },
            {
              path: '/aplcheck',
              name: 'aplcheck',
              label: '申请审批',
              icon: 'management',
            },
            {
              path: '/partsentry',
              name: 'partsentry',
              label: '配件入库',
              icon: 'management',
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
              path: '/takestock',
              name: 'takestock',
              label: '库存盘点',
              icon: 'management',
            },
            {
              path: '/stowarning',
              name: 'stowarning',
              label: '库存预警',
              icon: 'management',
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
              path: '/partsput',
              name: 'partsput',
              label: '配件出库',
              icon: 'management',
            },
          ]
        },
        {
          path: '/damandpre',
          name: 'damandpre',
          label: '配件需求预测',
          icon: 'opportunity'
        },
        {
          path: '/saftystock',
          name: 'saftystock',
          label: '安全库存优化',
          icon: 'opportunity'
        },
      ]
    }
  },
  computed:{//计算属性
    //判断菜单是否有子菜单
    noChildren(){
      return this.asideMenu.filter(item => !item.children);
    },
    hasChildren(){
      return this.asideMenu.filter(item => item.children);
    }
  },
  methods: {
    //点击左侧菜单，面包屑联动
    clickMenu(item){
      this.$store.commit('selectMenu',item)
    }
  }
}
</script>

<style scoped>
.el-menu{
  height: 100%;
  border: none;
}
</style>