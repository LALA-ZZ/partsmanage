<!--  -->
<template>
  <div class="common-content">
    <el-card shadow="hover">
      <!-- 搜索与添加区域 -->
      <el-row :gutter="10">
        <el-col :span="5">
          <el-input v-model="queryInfo.enterprisename" placeholder="请搜索输入企业名称" clearable @clear="getOptimizateList">
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" icon="el-icon-search" @click="getOptimizateList">快速搜索</el-button>
          <!-- <el-button type="success" icon="el-icon-document" @click="showDiaglog">查看报告</el-button> -->
        </el-col>
      </el-row>

      <!-- 表格部分 -->
      <el-table :data="optimizateList" border stripe highlight-current-row v-loading="loading"
        element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column label="优化序列号" prop="" align="center"></el-table-column>
        <el-table-column label="优化时间" prop="" align="center"></el-table-column>
        <el-table-column label="企业名称" prop="" align="center"></el-table-column>
        <!-- <el-table-column label="优化文档" prop="" align="center"></el-table-column> -->
        <el-table-column label="操作" width="auto" align="center">
          <template slot-scope="scope">
            <el-button type="success" size="mini" icon="el-icon-document" @click="showDiaglog(scope.pdfUrl)">查看报告
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryInfo.currentpage" :page-sizes="[8, 10, 15, 20]" :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 查看报告对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="80%" modal :before-close="handleClose">
      <div class="dialogDiv">
        <iframe :src="pdfUrl" frameborder="0" style="width: 100%; height: 100%"></iframe>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { fetchInventoryList } from '@/api/inventory'
// import Cpdf from '../../components/common/Cpdf.vue';
export default {
  data () {
    return {
      queryInfo: {
        enterprisename: '',
        currentpage: 1,
        pageSize: 10
      },
      optimizateList: [],
      loading: false,
      total: 0,
      dialogVisible: false,
      pdfUrl: 'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
    };
  },

  components: {},

  computed: {},

  methods: {

    // 获取优化列表信息
    getOptimizateList () {
      this.loading = true
      fetchInventoryList(this.queryInfo).then(res => {
        if (res.data.meta.status !== 200) {
          return this.$message.error('获取信息失败！')
        }
        this.optimizateList = res.data.optimizateList
      })
      this.loading = false
    },
    // 监听页面大小变化
    handleSizeChange (newsize) {
      this.queryInfo.pageSize = newsize
      this.getOptimizateList()
    },
    // 监听页面变化
    handleCurrentChange (newpage) {
      this.queryInfo.currentpage = newpage
      this.getOptimizateList()
    },
    // getPdfUrl (url) {

    // }
    showDiaglog () {
      this.dialogVisible = true
    }



  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common";
.dialogDiv {
  height: 600px;
  overflow: auto;
}
</style>