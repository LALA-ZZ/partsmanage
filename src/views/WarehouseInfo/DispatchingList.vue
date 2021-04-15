<!--  -->
<template>
  <div class="common-content">
    <el-card shadow="hover">
      <el-table :data="dispatchingList"
                border
                stripe
                highlight-current-row
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading">
        <div slot="empty"
             class="emptyBg">
          <img src="@/assets/box.jpg"
               alt="">
          <p style="margin: 0px;">没有记录哦~</p>
        </div>

        <el-table-column type="index"
                         label="序号"
                         align="center"
                         width="60px"></el-table-column>
        <el-table-column label="方案编号"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="生成时间"
                         prop=""
                         align="center"></el-table-column>

        <el-table-column label="配送仓库编号"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="配送仓库名称"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="接收仓库编号"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="配件编号"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="配件名称"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="配送数量"
                         prop=""
                         align="center"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>


<script>
export default {
  data () {
    return {
      //配送方案列表
      dispatchingList: [],
      loading: false,
    };
  },

  components: {},

  computed: {},

  methods: {}
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>