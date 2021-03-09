<template>
  <header class="nav-bar">
    <div class="left-content">
      <!-- 菜单伸缩按钮 -->
      <el-button icon="el-icon-s-operation" plain size="mini" @click="collapseMenu"></el-button>
      <!-- <div data-v-4e6f274c=""
           data-v-d16d6306=""
           id="hamburger-container"
           class="hamburger-container"
           style="padding: 0px 0px;margin-right: 0px"
           >
        <svg data-v-4e6f274c="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64" class="hamburger">
          <path data-v-4e6f274c="" d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z">
          </path>
        </svg>
      </div> -->

      <!-- 面包屑 -->
      <div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="current.path" v-if="current">{{current.label}}</el-breadcrumb-item>

        </el-breadcrumb>
      </div>
    </div>

    <!-- 用户中心 -->
    <div class="right-menu">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="userimg"><i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="el-dropdown-menu">
          <!-- <el-dropdown-item @click.native="userCard">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!--    <div class="el-scrollbar__bar is-horizontal"><div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div></div>-->
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "CommonHead",
  data () {
    return {
      userimg: require('../../assets/userimg.gif')
    }
  },
  computed: {
    ...mapState({
      // current: function (state){
      //   state.tab.currentMenu
      // }
      //获取当前的目录
      current: state => state.tab.currentMenu
    })
  },
  methods: {
    //调用 vuex中的tab.js中collapseMenu的方法
    collapseMenu () {
      this.$store.commit('collapseMenu')
    },

    //登录退出
    loginOut () {
      //清除sessionStorage中的token 2020/12/1全家桶
      window.sessionStorage.clear()

      //路由挑战到登录页面
      this.$router.push({ name: 'login' })

      // this.$store.commit('clearToken');
      // this.$store.commit('clearMenu')
      // location.reload()

    },
    userCard () {
      this.$router.push({ name: 'usercard' })
    }
  }
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
/* 左边部分 */
.left-content {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 20px;
}
.left-content .el-button {
  /*面包屑跟 菜单按钮的间距*/
  margin-right: 20px;
}

/* .hamburger-container[data-v-d16d6306] {
  width: 40px;
  height: 100%;
  align-items: center;
  float: left;
  cursor: pointer;
  -webkit-transition: background 0.3s;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;
} */
/* .hamburger[data-v-4e6f274c] {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
} */

.el-breadcrumb__inner a,
.el-breadcrumb__inner.is-link {
  /*面包屑当前激活菜单样式优化*/
  color: #666666;
  font-weight: normal !important;
}

/* 右边部分 */
.right-menu {
  display: flex;
  align-items: center;
  float: right;
  height: 100%;
  cursor: pointer;
  margin-right: 20px;
}
.el-dropdown-link {
  color: #f6f6f6;
}
.el-icon--right {
  color: #2c3e50;
}

/*.el-dropdown i{*/
/*  cursor: pointer;*/
/*  position: center;*/
/*  right: -20px;*/
/*  top: 25px;*/
/*  font-size: 12px;*/
/*}*/
.el-dropdown-menu {
  top: 56px !important;
}
.el-dropdown img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
</style>

