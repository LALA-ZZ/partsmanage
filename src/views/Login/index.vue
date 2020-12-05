<!-- 登录页面 -->
<template>
  <div class="login-container">
    <el-form ref="loginFormRef" :model="loginForm" class="login-form" :rules="loginFormRules" label-position="left">

      <div class="title-container">
        <h3 class="title">售后配件多级仓库协同管理系统</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1"
          autocomplete="on" />
      </el-form-item>

      <!-- <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual> -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input :key="passwordType" :type="passwordType" v-model="loginForm.password" placeholder="Password"
          name="password" tabindex="2" autocomplete="on" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- </el-tooltip> -->

      <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="handleLogin">登录
      </el-button>
    </el-form>
  </div>
</template>


<script>
export default {
  data () {
    return {
      //登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      passwordType: 'password',
      //表单验证规则对象
      loginFormRules: {
        //验证用户名
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10个字符', trigger: 'blur' }
        ],
        //验证密码
        password: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    };
  },

  components: {},

  computed: {},

  methods: {
    handleLogin () {
      //登录前表单数据预验证
      this.$refs.loginFormRef.validate(validate => {
        console.log(validate)
      })

      //将数据发送后台
      this.$http.post('/permission/getMenu', this.loginForm).then(res => {
        res = res.data;
        if (res.code === 200000) {//登录成功
          // this.$message.success('登录成功！')
          // // 1.登录成功之后的token保存在客户端的sessionStorage中
          // //    1.1项目中除了登录之外的其他api接口，必须在登录之后才能访问
          // //    1.2token只应在当前网站打开期间生效，所以将token保存在sessionStorage中

          window.sessionStorage.setItem("token", res.data.token)
          // // 2.通过变成式导航跳转到后台主页路由地址是/home
          this.$store.commit('setToken', res.data.token)//创建token
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu', res.data.menu)
          this.$store.commit('addMenu', this.$router)
          this.$router.push({ name: 'home' })

        } else {//登录失败
          this.$message.warning(res.data.message)

        }
      })
    },

    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      // console.log(this)
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },


  }
}
</script>


 <style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css  重置element-ui css*/
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>


<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%; /*设置段落的最小高度：*/
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    // position: absolute;
    // left: 50%;
    // top: 40%;
    // transform: translate(-50%, -50%);
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>



