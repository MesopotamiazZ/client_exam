/**
* @author 覃凤
* @content 个人结算
*/
import * as types from './personalPhysicalExaminationChargeTypes'
import api from '@/api'
// import timeFilter from '@/fifters/timeFilter.js'
const state = {
  initTableData: { // 个人结算表格
    items: [],
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
  },
  initSettlementData: { // 结算单表格
    items: [],
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
  },
  initRefundData: { // 退费单
    items: [],
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
  },
}

const mutations = {
  [types.SET_INITTABLE] (state, payload) { // 个人结算表格
    state.initTableData = payload
  },
  [types.SET_SETTLEMENT] (state, payload) { // 结算单表格
    state.initSettlementData = payload
  },
  [types.SET_REFUND] (state, payload) { // 退费单表格
    state.initRefundData = payload
  },
}

const actions = {
  async initTable ({commit}, data) { // 个人结算表格
    let result = await api.personalPhysicalExaminationCharge.initTable(data)
    commit(types.SET_INITTABLE, result)
  },
  async initSettlement ({commit}, data) { // 结算单表格
    let result = {
      items: [
        {
          self_pe_sn: 'BA2017020300023', // 个人结算单号
          self_time: '2017-09-08  8：00', // 结算时间
          receivable_amount: 233.00, // 待收金额
          self_zk: 0.8, // 折扣
          discount_amount: 10.00, // 减免金额
          self_ssMoney: 200.00, // 实收金额
          self_ssbl: 0.2, // 实收比例
          self_yh: 20.00, // 实收优惠
          self_pay_fs: '支付宝', // 支付方式
          self_name: '王思佳', // 结算人
          status: 1, // 状态
        },
        {
          self_pe_sn: 'BA2017020300223', // 个人结算单号
          self_time: '2017-03-08  12：00', // 结算时间
          receivable_amount: 232.00, // 待收金额
          self_zk: 0.8, // 折扣
          discount_amount: 10.00, // 减免金额
          self_ssMoney: 200.00, // 实收金额
          self_ssbl: 0.2, // 实收比例
          self_yh: 20.00, // 实收优惠
          self_pay_fs: '支付宝', // 支付方式
          self_name: '薛启佳', // 结算人
          status: 1, // 状态
        },
        {
          self_pe_sn: 'BA2017020300223', // 个人结算单号
          self_time: '2017-03-08  12：00', // 结算时间
          receivable_amount: 232.00, // 待收金额
          self_zk: 0.8, // 折扣
          discount_amount: 10.00, // 减免金额
          self_ssMoney: 200.00, // 实收金额
          self_ssbl: 0.2, // 实收比例
          self_yh: 20.00, // 实收优惠
          self_pay_fs: '支付宝', // 支付方式
          self_name: '薛启佳', // 结算人
          status: 1, // 状态
        },
      ],
      meta: {
        total: 3,
        current_page: 1,
        per_page: 20,
      },
    }
    // let result = await api.personalPhysicalExaminationCharge.initTable(data)
    commit(types.SET_SETTLEMENT, result)
  },
  async initRefund ({commit}, data) { // 结算单表格
    let result = {
      items: [{
        self_tfNumber: 'BA32939878834',
        self_time: '2017-09-08  8：00',
        self_chooseTfMoney: '233.00',
        self_tfBl: '0.84',
        self_tfsx: '5.00',
        self_sjtf: '5.00',
        self_tfbl: '0.16',
        self_tfPer: '王思佳',
        self_status: '已退费',
        self_zf: false,
      },
      {
        self_tfNumber: 'BA32939878834',
        self_time: '2017-09-08  8：00',
        self_chooseTfMoney: '233.00',
        self_tfBl: '0.84',
        self_tfsx: '5.00',
        self_sjtf: '5.00',
        self_tfbl: '0.16',
        self_tfPer: '李杰',
        self_status: '已退费',
        self_zf: false,
      },
      {
        self_tfNumber: 'BA32939878834',
        self_time: '2017-09-08  8：00',
        self_chooseTfMoney: '233.00',
        self_tfBl: '0.84',
        self_tfsx: '5.00',
        self_sjtf: '5.00',
        self_tfbl: '0.16',
        self_tfPer: '王思佳',
        self_status: '已退费',
        self_zf: false,
      },
      ],
      meta: {
        total: 3,
        current_page: 1,
        per_page: 20,
      },
    }
    commit(types.SET_REFUND, result)
  },
}
const getters = {
  initTableData: (state) => { // 个人结算表格
    return state.initTableData.items.map((data) => {
      // if (data.status === 1) { // 目前先做这一种
      //   data.statusShow = '未收费'
      // }
      // // data.createdAt=timeFilter(data.created_at), // 登记日期显示
      // data.createdAt = '2017-12-12' // 登记日期显示
      return data
    })
  },
  initSettlementData: (state) => { // 结算单表格
    return state.initSettlementData.items.map((data) => {
      // console.log(data)
      if (data.status === 1) { // 目前先做这一种
        data.statusShow = '未收费'
      }
      return data
    })
  },
  initRefundData: (state) => {
    return state.initRefundData.items.map((data) => {
      // if (data.status === 1) { // 目前先做这一种
      //   data.statusShow = '未收费'
      // }
      return data
    })
  },
  pageInfo: (state) => {
    // console.log(state.initTableData.meta)
    return state.initTableData.meta
  },
  settlePageInfo: (state) => {
    // console.log(state.initSettlementData.meta)
    return state.initSettlementData.meta
  },
  refundPageInfo: (state) => {
    return state.initRefundData.meta
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
