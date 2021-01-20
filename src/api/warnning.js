import request from './request'

// 查 量预警列表
export function fetchAmountList(query){
  return request({
    url: '/warnning/amountList',
    method: 'get',
    params: query
  })
}

// 查 超时预警列表
export function fetchOvertimeList(query){
  return request({
    url: '/warnning/overtiimeList',
    method: 'get',
    params: query
  })
}