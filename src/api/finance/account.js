import request from '@/plugin/axios'

// 运营平台用户账户列表接口
export function getList(data) {
  return request({
    url: '/finance/admin/account/list',
    method: 'POST',
    data
  })
}
