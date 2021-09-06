// 部门管理 xk
import * as types from './departmentManageTypes'
import api from '@/api'

let parentIds = []
let parentId = function(arr) {
  if (arr[0]) {
    parentIds.push({id: arr[0].id, code: arr[0].code})
    if (arr[0].children && arr[0].children.length) {
      parentId(arr[0].children)
    }
  }
}

let formatAll = function(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].value = arr[i].id
    arr[i].label = arr[i].name
    if (arr[i].children && arr[i].children.length > 0) {
      formatAll(arr[i].children)
    }
  }
}

let formatTreeDate = (data) => {
  data.map(item => {
    item.title = item.name
    // item.code = item.code
    item.id = item.id
    item.children = []
    if (item.is_children) {
      item.loading = false
    }
    if (item.children && item.children.length) {
      formatTreeDate(item.children)
    }
  })
}
const state = {
  department: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },

  departmentTree: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  departmentTreeParent: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  departmentTreeChild: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
  departmentAll: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      per_page: 20,
    },
  },
}

const mutations = {
  [types.SET_DEPARTMENT](state, payload) {
    state.department = payload
  },
  setSingleData(state, payload) {
    state.department.items = [payload]
  },
  [types.SET_DEPARTMENT_TREE](state, payload) {
    formatTreeDate(payload.items)
    state.departmentTree = payload
  },
  [types.SET_DEPARTMENT_PARENT](state, payload) {
    state.departmentTreeParent = payload
  },
  [types.SET_DEPARTMENT_CHILD](state, payload) {
    formatTreeDate(payload.items)
    state.departmentTreeChild = payload
  },
  [types.SET_DEPARTMENT_ALL](state, payload) {
    formatAll(payload.items)
    state.departmentAll = payload
  },
}

const actions = {
  async getDepartment({commit}, p) {
    let result = await api.departmentManage.getDepartment(p)
    commit(types.SET_DEPARTMENT, result)
  },

  async getDepartmentTree({commit}, p) {
    let result = await api.departmentManage.getDepartment(p)
    commit(types.SET_DEPARTMENT_TREE, result)
  },
  async getDepartmentParent({commit}, p) {
    let result = await api.departmentManage.getDepartmentParent(p)
    commit(types.SET_DEPARTMENT_PARENT, result)
  },
  async getDepartmentChild({commit}, p) {
    let result = await api.departmentManage.getDepartment(p)
    commit(types.SET_DEPARTMENT_CHILD, result)
  },
  async getDepartmentAll({commit}, p) {
    let result = await api.departmentManage.getDepartment(p)
    commit(types.SET_DEPARTMENT_ALL, result)
  },

  async addDepartment({commit}, p) {
    await api.departmentManage.addDepartment(p)
  },

  async editDepartment({commit}, p) {
    await api.departmentManage.editDepartment(p)
  },

  async deleteDepartment({commit}, p) {
    await api.departmentManage.deleteDepartment(p)
  },

}

const getters = {
  doneParentIds: (state) => {
    parentIds = []
    parentId(state.departmentTreeParent)
    return parentIds
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
