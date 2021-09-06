/**
 * Created jiangyiling
 * Date: 2018/2/2/
 * content:职业病分类和目录管理
 */
import * as types from './occupationalDiseaseClassificationDirectoryManagementTypes'
import api from '@/api'

const state = {
  occDiseaseList: {
    meta: {
      current_page: 0,
      total: 1,
      per_page: 20,
    },
    items: [],
  },
  occDiseaseStdList: {
    meta: {
      current_page: 0,
      total: 1,
      per_page: 20,
    },
    items: [],
  },
}
const mutations = {
  [types.SET_OCCDIS_LIST] (state, payload) {
    state.occDiseaseList = payload
  },
  [types.SET_OCCDIS_STD_LIST](state, payload) {
    state.occDiseaseStdList = payload
  },
  requestPagingo (state, payload) {
    state.occDiseaseList = {
      meta: {
        current_page: 0,
        total: 1,
        per_page: 20,
      },
      items: [],
    }
  },
}
const actions = {
  async getOccDisList ({commit}, data) {
    let result = await api.occupationalDiseaseClassificationDirectoryManagement.getList(data)
    commit(types.SET_OCCDIS_LIST, result)
  },
  async getOccDisStdList ({commit}, data) {
    let result = await api.occupationalDiseaseClassificationDirectoryManagement.getStdList(data)
    commit(types.SET_OCCDIS_STD_LIST, result)
  },
  async deletItemFun({commit}, data) {
    await api.occupationalDiseaseClassificationDirectoryManagement.deletItem(data)
  },
  async adNewItemFun({commit}, data) {
    await api.occupationalDiseaseClassificationDirectoryManagement.addNewItem(data)
  },
  async amendItemFun({commit}, data) {
    await api.occupationalDiseaseClassificationDirectoryManagement.amendItem(data)
  },
}
const getters = {
  occDiseaseList: (state) => {
    return state.occDiseaseList.items.map((item) => {
      return {
        id: item.id,
        sort: item.sort || 0,
        name: item.name || '',
        updated_at: item.updated_at,
        remark: item.remark || '',
        status: item.status || '',
        disease_type_id: item.disease_type_id || '',
        term_explain: item.term_explain || '',
        advise: item.advise || '/',
        operater: item.operater || null,
      }
    })
  },
  occDiseaseStdList: (state) => {
    return state.occDiseaseStdList.items
  },
  rightPageInfo: (state) => {
    return state.occDiseaseList.meta
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
