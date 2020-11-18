// 存放首页相关数据
import Mock from 'mockjs'

export default {
    getHomeData: () =>{
        return {
            code: 20000,//区别一下是否是mock数据
            data: {
                videoData: [
                    {
                        name: 'springboot',
                        value: Mock.Random.float(100,10000,0,2)
                    },
                    {
                        name: 'springboot',
                        value: Mock.Random.float(100,10000,0,2)
                    },
                    {
                        name: 'springboot',
                        value: Mock.Random.float(100,10000,0,2)
                    },
                    {
                        name: 'springboot',
                        value: Mock.Random.float(100,10000,0,2)
                    },
                    {
                        name: 'springboot',
                        value: Mock.Random.float(100,10000,0,2)
                    },{
                        name: 'springboot',
                        value: Mock.Random.float(100,10000,0,2)
                    },
                
                ]
            }
        }
    }
}