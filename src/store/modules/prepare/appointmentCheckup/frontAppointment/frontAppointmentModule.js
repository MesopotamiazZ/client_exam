/**
 * @author wzd
 * @date 2018/03/01
 * @content 前台预约主页面module
 */

import * as types from './frontAppointmentTypes'
import api from '@/api'

const state = {
  // 存储数据
  unitDepts: [], // 当前单位所有部门
  packageGroupItems: [], // 套餐内项目列表
  allExamProList: [], // 全部项目列表
  curSelectPackage: {}, // 当前选择套餐
  curSelectGroupItems: [], // 当前选择组合项目
  curSelectSurcharges: [], // 当前选择附加费
  customer: {}, // 客户信息
  orders: [], // 客户预约列表
  curOrder: {}, // 当前选中订单
  curPackage: {}, // 当前套餐
  curGroupItems: [], // 当前组合项目列表

  // 展示数据
  packagesList: {
    // 所有套餐列表
    meta: {},
    items: [],
  },
  chargeCategories: [], // 费用类别列表(内含附加费)
  checkGroupItems: [], // 检查项目
  checkoutGroupItems: [], // 检验项目
  functionalGroupItems: [], // 功能项目
  industrys: {}, // 从业行业列表
  occupTypes: {}, // 工种列表
  occupHealthExaminationTypes: {}, // 职业健康检查种类
  occupHarmFactors: {}, // 职业病危害因素列表
  selectOptions: {
    // 下拉选项
    pe_type: [
      // 体检类别
      {
        label: '健康体检',
        value: 1,
      },
      {
        label: '职业体检',
        value: 2,
      },
      {
        label: '健康证体检',
        value: 3,
      },
      {
        label: '放射工作人员职业健康检查',
        value: 4,
      },
    ],
    identity_type: [
      // 证件类型
      {
        label: '身份证号',
        value: 1,
      },
      {
        label: '居民户口簿',
        value: 2,
      },
      {
        label: '军官证',
        value: 3,
      },
      {
        label: '驾驶证',
        value: 4,
      },
      {
        label: '港澳居民来往内地通行证',
        value: 5,
      },
      {
        label: '台湾居民来往内地通行证',
        value: 6,
      },
      {
        label: '其他法定有效证件',
        value: 7,
      },
    ],
    sex: [
      // 性别
      {
        label: '男',
        value: 1,
      },
      {
        label: '女',
        value: 2,
      },
    ],
    additionalExpensePayers: [
      // 新增费用支付方式
      {
        label: '个人',
        value: 1,
      },
      {
        label: '单位',
        value: 2,
      },
    ],
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
    applicationType: [
      // 申请类型
      {
        label: '初次申请',
        value: 1,
      },
      {
        label: '变更',
        value: 2,
      },
      {
        label: '遗失补办',
        value: 3,
      },
      {
        label: '换发',
        value: 4,
      },
    ],
    healthyCheckType: [
      // 职业将康检查种类
      {
        label: '上岗前',
        value: 1,
      },
      {
        label: '在岗期间',
        value: 2,
      },
      {
        label: '离岗时',
        value: 3,
      },
      {
        label: '应急检查',
        value: 4,
      },
      {
        label: '医学随访',
        value: 5,
      },
    ],
    order_source: [
      {
        label: '个人',
        value: 1,
      },
      {
        label: '单位',
        value: 2,
      },
    ],
    target: [
      {
        label: '通用',
        value: 0,
      },
      {
        label: '单位',
        value: 1,
      },
      {
        label: '个人',
        value: 2,
      },
    ],
    item_class: [
      {
        label: '检查项目',
        value: 1,
      },
      {
        label: '检验项目',
        value: 2,
      },
      {
        label: '功能项目',
        value: 3,
      },
    ],
    is_recheck: [
      {
        label: '初检',
        value: 1,
      },
      {
        label: '复检',
        value: 0,
      },
    ],
  },
}
const mutations = {
  [types.SET_PACKAGES](state, payload = []) {
    state.packagesList = payload
  },
  [types.SET_CUR_SELECT_PACKAGE](state, payload = {}) {
    state.curSelectPackage = payload
  },
  [types.SET_CUR_SELECT_GROUP_ITEMS](state, payload = []) {
    state.curSelectGroupItems = payload
  },
  [types.SET_CUR_SELECT_SURCHARGES](state, payload = []) {
    state.curSelectSurcharges = payload
  },
  [types.SET_CUSTOMER](state, payload = {}) {
    state.customer = payload
  },
  [types.SET_ORDERS](state, payload = []) {
    state.orders = payload
  },
  [types.SET_CUR_ORDER](state, payload = {}) {
    state.curOrder = payload
  },
  [types.SET_CHECK_GROUP_ITEMS](state, payload = []) {
    state.checkGroupItems = payload
  },
  [types.SET_CHECKOUT_GROUP_ITEMS](state, payload = []) {
    state.checkoutGroupItems = payload
  },
  [types.SET_FUNCTIONAL_GROUP_ITEMS](state, payload = []) {
    state.functionalGroupItems = payload
  },
  [types.SET_CHARGE_CATEGORIES](state, payload = []) {
    state.chargeCategories = payload
  },
  [types.SET_INDUSTRYS](state, payload = []) {
    state.industrys = payload
  },
  [types.SET_OCCUP_TYPES](state, payload = []) {
    state.occupTypes = payload
  },
  [types.SET_OCCUP_HEALTH_EXAMINATION_TYPES](state, payload = []) {
    state.occupHealthExaminationTypes = payload
  },
  [types.SET_OCCUP_HARM_FACTORS](state, payload = []) {
    state.occupHarmFactors = payload
  },
  [types.SET_UNIT_DEPTS](state, payload = []) {
    state.unitDepts = payload
  },
}
const actions = {
  // 获取套餐
  async getPackages({ commit }, data) {
    let result = await api.frontAppointment.getPackages(data)
    commit(types.SET_PACKAGES, result)
    return result
  },

  // 获取组合项目
  async getGroupItems({ commit }, data) {
    let result = await api.frontAppointment.getGroupItems(data)
    return result
  },

  // 获取历史订单
  async getHistoricalOrders({ commit }, data) {
    let result = await api.frontAppointment.getHistoricalOrders(data)
    commit(types.SET_CUSTOMER, result.customer)
    commit(types.SET_ORDERS, result.history)
    return result
  },

  // 获取费用类别
  async getChargeCategories({ commit }, data) {
    let result = await api.frontAppointment.getChargeCategories(data)
    commit(types.SET_CHARGE_CATEGORIES, result)
  },

  // 获取工种展示数据
  async getIndustrys({ commit }, data) {
    let result = await api.frontAppointment.getIndustrys(data)
    commit(types.SET_INDUSTRYS, result)
  },
  // 获取从业行业展示数据
  async getOccupTypes({ commit }, data) {
    let result = await api.frontAppointment.getOccupTypes(data)
    commit(types.SET_OCCUP_TYPES, result)
  },
  // 获取职业病危害因素
  async getOccupHealthExaminationTypes({ commit }, data) {
    let result = await api.frontAppointment.getOccupHealthExaminationTypes(data)
    commit(types.SET_OCCUP_HEALTH_EXAMINATION_TYPES, result)
  },
  // 获取职业健康检查种类
  async getOccupHarmFactors({ commit }, data) {
    let result = await api.frontAppointment.getOccupHarmFactors(data)
    commit(types.SET_OCCUP_HARM_FACTORS, result)
  },
  // 获取单位下所有部门
  async getUnitDepts({ commit }, data) {
    let result = await api.frontAppointment.getUnitDepts(data)
    commit(types.SET_UNIT_DEPTS, result)
  },
}
const getters = {
  selectOptionDict: state => {
    // 选项字典
    let dict = {}
    for (let options in state.selectOptions) {
      dict[options] = state.selectOptions[options].reduce(
        (options, curOption) => {
          options[curOption.value] = curOption.label
          return options
        },
        {}
      )
    }
    return dict
  },
  packages: state => state.packagesList.items,
  chargeCategories: state => {
    if (state.chargeCategories.items) {
      return state.chargeCategories.items.filter(
        item => !!item.surcharges.length
      )
    } else {
      return []
    }
  },
  curSelectPackageId: state =>
    state.curOrder &&
    state.curOrder.pe_detail &&
    state.curOrder.pe_detail.package_id,
  industrys: state => {
    return state.industrys.items || []
  },
  occupTypes: state => {
    return state.occupTypes.items || []
  },
  occupHealthExaminationTypes: state => {
    return state.occupHealthExaminationTypes.items || []
  },
  occupHarmFactors: state => {
    return state.occupHarmFactors.items || []
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
