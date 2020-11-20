<!--  -->
<template>
    <el-card shadow="hover">
      <div class="user">
          <div class="userinfo">
              <img :src="userImg">
              <p class="name">Hu</p>
              <p class="role">Admin</p>
          </div>
      </div>
      <div class="login-info">
          <p>上次登录时间：<span>2020-11-18</span></p>
          <p>上次登录地点：<span>新乡</span></p>
      </div>
    </el-card>
</template>


<script>
export default {
  data () {
    return {
        userImg: require('../../assets/userimg.gif')
    };
  },

  components: {},

  computed: {},

  methods: {}
}
</script>


<style>
    .el-card {
        widows: 30%;
        margin-top: 18px;
        margin-bottom:20px;
    }
    .el-card .user {
        display: flex;
        align-items: center;
        /* padding-bottom: 20px;
        margin-bottom: 20px; */
        border-bottom: 1px solid #dfe6ec;
    }
    
    .el-card .user .userinfo img {
        height: 100px;
        width: 100px;
        border-radius: 50px;
    }
    .el-card .user .userinfo .name{
        font-size: 32px;
        margin-bottom: 10px;
    }
    .el-card .user .userinfo .role{
        color: #777;
    }

    .el-card .login-info p {
        line-height: 28px;
        font-size: 14px;
        color: #777;
         
    }
    .el-card .login-info span {
        color: #666666;
    }
</style>