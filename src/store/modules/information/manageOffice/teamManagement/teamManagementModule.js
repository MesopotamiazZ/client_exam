/**
* @author liuyang
* @date 2018/3/5
* @content 排队机列表
*/
import * as types from './teamManagementTypes'
import api from '@/api'

const state = {
  diseaseTypesList: {
    meta: {
      total: 54, current_page: 1, per_page: 20,
    },
    items: [],
  },
  total: 0,
}

const mutations = {
  [types.SET_DISEASETYPES_TYPES] (state, payload) {
    state.diseaseTypesList = payload
  },
  [types.SET_TOTAL](state, payload) {
    state.total = payload
  },
  [types.RESET] (state) {
    state.diseaseTypesList = {
      meta: {
        total: 54, current_page: 1, per_page: 20,
      },
      items: [],
    }
  },
}
const actions = {
  async getDiseaseTypesFunc ({commit}, data) {
    let result = await api.teamManagement.getDiseaseTypesFunc(data)
    commit(types.SET_DISEASETYPES_TYPES, result)
  },
  async addDiseaseTypesFunc ({commit}, data) {
    await api.teamManagement.addDiseaseTypesFunc(data)
  },
  async updateDiseaseTypesFunc ({commit}, data) {
    await api.teamManagement.updateDiseaseTypesFunc(data)
  },
  async delDiseaseTypesFunc ({commit}, data) {
    await api.teamManagement.delDiseaseTypesFunc(data)
  },
  async getTotal ({commit}, data) {
    let result = await api.teamManagement.getDiseaseTypesFunc()
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
