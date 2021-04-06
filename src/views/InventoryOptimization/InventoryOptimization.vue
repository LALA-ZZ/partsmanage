<!--  -->
<template>
  <div class="common-content">
    <el-card shadow="hover">
      <!-- 外围tabs -->
      <el-form ref="paramsFormRef"
               :model="paramsForm">
        <el-tabs>
          <el-tab-pane label="上传文件优化">
            <!-- 内部的 tab 标签 -->
            <!-- 步骤条 -->
            <el-steps :space="600"
                      :active="activeName - 0"
                      finish-status="success"
                      align-center
                      style="font-size: 13px; margin: 15px;">
              <el-step title="处理数据文件"></el-step>
              <el-step title="处理仓库距离数据"></el-step>
              <el-step title="库存优化"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>

            <el-tabs :tab-position="'left'"
                     style="margin-top: 20px;"
                     v-model="activeName"
                     :before-leave="beforeTabLeave">
              <el-tab-pane label="处理优化数据"
                           name="0">
                <el-alert title="先下载数据模板，再将填写好的数据文件上传！"
                          center
                          type="warning"
                          show-icon>
                </el-alert>
                <!-- 下载模板区域 -->
                <div style="text-align: center; margin: 20px;">
                  <book-type-option v-model="bookType"> </book-type-option>
                  <el-button :loading="downloadLoading"
                             type="success"
                             icon="el-icon-document"
                             @click="handleDownload">
                    下载数据模板
                  </el-button>
                  <!-- <upload excelFile="updata"
                          @uploadUrl="actionUrl">
                  </upload> -->
                  <upload-excel ref="dataUploadExcel"
                                :on-success="handleOpSuccess"
                                :before-upload="beforeUpload" />
                  <el-table :data="tableData"
                            border
                            highlight-current-row
                            style="width: 100%;margin-top:20px;">
                    <el-table-column v-for="item of tableHeader"
                                     :key="item"
                                     :prop="item"
                                     :label="item" />
                  </el-table>
                </div>
              </el-tab-pane>
              <!-- 上传文件 -->
              <el-tab-pane label="处理仓库距离数据"
                           name="1">
                <el-alert title="先下载数据模板，再将填写好的数据文件上传！"
                          center
                          type="warning"
                          show-icon></el-alert>
                <div style="text-align: center; margin: 20px;">
                  <book-type-option v-model="bookType"> </book-type-option>
                  <el-button :loading="downloadLoading1"
                             type="success"
                             icon="el-icon-document"
                             @click="distanceDownload">
                    下载距离模板
                  </el-button>
                  <!-- <upload excelFile="updistance"
                          @uploadUrl="actionUrl1"></upload> -->
                  <upload-excel ref="distanceUploadExcel"
                                name="excelFile"
                                :on-success="handleDistanSuccess"
                                :before-upload="beforeUpload" />
                </div>
              </el-tab-pane>

              <el-tab-pane label="库存优化"
                           name="2">
                <el-button type="primary"
                           plain
                           :loading="loadingbut"
                           @click="startOptimization">{{loadingbuttext}}</el-button>
                <el-button type="success"
                           plain
                           v-if="displaySignal"
                           @click="becomeExcel">生成Excel</el-button>
                <el-button type="warning"
                           plain
                           v-if="displaySignal"
                           @click="getPdf(pdfDom)">生成PDF</el-button>
                <div class="row"
                     id="pdfDom"
                     v-if="displaySignal">
                  <el-table :data="optiResultList"
                            border
                            stripe
                            highlight-current-row
                            v-loading="loading"
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading">
                    <el-table-column type="index"
                                     label="序号"
                                     align="center"
                                     width="60px"></el-table-column>
                    <el-table-column label="方案编号"
                                     prop="0"
                                     align="center"></el-table-column>
                    <el-table-column label="仓库编号"
                                     prop="1"
                                     align="center"></el-table-column>
                    <el-table-column label="安全库存值"
                                     prop="2"
                                     align="center"></el-table-column>
                    <el-table-column label="平均配送时间"
                                     prop="3"
                                     align="center"></el-table-column>
                    <el-table-column label="总成本"
                                     prop="4"
                                     align="center"></el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>

          <el-tab-pane label="系统数据优化">
            <el-date-picker v-model="seachForm.dateInterval"
                            type="daterange"
                            align="left"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions">
            </el-date-picker>
            <el-button type="primary"
                       plain>开始预测</el-button>
            <el-button type="success"
                       plain
                       @click="getPdf(pdfDom2)">生成结果单</el-button>
            <div class="row"
                 id="pdfDom2">
              <el-table :data="optimizationOutcomList"
                        border
                        stripe
                        highlight-current-row
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading">
                <el-table-column type="index"
                                 label="序号"
                                 align="center"
                                 width="60px"></el-table-column>
                <el-table-column label="仓库编号"
                                 prop=""
                                 align="center"></el-table-column>
                <el-table-column label="仓库名称"
                                 prop=""
                                 align="center"></el-table-column>
                <el-table-column label="配件名称"
                                 prop=""
                                 align="center"></el-table-column>
                <el-table-column label="安全库存数量"
                                 prop=""
                                 align="center"></el-table-column>
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
// import Upload from '@/components/common/Upload.vue';
import UploadExcel from '@/components/common/UploadExcel/index.vue';
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
      // dataFile: null,
      file: null,
      // 距离文件数据和标题
      distanceData: [],
      distanceHeader: [],
      distanceFile: null,

      // 预测按钮文字显示
      loadingbuttext: '开始优化',
      // 预测中加载状态
      loadingbut: false,
      // 优化结果列表
      optiResultList: [],
      displaySignal: false,
      paramsForm: {},
      htmlTitle: '优化报告单',
      pdfDom: '#pdfDom',
      pdfDom2: '#pdfDom2',
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

  components: { BookTypeOption, UploadExcel },

  computed: {},


  methods: {
    // 下载部分
    handleDownload () {
      this.downloadLoading = true
      // 采用懒加载的方式
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', '配件编号', '仓库编号', '月份', '配件月故障数量', '配件月故障出库数量', '仓库补货周期', '采购交货周期', '调拨交货周期', '故障品返修周期', '关键配件', '配件成本', '配件故障率', '配件可靠性', '产品配属数量',]
        const filterVal = ['id', 'inventory_optimization_keyfactor_id', 'stock_id', 'month', 'parts_monthly_breakdownAmount', 'parts_monthly_breakdownOutputAmount', 'warehouse_replenishment_period', 'purchase_lead_period', 'allocate_lead_period', ' failureparts_repair_period', ' keyParts', 'partsCost ', 'parts_failure_rate', 'parts_quality_reliability',
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
        const tHeader = ['起始仓库', '目标仓库', '距离', '运输时间']
        const filterVal = ['start_warehouse', ' target_warehouse', 'distance', 'transpor_time']
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


    // 监听优化数据上传
    handleOpSuccess ({ results, header }) {
      this.$refs.dataUploadExcel.loading = true
      this.tableData = results
      this.tableHeader = header
      let form = new FormData();
      form.append('file', this.file)
      console.log(form)
      // fetchUpload(form).then(res => {
      this.$axios.post('/api/ch09/inventory/submitExcel', form).then(res => {
        console.log(res)
        if (res.data !== 'success') {
          this.$refs.dataUploadExcel.loading = false
          this.$alert('文件上传失败！', {
            confirmButtonText: '确定'
          });
        }
        this.$refs.dataUploadExcel.loading = false
        this.$alert('文件上传成功！', {
          confirmButtonText: '确定'
        });

      })
    },
    // 监听优化数据上传之前的动作
    beforeUpload (file) {
      this.file = file
      console.log(file)
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      // const extension3 = file.name.split(".")[1] === "csv";
      const isLt2M = file.size / 1024 / 1024 < 100;
      if (!extension && !extension2) {
        this.$message.error("上传文件只能是 xls、xlsx格式!");
      }
      // const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt2M) {
        return true
      }

      this.$message({
        message: '请不要上传超过100M大小的文件。',
        type: 'warning'
      })
      return false
    },
    // 监听距离文件上传成功的事件
    handleDistanSuccess ({ results, header }) {
      this.distanceData = results
      this.distanceHeader = header
      let form = new FormData();
      form.append('file', this.file)
      console.log(form)
      // fetchUpload(form).then(res => {
      this.$axios.post('/api/ch09/inventory/submitDistanceExcel', form).then(res => {
        console.log(res)
        if (res.data !== 'success') {
          this.$refs.distanceUploadExcel.loading = false
          this.$alert('文件上传失败！', {
            confirmButtonText: '确定'
          });
        }
        this.$refs.distanceUploadExcel.loading = false
        this.$alert('文件上传成功！', {
          confirmButtonText: '确定'
        });

      })

    },



    // // 文件上传
    // actionUrl () {
    //   return ("https://jsonplaceholder.typicode.com/posts/")
    // },
    // actionUrl1 () {
    //   return ("https://jsonplaceholder.typicode.com/posts/")
    // },

    beforeTabLeave (activeName, oldActiveName) {
      console.log('即将离开的是' + oldActiveName)
      console.log('即将进入的是' + activeName)
      // if (this.tableData.length === 0) {
      //   this.$message.error('请先上传excel文件！')
      //   return false
      // }
    },

    // generateResult () {
    //   this.$getPdf(this.pdfDom2)
    // }

    // 监听开始优化按钮
    startOptimization () {
      // 开始优化按钮的状态转换
      this.loadingbut = true;
      this.loadingbuttext = '优化中...';

      this.$axios.post('/api/ch09/inventory/begin',).then(res => {
        console.log(res)
        if (res.data.statue !== 'success') {
          this.$message.error("返回没有数据，预测失败!");
        }
        // this.foreResultList = res.data
        this.optiResultList = res.data.DemandList.table
        console.log(this.optiResultList)
        // 在预测完毕后，启动优化内容的显示信号
        this.displaySignal = true
        // 开始优化按钮的状态转换
        this.loadingbut = false;
        this.loadingbuttext = '开始优化';


        // const { data: res } = await this.$http.get("menus");
        // console.log(res.data);
        // if (res.status != 200) return this.$message.error("操作失败！！！");
        // this.menuList = res.data;
      })

    },

    //优化后生成excel
    becomeExcel () {
      // 采用懒加载的方式
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['方案编号', '仓库编号', '安全库存值', '平均配送时间', '总成本']
        const filterVal = ['0', '1', '2', '3', '4']
        const list1 = this.optiResultList
        const data = this.formatJson1(filterVal, list1)
        excel.export_json_to_excel({
          header: tHeader, //表头 必填
          data, //具体数据 必填
          filename: '优化结果表', //非必填
          autoWidth: this.autoWidth, //非必填
          bookType: this.bookType //非必填
        })
      })
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