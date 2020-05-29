import request from '@/plugin/axios'
const qs = require('qs')

// 列表
export function testList(query) {
  return request({
    url: '/test/list',
    method: 'get',
    params: query
  })
}

// 获取树
export function treeObj(query) {
  return request({
    url: '/test/tree',
    method: 'get',
    params: query
  })
}

// 获取树按钮
export function getTreeBtn(query) {
  return request({
    url: '/test/btnList',
    method: 'get',
    params: query
  })
}

// 获取已经拥有的按钮权限
export function getIsBtn(query) {
  return request({
    url: '/test/isBtn',
    method: 'get',
    params: query
  })
}

/* 托运单-下拉列表*/
export function consignOptionList() {
  return request({
    url: '/operator/getOption',
    method: 'get'
  })
}

// 安全-修改用户密码
export function changePassword(data) {
  return request({
    url: '/user/changePassword',
    method: 'put',
    data: qs.stringify(data)
  })
}

export function addObj(data) {
  return request({
    url: '/test/add',
    method: 'post',
    data
  })
}

export function putObj(data) {
  return request({
    url: '/test/edit',
    method: 'put',
    data
  })
}

export function getObj(id) {
  return request({
    url: '/test/get/' + id,
    method: 'get'
  })
}
