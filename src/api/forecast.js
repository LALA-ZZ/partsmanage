import request from './request'

// 获取预测列表数据
export function  fetchForecastList(queryInfo){
  return request({
    url:'192.168.50.219:8080/ch01/',
    method: 'get',
    params: queryInfo
  })
}