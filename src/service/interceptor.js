import axios from 'axios'
import config from './config'
import store from '@/store'
import * as types from '@/store/types'

// import router from '../router'

// import { Message } from 'iview'
import Message from '@/components/message'

// axios 配置
axios.defaults.timeout = 10000 // 请求超时事件
axios.defaults.baseURL = config.serverUrl // 服务器地址

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.authorize) {
      config.headers.Authorization = 'Bearer ' + store.state.secret.access_token
    }
    if (config.showLoad !== false) {
      store.commit(types.SET_REQ_COUNT, 'create')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    store.commit(types.SET_REQ_COUNT, 'finish')
    // 直接返回内容
    switch (response.status) {
    case 201:
      Message.success({content: '操作成功'})
      break
    case 204:
      Message.success({content: '操作成功'})
      break
    default: break
    }
    return response.data
  },
  error => {
    store.commit(types.SET_REQ_COUNT, 'finish')
    if (error.response) {
      switch (error.response.status) {
      case 400:
        Message.error({content: error.response.data.message})
        break
      // case 403:
      // case 401:
      //     // 401 清除token信息并跳转到登录页面
      //   window.localStorage.removeItem('userInfo')
      //   router.replace({
      //     path: 'login',
      //   })
      //   if (error.response.data.msg) {
      //     Message.error(error.response.data.msg)
      //   } else {
      //     Message.error('登录过期')
      //   }
      //   break
      // case 404:
      //   Message.error('地址不存在')
      //   break
      default:
        if (error.response.data.msg) {
          Message.error(error.response.data.msg)
        }
        break
      }
    }
    console.error(error.config.url, error.response.status)
    return Promise.reject(error)
  })

export default axios
