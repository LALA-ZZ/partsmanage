<!--  -->
<template>
  <div class="manage">
    <div class="manage-header">
      <Form inline :formLabel="formLabel" :form="searchForm" />
      <el-button type="primary" icon="el-icon-search" size='small'>搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" size='small'>新增</el-button>

    </div>

    <Table :tableData="tableData" :tableLabel="tableLabel" :config="config" />

  </div>

</template>


<script>
import Form from "@/components/common/Form"
// import Form from "../../../components/common/Form"
import Table from "@/components/common/Table"
export default {
  data () {
    return {
      // 表单传入的数据
      searchForm: {
        keyword: ''
      },
      formLabel: [//表单参数
        {
          model: 'keyword',//表单的类型（输入框、选择框。。。）
          label: '',  //label是输入框左边的说明（姓名，密码。。。）
          options: ['快乐', '吃饱', '保暖']
        }
      ],


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
          label: '生日'
        },
        {
          prop: 'addr',
          label: '地址'
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
      this.$http.get('/api/user/getUser', {
        params: {
          page: this.config.page
        }
      }).then(res => {
        this.tableData = res.data.list.map(item => {//获取数据
          item.sexLabel = item.sex === 0 ? '女' : '男';
          return item
        });
        this.config.total = res.data.count;
        this.config.loading = false;
      })
    }
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common.scss";
</style>