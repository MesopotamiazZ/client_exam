import * as types from './samplingStopReasonTypes'
import api from '@/api'

const state = {
  samplingStopReasonList: {
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
  [types.SET_SAMPLE_MODULE] (state, payload) {
    state.samplingStopReasonList = payload
  },
  [types.SET_TOTAL](state, Payload) {
    state.total = Payload
  },
  [types.RESET] (state) {
    state.samplingStopReasonList = {
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
  async getSampleModule ({commit}, data) {
    let result = await api.samplingStopReason.stopReason(data)
    commit(types.SET_SAMPLE_MODULE, result)
  },
  async createAbandonReason ({commit}, data) {
    await api.samplingStopReason.addStopReason(data)
  },
  async deletAbandonReason ({commit}, data) {
    /* {ids: data}  */
    await api.samplingStopReason.deletReason(data)
  },
  async amendAbandonReason  ({commit}, data) {
    await api.samplingStopReason.amendReason(data)
  },
  async getTotal ({commit}, data) {
    let result = await api.samplingStopReason.stopReason() // 显示顺序
    commit(types.SET_TOTAL, result.meta.total)
  },
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

