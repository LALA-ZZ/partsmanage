<!--  -->
<template>
  <div style="height: 100%" ref="echart">
    echart
  </div>
</template>


<script>
import Echarts from 'echarts'
export default {
  props: {
    chartData: {//指定图表的数据，包含x轴数据和series数据
      type: Object,
      default () {
        return {
          xData: [],
          series: []
        }
      }
    },
    isAxisChart: {//图表是否包含坐标轴，默认包含坐标轴
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      echart: null,//echart容器，是否是一个图表
      axisOption: {//包含坐标轴的图片配置
        xAxis: [
          {
            type: 'category',
            data: []
          }
        ],
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]


      },
      normalOption: {}//不包含坐标轴的图片配置
    };
  },

  components: {
    Echarts
  },

  computed: {
    options () {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    }
  },

  methods: {
    initChart () {//初始化图表
      if (this.echart) {
        this.echart.seletOption(this.options);
      } else {
        this.echart = Echarts.init(this.$refs.echart);
        this.echart.seletOption(this.options);
      }
    }
      initChartData () {//初始化图表数据
      if (this.isAxisChart) {//判断是否是坐标轴图表
        console.log()
      } else {

      }
    }
  }
}
</script>


<style>
</style>