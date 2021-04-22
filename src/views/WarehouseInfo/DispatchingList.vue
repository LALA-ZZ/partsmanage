<!--  -->
<template>
  <div class="common-content">
    <el-card shadow="hover">

      <el-input size="small"
                v-model="queryParams.applyid"
                placeholder="请搜索输入申请单编号"
                clearable
                @clear="getallotApplyList"
                style="width: 250px;">
      </el-input>
      <el-button size="small"
                 type="primary"
                 icon="el-icon-search"
                 @click="getallotApplyList">搜索</el-button>
      <el-table :data="dispatchingList"
                border
                stripe
                highlight-current-row
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                :row-class-name="tableRowClassName">
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
        <el-table-column label="申请单编号"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="申请时间"
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
import Qs from 'qs'
export default {
  data () {
    return {
      //配送方案列表
      dispatchingList: [],
      loading: false,

      // 查询参数
      queryParams: {
        wareid: '',
        applyid: '',
        currentpage: 1,
        pageSize: 10
      },
      total: 100,

    };
  },

  components: {},

  computed: {},
  created () {
    this.queryParams.wareid = this.$route.query.wareid
    console.log(this.queryParams.wareid)
    this.getallotApplyList()
  },

  methods: {

    // 监听获取申请单数据
    getallotApplyList () {
      this.loading = true

      var data = Qs.stringify(this.queryParams)
      this.$axios.post('/api/ch10/applyParts/selectApply', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        console.log(res.data)

        if (res.data.status !== 'success') {
          return this.$message.error('获取数据失败！')
        }
        this.dispatchingList = res.data.dispatchingList
        this.total = res.data.total
      })
      this.loading = false
    },

    // 表格行的样式显示
    tableRowClassName ({ row }) {
      if (row.approvalstatus === 0) {
        return 'error-row';
      } else if (row.approvalstatus === 1) {
        return 'success-row';
      }
      return '';
    },
    // 监听  页码大小 改变的事件,将新的页码大小更新到data中
    handleSizeChange (newSize) {
      console.log(newSize)
      this.queryParams.pageSize = newSize //更新页码大小
      this.getallotApplyList()
    },
    // 监听 当前页 变动时候触发的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryParams.currentpage = newPage //更新当前页码
      this.getallotApplyList()
    },
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>