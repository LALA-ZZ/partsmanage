<!--  -->
<template>
  <div class="common-content">
    <!-- 查询条件区域 -->
    <el-card shadow="hover">
      <!-- 查询条件 -->
      <div slot="header">
        <span>查询条件</span>
      </div>
      <el-form :inline="true" ref="seachFormRef" :model="seachForm" :label-position="labelPosition" label-width="80px">
        <el-form-item label="申请人">
          <el-input v-model="seachForm.staff" placeholder="申请人" clearable></el-input>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker v-model="seachForm.dateInterval" type="daterange" align="left" unlink-panels
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="申请状态">
          <el-select v-model="seachForm.status" placeholder="状态">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getApplyList">快速搜索</el-button>

      </el-form>
    </el-card>

    <!-- 申请单列表区域 -->
    <el-card shadow="hover" class="secondcard">
      <el-table :data="applyList" ref='applyListRef' border stripe highlight-current-row v-loading="loading"
        element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :row-class-name="tableRowClassName">
        <div slot="empty" class="emptyBg">
          <img src="@/assets/box.jpg" alt="">
          <p style="margin: 0px;">没有记录哦~</p>
        </div>
        <el-table-column type="selection" align="center" width="55"></el-table-column>
        <el-table-column label="序号" type="index" align="center" width="60px"></el-table-column>
        <el-table-column label="申请单编号" prop="" align="center"></el-table-column>
        <el-table-column label="需求位置" prop="" align="center"></el-table-column>
        <el-table-column label="申请描述" prop="" align="center"> </el-table-column>
        <el-table-column label="申请类型" prop="" align="center"> </el-table-column>
        <el-table-column label="申请时间" prop="" align="center" sortable></el-table-column>
        <el-table-column label="申请人" prop="" align="center"></el-table-column>
        <el-table-column label="申请单状态" prop="status" align="center">
          <template slot-scope="scope">
            <el-tag size="mini" v-if="scope.row.status === 2">未审核</el-tag>
            <el-tag type="success" size="mini" v-else-if="scope.row.status === 1">审核通过</el-tag>
            <el-tag type="danger" size="mini" v-else>审核不通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="warning" @click="showApprovalDialog(scope.row.id)">审核</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="seachForm.currentpage" :page-sizes="[5, 10, 15, 20]" :page-size="seachForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="total" background>
      </el-pagination>
    </el-card>

    <!-- 审核对话框 -->
    <el-dialog title="申请单审核" :visible.sync="approvalDialogVisible" width="50%" @close="detailDialogClose">
      <el-card shadow="hover">
        <!-- 表单区域 -->
        <el-form :model="approvalForm" :inline="true" ref="approvalFormRef" :rules="approvalFormRules">
          <el-form-item label="申请单编号" :label-width="formLabelWidth" :disabled="true">
            <el-input v-model="approvalForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="需求位置" :label-width="formLabelWidth" :disabled="true">
            <el-input v-model="approvalForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="申请类型" :label-width="formLabelWidth" :disabled="true">
            <el-input v-model="approvalForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="申请时间" :label-width="formLabelWidth" :disabled="true">
            <el-input v-model="approvalForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="申请人" :label-width="formLabelWidth" :disabled="true">
            <el-input v-model="approvalForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="申请描述" :label-width="formLabelWidth" :disabled="true">
            <el-input v-model="approvalForm.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="审核状态" prop="status" :label-width="formLabelWidth">
            <el-select v-model="approvalForm.status" placeholder="状态">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审批人" prop="approvalPerson" :label-width="formLabelWidth">
            <el-input v-model="approvalForm.approvalPerson" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="审批意见" prop="approvalOpinion" :label-width="formLabelWidth">
            <el-input v-model="approvalForm.approvalOpinion" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- 表格区域 -->
      <el-card shadow="hover" style="margin-top: 3px;">
        <el-table ref="approvalListRef" :data="approvalList" border stripe highlight-current-row v-loading="loading"
          element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
          <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
          <el-table-column label="配件类型编号" property="date" align="center"></el-table-column>
          <el-table-column label="配件名称" property="date" align="center"></el-table-column>
          <el-table-column label="申请数量" property="date" align="center">
            <!-- 行内编辑 -->
            <template slot-scope="scope">
              <template v-if="scope.row.edit">
                <el-row>
                  <el-col :span="10">
                    <el-input size="mini" v-model="scope.row.date"></el-input>
                  </el-col>
                </el-row>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="型号" property="date" align="center"> </el-table-column>
          <el-table-column label="规格" property="date" align="center"></el-table-column>
          <el-table-column label="计量单位" property="date" align="center"></el-table-column>
          <el-table-column label="配件描述" property="date" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <!-- 行内编辑 -->
              <el-button v-show='scope.row.edit' type="info" size="mini" @click="handleCancel(scope.row)">取消
              </el-button>
              <el-button v-show='scope.row.edit' type="success" size="mini" @click="handleConfirm(scope.row)">确认
              </el-button>
              <el-button v-show='!scope.row.edit' size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="approvalDialogVisible = false">关 闭</el-button>
          <el-button type="primary" @click="confirmApproval">发布审核</el-button>
        </span>
      </el-card>

    </el-dialog>
  </div>
</template>


<script>
export default {
  data () {
    return {
      // 搜索表单对象
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
      // 申请单列表数据
      applyList: [],
      // 表格默认加载状态
      loading: false,
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
      // 审核状态options
      options: [
        {
          label: '未审核',
          value: '2'
        },
        {
          label: '审核通过',
          value: '1'
        },
        {
          label: '审核未通过',
          value: '0'
        }
      ],
      // 审核对话框的关闭
      approvalDialogVisible: false,
      // 审核
      approvalForm: {
        approvalPerson: ''
      },
      approvalFormRules: {
        approvalPerson: [
          { required: true, message: '请输入审批人', trigger: 'blur' },
        ]
      },
      // 审核对话框的表格数据
      approvalList: [],
      formLabelWidth: '120px',
      // 表格数据先前值
      preValue: {}
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
          return item
        });
        this.total = res.total
        this.loading = false
      })
    },
    // 表格行的状态
    tableRowClassName ({ row }) {
      if (row.approvalstatus === 0) {
        return 'error-row';
      } else if (row.approvalstatus === 1) {
        return 'success-row';
      }
      return '';
    },
    // 监听页面大小的变化
    handleSizeChange (newSize) {
      this.seachForm.pageSize = newSize
      this.getApplyList()
    },
    // 监听当前页面的变化
    handleCurrentChange (newPage) {
      this.seachForm.currentpage = newPage
      this.getApplyList()
    },
    // 监听审核对话框的关闭事件
    detailDialogClose () {
      this.$refs.approvalFormRef.resetFiled()
    },
    // 取消
    handleCancel (row) {
      row.edit = false
      this.$set(row, 'partsamount', this.preValue.partsamount)
      // 将this.preValue中的所有对象属性设置为null
      for (let key in this.preValue)
        this.preValue[key] = null
    },
    // 编辑
    handleEdit (row) {
      row.edit = true
      // ①.JSON.stringify是从一个对象中解析出字符串
      // ②.JSON.parse是从一个字符串中解析出json(键值对)
      this.preValue = JSON.parse(JSON.stringify(row));
      console.log(this.preValue)
    },
    // 确认
    handleConfirm (row) {
      row.edit = false
    },

    // 发布审核
    confirmApproval () {

    }
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>