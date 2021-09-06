/**
 * Created 张祥
 * Date: 2018/03/05
 * content:医学主检结论管理
 */
import * as types from './medicineTestConclusionsTypes'
import api from '@/api'

const state = {
  conclusionList: {
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
    items: [],
  },
  examCategoryList: [],
  total: 0,
}

const mutations = {
  [types.SET_CONCLUSION_LIST] (state, payload) {
    state.conclusionList = payload
  },
  [types.SET_EXAMCATEGORY_LIST] (state, payload) {
    state.examCategoryList = payload
  },
  [types.SET_TOTAL](state, payload) {
    state.total = payload
  },
  [types.RESET] (state) {
    state.conclusionList = {
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
  async getExamCategoryList ({commit}, data) {
    let result = await api.medicineTestConclusions.getExamCategoryList(data)
    commit(types.SET_EXAMCATEGORY_LIST, result.items)
  },
  async getConclusionList ({commit}, data) {
    let result = await api.medicineTestConclusions.getConclusionList(data)
    commit(types.SET_CONCLUSION_LIST, result)
  },
  async getTotal ({commit}, data) {
    let result = await api.medicineTestConclusions.getConclusionList()
    commit(types.SET_TOTAL, result.meta.total)
  },
  async addConclusion ({commit}, data) {
    await api.medicineTestConclusions.addConclusion(data)
  },
  async updateConclusion ({commit}, data) {
    await api.medicineTestConclusions.updateConclusion(data)
  },
  // 删除
  async delConclusion ({commit}, data) {
    await api.medicineTestConclusions.delConclusion(data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
