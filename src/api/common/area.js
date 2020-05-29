import request from '@/plugin/axios'
// const qs = require('qs')

// 根据区域id查询下级区域
export function getArea(query) {
  return request({
    url: '/area/getNextAreaById',
    method: 'get',
    params: query
  })
}

// 根据区域id查询当前区域
export function getAreaById(query) {
  return request({
    url: '/area/getAreaById',
    method: 'get',
    params: query
  })
}

// 名称模糊搜索第三级别行政区域
export function getThirdAreaByName(query) {
  return request({
    url: '/area/getThirdAreaByName',
    method: 'get',
    params: query
  })
}

export function getAllRegion() {
  return request({
    url: '/test/getAllRegion',
    method: 'get',
    params: {}
  })
}
export function fuzzyQueryByName(param) {
  return request({
    url: '/test/fuzzyQueryByName',
    method: 'post',
    data: param
  })
}
export function queryByParentId() {
}
export function getAllProvince() {
  return request({
    url: '/test/getAllProvince',
    method: 'get',
    params: {}
  })
}
