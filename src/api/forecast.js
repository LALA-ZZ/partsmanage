import request from './request'

// 获取预测列表数据
export function  fetchForecastList(queryInfo){
  return request({
    url:'',
    method: 'get',
    params: queryInfo
  })
}