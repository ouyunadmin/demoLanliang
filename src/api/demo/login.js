import request from '@/plugin/axios'
const qs = require('qs')

// 登录
export function loginUser(data) {
  return request({
    url: '/admin/jwt/token',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return request({
    url: '/admin/user/info',
    method: 'get',
    params: { token }
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

// 退出
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}
