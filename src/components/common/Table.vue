<!--  -->
<template>
  <div class="common-table">
    <el-table :data="tableData" height="100%" border fit highlight-current-row style="width: 100%;"
      v-loading="config.loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="序号" width="85px">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ (config.page -1) * 10 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <el-table-column v-for="item in tableLabel" :key="item.prop" :label="item.label" show-overflow-tooltip
        width=" auto">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pager" background layout="total, sizes, prev, pager, next, jumper" :total="config.total"
      :current-page.sync="config.page" @current-change="changeCurrentPage" :page-size="10" :page-sizes="[ 8, 10, 20]">
    </el-pagination>
  </div>
</template>


<script>
export default {
  props: {
    tableLabel: Array,
    tableData: Array,
    config: Object
  },
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {
    handleEdit (row) {//编辑
      this.$emit('edit', row)//触发父组件的自定义事件（edit事件)
    },
    handleDelete (row) {//删除
      this.$emit('deleted', row)//触发父组件的自定义事件（deleted事件)
    },
    changeCurrentPage (page) {
      this.$emit('changePage', page)//触发父组件的自定义事件（changePage事件)
    },
    // handleSizeChange (page) {
    //   this.$emit('handleSizeChange', page)
    // }
  }
}
</script>


<style lang="scss" scoped>
.common-table {
  height: calc(100% - 100px); //calc() 函数用于动态计算长度值。
  background-color: #fff;
  position: relative;
}
.common-table .pager {
  margin-top: 30px;
}
</style>