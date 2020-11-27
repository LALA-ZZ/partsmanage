// 存放首页相关图表数据
import Mock from 'mockjs'

let List = []
export default {
    getHomeData: () =>{
      for(let i = 0; i < 7; i++){
        List.push(
          Mock.mock({
            喷油嘴: Mock.Random.float(100,8000,0,2),
            悬挂:Mock.Random.float(100,8000,0,2),
            弹簧: Mock.Random.float(100,8000,0,2),
            主减速器: Mock.Random.float(100,8000,0,2),
            副车架: Mock.Random.float(100,8000,0,2),
            变速器: Mock.Random.float(100,8000,0,2),
          })
        )
      }
      return {
        code: 20000,//区别一下是否是mock数据
        data: {
          // 饼图
          partsData: [
              {
                  name: '喷油嘴',
                  value: Mock.Random.float(100,10000,0,2)
              },
              {
                  name: '弹簧',
                  value: Mock.Random.float(100,10000,0,2)
              },
              {
                  name: '悬挂',
                  value: Mock.Random.float(100,10000,0,2)
              },
              {
                  name: '主减速器',
                  value: Mock.Random.float(100,10000,0,2)
              },
              {
                  name: '变速器',
                  value: Mock.Random.float(100,10000,0,2)
              },{
                  name: '副车架',
                  value: Mock.Random.float(100,10000,0,2)
              },
          
          ],
          //柱状图
          userData: [
            {
              date: '周一',
              new: Mock.Random.integer(1, 100),
              active: Mock.Random.integer(100, 1000)
            },
            {
              date: '周二',
              new: Mock.Random.integer(1, 100),
              active: Mock.Random.integer(100, 1000)
            },
            {
              date: '周三',
              new: Mock.Random.integer(1, 100),
              active: Mock.Random.integer(100, 1000)
            },
            {
              date: '周四',
              new: Mock.Random.integer(1, 100),
              active: Mock.Random.integer(100, 1000)
            },
            {
              date: '周五',
              new: Mock.Random.integer(1, 100),
              active: Mock.Random.integer(100, 1000)
            },
            {
              date: '周六',
              new: Mock.Random.integer(1, 100),
              active: Mock.Random.integer(100, 1000)
            },
            {
              date: '周日',
              new: Mock.Random.integer(1, 100),
              active: Mock.Random.integer(100, 1000)
            }
          ],

        // 折线图
        orderData: {
          date: ['20200703', '20200704', '20200705', '20200706', '20200707', '20200708', '20200709'],
          data: List
        },

        tableData: [
          {
            
            name: '喷油嘴',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: '悬挂',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: '弹簧',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: '主减速器',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: '副车架',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: '变速器',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          }
        ]
            }
        }
    }
}