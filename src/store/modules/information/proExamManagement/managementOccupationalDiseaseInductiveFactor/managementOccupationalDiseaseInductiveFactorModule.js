// jiangyiling
import * as types from './managementOccupationalDiseaseInductiveFactorTypes'
import api from '@/api'
const state = {
  occupHarmTypesList: {
    meta: {
      current_page: 0,
      total: 1,
      per_page: 20,
    },
    items: [],
  },
  occupRightTypesList: {
    meta: {
      current_page: 0,
      total: 1,
      per_page: 20,
    },
    items: [],
  },
}
const mutations = {
  [types.SET_OCCUP_HARM_TYPES] (state, payload) {
    /* console.log('jiangyiling')
    console.log(payload) */
    state.occupHarmTypesList = payload
  },
  [types.SET_OCCUP_RIGHT_TYPES](state, payload) {
    state.occupRightTypesList = payload
  },
  requestPagingo (state, payload) {
    state.occupRightTypesList = {
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
  async getOccupHarmTypesList({commit}, data) {
    let result = await api.managementOccupationalDiseaseInductiveFactor.getLeftList(data)
    commit(types.SET_OCCUP_HARM_TYPES, result)
  },
  async getOccupRightTypesList({commit}, data) {
    let result = await api.managementOccupationalDiseaseInductiveFactor.getRightList(data)
    commit(types.SET_OCCUP_RIGHT_TYPES, result)
  },
  async adNewItemFun({commit}, data) {
    await api.managementOccupationalDiseaseInductiveFactor.addNewItem(data)
  },
  async deletItemFun({commit}, data) {
    await api.managementOccupationalDiseaseInductiveFactor.deletItem(data)
  },
  async amendItemFun({commit}, data) {
    await api.managementOccupationalDiseaseInductiveFactor.amendItem(data)
  },
}
const getters = {
  occupHarmTypesList: (state) => {
    return state.occupHarmTypesList.items
  },
  occupRightTypesList: (state) => {
    return state.occupRightTypesList.items.map((item) => {
      return {
        id: item.id,
        sort: item.sort,
        name: item.name,
        updated_at: item.updated_at,
        remark: item.remark,
        status: item.status,
        /* realname: item.operater.realname ? item.operater.realname : '', */
        year: item.year,
        describe: item.describe || '/',
        affect: item.affect || '/',
        type_id: item.type_id || null,
        operater: item.operater || null,
      }
    })

    /* state.occupHealthExaminationTypesList.items.map((item) => {
      return {
        id: item.id,
        sort: item.sort || 0,
        name: item.name || '',
        updated_at: item.updated_at,
        remark: item.remark || '',
        status: item.status || '',
        realname: item.operater.realname ? item.operater.realname : '',
      } */
  },
  rightPageInfo: (state) => {
    return state.occupRightTypesList.meta
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
