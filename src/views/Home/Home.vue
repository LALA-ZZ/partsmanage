<!--  -->
<template>
  <div style="background-color: #f0f2f5;padding: 32px;">
    <el-row :gutter="20" class="home">
      <!-- 左边个人中心 -->
      <el-col :span="6">
        <!-- <user-card/> -->
      </el-col>

      <!-- 右边展示中心 -->
      <el-col :span="24">
        <!-- <div class="num-list">
          <el-card shadow="hover" v-for="item in countData" :key="item.name"
            :body-style="{display: 'flex', padding: '0px'}">
            <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
            <div class="detail">
              <p class="card-panel-text">{{item.name}}</p>
              <P class="card-panel-num">{{item.value}}</P>
            </div>
          </el-card>
        </div> -->

        <panel-group />

        <!-- 大图表部分 -->
        <el-card shadow="hover">
          <echart style="height: 350px" :chartData="echartData.order"></echart>
        </el-card>

        <div class="graph">
          <el-card shadow="hover">
            <echart style="height: 300px" :chartData="echartData.user"></echart>
          </el-card>
          <el-card shadow="hover">
            <echart style="height: 300px" :chartData="echartData.parts" :isAxisChart="false"></echart>
          </el-card>
        </div>

      </el-col>
    </el-row>
  </div>

</template>


<script>
// import UserCard from '../../components/common/UserCard.vue';
import PanelGroup from '@/components/common/PanelGroup.vue';
import Echart from '../../components/common/EChart.vue';
export default {
  name: 'Home',
  data () {
    return {
      countData: [
        {
          name: '今日入库单数',
          icon: 'success',
          color: '#2ec7c9',
          value: 1995
        },
        {
          name: '今日出库单数',
          icon: 'success',
          color: '#2ec7c9',
          value: 1995
        },
        {
          name: '今日入库申请单数',
          icon: 'success',
          color: '#2ec7c9',
          value: 1995
        },
        {
          name: '今日出库申请单数',
          icon: 'success',
          color: '#2ec7c9',
          value: 1995
        },
      ],
      echartData: {//保存首页中三个图表的数据）
        order: {//订单图表
          xData: [],
          series: []
        },
        parts: {//配件图表
          series: []
        },
        user: {//用户表
          xData: [],
          series: []
        }
      },

    };
  },

  components: {
    // UserCard,
    PanelGroup,
    Echart
  },

  computed: {},

  created () {
    this.getTableData()
  },
  methods: {
    getTableData () {//获取mock数据
      this.$http.get('/home/getData').then(res => {
        res = res.data;
        console.log(res);//打印mock数据

        //订单折线图-----------------------------------------
        const order = res.data.orderData;
        // console.log(order) //打印order表数据
        this.echartData.order.xData = order.date;//x轴的数据
        //series数据
        // 1.取出series中的那么name部分 --键名
        let keyArray = Object.keys(order.data[0])
        // console.log(keyArray);//打印order.data[0]中的键
        keyArray.forEach(key => {
          this.echartData.order.series.push({
            name: key,
            type: 'line',
            data: order.data.map(item => item[key])
          })
        })

        // 用户柱状图----------------------------------------
        this.echartData.user.xData = res.data.userData.map(item => item.date);
        this.echartData.user.series.push({
          name: '新增用户',
          data: res.data.userData.map(item => item.new),
          type: 'bar',
        })
        this.echartData.user.series.push({
          name: '活跃用户',
          data: res.data.userData.map(item => item.active),
          type: 'bar',
          barGap: '0'//将新增用户和活跃用户的条形图之间的间隔为0
        })

        // 配件饼图------------------------------------------
        this.echartData.parts.series.push({
          type: 'pie',
          data: res.data.partsData
        })
      })
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../../assets/scss/home.css";

/* .el-card {
    display: flex;
    align-items: center;
    
  } */

/* .el-card .detail .name {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
  } */
</style>