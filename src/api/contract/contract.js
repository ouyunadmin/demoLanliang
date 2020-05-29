import request from '@/plugin/axios'
const qs = require('qs')

/*
 * 运输合同
 */

// 列表
export function page(query) {
  return request({
    url: '/transportContract/list',
    method: 'get',
    params: query
  })
}

// 详情
export function getObj(query) {
  return request({
    url: '/transportContract/detail',
    method: 'get',
    params: query
  })
}

// 编辑
export function putObj(obj) {
  return request({
    url: '/transportContract/edit',
    method: 'post',
    data: qs.stringify(obj)
  })
}

// 新增
export function addObj(obj) {
  return request({
    url: '/transportContract/save',
    method: 'post',
    data: qs.stringify(obj)
  })
}

// 获取所有处置合同
export function getContractServiceList(query) {
  return request({
    url: '/disposeApply/getDisposeContractServiceList',
    method: 'get',
    params: query
  })
}

// 通过guid查询处置申请详情
export function getDisposeApply(query) {
  return request({
    url: '/disposeApply/detailByGuid',
    method: 'get',
    params: query
  })
}

// 处置企业详情
export function getConsumeDetails(query) {
  return request({
    url: '/sys/getConsumeDetail',
    method: 'get',
    params: query
  })
}

// 查询所有运输企业
export function getTransportOrgs(query) {
  return request({
    url: '/transportContract/getTransportOrgs',
    method: 'get',
    params: query
  })
}

/*
 * 处置合同
 */

// 列表
export function getDisposeContractListByCondition(query) {
  return request({
    url: '/disposeContract/getDisposeContractListByCondition',
    method: 'get',
    params: query
  })
}

// 详情
export function getDisposeContractByGuid(query) {
  return request({
    url: '/disposeContract/getDisposeContractByGuid',
    method: 'get',
    params: query
  })
}

// 处置申请详情
export function getProduceInformationById(query) {
  return request({
    url: '/disposeContract/getProduceInformationById',
    method: 'get',
    params: query
  })
}

/*
 * 处置申请列表
 */
export function getDisposeListByCondition(data) {
  return request({
    url: '/disposeApply/getDisposeListByCondition',
    method: 'post',
    data
  })
}

// 处置申请详情
export function getDetail(query) {
  return request({
    url: '/disposeApply/detail',
    method: 'get',
    params: query
  })
}

// 运输企业详情
export function getTransPortOrgInfo(query) {
  return request({
    url: '/sys/getTransPortOrgInfo',
    method: 'get',
    params: query
  })
}

// 处置申请转移详情
export function getDisposeTransfer(query) {
  return request({
    url: '/transfer/disposeTransfer',
    method: 'get',
    params: query
  })
}

// (欧泊)检测单详情 guid
export function getCheckFormDetail(query) {
  return request({
    url: '/researchForm/getCheckFormDetail',
    method: 'get',
    params: query
  })
}

// (欧泊)危废信息调查单详情 guid
export function getWasteInformationResearchForm(query) {
  return request({
    url: '/researchForm/getWasteInformationResearchForm',
    method: 'get',
    params: query
  })
}

// 根据guid查询合同详情
export function getDatailByDisposeContractGuid(query) {
  return request({
    url: '/transportContract/getDatailByDisposeContractGuid',
    method: 'get',
    params: query
  })
}

// 处置申请 状态工作条 1 通过  0 进行中  -1 拒绝   空 置灰
export function getStatusProcessById(query) {
  return request({
    url: '/disposeApply/getStatusProcessById',
    method: 'get',
    params: query
  })
}

/*
 * 处置申请提交
 */
export function addDisposeApply(data) {
  return request({
    url: '/disposeApply/add',
    method: 'post',
    data
  })
}

// 处置合同危废的价格标准详情(欧泊)
export function getContractIncludeMatPriceStrategyDetail(query) {
  return request({
    url: '/disposeContract/getContractIncludeMatPriceStrategyDetail',
    method: 'get',
    params: query
  })
}

/*
 * 转移申请提交
 */

export function setApply(data) {
  return request({
    url: '/transfer/apply',
    method: 'post',
    data
  })
}

/*
 * 处置申请工作台
 */
export function getDisposeListBystatus(query) {
  return request({
    url: '/disposeApply/getDisposeListBystatus',
    method: 'get',
    params: query
  })
}

// 处置申请 审核不通过
export function updateStatusRefusedById(obj) {
  return request({
    url: '/disposeApply/updateStatusRefusedById',
    method: 'post',
    data: qs.stringify(obj)
  })
}

// 通过固废代码和处置企业id查询固废名称 固废代码 处置企业id
export function getAllWasteNameByWasteCodeAndOrgId(query) {
  return request({
    url: '/opal/getAllWasteNameByWasteCodeAndOrgId',
    method: 'get',
    params: query
  })
}

// 查询所有启用的固废类型（指标管理条件查询 首页估价）
export function getAllTrashType(query) {
  return request({
    url: '/quotaManage/getAllTrashType',
    method: 'get',
    params: query
  })
}

// 根据处置企业id查询处置类型（审核）disposeOrgId
export function getTrashTypeByDisposeOrgId(query) {
  return request({
    url: '/quotaManage/getTrashTypeByDisposeOrgId',
    method: 'get',
    params: query
  })
}

// 根据处置企业id和处置类型查询处置代码（审核） disposeOrgId trashType
export function getTrashTypeByDisposeOrgIdAndTrashType(query) {
  return request({
    url: '/quotaManage/getTrashTypeByDisposeOrgIdAndTrashType',
    method: 'get',
    params: query
  })
}

// 根据处置企业id和处置代码查询处置名称（审核）（调用欧泊） disposeOrgId trashCode
export function getTrashNameByDisposeOrgIdAndTrashCode(query) {
  return request({
    url: '/quotaManage/getTrashNameByDisposeOrgIdAndTrashCode',
    method: 'get',
    params: query
  })
}

// 处置申请 审核
export function reviewDispose(data) {
  return request({
    url: '/disposeApply/reviewDispose',
    method: 'post',
    data
  })
}

/*
 * 转移申请工作台
 */
// 根据状态查询
export function transferWorkOrderQuery(query) {
  return request({
    url: '/transfer/transferWorkOrderQuery',
    method: 'get',
    params: query
  })
}

// 【转移工单详情/个人中心/审核数据】基本信息
export function getWorkOrderBase(query) {
  return request({
    url: '/transfer/getWorkOrderBase',
    method: 'get',
    params: query
  })
}

// 【转移工单详情/个人中心/审核数据】详细信息
export function getWorkOrderParticular(query) {
  return request({
    url: '/transfer/getWorkOrderParticular',
    method: 'get',
    params: query
  })
}

// 转移申请 审核拒绝
export function auditRefuse(obj) {
  return request({
    url: '/transfer/auditRefuse',
    method: 'post',
    data: qs.stringify(obj)
  })
}

// 转移申请 审核
export function setAudit(obj) {
  return request({
    url: '/transfer/audit',
    method: 'post',
    data: qs.stringify(obj)
  })
}

// 【转移工单详情】五联单查询
export function getFiveDuplicateCode(query) {
  return request({
    url: '/transfer/fiveDuplicateCode',
    method: 'get',
    params: query
  })
}

// 【转移工单详情】工单详情进度条
export function getWorkState(query) {
  return request({
    url: '/transfer/workState',
    method: 'get',
    params: query
  })
}
