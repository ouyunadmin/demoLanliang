import request from '@/plugin/axios'

/* 数据表头-查询*/
export function getGridField(gridName) {
  const data = {
    gridName
  }
  return request({
    url: '/gridField/listGridField',
    method: 'get',
    params: data
  })
}
/* 数据表头-系统表头查询*/
export function getGridSystemGridField(gridName) {
  const data = {
    gridName
  }
  return request({
    url: '/gridField/listSystemGridField',
    method: 'get',
    params: data
  })
}
/* 数据表头-更新 */
export function getGridUpdate(data) {
  return request({
    url: '/gridField/update',
    method: 'post',
    data
  })
}
/* 数据表头-恢复为指定版本*/
export function getGridRecover(data) {
  return request({
    url: '/gridField/recover',
    method: 'post',
    data
  })
}
/* 数据表头-保存快照版本*/
export function getGridSaveSnapshot(data) {
  return request({
    url: '/gridField/saveSnapshot',
    method: 'post',
    data
  })
}
