/*
*检测项目列表(单个项目管理)
*@author 覃凤
*@date 2017/11/27
* */
import * as types from './singleProjectTypes'
import api from '@/api'
import timeFilter from '@/fifters/timeFilter.js'

const state = {
  singleRightList: {
    meta: {
      total: 0,
      current_page: 1,
      per_page: 20,
    },
    items: [],
  },
  // singleLeftList: {
  //   items: [],
  // },
  singleLeftLev3: {}, // 左侧树形点击获取菜单
  getTotalMeta: [], // 获取所有的右侧数据，没有筛选
  singleRightData: {}, // 左侧三级菜单选择右侧对应数据
  singleRightDataDes: {
    items: [],
  }, // 左侧三级菜单选择右侧对应数据(描述型)
  singleXmlb: {}, // 弹窗中项目类别
  singleTjlc: {}, // 弹窗中体检类别
  allLeftData: [], // 左侧所有数据
  // singleResultAddData: {}, // 单项结果新增
  // singleAddList: {}, // 新增单个项目数据
  // singleEditList: {}, // 编辑单个项目数据
  singleDeleteList: {}, // 删除数据
  getOnExpandData: [], // 点击表格下拉
}

const mutations = {
  [types.SET_ALL_REQ] (state, payload) {  // 点击按钮一起请求弹窗下拉
    state.singleXmlb = payload[0] // 项目类别
    state.singleTjlb = payload[1] // 体检类别
  },
  [types.GET_XMLB] (state, payload) { // 项目类别
    state.singleXmlb = payload
  },
  [types.GET_TJLB] (state, payload) { // 体检类别
    state.singleTjlb = payload
  },
  [types.SET_INIT_ALL_REQ] (state, payload) { // 批量请求加载进入时左侧和右侧所有数据（获得sort）
    state.getTotalMeta = payload[1] // 所有数据
    state.allLeftData = payload[0] // 左侧

    // state.singleTjlb = payload[2] // 类别
  },
  [types.SET_INIT_DEL_ALL_REQ] (state, payload) { // 批量请求批量删除二级
    // console.log(payload)
    state.allLeftData = payload[0]
    // state.getTotalMeta = payload[1]
    state.singleTjlb = payload[1]
  },
  // [types.SET_SINGLE_TYPES_L] (state, payload) {
  //   // console.log(payload)
  //   state.singleLeftList = payload
  // },
  [types.SET_SINGLE_LEFT_ALL] (state, payload) { // 左侧所有数据
    state.allLeftData = payload
  },
  [types.SET_SINGLE_TYPES_SEARCHLEV] (state, payload) {
    state.singleLeftLev3 = payload
  },
  [types.SET_SINGLE_COUNT_R] (state, payload) {
    // console.log(payload)
    state.singleRightList = payload
  },
  [types.SET_SINGLE_ALL_COUNT_R] (state, payload) {
    state.getTotalMeta = payload
  },
  // [types.SET_SINGLE_TYPESEARCH] (state, payload) {
  //   state.singleRightList = payload
  // },
  [types.SET_SINGLE_RIGHT_DATA] (state, payload) {
    state.singleRightData = payload
  },
  [types.SET_SINGLE_RIGHT_DATA_DES] (state, payload) {
    // console.log(payload)
    state.singleRightDataDes = payload
  },
  [types.SET_SINGLE_TABLE_SELECT] (state, payload) { // 表格下拉
    // console.log(payload)
    state.getOnExpandData = payload
  },
  [types.RESET] (state, payload) {  // 重置页面
    state.singleRightList = {
      items: [],
      meta: {
        total: 0,
        current_page: 1,
        per_page: 20,
      },
    }
  },
  // [types.SET_SINGLE_RESLUT_DATA] (state, payload) { // 新增单项结果
  //   state.singleResultAddData = payload
  // },
  // [types.SET_SINGLE_EDIT] (state, payload) {
  //   state.singleEditList = payload
  // },
  // [types.SET_SINGLE_ADD] (state, payload) {
  //   state.singleAddList = payload
  // },
  // [types.SET_SINGLE_DELETE] (state, payload) {
  //   state.singleDeleteList = payload
  // },
  // [types.SET_SINGLE_SEARCH] (state, payload) {
  //   state.singleRightList = payload
  // },
}

const actions = {
  // async getLeftList ({commit}, data) { // 左侧
  //   // console.log(data)
  //   let result = await api.singleProject.getLeftList(data)
  //   commit(types.SET_SINGLE_TYPES_L, result)
  // },
  async getLeftAll ({commit}, data) { // 左侧所有数据
    // console.log(data)
    let result = await api.singleProject.getLeftAll(data)
    commit(types.SET_SINGLE_LEFT_ALL, result)
  },
  async getSingleItemType ({commit}, data) { // 项目类别
    // console.log(data)
    let result = await api.singleProject.getSingleItemType(data)
    commit(types.GET_XMLB, result)
  },
  async getSinglePeCategories ({commit}, data) { // 体检类别
    // console.log(data)
    let result = await api.singleProject.getSinglePeCategories(data)
    commit(types.GET_TJLB, result)
  },
  async getLeftLev3 ({commit}, data) { // 左侧点击树形菜单请求子菜单
    let result = await api.singleProject.getLeftLev3(data)
    commit(types.SET_SINGLE_TYPES_SEARCHLEV, result)
  },
  async getRightList ({commit}, data) { // 右侧
    // console.log(data)
    let result = await api.singleProject.getRightList(data)
    commit(types.SET_SINGLE_COUNT_R, result)
  },
  // async getRightList ({commit}, data) { // 右侧tab切换
  //   let result = await api.singleProject.getRightList(data)
  //   commit(types.SET_SINGLE_COUNT_R, result)
  // },
  async getRightAll ({commit}, data) { // 获取右侧所有数据，值请求一次
    let result = await api.singleProject.getRightAll(data)
    commit(types.SET_SINGLE_ALL_COUNT_R, result)
  },
  async getRightSingle ({commit}, data) { // 左侧三级菜单选择右侧对应数据
    // console.log(data)
    let result = await api.singleProject.getRightSingle(data)
    commit(types.SET_SINGLE_RIGHT_DATA, result)
  },
  async getRightSingleDes ({commit}, data) { // 左侧三级菜单选择右侧对应数据(描述型)
    // console.log(data)
    let result = await api.singleProject.getRightSingleDes(data)
    commit(types.SET_SINGLE_RIGHT_DATA_DES, result)
  },
  async getSingleResultAdd ({commit}, data) { // 新增单项结果
    let id = data.id
    let val = data.data
    return await api.singleProject.getSingleResultAdd(id, val)
    // commit(types.SET_SINGLE_RIGHT_DATA, result)
  },
  async getSingleResultEdit ({commit}, data) { // 编辑单项结果
    let id = data.id
    let val = data.data
    return await api.singleProject.getSingleResultEdit(id, val)
    // commit(types.SET_SINGLE_RIGHT_DATA, result)
  },
  // async getSingleAllSearchTypes ({commit}, data) { // 左侧筛选右侧
  //   let result = await api.singleProject.getTypeSearch(data)
  //   commit(types.SET_SINGLE_TYPESEARCH, result)
  // },
  async getSingleEdit ({commit}, data) { // 编辑
    return await api.singleProject.getSingleEdit(data.id, data.data)
    // commit(types.SET_SINGLE_EDIT, result4)
  },
  async getSingleAdd ({commit}, data) { // 新增单个项目
    return await api.singleProject.getSingleAdd(data)
    // commit(types.SET_SINGLE_ADD, result4)
  },
  async getSingleDelete ({commit}, data) { // 删除
    return await api.singleProject.getSingleDelete(data)
  },
  async getSingleResultDel ({commit}, data) { // 删除单项结果
    return await api.singleProject.getSingleResultDel(data)
  },
  async getOnExpand ({commit}, data) { // 点击表格下拉请求
    let result4 = await api.singleProject.getOnExpand(data)
    commit(types.SET_SINGLE_TABLE_SELECT, result4)
  },
  async getSingleDisAllReq ({commit}, data) { // 一起请求单个项目弹窗中
    let result = await api.singleProject.getSingleDisAllReq()
    commit(types.SET_ALL_REQ, result)
  },
  async initReq ({commit}, data) { // 批量请求加载进入时左侧和右侧所有数据（获得sort）
    let result = await api.singleProject.initReq()
    commit(types.SET_INIT_ALL_REQ, result)
  },
  async reqLev3Single ({commit}, data) { // 批量请求删除三级对应单个项目左侧
    let result = await api.singleProject.reqLev3Single()
    commit(types.SET_INIT_DEL_ALL_REQ, result)
  },
  async getRadioChange({commit}, params) {
    await api.singleProject.getRadioChange(params)
  },
}

const getters = {
  allLeftData: (state) => { // 左侧所有数据
    let data = [
      {
        title: '所有类别',
        expand: true,
        selected: true,
        level: 1,
        children: [],
      },
    ]
    let tjType = state.allLeftData.items
    // let leftData = state.allLeftData.items
    for (let i in tjType) {
      tjType[i].expand = false
      tjType[i].children = []
      tjType[i].title = tjType[i].name
      tjType[i].selected = false
      tjType[i].level = 2
      if (tjType[i].items) {
        for (let j in tjType[i].items) {
          tjType[i].children.push({
            title: tjType[i].items[j].name,
            id: tjType[i].items[j].id,
            level: 3,
            selected: false,
            item: tjType[i].items[j],
          })
        }
      }
    }
    data[0].children = tjType
    // console.log(data)
    // console.log(data)
    // for (let i in tjType) {
    //   tjType[i].expand = false
    //   tjType[i].children = []
    //   tjType[i].title = tjType[i].name
    //   tjType[i].selected = false
    //   for (let j in leftData) {
    //     if (leftData[j].type !== null) {
    //       if (tjType[i].name === leftData[j].type.name) {
    //         tjType[i].children.push({
    //           title: leftData[j].name,
    //           id: leftData[j].id,
    //           selfType: 1,
    //           selected: false,
    //         })
    //       }
    //     }
    //   }
    // }
    // data[0].children = tjType
    // console.log(data)
    return JSON.parse(JSON.stringify(data))
    // let data = [
    //   {
    //     title: '所有类别',
    //     expand: true,
    //     selected: true,
    //     children: [],
    //   },
    // ]
    // let allData = state.allLeftData.items
    // let result = {}
    // for (let i in allData) {
    //   allData[i].title = allData[i].name
    //   allData[i].selfType = 1
    //   if (allData[i].type !== null) {
    //     let id = allData[i].type.id
    //     if (allData[i].type && !result[id]) {
    //       result[id] = {
    //         id: id,
    //         title: allData[i].type.name,
    //         expand: false,
    //       }
    //       delete allData[i].type
    //       allData[i].expand = false
    //       result[id].children = [allData[i]]
    //     } else {
    //       delete allData[i].type
    //       allData[i].expand = false
    //       result[id].children.push(allData[i])
    //     }
    //   }
    // }
    // data[0].children = Object.values(result)
    // // console.log(data[0].children)
    // return JSON.parse(JSON.stringify(data))
  },
  // singleLeftList: (state) => {
  //   let data = [
  //     {
  //       title: '所有类别',
  //       expand: true,
  //       selected: true,
  //       children: [],
  //     },
  //   ]
  //   let secChild = []
  //   state.singleLeftList.items.map((type) => {
  //     secChild.push({
  //       id: type.id,
  //       title: type.name,
  //       children: [],
  //     })
  //   })
  //   data[0].children = secChild
  //   return data
  //   // console.log(secChild)
  //   // console.log(data)
  //   // return state.singleLeftList.items.map((type) => {
  //   //   console.log(type)
  //   //   return {
  //   //     id: type.id,
  //   //     title: type.name,
  //   //   }
  //   // })
  // },
  singleLeftLev3: (state) => {
    let secChild = []
    state.singleLeftLev3.items.map((type) => {
      secChild.push({
        id: type.id,
        title: type.name,
        parentName: type.type.name, // 对应父元素名称
        selfType: 1, // 标记数据是三级菜单
        children: [],
      })
    })
    // console.log(secChild)
    return secChild
  },
  singleRightData: (state) => { // 左侧三级菜单选择右侧对应数据
    // console.log(state.singleRightData)
    let newData = state.singleRightData
    if (newData.sex === 1) {
      newData.newSex = '男'
    } else if (newData.sex === 2) {
      newData.newSex = '女'
    } else {
      newData.newSex = '通用'
    }
    if (newData.res_type === 1) {
      newData.newRes_type = '描述型'
    } else if (newData.res_type === 2) {
      newData.newRes_type = '数值型'
    }
    return newData
  },
  singleRightDataDes: (state) => { // 左侧三级菜单选择右侧对应数据(描述型)
    // console.log(state.singleRightDataDes)
    return state.singleRightDataDes.items.map((data) => {
      return data
    })
  },
  singleRightList: (state) => {
    // return state.singleRightList.items
    // console.log(state.singleRightList.items)
    return state.singleRightList.items.map((type) => {
      let a = {
        id: type.id,
        parName: type.type && type.type !== null ? type.type.name : '', // 项目类别
        name: type.name, // 检测项目名称
        code: type.code, // 单项编号
        en_abbr: type.en_abbr, // 英文简称
        sex: parseInt(type.sex), // 适用性别
        // pe_category_ids: '', // 适用类别
        res_type: parseInt(type.res_type), // 结果类型
        report_name: type.report_name, // 报告名称显示
        remark: type.remark, // 备注
        status: type.status, // 启用状态
        sort: type.sort, // 显示顺序
        operater: type.operater, // 最后修改人
        // realname: type.operater ? type.operater.realname : '', // 最后修改人
        // operater: type.operater, // 个人信息
        updatedAt: type.updated_at === null ? '' : timeFilter(type.updated_at), // 最后修改时间表格显示
        updated_at: type.updated_at, // 最后修改时间

        low_limit_man: type.low_limit_man === null ? null : parseFloat(type.low_limit_man), // 参考下限（男）
        upper_limit_man: type.upper_limit_man === null ? null : parseFloat(type.upper_limit_man), // 参考上限（男）
        low_limit_woman: type.low_limit_woman === null ? null : parseFloat(type.low_limit_woman), // 参考下限（女）
        upper_limit_woman: type.upper_limit_woman === null ? null : parseFloat(type.upper_limit_woman), // 参考上限（女）
        unit: type.unit, // 单位
        type: type.type ? type.type : '', // 对应二级数据
        // // sort: type.sort, // 显示顺序，后台没有加之后修改，先暂时使用
        min_val: type.min_val === null ? 0 : parseFloat(type.min_val), // 最小值
        max_val: type.max_val === null ? 0 : parseFloat(type.max_val), // 最大值
        // min_val: type.min_val === null ? null : parseInt(type.min_val), // 最小值
        // max_val: type.max_val === null ? null : parseInt(type.max_val), // 最大值
        high_side: type.max_val === null ? 0 : parseInt(type.high_side), // 偏高显示
        low_side: type.max_val === null ? 0 : parseInt(type.low_side), // 偏低显示
        brief_summary: parseInt(type.brief_summary), // 小结汇总，必填
        is_show_name: type.is_show_name, // 小结显示项目名称
        reference_rule: type.reference_rule, // 参考规则
        is_has_summary: type.is_has_summary, // 是否小结
        default_res_id: type.default_res_id,
        // is_positive: type.is_positive, // 阴阳性
        // // realname: type.operater === '' || type.operater === null ? '' : type.operater.realname, // 最后修改人
        // updated_at: timeFilter(type.updated_at), // 最后修改时间

      }
      return a
    })
  },
  singleXmlb: (state) => { // 项目类别
    // console.log(state.singleXmlb)
    return state.singleXmlb.items.map((data) => {
      return {
        value: data.id,
        label: data.name,
      }
    })
    // return state.singleXmlb.items.map((data) => {
    //   return {
    //     value: data.id,
    //     label: data.name,
    //   }
    // })
    // console.log(state.singleXmlb)
    // return state.singleXmlb.items
  },
  singleTjlb: (state) => { // 体检类别
    return state.singleTjlb.items.map((data) => {
      return {
        value: data.id,
        label: data.name,
      }
    })
    // return state.singleTjlb.items
  },
  getOnExpandData: (state) => { // 点击表格下拉请求
    return state.getOnExpandData
  },
  pageInfo: (state) => {
    return state.singleRightList.meta
  },
  getTotalMeta: (state) => {
    return state.getTotalMeta.meta.total
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
