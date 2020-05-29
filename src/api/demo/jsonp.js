import request from '@/plugin/axios'
// const qs = require('qs')
const jsonpAdapter = require('axios-jsonp')

// 支持jsonp
export function getJsonp(param) {
  return request({
    url: 'http://hz.redlion56.com/gwhz/goodsowner/app/stationOrder/getAgingConfigInfo.do',
    adapter: jsonpAdapter,
    callbackParamName: 'callback',
    baseURL: '',
    method: 'get',
    params: param
  })
}
