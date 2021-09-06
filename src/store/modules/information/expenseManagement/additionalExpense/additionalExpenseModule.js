import * as types from './additionalExpenseTypes'
import api from '@/api'
const state = {
  adminOfficeList: {
    meta: {
      current_page: 0,
      total: 1,
      per_page: 20,
    },
    items: []},
  additionalExpenseList: {
    meta: {
      current_page: 0,
      total: 1,
      per_page: 20,
    },
    items: [],
  },
  additionalTypesList: {
    meta: {
      current_page: 0,
      total: 1,
      per_page: 20,
    },
    items: [],
  },
}
const mutations = {
  [types.SET_ADDITION_LIST] (state, payload) {
    state.additionalExpenseList = payload
  },
  [types.SET_TYPE_LIST] (state, payload) {
    state.additionalTypesList = payload
  },
  [types.SET_ADMIN_OFFICE] (state, payload) {
    state.adminOfficeList = payload
  },
  requestPagingo (state, payload) {
    state.additionalExpenseList = {
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
  async getAdditionList ({commit}, data) {
    let result = await api.additionalExpense.surchargesList(data)
    commit(types.SET_ADDITION_LIST, result)
  },
  async adNewItemFun ({commit}, data) {
    await api.additionalExpense.addsurchargesList(data)
  },
  async getTypeList ({commit}, data) {
    let result = await api.additionalExpense.getTypesList(data)
    commit(types.SET_TYPE_LIST, result)
  },
  async amendItemFun ({commit}, data) {
    await api.additionalExpense.amendAdditionExpense(data)
  },
  async deletItemFun ({commit}, data) {
    await api.additionalExpense.deletAdditionExpense(data)
  },
  async getAdminOffice ({commit}, data) {
    let result = await api.additionalExpense.getAdministrative(data)
    commit(types.SET_ADMIN_OFFICE, result)
  },
}

const getters = {
  adminOfficeList: (state) => {
    return state.adminOfficeList.items
  },
  additionalTypesList: (state) => {
    return state.additionalTypesList.items
  },
  additionalExpenseList: (state) => {
    return state.additionalExpenseList.items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        /* deptname: item.dept ? item.dept.name ? item.dept.name : '' : '', */
        /* deptId: item.dept ? item.dept.id ? item.dept.id : '' : '', */
       /*  surcharge_typename: item.surcharge_type ? item.surcharge_type.name ? item.surcharge_type.name : '' : '', */
        /* surcharge_type_id: item.surcharge_type ? item.surcharge_type.id ? item.surcharge_type.id : '' : '', */
        charge_category_id: item.charge_category_id,
        remark: item.remark,
        sort: item.sort || 0,
        status: item.status,
        updated_at: item.updated_at,
        operater: item.operater,
        dept_id: item.dept_id,
        charge_category_name: !item.charge_category ? '' : item.charge_category.name,
        dep_name: item.dept ? item.dept.name : '',
        exclude_surcharges: item.exclude_surcharges || [],
      }
    })
  },
  pageInfo: (state) => {
    return state.additionalExpenseList.meta
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
