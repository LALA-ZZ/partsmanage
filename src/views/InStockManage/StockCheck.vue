<!--  -->
<template>
  <div class="common-content">
    <!-- 查询区域 -->
    <el-card shadow="hover">
      <div slot="header">
        <span>查询条件</span>
      </div>
      <el-input v-model="checkForm.staff"
                placeholder="盘点人"
                style="width: 100px;"
                clearable></el-input>
      <el-input v-model="checkForm.staff"
                placeholder="仓库选择"
                style="width: 100px;"
                clearable></el-input>

      <el-select v-model="checkForm.status"
                 placeholder="盘点状态"
                 style="width: 100px;">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="checkForm.staff"
                placeholder="盘点编号"
                style="width: 100px;"
                clearable></el-input>
      <el-date-picker v-model="checkForm.dateInterval"
                      type="daterange"
                      align="left"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions">
      </el-date-picker>
      <el-button type="primary"
                 icon="el-icon-search"
                 @click="getcheckList">搜索</el-button>

    </el-card>

    <!-- 盘点列表区域 -->
    <el-card shadow="hover"
             class="secondcard">
      <el-button size='mini'
                 type='primary'
                 plain
                 icon="el-icon-plus"
                 @click="newCheck">开始新盘点</el-button>
      <!-- <el-button size='mini' type='primary' plain @click="newCheck">Excel导入</el-button> -->
      <!-- <el-button size='mini' type='primary' plain @click="newCheck">Excel导出</el-button> -->
      <el-button size='mini'
                 type='danger'
                 plain
                 icon="el-icon-delete"
                 @click="batchDelete(multipleSelection)">批量删除
      </el-button>
      <el-button size='mini'
                 type='info'
                 plain
                 icon="el-icon-bell"
                 @click="toggleSelection(multipleSelection)">取消选择
      </el-button>
      <el-button size='mini'
                 type='success'
                 plain
                 icon="el-icon-check"
                 @click="confirmSave()">保存</el-button>
      <el-table :data="checkList"
                ref="checkListRef"
                border
                stripe
                highlight-current-row
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <div slot="empty"
             class="emptyBg">
          <img src="@/assets/box.jpg"
               alt="">
          <p style="margin: 0px;">没有记录哦~</p>
        </div>
        <el-table-column type="selection"
                         align="center"
                         width="55"
                         @selection-change="handleSelectionChange">
        </el-table-column>
        <el-table-column type="index"
                         label="序号"
                         align="center"
                         width="60"> </el-table-column>
        <el-table-column label="仓库编号"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="仓库名称"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="盘点编号"
                         prop="id"
                         align="center"></el-table-column>
        <el-table-column label="盘点状态"
                         prop=""
                         align="center">
          <template slot-scope="scope">
            <el-tag type="success"
                    size="mini"
                    v-if="scope.checkstatus == 1">已盘点</el-tag>
            <el-tag type="info"
                    size="mini"
                    v-if="scope.checkstatus == 0">未盘点</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="盘点时间"
                         prop=""
                         align="center"
                         sortable
                         min-width="100"></el-table-column>
        <el-table-column label="盘点人"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="备注"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="操作"
                         align="center"
                         min-width="150">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="showDetailsDialog(scope.row.id)">详情</el-button>
            <!-- <el-button size="mini" type="warning" @click="showEditDialog(scope.row.id)">审核</el-button> -->
            <el-button size="mini"
                       type="warning"
                       @click="setCheckState(scope.row)">完成盘点</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="checkForm.currentpage"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="checkForm.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     background>
      </el-pagination>
    </el-card>

    <!-- 详情对话框 -->

    <el-dialog title="详情"
               :visible.sync="detailDialogVisible"
               width="70%"
               @close="detailDialogClosed">
      <!-- 搜索区域 -->
      <el-input v-model="queryInfo.checkperson"
                placeholder="盘点人"
                style="width: 200px;"
                clearable
                @clear="getDetaiPartsList"></el-input>
      <el-button type="primary"
                 icon="el-icon-search"
                 @click="getDetaiPartsList">快速搜索</el-button>
      <!-- 下载区域 -->
      <book-type-option v-model="bookType"></book-type-option>
      <el-button :loading="downloadLoading"
                 type="success"
                 icon="el-icon-document"
                 @click="handleDownload">
        下载数据
      </el-button>

      <el-table :data="detailList"
                border
                stripe
                highlight-current-row
                v-loading="detailloading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column type="index"
                         label="序号"
                         align="center"></el-table-column>
        <el-table-column label="配件编号"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="配件名称"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="库存数量"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="盘点数量"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="盘点损溢差"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="规格"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="型号"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="单位"
                         prop=""
                         align="center"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination @size-change="handleDetailSizeChange"
                     @current-change="handleDetailCurrentChange"
                     :current-page="queryInfo.page"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="queryInfo.size"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="detailTotal"
                     background>
      </el-pagination>
    </el-dialog>
  </div>
</template>


<script>
import BookTypeOption from './components/BookTypeOption.vue';
export default {
  data () {
    return {
      // 查询表单
      checkForm: {
        currentpage: 1,
        pageSize: 10,



      },
      total: 0,
      // 盘点列表数据
      checkList: [],
      options: [
        {
          label: '已盘点',
          value: 1
        },
        {
          label: '未盘点',
          value: 0
        }
      ],
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
      loading: false,
      multipleSelection: [],//被选中的记录数据-----对应“批量删除”传的参数值
      ids: [],//批量删除id
      // 详情对话框
      detailDialogVisible: false,
      detailList: [],
      detailloading: false,
      // 盘点配件查询
      queryInfo: {
        checkperson: '',
        page: 1,
        size: 20,
      },
      detailTotal: 0,
      // 当前的盘点编号
      checkId: '',
      // 下载状态
      downloadLoading: false,
      // 导出的文本名
      filename: 'excel', //非必填
      // 导出的文件是否自动宽度
      autoWidth: true, //非必填
      // 导出的文本类型
      bookType: 'xlsx' //非必填
    };
  },

  components: { BookTypeOption },

  computed: {},
  created () {
    this.getcheckList()
  },
  methods: {
    // 获取盘点列表数据
    getcheckList () {
      this.loading = true
      this.$http.get('check', this.checkForm).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('获取盘点列表数据失败！')
        }
        this.checkList = res.checkList
        this.total = res.total

      })
      this.loading = false
    },
    // 新盘点
    newCheck () {
      this.$router.push('/addcheck')
    },
    // 批量删除
    batchDelete (rows) {
      this.$confirm('是否确认此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rows.forEach(item => {
          this.ids.push(item.id)
        })

        this.$http.delete('check/delete', this.ids).then(res => {
          if (res.meta.status !== 200) {
            return this.$message.error('删除失败！')
          }
          this.$message.success('删除成功！')
          this.getcheckList()
        })
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 取消选择
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.checkListRef.toggleRowSelection(row);
        });
      } else {
        this.$refs.checkListRef.clearSelection();
      }
    },
    // 完成盘点（设置盘点的状态）
    setCheckState (row) {
      this.$http.put(`check/${row.id}/state/${row.state}`).then(res => {
        if (res.meta.status !== 200) {
          row.state = 0
          return this.$message.error('设置失败！')
        }
        row.state = 1
        this.$message.success('设置成功！')
      })
    },
    // 监听当前页面变化
    handleCurrentChange (newpage) {
      this.checkForm.currentpage = newpage
      this.getcheckList()
    },
    // 监听页面大小变化
    handleSizeChange (newsize) {
      this.checkForm.pageSize = newsize
      this.getcheckList()
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 点击打开
    showDetailsDialog (row) {
      this.checkId = row.checkId
      this.getDetaiPartsList()
      this.detailDialogVisible = true
    },
    // 获取盘点配件信息
    getDetaiPartsList () {
      this.detailloading = true
      this.$http.get(`check/checkparts/${this.checkId}`, this.queryInfo).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('获取盘点配件信息失败！')
        }
        this.detailList = res.detailList
        this.detailTotal = res.detailtotal
      })
      this.detailloading = false
    },
    // 详情对话框的关闭事件
    detailDialogClosed () {
      this.checkId = ''
    },
    handleDetailSizeChange (newsize) {
      this.queryInfo.size = newsize
      this.getDetaiPartsList()
    },
    handleDetailCurrentChange (newpage) {
      this.queryInfo.page = newpage
      this.getDetaiPartsList()
    },
    // 下载数据
    handleDownload () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['序号', '配件编号', '配件名称', '库存数量', '盘点数量', '盘点损溢差', '规格', '型号', '单位']
        const data = this.detailList
        excel.export_json_to_excel({
          header: tHeader, //表头 必填
          data, //具体数据 必填
          filename: this.filename, //非必填
          autoWidth: this.autoWidth, //非必填
          bookType: this.bookType //非必填
        })
      })
      this.downloadLoading = false
    }

  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
</style>