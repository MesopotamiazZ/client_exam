import * as types from './configTypes'
import fs from 'fs'
import path from 'path'
import gui from 'nw.gui'

/* eslint-disable no-empty-function */
const state = {
  menuList: {},
  appName: '体检系统',
  version: '',
  themes: [],
  defaultAvatarPath: '/static/images/public/default_avatar.svg', // 默认头像地址
}

const mutations = {
  [types.SET_MENU_LIST] (state, payload = []) {
    state.menuList = payload
  },
  [types.ADD_THEME] (state, payload = false) {
    state.themes.push(payload)
  },
  [types.SET_VERSION] (state, payload = '') {
    state.version = payload
  },
}

const actions = {
  initConfig ({commit}) {
    // 加载主题
    try {
      let themeDirPath = path.join('./', 'static', 'theme')
      let themes = fs.readdirSync(themeDirPath)
      for (let i in themes) {
        let filePath = path.join(themeDirPath, themes[i])
        try {
          let data = fs.readFileSync(filePath).toString('utf-8')
          if (data[0] === 0xEF && data[1] === 0xBB && data[2] === 0xBF) {
            data = data.slice(3)
          }
          commit(types.ADD_THEME, JSON.parse(data))
        } catch (error) {
          console.error(`加载主题 ${filePath} 失败`, error)
        }
      }
    } catch (error) {
      console.error('主题文件加载失败', error)
    }
    // 加载当前版本
    try {
      let file = path.join('./', 'static', 'config.json')
      if (fs.existsSync(file)) {
        let data = fs.readFileSync(file).toString('utf-8')
        if (data[0] === 0xEF && data[1] === 0xBB && data[2] === 0xBF) {
          data = data.slice(3)
        }
        commit(types.SET_VERSION, (JSON.parse(data)).version)
      }
    } catch (error) {
      console.error(`加载配置文件失败`, error)
    }
  },
  /**
   * 获取用户配置信息
   * @author 张澈
   * @param userId
   */
  getConfig ({commit}, userId) {
    // let strData = window.localStorage.getItem(`userConfig_${userId}`)
    // if (strData) {
    //   try {
    //     return JSON.parse(strData) || {}
    //   } catch (e) {
    //     return {}
    //   }
    // } else {
    //   return {}
    // }
    try {
      let data = fs.readFileSync(gui.App.dataPath + `/healthExam/${userId}`, 'utf8')
      return JSON.parse(data.toString()) || {}
    } catch (error) {
      return {}
    }
  },
  /**
   * 保存用户配置信息
   * @author 张澈
   */
  saveConfig ({commit}, option) {
    let userId = option.userId
    let data = option.data
    let originData = option.originData
    originData = originData || actions.getConfig({commit}, userId) || {}
    if (!originData) {
      return
    }
    Object.keys(data).forEach((key) => {
      if (originData[key] instanceof Object && data[key] instanceof Object) {
        actions.saveConfig({commit}, {data: data[key], originData: originData[key]})
      } else {
        originData[key] = data[key]
      }
    })
    return originData
    // if (userId) {
    //   window.localStorage.setItem(`userConfig_${userId}`, JSON.stringify(originData))
    //   return originData
    // }
  },
  /**
   * 将用户配置信息保存到文件，同时也保存到localStorage
   * @author 张澈
   */
  saveConfig_fs ({commit}, option) {
    let d = actions.saveConfig({commit}, option)
    // fs.writeFile(`static/userData/${option.userId}`, JSON.stringify(d), {encoding: 'utf-8'}, function (err) {
    //   if (err) {
    //     console.error(err)
    //   }
    // })
    let baseUrl = gui.App.dataPath
    if (!fs.existsSync(baseUrl + '/healthExam')) {
      fs.mkdirSync(baseUrl + '/healthExam')
    }
    fs.writeFile(baseUrl + `/healthExam/${option.userId}`, JSON.stringify(d), {encoding: 'utf-8'}, function (err) {
      if (err) {
        console.error(err)
      }
    })
  },
}

const getters = {
  curMenuList: (state, getters, rootState) => {
    return state.menuList[rootState.curMainMenu].children || []
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
