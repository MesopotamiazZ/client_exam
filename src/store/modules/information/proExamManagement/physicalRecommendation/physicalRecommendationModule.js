/**
 * Created 刘洋
 * Date: 2017/12/1
 * content:职业体检建议
 */
import * as types from './physicalRecommendationTypes'
import api from '@/api'

const state = {
  physicalRecommendationlist: {
    meta: {
      total: 22, current_page: 1, per_page: 20,
    },
    items: [],
  }, // 所有套餐列表
  total: 0,
  physicalRecommendationType: {},
}
const mutations = {
  [types.SET_EXAMCOMBO_LIST](state, payload) {
    state.physicalRecommendationlist = payload
  },
  [types.SET_EXAMCOMBO_TYPE](state, payload) {
    state.physicalRecommendationType = payload
  },
  [types.SET_TOTAL](state, payload) {
    state.total = payload
  },
  [types.RESET](state, payload) {
    state.physicalRecommendationlist = {
      meta: {
        total: 22, current_page: 1, per_page: 20,
      },
      items: [],
    }
  },
}

const actions = {
  async getTemplateTable({commit}, data) {
    let result = await api.physicalRecommendation.getTemplateTable(data)
    commit(types.SET_EXAMCOMBO_LIST, result)
  },
  async editTemplate({commit}, data) {
    await api.physicalRecommendation.editTemplate(data)
  },
  async addTemplate({commit}, data) {
    await api.physicalRecommendation.addTemplate(data)
  },
  async delTemplate ({commit}, p) {
    await api.physicalRecommendation.delTemplate(p)
  },
  async TypeTemplateResult ({commit}, p) {
    let result = await api.physicalRecommendation.TypeTemplateResult(p)
    commit(types.SET_EXAMCOMBO_TYPE, result)
  },
  async getTotal({commit}, data) {
    let result = await api.physicalRecommendation.getTemplateTable({size: 0})
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

