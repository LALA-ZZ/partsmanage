<!--  -->
<template>
  <div style="height: 100%" ref="echart">
    <!--ref添加属性元素，通过vm.$ref获取dom元素-->
    echart
  </div>
</template>


<script>
import Echarts from 'echarts' //导入的是echarts,不是组件
export default {
  props: {//定义从父组件传过来的值
    chartData: {//指定图表的数据，包含x轴数据和series数据
      type: Object,
      default () {
        return {
          xData: [],
          series: []
        }
      }
    },
    isAxisChart: {//判断图表是否包含坐标轴，默认包含坐标轴
      type: Boolean,
      default: true
    }
  },
  data () {//动态传入的参数定义出来
    return {
      echart: null,//echart容器，是否是一个图表
      axisOption: {//包含坐标轴的图表配置
        grid: {

          left: "5%",

          right: "auto",

          backgroundColor: '#fff',

          width: "auto", //图例宽度

          height: "auto", //图例高度

        },
        legend: {//图例
          textStyle: {
            color: '#333'
          },
          top: 'auto'
        },
        // 悬浮提示
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#36a3f7'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#36a3f7'
            }
          }
        },
        series: []
      },
      normalOption: {//不包含坐标轴的图表配置
        series: [],
        // 悬浮提示
        tooltip: {
          trigger: 'item'
        },
        legend: {//图例
          textStyle: {
            color: '#333'
          },
          bottom: '0px'
        },
      }
    };
  },
  watch: {
    chartData: {//在chartData发生变化的时候初始化图表，需要对chartData进行监听
      handler: function () {
        this.initChart();
      },
      deep: true
    }
  },


  computed: {
    options () {//通过计算属性来判断是不是有坐标
      return this.isAxisChart ? this.axisOption : this.normalOption;
    }
  },

  methods: {
    initChart () {//初始化图表
      this.initChartData();//初始化图表时，先初始化图表的数据
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = Echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
      }
    },
    initChartData () {//初始化图表数据
      if (this.isAxisChart) {//判断是否是坐标轴图表
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        this.normalOption.series = this.chartData.series;
      }
    }
  }
}
</script>


<style>
</style>