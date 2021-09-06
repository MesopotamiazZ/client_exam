import Vue from 'vue'
import Vuex from 'vuex'

import api from '@/api'
import {default as router, appRouters, baseRouter} from '@/router'

import * as types from './types'
import * as configTypes from './modules/config/configTypes'

import clipboardPlugin from './plugins/clipboard'
import i18nPlugin from './plugins/i18n'
import scanningGunPlugin from './plugins/scanningGun'

const files = require.context('.', true, /Module\.js$/)
const modules = {}

try {
  files.keys().forEach(path => {
    if (path.indexOf('Module.js') !== -1) {
      let modu = files(path).default
      if (modu) {
        modules[path.split('/').pop().replace(/(\.\/|\.js)/g, '')] = modu
      } else {
        console.error(`${path.split('/').pop()}modules加载失败`)
      }
    }
  })
} catch (e) {
  console.error('store加载失败', e)
}

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    /* 当前用户加载配置项 */
    theme: 'theme1', // 当前主题
    lang: 'zh', // 当前语言
    zoomRatio: 0, // 屏幕比例
    autoStart: false, // 开机自启
    bgAnimate: false, // 背景动画
    desktopMsg: false, // 桌面通知
    /* eslint-disable no-empty-function */
    shortcutMap: {
      screenshot: {
        name: 'screenshot',
        key: '',
        oldKey: '',
      },
    },
    screenshot: '',
    /* 用户请求数据 */
    secret: {}, // 密钥
    userInfo: {}, // 用户信息

    /* 程序当前状态 */
    initialization: false, // 初始化
    curMainMenu: 'prepare', // 当前主菜单
    title: 'HTCM 体检', // app 标题
    subTitle: '', // app 子标题
    defaultPath: '/', // 默认路由
    pageOpenList: [], // 打开页面列表
    curPageName: '', // 当前页面名称
    windowHeight: 0, // 获取窗体内容高度
    windowWidth: 0, // 获取窗体内容宽度
    nwWindowHeight: 0, // 获取窗体高度
    nwWindowWidth: 0, // 获取窗体宽度
    reqCount: 0, // 当前请求数量
    selectdata: '', // 保存的数据
  },
  getters: {
    // 需要缓存的页面
    cachePage (state) {
      return state.pageOpenList.map(item => item.name)
    },
    getselectdata(state) {
      return state.selectdata
    },
  },
  mutations: {
    [types.INIT_USER_CONFIG] (state, payload) {
      if (payload && payload.settings) {
        Object.keys(payload.settings).forEach((key) => {
          state[key] = payload.settings[key]
        })
      }
    },
    [types.SET_WINDOW_HEIGHT] (state, payload = 0) {
      state.windowHeight = payload
    },
    [types.SET_SELECTDATA] (state, payload) {
      state.selectdata = payload
    },
    [types.SET_WINDOW_WIDTH] (state, payload = 0) {
      state.windowWidth = payload
    },
    [types.SET_NW_WINDOW_HEIGHT] (state, payload = 0) {
      state.nwWindowWidth = payload
    },
    [types.SET_NW_WINDOW_WIDTH] (state, payload = 0) {
      state.nwWindowHeight = payload
    },
    [types.SET_REQ_COUNT] (state, payload = 'create') {
      if (payload === 'create') {
        state.reqCount = state.reqCount + 1
      } else if (payload === 'finish') {
        state.reqCount = state.reqCount - 1
      }
    },
    [types.SET_SECRET] (state, payload = {}) {
      state.secret = payload
    },
    [types.SET_CURRENT_MAIN_MENU] (state, payload = '') {
      state.curMainMenu = payload
    },
    [types.SET_CURRENT_PAGE_NAME] (state, payload = '') {
      state.curPageName = payload
    },
    [types.SET_LANGUAGE] (state, payload) {
      state.lang = payload + ''
    },
    [types.OPEN_PAGE] (state, payload = false) {
      if (!payload) return
      let exist = state.pageOpenList.some(element => {
        return element.name === payload.name
      })
      if (!exist) {
        state.pageOpenList.push(payload)
      }
    },
    [types.CLOSE_PAGE] (state, payload = false) {
      if (!payload) return
      let index = false
      state.pageOpenList.some((element, i) => {
        if (element.name === payload) {
          index = i
          return true
        }
        return false
      })

      if (index !== false) {
        // 如果关闭当前页面所在标签 切换至上一个标签
        if (state.pageOpenList[index].name === state.curPageName) {
          // 当前标签数量大于1
          if (state.pageOpenList.length > 1) {
            if (index !== 0) {
              // 自动切换至上一个标签
              state.curPageName = state.pageOpenList[index - 1].name
              router.push({name: state.pageOpenList[index - 1].name})
            } else {
              // 自动切换至下一个标签
              state.curPageName = state.pageOpenList[index + 1].name
              router.push({name: state.pageOpenList[index + 1].name})
            }
          } else {
            // 跳转至默认页面
            router.push(state.defaultPath)
          }
        }
        // 删除元素
        state.pageOpenList.splice(index, 1)
      }
    },
    [types.SET_INITIALIZATION] (state, payload = false) {
      state.initialization = payload
    },
    [types.SET_USERINFO] (state, payload = {}) {
      state.userInfo = payload
    },
    [types.SET_ZOOMRATIO](state, payload) {
      state.zoomRatio = payload
    },
    [types.SET_AUTOSTART](state, payload) {
      state.autoStart = payload
    },
    [types.SET_SCREENSHOT](state, payload) {
      state.screenshot = payload
    },
    [types.SET_BG_ANIMATE](state, payload) {
      state.bgAnimate = payload
    },
    [types.SET_DESKTOP_MSG](state, payload) {
      state.desktopMsg = payload
    },
    [types.SET_THEME](state, payload) {
      state.theme = payload
    },
  },
  actions: {
    // 获取密钥
    async getSecret ({commit}) {
      let result = await api.user.getSecret()
      commit(types.SET_SECRET, result)
    },
    // 获取用户信息
    async getUserInfo({commit}) {
      commit(types.SET_USERINFO, {
        id: 1000,
        role: [0, 1],
        name: '李教授',
        job: '呼吸内科教授',
        avatar: '/static/images/public/header_img.png',
        signature: '/static/images/public/qianming.png',
      })
    },
    // 添加路由
    async initRouters({state, commit}) {
      let routers = getDynamicRouters(appRouters)
      let menuList = routesToMenu(appRouters, true)

      // 添加重定向路由
      baseRouter.children = routers
      router.addRoutes([baseRouter, {
        path: '*',
        redirect: { name: 'startBoot' },
      }])
      commit(`configModule/${configTypes.SET_MENU_LIST}`, menuList, {root: true})
    },
    // 设置剪贴板内容
    /* eslint-disable no-empty-function */
    setClipboard (context, payload = {data: null, dataType: 'text'}) {},
    // 订阅扫描枪
    subscribeScanGun (context, payload = false) {},
    // 取消订阅扫描枪
    desubscribeScanGun (context, payload = false) {},
  },
  modules,
  plugins: [clipboardPlugin, i18nPlugin, scanningGunPlugin],
  strict: process.env.NODE_ENV === 'development',
})
// 路由转菜单
function routesToMenu (routers, oneLevel = false) {
  let menus = oneLevel ? {} : []

  routers.sort((a, b) => {
    return a.meta.weight - b.meta.weight
  })

  for (let route of routers) {
    // 判断是否有权限
    if (store.state.userInfo.role.indexOf(route.meta.role) !== -1) {
      // 判断是否一级菜单
      if (oneLevel) {
        menus[route.name] = {
          name: route.name,
          title: route.meta.title,
          icon: route.meta.icon,
        }
        if (route.children && route.children.length) {
          menus[route.name].children = routesToMenu(route.children)
        }
      } else {
        let length = menus.push({
          name: route.name,
          title: route.meta.title,
        })
        if (route.children && route.children.length) {
          menus[length - 1].children = routesToMenu(route.children)
        }
      }
    }
  }
  return menus
}

// 获取有权限的路由
function getDynamicRouters (routers, parentRouter = '') {
  let _routers = []

  routers.sort((a, b) => {
    return a.meta.weight - b.meta.weight
  })

  for (let route of routers) {
    // 判断是否有权限
    if (store.state.userInfo.role.indexOf(route.meta.role) !== -1) {
      // 判断有效路由
      if (route.component) {
        _routers.push({
          path: parentRouter + route.path,
          name: route.name,
          component: route.component,
        })
      } else {
        // 判断是否有子路由
        if (route.children && route.children.length) {
          _routers = _routers.concat(getDynamicRouters(route.children, `${parentRouter}${route.path}/`))
        }
      }
    }
  }

  return _routers
}

export default store
