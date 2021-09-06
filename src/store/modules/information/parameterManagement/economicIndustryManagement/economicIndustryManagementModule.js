/*
* 基本信息-参数管理-经济行业管理
* @author xk
* @date 2017/02/07
*/
import * as types from './economicIndustryManagementTypes'
import api from '@/api'
let parentIds = []
let parentId = function(arr) {
  if (arr[0]) {
    parentIds.push({id: arr[0].id, code: arr[0].code})
    if (arr[0].children && arr[0].children.length) {
      parentId(arr[0].children)
    }
  }
}
let formatTreeDate = (data) => {
  data.map(item => {
    item.title = item.name
    item.code = item.code
    item.id = item.id
    item.children = []
    if (item.is_children) {
      item.loading = false
    }
    if (item.children && item.children.length) {
      formatTreeDate(item.children)
    }
  })
}
let formatAll = function(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].value = arr[i].id
    arr[i].label = arr[i].name
    if (arr[i].children && arr[i].children.length > 0) {
      formatAll(arr[i].children)
    }
  }
}
const state = {
  econIndustryLists: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  econIndustryAll: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  econIndustryTree: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  econIndustryTreeChild: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  econIndustryTreeParent: {
    items: [],
  },
  econIndustryStds: {
    items: [],
  },
}

const mutations = {
  [types.SET_ECONMIC_INDUSTRY_LISTS](state, payload) {
    state.econIndustryLists = payload
  },
  setSingleData(state, payload) {
    state.econIndustryLists.items = [payload]
  },
  [types.SET_ECONMIC_INDUSTRY_ALL](state, payload) {
    formatAll(payload.items)
    state.econIndustryAll = payload
  },
  [types.SET_ECONMIC_INDUSTRY_TREE](state, payload) {
    formatTreeDate(payload.items)
    state.econIndustryTree = payload
  },
  [types.SET_ECONMIC_INDUSTRY_TREE_CHILD](state, payload) {
    formatTreeDate(payload.items)
    state.econIndustryTreeChild = payload
  },
  [types.SET_ECONMIC_INDUSTRY_TREE_PARENT](state, payload) {
    // formatTreeDate(payload.items)
    state.econIndustryTreeParent = payload
  },
  [types.SET_ECONMIC_INDUSTRY_STDS](state, payload) {
    state.econIndustryStds = payload
  },
}
const actions = {
  async getEconIndustryLists({commit}, p) {
    let result = await api.economicIndustryManagement.getEconIndustryLists(p)
    commit(types.SET_ECONMIC_INDUSTRY_LISTS, result)
  },
  async getEconIndustryAll({commit}, p) {
    let result = await api.economicIndustryManagement.getEconIndustryLists(p)
    commit(types.SET_ECONMIC_INDUSTRY_ALL, result)
  },
  async getEconIndustryTree({commit}, p) {
    let result = await api.economicIndustryManagement.getEconIndustryLists(p)
    commit(types.SET_ECONMIC_INDUSTRY_TREE, result)
  },
  async getEconIndustryTreeChild({commit}, p) {
    let result = await api.economicIndustryManagement.getEconIndustryLists(p)
    commit(types.SET_ECONMIC_INDUSTRY_TREE_CHILD, result)
  },
  async getEconIndustryTreeParent({commit}, id) {
    let result = await api.economicIndustryManagement.getEconIndustryDetails(id)
    commit(types.SET_ECONMIC_INDUSTRY_TREE_PARENT, result)
  },
  async getEconIndustryStds({commit}, p) {
    let result = await api.economicIndustryManagement.getEconIndustryStds(p)
    commit(types.SET_ECONMIC_INDUSTRY_STDS, result)
  },
  async addEconIndustry({commit}, p) {
    await api.economicIndustryManagement.addEconIndustry(p)
    // commit(types.SET_ECONMIC_INDUSTRY_STDS, result)
  },
  async editEconIndustry({commit}, p) {
    await api.economicIndustryManagement.editEconIndustry(p)
    // commit(types.SET_ECONMIC_INDUSTRY_STDS, result)
  },
  async deleteEconIndustry({commit}, p) {
    await api.economicIndustryManagement.deleteEconIndustry(p)
    // commit(types.SET_ECONMIC_INDUSTRY_STDS, result)
  },

}
const getters = {
  doneParentIds: (state) => {
    parentIds = []
    parentId(state.econIndustryTreeParent.items)
    return parentIds
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
