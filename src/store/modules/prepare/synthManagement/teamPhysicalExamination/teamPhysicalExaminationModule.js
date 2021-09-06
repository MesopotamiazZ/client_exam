/**
 * author      : yhy
 * cteate      : 2018/03/01
 * description : 单位管理
 */
import api from '@/api'
const state = {
  switchComponent: '', // 切换单位管理页面
  // 单位管理表格
  unitListTable: {
    items: [],
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
  },
  // 账户变动表格
  accountChangeTable: {
    items: [],
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
  },
  // 员工
  staffListTable: {
    items: [],
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
  },
  // 部门表格
  departmentListTable: {
    items: [],
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
  },
}

const mutations = {
  setSwitchComponent(state, payload) {
    state.switchComponent = payload
  },
  setUnitListTable(state, payload) {
    state.unitListTable = payload
  },
  setAccountChangeTable(state, payload) {
    state.accountChangeTable = payload
  },
  setStaffListTable(state, payload) {
    state.staffListTable = payload
  },
  setDepartmentListTable(state, payload) {
    state.departmentListTable = payload
  },
}

const actions = {
  async getUnitListTable({ commit }, params) {
    let result = await api.teamPhysicalExamination.getExamineUnits(params)
    commit('setUnitListTable', result)
  },
  getAccountChangeTable({ commit }, data) {
    let reslut = {
      items: [
        {
          acountNumber: '6258975456468454', // 单位/个人结算单号
          physicalNumber: '17054874', // 体检号
          unitName: '中国石油有限公司', // 姓名（单位名称）
          changeType: '支出', // 变动类型
          digest: '在线充值', // 摘要
          changeMoney: '677.00', // 变动金额
          reduceMoney: '8988.00', // 账户余额
          person: '刘基德', // 操作人
          changeDate: '2017-09-08', // 变动日期
          remark: ' 提现原因：客户要求', // 变动日期
        },
        {
          acountNumber: '6258975456468454', // 单位/个人结算单号
          physicalNumber: '17054874', // 体检号
          unitName: '中国石油有限公司', // 姓名（单位名称）
          changeType: '支出', // 变动类型
          digest: '在线充值', // 摘要
          changeMoney: '677.00', // 变动金额
          reduceMoney: '8988.00', // 账户余额
          person: '刘基德', // 操作人
          changeDate: '2017-09-08', // 变动日期
          remark: ' 提现原因：客户要求', // 变动日期
        },
        {
          acountNumber: '6258975456468454', // 单位/个人结算单号
          physicalNumber: '17054874', // 体检号
          unitName: '中国石油有限公司', // 姓名（单位名称）
          changeType: '支出', // 变动类型
          digest: '在线充值', // 摘要
          changeMoney: '677.00', // 变动金额
          reduceMoney: '8988.00', // 账户余额
          person: '刘基德', // 操作人
          changeDate: '2017-09-08', // 变动日期
          remark: ' 提现原因：客户要求', // 变动日期
        },
      ],
      meta: {
        total: 3,
        current_page: 1,
        per_page: 20,
      },
    }
    commit('setAccountChangeTable', reslut)
  },
  async getStaffListTable({ commit }, params) {
    let result = await api.teamPhysicalExamination.getExamineUnitStaff(params)
    commit('setStaffListTable', result)
  },
  getDepartmentListTable({ commit }) {
    let result = {
      items: [
        {
          department: '考勤部',
          number: '2',
        }, {
          department: '后勤部',
          number: '12',
        },
      ],
      meta: {
        total: 0,
        current_page: 1,
        per_page: 20,
      },
    }
    commit('setDepartmentListTable', result)
  },
}
const getters = {
  unitListuItem: state => {
    return state.unitListTable.items.map(item => {
      let ecnonmicName = ''
      if (item.economic_type) {
        ecnonmicName = item.economic_type.name
      }
      return {
        name: item.name,
        econ_industry: item.econ_industry,
        economic_type_name: ecnonmicName,
        mobile: item.mobile,
        email: item.email,
        fax: item.fax,
        address: item.address,
        remark: item.remark,
      }
    })
  },
  unitListPageInfo: state => {
    return state.unitListTable.meta
  },
  accountChangeItem: state => {
    return state.accountChangeTable.items.map(item => {
      return item
    })
  },
  accountChangePageInfo: state => {
    return state.accountChangeTable.meta
  },
  staffListItem: state => {
    return state.staffListTable.items.map(item => {
      let coocupName = ''
      if (item.pe_type_detail && item.pe_type_detail.occup_type_name) {
        coocupName = item.pe_type_detail.occup_type_name
      }
      let totalAge = ''
      if (item.pe_type_detail && item.pe_type_detail.total_work_age) {
        totalAge = item.pe_type_detail.total_work_age
      }
      let injuryAge = ''
      if (item.pe_type_detail && item.pe_type_detail.injury_age) {
        injuryAge = item.pe_type_detail.injury_age
      }
      let factorName = ''
      if (item.pe_type_detail && item.pe_type_detail.occupHarms) {
        let array = item.pe_type_detail.occupHarms
        array.forEach((item, index) => {
          let temp = `${item.factor_name}(${item.factor_type_name}),`
          factorName += temp
        })
        // factorName = item.pe_type_detail.occupHarms[0].factor_name
      }
      let deptName = ''
      if (item.unit_dept) {
        deptName = item.unit_dept.name
      }
      return {
        realname: item.realname,
        sex: item.sex,
        age: item.age,
        dept_id: deptName,
        job: item.job,
        mobile: item.mobile,
        occup_type_name: coocupName,
        total_work_age: totalAge,
        injury_age: injuryAge,
        factor_name: factorName,
        remark: item.remark,
      }
    })
  },
  staffListPageInfo: state => {
    return state.staffListTable.meta
  },
  departmentListItem: state => {
    return state.departmentListTable.items.map(item => {
      return item
    })
  },
  departmentListPageInfo: state => {
    return state.departmentListTable.meta
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
