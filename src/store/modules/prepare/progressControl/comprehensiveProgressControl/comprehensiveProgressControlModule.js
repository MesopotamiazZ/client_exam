/**
 * Created 刘佳莉
 * Date: 2017/03/06/
 * content:体检进度综合管理 store
 */
import * as types from './comprehensiveProgressControlTypes'
import api from '@/api'
import dateFilter from '@/fifters/dateFilter.js'

const state = {
  // SamplingTypeList: [],
  orderManagement: {
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
    items: [],
  },
  switchComponent: '', // 切换个人主页页面
}

const mutations = {
  [types.SET_UNSETTLED] (state, payload) {
    state.orderManagement = payload
  },
}

const actions = {
  async getOrderManagement ({commit}, data) {
    let result = await api.comprehensiveProgressControl.getOrderManagement(data)
    commit(types.SET_UNSETTLED, result)
    return result
  },
}

const getters = {
  getOrderManagementData: (state) => {
    let val = JSON.parse(JSON.stringify(state.orderManagement.items))
    return val.map((data) => {
      if (data.registration) { // 登记人
        data.register_man = data.registration.register_man
      } else {
        data.register_man = ''
      }
      if (data.registration) { // 登记日期
        data.register_time = dateFilter(data.registration.register_time)
      } else {
        data.register_time = ''
      }
      if (data) { // 状态
        if (data.status === 1) {
          data.status = '已登记'
        } else if (data.status === 2) {
          data.status = '已完检'
        } else if (data.status === 3) {
          data.status = '已主检'
        } else if (data.status === 4) {
          data.status = '已审核'
        }
      } else {
        data.status = ''
      }
      if (data) { // 体检号
        data.pe_sn = data.pe_sn
      } else {
        data.pe_sn = ''
      }
      if (data.customer) { // 姓名
        data.name = data.customer.name
      } else {
        data.name = ''
      }
      if (data && data.customer) { // 性别
        if (data.customer.sex === 1) {
          data.sex = '男'
        } else if (data.customer.sex === 2) {
          data.sex = '女'
        }
      } else {
        data.sex = ''
      }
      if (data && data.customer) { // 年龄
        data.age = data.customer.age
      } else {
        data.age = ''
      }
      if (data) { // 待收金额
        data.collect_amount = data.collect_amount
      } else {
        data.collect_amount = ''
      }
      if (data && data.pe_detail) { // 体检类别
        if (data.pe_detail.pe_type === 1) {
          data.pe_type = '健康体检'
        } else if (data.pe_detail.pe_type === 2) {
          data.pe_type = '职业体检'
        }
      } else {
        data.pe_type = ''
      }
      if (data && data.pe_detail) { // 初/复检
        if (data.pe_detail.is_recheck === 0) {
          data.is_recheck = '初检'
        } else if (data.pe_detail.is_recheck === 1) {
          data.is_recheck = '复检'
        }
      } else {
        data.pe_type = ''
      }
      if (data) { // 来源
        if (data.order_source === 1) {
          data.order_source = '个人'
        } else if (data.order_source === 2) {
          data.order_source = '单位'
        }
      } else {
        data.pe_type = ''
      }
      if (data) { // 单位体检号
        data.unit_order_id = data.unit_order_id
      } else {
        data.unit_order_id = ''
      }
      if (data && data.customer) { // 单位名称
        data.unit_name = data.customer.unit_name
      } else {
        data.unit_name = ''
      }
      if (data && data.pe_detail) { // 预约渠道
        if (data.pe_detail.appt_way === 0) {
          data.appt_way = '前台'
        } else if (data.pe_detail.appt_way === 1) {
          data.appt_way = '支付宝'
        } else if (data.pe_detail.appt_way === 2) {
          data.appt_way = '微信'
        } else if (data.pe_detail.appt_way === 3) {
          data.appt_way = '主检'
        } else if (data.pe_detail.appt_way === 4) {
          data.appt_way = '官网'
        }
      } else {
        data.appt_way = ''
      }
      if (data && data.pe_detail) { // 体检套餐
        data.pe_package = data.pe_detail.pe_package
      } else {
        data.pe_package = ''
      }
      if (data && data.pe_detail && data.pe_detail.pe_type_detail) { // 危害因素
        let occup = data.pe_detail.pe_type_detail.occupHarms
        let occupAll = []
        for (let i in occup) {
          occupAll.push(occup[i].factor_name)
        }
        data.occupHarms = occupAll.toString()
      } else {
        data.occupHarms = ''
      }
      if (data && data.pe_detail && data.pe_detail.pe_type_detail) { // 总工龄
        data.total_work_age = data.pe_detail.pe_type_detail.total_work_age
      } else {
        data.total_work_age = ''
      }
      if (data && data.pe_detail && data.pe_detail.pe_type_detail) { // 接害工龄
        data.injury_age = data.pe_detail.pe_type_detail.injury_age
      } else {
        data.injury_age = ''
      }
      if (data && data.pe_detail && data.pe_detail.pe_type_detail) { // 工种
        data.occup_type_name = data.pe_detail.pe_type_detail.occup_type_name
      } else {
        data.occup_type_name = ''
      }
      if (data && data.customer) { // 联系电话
        data.mobile = data.customer.mobile
      } else {
        data.mobile = ''
      }
      if (data && data.registration) { // 完检人
        data.finish_check_man = data.registration.finish_check_man
      } else {
        data.finish_check_man = ''
      }
      if (data && data.registration && data.registration.finish_check_time) { // 完检日期
        data.finish_check_time = dateFilter(data.registration.finish_check_time)
      } else {
        data.finish_check_time = ''
      }
      if (data && data.registration && data.registration.main_check_time) { // 主检日期
        data.main_check_time = dateFilter(data.registration.main_check_time)
      } else {
        data.main_check_time = ''
      }
      if (data && data.registration && data.registration.audit_time) { // 审核日期
        data.audit_time = dateFilter(data.registration.audit_time)
      } else {
        data.audit_time = ''
      }
      if (data) { // 备注
        data.remark = data.remark
      } else {
        data.remark = null
      }
      if (data && data.customer) { // 个人VIP
        data.is_vip = data.customer.is_vip
      } else {
        data.is_vip = ''
      }
      return data
    })
  },
  pageInfo: (state) => {
    return state.orderManagement.meta
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

