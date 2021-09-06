// jiangyiling
// 2018.1.26
import * as types from './managementOccupationalHealthExaminationTypes'
import api from '@/api'
const state = {
  occupHealthExaminationTypesList: {
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
    items: [],
  },
  itemNameList: {
    items: [],
  },
}
const mutations = {
  [types.SET_HEALTH_OCCUP_MODULE] (state, payload) {
    state.occupHealthExaminationTypesList = payload
  },
  requestPagingo (state, payload) {
    state.occupHealthExaminationTypesList = {
      meta: {
        total: 0,
        current_page: 1,
        per_page: 20,
      },
      items: [],
    }
  },
  [types.SET_NAME_LIST](state, payload) {
    state.itemNameList = payload
  },
}
const actions = {
  async getManagementList ({commit}, data) {
    let result = await api.managementOccupationalHealthExamination.getList(data)
    commit(types.SET_HEALTH_OCCUP_MODULE, result)
  },
  async adNewItemFun({commit}, data) {
    await api.managementOccupationalHealthExamination.addNewItem(data)
  },
  async amendItemFun({commit}, data) {
    await api.managementOccupationalHealthExamination.amendItem(data)
  },
  async deletItemFun({commit}, data) {
    await api.managementOccupationalHealthExamination.deletItem(data)
  },
  async getNameList({commit}, data) {
    let result = await api.managementOccupationalHealthExamination.getNameList(data)
    commit(types.SET_NAME_LIST, result)
  },
}
const getters = {
  occupHealthExaminationTypesList: (state) => {
    return state.occupHealthExaminationTypesList.items.map((item) => {
      return {
        id: item.id,
        sort: item.sort || 0,
        name: item.name || '',
        updated_at: item.updated_at,
        remark: item.remark || '',
        status: item.status || '',
        operater: item.operater || '',
      }
    })
  },
  pageInfo: (state) => {
    return state.occupHealthExaminationTypesList.meta
  },
  itemNameList: (state) => {
    return state.itemNameList.items
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

