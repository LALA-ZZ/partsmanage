<!--  -->
<template>
  <el-row  :gutter="20" class="home">
    <el-col :span="4">
      <user-card/>
    </el-col>
    <el-col :span="20">
      
      <div class="num-list">
        <el-card shadow="hover" v-for="item in 4" :key="item">
          <i class="icon"></i>
          <div class="detail">
            <p class="num">￥ 1995</p>
            <P class="text">数据</P>
          </div>
        </el-card>
      </div>

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
import UserCard from '../../components/common/UserCard.vue';
export default {
  name:'Home',
  data () {
    return {
    };
  },
  mounted () {
    this.$http.get('/home/getData').then(res => {
      console.log(res.data)
    })
  },
  components: {
    UserCard
  },

  computed: {},


  methods: {}
}
</script>


<style>
@import '~@/assets/scss/home.css';


</style>