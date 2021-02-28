import request from './request'

// 获取库存列表数据
export function  fetchInventoryList(queryInfo){
  return request({
    url:'',
    method: 'get',
    params: queryInfo
  })
}

// 根据配件类别id查询某类配件的所有配件
export function fetchParts(partsId){
  return request ({
    url:'',
    method: 'get',
    params: partsId
  })
}