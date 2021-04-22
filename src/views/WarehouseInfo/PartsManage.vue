<!--  -->
<template>
  <div>
    <!-- 搜索与添加部分 -->
    <el-input size="small"
              v-model="queryinfo.pname"
              placeholder="请搜索输入配件名称"
              clearable
              @clear="getWareList"
              style="width: 250px;">
    </el-input>
    <el-button size="small"
               type="primary"
               icon="el-icon-search"
               @click="getWareList">搜索</el-button>
    <el-button size="small"
               type="primary"
               icon="el-icon-plus"
               @click="addDialogVisible = true">新增</el-button>
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
                       prop="warelevel">
        <template slot-scope="scope">
          <el-tag type="success"
                  v-if="scope.row.warelevel === '1'">中心库</el-tag>
          <el-tag type="info"
                  v-else-if="scope.row.warelevel === '2'">区域库</el-tag>
          <el-tag type="danger"
                  v-else-if="scope.row.warelevel === '3'">网点库</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="描述"
                       prop="waredirec"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="success"
                     v-if="message != 'noEnter'"
                     @click="enterWare(scope.row)">进入</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="deleteWareById(scope.row.wareid)">删除</el-button>
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
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {}
}
</script>


<style lang="scss" scoped>
</style>