<!--  -->
<template>
  <div class="common-content">
    <el-card shadow="hover">
      <!-- 外围tabs -->
      <el-form ref="paramsFormRef" :model="paramsForm">
        <el-tabs>
          <el-tab-pane label="上传文件优化">
            <!-- 内部的 tab 标签 -->
            <!-- 步骤条 -->
            <el-steps :space="600" :active="activeName - 0" finish-status="success" align-center
              style="font-size: 13px; margin: 15px;">
              <el-step title="处理数据文件"></el-step>
              <el-step title="处理仓库距离数据"></el-step>
              <el-step title="库存优化"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>

            <el-tabs :tab-position="'left'" style="margin-top: 20px;" v-model="activeName"
              :before-leave="beforeTabLeave">
              <el-tab-pane label="处理优化数据" name="0">
                <el-alert title="先下载数据模板，再将填写好的数据文件上传！" center type="warning" show-icon>
                </el-alert>
                <!-- 下载模板区域 -->
                <div style="text-align: center; margin: 20px;">
                  <book-type-option v-model="bookType"> </book-type-option>
                  <el-button :loading="downloadLoading" type="success" icon="el-icon-document" @click="handleDownload">
                    下载数据模板
                  </el-button>
                  <upload excelFile="updata" @uploadUrl="actionUrl">
                  </upload>

                </div>
              </el-tab-pane>
              <!-- 上传文件 -->
              <el-tab-pane label="处理仓库距离数据" name="1">
                <el-alert title="先下载数据模板，再将填写好的数据文件上传！" center type="warning" show-icon></el-alert>
                <div style="text-align: center; margin: 20px;">
                  <book-type-option v-model="bookType"> </book-type-option>
                  <el-button :loading="downloadLoading1" type="success" icon="el-icon-document"
                    @click="distanceDownload">
                    下载距离模板
                  </el-button>
                  <upload excelFile="updistance" @uploadUrl="actionUrl1"></upload>
                </div>
              </el-tab-pane>

              <el-tab-pane label="库存优化" name="2">
                <el-button type="primary" plain>开始优化</el-button>
                <el-button type="success" plain @click="getPdf()">生成结果单</el-button>
                <div class="row" id="pdfDom">
                  <el-table :data="optimizationOutcomList" border stripe highlight-current-row v-loading="loading"
                    element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                    <el-table-column type="index" label="序号" align="center" width="60px"></el-table-column>
                    <el-table-column label="仓库编号" prop="" align="center"></el-table-column>
                    <el-table-column label="仓库名称" prop="" align="center"></el-table-column>
                    <el-table-column label="配件名称" prop="" align="center"></el-table-column>
                    <el-table-column label="安全库存数量" prop="" align="center"></el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>

          <el-tab-pane label="系统数据优化">
            <el-date-picker v-model="seachForm.dateInterval" type="daterange" align="left" unlink-panels
              range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
            <el-button type="primary" plain>开始预测</el-button>
            <el-button type="success" plain @click="getPdf()">生成结果单</el-button>
            <div class="row" id="pdfDom">
              <el-table :data="optimizationOutcomList" border stripe highlight-current-row v-loading="loading"
                element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
                <el-table-column type="index" label="序号" align="center" width="60px"></el-table-column>
                <el-table-column label="仓库编号" prop="" align="center"></el-table-column>
                <el-table-column label="仓库名称" prop="" align="center"></el-table-column>
                <el-table-column label="配件名称" prop="" align="center"></el-table-column>
                <el-table-column label="安全库存数量" prop="" align="center"></el-table-column>
              </el-table>
              <!-- 这里面的内容是我们要导出的部分 id为"pdfDom"，和上面"htmlToPdf.js"文件中的id必须一致.此部分将就是pdf显示的部分 -->
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- <el-tabs type="border-card">
      <el-tab-pane label="上传文件优化">
        <el-tabs :tab-position="'left'"
                 style="height: 200px;">
          <el-tab-pane label="文件上传">文件上传</el-tab-pane>
          <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="系统数据优化">系统数据优化</el-tab-pane>
    </el-tabs> -->
  </div>
</template>


<script>
import BookTypeOption from '@/components/common/BookTypeOption';
import Upload from '@/components/common/Upload.vue';
export default {
  data () {
    return {
      activeName: 0,
      bookType: 'xlsx',
      downloadLoading: false,
      filename: 'excel', //非必填
      // 导出的文件是否自动宽度
      autoWidth: true, //非必填

      downloadLoading1: false,
      list1: [],
      loading: false,
      list: [],
      // 上传的文件内容
      tableData: [],
      tableHeader: [],

      paramsForm: {},
      htmlTitle: '优化报告单',
      optimizationOutcomList: [],
      seachForm: {
        dateInterval: ''
      },
      labelPosition: 'left',
      // 时间选择期属性对象
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    };
  },

  components: { BookTypeOption, Upload },

  computed: {},


  methods: {
    // 下载部分
    handleDownload () {
      this.downloadLoading = true
      // 采用懒加载的方式
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['仓库编号', '库存周期', '交货周期', '配件编号', '关键配件', '配件成本', '配件故障率', '配件可靠性', '故障品返修周期', '产品配属数量',]
        const filterVal = ['warehouseId', 'warehouse_replenishment_period', 'delivery_cycle', 'partsId', ' keyParts', 'partsCost ', 'parts_failure_rate', 'parts_quality_reliability', ' failureparts_repair_period',
          'host_affiliated_partsNumber',]
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader, //表头 必填
          data, //具体数据 必填
          filename: '优化数据模板', //非必填
          autoWidth: this.autoWidth, //非必填
          bookType: this.bookType //非必填
        })
      })
      this.downloadLoading = false
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    distanceDownload () {
      this.downloadLoading1 = true
      // 采用懒加载的方式
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['起始仓库', '目标仓库', '距离']
        const filterVal = ['start_warehouse', ' target_warehouse', 'distance']
        const list1 = this.list1
        const data = this.formatJson1(filterVal, list1)
        excel.export_json_to_excel({
          header: tHeader, //表头 必填
          data, //具体数据 必填
          filename: '距离数据模板', //非必填
          autoWidth: this.autoWidth, //非必填
          bookType: this.bookType //非必填
        })
      })
      this.downloadLoading1 = false
    },
    formatJson1 (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },



    // 文件上传
    actionUrl () {
      return ("https://jsonplaceholder.typicode.com/posts/")
    },
    actionUrl1 () {
      return ("https://jsonplaceholder.typicode.com/posts/")
    },

    beforeTabLeave (activeName, oldActiveName) {
      console.log('即将离开的是' + oldActiveName)
      console.log('即将进入的是' + activeName)
      // if (this.tableData.length === 0) {
      //   this.$message.error('请先上传excel文件！')
      //   return false
      // }
    },
  }

}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common";
.el-checkbox {
  margin: 0 10px 0 0 !important;
}

.uploads {
  /*flex 布局*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
  margin: 10px;
}
</style>