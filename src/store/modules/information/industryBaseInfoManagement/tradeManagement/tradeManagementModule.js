/**
* Created 刘洋
* update xk
* Date: 2017/1/18
* Time: 10:00
* content: 工种管理
*/

import * as types from './tradeManagementTypes'
import api from '@/api'

const state = {
  occupTypesList: {
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
    items: [],
  },
  occupTypesAllList: {
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
    items: [],
  }, // 可通过XXX.meta.total获取总共的total值
  // 下拉列表
  occupTypesAll: [{}],
}

const mutations = {
  async [types.SET_OCCUPTYPESALL_TYPES](state, payload) { // 设置更新工种列表数据(显示顺序需要)
    state.occupTypesAllList = payload
  },
  [types.RESET](state) {
    state.occupTypesAllList = {
      meta: {
        total: 0,
        page: 1,
        per_page: 20,
      },
      items: [],
    }
  },
  [types.SET_OCCUP_ALL_TYPES](state, payload) {
    state.occupTypesAll = payload.items
  },
}
const actions = {
  async getOccupTypesList({ commit }, data) {
    let result = await api.tradeManagement.getOccupTypesList(data)
    console.log('data', result)
    commit(types.SET_OCCUPTYPESALL_TYPES, result)
  },
  async addOccupTypesList({ commit }, data) {
    await api.tradeManagement.addOccupTypesList(data)
  },
  async updateOccupTypesList({ commit }, data) {
    await api.tradeManagement.updateOccupTypesList(data)
  },
  async delOccupTypesList({ commit }, data) {
    await api.tradeManagement.delOccupTypesList(data)
  },
  async getOccupAllTypes({ commit }, data) {
    let result = await api.tradeManagement.getOccupNameTypesList(data)
    commit(types.SET_OCCUP_ALL_TYPES, result)
  },
}

const getters = {
  pageInfoOccup: (state) => {
    return state.occupTypesList.meta
  },
  occupTypesAllSimple: state => {
    let arr = []
    for (let item of state.occupTypesAll) {
      arr.push(item.name)
    }
    return arr
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

