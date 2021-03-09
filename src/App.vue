<template>
  <div id="app">
    <!--    <router-link to="/layout">框架</router-link>-->
    <!--    <router-link to="/pop">弹出窗口</router-link>-->
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  created () {
    //在页面加载时读取localStorage里的状态信息
    if (sessionStorage.getItem('list')) {
      //this.$store.replaceState()替换 store 的根状态
      this.$store.replaceState(Object.assign({}, this.$store.state,
        JSON.parse(window.localStorage.getItem('list'))))
    }
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('list', JSON.stringify(this.$store.state))
    })
  }

}
</script>

<style>
#app {
  height: 100vh;
}
body {
  margin: 0;
}
</style>
