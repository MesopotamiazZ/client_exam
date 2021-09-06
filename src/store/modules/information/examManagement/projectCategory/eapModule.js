/**
 * Title: 项目类别管理
 * Created wzd
 * Date: 2017/11/29
 * Update 刘洋
 * Date: 2017/12/18
 * Update 张祥
 * Date: 2018/01/18
 */

import * as types from './eapTypes'
import api from '@/api'

const state = {
  projectCategoryList: {
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
  [types.SET_PROJECTCATEGORY_TYPES] (state, payload) {
    state.projectCategoryList = payload
  },
  [types.SET_TOTAL](state, payload) {
    state.total = payload
  },
  [types.RESET] (state) {
    state.projectCategoryList = {
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
  // =====================projectCategory=============================
  async getProjectCategoryList ({commit}, data) {
    let result = await api.projectCategory.getProjectCategoryList(data)
    commit(types.SET_PROJECTCATEGORY_TYPES, result)
  },
  async getTotal ({commit}, data) {
    let result = await api.projectCategory.getProjectCategoryList()
    commit(types.SET_TOTAL, result.meta.total)
  },
  async addProjectCategoryList ({commit}, data) {
    await api.projectCategory.addProjectCategoryList(data)
  },
  async updateProjectCategoryList ({commit}, data) {
    await api.projectCategory.updateProjectCategoryList(data)
  },
  // 删除
  async delProjectCategoryList ({commit}, data) {
    await api.projectCategory.delProjectCategoryList(data)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
