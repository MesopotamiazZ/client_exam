/**
* @author liuyang
* @date 2018/2/27
* @content 放射工作证申请类型维护
*/
import * as types from './radioactiveApplicationMaintenanceType'
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
    let result = await api.radioactiveApplicationMaintenance.getDiseaseTypesFunc(data)
    commit(types.SET_DISEASETYPES_TYPES, result)
  },
  async addDiseaseTypesFunc ({commit}, data) {
    await api.radioactiveApplicationMaintenance.addDiseaseTypesFunc(data)
  },
  async updateDiseaseTypesFunc ({commit}, data) {
    await api.radioactiveApplicationMaintenance.updateDiseaseTypesFunc(data)
  },
  async delDiseaseTypesFunc ({commit}, data) {
    await api.radioactiveApplicationMaintenance.delDiseaseTypesFunc(data)
  },
  async getTotal ({commit}, data) {
    let result = await api.radioactiveApplicationMaintenance.getDiseaseTypesFunc()
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
