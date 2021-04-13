<!--  -->
<template>
  <div class="common-content">
    <el-card shadow="hover">

      <!-- 搜索与添加部分 -->
      <!-- <p>仓库分布图</p> -->
      <el-input v-model="queryinfo.warename"
                placeholder="请搜索输入仓库名称"
                clearable
                @clear="getWareList"
                style="width: 250px;">
      </el-input>
      <el-button type="primary"
                 icon="el-icon-search"
                 @click="getWareList">搜索</el-button>
      <el-button type="primary"
                 icon="el-icon-plus"
                 @click="addDialogVisible = true">新增</el-button>
      <!-- <el-row :gutter="1">
        <el-col :span="5">
          <el-input placeholder="请搜索输入仓库名称" clearable @clear="getWareList" style="width: 250px;">
          </el-input>
          <el-select placeholder="省份" style="width: 110px;">
            <el-option></el-option>
          </el-select>
          <el-select placeholder="仓库等级" style="width: 110px;">
            <el-option label="中心库" value="0"></el-option>
            <el-option label="区域库" value="1"></el-option>
            <el-option label="网点库" value="2"></el-option>
          </el-select>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" icon="el-icon-search" @click="getWareList">搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addDialogVisible = true">新增</el-button>
        </el-col>
      </el-row> -->

      <!-- 仓库列表 -->
      <el-table :data="warehouseList"
                border
                stripe
                highlight-current-row
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading">
        <div slot="empty"
             class="emptyBg">
          <img src="@/assets/box.jpg"
               alt="">
          <p style="margin: 0px;">没有记录哦~</p>
        </div>
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column type="index"
                         label="序号"
                         width="60px"></el-table-column>
        <el-table-column label="仓库编号"
                         prop="wareid"></el-table-column>
        <el-table-column label="仓库名称"
                         prop="warename"></el-table-column>
        <el-table-column label="仓库地址"
                         prop="wareaddres"></el-table-column>
        <el-table-column label="上级仓库"
                         prop="warehead"></el-table-column>
        <el-table-column label="仓库等级"
                         prop="warehouse_level">
          <template slot-scope="scope">
            <el-tag type="success"
                    v-if="scope.row.warehouse_level === 0">一级</el-tag>
            <el-tag type="info"
                    v-else-if="scope.row.warehouse_level === 1">二级</el-tag>
            <el-tag type="danger"
                    v-else>三级</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="描述"
                         prop="waredirec"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="enterWare(scope.row.wareid)">进入</el-button>
            <!-- <el-button size="mini" type="danger" @click="deleteWareById(scope.row.id)">删除</el-button> -->
          </template>
        </el-table-column>

      </el-table>

      <!-- 分页功能 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryinfo.currentpage"
                     :page-sizes="[5, 8, 10, 20]"
                     :page-size="queryinfo.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     background>
      </el-pagination>
    </el-card>

    <!-- 新增仓库对话框 -->
    <el-dialog title="新增仓库"
               :visible.sync="addDialogVisible"
               width="30%"
               @close="addDialogClosed">
      <el-form :model="addForm"
               :rules="addFormRules"
               ref="addFormRef"
               label-width="100px">
        <el-form-item label="仓库编号"
                      prop="wareid">
          <el-input v-model="addForm.wareid"></el-input>
        </el-form-item>
        <el-form-item label="仓库名称"
                      prop="warename">
          <el-input v-model="addForm.warename"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址"
                      prop="wareaddres">
          <el-input v-model="addForm.wareaddres"></el-input>
        </el-form-item>
        <el-form-item label="上级仓库"
                      prop="warehead">
          <el-input v-model="addForm.warehead"></el-input>
        </el-form-item>
        <el-form-item label="仓库等级"
                      prop="warelevel">
          <el-input v-model="addForm.warelevel"></el-input>
        </el-form-item>
        <el-form-item label="描述"
                      prop="waredirec">
          <el-input type="textarea"
                    v-model="addForm.waredirec"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addWare">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑仓库对话框 -->
    <el-dialog title="编辑仓库信息"
               :visible.sync="editDialogVisible"
               width="50%"
               @close="editDialogClosed">
      <el-form :model="editForm"
               :rules="editFormRules"
               ref="editFormRef"
               label-width="100px">
        <el-form-item label="仓库名称"
                      prop="warename">
          <el-input v-model="editForm.warename"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址"
                      prop="wareaddres">
          <el-input v-model="editForm.wareaddres"></el-input>
        </el-form-item>
        <el-form-item label="仓库负责人"
                      prop="warehead">
          <el-input v-model="editForm.warehead"></el-input>
        </el-form-item>
        <el-form-item label="负责人联系方式"
                      prop="warephone">
          <el-input v-model="editForm.warephone"></el-input>
        </el-form-item>
        <el-form-item label="仓库等级"
                      prop="warelevel">
          <el-select v-model="editForm.warelevel"
                     placeholder="请选择">
            <el-option label="中心库"
                       value="0"></el-option>
            <el-option label="区域库"
                       value="1"></el-option>
            <el-option label="网点库"
                       value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea"
                    v-model="editForm.waredirec"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editWare">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import Qs from 'qs'
export default {
  data () {
    return {
      warehouseList: [],
      queryinfo: {
        warename: '',
        currentpage: 1,
        pageSize: 10
      },
      total: 0,
      loading: false,
      addDialogVisible: false,
      // 添加表单
      addForm: {
        wareid: '',
        warename: '',
        wareaddres: '',
        warehead: '',
        warelevel: '',
        waredirec: ''
      },
      // 等级列别
      levelList: [],
      addFormRules: {
        wareid: [
          { required: true, message: '请输入仓库编号', trigger: 'blur' },

        ],
        warename: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' },

        ],
        wareaddres: [
          { required: true, message: '请输入仓库地址', trigger: 'blur' },
        ],
        warehead: [
          { required: true, message: '请输入上级仓库', trigger: 'blur' },
        ],
      },
      editDialogVisible: false,
      // 编辑表单
      editForm: {},
      editFormRules: {
        warename: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' },

        ],
        wareaddres: [
          { required: true, message: '请输入仓库地址', trigger: 'blur' },
        ],
        warehead: [
          { required: true, message: '请输入仓库负责人', trigger: 'blur' },
        ],
        warephone: [
          { required: true, message: '请输入仓库负责人联系方式', trigger: 'blur' },
        ],
        warelevel: [
          { required: true, message: '请输入仓库等级', trigger: 'change' },
        ]
      },
    };
  },
  created () {
    this.getWareList()
  },
  components: {},

  computed: {},


  methods: {
    // 获取仓库数据
    getWareList () {
      // 加载组件的显示
      this.loading = false
      console.log(this.queryinfo)
      console.log()
      var data = Qs.stringify(this.queryinfo)
      this.$axios.post('/api/ch10/stock/selectByWarename', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        // {
        //   'warename': this.queryinfo.warename,
        //   'currentpage': this.queryinfo.currentpage,
        //   'pageSize': this.queryinfo.pageSize
        // }
      ).then(res => {
        console.log(res.data)
        if (res.data.status !== "success") {
          return this.$message.error('获取仓库列表失败！')
        }
        this.warehouseList = res.data.warehouseList
        this.total = res.data.total
        this.loading = false
      })
    },
    // 监听当前页面改变
    handleCurrentChange (newpage) {
      this.queryinfo.currentpage = newpage
      this.getWareList()
    },
    // 监听页面大小改变
    handleSizeChange (newsize) {
      this.queryinfo.pageSize = newsize
      this.getWareList()
    },

    // 添加仓库
    addWare () {
      this.$refs.addFormRef.validate(validate => {
        if (!validate) {
          return
        }
        var pams = Qs.stringify(this.addForm)
        // 添加网络请求
        this.$axios.post('/api/ch10/stock/addWare', pams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
          if (res.data.status !== "success") {
            return this.$message.error('添加仓库失败！')
          }
          console.log(res.data)
          this.addDialogVisible = false
          this.$essage.success('添加仓库成功！')
          this.getWareList()

        })
      })
    },
    // 监听添加对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 监听编辑对话框的显示
    showEditDialog (id) {
      // this.editForm = row
      // 根据仓库的id查询仓库
      this.$http.get('warehouse/' + id).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('仓库信息查询失败！')
        }
        this.editForm = res.data
      })

      this.editDialogVisible = true
    },
    // 编辑仓库信息
    editWare () {
      this.$refs.editFormRef.validate(vali => {
        if (!vali) return
        this.$http.put('warehouse/' + this.editForm.id, {
          params: {
            warename: this.editForm.warename,
            wareaddres: this.editForm.wareaddres,
            warehead: this.editForm.warehead,
            warephone: this.editForm.warephone,
            warelevel: this.editForm.warelevel,
            waredirec: this.editForm.waredirec
          }
        }).then(res => {
          if (res.meta.status !== 200) {
            return this.$message.error('更新信息失败！')
          }
          this.editDialogVisible = false
          this.getWareList()
          this.$message.success('更新信息成功！')
        })
      })
    },
    // 监听编辑对话框的关闭事件
    editDialogClosed () {
      // 重置对话框中的内容
      this.$refs.editFormRef.resetFields()
    },
    // 根据id删除仓库信息
    deleteWareById (id) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete('warehouse/' + id).then(res => {
          if (res.meta.status !== 200) {
            return this.$message.error('删除失败！')
          }

        })
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getWareList()

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },


    // 根据id进入不同的仓库界面
    enterWare (wareid) {
      console.log(wareid)

      //带参数跳转params传参数时，地址栏中看不到参数的内容，有点像ajax中的post传参，
      //          query传参数时，地址栏中可以看到传过来的参数信息，
      this.$router.push({ path: '/waremanage', query: { wareid: wareid } });
      // this.$router.push({ name: 'warehouse', params: { setid: wareid } });
      // 获取参数
      // this.$route.params.id
      // 获取参数
      // this.$route.query.id
    },


  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
.warehouse-contain {
  padding: 20px;
  padding-bottom: 20px;
  .el-table {
    margin-top: 20px;
  }
  .el-pagination {
    margin-top: 20px;
  }
}
</style>