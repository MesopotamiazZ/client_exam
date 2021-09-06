/**
 * Created qf yhy wzd ljl
 * Date: 2017/01/03/
 * content:个人体检 store
 */
import * as types from './personalPhysicalExaminationTypes'
import api from '@/api'
import timeFilter from '@/fifters/timeFilter.js'
import idNumFilter from '@/fifters/idNumFilter.js'

const state = {
  personalList: {// 个人体检总表
    meta: {
      total: 0,
      page: 1,
      page_size: 20,
    },
    items: [],
  },
  onePersonalData: {}, // 单行数据
  oneCustomerData: {}, // 个人信息
  vipAccountData: {}, // vip账户变动记录表
  initEditData: {}, // 修改订单弹窗数据
  phyExaminProData: {}, // 修改体检项目数据
  takePhotoUrl: '',         // 照片地址
}

const mutations = {
  [types.SET_PERSONAL_LIST] (state, payload) { // 个人体检总表
    state.personalList = payload
  },
  [types.SET_ONE_PERSONAL] (state, payload) { // 单行数据
    // console.log(payload)
    state.onePersonalData = payload
  },
  [types.SET_ONE_CUSTOMER] (state, payload) { // 个人信息
    // console.log(payload)
    state.oneCustomerData = payload
  },
  [types.SET_VIP_ACCOUNT] (state, payload) { // vip账户变动记录表
    console.log(payload)
    state.vipAccountData = payload
  },
  [types.SET_AMENDORDER] (state, payload) {
    state.initEditData = payload
  },
  [types.SET_PHYEXAMINPRO] (state, payload) {
    state.phyExaminProData = payload
  },
  resetPageInfo (state, payload) {
    state.personalList = {
      meta: {
        total: 0,
        page: 1,
        page_size: 20,
      },
      items: [],
    }
  },
  // 设置拍摄地址
  setTakePhotoUrl(state, payload) {
    state.takePhotoUrl = payload
  },
}

const actions = {
  async getPersonalList ({commit}, data) { // 个人体检总表
    let result = await api.personalPhysicalExamination.getPersonalList(data)
    commit(types.SET_PERSONAL_LIST, result)
  },
  async getOnePersonal ({commit}, data) { // 获取单行数据
    // console.log('getOnePersonal', data)
    let result = await api.personalPhysicalExamination.getOnePersonal(data)
    commit(types.SET_ONE_PERSONAL, result)
  },
  async updateOnePersonal ({commit}, data) { // 修改单行数据
    let result = await api.personalPhysicalExamination.updateOnePersonal(data)
    console.log(result)
  },
  async getOneCustomer ({commit}, data) { // 个人信息
    return await api.personalPhysicalExamination.getOneCustomer(data)
    // commit(types.SET_ONE_CUSTOMER, result)
  },
  async getVipAccount ({commit}, data) { // vip账户变动记录表
    console.log(data)
    let result = await api.personalPhysicalExamination.getVipAccount(data)
    commit(types.SET_VIP_ACCOUNT, result)
  },
  async initAmendOrder ({commit}, data) { // 加载修改订单
    let result = await api.register.initAmendOrder(data)
    commit(types.SET_AMENDORDER, result)
  },
  async phyExaminPro ({commit}, data) { // 修改项目
    let result = await api.register.phyExaminPro(data)
    commit(types.SET_PHYEXAMINPRO, result)
  },
  async commitPhyExaminPro ({commit}, data) { // 提交修改订单
    return await api.register.commitPhyExaminPro(data.id, data.data)
  },
}
const getters = {
  personalListFilter: (state) => { // 过滤表格不需要的数据
    return state.personalList.items.map((type) => {
      return {
        id: type.id,
        pe_sn: type.pe_sn,
        name: type.customer && type.customer.realname ? type.customer.realname : '',
        sex: !type.customer || !type.customer.sex === 1 ? '' : type.customer.sex === 1 ? '男' : '女',
        age: type.customer && type.customer.age ? type.customer.age : '',
        is_recheck: type.is_recheck === 0 ? '初检' : '复检',
        unit_name: type.unit_appt && type.unit_appt.unit && type.unit_appt.unit.name ? type.unit_appt.unit.name : '',
        pe_type: type.pe_type === 2 ? '职业体检' : '健康体检',
        package_name: type.package_name,
        order: type.order,
        unit_id: type.unit_id,
        print_guide_list_time: type.print_guide_list_time,
        appt_time: type.unit_appt && type.unit_appt.appt_time ? type.unit_appt : '',
        is_customer_vip: type.customer && type.customer.is_vip ? type.customer.is_vip : '',
        is_unit_vip: type.unit_appt && type.unit_appt.unit && type.unit_appt.unit.is_vip ? type.unit_appt.unit.is_vip : '',
      }
    })
  },
  initEditData: (state) => {
    // 处理显示
    let newData = JSON.parse(JSON.stringify(state.initEditData))
    // console.log(newData)
    let initData = newData.customer
    if (parseInt(initData.sex) === 1) {
      initData.sex = '男'
    } else {
      initData.sex = '女'
    }
    initData.id_card = idNumFilter(initData.id_card) // 处理身份证
    if (initData.unit_id === null) {
      initData.unit_id = '个人'
    } else {
      initData.unit_id = '单位'
    }
     // 处理最后修改时间
    newData.updated_at = timeFilter(newData.updated_at)
     // 处理显示的已选列表
    let j = ''
    let newPeGroupItem = []
    for (j in newData.pe_group_item) {
      let data = {
        name: newData.pe_group_item[j].group_item_name,
        price: newData.pe_group_item[j].price,
        id: newData.pe_group_item[j].id,
      }
      newPeGroupItem.push(data)
    }
    newData.pe_group_item = newPeGroupItem
    return newData
  },
  phyExaminProData: (state) => {
    return state.phyExaminProData.items.map((data) => {
      return {
        name: data.name,
        price: data.price,
        id: data.id,
      }
    })
  },
  pageInfo: (state) => {
    return state.personalList.meta
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
