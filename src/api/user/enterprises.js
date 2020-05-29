import request from '@/plugin/axios'
const qs = require('qs')

// 列表
export function page(data) {
  return request({
    url: '/sys/getOrgList',
    method: 'post',
    data
  })
}

// 详情
export function getObj(query) {
  return request({
    url: '/sys/getOrgInfo',
    method: 'get',
    params: query
  })
}

// 日志列表
export function pageLog(data) {
  return request({
    url: '/sys/getOrgLoginLog',
    method: 'post',
    data
  })
}

// 修改企业用户状态
export function updateUserStatus(query) {
  return request({
    url: '/sys/updateUserStatus',
    method: 'get',
    params: query
  })
}

// 修改企业 mesCode
export function updateOrgMesCode(obj) {
  return request({
    url: '/sys/updateOrgMesCode',
    method: 'post',
    data: qs.stringify(obj)
  })
}

// 修改企业用户信息
export function updateOrgInfo(data) {
  return request({
    url: '/sys/updateOrgInfo',
    method: 'post',
    data
  })
}

// 代理注册（新用户)
export function delegateNewRegist(data) {
  return request({
    url: '/sys/delegateNewRegist',
    method: 'post',
    data
  })
}

// ----------------------------------------------
// 代理注册（老用户)
export function delegateOldRegist(data) {
  return request({
    url: '/sys/delegateOldRegist',
    method: 'post',
    data
  })
}

// 根据 mesCode查询opal系统 用户信息
export function getOrgInfoByMesCode(query) {
  return request({
    url: '/sys/getOrgInfoByMesCode',
    method: 'get',
    params: query
  })
}

// ----------------------------------------------
// 查询待审核企业列表
export function getUncheckOrgList(data) {
  return request({
    url: '/sys/getUncheckOrgList',
    method: 'post',
    data
  })
}

// 审核不通过企业信息
export function checkFailOrgInfo(query) {
  return request({
    url: '/sys/checkFailOrgInfo',
    method: 'get',
    params: query
  })
}

// 审核通过企业信息
export function checkSuccessOrgInfo(data) {
  return request({
    url: '/sys/checkSuccessOrgInfo',
    method: 'post',
    data
  })
}
