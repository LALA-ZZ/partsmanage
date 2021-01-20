<!--  -->
<template>
  <div class="common-content">
    <el-card shadow="hover">
      <div slot="header">
        <span>开始盘点</span>
      </div>
      <el-form ref="checkFormRef" :model="checkForm" :rules="checkFormRules" label-width="80px">
        <el-form-item label="盘点单号">
          <el-input v-model="checkForm.name" placeholder="自动生成" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="盘点人" prop="checkperson">
          <el-input v-model="checkForm.checkperson" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="盘点日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="checkForm.checkdate" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="盘点仓库" prop="checkware">
          <el-input v-model="checkForm.checkware" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="hover" class="secondcard">
      <el-button size='mini' type='primary' plain icon="el-icon-edit" @click="edit = true">编 辑</el-button>
      <el-button size='mini' type='danger' plain icon="el-icon-error" @click="edit = false">取 消</el-button>
      <el-button size='mini' type='warning' plain icon="el-icon-refresh" @click="reset()">重 置</el-button>
      <el-button size='mini' type='success' plain icon="el-icon-check" @click="confirmSave()">保 存</el-button>
      <el-table :data="checkpartslist" border stripe highlight-current-row v-loading="loading"
        element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <div slot="empty" class="emptyBg">
          <img src="@/assets/box.jpg" alt="">
          <p style="margin: 0px;">没有记录哦~</p>
        </div>
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column label="配件编号" prop="" align="center"></el-table-column>
        <el-table-column label="配件名称" prop="" align="center"></el-table-column>
        <el-table-column label="规格" prop="" align="center"></el-table-column>
        <el-table-column label="型号" prop="" align="center"></el-table-column>
        <el-table-column label="单位" prop="" align="center"></el-table-column>
        <el-table-column label="库存数量" prop="partamount" align="center"></el-table-column>
        <el-table-column label="盘点数量" prop="checkamount" align="center">
          <!-- 行内编辑 -->
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-show="edit" v-model="scope.row.checkamount"></el-input>
            <span v-show="edit">{{scope.row.checkamount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="盘点损溢差" prop="" align="center">
          <template slot-scope="scope">{{scope.row.checkamount}}-{{scope.row.partamount}}</template>
        </el-table-column>
        <el-table-column label="是否已盘" prop="status" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="success" icon="el-icon-check" circle v-show="scope.row.checkamount !== null">
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="备注信息" prop="" align="center">
          <!-- 行内编辑 -->
          <template slot-scope="scope">
            <el-input type="text" placeholder="请输入备注信息" v-show="edit" v-model="scope.row.tab1"></el-input>
            <span v-show="edit">{{scope.row.tab1}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>


<script>
export default {
  data () {
    return {
      checkForm: {
        checkperson: '',
        checkdate: '',
        checkware: ''
      },
      checkpartslist: [],
      loading: false,
      // edit status
      edit: false,
      // 表单规则
      checkFormRules: {
        checkperson: [
          { required: true, message: '请输入盘点人姓名', trigger: 'blur' },
        ],
        checkware: [
          { required: true, message: '请输入盘点仓库', trigger: 'blur' },
        ]
      }
    };
  },

  components: {},

  computed: {},
  created () {
    this.getCheckPartsList()
  },
  methods: {
    getCheckPartsList () {
      this.loading = true
      this.$http.get('check/checkparts').then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('获取数据失败！')
        }
        this.checkpartslist = res.checkpartslist.map(item => {
          this.$set(item, 'edit', false)
        })
      })
      this.loading = false
    },
    // save
    confirmSave () {
      console.log(JSON.stringify(this.checkpartslist))
    },
    // concel
    reset () {
      this.getCheckPartsList()
    },
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common";
.el-form {
  display: flex;
  align-items: center; /*垂直居中*/
  height: 100%;
}
</style>