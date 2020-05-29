import request from '@/plugin/axios'
const qs = require('qs')

// (欧泊)危废信息调查单列表
export function getWasteInformationResearchFormList(query) {
  return request({
    url: '/researchForm/getWasteInformationResearchFormList',
    method: 'get',
    params: query
  })
}

// (欧泊)派车单列表
export function getAllotCartFormList(data) {
  return request({
    url: '/researchForm/dispatch/trucklist',
    method: 'post',
    data
  })
}

// (欧泊)入库单列表
export function getArriveInventoryFormList(query) {
  return request({
    url: '/researchForm/getArriveInventoryFormList',
    method: 'get',
    params: query
  })
}

// (欧泊)检测单列表
export function getCheckFormList(query) {
  return request({
    url: '/researchForm/getCheckFormList',
    method: 'get',
    params: query
  })
}

// (欧泊)结算单列表
export function getSettleAccountsFormList(data) {
  return request({
    url: '/researchForm/settle/list',
    method: 'post',
    data
  })
}

// (欧泊)结算单详情 settleAccountNo 结算单号
export function getSettleAccountDetail(data) {
  return request({
    url: '/researchForm/settle/detail',
    method: 'post',
    data: qs.stringify(data)
  })
}

// (欧泊)五联单列表
export function getFiveDuplicateFormList(query) {
  return request({
    url: '/researchForm/getFiveDuplicateFormList',
    method: 'get',
    params: query
  })
}
