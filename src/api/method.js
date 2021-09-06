// methods 统一封装
import axios from '@/service/interceptor'

export default {
  get,
  post,
  put,
  del,
}

function get (url, options) {
  return axios.get(url, options)
}

function post (url, params, options) {
  return axios.post(url, params, options)
}

function put (url, params, options) {
  return axios.put(url, params, options)
}

function del (url, options) {
  return axios.delete(url, options)
}
