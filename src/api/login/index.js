import request from '@/plugin/axios'
const qs = require('qs')

// 登录
export function loginUser({ username, password }) {
  const data = {
    account: username,
    password
    // code: code.toUpperCase()
  }
  return request({
    url: '/sys/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 忘记密码
export function forgetPassword(obj) {
  return request({
    url: '/admin/jwt/forgetPassword',
    method: 'post',
    data: qs.stringify(obj)
  })
}

// 手机验证码六位
export function generateMobileCode(query) {
  return request({
    url: '/admin/jwt/generateMobileCode',
    method: 'get',
    params: query
  })
}

// 验证码图片
export function generateCode() {
  return request({
    url: '/admin/jwt/generateCode',
    method: 'get'
  })
}

// 退出
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

// 用户资料
// export function getUserInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// 用户资料
export function getUserInfo() {
  return request({
    url: '/sys/getLoginInfo',
    method: 'get'
  })
}
