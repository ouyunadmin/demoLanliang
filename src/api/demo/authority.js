import request from '@/plugin/axios'

// 获取全部的菜单树
export function menuTree(query) {
  return request({
    url: '/authority/menu',
    method: 'get',
    params: query
  })
}
// 获取菜单权限树
export function tree(query) {
  return request({
    url: '/authority/tree',
    method: 'get',
    params: query
  })
}
// 修改菜单权限
export function modifyMenuAuthority(query) {
  return request({
    url: '/authority/modifyMenuAuthority',
    method: 'get',
    params: query
  })
}

// 获取菜单下全部按钮列表
export function buttonList(query) {
  return request({
    url: '/authority/buttonList',
    method: 'get',
    params: query
  })
}
// 新增按钮
export function addButton(query) {
  return request({
    url: '/authority/addButton',
    method: 'get',
    params: query
  })
}
// 修改按钮
export function updateButton(query) {
  return request({
    url: '/authority/updateButton',
    method: 'get',
    params: query
  })
}
// 删除按钮
export function deleteButton(query) {
  return request({
    url: '/authority/deleteButton',
    method: 'get',
    params: query
  })
}
// 获取权限按钮列表
export function authorityButton(query) {
  return request({
    url: '/authority/authorityButton',
    method: 'get',
    params: query
  })
}
// 增加按钮权限-角色
export function authorityttonAdd(query) {
  return request({
    url: '/authority/authorityttonAdd',
    method: 'get',
    params: query
  })
}
// 增加按钮权限-职员
export function addButtonAuthority(query) {
  return request({
    url: '/authority/addButtonAuthority',
    method: 'get',
    params: query
  })
}
// 增加角色
export function addRole(query) {
  return request({
    url: '/authority/addRole',
    method: 'get',
    params: query
  })
}
// 修改角色
export function updateRole(query) {
  return request({
    url: '/authority/updateRole',
    method: 'get',
    params: query
  })
}
// 增加菜单
export function addMenu(query) {
  return request({
    url: '/authority/addMenu',
    method: 'get',
    params: query
  })
}
// 修改菜单
export function updateMenu(query) {
  return request({
    url: '/authority/updateMenu',
    method: 'get',
    params: query
  })
}
// 删除菜单
export function deleteMenu(query) {
  return request({
    url: '/authority/deleteMenu',
    method: 'get',
    params: query
  })
}
// 获取菜单详情
export function getMenu(query) {
  return request({
    url: '/authority/getMenu',
    method: 'get',
    params: query
  })
}
