/**
 * Created 张祥
 * Date: 2018/03/13
 * content:账户管理
 */
import * as types from './accountManagementTypes'
import api from '@/api'

const state = {
  accountList: {
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
    items: [],
  },
  total: 0,
  staffList: [],
}

const mutations = {
  [types.SET_ACCOUNT_LIST] (state, payload) {
    state.accountList = payload
  },
  [types.SET_TOTAL](state, payload) {
    state.total = payload
  },
  [types.RESET] (state) {
    state.accountList = {
      meta: {
        total: 0,
        current_page: 1,
        per_page: 20,
      },
      items: [],
    }
  },
  [types.SET_STAFF_LIST] (state, payload) {
    state.staffList = payload
  },
}

const actions = {
  async getAccountList ({commit}, data) {
    let result = await api.accountManagement.getAccountList(data)
    commit(types.SET_ACCOUNT_LIST, result)
  },
  async getTotal ({commit}, data) {
    let result = await api.accountManagement.getAccountList()
    commit(types.SET_TOTAL, result.meta.total)
  },
  async addAccount ({commit}, data) {
    await api.accountManagement.addAccount(data)
  },
  async updateAccount ({commit}, data) {
    await api.accountManagement.updateAccount(data)
  },
  // 删除
  async delAccount ({commit}, data) {
    await api.accountManagement.delAccount(data)
  },
  async getStaffList ({commit}, data) {
    let result = await api.accountManagement.getStaffList(data)
    commit(types.SET_STAFF_LIST, result.items)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
