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
