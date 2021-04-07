<!--  -->
<template>
  <div class="common-content">
    <el-card shadow="hover">

      <!-- 外围tabs -->
      <el-form ref="paramsFormRef"
               :model="paramsForm">
        <el-tabs>
          <el-tab-pane label="上传文件预测">
            <!-- 步骤条 -->
            <el-steps :space="600"
                      :active="activeName - 0"
                      finish-status="success"
                      align-center
                      style="font-size: 13px; margin: 15px;">
              <el-step title="下载数据模板"></el-step>
              <el-step title="数据文件上传"></el-step>
              <el-step title="配件需求预测"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>

            <!-- 内部的 tab 标签 -->
            <el-tabs :tab-position="'left'"
                     style="margin-top: 20px;"
                     v-model="activeName"
                     :before-leave="beforeTabLeave">
              <el-tab-pane label="下载数据模板"
                           name="0">
                <el-alert title="先下载数据模板，再将填写好的数据文件上传！"
                          center
                          type="warning"
                          show-icon>
                </el-alert>
                <!-- 下载模板区域 -->
                <div style="text-align: center; margin: 20px;">
                  <book-type-option v-model="bookType">> </book-type-option>
                  <el-button :loading="downloadLoading"
                             type="success"
                             icon="el-icon-document"
                             @click="handleDownload">
                    下载数据模板
                  </el-button>
                </div>

                <!-- <div style="text-align:center">
                  <el-button type="success">下一步</el-button>
                </div> -->

                <!-- <progress></progress> -->
              </el-tab-pane>

              <el-tab-pane label="数据文件上传"
                           name="1">
                <el-alert title="先下载数据模板，再将填写好的数据文件上传！"
                          center
                          type="warning"
                          show-icon></el-alert>
                <!-- excel文件上传 -->
                <upload-excel ref="uploaDemandExcel"
                              :on-success="handleSuccess"
                              :before-upload="beforeUpload" />
                <!-- <upload-excel ref="uploadExcel"
                              :limit="1"
                              name="excelFile"
                              :on-preview="handlePreview"
                              :on-remove="handleRemove"
                              :file-list="fileList"
                              :on-error="uploadFalse"
                              :on-success="handleSuccess"
                              :before-upload="beforeUpload" /> -->

                <!-- <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/"
                    name="excelFile" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"
                    :on-error="uploadFalse" :on-success="handleSuccess" :before-upload="beforeUpload">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传xlsx,xls/csv文件。</div>
                  </el-upload> -->

                <!-- <div style="text-align:center">
                  <el-button type="success">下一步</el-button>
                </div> -->
                <el-table :data="tableData"
                          border
                          highlight-current-row
                          style="width: 100%;margin-top:20px;">
                  <el-table-column v-for="item of tableHeader"
                                   :key="item"
                                   :prop="item"
                                   :label="item" />
                </el-table>
              </el-tab-pane>

              <!-- <el-tab-pane label="信息预处理" name="2">
                <el-alert title="信息预处理是将上传的数据处理成算法需要的数据！" center type="warning" show-icon></el-alert>步骤3：
                <div class="progress">
                  <el-progress type="circle" :percentage="100"></el-progress>
                </div>
                <p>信息预处理过程中，请稍后......</p> 

          </el-tab-pane> -->
              <!-- <el-tab-pane label="算法预测参数" name="second">选择参数
                <el-form-item style="margin-top: 20px">
                  <el-checkbox-group v-model="checkboxGroup" size="small">

                    <el-checkbox label="配件月需求数量" border></el-checkbox>
                    <el-checkbox label="配件月出库量" border></el-checkbox>
                    <el-checkbox label="配件月故障数量" border></el-checkbox>
                    <el-checkbox label="配件月修复入库数量" border></el-checkbox>
                    <el-checkbox label="配件月故障出库数量" border></el-checkbox>
                    <el-checkbox label="配件月入库量" border></el-checkbox>
                    <el-checkbox label="配件月申请数量" border></el-checkbox>
                    <el-checkbox label="月项目计划数量" border></el-checkbox>
                    <el-checkbox label="月零星申请配件数量" border></el-checkbox>
                    <el-checkbox label="月零星计划数量" border></el-checkbox>
                    <el-checkbox label="月项目申请配件数量" border></el-checkbox>
                    <el-checkbox label="配件月报废数量" border></el-checkbox>
                    <el-checkbox label="主机月新增量" border></el-checkbox>
                    <el-checkbox label="主机总数量" border></el-checkbox>
                    <el-checkbox label="主机开工数量" border></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <div style="text-align:center">
                  <el-button type="success">开始预测</el-button>
                </div>
              </el-tab-pane> -->

              <el-tab-pane label="配件需求预测"
                           name="2">

                <el-button type="primary"
                           plain
                           :loading="loadingbut"
                           v-loading.fullscreen.lock="fullscreenLoading"
                           @click="startForecast">{{loadingbuttext}}</el-button>
                <el-button type="success"
                           plain
                           v-if="displaySignal"
                           @click="becomeExcel">生成Excel</el-button>
                <!-- <el-button type="warning"
                           plain
                           v-if="displaySignal"
                           @click="getPdf(pdfDom1)">生成PDF</el-button> -->
                <div class="row"
                     id="pdfDom1"
                     v-if="displaySignal">
                  <el-table :data="foreResultList"
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
                    <el-table-column label="配件编号"
                                     prop="1"
                                     align="center"></el-table-column>
                    <el-table-column label="配件名称"
                                     prop="2"
                                     align="center"></el-table-column>
                    <el-table-column label="下个月需求量"
                                     prop="4"
                                     align="center"></el-table-column>
                    <el-table-column label="下个月申请量"
                                     prop="10"
                                     align="center"></el-table-column>
                    <el-table-column label="下个月出库量"
                                     prop="5"
                                     align="center"></el-table-column>
                    <el-table-column label="下个月故障量"
                                     prop="6"
                                     align="center"></el-table-column>
                  </el-table>
                </div>
                <!-- <div v-else>
                  <p> 需求预测中，请稍后...... </p>
                </div> -->
              </el-tab-pane>
            </el-tabs>

          </el-tab-pane>

          <el-tab-pane label="系统数据预测 ">
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
                       plain>{{loadingbuttext}}</el-button>
            <!-- <el-button type="success"
                       plain
                       @click="getPdf(pdfDom2)">生成结果单</el-button> -->
            <div class="row"
                 id="pdfDom2"
                 v-if="displaySignal">
              <el-table :data="foreResultList"
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
                <el-table-column label="配件编号"
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
              <p> hahha </p>
              <!-- 这里面的内容是我们要导出的部分 id为"pdfDom"，和上面"htmlToPdf.js"文件中的id必须一致.此部分将就是pdf显示的部分 -->
            </div>
            <div v-else>
              <p> 需求预测中，请稍后...... </p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>


<script>
import UploadExcel from '@/components/common/UploadExcel/index.vue';
import BookTypeOption from '@/components/common/BookTypeOption';
// import Progress from './components/Progress.vue';
// import { fetchUpload } from '../../api/forecast'

export default {
  data () {
    return {
      activeName: '0',
      // 文件表头和数据
      tableData: [],
      tableHeader: [],
      // 上传的文件列表
      fileList: [],
      paramsForm: {},
      checkboxGroup: [],
      preOutcomeList: [],
      loading: false,

      file: null,
      // 下载部分
      downloadLoading: false,
      filename: 'excel', //非必填
      // 导出的文件是否自动宽度
      autoWidth: true, //非必填
      // 导出的文本类型
      bookType: 'xlsx', //非必填
      list: [],
      // 预测按钮文字显示
      loadingbuttext: '开始预测',
      // 预测中加载状态
      loadingbut: false,
      fullscreenLoading: false,
      htmlTitle: '预测报告单',
      pdfDom1: '#pdfDom',
      pdfDom2: '#pdfDom2',
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
      // 预测内容的显示信号
      displaySignal: false,
      foreResultList: []

    };
  },

  components: { UploadExcel, BookTypeOption, },




  methods: {
    // handleTabClick () {
    //   console.log(this.activeName)

    // }


    // uploadUrl() 是后台接口（接受上传的文件并做后端的逻辑处理）
    // uploadUrl () {
    //   // return ("/fanxing/import/batchInsertShops");
    //   return ("192.168.50.219:8080/ch05/index/analysisExcel")
    // },
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
    // checkExcel (header) {
    //   for (let i in header) {
    //     if (i == 0 && header[i] != '配件编号') {
    //       return false;
    //     }
    //     if (i == 1 && header[i] != '配件月出库量') {
    //       return false;
    //     }
    //   }
    // },

    // 文件上传
    handleSuccess ({ results, header }) {
      this.$refs.uploaDemandExcel.loading = true
      this.tableData = results
      this.tableHeader = header
      let form = new FormData();
      form.append('file', this.file)
      console.log(form)
      // fetchUpload(form).then(res => {
      this.$axios.post('/api/ch09/demand/submitExcel', form).then(res => {
        console.log(res)
        if (res.data !== 'success') {
          this.$refs.uploaDemandExcel.loading = false
          this.$alert('文件上传失败！', {
            confirmButtonText: '确定'
          });
        }
        this.$refs.uploaDemandExcel.loading = false
        this.$alert('文件上传成功！', {
          confirmButtonText: '确定'
        });

      })
      //触发组件的action
      // this.$refs.upload.submit();

    },
    // handleSuccess (response, file, fileList) {
    //   console.log(response.status)
    //   if (response.status) {
    //     alert("文件上传成功！");

    //   } else {
    //     alert("文件上传失败！");
    //   }
    // },
    // uploadFalse (response, file, fileList) {
    //   console.log(response, file, fileList)
    //   this.$message.error("文件上传失败！");
    // },
    beforeTabLeave (activeName, oldActiveName) {
      console.log('即将离开的是' + oldActiveName)
      console.log('即将进入的是' + activeName)
      // if (this.tableData.length === 0) {
      //   this.$message.error('请先上传excel文件！')
      //   return false
      // }
    },
    // handlePreview (file) {
    //   if (file.response.status) {
    //     alert("此文件导入成功");
    //   } else {
    //     alert("此文件导入失败");
    //   }
    // },
    // handleRemove (file, fileList) {
    //   console.log(file, fileList);
    // },


    // 下载部分
    handleDownload () {
      this.downloadLoading = true
      // 采用懒加载的方式
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', '配件编号', '配件名称', '月份', '配件月需求数量', '配件月出库量', '配件月故障数量', '配件月修复入库数量', '配件月故障出库数量', '配件月入库量', '配件月报废数量', '配件月申请数量', '月零星申请配件数量', '月项目计划数量', '月零星计划数量', '月项目申请配件数量', '主机月新增量', '主机总数量', '主机开工数量']
        const filterVal = ['id', 'parts_id', 'parts_name', 'month', 'parts_monthly_requiredNumber', 'parts_monthly_outputNumber', 'parts_monthly_breakdownNumber', 'parts_monthly_repairIntputNumber', 'parts_monthly_breakdownOutputNumber', 'parts_monthly_intputNumber', 'parts_monthly_scrapNumber', 'parts_monthly_applicationNumber', 'parts_monthly_sporadicApplicationNumber', 'parts_monthly_projectApplicationNumber', 'monthly_sporadicPlansNumber', 'monthly_projectsplansNumber', 'host_monthly_incrementNumber', 'hostsNumber', 'host_workingNumber'
        ]
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader, //表头 必填
          data, //具体数据 必填
          filename: '需求预测数据模板', //非必填
          autoWidth: this.autoWidth, //非必填
          bookType: this.bookType //非必填
        })
      })
      this.downloadLoading = false
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },

    // 监听文件上传的开始预测按钮
    startForecast () {
      // 开始预测按钮的状态转换
      this.loadingbut = true;
      this.loadingbuttext = '预测中...';
      // this.fullscreenLoading = true;

      this.$axios.post('/api/ch09/demand/begin',).then(res => {
        console.log(res)
        if (res.data.statue !== 'success') {
          this.$message.error("返回没有数据，预测失败!");
        }
        // this.foreResultList = res.data
        this.foreResultList = res.data.DemandList.table
        console.log(this.foreResultList)
        // 在预测完毕后，启动预测内容的显示信号
        this.displaySignal = true


        // // 开始预测按钮的状态转换
        this.loadingbut = false;
        this.loadingbuttext = '开始预测';

        // this.fullscreenLoading = false;

      })


    },


    //优化后生成excel
    becomeExcel () {
      // 采用懒加载的方式
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['配件编号', '配件名称', '下个月需求量', '下个月申请量', '下个月出库量', '下个月故障量']
        const filterVal = ['1', '2', '4', '10', '5', '6']
        const list1 = this.foreResultList
        const data = this.formatJson(filterVal, list1)
        excel.export_json_to_excel({
          header: tHeader, //表头 必填
          data, //具体数据 必填
          filename: '优化结果表', //非必填
          autoWidth: this.autoWidth, //非必填
          bookType: this.bookType //非必填
        })
      })
    },
    // // 监听预测结果按钮
    // demandResult () {
    //   this.$axios.post('/api/ch09/demandResult/queryDemandResult',).then(res => {
    //     console.log(res)
    //     if (res.data == ' ') {
    //       this.$message.error("返回没有数据，预测失败!");
    //     }
    //     this.foreResultList = res.data

    //     // 在预测完毕后，启动预测内容的显示信号
    //     this.displaySignal = true
    //   })
    // }





  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common";
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
// .el-button {
//   margin: 10px;
// }
.progress {
  /*flex 布局*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
}
// .export {
//   align-items: center;
// }

.el-steps {
  margin: 15px 0;
}

.el-step__title {
  font-size: 13px;
}
.system-forecast {
  /*flex 布局*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
}
</style>