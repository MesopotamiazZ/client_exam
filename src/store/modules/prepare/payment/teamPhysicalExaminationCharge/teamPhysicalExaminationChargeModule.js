/**
 * author      : yhy
 * 单位结算
 * cteate      : 2018/03/01
 * description : 单位结算store
 */
import * as types from './teamPhysicalExaminationChargeTypes'
import api from '@/api'
const state = {
  // 单位结算表格
  unitAcountTable: {
    items: [],
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
  },
  // 结算单表格
  acountaSingleTable: {
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
    state.unitAcountTable = payload
  },
  // setUnitAcountTable(state, payload) {
  //   state.unitAcountTable = payload
  // },
  setAcountaSingleTable(state, payload) {
    state.acountaSingleTable = payload
  },
}

const actions = {
  async initTable({ commit }, data) {
    // let result = {
    //   items: [
    //     {
    //       unitNumber: '1709250001', // 单位体检号
    //       unitName: '成都小米科技', // 单位名称
    //       clearingForm: '以预约人数计', // 结算方式
    //       surpluMoney: '2000.00', // 账户余额（元）
    //       sumMoney: '1000.00', // 订单总金额（元）
    //       personSumMoney: '8000.00', // 个人总金额（元）
    //       unitSumMoney: '3000.00', // 单位总金额（元）
    //       unitAddMoney: '2000.00', // 单位附加费（元）
    //       alreadyMoney: '888.00', // 已收金额（元）
    //       waitMoney: '45.00', // 待收金额（元）
    //       recavieMoney: '666.00', // 应收金额（元）
    //       registerDate: '2017-12-12', // 登记日期
    //       remark: '大公司订单', // 备注
    //     },
    //   ],
    //   meta: {
    //     total: 20,
    //     current_page: 1,
    //     per_page: 20,
    //   },
    // }
    let result = await api.teamPhysicalExaminationCharge.initTable(data)
    commit(types.SET_INITTABLE, result)
  },
  getAcountaSingleTable({ commit }) {
    let result = {
      items: [
        {
          unitAcountNumber: 'BA2017020300023', // 单位结算号
          acountTime: '2017-09-08  8：00', // 结算时间
          waitMoney: '666.00', // 待收金额（元）
          discountMoney: '0.8', // 折扣（%）
          reducedMoney: '298.00', // 减免金额（元）
          actualMoney: '1000.00', // 实收金额（元）
          actualScale: '9.0', // 实收比例（%）
          actualReduced: '156.00', // 实收优惠（元）
          payWay: '支付宝', // 支付方式
          acountPerson: '王思佳', // 结算人
          state: '已结算', // 状态
        },
        {
          unitAcountNumber: 'BA2017020300023', // 单位结算号
          acountTime: '2017-09-08  8：00', // 结算时间
          waitMoney: '666.00', // 待收金额（元）
          discountMoney: '0.8', // 折扣（%）
          reducedMoney: '298.00', // 减免金额（元）
          actualMoney: '1000.00', // 实收金额（元）
          actualScale: '9.0', // 实收比例（%）
          actualReduced: '156.00', // 实收优惠（元）
          payWay: '支付宝', // 支付方式
          acountPerson: '王思佳', // 结算人
          state: '已结算', // 状态
        },
        {
          unitAcountNumber: 'BA2017020300023', // 单位结算号
          acountTime: '2017-09-08  8：00', // 结算时间
          waitMoney: '666.00', // 待收金额（元）
          discountMoney: '0.8', // 折扣（%）
          reducedMoney: '298.00', // 减免金额（元）
          actualMoney: '1000.00', // 实收金额（元）
          actualScale: '9.0', // 实收比例（%）
          actualReduced: '156.00', // 实收优惠（元）
          payWay: '支付宝', // 支付方式
          acountPerson: '王思佳', // 结算人
          state: '已结算', // 状态
        },
        {
          unitAcountNumber: 'BA2017020300023', // 单位结算号
          acountTime: '2017-09-08  8：00', // 结算时间
          waitMoney: '666.00', // 待收金额（元）
          discountMoney: '0.8', // 折扣（%）
          reducedMoney: '298.00', // 减免金额（元）
          actualMoney: '1000.00', // 实收金额（元）
          actualScale: '9.0', // 实收比例（%）
          actualReduced: '156.00', // 实收优惠（元）
          payWay: '支付宝', // 支付方式
          acountPerson: '王思佳', // 结算人
          state: '已结算', // 状态
        },
        {
          unitAcountNumber: 'BA2017020300023', // 单位结算号
          acountTime: '2017-09-08  8：00', // 结算时间
          waitMoney: '666.00', // 待收金额（元）
          discountMoney: '0.8', // 折扣（%）
          reducedMoney: '298.00', // 减免金额（元）
          actualMoney: '1000.00', // 实收金额（元）
          actualScale: '9.0', // 实收比例（%）
          actualReduced: '156.00', // 实收优惠（元）
          payWay: '支付宝', // 支付方式
          acountPerson: '王思佳', // 结算人
          state: '已结算', // 状态
        },
        {
          unitAcountNumber: 'BA2017020300023', // 单位结算号
          acountTime: '2017-09-08  8：00', // 结算时间
          waitMoney: '666.00', // 待收金额（元）
          discountMoney: '0.8', // 折扣（%）
          reducedMoney: '298.00', // 减免金额（元）
          actualMoney: '1000.00', // 实收金额（元）
          actualScale: '9.0', // 实收比例（%）
          actualReduced: '156.00', // 实收优惠（元）
          payWay: '支付宝', // 支付方式
          acountPerson: '王思佳', // 结算人
          state: '已结算', // 状态
        },
        {
          unitAcountNumber: 'BA2017020300023', // 单位结算号
          acountTime: '2017-09-08  8：00', // 结算时间
          waitMoney: '666.00', // 待收金额（元）
          discountMoney: '0.8', // 折扣（%）
          reducedMoney: '298.00', // 减免金额（元）
          actualMoney: '1000.00', // 实收金额（元）
          actualScale: '9.0', // 实收比例（%）
          actualReduced: '156.00', // 实收优惠（元）
          payWay: '支付宝', // 支付方式
          acountPerson: '王思佳', // 结算人
          state: '已结算', // 状态
        },
      ],
      meta: {
        total: 20,
        current_page: 1,
        per_page: 20,
      },
    }
    // let result = await api.personalPhysicalExaminationCharge.initTable(data)
    commit('setAcountaSingleTable', result)
  },
}
const getters = {
  unitAcountItem: state => {
    return state.unitAcountTable.items.map(item => {
      return item
    })
  },
  unitAcountPageInfo: state => {
    return state.unitAcountTable.meta
  },
  acountaSingleItem: state => {
    return state.acountaSingleTable.items.map(item => {
      return item
    })
  },
  acountaSinglePageInfo: state => {
    return state.acountaSingleTable.meta
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
