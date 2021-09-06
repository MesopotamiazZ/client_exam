import axios from '@/service/interceptor'

/**
 * 用户登录
 * @author zero
 * @date 2017/11/21
 */
export function login (username = '', password = '', deviceType = 0) {
  return axios.post('api/v1/session', {username, password, deviceType}, {showLoad: true})
}

/**
 * 获取密钥
 * @author zero
 * @date 2017/11/21
 */
export function getSecret () {
  return axios.post('api/auth/token')
}
