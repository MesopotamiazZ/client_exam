// 刘洋
// 2017/12/1 21:37
import * as types from './interrogationManagementTypes'
import api from '@/api'
const state = {
  industrialTypeList: {
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
    items: [],
  },
  total: 0,
  // addindustrialTypeList: {},
  // upIndustrialState: {},
}
const mutations = {
  [types.SET_INDUSTRIAL_TYPES] (state, Payload) {
    state.industrialTypeList = Payload
  },
  [types.SET_TOTAL](state, Payload) {
    state.total = Payload
  },
  [types.RESET] (state) {
    state.industrialTypeList = {
      meta: {
        total: 0,
        current_page: 1,
        per_page: 20,
      },
      items: [],
    }
  },
}

const actions = {
  async getIndustrialList ({commit}, data) {
    let result = await api.interrogationManagement.getIndustrialList(data)
    commit(types.SET_INDUSTRIAL_TYPES, result)// 获取列表
  },
  async addIndustrialState({commit}, data) {
    await api.interrogationManagement.addIndustrialState(data)// 添加
  },
  async updateIndustrialState ({commit}, data) {
    await api.interrogationManagement.updateIndustrialState(data)// 修改
  },
  async deleteIndustrialState ({commit}, data) {
    await api.interrogationManagement.deleteIndustrialState(data) // 删除
  },
  async getTotal ({commit}, data) {
    let result = await api.interrogationManagement.getIndustrialList(data) // 显示顺序
    commit(types.SET_TOTAL, result.meta.total)
  },
}

const getters = {
  pageInfo: (state) => {
    return state.proExamTypes.meta
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
