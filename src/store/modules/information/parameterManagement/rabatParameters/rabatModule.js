/*
*
* @author 黄伟
* @date 2017/12/03
*/
import * as types from './rabatTypes'
import api from '@/api'

const state = {
    // 表格内容
  rabatList: {
  },
  leftList: {},
  searchList: {},
  // 修改
  amendlist: {},
  // 新增
  addLlist: {},
  // 删除
  deletelist: {},
  addleftList: {},
}

const mutations = {
  [types.GET_ADVICE_RABTLIST_TABLE](state, payload) {
    state.rabatList = payload
  },
  [types.GET_ADVICE_LEFTLIST_TABLE](state, payload) {
    state.leftList = payload
  },
  [types.GET_ADVICE_SEARCH_TABLE](state, payload) {
    state.searchList = payload
  },
  [types.GET_ADVICE_AMEND_TABLE](state, payload) {
    state.amendlist = payload
  },
  [types.GET_ADVICE_DELETE_TABLE](state, payload) {
    state.deletelist = payload
  },
  [types.GET_ADVICE_ADD_TABLE](state, payload) {
    state.addLlist = payload
  },
  [types.GET_ADDLEFTLIST_AMEND_TABLE](state, payload) {
    state.addleftList = payload
  },
}

const actions = {

  // 列表
  async [types.GET_ADVICE_RABTLIST_TABLE] ({commit}, p) {
    let result
    if (p) {
      result = await api.dust.projectGet(p)
    } else {
      result = await api.dust.projectGet()
    }
    commit(types.GET_ADVICE_RABTLIST_TABLE, result)
    return result
  },
  // 左边事件
  async [types.GET_ADVICE_LEFTLIST_TABLE] ({commit}, p) {
    let result = await api.dust.projectGetOne(p)
    commit(types.GET_ADVICE_LEFTLIST_TABLE, result)
    return result
  },
  // 搜索事件
  async [types.GET_ADVICE_LEFTLIST_TABLE] ({commit}, p) {
    let result = await api.dust.projectGetOne(p)
    commit(types.GET_ADVICE_LEFTLIST_TABLE, result)
    return result
  },
  // 修改事件
  async [types.GET_ADVICE_AMEND_TABLE] ({commit}, p) {
    let result = await api.dust.projectput(p)
    commit(types.GET_ADVICE_AMEND_TABLE, result)
    return result
  },
  // 删除事件
  async [types.GET_ADVICE_DELETE_TABLE] ({commit}, p) {
    let result = await api.dust.projectdel(p)
    commit(types.GET_ADVICE_DELETE_TABLE, result)
    return result
  },
  // 新增事件
  async [types.GET_ADVICE_ADD_TABLE] ({commit}, p) {
    let result = await api.dust.projectadd(p)
    commit(types.GET_ADVICE_ADD_TABLE, result)
    return result
  },
  // 左侧栏添加事件
  async [types.GET_ADDLEFTLIST_AMEND_TABLE] ({commit}, p) {
    let result = await api.dust.projectaddLeft(p)
    commit(types.GET_ADDLEFTLIST_AMEND_TABLE, result)
    return result
  },
}

const getters = {
  rabatListgrter: (state) => {
    return state.rabatList
  },
  leftListgeter: (state) => {
    return state.leftList
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

