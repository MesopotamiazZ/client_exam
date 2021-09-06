// 职务管理 xk
import * as types from './profesManageTypes'
import api from '@/api'

const state = {
  porfes: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  innerD: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
}
const mutations = {
  [types.SET_INNER](state, payload) {
    state.innerD = payload
  },
  [types.SET_PORFES](state, payload) {
    state.porfes = payload
  },
}
const actions = {
  async getPorfes({commit}, p) {
    let result = await api.profesManage.getPorfesAs(p)
    commit(types.SET_PORFES, result)
  },
  async getInnerD({commit}, p) {
    let result = await api.profesManage.getInnerDuties(p)
    commit(types.SET_INNER, result)
  },

  async addInnerD({commit}, p) {
    await api.profesManage.addInnerDuties(p)
  },
  async editInnerD({commit}, p) {
    await api.profesManage.editInnerDuties(p)
  },
  async deleteInnerD({commit}, p) {
    await api.profesManage.deleteInnerDuties(p)
  },

  async addPorfes({commit}, p) {
    await api.profesManage.addPorfesAs(p)
  },
  async editPorfes({commit}, p) {
    await api.profesManage.editPorfesAs(p)
  },
  async deletePorfes({commit}, p) {
    await api.profesManage.deletePorfesAs(p)
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

