<!--  -->
<template>

  <div class="manage">
    <!-- 对话提示框 -->
    <el-dialog :title="operateType === 'add' ? '添加企业信息' : '编辑企业信息'" :visible.sync="dialogFormVisible" width='30%'>
      <Form :formLabel="operateFormLabel" :form="operateForm" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-card shadow="hover">
      <div class="manage-header">
        <!-- 表单 -->
        <Form inline :formLabel="searchFormLabel" :form="searchForm" @clearInput="getList" />
        <el-button type="primary" icon="el-icon-search" size='mini' @click="selectEnterprises">搜索
        </el-button>
        <el-button type="primary" icon="el-icon-plus" size='mini' @click="addEnterprises">新增</el-button>
        <el-button type="danger" icon="el-icon-plus" size='mini' @click="addEnterprises">批量删除</el-button>
      </div>
      <!-- 表格 -->
      <Table :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList"
        @edit="editEnterprises" @deleted="deletedEnterprises" height="" />
    </el-card>

  </div>

</template>


<script>
import Form from "@/components/common/Form"
// import Form from "../../../components/common/Form"
import Table from "@/components/common/Table"
export default {
  data () {
    return {
      //dialog
      operateType: 'add',//操作类型，添加操作或者更新操作
      dialogFormVisible: false,//对话框是否显示

      // 表单传入的数据
      operateForm: {//操作表单
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名'
        },
        {
          model: 'age',
          label: '年龄'
        },
        {
          model: 'birth',
          label: '生日',
          type: 'date'

        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            },
          ]
        },
        {
          model: 'addr',
          label: '地址'
        },
      ],

      searchForm: {//搜索表单
        keyword: ''
      },
      searchFormLabel: [//表单参数
        {
          model: 'keyword',//v-model类型
          label: '',  //label是输入框左边的说明（姓名，密码。。。）

        }
      ],
      // selectForm:{

      // },



      // 表格传入的数据
      tableData: [],//表格数据  //data: 传入的数据列表、prop: 传入的数据字段、label：列名
      tableLabel: [//表格列名
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sexLabel',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '生日',
          width: 200
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        }
      ],
      config: {
        page: 1,//当前页面
        total: 30,//总页面数
        loading: false//加载状态
      }
    };
  },

  components: {
    Form,
    Table
  },

  computed: {},
  created () {
    this.getList();//挂载的时候获取数据
  },
  methods: {
    getList () {//从mock中获取表格所需的数据
      this.config.loading = true;//获取数据前，先定为加载状态
      this.$http.get('/api/user/getUser',
        {
          params: this.config

        }

      ).then(res => {
        // console.log(res.data)
        this.tableData = res.data.list.map(item => {//改写性别数据，并存放数据
          // console.log(item.name)
          item.sexLabel = item.sex === 0 ? '女' : '男';
          return item
        });
        this.config.total = res.data.count;
        this.config.loading = false;
      })
    },

    editEnterprises (row) {//编辑企业信息
      this.operateType = 'edit';
      this.dialogFormVisible = true;
      this.operateForm = row
    },
    confirm () {//编辑企业信息,点击确定按钮时，向后台传入参数
      if (this.operateType == 'edit') {
        this.$http.post('/user/edit', this.operateForm).then(res => {
          console.log(res);
          this.dialogFormVisible = false

        })
      } else {//添加企业信息,点击确定按钮时，向后台传入参数
        this.$http.post('/user/add', this.operateForm).then(res => {
          console.log(res)
          this.dialogFormVisible = false
          this.getList()
        })
      }

    },
    deletedEnterprises (row) {//删除企业信息
      console.log(row.id)
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = row.id
        this.$http.get('/user/del', {
          params: {
            id
          }
        }).then(res => {
          console.log(res.data);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    selectEnterprises () {//根据关键字查询企业信息
      console.log(this.searchForm.keyword)
      if (this.searchForm.keyword == "") {
        this.getList()
      } else {
        this.config.loading = true;//获取数据前，先定为加载状态
        console.log('当前页面' + this.config.page)
        this.$http.get('/user/getUser', {
          params: {
            name: this.searchForm.keyword,
          }
        }).then(res => {
          // console.log(res.data.list)
          this.tableData = res.data.list.map(item => {//获取数据
            item.sexLabel = item.sex === 0 ? '女' : '男';
            // console.log(item)
            // console.log(item.name)
            // console.log(this.searchForm.keyword)
            // console.log(item.name.search(this.searchForm.keyword) != -1)

            return item
          });
          this.config.total = res.data.count;
          this.config.loading = false;
        })
      }

    },
    addEnterprises () {
      this.operateType = 'add';
      this.dialogFormVisible = true;

      // this.$refs['operateForm'].resetFields();

    }



  }
  // changePage (value) {
  //   console.log(value);
  // }

}

</script>


<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
</style>