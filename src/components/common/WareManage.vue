
<template>
  <div class="common-content">
    <!-- query region -->
    <el-tabs type="border-card">
      <el-tab-pane label="库存状态">

        <el-table :data="inventoryList"
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
          <el-table-column type="index"
                           label="序号"
                           align="center"
                           width="60px"></el-table-column>
          <el-table-column label="配件编号"
                           prop="pid"
                           align="center"></el-table-column>
          <el-table-column label="配件名称"
                           prop="pname"
                           align="center"></el-table-column>
          <el-table-column label="库存状态"
                           align="center"
                           width="100px">
            <el-table-column label="在库数量"
                             prop="pamount"
                             width="100px"
                             align="center"></el-table-column>
            <el-table-column label="配送中数量"
                             prop=""
                             width="100px"
                             align="center"></el-table-column>
            <el-table-column label="待收货数量"
                             prop=""
                             width="100px"
                             align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="本月需求数量"
                           prop=""
                           align="center"></el-table-column>
          <el-table-column label="库存警戒线"
                           prop=""
                           align="center"></el-table-column>
          <el-table-column label="库存上限"
                           prop=""
                           align="center"></el-table-column>
          <el-table-column label="预警信息"
                           prop=""
                           align="center">
            <template slot-scope="scope">
              <el-tag type="warning"
                      v-if="scope.row.state === 0">库存不足</el-tag>
              <el-tag type="danger"
                      v-else>库存过量</el-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作"
                           align="center">、
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="showDetailsDialog(scope.row.id)">详情</el-button>
            </template>
          </el-table-column> -->

        </el-table>

        <!-- pagination region -->
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="queryinfo.currentpage"
                       :page-sizes="[5, 8, 10, 20]"
                       :page-size="queryinfo.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="inventoryTotal">
        </el-pagination>
        <el-badge :value="200"
                  :max="10"
                  class="item"
                  style="margin: 10px 20px 10px 20px;float:left">
          <el-button size="small">库存预警</el-button>
        </el-badge>
      </el-tab-pane>
      <el-tab-pane label="调拨申请">
        <el-alert title="点击申请按钮系统自动生成配件方案！"
                  type="info"
                  center
                  show-icon
                  style="margin-bottom:15px">
        </el-alert>
        <div style="">
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
        </div>

        <el-table :data="applyList"
                  ref="applyListListRef"
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
              <el-input v-show='scope.row.edit'
                        size="mini"
                        v-model="scope.row.partsname"></el-input>
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
        <div style="margin-top:15px">
          <el-button size='mini'
                     type='primary'
                     icon="el-icon-tickets"
                     @click="turnApplyList">申请列表</el-button>
          <el-button size='mini'
                     type='success'
                     icon="el-icon-collection-tag"
                     @click="turnDispatchingList">配送方案</el-button>
        </div>

      </el-tab-pane>
      <!-- <el-tab-pane label="申请列表">
        <el-input size="small"
                  v-model="queryParams.applyid"
                  placeholder="请搜索输入申请单编号"
                  clearable
                  @clear="getallotApplyList"
                  style="width: 250px;">
        </el-input>
        <el-button size="small"
                   type="primary"
                   icon="el-icon-search"
                   @click="getallotApplyList">搜索</el-button>
        <el-table :data="allotApplyList"
                  border
                  stripe
                  highlight-current-row
                  v-loading="allotApplyloading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  :row-class-name="tableRowClassName">
          <div slot="empty"
               class="emptyBg">
            <img src="@/assets/box.jpg"
                 alt="">
            <p style="margin: 0px;">没有记录哦~</p>
          </div>

          <el-table-column type="expand"
                           width="60px">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.partsList"
                   :key="index">
                <el-form label-width="110px">

                  <el-form-item label="配件编号"
                                style="width:25%">{{scope.row.partsid}}</el-form-item>
                  <el-form-item label="配件名称"
                                style="width:25%">{{scope.row.partsname}}</el-form-item>
                  <el-form-item label="申请数量"
                                style="width:25%">{{scope.row.partsamount}}</el-form-item>
                </el-form>
              </div>
            </template>
          </el-table-column>
          <el-table-column type="index"
                           label="序号"
                           align="center"
                           width="60px"></el-table-column>
          <el-table-column label="申请单编号"
                           prop="applyId"
                           align="center"></el-table-column>
          <el-table-column label="申请时间"
                           prop="applytime"
                           align="center"></el-table-column>
          <el-table-column label="申请仓库"
                           prop="wareid"
                           align="center"></el-table-column>
          <el-table-column label="申请配件编号"
                           prop="partsid"
                           align="center"></el-table-column>
          <el-table-column label="申请配件名称"
                           prop="partsname"
                           align="center"></el-table-column>
          <el-table-column label="申请数量"
                           prop="partsamount"
                           align="center"></el-table-column>
          <el-table-column label="操作"
                           align="center">、
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="showpApplyDialog(scope.row.id)">详情</el-button>
            </template>
          </el-table-column>

        </el-table>

        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="queryinfo.page"
                       :page-sizes="[5, 8, 10, 20]"
                       :page-size="queryinfo.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="inventoryTotal">
        </el-pagination>
      </el-tab-pane> -->
      <el-tab-pane label="待处理订单">
        <el-table :data="orderList"
                  ref='orderListRef'
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
          <el-table-column label="序号"
                           type="index"
                           align="center"
                           width="60px"></el-table-column>
          <el-table-column label="待处理订单编号"
                           prop=""
                           align="center"></el-table-column>
          <el-table-column label="触发类型"
                           prop=""
                           align="center"></el-table-column>
          <el-table-column label="发生时间"
                           prop=""
                           align="center"></el-table-column>
          <el-table-column label="订单状态"
                           prop="status"
                           align="center">
            <template slot-scope="scope">
              <el-tag size="mini"
                      v-if="scope.row.status === 0">未审核</el-tag>
              <el-tag type="success"
                      size="mini"
                      v-else>审核通过</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           align="center"
                           width="300px">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="success"
                         @click="showDetailsDialog(scope.row.id)">详情</el-button>
              <el-button size="mini"
                         type="warning"
                         @click="approvalSet(scope.row.id)">审核</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <!-- <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="seachForm.currentpage"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="seachForm.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     background>
      </el-pagination> -->

        <!-- 详情对话框 -->
        <el-dialog title="待处理订单详情"
                   :visible.sync="detailVisible"
                   width="50%">
          <el-table ref="detailListRef"
                    :data="detailList"
                    border
                    stripe
                    highlight-current-row
                    v-loading="detialLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
            <el-table-column type="index"
                             label="序号"
                             align="center"
                             width="60px"></el-table-column>
            <el-table-column label="当前仓库"
                             prop=""
                             align="center"></el-table-column>
            <el-table-column label="目标仓库"
                             prop=""
                             align="center"></el-table-column>
            <el-table-column label="配件编号"
                             prop=""
                             align="center"></el-table-column>
            <el-table-column label="配件名称"
                             prop=""
                             align="center"></el-table-column>
            <el-table-column label="配送数量"
                             prop=""
                             align="center"></el-table-column>
          </el-table>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="detailVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="detailVisible = false">确 定</el-button>
          </span>
        </el-dialog>

      </el-tab-pane>

      <el-tab-pane label="配送方案">
        <el-table :data="dispatchingList"
                  border
                  stripe
                  highlight-current-row
                  v-loading="detialLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading">
          <div slot="empty"
               class="emptyBg">
            <img src="@/assets/box.jpg"
                 alt="">
            <p style="margin: 0px;">没有记录哦~</p>
          </div>
          <el-table-column type="index"
                           label="序号"
                           align="center"
                           width="60px"></el-table-column>
          <el-table-column label="配送仓库编号"
                           prop=""
                           align="center"></el-table-column>
          <el-table-column label="配送仓库名称"
                           prop=""
                           align="center"></el-table-column>
          <el-table-column label="接收仓库编号"
                           prop=""
                           align="center"></el-table-column>
          <el-table-column label="配件编号"
                           prop=""
                           align="center"></el-table-column>
          <el-table-column label="配件名称"
                           prop=""
                           align="center"></el-table-column>
          <el-table-column label="配送数量"
                           prop=""
                           align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- <el-card shadow="hover">
      <el-button size='small'
                 type='info'
                 icon="el-icon-house"
                 @click="transferapply">库存状态</el-button>
      <el-button size='small'
                 type='primary'
                 icon="el-icon-plus"
                 @click="showApplyDetail">调拨申请</el-button>
      <el-button size='small'
                 type='success'
                 icon="el-icon-tickets"
                 @click="transferOrder">待处理订单</el-button>
    </el-card> -->

    <!-- 调拨申请对话框 -->
    <el-dialog title="调拨申请"
               :visible.sync="detailVisible"
               width="70%">
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
      <!-- <el-button size='mini'
                 plain
                 type='success'
                 icon="el-icon-check"
                 @click="confirmSave()">保存</el-button> -->
      <el-table :data="allotApplyList"
                ref="allotApplyList"
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
            <el-input v-show='scope.row.edit'
                      size="mini"
                      v-model="scope.row.partsname"></el-input>
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

      <!-- <el-form :model="transferApply"
               :rules="transferApplyRules"
               ref="transferApplyRef"
               label-width="100px">
        <el-form-item label="发出仓库"
                      prop="sendware">
          <el-input v-model="transferApply.sendware"></el-input>
        </el-form-item>
        <el-form-item label="接收仓库"
                      prop="receiveware">
          <el-input v-model="transferApply.receiveware"></el-input>
        </el-form-item>
        <el-form-item label="配件编号"
                      prop="pid">
          <el-input v-model="transferApply.pid"></el-input>
        </el-form-item>
        <el-form-item label="配件名称"
                      prop="pname">
          <el-input v-model="transferApply.pname"></el-input>
        </el-form-item>
        <el-form-item label="数量"
                      prop="pamount">
          <el-input v-model="transferApply.pamount"></el-input>
        </el-form-item>
      </el-form> -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="detailVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="confirmSave">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>


<script>
import Qs from 'qs'
export default {
  data () {
    return {
      // 记录当前仓库的编号
      wareId: '',
      queryinfo: {
        wareId: '',
        currentpage: 1,
        pageSize: 10,
      },
      total: 100,
      // 库存数据
      inventoryList: [],
      inventoryTotal: 0,
      loading: false,

      partsList: [],
      // 当前仓库编号
      applywareid: null,
      // 调拨申请表单
      transferApply: {
        sendware: '',
        receiveware: '',
        pid: '',
        pname: '',
        pamount: ''

      },
      transferApplyRules: {
        sendware: [
          { required: true, message: '请输入发出仓库', trigger: 'blur' },

        ],
        receiveware: [
          { required: true, message: '请输入接收仓库', trigger: 'blur' },

        ],
        pid: [
          { required: true, message: '请输入配件编号', trigger: 'blur' },

        ],
        pname: [
          { required: true, message: '请输入配件名称', trigger: 'blur' },

        ],
        pamount: [
          { required: true, message: '请输入数量', trigger: 'blur' },

        ],
      },
      //  配件申请表
      applyList: [],

      // 先前值
      preValue: {},
      // 被选中的记录数据-----对应“批量删除”传的参数值
      multipleSelection: [],
      //批量删除id
      selectIds: [],

      // 配件申请表
      allotApplyList: [],
      allotApplyloading: false,
      // 查询参数
      queryParams: {
        wareid: '',
        applyid: '',
        currentpage: 1,
        pageSize: 10
      },
      allotApplyListTotal: 100,
      // ------------------------------------------待处理订单---------------------------------------
      // 待处理订单列表数据
      orderList: [],
      // 待处理订单详情对话框显示
      detailVisible: false,
      // 详情对话框中的数据
      detailList: [],
      // 列表加载
      detialLoading: false,


      // ------------------------------------------配送方案---------------------------------------

      dispatchingList: [],
    };
  },

  components: {},

  computed: {},
  created () {
    this.wareId = this.$route.query.wareid
    // 获取参数(申请仓库id)
    this.queryinfo.wareId = this.$route.query.wareid
    this.queryParams.wareid = this.$route.query.wareid
    console.log(this.queryinfo.wareId)
    this.getInventoryList()
    this.getallotApplyList()

    // 获取参数(申请仓库id)
    // const applywareid = this.$route.query.id
    // this.$router.push({ path: '/warehouse', query: { setid: applywareid } });
  },

  methods: {

    // -----------------------------------------------库存状态--------------------------------------


    // 获取数据库存数据
    getInventoryList () {
      this.loading = true
      console.log(this.queryinfo.wareId)
      var data = Qs.stringify(this.queryinfo)
      this.$axios.post('/api/ch10//part/selectPartByWareId', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        if (res.data.status !== 'success') {
          return this.$message.error('获取信息失败！')
        }
        this.inventoryList = res.data.inventoryList
        this.inventoryTotal = res.data.total
      })
      this.loading = false

    },
    // 根据配件类别id查询某类配件的所有配件
    // showDetailsDialog (partsId) {
    //   this.detailVisible = true
    //   this.detialLoading = true
    //   this.$axios.get(partsId).then(res => {
    //     if (res.data.meta.status !== 200) {
    //       return this.$message.error('获取信息失败！')
    //     }
    //     this.partsList = res.data.list
    //   })
    //   this.detialLoading = false
    // },
    // 监听  页码大小 改变的事件,将新的页码大小更新到data中
    handleSizeChange (newSize) {
      console.log(newSize)
      this.queryinfo.pageSize = newSize //更新页码大小
      this.getInventoryList()
    },
    // 监听 当前页 变动时候触发的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryinfo.page = newPage //更新当前页码
      this.getInventoryList()
    },

    // -----------------------------------------------调拨申请--------------------------------------

    // 添加一行
    addLine () {
      this.applyList.push({
        partsid: '',
        partsname: '',
        partsamount: '',
        edit: true
      })
    },
    // 监听表格的选择项发生变化事件
    handleSelectChange (val) {

      this.multipleSelection = val;
      console.log("multipleSelection--", this.multipleSelection)
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
    // 单击保存，保存表格数据
    confirmSave () {
      console.log(this.applyList)
      console.log(JSON.stringify(this.applyList))
      var partsList = JSON.stringify(this.applyList)
      var data = {
        "wareid": this.queryinfo.wareId,
        "partsList": partsList
      }
      data = Qs.stringify(data)
      this.$axios.post('/api/ch10/applyParts/creatApply', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      ).then(res => {
        console.log(res.data)
        if (res.data !== 'success') {
          return this.$message.error('申请失败！')
        }
        this.$message.success('申请成功！')
      })
      this.getallotApplyList()

    },

    // 监听编辑按钮
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
    // 删除一行
    handleDelete (index) {
      console.log(index)
      this.applyList.splice(index, 1)////从index位置删除1个元素
    },
    // 监听表格追加内容
    // getPartsList (row, expandedRows) {
    //   if (expandedRows.length !== 0) {

    //   }
    // },



    // 监听获取申请单数据
    getallotApplyList () {
      this.allotApplyloading = true

      var data = Qs.stringify(this.queryParams)
      this.$axios.post('/api/ch10/applyParts/selectApply', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        console.log(res.data)

        if (res.data.status !== 'success') {
          return this.$message.error('获取数据失败！')
        }
        this.allotApplyList = res.data.applyList
        this.allotApplyListTotal = res.data.total
      })
      this.allotApplyloading = false
    },

    // 点击跳转到申请列表
    turnApplyList () {
      console.log(this.wareId)
      this.$router.push({ path: '/applylist', query: { wareid: this.wareId } })
    },
    turnDispatchingList () {
      this.$router.push({ path: '/dispatchlist', query: { wareid: this.wareId } });
    },
    // -----------------------------------------------待处理订单--------------------------------------

    //监听详情页对话框（根据待处理订单id打开详情对话框）
    showDetailsDialog (id) {
      console.log(id)
      this.detailVisible = true

      //根据id查询当前单子里的数据



    },
    // 监听审核（根据待处理订单id修改待处理订单状态）
    approvalSet (orderid) {
      console.log(orderid)
    },
    // 表格行的样式显示
    tableRowClassName ({ row }) {
      if (row.approvalstatus === 0) {
        return 'error-row';
      } else if (row.approvalstatus === 1) {
        return 'success-row';
      }
      return '';
    },
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>