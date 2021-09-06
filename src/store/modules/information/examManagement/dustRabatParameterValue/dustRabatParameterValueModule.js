/**
 * Created 张祥
 * Date: 2018/03/05
 * content:粉尘胸片参数管理
 */
import * as types from './dustRabatParameterValueTypes'
import api from '@/api'

const state = {
  parameterList: [],
  parameterValueList: {
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
  [types.SET_PARAMETER_LIST] (state, payload) {
    state.parameterList = payload
  },
  [types.SET_PARAMETER_VALUE_LIST] (state, payload) {
    state.parameterValueList = payload
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
    let result = await api.dustRabatParameterValue.getParameterList(data)
    commit(types.SET_PARAMETER_LIST, result.items)
  },
  async getParameterValueList ({commit}, data) {
    let result = await api.dustRabatParameterValue.getParameterValueList(data)
    commit(types.SET_PARAMETER_VALUE_LIST, result)
  },
  async getTotal ({commit}, data) {
    let result = await api.dustRabatParameterValue.getParameterValueList()
    commit(types.SET_TOTAL, result.meta.total)
  },
  async addParameterValue ({commit}, data) {
    await api.dustRabatParameterValue.addParameterValue(data)
  },
  async updateParameterValue ({commit}, data) {
    await api.dustRabatParameterValue.updateParameterValue(data)
  },
  // 删除
  async delParameterValue ({commit}, data) {
    await api.dustRabatParameterValue.delParameterValue(data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
