<!--  -->
<template>
  <div class="common-content">
    <!-- 申请单区域 -->
    <el-card shadow="hover">
      <div slot="header">
        <span>配件申请</span>
      </div>
      <el-form ref="applyFormRef" :rules="applyFormRules" :model="applyForm" :label-position="labelPosition"
        label-width="80px">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="申请仓库" prop="appluware">
              <el-input v-model="applyForm.appluware" placeholder="申请仓库" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请人" prop="applyperson">
              <el-input v-model="applyForm.applyperson" placeholder="申请人" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请方式" prop="applystyle">
              <el-select v-model="applyForm.applystyle" placeholder="请选择">
                <el-option v-for="item in applyStyles" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-button type="primary" icon="el-icon-search" @click="getUserList">搜索</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible = true">配件申请</el-button> -->
          </el-col>
        </el-row>

      </el-form>
    </el-card>

    <!-- 申请配件列表区域 -->
    <el-card shadow="hover" class="secondcard">
      <!-- 添加按钮 -->
      <el-button size='mini' plain type='primary' icon="el-icon-plus" @click="addLine">新增</el-button>
      <el-button size='mini' plain type='danger' icon="el-icon-delete" @click="batchDelete">批量删除</el-button>
      <el-button size='mini' plain type='info' icon="el-icon-bell" @click="toggleSelection(multipleSelection )">取消选择
      </el-button>
      <el-button size='mini' plain type='success' icon="el-icon-check" @click="confirmSave()">保存</el-button>
      <el-table :data="applyList" ref="applyListRef" border stripe highlight-current-row
        @selection-change='handleSelectChange'>
        <div slot="empty" class="emptyBg">
          <img src="@/assets/box.jpg" alt="">
          <p style="margin: 0px;">没有记录哦~</p>
        </div>
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column label="配件编号" prop="partsid" align="center">
          <template slot-scope="scope">
            <el-input v-show='scope.row.edit' size="mini" v-model="scope.row.partsid"></el-input>
            <span v-show='!scope.row.edit'>{{scope.row.partsid}}</span>
          </template>
        </el-table-column>
        <el-table-column label="配件名称" prop="partsname" align="center">
          <template slot-scope="scope">
            <el-input v-show='scope.row.edit' size="mini" v-model="scope.row.partsname"></el-input>
            <span v-show='!scope.row.edit'>{{scope.row.partsname}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请数量" prop="partsamount" align="center">
          <template slot-scope="scope">
            <el-input v-show='scope.row.edit' size="mini" v-model="scope.row.partsamount"></el-input>
            <span v-show='!scope.row.edit'>{{scope.row.partsamount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="型号" prop="partstyle" align="center">
          <template slot-scope="scope">
            <el-input v-show='scope.row.edit' size="mini" v-model="scope.row.partstyle"></el-input>
            <span v-show='!scope.row.edit'>{{scope.row.partstyle}}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格" prop="partsguige" align="center">
          <template slot-scope="scope">
            <el-input v-show='scope.row.edit' size="mini" v-model="scope.row.partsguige"></el-input>
            <span v-show='!scope.row.edit'>{{scope.row.partsguige}}</span>
          </template>
        </el-table-column>
        <el-table-column label="计量单位" prop="partsunit" align="center">
          <template slot-scope="scope">
            <el-input v-show='scope.row.edit' size="mini" v-model="scope.row.partsunit"></el-input>
            <span v-show='!scope.row.edit'>{{scope.row.partsunit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="配件描述" prop="partsdesc" align="center">
          <template slot-scope="scope">
            <el-input v-show='scope.row.edit' size="mini" type="textarea" v-model="scope.row.partsdesc"
              :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            <span v-show='!scope.row.edit'>{{scope.row.partsdesc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100px" align="center">
          <template slot-scope="scope">
            <el-button v-show="!scope.row.edit" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-show="scope.row.edit" type="success" size="mini"
              @click="handleCancle(scope.$index, scope.row)">取消</el-button>
            <el-button v-show="scope.row.edit" type="warning" size="mini" @click="save(scope.$index,scope.row)">确定
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
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
      // 申请表单对象
      applyForm: {
        appluware: '',
        applyperson: '',
        applystyle: ''


      },
      // 表单验证
      applyFormRules: {
        appluware: [
          { required: true, message: '请输入申请仓库', trigger: 'blur' },
        ],
        applyperson: [
          { required: true, message: '请输入申请人', trigger: 'blur' },
        ],
        applystyle: [
          { required: true, message: '请输入申请方式', trigger: 'blur' },
        ]
      },
      // 表单域标签的位置
      labelPosition: 'left',
      applyList: [],
      applyStyles: [
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
      // 先前值
      preValue: {},
      // 被选中的记录数据-----对应“批量删除”传的参数值
      multipleSelection: [],
      //批量删除id
      selectIds: []
    };
  },

  components: {},

  computed: {},

  methods: {
    // 根据配件名称查配件类型信息
    getApplyList () {
      this.$http.get('apply/getPartsInfo').then(res => {
        if (res.meta.status) {
          return this.$message.error('配件类型数据读取失败！')
        }
        // 为每个元素添加一个edit属性，并赋值为true
        this.applyList = res.data.map(item => {
          this.$set(item, 'edit', true)
        })

      })
    },
    // 添加一行
    addLine () {
      this.applyList.push({
        partsid: '',
        partsname: '',
        partsamount: '',
        partstyle: '',
        partsguige: '',
        partsunit: '',
        partsdesc: '',
        edit: true
      })
    },
    // 删除一行
    handleDelete (index) {
      console.log(index)
      this.applyList.splice(index, 1)////从index位置删除1个元素
    },


    // 编辑
    handleEdit (index, row) {
      row.edit = true
      console.log(index)
      // ①.JSON.stringify是从一个对象中解析出字符串
      // ②.JSON.parse是从一个字符串中解析出json(键值对)
      this.preValue = JSON.parse(JSON.stringify(row));
      console.log(this.preValue)
    },
    // 取消
    handleCancle (index, row) {
      row.edit = false
      console.log(index)
      this.$set(row, 'partsid', this.preValue.partsid)
      this.$set(row, 'partsname', this.preValue.partsname)
      this.$set(row, 'partsamount', this.preValue.partsamount)
      // 将this.preValue中的所有对象属性设置为null
      for (let key in this.preValue)
        this.preValue[key] = null
      // 若partsid，partsname，partsamount为空，则删除此行
      if (row.partsid == null || row.partsname == null || row.partsamount == null) {
        this.applyList.splice(index, 1)
      }
    },
    // 确认
    save (index, row) {
      // 若partsid，partsname，partsamount为空,则删除此行
      if (row.partsid == '' || row.partsname == ' ' || row.partsamount == '') {
        this.$message.error('内容为空，请重新添加！')
        this.applyList.splice(index, 1)
      }
      row.edit = false
      console.log(this.applyList)

    },

    // 批量删除
    batchDelete () {
      if (this.multipleSelection.length == 0) {
        this.$message.error('未选中选项！')
      }
      console.log(this.multipleSelection.length)
      console.log(this.applyList.length)
      let multData = this.multipleSelection;
      let tableData = this.applyList;
      let multDataLen = multData.length;
      let tableDataLen = tableData.length;
      for (let i = 0; i < multDataLen; i++) {
        for (let y = 0; y < tableDataLen; y++) {
          if (JSON.stringify(tableData[y]) == JSON.stringify(multData[i])) {  //判断是否相等，相等就删除
            this.applyList.splice(y, 1)
            console.log(y + '删除成功！')
          }
        }
      }
    },
    // 取消选择
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.applyListRef.toggleRowSelection(row);
        });
      } else {
        this.$refs.applyListRef.clearSelection();
      }
    },
    // 监听表格的选择项发生变化事件
    handleSelectChange (val) {

      this.multipleSelection = val;
      console.log("multipleSelection--", this.multipleSelection)
    },


    // 单击保存，保存表格数据
    confirmSave () {
      console.log(JSON.stringify(this.applyList))
    },
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common.scss";

.secondcard {
  margin-top: 3px;
}
</style>