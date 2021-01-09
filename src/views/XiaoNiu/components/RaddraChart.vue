<!--  -->
<template>
  <div :style="{height:height,width:width}" ref="echart"></div>
</template>


<script>
import Echarts from 'echarts'
export default {
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    chartData: {//指定图表的数据，包含x轴数据和series数据
      type: Object,
      default () {
        return {
          indicator: [],
          series: []
        }
      }
    },
  },
  data () {
    return {
      chart: null,
      option: {
        title: {
          text: '计算机类研究生创新能力画像',
        },
        // 悬浮提示
        tooltip: {
          trigger: 'item',
          position: ['70%', '10%']
        },
        // 雷达图
        radar: {
          // shape: 'circle',
          splitNumber: 10,
          radius: '66%',
          // 雷达图每个指示器名称的配置项。
          name: {
            // 文本样式
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          // 中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
          center: ['50%', '50%'],

          // 指示器
          indicator: [],
          //设置雷达图中间射线的颜色
          axisLine: {
            show: true,
            lineStyle: {
              color: '##409EFF',
              type: 'solid',
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10
            },
          },
          // 坐标轴刻度配置
          // axisTick: {
          //   show: true,
          //   length: 5,

          // },

          // 分隔区域，雷达图背景的颜色
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'], // 图表背景的颜色
              opacity: 1,
            },
          },
          //分隔线
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: '#24ADF3', // 设置网格的颜色
              opacity: 1
            },
          },
        },
        // 图例
        legend: {
          textStyle: {
            color: '#333'
          },
          bottom: '0px'
        },
        series: []
      }
    }
  },
  components: {},

  computed: {
    isCollapse () {//获取菜单栏是否折叠
      return this.$store.state.tab.isCollapse;
    },
  },
  watch: {
    // chartData: {//在chartData发生变化的时候初始化图表，需要对chartData进行监听
    //   handler: function () {
    //     this.initChart();
    //   },
    //   deep: true
    // },
    isCollapse () {
      setTimeout(() => {
        this.resizeCharts()
      }, 300)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  // mounted () {
  //   window.addEventListener('resize', this.resizeCharts);//监听网页的resize事件,然后调用resizeCharts方法,自动改变图表形状
  // },
  // destroyed () {
  //   window.removeEventListener('resize', this.resizeCharts);//在组件销毁时销毁事件,防止内存泄漏
  // },
  methods: {
    initChartData () {//初始化图表数据

      this.option.indicator = this.chartData.indicator
      console.log('this.option.indicator')
      console.log(this.option.indicator)
      this.option.series = this.chartData.series;//将父组件传来的series存放在option中
      console.log(this.option.series)
    },
    initChart () {//初始化图表
      this.initChartData();//初始化图表时，先初始化图表的数据
      if (this.chart) {
        this.chart.setOption(this.option);
      } else {
        this.chart = Echarts.init(this.$refs.echart);
        this.chart.setOption(this.option);
      }
    },
    // resizeCharts () {//在网页发生形状变化时,图表自动改变形状
    //   this.echart ? this.echart.resize() : '';
    // }
  }
}
</script>


<style lang="scss" scoped>
</style>