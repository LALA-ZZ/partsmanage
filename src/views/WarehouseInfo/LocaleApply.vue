<!--  -->
<template>
  <div class="common-content">
    <!-- 申请单区域 -->
    <el-card shadow="hover">
      <div slot="header">
        <span>创建需求申请单</span>
      </div>
      <el-form ref="localApplyFormRef"
               :rules="localApplyFormRules"
               :model="localApplyForm"
               :label-position="labelPosition"
               label-width="100px">
        <el-row :gutter="40">
          <el-col :span="8">
            <el-form-item label="申请人编号"
                          prop="staffId">
              <el-input v-model="localApplyForm.staffId"
                        placeholder="请输入申请人编号"
                        size="mini"
                        style="width: 250px;"
                        clearable></el-input>
              <!-- <el-select size="mini"
                         v-model="partsNameList"
                         filterable
                         remote
                         reserve-keyword
                         placeholder="请输入配件编号"
                         :remote-method="remoteMethod"
                         :loading="selectLoading">
                <el-option v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </el-card>

    <!-- 申请配件列表区域 -->
    <el-card shadow="hover"
             class="secondcard">
      <!-- 添加按钮 -->
      <el-button size='mini'
                 plain
                 type='primary'
                 icon="el-icon-plus"
                 @click="addLine">新增</el-button>
      <el-button size='mini'
                 plain
                 type='danger'
                 icon="el-icon-delete"
                 @click="batchDelete">批量删除</el-button>
      <el-button size='mini'
                 plain
                 type='info'
                 icon="el-icon-bell"
                 @click="toggleSelection(multipleSelection )">取消选择
      </el-button>
      <el-button size='mini'
                 plain
                 type='success'
                 icon="el-icon-check"
                 @click="confirmSave()">申请</el-button>
      <el-button size='mini'
                 type='primary'
                 icon="el-icon-tickets"
                 style="float:right"
                 @click="turnApplyList">申请列表</el-button>
      <el-table :data="applyList"
                ref="applyListRef"
                border
                stripe
                highlight-current-row
                @selection-change='handleSelectChange'>
        <div slot="empty"
             class="emptyBg">
          <img src="@/assets/box.jpg"
               alt="">
          <p style="margin: 0px;">没有记录哦~</p>
        </div>
        <el-table-column type="selection"
                         width="55"
                         align="center">
        </el-table-column>
        <el-table-column type="index"
                         label="序号"
                         width="60"></el-table-column>
        <el-table-column label="配件编号"
                         prop="partsid"
                         align="center">
          <template slot-scope="scope">

            <el-input v-show='scope.row.edit'
                      size="mini"
                      v-model="scope.row.partsid"></el-input>
            <span v-show='!scope.row.edit'>{{scope.row.partsid}}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column label="配件编号"
                         prop="partsid"
                         align="center">
          <template slot-scope="scope">
            <el-input v-show='scope.row.edit'
                      size="mini"
                      v-model="scope.row.partsid"></el-input>
            <span v-show='!scope.row.edit'>{{scope.row.partsid}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="配件名称"
                         prop="partsname"
                         align="center">
          <template slot-scope="scope">
            <el-autocomplete v-show='scope.row.edit'
                             :fetch-suggestions="querySearchAsync"
                             @select="handleSelect"
                             size="mini"
                             placeholder="请输入配件名称"
                             v-model="scope.row.partsname"></el-autocomplete>
            <!-- <el-input v-show='scope.row.edit'
                      size="mini"
                      v-model="scope.row.partsname"></el-input> -->

            <!-- <el-select v-show='scope.row.edit'
                       size="mini"
                       v-model="scope.row.partsname"
                       filterable
                       remote
                       reserve-keyword
                       allow-create
                       placeholder="请输入配件编号"
                       :remote-method="remoteMethod"
                       :loading="selectLoading">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select> -->
            <span v-show='!scope.row.edit'>{{scope.row.partsname}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请数量"
                         prop="partsamount"
                         align="center">
          <template slot-scope="scope">
            <el-input v-show='scope.row.edit'
                      size="mini"
                      v-model="scope.row.partsamount"></el-input>
            <span v-show='!scope.row.edit'>{{scope.row.partsamount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         min-width="170px"
                         align="center">
          <template slot-scope="scope">
            <el-button v-show="!scope.row.edit"
                       size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-show="scope.row.edit"
                       type="success"
                       size="mini"
                       @click="handleCancle(scope.$index, scope.row)">取消</el-button>
            <el-button v-show="scope.row.edit"
                       type="warning"
                       size="mini"
                       @click="save(scope.$index,scope.row)">确定
            </el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>

  </div>
</template>


<script>
import Qs from 'qs'
export default {
  data () {
    return {
      // 申请表单对象
      localApplyForm: {
        staffId: '',
      },
      // 表单验证
      localApplyFormRules: {
        staffId: [
          { required: true, message: '请输入申请人编号', trigger: 'blur' },
        ],
      },
      // 表单域标签的位置
      labelPosition: 'left',
      applyList: [],
      // 先前值
      preValue: {},
      // 被选中的记录数据-----对应“批量删除”传的参数值
      multipleSelection: [],
      //批量删除id
      selectIds: [],

      // //远程搜索关键字
      // keywords: '',

      //远程搜索的数据列表
      searchData: [],//定义好的用于存放下拉提醒框中数据的数组
      partsid: '',
      partsname: '',
      groupList: [],
      groupArr: [],

      //select远程搜索加载状态
      selectLoading: false,
      // searchData: [],
      // partsid: '',
      // partsname: '',
      options: [

        // {
        //   value: '1',
        //   label: '1'
        // },
        // {
        //   value: '2',
        //   label: '2'
        // },
      ],
      partsNameList: [],
      list: [],
      states: ["Alabama", "Alaska", "Arizona",
        "Arkansas"],
    };
  },

  components: {},

  computed: {},

  mounted () {

  },

  methods: {
    // 添加一行
    addLine () {
      this.applyList.push({
        partsid: '',
        partsname: '',
        partsamount: '',
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
      console.log(this.localApplyForm.staffId)
      console.log(this.applyList)
      console.log(JSON.stringify(this.applyList))
      var partsList = JSON.stringify(this.applyList)
      var requestParams = {
        "staffId": this.localApplyForm.staffId,
        "partsList": partsList
      }
      requestParams = Qs.stringify(requestParams)
      this.$axios.post('/api/ch10/applyParts/creatOfflineApply', requestParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      ).then(res => {
        console.log(res.data)
        if (res.data.status !== 'success') {
          return this.$alert('申请失败！', {
            confirmButtonText: '确定'
          });
        }
        this.$alert('申请成功！', {
          confirmButtonText: '确定'
        });
      })
    },

    turnApplyList () {
      console.log(this.localApplyForm.staffId)
      this.$router.push({ path: '/localApplylist', query: { staffId: this.localApplyForm.staffId } })
    },


    // 远程搜索
    //queryString 为在框中输入的值
    //cb回调函数,将处理好的数据推回
    querySearchAsync (queryString, callback) {
      this.getSearchData(queryString)
      var groupArr = this.groupArr
      // console.log(queryString + callback)
      setTimeout(() => {
        callback(groupArr)
      }, 2000)

    },
    getSearchData (queryString) {
      this.groupList = []
      this.groupArr = []
      var data = {
        "partname": queryString,
      }
      var requestParams = Qs.stringify(data)
      //调用远程接口 将返回数据封装成 [{value:xxx,key2:value2},{value:xxx,key2:value2}]这样的形式，其中value关键字是必须的，检索框要根据该字段显示，其余的根据需求而定
      this.$axios.post('/api/ch10/partType/selectPartName', requestParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        console.log(res.data)
        if (res.data.status !== 'success') {
          return this.$message.error('请求失败！')
        }

        this.groupList = res.data.partTypeList
        for (let item of this.groupList) {
          this.groupArr.push({
            value: item.pname,
            partsid: item.pid
          })

        }
        console.log('jajajaj')
        console.log(this.groupArr)
      })
    },

    //@select="handleSelect"  是选中某一列触发的事件,在这里item为选中字段所在的对象
    handleSelect (item) {
      console.log(item)
      console.log(this.applyList)
      // 根据对象属性获取对象在数组中的下标
      var index = (this.applyList || []).findIndex((profile) => profile.partsname === item.value);
      this.$set(this.applyList[index], 'partsid', item.partsid)
    },


    //-------------------------------------没有用上---------------------------------
    // select远程搜索
    remoteMethod (query) {
      console.log(this.states)
      if (query) {
        this.selectLoading = true
        setTimeout(() => {
          this.selectLoading = false
          this.queryPartsInfo(query)
        }, 2000)
      } else {
        this.options = []
      }
    },
    queryPartsInfo (query) {
      var data = {
        "partname": query,
      }
      var requestParams = Qs.stringify(data)
      this.$axios.post('/api/ch10/partType/selectPartName ', requestParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        console.log(res.data)
        if (res.data.status !== 'success') {
          return this.$alert('请求失败！', {
            confirmButtonText: '确认'
          })
        }
        this.list = res.data.partTypeList
        this.options = res.data.partTypeList.map(item => {
          return { value: `${item.pname}`, label: `${item.pname}`, pid: `${item.pid}` };

        })
        console.log(this.options)

      })

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