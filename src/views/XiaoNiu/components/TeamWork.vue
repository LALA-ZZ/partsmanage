<!--  -->
<template>
  <div id="teamwork" style="width: 100%;height:300px;"></div>
</template>


<script>
import Echarts from 'echarts'
export default {
  props: {
  },
  data () {
    return {
    };
  },

  components: {},

  computed: {},
  mounted () {
    this.$nextTick(function () {
      this.initChart()
    })
  },

  methods: {
    initChart () {
      var chart = Echarts.init(document.getElementById('teamwork'))
      var option = {
        title: {
          text: '团队协作',
          subtext: this.qqid,
        },
        // 悬浮提示
        tooltip: {
          trigger: 'item',
          position: ['70%', '10%']
        },
        // 雷达图
        radar: {
          // shape: 'circle',
          splitNumber: 5,
          nameGap: 5,
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
          indicator:
            [
              // --------------------------------------6
              {
                name: '团队协作能力', max: 5,
                // 坐标轴刻度标签的相关设置
                // 若将此属性放在radar下，则每条indicator都会显示圈上的数值，放在这儿，只在通信这条indicator上显示
                axisLabel: {
                  show: true,
                  fontSize: 12,
                  length: 5,
                  color: '#838D9E',
                  showMaxLabel: true, //显示最大值，即外圈不显示数字30
                  showMinLabel: false, //bu显示最小数字，即中心点显示0
                },
              },
              {
                name: '信息共享能力',
                max: 5,
              },
              {
                name: '受挫和经验吸收能力',
                max: 5,
              },
              {
                name: '与导师沟通探讨能力',
                max: 5,
              },
              {
                name: '研究构思能力',
                max: 5,
              },
              {
                name: '倾听意见能力',
                max: 5,
              },
            ],
          //设置雷达图中间射线的颜色
          axisLine: {
            show: true,
            lineStyle: {
              // color: '##409EFF',
              type: 'solid',
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10
            },
          },
          axisTick: {
            show: true,
            length: 5
          },

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
              // color: '#24ADF3', // 设置网格的颜色
              opacity: 1
            },
          },
        },
        // 图例
        // legend: {
        //   data: ['团队协作']
        // },
        series: [
          {
            name: '雷达图',
            type: 'radar',

            symbolSize: 8,
            areaStyle: {
              normal: {
                width: 1,
                opacity: 0.2,
              },
            },
            data: [
              {
                value: [3, 3, 3, 3, 3, 3],
                // name: '团队协作',
                symbol: 'rect', // 拐点的样式，还可以取值'rect','angle'等
                label: {
                  show: true
                },
                // 设置区域边框和区域的颜色
                itemStyle: {
                  normal: {
                    color: '#EB8146',
                    // color: ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'],
                    lineStyle: {
                      color: '#EB8146',
                      // color: ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'],
                      width: '3'
                    },
                  },
                },
              },

            ]
          }
        ]
      }
      chart.setOption(option)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>