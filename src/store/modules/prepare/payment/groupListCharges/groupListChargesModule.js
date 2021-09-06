
/**
* @author 覃凤
* @content 团体收费清单
*/
// import * as types from './groupListChargesTypes'
import api from '@/api'
const state = {
  initTableData: {
    items: [],
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
  },
}
const mutations = {
  // [types.SET_INITTABLE] (state, payload) {
  //   state.initTableData = payload
  // },
}
const actions = {
  async initTable ({commit}, data) {
    return await api.groupListCharges.initTable(data)
    // commit(types.SET_INITTABLE, result)
  },
}
const getters = {
  initTableData: (state) => {
    return state.initTableData.items.map((data) => {
      return data
    })
  },
  pageInfo: (state) => {
    return state.initTableData.meta
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
