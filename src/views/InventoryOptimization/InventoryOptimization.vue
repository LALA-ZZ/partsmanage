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

            <el-tabs :tab-position="'left'"
                     style="margin-top: 20px;"
                     v-model="activeName"
                     :before-leave="beforeTabLeave">
              <el-tab-pane label="文件上传"
                           name="first">文件上传

                <!-- excel文件上传 -->
                <upload-excel :on-success="handleSuccess"
                              :before-upload="beforeUpload" />
              </el-tab-pane>
              <el-tab-pane label="选择优化参数"
                           name="second">选择参数
                <el-form-item style="margin-top: 20px">
                  <el-checkbox-group v-model="checkboxGroup"
                                     size="small">
                    <el-checkbox label="库存周期"
                                 border></el-checkbox>
                    <el-checkbox label="交货周期"
                                 border></el-checkbox>
                    <el-checkbox label="关键配件"
                                 border></el-checkbox>
                    <el-checkbox label="配件成本"
                                 border></el-checkbox>
                    <el-checkbox label="配件故障率"
                                 border></el-checkbox>
                    <el-checkbox label="配件可靠性"
                                 border></el-checkbox>
                    <el-checkbox label="故障品返修周期"
                                 border></el-checkbox>
                    <el-checkbox label="产品配属数量"
                                 border></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-button type="success">开始优化</el-button>
              </el-tab-pane>
              <el-tab-pane label="优化结果"
                           name="third">优化结果
                <el-table :data="optimizationOutcomList"
                          border
                          stripe
                          highlight-current-row
                          v-loading="loading"
                          element-loading-text="拼命加载中"
                          element-loading-spinner="el-icon-loading"
                          :header-cell-style="{background:'#eef1f6',color:'#606266'}">
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
                <el-button type="success">生成结果单</el-button>
              </el-tab-pane>
            </el-tabs>

          </el-tab-pane>

          <el-tab-pane label="系统数据优化">
            <el-tabs :tab-position="'left'"
                     style="margin-top: 20px;">
              <el-tab-pane label="选择优化参数"
                           name="0">选择参数
                <el-form-item style="margin-top: 20px">
                  <el-checkbox-group v-model="checkboxGroup"
                                     size="small">
                    <el-checkbox label="库存周期"
                                 border></el-checkbox>
                    <el-checkbox label="交货周期"
                                 border></el-checkbox>
                    <el-checkbox label="关键配件"
                                 border></el-checkbox>
                    <el-checkbox label="配件成本"
                                 border></el-checkbox>
                    <el-checkbox label="配件故障率"
                                 border></el-checkbox>
                    <el-checkbox label="配件可靠性"
                                 border></el-checkbox>
                    <el-checkbox label="故障品返修周期"
                                 border></el-checkbox>
                    <el-checkbox label="产品配属数量"
                                 border></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-button type="success">开始优化</el-button>
              </el-tab-pane>
              <el-tab-pane label="优化结果"
                           name="1">优化结果
                <el-table :data="optimizationOutcomList"
                          border
                          stripe
                          highlight-current-row
                          v-loading="loading"
                          element-loading-text="拼命加载中"
                          element-loading-spinner="el-icon-loading"
                          :header-cell-style="{background:'#eef1f6',color:'#606266'}">
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
                <el-button type="success">生成结果单</el-button>
              </el-tab-pane>
            </el-tabs>
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
import UploadExcel from '@/components/common/UploadExcel/index.vue';

export default {
  data () {
    return {
      activeName: 'first',
      tableData: [],
      tableHeader: [],
      paramsForm: {},
      checkboxGroup: [],
      optimizationOutcomList: []
    };
  },

  components: { UploadExcel },

  computed: {},


  methods: {
    // handleTabClick () {
    //   console.log(this.activeName)

    // }
    beforeUpload (file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '请不要上传超过1m大小的文件。',
        type: 'warning'
      })
      return false
    },
    handleSuccess ({ results, header }) {
      this.tableData = results
      this.tableHeader = header
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
.el-button {
  margin: 20px;
}
</style>