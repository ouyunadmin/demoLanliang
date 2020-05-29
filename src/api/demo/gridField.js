import request from '@/plugin/axios'

/* 数据表头-查询*/
export function getGridField(gridName, Authorization) {
  const data = {
    gridName
  }
  return request({
    url: '/gridFields/listGridField',
    method: 'get',
    params: data
  })
}
/* 数据表头-更新 */
export function getGridUpdate(data) {
  return request({
    url: '/gridFields/update',
    method: 'put',
    data
  })
}
/* 数据表头-恢复为指定版本*/
export function getGridRecover(data) {
  return request({
    url: '/gridFields/recover',
    method: 'post',
    data
  })
}
/* 数据表头-保存快照版本*/
export function getGridSaveSnapshot(data) {
  return request({
    url: '/gridFields/saveSnapshot',
    method: 'post',
    data
  })
}

