/*
* 收费类型管理
* @author 刘佳莉
* @date 2017/11/30
*/
import * as types from './chargeTypeTypes'
import api from '@/api'

const state = {
  chargeTypeList: {
    meta: {
      current_page: 0,
      total: 1,
      per_page: 20,
    },
    items: [],
  },
  // chargeTypeList: {
  //   meta: {},
  //   items: [],
  // },
}

const mutations = {
  async [types.SET_PRO_EXAM_TYPES] (state, payload) { // 合并职业体检类别数据
    state.chargeTypeList = payload
  },
  requestPagingo (state, payload) {
    state.chargeTypeList = {
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
  async getProExamTypes ({commit}, reqBody) { // 获取职业体检类别
    let result = await api.chargeType.getProExamTypes(reqBody)
    commit(types.SET_PRO_EXAM_TYPES, result)
  },
  async adNewItemFun({commit}, reqBody) { // 创建职业体检类别
    let result = await api.chargeType.createProExamType(reqBody)
    return result
  },
  async deletItemFun ({commit}, id) { // 删除职业体检类别
    let result = await api.chargeType.delProExamTypes(id)
    return result
  },
  async amendItemFun ({commit}, reqBody) { // 编辑职业体检类别
    // let result =
    await api.chargeType.editProExamType(reqBody)
    // console.log(result)
    // return result
  },
}

const getters = {
  chargeTypeList: (state) => { // 过滤表格不需要的数据
    return state.chargeTypeList.items.map((type) => {
      return {
        id: type.id || '',
        is_default: type.is_default || '',
        charge_type: type.charge_type || '',
        name: type.name || '',
        remark: type.remark || '',
        operater: type.operater || '',
        updated_at: type.updated_at || '',
        sort: type.sort || '',
        status: type.status || '',
      }
    })
  },
  pageInfo: (state) => {
    return state.chargeTypeList.meta
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
