import request from '@/plugin/axios'
import qs from 'qs'

// 运营平台发票列表
export function getList(data) {
  return request({
    url: '/finance/admin/invoice/list',
    method: 'POST',
    data
  })
}

// 运营平台发票列表
export function getDetails(data) {
  return request({
    url: '/finance/admin/invoice/detail',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 发票管理-结算详情
export function getTransferDetails(data) {
  return request({
    url: '/finance/admin/invoice/transfer/detail',
    method: 'POST',
    data: qs.stringify(data)
  })
}
