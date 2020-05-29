/**
 * @authors wangxiaoxing (you@example.org)
 * @date    2019-01-11 17:09:36
 * @version $Id$
 */

import request from '@/plugin/axios'
import qs from 'qs'

// 修改企业用户状态
export function getList(params) {
  return request({
    url: '/quotaManage/list',
    method: 'GET',
    params
  })
}

// 查询所有启用的固废类型（指标管理条件查询 首页估价）
export function getAllTrashType(params) {
  return request({
    url: '/quotaManage/getAllTrashType',
    method: 'GET',
    params
  })
}

// 通过固废类型查询固废代码（指标管理条件查询 首页估价）
export function getTrashCodeByTrashType(params) {
  return request({
    url: '/quotaManage/getTrashCodeByTrashType',
    method: 'GET',
    params
  })
}

// 查询所有处置企业
export function getAllConsumeOrgList(params) {
  return request({
    url: '/sys/getAllConsumeOrgList',
    method: 'GET',
    params
  })
}

// (固废)获取所有废物类别 新增用
export function getTrashTypeList(params) {
  return request({
    url: '/trashInfo/getTrashTypeList',
    method: 'GET',
    params
  })
}

// (固废)通过固废类型查询固废代码 新增用
export function getTrashCodeListByTrashType(params) {
  return request({
    url: '/trashInfo/getTrashCodeListByTrashType',
    method: 'GET',
    params
  })
}

// 指标管理 新增
export function add(data) {
  return request({
    url: '/quotaManage/add',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 指标管理 详情
export function getDetails(params) {
  return request({
    url: '/quotaManage/detail',
    method: 'GET',
    params
  })
}

// 指标管理 修改
export function update(data) {
  return request({
    url: '/quotaManage/update',
    method: 'POST',
    data: qs.stringify(data)
  })
}

// 指标管理 修改状态
export function updateStatusById(data) {
  return request({
    url: '/quotaManage/updateStatusById',
    method: 'POST',
    data: qs.stringify(data)
  })
}
