import request from '@/plugin/axios'
const qs = require('qs')

// 运营平台应付管理接口
export function getList(data) {
  return request({
    url: '/finance/admin/pay/list',
    method: 'POST',
    data
  })
}

// 运营平台应付详情 billNo payType
export function getDetails(obj) {
  return request({
    url: '/finance/admin/pay/detail',
    method: 'POST',
    data: qs.stringify(obj)
  })
}
