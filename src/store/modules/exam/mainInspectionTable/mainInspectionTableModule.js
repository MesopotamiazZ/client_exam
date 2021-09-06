/*
 *
 * @author 黄伟
 * @date 2018/1/3
 */
import api from '@/api'

const state = {
}

const mutations = {
}

const actions = {
  async projectGet ({commit}, id) {
    console.log(id)
    let result = await api.mainInspectionTable.projectGet(id)
    return result
  },
  async projectPost ({commit}, key) {
    let result = await api.mainInspectionTable.projectPost(key)
    return result
  },
  async changAddPut ({commit}, id) {
    let result = await api.mainInspectionTable.changAddPut(id)
    return result
  },
  async projectGetBasic ({commit}, id) {
    let result = await api.mainInspectionTable.projectGetBasic(id)
    return result
  },
  async projectHasChosen ({commit}, id) {
    let result = await api.mainInspectionTable.projectHasChosen(id)
    return result
  },
  async projectHasChecked ({commit}, id) {
    let result = await api.mainInspectionTable.projectHasChecked(id)
    return result
  },
  async deptsGet ({commit}, id) {
    let result = await api.mainInspectionTable.deptsGet(id)
    return result
  },
  async waitingAndComplete ({commit}, doctorId) {
    let result = await api.mainInspectionTable.waitingAndComplete(doctorId)
    return result
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

