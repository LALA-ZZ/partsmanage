<template>
  <el-container style="height: 100%">
    <el-aside width="200px"><common-aside/></el-aside>
    <el-container>
      <el-header><common-header/></el-header>
      <tab/>
      <el-main>Main</el-main>
    </el-container>
  </el-container>

<!--  <el-container style="height: 100%">-->
<!--    <el-header><common-header/></el-header>-->
<!--    <el-container>-->
<!--      <el-aside width="200px"><common-aside/></el-aside>-->
<!--      <el-main>-->
<!--        <div data-v-4e6f274c=""-->
<!--             data-v-d16d6306=""-->
<!--             id="hamburger-container"-->
<!--             class="hamburger-container"-->
<!--             style="padding: 0px 0px; margin: 0px">-->
<!--          <svg data-v-4e6f274c="" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="64" height="64" class="hamburger">-->
<!--            <path data-v-4e6f274c="" d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"></path></svg></div>-->

<!--      </el-main>-->
<!--    </el-container>-->
<!--  </el-container>-->
</template>

<script>
import CommonHeader from "../components/common/Header";
import CommonAside from "../components/common/Aside";
import tab from "../components/common/Tab";
export default {
  name: "Main",
  components:{
    CommonAside,
    CommonHeader,
    tab
  }
}
</script>

<style scoped>
  /*.el-header{*/
  /*  background-color: #f6f6f6;*/
  /*}*/


</style>