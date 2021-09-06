/**
 * Created 刘佳莉
 * Date: 2017/11/28/
 * content:照射源 store
 */
import * as types from './illuminationSourcesTypes'
import api from '@/api'

const state = {
  illuminationSourcesList: {
    meta:
    {total: 22, current_page: 1, per_page: 20},
    items: [],
  },
  total: 0,
}

const mutations = {
  [types.SET_SAMPLE_STATE] (state, payload) {
    state.illuminationSourcesList = payload
  },
  [types.SET_TOTAL](state, payload) {
    state.total = payload
  },
  [types.RESET] (state) {
    state.illuminationSourcesList = {
      meta:
      {total: 22, current_page: 1, per_page: 20},
      items: [],
    }
  },
}
const actions = {
  async getSamplingState ({commit}, data) {
    let result = await api.illuminationSources.state(data)
    commit(types.SET_SAMPLE_STATE, result)
  },
  async createSamplingState ({commit}, data) {
    await api.illuminationSources.addState(data)
  },
  async deleteSampleState ({commit}, data) {
    await api.illuminationSources.deleteState(data)
  },
  async writeSampleState  ({commit}, data) {
    await api.illuminationSources.writeState(data)
  },
  async getTotal ({commit}, data) {
    let result = await api.illuminationSources.state()
    commit(types.SET_TOTAL, result.meta.total)
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

