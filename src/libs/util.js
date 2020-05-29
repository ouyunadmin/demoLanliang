import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'
import route from './util.route'
// import sjcl from './util.sjcl'
import crypto from 'crypto'

const util = {
  route,
  cookies,
  db,
  log
}

/**
 * @description cloneObj深拷贝
 * @param {object} obj 拷贝对像
 */
util.cloneObj = function(obj) {
  var newObj = {}
  if (obj instanceof Array) {
    newObj = []
  }
  for (var key in obj) {
    var val = obj[key]
    newObj[key] = typeof val === 'object' ? util.cloneObj(val) : val
  }
  return newObj
}

/**
 * @description 生成GUID 全局唯一标识符
 */
util.getGuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * @description 获取token
 */
util.getToken = function() {
  return cookies.get('token')
}

/**
 * @description 保存token
 * @param {String} token
 */
util.setToken = function(token) {
  cookies.set('token', token)
}

/**
 * @description 清除token
 */
util.removeToken = function() {
  cookies.remove('token')
}

/**
 * @description el-form，error聚焦定位
 * @param {Object} param { vm: vue }
 */
util.formElementsFocus = function({ vm = '' } = {}) {
  setTimeout(() => {
    if (typeof vm !== 'object') return
    const $form = vm.$el.querySelector('.is-error')
    const $div = vm.$el.querySelector('.admin-container-full__body')
    $div && $div.scrollTo(0, $form.offsetTop || 0)
    $form.querySelector('input') && $form.querySelector('input').focus()
    $form.querySelector('textarea') && $form.querySelector('textarea').focus()
  }, 200)
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function(titleText) {
  const processTitle = process.env.VUE_APP_TITLE || '管理后台'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function(url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('admin-link-temp'))
}

/**
 * @description md5加密
 */
util.md5 = function(data) {
  const hash = crypto.createHash('md5').update(data).digest('hex')
  return hash
}

export default util
