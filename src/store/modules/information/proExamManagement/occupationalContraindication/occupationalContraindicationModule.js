// jiangyiling
// 2018.1.26
import * as types from './occupationalContraindicationTypes'
import api from '@/api'
const state = {
  occupationalContraindicationList: {
    meta: {
      current_page: 0,
      total: 1,
      per_page: 20,
    },
    items: [],
  },
}
const mutations = {
  [types.SET_HEALTH_OCCUP_MODULE] (state, payload) {
    state.occupationalContraindicationList = payload
  },
  requestPagingo (state, payload) {
    state.occupationalContraindicationList = {
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
  async getManagementList ({commit}, data) {
    let result = await api.occupationalContraindication.getList(data)
    commit(types.SET_HEALTH_OCCUP_MODULE, result)
  },
  async adNewItemFun({commit}, data) {
    await api.occupationalContraindication.addNewItem(data)
  },
  async amendItemFun({commit}, data) {
    await api.occupationalContraindication.amendItem(data)
  },
  async deletItemFun({commit}, data) {
    await api.occupationalContraindication.deletItem(data)
  },
}
const getters = {
  occupationalContraindicationList: (state) => {
    return state.occupationalContraindicationList.items.map((item) => {
      return {
        id: item.id,
        sort: item.sort || 0,
        name: item.name || '',
        updated_at: item.updated_at,
        remark: item.remark || '',
        status: item.status || '',
        /* realname: item.operater.realname ? item.operater.realname : '', */
        term_explain: item.term_explain || '/',
        advise: item.advise || '/',
        operater: item.operater || '',
      }
    })
  },
  pageInfo: (state) => {
    return state.occupationalContraindicationList.meta
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

