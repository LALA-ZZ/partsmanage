<!--  -->
<template>
  <div style="height: 100%" ref="echart">
    <!--ref添加属性元素，通过vm.$ref获取dom元素-->

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
          top: '10%',

          left: "3%",

          right: "3%",

          bottom: '10%',

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
      },

    };
  },
  watch: {
    chartData: {//在chartData发生变化的时候初始化图表，需要对chartData进行监听
      handler: function () {
        this.initChart();
      },
      deep: true
    },
    isCollapse () {
      setTimeout(() => {
        this.resizeCharts()
      }, 300)
    }
  },


  computed: {
    options () {//通过计算属性来判断是不是有坐标
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
    isCollapse () {//获取菜单栏是否折叠
      return this.$store.state.tab.isCollapse;
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
    },
    resizeCharts () {//在网页发生形状变化时,图表自动改变形状
      this.echart ? this.echart.resize() : '';
    }
  },
  mounted () {
    window.addEventListener('resize', this.resizeCharts);//监听网页的resize事件,然后调用resizeCharts方法,自动改变图表形状
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeCharts);//在组件销毁时销毁事件,防止内存泄漏
  }
}
</script>


<style>
</style>