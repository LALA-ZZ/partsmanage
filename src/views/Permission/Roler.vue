<!--  -->
<template>
  <div class="roler-contain">
    <el-card shadow="hover">
      <!-- 添加角色区域 -->
      <el-row>
        <el-col :span="3">
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 角色列表区域 -->
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['bdbottom',i1 === 0 ? 'bdtop' : '' ,'vcenter']" v-for="(item1,i1) in scope.row.children"
              :key="item1.id">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过for循环嵌套渲染二级权限 -->
                <el-row :class="[i2 === 0 ? '' : 'bdtop','vcenter']," v-for="(item2,i2) in item1.children"
                  :key="item2.id">
                  <el-col :span="6">
                    <el-tag closable type="success" @close="removeRightById(scope.row,item2.id)">{{item2.authName}}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag closable type="warning" v-for="(item3) in item2.children" :key="item3.id"
                      @close="removeRightById(scope.row,item3.id)">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <pre>{{scope.row}}</pre>
          </template>
        </el-table-column>

        <el-table-column type="index" label="序号" width="55px"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="" size="mini">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showPermissionDialog(scope.row)">分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>

    <!-- 分配权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="setPermissionDialogVisible" width="30%" @close='setPermissionDialogClosed'>
      <!-- 树形组件 -->
      <el-tree :data="permissionList" :props="treeProps" show-checkbox node-key="id" default-expand-all
        :default-checked-keys='defKeys' ref="treeRef">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setPermissionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="distributePermission">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data () {
    return {
      //角色数据
      rolesList: [],
      // 控制分配权限对话框的显示
      setPermissionDialogVisible: false,
      // 权限数据
      permissionList: [],
      // 树形控件的属性绑定
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      //默认勾选的节点
      defKeys: [],
      // 当前为其分配权限的角色id
      roleId: ''
    };
  },
  created () {
    this.getRolesList()
  },
  components: {},

  computed: {

  },

  methods: {
    getRolesList () {
      this.$http.get('roles').then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('获取数据失败');
        }
        this.rolesList = res.data
      })
    },
    // 根据id删除对应的权限
    removeRightById (role, permissionId) {
      // 弹框提示用户是否要删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.delete(`roles/${role.id}/permission/${permissionId}`).then(res => {
          role.children = res.data
        })
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 展示分配权限的对话框
    showPermissionDialog (role) {
      this.roleId = role.id
      this.$http.get(`permission/tree`).then(res => {
        if (res.meta.status !== 20) {
          return this.$message.error('获取数据失败！')
        }
        this.permissionList = res.data
      })

      this.getLeafKeys(role, this.defKeys) //递归获取三级节点的id
      this.showPermissionDialog = true
    },
    //监听分配权限对话框的关闭时间
    setPermissionDialogClosed () {
      this.defKeys = []
    },
    // 通过递归的形式，获取角色下所有三级权限的id，并保存到defKeys数组中
    getLeafKeys (node, arr) {
      // 如果当前node节点不包含children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })

    },
    // 点击为角色分配权限
    distributePermission () {

      const keys = [//获取全选和半选节点的id存入到keys数组中
        ...this.$refs.treeRef.setCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]

      const idStr = keys.join(',')//字符春拼接
      this.$http.post(`roles/${this.roleId}/permisssion`, { rids: idStr }).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error('分配权限失败！')
        }
        this.$message.success('分配权限成功！')
        this.getRolesList()
        this.showPermissionDialog = false
      })

    }
  }
}
</script>


<style lang="scss" scoped>
.roler-contain {
  padding: 20px;
  padding-bottom: 20px;
  .el-table {
    margin-top: 20px;
  }
}
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee; //上划线
}
.bdbottom {
  border-bottom: 1px solid #eee; //下划线
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>