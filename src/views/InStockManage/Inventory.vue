<!--  -->
<template>
  <div class="common-content">
    <!-- query region -->
    <el-card shadow="hover">
      <div slot="header">
        查找条件
      </div>
      <el-autocomplete v-model="queryinfo.warehouse"
                       :fetch-suggestions="querySearchAsync"
                       placeholder="请输入选择的仓库"
                       @select="handleSelect">
      </el-autocomplete>
      <el-autocomplete v-model="queryinfo.part"
                       :fetch-suggestions="querySearchAsync"
                       placeholder="请输入配件名称"
                       @select="handleSelect">
      </el-autocomplete>
      <el-button type="primary"
                 icon="el-icon-search"
                 @click="getcheckList">快速搜索</el-button>
    </el-card>

    <!-- 库存列表 -->
    <el-card shadow="hover"
             class="secondcard">
      <el-table :data="inventoryList"
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
        <el-table-column type="index"
                         label="序号"
                         align="center"
                         width="60px"></el-table-column>
        <el-table-column label="配件类型编号"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="配件名称"
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
        <el-table-column label="入库时间"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="库存数量"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="正在入库数量"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="正在出库数量"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="所在仓库"
                         prop=""
                         align="center">
        </el-table-column>
        <el-table-column label="操作"
                         align="center">、
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="showDetailsDialog(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>

      </el-table>

      <!-- pagination region -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryinfo.page"
                     :page-sizes="[5, 8, 10, 20]"
                     :page-size="queryinfo.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="inventoryTotal">
      </el-pagination>
    </el-card>

    <!-- 详情对话框 -->
    <el-dialog title="详情"
               :visible.sync="detailVisible"
               width="50%">

      <el-table ref="partsListRef"
                :data="partsList"
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
        <el-table-column label="配件编号"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="配件名称"
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
        <el-table-column label="入库时间"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="库存数量"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="所在仓库"
                         prop=""
                         align="center">
        </el-table-column>
      </el-table>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="detailVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="detailVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { fetchInventoryList, fetchParts } from '@/api/inventory'
export default {
  data () {
    return {
      queryinfo: {
        warehouse: '',
        part: '',
        page: 1,
        pageSize: 10,
      },
      inventoryList: [],
      inventoryTotal: 0,
      loading: false,
      detailVisible: false,
      partsList: [],
      detialLoading: false,
    };
  },

  components: {},

  computed: {},

  methods: {
    // 获取数据库存数据
    getInventoryList () {
      this.loading = true
      fetchInventoryList(this.queryinfo).then(res => {
        if (res.data.meta.status !== 200) {
          return this.$message.error('获取信息失败！')
        }
        this.inventoryList = res.data.list
      })
      this.loading = false

    },
    // 根据配件类别id查询某类配件的所有配件
    showDetailsDialog (partsId) {
      this.detailVisible = true
      this.detialLoading = true
      fetchParts(partsId).then(res => {
        if (res.data.meta.status !== 200) {
          return this.$message.error('获取信息失败！')
        }
        this.partsList = res.data.list
      })
      this.detialLoading = false
    },
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
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>