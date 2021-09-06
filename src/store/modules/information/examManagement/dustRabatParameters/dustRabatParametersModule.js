/**
 * Created 张祥
 * Date: 2018/03/05
 * content:粉尘胸片参数管理
 */
import * as types from './dustRabatParametersTypes'
import api from '@/api'

const state = {
  parameterList: {
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
    items: [],
  },
  total: 0,
}

const mutations = {
  [types.SET_PARARMETER_LIST] (state, payload) {
    state.parameterList = payload
  },
  [types.SET_TOTAL](state, payload) {
    state.total = payload
  },
  [types.RESET] (state) {
    state.parameterList = {
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
  async getParameterList ({commit}, data) {
    let result = await api.dustRabatParameters.getParameterList(data)
    commit(types.SET_PARARMETER_LIST, result)
  },
  async getTotal ({commit}, data) {
    let result = await api.dustRabatParameters.getParameterList()
    commit(types.SET_TOTAL, result.meta.total)
  },
  async addParameterList ({commit}, data) {
    await api.dustRabatParameters.addParameterList(data)
  },
  async updateParameterList ({commit}, data) {
    await api.dustRabatParameters.updateParameterList(data)
  },
  // 删除
  async delParameterList ({commit}, data) {
    await api.dustRabatParameters.delParameterList(data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
