<!--  -->
<template>
  <div class="common-content">
    <!-- 查询条件区域 -->
    <el-card shadow="hover">
      <div slot="header">
        <span>查询条件</span>
      </div>
      <el-form :inline="true"
               ref="seachFormRef"
               :model="seachForm"
               :label-position="labelPosition"
               label-width="80px">
        <el-form-item label="制单人">
          <el-input v-model="seachForm.staff"
                    placeholder="制单人"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="入库时间">
          <el-date-picker v-model="seachForm.dateInterval"
                          type="daterange"
                          align="left"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="入库状态">
          <el-select v-model="seachForm.status"
                     placeholder="入库状态">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click="getApplyList">搜索</el-button>
        <!-- <el-button type="primary" icon="el-icon-plus" @click="goAddApply">配件申请</el-button> -->

        <!-- <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="申请人">
              <el-input v-model="seachForm.staff" placeholder="申请人" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="申请时间">
              <el-date-picker v-model="seachForm.dateInterval" type="daterange" align="left" unlink-panels
                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="申请状态">
              <el-select v-model="seachForm.status" placeholder="状态">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-search" @click="getApplyList">搜索</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="goAddApply">配件申请</el-button>
          </el-col> 
        </el-row>-->

      </el-form>
    </el-card>

    <!-- 申请列表区域 -->
    <el-card shadow="hover"
             class="secondcard">
      <!-- 申请列表区域 -->
      <el-table :data="applyList"
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
        <el-table-column type="selection"
                         width="55"></el-table-column>
        <el-table-column type="index"
                         label="序号"
                         width="60"
                         align="center"></el-table-column>
        <el-table-column label="申请单编号"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="需求位置"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="申请描述"
                         prop=""
                         align="center"> </el-table-column>
        <el-table-column label="申请类型"
                         prop=""
                         align="center"> </el-table-column>
        <el-table-column label="申请时间"
                         prop=""
                         align="center"
                         sortable></el-table-column>
        <el-table-column label="申请人"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="申请单状态"
                         prop="status"
                         align="center">
          <template slot-scope="scope">
            <el-tag size="mini"
                    type="danger"
                    v-if="scope.row.status === 0">未入库</el-tag>
            <el-tag type="success"
                    size="mini"
                    v-else>已入库</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="申请单状态"
                         prop="status"
                         align="center">
          <template slot-scope="scope">
            <el-tag size="mini"
                    v-if="scope.row.status === 2">未审核</el-tag>
            <el-tag type="success"
                    size="mini"
                    v-else-if="scope.row.status === 1">审核通过</el-tag>
            <el-tag type="danger"
                    size="mini"
                    v-else>审核不通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         width="300px">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="showDetailsDialog(scope.row.id)">详情</el-button>
            <!-- <el-button size="mini" type="warning" @click="showEditDialog(scope.row.id)">审核</el-button> -->
            <el-button size="mini"
                       type="danger"
                       @click="deleteWareById(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <!-- 分页区域 -->
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="seachForm.currentpage"
                     :page-sizes="[5, 8, 10, 20]"
                     :page-size="seachForm.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>

    <!-- 详情对话框 -->
    <el-dialog title="申请单详情"
               :visible.sync="detialDialogVisible"
               width="50%"
               @close="detailDialogClose">
      <el-card shadow="hover">
        <el-form :model="detailForm"
                 :inline="true"
                 ref="detailFormRef">
          <el-form-item label="申请单编号"
                        :label-width="formLabelWidth"
                        :disabled="true">
            <el-input v-model="detailForm.id"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="需求位置"
                        :label-width="formLabelWidth"
                        :disabled="true">
            <el-input v-model="detailForm.id"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="申请类型"
                        :label-width="formLabelWidth"
                        :disabled="true">
            <el-input v-model="detailForm.id"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="申请时间"
                        :label-width="formLabelWidth"
                        :disabled="true">
            <el-input v-model="detailForm.id"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="申请人"
                        :label-width="formLabelWidth"
                        :disabled="true">
            <el-input v-model="detailForm.id"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="申请状态"
                        :label-width="formLabelWidth"
                        :disabled="true">
            <el-input v-model="detailForm.id"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="申请描述"
                        :label-width="formLabelWidth"
                        :disabled="true">
            <el-input v-model="detailForm.id"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-card>

      <!-- 表格区域 -->
      <el-card shadow="hover"
               style="margin-top: 3px;">
        <el-table ref="detailListRef"
                  :data="detailList"
                  border
                  stripe
                  highlight-current-row
                  @cell-dblclick='cellDblclick'
                  v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading">
          <el-table-column label="序号"
                           type="index"
                           width="60"
                           align="center"></el-table-column>
          <el-table-column label="配件类型编号"
                           property="date"
                           align="center"></el-table-column>
          <el-table-column label="配件名称"
                           property="date"
                           align="center">
            <!-- 行内编辑 -->
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-row>
                  <el-col :span="10">
                    <el-input size="mini"
                              v-model="scope.row.date"></el-input>
                  </el-col>
                  <!-- <el-col :span="10">
                    <el-button size="mini" type="warning" @click="cancelEdit(scope.row)">
                      取消
                    </el-button>
                  </el-col> -->
                </el-row>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="申请数量"
                           property="date"
                           align="center">
            <!-- 行内编辑 -->
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-row>
                  <el-col :span="10">
                    <el-input size="mini"
                              v-model="scope.row.date"></el-input>
                  </el-col>
                  <!-- <el-col :span="10">
                    <el-button size="mini" type="warning" @click="cancelEdit(scope.row)">
                      取消
                    </el-button>
                  </el-col> -->
                </el-row>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="型号"
                           property="date"
                           align="center"> </el-table-column>
          <el-table-column label="规格"
                           property="date"
                           align="center"></el-table-column>
          <el-table-column label="计量单位"
                           property="date"
                           align="center"></el-table-column>
          <el-table-column label="配件描述"
                           property="date"
                           align="center"></el-table-column>
          <el-table-column label="操作"
                           align="center">
            <template slot-scope="scope">
              <!-- 行内编辑 -->
              <el-button v-show='scope.row.edit'
                         type="info"
                         size="mini"
                         @click="cancelEdit(scope.row)">取消
              </el-button>
              <el-button v-show='scope.row.edit'
                         type="success"
                         size="mini"
                         @click="confirmEdit(scope.row.id)">确认
              </el-button>
              <el-button v-show='!scope.row.edit'
                         size="mini"
                         @click="scope.row.edit = !scope.row.edit">编辑</el-button>
              <el-button v-show='!scope.row.edit'
                         size="mini"
                         type="danger"
                         @click="deleteDetailById(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 底部区域 -->
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="detialDialogVisible = false">关 闭</el-button>
          <el-button type="primary"
                     @click="detialDialogVisible = false">确 定</el-button>
        </span>
      </el-card>

    </el-dialog>
  </div>
</template>


<script>
export default {
  data () {
    return {
      // 申请列表数据
      applyList: [],
      // 列表加载状态
      loading: false,
      // 查找表单对象
      seachForm: {
        staff: '',
        status: '',
        dateInterval: '',
        currentpage: 1,
        pageSize: 10
      },
      total: 0,
      // 表单域标签的位置
      labelPosition: 'left',
      options: [
        {
          label: '未入库',
          value: '0'
        },
        {
          label: '已入库',
          value: '1'
        },
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
      // 详情页对话框的打开
      detialDialogVisible: false,
      // 查询到的申请单信息对象（空对象）.
      detailForm: {},
      // 表单的labelwidth
      formLabelWidth: '120px',
      // 详情表格数据
      detailList: [],
      // 当前激活的申请单id
      activeApplyId: ''
    };
  },

  components: {},

  computed: {},
  created () {
    this.getApplyList()
  },
  methods: {
    // 获取申请单列表数据
    getApplyList () {
      // 加载组件的显示
      this.loading = false
      this.$http.get('apply', this.seachForm).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('获取申请列表数据失败！')
        }
        // 行内编辑
        this.applyList = res.applyList.map(item => {//改写男女性别数据，并存放在userList数组中
          this.$set(item, 'edit', false)
          // this.$set(item, 'originalAddr', '')  // https://vuejs.org/v2/guide/reactivity.html
          item.originalAmount = item.amount //  will be used when user click the cancel botton
          item.originalPartsname = item.partsname
          return item
        });
        this.total = res.total
        this.loading = false
      })
    },
    // 状态表格
    tableRowClassName ({ row }) {
      if (row.approvalstatus === 0) {
        return 'warning-row';
      } else if (row.approvalstatus === 1) {
        return 'success-row';
      }
      return '';
    },
    // 监听页面大小变化
    handleSizeChange (newSize) {
      this.seachForm.pageSize = newSize
      this.getApplyList()
    },
    // 监听页面变化
    handleCurrentChange (newpage) {
      this.seachForm.currentpage = newpage
      this.getApplyList()
    },
    // 跳转到配件申请页面
    goAddApply () {
      this.$router.push('/partsapply')
    },
    // 监听详情对话框的打开,根据申请单id查询申请单信息
    showDetailsDialog (applyId) {
      this.activeApplyId = applyId
      // 根据申请单id查询申请单信息
      this.getApplyInfoById(applyId)
      this.detialDialogVisible = true
    },
    //  根据申请单id查询申请单信息
    getApplyInfoById (id) {
      this.$http.get('apply/' + id).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('获取申请单数据失败！')
        }
        this.detailForm = res.data.applyinfo
        this.detailList = res.data.list
      })
    },
    // 监听详情对话框的关闭事件
    detailDialogClose () {
      this.$refs.detailFormRef.resetFields()
    },
    // 根据id删除申请的配件信息
    deleteDetailById (partsId) {
      this.$confirm('此操作将永久删除该配件信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('apply/' + partsId).then(res => {
          if (res.meta.statu !== 200) {
            return this.$message.error('删除失败！')
          }
          this.$message.success('删除成功！')
        })
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        // 重新获取数据
        this.getApplyInfoById(this.activeApplyId)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 表格双击编辑事件
    cellDblclick () {

    },
    // 取消编辑
    cancelEdit (row) {
      row.partsname = row.originalPartsname
      row.amount = row.originalAmount
      row.edit = false
    },
    // 确认编辑
    confirmEdit () {
      this.$refs.detailListRef.validate(vali => {
        if (!vali) return

      })
    }


  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common.scss";

.secondcard {
  margin-top: 3px;
}
</style>