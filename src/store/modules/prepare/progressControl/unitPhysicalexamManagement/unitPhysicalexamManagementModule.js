/**
 * @author wzd jiangyiling
 * @time 2018/03/7/
 * 单位体检订单管理
 * @content
 */
import * as types from './unitPhysicalexamManagementTypes'
import api from '@/api'
const state = {
  unitPhyExamTypesList: {
    meta: {
      current_page: 0,
      total: 1,
      per_page: 20,
    },
    items: [],
  },
  switchComponent: {
    component: '',
    id: '',
  }, // 切换单位管理页面
  // 单位体检订单管理主页面
  unitPhyexamOrderTable: {
    items: [],
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
  },
  // 单位体检订单详情
  unitPhysicalexamOrderDetailTable: {
    items: [],
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
  },
  // 单位订单详情表格数据
  unitOrderDetail: {
    items: [],
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
  },
  // 单个单位所有订单(移入历史体检次数出现)
  unitAllOrder: {
    item: [],
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
  },
  selectOptions: {
    // 下拉选项
    settlementModes: [
      // 结算方式
      {
        label: '以预约人数计',
        value: 1,
      },
      {
        label: '以实检人数计',
        value: 2,
      },
    ],
  },
}
const mutations = {
  [types.SET_UNIT_PHY_EXAM_TYPE_LIST] (state, payload) {
    state.unitPhyExamTypesList = payload
  },
  setSwitchComponent(state, payload) {
    console.log(payload)
    state.switchComponent = payload
  },
  [types.SET_UNIT_ORDER_DETAIL] (state, payload) {
    state.unitOrderDetail = payload
  },
  [types.SET_UNIT_ALL_ORDER] (state, payload) {
    state.unitAllOrder = payload
  },
}
const actions = {
  async getUnitPhyExamTypeListFun({commit}, data) {
    let result = await api.unitPhysicalexamManagement.getUnitPhysicalexamManagement(data)
    commit(types.SET_UNIT_PHY_EXAM_TYPE_LIST, result)
  },
  async getUnitPhysicalexamOrderDetail ({commit}, data) {
    let result = await api.unitPhysicalexamManagement.getUnitPhysicalexamOrderDetail(data)
    commit(types.SET_UNIT_ORDER_DETAIL, result)
  },
  async getUnitAllOrder ({commit}, data) {
    let result = await api.unitPhysicalexamManagement.getUnitAllOrder(data)
    commit(types.SET_UNIT_ALL_ORDER, result)
  },
}
const getters = {
  unitPhyExamTypesLists: (state) => {
    return state.unitPhyExamTypesList.items.map((item) => {
      return {
        econ_industry_name: item.unit ? (item.unit.econ_industry ? item.unit.econ_industry : '/') : '/',
        economic_type_name: item.unit ? (item.unit.economic_type ? (item.unit.economic_type ? item.unit.economic_type.name : '') : '/') : '/',
        operater: item.operater ? item.operater : '/',
        unit_name: item.unit ? (item.unit.name ? item.unit.name : '/') : '/',
        id: item.id || '',
        unit_pe_status: item.unit_pe_status || 3,
        unit_sn: item.unit_sn || '',
        collect_amount: item.collect_amount || '',
        number: item.number || '',
        person_count: item.person_count || '',
        appt_time: item.appt_time || '',
        created_at: item.created_at || '',
        remarks: item.remarks || '',
        unit: item.unit || '',
      }
    })
  },
  pageInfo: (state) => {
    return state.unitPhyExamTypesList.meta
  },
  pageInfo1: (state) => {
    return state.unitOrderDetail.meta
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
