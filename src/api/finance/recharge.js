import request from '@/plugin/axios'

// 运营平台应付管理接口
export function getList(data) {
  return request({
    url: '/finance/admin/recvpay/list',
    method: 'POST',
    data
  })
}
