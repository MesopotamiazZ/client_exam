/**
 * 诊断规则管理
 * xk
 * 2018.2.9
 */
import * as types from './diagnosticRuleManagementType'
import api from '@/api'

const state = {
  diagnoseRules: {
    meta: {
      total: 9,
      current_page: 1,
      per_page: 20,
    },
  },
  itemTypes: {
    items: [],
  },
  items: {
    meta: {
      total: 9,
      current_page: 1,
      per_page: 20,
    },
    items: [],
  },
  groupItems: {
    meta: {
      total: 9,
      current_page: 1,
      per_page: 20,
    },
    items: [],
  },
  result: {
    meta: {
      total: 9,
      current_page: 1,
      per_page: 20,
    },
    items: [],
  },
}
const mutations = {
  [types.SET_ITEM_TYPES](state, payload) {
    state.itemTypes = payload
  },
  [types.SET_DIAGNOSE_RULES](state, payload) {
    state.diagnoseRules = payload
  },
  [types.SET_ITEMS](state, payload) {
    state.items = payload
  },
  [types.SET_GROUP_ITEMS](state, payload) {
    state.groupItems = payload
  },
  [types.SET_RESULT](state, payload) {
    state.result = payload
  },
}
const actions = {
  async getItemTypes({commit}, p) {
    let result = await api.diagnosticRuleManagement.getItemTypes(p)
    commit(types.SET_ITEM_TYPES, result)
  },
  async getDiagnoseRules({commit}, p) {
    let result = await api.diagnosticRuleManagement.getDiagnoseRules(p)
    commit(types.SET_DIAGNOSE_RULES, result)
  },

  async addDiagnoseRules({commit}, p) {
    await api.diagnosticRuleManagement.addDiagnoseRules(p)
  },
  async deleteDiagnoseRules({commit}, p) {
    await api.diagnosticRuleManagement.deleteDiagnoseRules(p)
  },
  async editDiagnoseRules({commit}, p) {
    console.log('store', p)
    await api.diagnosticRuleManagement.editDiagnoseRules(p)
  },

  async getItems({commit}, p) {
    let result = await api.diagnosticRuleManagement.getItems(p)
    commit(types.SET_ITEMS, result)
  },
  async getGroupItems({commit}, p) {
    let result = await api.diagnosticRuleManagement.getGroupItems(p)
    commit(types.SET_GROUP_ITEMS, result)
  },
  async getResult({commit}, p) {
    let result = await api.diagnosticRuleManagement.getResult(p)
    commit(types.SET_RESULT, result)
  },
}
const getters = {

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
