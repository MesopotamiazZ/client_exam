// jiangyiling
// 2018.1.26
import * as types from './categoryManagementOccupationalDiseaseInductiveFactorTypes'
import api from '@/api'
const state = {
  occupHarmTypesList: {
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
  [types.SET_HEALTH_OCCUP_MODULE] (state, payload) {
    state.occupHarmTypesList = payload
  },
  requestPagingo (state, payload) {
    state.occupHarmTypesList = {
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
  async getManagementList ({commit}, data) {
    let result = await api.categoryManagementOccupationalDiseaseInductiveFactor.getList(data)
    commit(types.SET_HEALTH_OCCUP_MODULE, result)
  },
  async adNewItemFun({commit}, data) {
    console.log(data)
    await api.categoryManagementOccupationalDiseaseInductiveFactor.addNewItem(data)
  },
  async amendItemFun({commit}, data) {
    await api.categoryManagementOccupationalDiseaseInductiveFactor.amendItem(data)
  },
  async deletItemFun({commit}, data) {
    await api.categoryManagementOccupationalDiseaseInductiveFactor.deletItem(data)
  },
}
const getters = {
  occupHarmTypesList: (state) => {
    return state.occupHarmTypesList.items.map((item) => {
      return {
        id: item.id,
        sort: item.sort || 0,
        name: item.name || '',
        updated_at: item.updated_at,
        remark: item.remark || '',
        status: item.status || '',
        operater: item.operater ? item.operater : '',
      }
    })
  },
  pageInfo: (state) => {
    return state.occupHarmTypesList.meta
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

