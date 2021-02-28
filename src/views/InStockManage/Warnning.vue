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
      <el-select v-model="queryinfo.warningtype"
                 placeholder="请选择"
                 style="width:120px">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary"
                 icon="el-icon-search"
                 @click="getcheckList">快速搜索</el-button>
    </el-card>

    <el-card shadow="hover"
             class="secondcard">
      <el-table v-if="queryinfo.warningtype === 2"
                :data="overtimeList"
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
        <el-table-column label="有效期"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="入库时间"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="超时时长"
                         prop=""
                         align="center"
                         sortable></el-table-column>
        <el-table-column label="所在仓库"
                         prop=""
                         align="center">
        </el-table-column>

      </el-table>

      <el-table v-else
                :data="amountList"
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
        <el-table-column label="有效期"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="库存数量"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="库存下限"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="库存上限"
                         prop=""
                         align="center"></el-table-column>
        <el-table-column label="所在仓库"
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
                         align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="warning"
                       icon="el-icon-setting"
                       @click="setWarning(scope.row)">设置预警</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <!-- pagination region -->
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination> -->
    </el-card>

  </div>
</template>


<script>
import { fetchAmountList } from '@/api/warnning'
import { fetchOvertimeList } from '@/api/warnning'
export default {
  data () {
    return {
      // query keyword
      queryinfo: {
        warehouse: '',
        part: '',
        warningtype: ''
      },
      warehouse: '',
      part: '',
      timeout: null,
      options: [
        {
          value: 0,
          label: '库存不足'
        },
        {
          value: 1,
          label: '库存过量'
        },
        {
          value: 2,
          label: '库存超时'
        },
      ],
      loading: false,
      amountList: [],
      overtimeList: [],
      overtimeLoading: false,
    };
  },

  components: {},

  computed: {},
  created () {
    this.getAmountList()
  },
  methods: {
    getcheckList () { },
    // 获取量预警数据
    getAmountList () {
      this.loading = true
      fetchAmountList(this.queryinfo).then(res => {
        if (res.data.meta.status !== 200) {
          return this.$message.error('获取信息失败！')
        }
        this.amountList = res.data.list

      })
      this.loading = false
    },

    // 获取超时数据
    getOvertimeList () {
      this.overtimeLoading = true
      fetchOvertimeList(this.queryinfo).then(res => {
        if (res.data.meta.status !== 200) {
          return this.$message.error('获取信息失败！')
        }
        this.overtimeList = res.data.list

      })
      this.overtimeLoading = false
    },


    // queryString 为在框中输入的值
    // cb回调函数,将处理好的数据推回
    querySearchAsync (queryString, cb) {
      // 调用远程接口 将返回数据封装成 [{value:xxx,key2:value2},{value:xxx,key2:value2}]这样的形式，
      // 其中value关键字是必须的，检索框要根据该字段显示，其余的根据需求而定
      // clearTimeout(this.timeout);
      console.log(queryString)
      var warelist = [{}]
      this.$http.get('/user/getUser', queryString).then(res => {
        res = res.data
        console.log(res)
        if (res.code == 20000) {
          // 第一种方法
          warelist = res.list.map(items => {
            this.$set(items, 'value', items.name)
            return items
          })
          console.log(warelist)
          // 第二种方法
          // var result = res.list
          // for (let i = 0; i < result.length; i++) {
          //   // const item = result[i]
          //   warelist.push({ value: result[i].name })
          // }

          cb(warelist)
        } else {
          warelist = []
          cb(warelist)
        }

      })
    },
    //点击出现搜索后点击的每一项
    handleSelect (item) {
      console.log(item)
      this.warehouse = item.value
    },



  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>