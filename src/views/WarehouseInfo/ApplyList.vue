<!--  -->
<template>
  <div class="common-content">
    <el-card shadow="hover">
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
      <el-table v-show="wareLevel == 2 || wareLevel == 3"
                :data="allotApplyList"
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
        <!-- 展开行 -->
        <!--  <el-table-column type="expand"
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
        </el-table-column>-->
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
        <!-- <el-table-column label="操作"
                           align="center">、
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="showpApplyDialog(scope.row.id)">详情</el-button>
            </template>
          </el-table-column> -->

      </el-table>

      <!-- pagination region -->
      <el-pagination v-show="wareLevel == 2 || wareLevel == 3"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryParams.currentpage"
                     :page-sizes="[5, 8, 10, 20]"
                     :page-size="queryParams.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="allotApplyListTotal">
      </el-pagination>

      <el-table v-show="wareLevel == 1"
                :data="purchaseInList"
                border
                stripe
                highlight-current-row
                v-loading="purchaseInListloading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                :row-class-name="tableRowClassName">
        <div slot="empty"
             class="emptyBg">
          <img src="@/assets/box.jpg"
               alt="">
          <p style="margin: 0px;">没有记录哦~</p>
        </div>
        <!-- 展开行 -->
        <!--  <el-table-column type="expand"
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
        </el-table-column>-->
        <el-table-column type="index"
                         label="序号"
                         align="center"
                         width="60px"></el-table-column>
        <el-table-column label="申请单编号"
                         prop="id"
                         align="center"></el-table-column>
        <el-table-column label="申请时间"
                         prop="date"
                         align="center"></el-table-column>
        <el-table-column label="申请仓库"
                         prop="wareId"
                         align="center"></el-table-column>
        <el-table-column label="申请配件编号"
                         prop="partId"
                         align="center"></el-table-column>
        <el-table-column label="申请配件名称"
                         prop="partName"
                         align="center"></el-table-column>
        <el-table-column label="申请数量"
                         prop="partNum"
                         align="center"></el-table-column>
        <!-- <el-table-column label="操作"
                           align="center">、
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="showpApplyDialog(scope.row.id)">详情</el-button>
            </template>
          </el-table-column> -->

      </el-table>

      <!-- pagination region -->
      <el-pagination v-show="wareLevel == 1"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryParams.currentpage"
                     :page-sizes="[5, 8, 10, 20]"
                     :page-size="queryParams.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="allotApplyListTotal">
      </el-pagination>

    </el-card>
  </div>
</template>


<script>
import Qs from 'qs'
export default {
  data () {
    return {
      wareId: '',
      wareLevel: '',
      // 查询参数
      queryParams: {
        wareid: '',
        applyid: '',
        currentpage: 1,
        pageSize: 10
      },


      // 配件申请表
      allotApplyList: [],
      allotApplyloading: false,
      allotApplyListTotal: 0,

      queryPurchaseInList: {
        wareId: '',
        // applyid: '',
        partId: '',
        partName: '',
        currentpage: 1,
        pageSize: 10
      },
      PurchaseInListTotal: 0,
      purchaseInList: [],
      purchaseInListloading: false,
    };
  },

  components: {},

  computed: {},
  created () {
    this.queryParams.wareid = this.$route.query.wareid
    this.wareLevel = this.$route.query.wareLevel
    this.wareId = this.$route.query.wareid
    console.log(this.queryParams.wareid)
    this.getallotApplyList()
    this.getPurchaseList()
  },

  methods: {
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

    getPurchaseList () {
      this.orderType = 'purchasein'
      this.queryPurchaseInList.wareId = this.wareId
      let queryParams = Qs.stringify(this.queryPurchaseInList)
      this.purchaseInListloading = true

      this.$axios.post('/api/ch10/part/selectPartPurchase', queryParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        if (res.data.status !== 'success') {
          return this.$alert('获取数据失败', {
            confirmButtonText: '确定'
          });
        }
        this.purchaseInList = res.data.partInputList
        this.PurchaseInListTotal = res.data.total
      })
      this.purchaseInListloading = false

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
    // 监听  页码大小 改变的事件,将新的页码大小更新到data中
    handleSizeChange (newSize) {
      console.log(newSize)
      this.queryParams.pageSize = newSize //更新页码大小
      this.getPurchaseList.pageSize = newSize //更新页码大小
      this.getallotApplyList()
      this.getPurchaseList()

    },
    // 监听 当前页 变动时候触发的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryParams.currentpage = newPage //更新当前页码
      this.getPurchaseList.currentpage = newPage
      this.getallotApplyList()
      this.getPurchaseList()
    },
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>