/**
 * Created 张祥
 * Date: 2018/01/19
 * content:体检类别管理
 */
import * as types from './examCategoryTypes'
import api from '@/api'

const state = {
  examCategoryList: {
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
    items: [],
  },
  total: 0,
}

const mutations = {
  [types.SET_EXAMCATEGORY_LIST] (state, payload) {
    state.examCategoryList = payload
  },
  [types.SET_TOTAL](state, payload) {
    state.total = payload
  },
  [types.RESET] (state) {
    state.examCategoryList = {
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
    let result = await api.examCategory.getExamCategoryList(data)
    commit(types.SET_EXAMCATEGORY_LIST, result)
  },
  async getTotal ({commit}, data) {
    let result = await api.examCategory.getExamCategoryList()
    commit(types.SET_TOTAL, result.meta.total)
  },
  async addExamCategoryList ({commit}, data) {
    await api.examCategory.addExamCategoryList(data)
  },
  async updateExamCategoryList ({commit}, data) {
    await api.examCategory.updateExamCategoryList(data)
  },
  // 删除
  async delExamCategoryList ({commit}, data) {
    await api.examCategory.delExamCategoryList(data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
