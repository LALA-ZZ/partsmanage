<!--  -->
<template>
  <div class="common-content">
    <el-card shadow="hover">
      <div slot="header">
        查找条件
      </div>
      <el-input v-model="qqid" placeholder="请输入查询的QQ编号" style="width:200px"></el-input>

      <el-button type="primary" icon="el-icon-search" @click="getList">快速搜索</el-button>
    </el-card>

    
    <!-- 雷达图 -->
    <el-row :gutter="10" style="margin-top: 10px">
      <el-col :span="24">
        <el-card shadow="hover">
          <div id="echart" style="width: 100%;height:550px;"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <el-row >
          <el-col :span="12">
            <el-card shadow="hover" style="height:310px">
               <innovate></innovate>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover" style="height:310px">
              <team-work></team-work>
            </el-card>
          </el-col>
        </el-row>
        <el-row  >
          <el-col :span="12">
            <el-card shadow="hover" style="height:310px">
             <learning></learning>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover" style="height:310px">
              <code-ability></code-ability>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>


<script>
// import { fetchInfo } from '@/api/xiaoniu'
import Echarts from 'echarts'
// import RaddraChart from './components/RaddraChart.vue';
import TeamWork from './components/TeamWork.vue';
import Learning from './components/learning.vue';
import Innovate from './components/Innovate.vue';
import CodeAbility from './components/CodeAbility.vue';

export default {
  data () {
    return {
      qqid: null,
      qqdata: null,
      chart: null,
      echartsData: {
        // 大表
        stuinfo: {

          indicator: [

          ],
          series: []
        },
        // 团队协作
        teamwork: {
          indicator: [
            {
              name: '团队协作能力', max: 5,
              // 坐标轴刻度标签的相关设置
              // 若将此属性放在radar下，则每条indicator都会显示圈上的数值，放在这儿，只在通信这条indicator上显示
              axisLabel: {
                show: true,
                fontSize: 12,
                color: '#838D9E',
                showMaxLabel: true, //不显示最大值，即外圈不显示数字30
                showMinLabel: false, //显示最小数字，即中心点显示0
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
            }
          ],
          series: []
        },
        // 知识学习
        learning: {
          indicator: [],
          series: []
        },
        // 创新素质
        innovate: {
          indicator: [],
          series: []
        },
        // 编程能力
        code: {
          indicator: [],
          series: []
        }
      }
    };
  },

  components: { TeamWork, Learning, Innovate, CodeAbility },

  computed: {},
  mounted () {
    this.$nextTick(function () {
      this.initChart()
    })




  },


  methods: {
    getList () { },
    initChart () {
      // 网络请求数据
      // fetchInfo(this.qqid).then(res => {
      //   if (res.data.meta.statusm !== 200) {
      //     return this.$message.error('获取数据失败！')
      //   }
      //   this.qqdata = res.data.data
      // })


      var chart = Echarts.init(document.getElementById('echart'))
      var option = {
        title: {
          text: '计算机类研究生创新能力画像',
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
          splitNumber: 10,
          radius: '66%',
          // 雷达图每个指示器名称的配置项。
          name: {
            // 文本样式
            textStyle: {
              color: 'rgb(0,0,0)',
              // backgroundColor: '#999',
              fontSize: 18,
              fontFamily : '宋体',
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
                name: '合作意识', max: 5,
                // 坐标轴刻度标签的相关设置
                // 若将此属性放在radar下，则每条indicator都会显示圈上的数值，放在这儿，只在通信这条indicator上显示
                axisLabel: {
                  show: true,
                  fontSize: 12,
                  color: '#838D9E',
                  showMaxLabel: true, //不显示最大值，即外圈不显示数字30
                  showMinLabel: false, //显示最小数字，即中心点显示0
                },
              },
              {
                name: '信息共享',
                max: 5,
              },
              {
                name: '自我调节能力',
                max: 5,
              },
              {
                name: '沟通交流能力',
                max: 5,
              },
              {
                name: '语言表达能力',
                max: 5,
              },
              {
                name: '倾听意见能力',
                max: 5,
              },

              // --------------------------------------7
              {
                name: '学术会议',
                max: 5,
              },
              {
                name: '实施执行',
                max: 5,
              },
              {
                name: '数学基础知识',
                max: 5,
              },
              {
                name: '论文撰写能力',
                max: 5,
              },
              {
                name: '前沿性知识',
                max: 5,
              },
              {
                name: '专业研究方法',
                max: 5,
              },
              {
                name: '融合性知识',
                max: 5,
              },
              // --------------------------------------5


              {
                name: '想象思维',
                max: 5,
              },
              {
                name: '创新动机',
                max: 5,
              },
              {
                name: '自学能力',
                max: 5,
              },
              {
                name: '语言理解能力',
                max: 5,
              },
              {
                name: '学习悟性',
                max: 5,
              },
              // --------------------------------------3
              {
                name: '编程知识实践',
                max: 5,
              },
              {
                name: '编程知识学习',
                max: 5,
              },
              {
                name: '科研活动',
                max: 5,
              },

            ],
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
          data: ['当前学生能力值', '各能力平均值'],
          bottom: '20'
        },
        series:
          [
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
              // areaStyle: {
              //   normal: {
              //     shadowBlur: 13,
              //     color: '#2EC7C9',
              //     shadowColor: '#2EC7C9',
              //     shadowOffsetX: 0,
              //     shadowOffsetY: 10,
              //     opacity: 1
              //   }
              // },
              data:
                [
                  {
                    value: [4,4,5,5,4,4,3,3,3,3,3,4,3,4,4,4,4,3,3,3,4],
                    name: '当前学生能力值',
                    symbol: 'rect', // 拐点的样式，还可以取值'rect','angle'等
                    label: {
                      show: true
                    },
                    // 设置区域边框和区域的颜色
                    itemStyle: {
                      normal: {
                        color: '#2EC7C9',
                        // color: ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'],
                        lineStyle: {
                          color: '#2EC7C9',
                          // color: ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'],
                          width: '3'
                        },
                      },
                    },
                  },
                  {
                    value: [2.4, 2.4, 2.5, 2.7, 2.7, 2.5, 3.4, 2.9, 3.2, 3.2, 3.1, 3.0,2.9, 2.7, 2.8, 2.7, 2.8, 2.8, 2.9, 2.8, 2.7],
                    name: '各能力平均值',
                    symbol: 'rect',
                    lineStyle: {
                      color: '#E50808',
                      type: 'dashed'
                    }
                  },

                ]
            }]
      }
      chart.setOption(option)



      this.echartsData.teamwork.series.push({
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
            // name: '团队协作'
          }
        ]
      })


    },


  }
}
</script>


<style lang="scss" scoped>
.common-content {
  padding: 20px;
  padding-bottom: 20px;

  .secondcard {
    margin-top: 3px;
    // background-color: rgb(254, 248, 239);
  }
}
</style>