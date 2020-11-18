<!--  -->
<template>
    <el-card shadow="hover">
      <div class="user">
          <img src="userImg">
          <div class="userinfo">
              <p class="name">Hu</p>
              <p class="role">Admin</p>
          </div>
      </div>
      <div class="login-info"></div>
    </el-card>
</template>


<script>
export default {
  data () {
    return {
        userImg: require('../../assets/userimg')
    };
  },

  components: {},

  computed: {},

  methods: {}
}
</script>


<style>
    .el-card {
        widows: 32%;
        margin-bottom:20px;
    }
    .el-card .user .img {
        height: 100px;
        width: 100px;
        border-radius: 50px;
    }
</style>