import * as types from './revProLisReqTypes'
import api from '@/api'

const state = {
  reexamItemsList: {
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
    items: [],
  },
  total: 0,
  groupItems: [],
}
const mutations = {
  [types.SET_REEXAM_ITEMS] (state, payload) {
    state.reexamItemsList = payload
  },
  [types.SET_TOTAL](state, payload) {
    state.total = payload
  },
  [types.RESET] (state) {
    state.reexamItemsList = {
      meta: {
        total: 0,
        current_page: 1,
        per_page: 20,
      },
      items: [],
    }
  },
  [types.SET_GROUP_ITEMS](state, payload) {
    state.groupItems = payload
  },
}

const actions = {
  async getReexamItemsList ({commit}, data) {
    let result = await api.revProLisReq.getReexamItems(data)
    commit(types.SET_REEXAM_ITEMS, result)
  },
  async getTotal ({commit}, data) {
    let result = await api.revProLisReq.getReexamItems()
    commit(types.SET_TOTAL, result.meta.total)
  },
  // 编辑复查项目
  async editReexamItem ({commit}, data) {
    await api.revProLisReq.editReexamItemItems(data)
  },
  // 新增复查
  async addReexamItems ({commit}, data) {
    await api.revProLisReq.addReexamItems(data)
  },
  async delReexamItems({commit}, data) {
    await api.revProLisReq.deletReexamItem(data)
  },
  async getGroupItems({commit}, data) {
    let result = await api.revProLisReq.getGroupItems()
    commit(types.SET_GROUP_ITEMS, result.items)
  },
}
const getters = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

