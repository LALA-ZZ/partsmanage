import request from './request'

// 根据qqid查询数据
export function fetchInfo(qqid){
  return request({
    url: '',
    method: 'get',
    params: qqid
  })
}