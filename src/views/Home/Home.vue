<!--  -->
<template>
  <el-row  :gutter="20" class="home">
    <!-- 左边个人中心 -->
    <el-col :span="6">
      <!-- <user-card/> -->
    </el-col>

    <!-- 右边展示中心 -->
    <el-col :span="24">
      <!-- <div class="num-list">
         <el-card shadow="hover" v-for="item in countData" :key="item.name" :body-style="{display: 'flex', padding: '0px'}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background: item.color}"></i>
          <div class="detail">
            <p class="card-panel-text">{{item.name}}</p>
            <P class="card-panel-num">{{item.value}}</P>
          </div>
        </el-card> 
      </div> -->
      <panel-group/>

      <el-card shadow="hover">
        <div style="height: 280px"></div>
      </el-card>

      <div class="graph">
        <el-card shadow="hover">
           <div style="height: 260px"></div>
        </el-card>
        <el-card shadow="hover">
         <div style="height: 260px"></div>
        </el-card>  
      </div>
      
    </el-col>
  </el-row>
</template>


<script>
// import UserCard from '../../components/common/UserCard.vue';
import PanelGroup from '@/components/common/PanelGroup.vue';
export default {
  name:'Home',
  data () {
    return {
      countData: [
        {
          name : '今日入库单数',
          icon: 'success',
          color: '#2ec7c9',
          value: 1995
        },
        {
          name : '今日出库单数',
          icon: 'success',
          color: '#2ec7c9',
          value: 1995
        },
        {
          name : '今日入库申请单数',
          icon: 'success',
          color: '#2ec7c9',
          value: 1995
        },
        {
          name : '今日出库申请单数',
          icon: 'success',
          color: '#2ec7c9',
          value: 1995
        },
      ]
    };
  },
  mounted () {
    this.$http.get('/home/getData').then(res => {
      console.log(res.data)
    })
  },
  components: {
    // UserCard,
    PanelGroup,
  },

  computed: {},


  methods: {}
}
</script>


<style lang="scss" scoped>
@import '../../assets/scss/home.css';
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