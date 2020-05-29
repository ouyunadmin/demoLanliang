import request from '@/plugin/axios'

// 获取所有废物类别
export function getTrashTypeList(query) {
  return request({
    url: '/trashInfo/getTrashTypeList',
    method: 'get',
    params: query
  })
}

// 通过固废类型查询固废代码
export function getTrashCodeListByTrashType(query) {
  return request({
    url: '/trashInfo/getTrashCodeListByTrashType',
    method: 'get',
    params: query
  })
}

// 查询所有产废企业
export function getAllProductOrgList(query) {
  return request({
    url: '/sys/getAllProductOrgList',
    method: 'get',
    params: query
  })
}

// 查询产废企业详情 orgId
export function getProductDetail(query) {
  return request({
    url: '/sys/getProductDetail',
    method: 'get',
    params: query
  })
}

// 查询所有处置企业
export function getAllConsumeOrgList(query) {
  return request({
    url: '/sys/getAllConsumeOrgList',
    method: 'get',
    params: query
  })
}

// 查询处置企业详情 orgId
export function getConsumeDetail(query) {
  return request({
    url: '/sys/getConsumeDetail',
    method: 'get',
    params: query
  })
}

// 查询运输企业详情 orgId
export function getTransPortOrgInfo(query) {
  return request({
    url: '/sys/getTransPortOrgInfo',
    method: 'get',
    params: query
  })
}

// 首页统计
export function getHomePage(query) {
  return request({
    url: '/disposeApply/getHomePage',
    method: 'get',
    params: query
  })
}
