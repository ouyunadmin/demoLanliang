import request from '@/plugin/axios'
const qs = require('qs')

// 信息列表
export function listMessageMailSend(data) {
  return request({
    url: '/message/listMessageMailSend',
    method: 'get',
    params: data
  })
}

// 删除一条信息
export function deleteOne(data) {
  return request({
    url: '/message/deleteOne?id=' + data,
    method: 'put'
  })
}

// 消息-标记为已读
export function markAsIsRead(data) {
  return request({
    url: '/message/markAsIsRead',
    method: 'put',
    data: qs.stringify(data)
  })
}

// 消息-清空消息
export function emptyMessage(data) {
  return request({
    url: '/message/emptyMessage',
    method: 'put',
    data: qs.stringify(data)
  })
}

// 设置-新增消息设置
export function addMessageMail(data) {
  return request({
    url: '/message/addMessageMail',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 设置-获取消息设置信息
export function getMessageMail(data) {
  return request({
    url: '/message/getMessageMail',
    method: 'get'
  })
}

// 设置-修改消息设置(保存)
export function setMessageMail(data) {
  return request({
    url: '/message/setMessageMail',
    method: 'put',
    data: qs.stringify(data)
  })
}
