import * as types from './groupListChargesTypes'
import api from '@/api'

const state = {
  groupListCharges: {
    meta: {
      total: 0,
      page: 1,
      page_size: 20,
    },
    items: [],
  },
}

const mutations = {
  [types.SET_GROUP_LIST_CHARGES] (state, payload) {
    state.groupListCharges = payload
  },
}

const actions = {
  async getGroupListCharges ({commit}, data) { // 获取团体结算统计
    let result = await api.groupListCharges.getGroupListCharges(data)
    commit(types.SET_GROUP_LIST_CHARGES, result)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  // getters,
}
