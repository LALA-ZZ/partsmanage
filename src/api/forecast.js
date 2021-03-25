
import request from './request'

// 获取预测列表数据
export function  fetchForecastList(info){
  return request({
    url:'',
    method: 'post',
    params: info
  })
}

export function fetchUpload(form){
  return request({
    url:'http://192.168.50.219:8080/ch05/index/analysisExcel',
    method: 'post',
    params: form
  })
}