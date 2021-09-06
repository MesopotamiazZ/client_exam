/**
 * Created wzd
 * Date: 2017/12/1/
 * Time: 13:02
 * content: 检查依据管理
 */

import * as types from './inspectionBasisManagementTypes'
import api from '@/api'

const state = {
  inspectionBasisList: {
    meta: {
      current_page: 0,
      total: 1,
      per_page: 20,
    },
    items: [],
  },
  inspectionBasisAllList: {},
}

const mutations = {
  async [types.SET_INSPECTIONBASIS_TYPES] (state, payload) {
    state.inspectionBasisList = payload
  },
  async [types.SET_INSPECTIONBASISALL_TYPES] (state, payload) {
    state.inspectionBasisAllList = payload
  },
}
const actions = {
  async [types.GET_INSPECTIONBASIS_TYPES] ({commit}, data) {
    let result = await api.inspectionBasisManagement.getInspectionBasisList(data)
    commit(types.SET_INSPECTIONBASIS_TYPES, result)
    // return result
  },
  async [types.GET_INSPECTIONBASISALL_TYPES] ({commit}, data) {
    let result = await api.inspectionBasisManagement.getInspectionBasisList(data)
    commit(types.SET_INSPECTIONBASISALL_TYPES, result)
    // return result
  },
  async [types.ADD_INSPECTIONBASIS_TYPES] ({commit}, data) {
    let result = await api.inspectionBasisManagement.addInspectionBasisList(data)
    console.log(result)
  },
  async [types.UP_INSPECTIONBASIS_TYPES] ({commit}, data) {
    let result = await api.inspectionBasisManagement.updateInspectionBasisList(data)
    console.log(result)
  },
  async [types.DEL_INSPECTIONBASIS_TYPES] ({commit}, data) {
    let result = await api.inspectionBasisManagement.delInspectionBasisList(data)
    console.log(result)
  },
}

const getters = {
  inspectionBasisList: (state) => {
    return state.inspectionBasisList.items.map((item) => {
      return {
        id: item.id,
        sort: item.sort || 0,
        name: item.name,
        updated_at: item.updated_at,
        status: item.status || '',
        remark: item.remark || '', // 备注
        operater: item.operater || '',
        /* lastUser: item.operater.realname ? item.operater.realname : '', */
        /* lastUser: item.operater.username, */
      }
    })
  },
  pageInfo: (state) => {
    return state.inspectionBasisList.meta
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
