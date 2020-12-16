<!--  -->
<template>
  <div class="permission-contain">
    <el-card shadow="hover">
      <!-- 权限列表区域 -->
      <el-table :data="permissionList" border stripe>
        <el-table-column type="index" label="序号" width="55px"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.level === 0">一级</el-tag>
            <el-tag type="info" v-else-if="scope.row.level === 1">二级</el-tag>
            <el-tag type="danger" v-else>三级</el-tag>
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
      //权限列表数据
      permissionList: [],

    };
  },
  created () {
    this.getPermissonList()
  },

  components: {},

  computed: {},

  methods: {
    //获取所有的权限
    getPermissonList () {
      this.$http.get('/permission/list').then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('获取权限列别失败')
        }
        this.permissionList = res.data
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.permission-contain {
  padding: 20px;
  padding-bottom: 20px;
  .el-table {
    margin-top: 20px;
  }
}
</style>