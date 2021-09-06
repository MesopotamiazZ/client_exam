
/**
* Created 刘洋
* Date: 2018/1/22
* Time: 15:16
* content: 行业管理
*/

import * as types from './tradeListTypes'
import api from '@/api'

const state = {
  tradeManagementList: {
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
    items: [],
  },
  tradeManagementList1: {
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
    items: [],
  }, // 供左筛右左边行业列表使用
  tradeManagementAllList: {}, // 可通过XXX.meta.total获取总共的total值
  total: 0,
}

const mutations = {
  async [types.SET_TRADEMANAGEMENT_TYPES] (state, payload) { // 设置更新行业列表数据
    console.log('get数据')
    state.tradeManagementList = payload
  },
  async [types.SET_TOTAL] (state, payload) { // 设置更新行业列表数据
    state.total = payload
  },
  [types.RESET_PAGE](state, payload) {
    state.tradeManagementList = {
      meta: {
        total: 0,
        page: 1,
        per_page: 20,
      },
      items: [],
    }
  },
}
const actions = {
  async getTradeManagementList ({commit}, data) {
    let result = await api.tradeManagement.getTradeManagementList(data)
    commit(types.SET_TRADEMANAGEMENT_TYPES, result)
  },
  async getTradeManagementListAll ({commit}, data) {
    await api.tradeManagement.getTradeManagementList(data)
  },
  async addTradeManagementList ({commit}, data) {
    await api.tradeManagement.addTradeManagementList(data)
  },
  async updateTradeManagementList ({commit}, data) {
    await api.tradeManagement.updateTradeManagementList(data)
  },
  async delTradeManagementList ({commit}, data) {
    await api.tradeManagement.delTradeManagementList(data)
  },
  async setTotal ({commit}, data) {
    let result = await api.tradeManagement.getTradeManagementList()
    commit(types.SET_TOTAL, result.meta.total)
  },
}

const getters = {
  pageInfo: (state) => {
    return state.tradeManagementList.meta
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

