/**
 * Created 刘佳莉
 * Date: 2017/03/06/
 * content:预约管理 store
 */
import * as types from './managementAppointmentsTypes'
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
}

const mutations = {
  [types.SET_UNSETTLED] (state, payload) {
    state.orderManagement = payload
  },
}

const actions = {
  async getOrderManagement ({commit}, data) {
    let result = await api.managementAppointments.getOrderManagement(data)
    commit(types.SET_UNSETTLED, result)
    return result
  },
}

const getters = {
  getOrderManagementData: (state) => {
    let val = JSON.parse(JSON.stringify(state.orderManagement.items))
    return val.map((data) => {
      data.entering_time = dateFilter(data.entering_time)
      if (data.personal_order) {
        data.pe_sn = data.personal_order.pe_sn
      } else {
        data.pe_sn = ''
      }
      if (data.personal_order && data.personal_order.customer) {
        data.name = data.personal_order.customer.name
      } else {
        data.name = ''
      }
      if (data.personal_order && data.personal_order.customer) {
        if (data.personal_order.customer.sex === 1) {
          data.sex = '男'
        } else if (data.personal_order.customer.sex === 2) {
          data.sex = '女'
        }
        data.name = data.personal_order.customer.name
      } else {
        data.name = ''
      }
      if (data.personal_order && data.personal_order.customer) {
        data.age = data.personal_order.customer.age
      } else {
        data.age = ''
      }
      if (data.personal_order && data.personal_order.pe_detail) {
        if (data.personal_order.pe_detail.pe_type === 1) {
          data.pe_type = '健康体检'
        } else if (data.personal_order.pe_detail.pe_type === 2) {
          data.pe_type = '职业体检'
        }
      } else {
        data.pe_type = ''
      }
      if (data.personal_order && data.personal_order.pe_detail) {
        if (data.personal_order.pe_detail.is_recheck === 0) {
          data.is_recheck = '初检'
        } else if (data.personal_order.pe_detail.is_recheck === 1) {
          data.is_recheck = '复检'
        }
      } else {
        data.pe_type = ''
      }
      if (data.personal_order) {
        if (data.personal_order.order_source === 1) {
          data.order_source = '个人'
        } else if (data.personal_order.order_source === 2) {
          data.order_source = '单位'
        }
      } else {
        data.pe_type = ''
      }
      if (data.personal_order && data.personal_order.customer) {
        data.unit_name = data.personal_order.customer.unit_name
      } else {
        data.unit_name = ''
      }
      if (data.personal_order) {
        data.unit_order_id = data.personal_order.unit_order_id
      } else {
        data.unit_order_id = ''
      }
      if (data.personal_order && data.personal_order.pe_detail) {
        if (data.personal_order.pe_detail.appt_way === 0) {
          data.appt_way = '前台'
        } else if (data.personal_order.pe_detail.appt_way === 1) {
          data.appt_way = '支付宝'
        } else if (data.personal_order.pe_detail.appt_way === 2) {
          data.appt_way = '微信'
        } else if (data.personal_order.pe_detail.appt_way === 3) {
          data.appt_way = '主检'
        } else if (data.personal_order.pe_detail.appt_way === 4) {
          data.appt_way = '官网'
        }
      } else {
        data.appt_way = ''
      }
      data.appt_time = dateFilter(data.appt_time)
      if (data.personal_order) {
        data.collect_amount = data.personal_order.collect_amount
      } else {
        data.collect_amount = ''
      }
      if (data.personal_order && data.personal_order.pe_detail) {
        data.pe_package = data.personal_order.pe_detail.pe_package
      } else {
        data.collect_amount = ''
      }
      if (data.personal_order && data.personal_order.pe_detail && data.personal_order.pe_detail.pe_type_detail) {
        let occup = data.personal_order.pe_detail.pe_type_detail.occupHarms
        let occupAll = []
        for (let i in occup) {
          occupAll.push(occup[i].factor_name)
        }
        data.occupHarms = occupAll.toString()
      } else {
        data.occupHarms = ''
      }
      if (data.personal_order && data.personal_order.pe_detail && data.personal_order.pe_detail.pe_type_detail) {
        data.total_work_age = data.personal_order.pe_detail.pe_type_detail.total_work_age
      } else {
        data.total_work_age = ''
      }
      if (data.personal_order && data.personal_order.pe_detail && data.personal_order.pe_detail.pe_type_detail) {
        data.injury_age = data.personal_order.pe_detail.pe_type_detail.injury_age
      } else {
        data.injury_age = ''
      }
      if (data.personal_order && data.personal_order.pe_detail && data.personal_order.pe_detail.pe_type_detail) {
        data.occup_type_name = data.personal_order.pe_detail.pe_type_detail.occup_type_name
      } else {
        data.occup_type_name = ''
      }
      if (data.personal_order && data.personal_order.customer) {
        data.mobile = data.personal_order.customer.mobile
      } else {
        data.mobile = ''
      }
      if (data.personal_order) {
        data.remark = data.personal_order.remark
      } else {
        data.remark = null
      }
      if (data.personal_order && data.personal_order.customer) {
        data.is_vip = data.personal_order.customer.is_vip
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

