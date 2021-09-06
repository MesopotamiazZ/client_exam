/*
* 基本信息-参数管理-行政区域管理
* @author 肖康
* @date 2017/12/1
*/

import * as types from './administrativeAreaManagementTypes'
import api from '@/api'
let formatAll = function(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].value = arr[i].id
    arr[i].label = arr[i].name
    if (arr[i].children && arr[i].children.length > 0) {
      formatAll(arr[i].children)
    }
  }
}
let parentIds = []
let parentId = function(arr) {
  if (arr[0]) {
    parentIds.push(arr[0].id)
    if (arr[0].children && arr[0].children.length) {
      parentId(arr[0].children)
    }
  }
}
const state = {

  provinceList: {
    items: [],
  },
  cityList: {
    items: [],
  },
  countyList: {
    items: [],
  },
  streetList: {
    items: [],
  },
  areaParent: {
    items: [],
  },
  areaCascader: {
    items: [],
  },
}

const mutations = {
  [types.SET_ADMIN_AREA_PROVINCE](state, payload) {
    state.provinceList = payload
  },
  [types.SET_ADMIN_AREA_CITY](state, payload) {
    state.cityList = payload
  },
  [types.SET_ADMIN_AREA_COUNTY](state, payload) {
    state.countyList = payload
  },
  [types.SET_ADMIN_AREA_STREET](state, payload) {
    state.streetList = payload
  },
  [types.SET_ADMIN_AREA_CASCADER](state, payload) {
    formatAll(payload.items)
    state.areaCascader = payload
  },
  [types.SET_ADMIN_AREA_PARENT](state, payload) {
    // formatAll(payload.items)
    state.areaParent = payload
  },
}

const actions = {
  async getAreaProvince({commit}, p) {
    let result = await api.administrativeAreaManagement.getAdminAreaList(p)
    commit(types.SET_ADMIN_AREA_PROVINCE, result)
  },
  async getAreaCity({commit}, p) {
    let result = await api.administrativeAreaManagement.getAdminAreaList(p)
    commit(types.SET_ADMIN_AREA_CITY, result)
  },
  async getAreaCounty({commit}, p) {
    let result = await api.administrativeAreaManagement.getAdminAreaList(p)
    commit(types.SET_ADMIN_AREA_COUNTY, result)
  },
  async getAreaStreet({commit}, p) {
    let result = await api.administrativeAreaManagement.getAdminAreaList(p)
    commit(types.SET_ADMIN_AREA_STREET, result)
  },
  async getAreaParent({commit}, p) {
    let result = await api.administrativeAreaManagement.getAdminAreaParent(p)
    commit(types.SET_ADMIN_AREA_PARENT, result)
    return result
  },
  async getAreaCascader({commit}, p) {
    let result = await api.administrativeAreaManagement.getAdminAreaList(p)
    commit(types.SET_ADMIN_AREA_CASCADER, result)
    return result
  },
  async addArea({commit}, p) {
    let result = await api.administrativeAreaManagement.addAdminArea(p)
    return result
  },
  async editArea({commit}, p) {
    let result = await api.administrativeAreaManagement.editAdminArea(p)
    return result
  },
  async delArea({commit}, p) {
    let result = await api.administrativeAreaManagement.delAdminArea(p)
    return result
  },
}
const getters = {
  doneAreaList: (state) => {
    // that.areaList = res
    // console.log('数据有吗', state.areaList)
    let data = state.provinceList.items.slice(0)
    data.sort(arrayInObjSort('district_letter'))
    function arrayInObjSort(name) {
      // console.log('排序')
      return function(o, p) {
        var a, b
        if (typeof o === 'object' && typeof p === 'object' && o && p) {
          a = o[name]
          b = p[name]
          if (a === b) {
            return 0
          }
          if (typeof a === typeof b) {
            return a < b ? -1 : 1
          }
          return typeof a < typeof b ? -1 : 1
        } else {
          return ('error')
        }
      }
    }
    return data
  },
  doneParentIds: (state) => {
    parentIds = []
    parentId(state.areaParent.items)
    return parentIds
  },
  doneProvinceList: (state) => {
    // that.areaList = res
    // console.log('数据有吗', state.areaList)
    let data = state.provinceList.items.slice(0)
    data.sort(arrayInObjSort('district_letter'))
    function arrayInObjSort(name) {
      // console.log('排序')
      return function(o, p) {
        var a, b
        if (typeof o === 'object' && typeof p === 'object' && o && p) {
          a = o[name]
          b = p[name]
          if (a === b) {
            return 0
          }
          if (typeof a === typeof b) {
            return a < b ? -1 : 1
          }
          return typeof a < typeof b ? -1 : 1
        } else {
          return ('error')
        }
      }
    }
    return data
  },
  doneCityList: (state) => {
    // that.areaList = res
    // console.log('数据有吗', state.areaList)
    let data = state.cityList.items.slice(0)
    data.sort(arrayInObjSort('district_letter'))
    function arrayInObjSort(name) {
      // console.log('排序')
      return function(o, p) {
        var a, b
        if (typeof o === 'object' && typeof p === 'object' && o && p) {
          a = o[name]
          b = p[name]
          if (a === b) {
            return 0
          }
          if (typeof a === typeof b) {
            return a < b ? -1 : 1
          }
          return typeof a < typeof b ? -1 : 1
        } else {
          return ('error')
        }
      }
    }
    return data
  },
  doneCountyList: (state) => {
    // that.areaList = res
    // console.log('数据有吗', state.areaList)
    let data = state.countyList.items.slice(0)
    data.sort(arrayInObjSort('district_letter'))
    function arrayInObjSort(name) {
      // console.log('排序')
      return function(o, p) {
        var a, b
        if (typeof o === 'object' && typeof p === 'object' && o && p) {
          a = o[name]
          b = p[name]
          if (a === b) {
            return 0
          }
          if (typeof a === typeof b) {
            return a < b ? -1 : 1
          }
          return typeof a < typeof b ? -1 : 1
        } else {
          return ('error')
        }
      }
    }
    return data
  },
  doneStreetList: (state) => {
    // that.areaList = res
    // console.log('数据有吗', state.areaList)
    let data = state.streetList.items.slice(0)
    data.sort(arrayInObjSort('district_letter'))
    function arrayInObjSort(name) {
      // console.log('排序')
      return function(o, p) {
        var a, b
        if (typeof o === 'object' && typeof p === 'object' && o && p) {
          a = o[name]
          b = p[name]
          if (a === b) {
            return 0
          }
          if (typeof a === typeof b) {
            return a < b ? -1 : 1
          }
          return typeof a < typeof b ? -1 : 1
        } else {
          return ('error')
        }
      }
    }
    return data
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
