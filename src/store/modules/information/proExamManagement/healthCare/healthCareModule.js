/* import * as types from './healthCareTypes'
import api from '@/api'
import timeFilter from '@/fifters/timeFilter.js'

const state = {
  healthCareTable: {
    items: [],
    meta: {
      total: 0,
      page: 1,
      page_size: 20,
    },
  }, // 职业健康监护表格数据
  getAll: {}, // 获取总的现实顺序
  harmTypes: {}, // 职业危害类别下拉
  peTypes: {}, // 体检类别下拉
  delHealthCareLine: {}, // 删除
  harmFactors: {}, // 获取危害因素下拉
  getOccupatDisData: {}, // 获取职业病数据
  getTaboos: {}, // 职业禁忌
  getGroupItmesSel: {}, // 检查项目下拉筛选组合项目名称
  getItemTypesList: {}, // 检查项目下拉
  getIdOccDiseaseData: {}, // 通过id获取职业病
  getIdInterrogaData: {}, // 通过id获取问诊项目
  getIdBasisData: {}, // 通过id获取依据标准
  putEditData: {}, // 提交修改数据
  allData: {}, // 请求所有数据
}
const mutations = {
  [types.SET_HEALTHCARE_TABLE] (state, payload) {  // 初始加载表格数据
    state.healthCareTable = payload
  },
  [types.SET_ALL_TABLES] (state, payload) {  // 初始加载表格数据获取总条数
    state.getAll = payload
  },
  [types.SET_OCCUO_HARM_TYPES] (state, payload) {  // 职业危害类别下拉
    state.harmTypes = payload
  },
  [types.SET_OCCUO_PE_TYPES] (state, payload) {  // 体检类别下拉
    state.peTypes = payload
  },
  [types.DEL_EDIT_DATA] (state, payload) {  // 删除
    state.delHealthCareLine = payload
  },
  [types.SET_OCCUO_HARM_TYPES_FACTOR] (state, payload) {  // 危害因素下拉
    state.harmFactors = payload
  },
  [types.POST_OCCUP_HARM_INFOS] (state, payload) {  // 新增职业健康监护
    state.addGetPeGroupItem = payload
  },
  [types.SET_OCCUPATION_DISEASE] (state, payload) {  // 获取职业病数据
    state.getOccupatDisData = payload
  },
  [types.SET_ITEM_TYPES] (state, payload) {  // 检查项目下拉
    state.getItemTypesList = payload
  },
  [types.SET_GROUP_ITEMS] (state, payload) {  // 检查项目下拉筛选组合项目名称
    state.getGroupItmesSel = payload
  },
  [types.SET_ID_OCC_DISEASE] (state, payload) {  // 通过id获取职业病
    state.getIdOccDiseaseData = payload
  },
  [types.PUT_EDIT_DATA] (state, payload) {  // 提交修改数据
    state.putEditData = payload
  },
  [types.SET_ALL_REQ] (state, payload) {  // 初始加载表格数据
    state.harmTypes = payload[0] // 危害类别
    state.peTypes = payload[1] // 体检类别
    state.getIdBasisData = payload[2] // 依据标准
    state.getIdInterrogaData = payload[3] // 职业问诊
    state.getItemTypesList = payload[4] // 检查项目
    state.getGroupItmesSel = payload[5] // 初始请求所有的检查项目
    state.getOccupatDisData = payload[6] // 请求职业病
    state.getIdOccDiseaseData = payload[7] // 职业病初始加载所有数据
    state.getTaboos = payload[8] // 职业禁忌
  },
  [types.RESET] (state, payload) {  // 重置页面
    state.healthCareTable = {
      items: [],
      meta: {
        total: 0,
        page: 1,
        page_size: 20,
      },
    }
  },
}
const actions = {
  async getTableInit ({commit}, data) { // 初始加载表格数据
    let result = await api.healthCare.getTableInit(data)
    commit(types.SET_HEALTHCARE_TABLE, result)
  },
  async getAllSort ({commit}, data) { // 初始加载表格数据显示顺序
    let result = await api.healthCare.getAllSort(data)
    commit(types.SET_ALL_TABLES, result)
  },
  async getHarmTypes ({commit}, data) { // 职业危害类别下拉
    let result = await api.healthCare.getHarmTypes(data)
    commit(types.SET_OCCUO_HARM_TYPES, result)
  },
  async getPeTypes ({commit}, data) { // 体检类别下拉
    let result = await api.healthCare.getPeTypes(data)
    commit(types.SET_OCCUO_PE_TYPES, result)
  },
  async getHarmFactors ({commit}, data) { // 危害因素下拉
    let result = await api.healthCare.getHarmFactors(data)
    commit(types.SET_OCCUO_HARM_TYPES_FACTOR, result)
  },
  async postHarmInfosFun ({commit}, data) { // 新增职业健康监护
    let result = await api.healthCare.postHarmInfosFun(data)
    commit(types.POST_OCCUP_HARM_INFOS, result)
  },
  async getOccupaDiseaseFun ({commit}, data) { // 获取职业病数据
    let result = await api.healthCare.getOccupaDiseaseFun(data)
    commit(types.SET_OCCUPATION_DISEASE, result)
  },
  async getItemTypesFun ({commit}, data) { // 检查项目下拉
    let result = await api.healthCare.getItemTypesFun(data)
    commit(types.SET_ITEM_TYPES, result)
  },
  async getGroupItemsFun ({commit}, data) { // 检查项目下拉筛选组合项目名称
    let result = await api.healthCare.getGroupItemsFun(data)
    commit(types.SET_GROUP_ITEMS, result)
  },
  async getIdOccDiseaseFun ({commit}, data) { // 通过id获取职业病
    let result = await api.healthCare.getIdOccDiseaseFun(data)
    commit(types.SET_ID_OCC_DISEASE, result)
  },
  async putEditFun ({commit}, data) { // 提交修改数据
    let result = await api.healthCare.putEditFun(data.id, data.data)
    commit(types.PUT_EDIT_DATA, result)
  },
  async delDataFun ({commit}, data) { // 删除数据
    let result = await api.healthCare.delDataFun(data)
    commit(types.DEL_EDIT_DATA, result)
  },
  async getNumsReq ({commit}, data) { // 一起请求弹窗数据
    let newData = {
      harmType: {size: data.harmType},
      peType: {size: data.peType},
      idBasis: {size: data.idBasis},
      interrogaData: {size: data.interrogaData},
      itemType: {size: data.itemType},
      itemTypeAll: {'item_type_id': data.itemTypeAll, 'size': 0},
      occupaDisease: {size: data.occupaDisease},
      occupSelectData: {'disease_type_id': data.occupSelectData},
      occupaTaboos: {size: data.occupaTaboos},
    }
    let result = await api.healthCare.getNumsReq(newData)
    commit(types.SET_ALL_REQ, result)
  },
}
const getters = {
  healthCareTable: (state) => { // 处理表格数据
    return state.healthCareTable.items.map((data, index) => {
      let a = data.group_item // 获取选检必检
      let b = data.occup_disease // 获取职业病
      let c = data.occup_taboo // 获取职业禁忌
      let d = data.inquiry_item // 问诊项目
      let mustGroupItems = '' // 必检
      let editGroupItems = [] // 检查项目
      let mustGroupItemsIds = [] // 必检id
      let choiceGroupItems = '' // 选检
      let choiceGroupItemsIds = '' // 选检id
      let occupDisease = '' // 职业病
      let editOccupDisease = []// 职业病编辑左侧数据
      let occupDiseaseIds = [] // 职业病id
      let occupTaboo = '' // 职业禁忌
      let editOccupTaboo = []// 职业禁忌编辑左侧数据
      let occupTabooIds = [] // 职业禁忌id
      let inquiryItem = ''// 问诊项目
      let editInquiryItem = []// 问诊项目页面显示及id
      let inquiryItemIds = [] // 问诊项目id
      let i = ''
      let j = ''
      let k = ''
      let f = ''
      if (a.length > 0) {
        for (i in a) { // 选检必检
          if (a[i].group_item !== null) {
            if (a[i].type === 1) {
              mustGroupItems += a[i].group_item.name + ','
            } else if (a[i].type === 2) {
              choiceGroupItems += a[i].group_item.name + ','
            }
            editGroupItems.push({
              type: a[i].type ? a[i].type : '',
              name: a[i].group_item.name ? a[i].group_item.name : '',
              id: a[i].group_item.id ? a[i].group_item.id : '',
            })
          } else {
            mustGroupItems = ''
            choiceGroupItems = ''
            editGroupItems = []
          }
        }
      }
      if (b.length > 0) {
        for (j in b) { // 职业病
          if (b[j].occup_disease !== null) {
            editOccupDisease.push({
              id: b[j].occup_disease.id,
              name: b[j].occup_disease.name,
            })
            occupDisease += b[j].occup_disease.name + ','
            occupDiseaseIds.push(b[j].occup_disease.id)
          } else {
            editOccupDisease = []
            occupDisease = ''
            occupDiseaseIds = []
          }
        }
      }
      if (c.length > 0) {
        for (k in c) { // 职业禁忌
          if (c[k].occup_taboo !== null) {
            editOccupTaboo.push({
              id: c[k].occup_taboo.id,
              name: c[k].occup_taboo.name,
            })
            occupTaboo += c[k].occup_taboo.name + ','
            occupTabooIds.push(c[k].occup_taboo.id)
          } else {
            editOccupTaboo = []
            occupTaboo = ''
            occupTabooIds = []
          }
        }
      }
      if (d.length > 0) {
        for (f in d) { // 问诊项目
          if (d[f].inquiry_item !== null) {
            editInquiryItem.push({
              id: d[f].inquiry_item.id,
              name: d[f].inquiry_item.name,
            })
            inquiryItem += d[f].inquiry_item.name + ','
            inquiryItemIds.push(d[f].inquiry_item.id)
          } else {
            editInquiryItem = []
            inquiryItem = ''
            inquiryItemIds = []
          }
        }
      }
      return {
        id: data.id,
        occup_harm_factor: data.occup_harm_factor !== null ? data.occup_harm_factor.name : '', // 职业危害因素名称
        occup_pe_type: data.occup_pe_type !== null ? data.occup_pe_type.name : '', // 职业体检类别
        pe_cycle: data.pe_cycle, // 检查周期
        inquiryItem: inquiryItem, // 页面显示问诊项目
        inquiryItemIds: inquiryItemIds, //
        editInquiryItem: editInquiryItem, // 问诊项目修改弹窗数据
        medical: data.medical, // 体格检查
        mustGroupItems: mustGroupItems, // 页面显示必检
        mustGroupItemsIds: mustGroupItemsIds, //
        choiceGroupItems: choiceGroupItems, // 页面显示选检
        choiceGroupItemsIds: choiceGroupItemsIds, //
        editGroupItems: editGroupItems, // 检查项目
        occup_disease: occupDisease, // 页面显示职业病
        editOccupDisease: editOccupDisease, // 职业病修改弹窗数据
        occupTaboo: occupTaboo, // 职业禁忌
        editOccupTaboo: editOccupTaboo, // 职业禁忌修改弹窗数据
        occupTabooIds: occupTabooIds, //
        // exam_basi: data.exam_basi === null ? '' : data.exam_basi.name, // 检查依据
        remark: data.remark, // 备注
        sort: data.sort, // 显示顺序（暂时）

        exam_basi_id: data.exam_basi === null ? '' : data.exam_basi.id,
        occup_harm_type_id: data.occup_harm_type_id, // 职业危害因素类别的id，需要通过id去请求危害因素名称
        occup_harm_factor_id: data.occup_harm_factor_id, // 职业危害因素id，
        occup_pe_type_id: data.occup_pe_type_id, // 职业体检类别id， 需要通过id去请求数据
        status: data.status, // 是否有效（页面不显示）
        realname: data.operater.realname, // 最后修改人
        updated_at: timeFilter(data.updated_at), // 最后修改时间
      }
    })
  },
  pageInfo: (state) => {
    return state.healthCareTable.meta
  },
  getAll: (state) => {
    return state.getAll.meta.total
  },
  harmTypes: (state) => { // 危害类别
    return state.harmTypes.items.map((data) => {
      return {
        value: data.id,
        label: data.name,

      }
    })
  },
  peTypes: (state) => { // 体检类别
    return state.peTypes.items.map((data) => {
      return {
        value: data.id,
        label: data.name,
      }
    })
  },
  harmFactors: (state) => { // 危害因素
    return state.harmFactors.items.map((data) => {
      return {
        value: data.id,
        label: data.name,
      }
    })
  },
  getIdBasisData: (state) => { // 依据标准
    return state.getIdBasisData.items.map((data) => {
      return {
        value: data.id,
        label: data.name,
      }
    })
  },
  getIdInterrogaData: (state) => { // 问诊项目
    return state.getIdInterrogaData.items.map((data) => {
      return {
        id: data.id,
        name: data.name,
      }
    })
  },
  getTaboos: (state) => { // 职业禁忌
    return state.getTaboos.items.map((data) => {
      return {
        id: data.id,
        name: data.name,
      }
    })
  },
  getOccupatDisData: (state) => { // 职业病
    return state.getOccupatDisData.items.map((data) => {
      return {
        value: data.id,
        label: data.name,
      }
    })
  },
  getIdOccDiseaseData: (state) => { // 根据职业病id获取
    return state.getIdOccDiseaseData.items.map((data) => {
      return {
        id: data.id,
        name: data.name,
      }
    })
  },
  getItemTypesList: (state) => { // 检查项目下拉筛选组合项目名称
    return state.getItemTypesList.items.map((data) => {
      return {
        value: data.id,
        label: data.name,
      }
    })
  },
  getGroupItmesSel: (state) => { // 检查项目下拉筛选组合项目名称
    return state.getGroupItmesSel.items.map((data) => {
      return {
        id: data.id,
        name: data.name,
      }
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
 */
import * as types from './healthCareTypes'
import api from '@/api'
const state = {
  occupHealthTypesList: {
    meta: {
      current_page: 0,
      total: 1,
      per_page: 20,
    },
    items: [],
  },
  occupHealthExamTypesList: {
    items: [

    ],
  },
  OccupHazardCategoryTypesList: {

  },
  OccupHazardCategoryFactorTypesList: {

  },
  OccpDiseasesTypesList: {

  },
  OccpInspectionTypesList: {

  },
  OccpContraindicationTypesList: {

  },
  InquiriesTypesList: {

  },
  OccupGroupItemsTypesList: {
  },
  OccupGroupItemsDetailsTypesList: {

  },
  /* occupRightTypesList: {
    meta: {
      pagination: {
        total: 0,
        page: 1,
        page_size: 20,
      },
    },
    items: [],
  }, */
}
const mutations = {
  [types.SET_OCCUP_HEALTH_TYPES] (state, payload) {
    state.occupHealthTypesList = payload
  },
  [types.SET_OCCUP_HEALTH_EXAM_TYPES] (state, payload) {
    state.occupHealthExamTypesList = payload
  },
  [types.SET_OCCUP_HAZARD_CATEGORY_TYPES] (state, payload) {
    state.OccupHazardCategoryTypesList = payload
  },
  [types.SET_OCCUP_HAZARD_CATEGORY_FACTOR_TYPES] (state, payload) {
    state.OccupHazardCategoryFactorTypesList = payload
  },
  [types.SET_OCCUP_DISEASE_TYPES] (state, payload) {
    state.OccpDiseasesTypesList = payload
  },
  [types.SET_OCCUP_INSPECTION_TYPES] (state, payload) {
    state.OccpInspectionTypesList = payload
    state.OccpInspectionTypesList.items.unshift({id: '', name: '无'})
  },
  [types.SET_OCCUP_CONTRAINDICATION_TYPES] (state, payload) {
    state.OccpContraindicationTypesList = payload
  },
  [types.SET_OCCUP_INQUIRIES_TYPES] (state, payload) {
    state.InquiriesTypesList = payload
  },
  [types.SET_OCCUP_GROUP_ITEMS_TYPES] (state, payload) {
    state.OccupGroupItemsTypesList = payload
  },
  [types.SET_OCCUP_GROUP_ITEMS_ITEMS_TYPES] (state, payload) {
    state.OccupGroupItemsDetailsTypesList = payload
  },
  /* requestPagingo (state, payload) {
    state.occupRightTypesList = {
      meta: {
        pagination: {
          total: 0,
          page: 1,
          page_size: 20,
        },
      },
      items: [],
    }
  }, */
}
const actions = {
  async getOccupHealthTypesList({commit}, data) {
    let result = await api.healthCare.getList(data)
    commit(types.SET_OCCUP_HEALTH_TYPES, result)
  },
  async getOccupHealthExamTypesList({commit}, data) {
    let result = await api.healthCare.getOccHealthExamTypeList(data)
    commit(types.SET_OCCUP_HEALTH_EXAM_TYPES, result)
  },
  async getOccupHazardCategoryTypesList({commit}, data) {
    let result = await api.healthCare.getOccHazardCategoryList(data)

    commit(types.SET_OCCUP_HAZARD_CATEGORY_TYPES, result)
  },
  async getOccupHazardCategoryFactorTypesList({commit}, data) {
    let result = await api.healthCare.getOccHazardCategoryFactorList(data)

    commit(types.SET_OCCUP_HAZARD_CATEGORY_FACTOR_TYPES, result)
  },
  async getOccupDiseaseList({commit}, data) {
    let result = await api.healthCare.getOccpDiseasesList(data)

    commit(types.SET_OCCUP_DISEASE_TYPES, result)
  },
  async getOccupInspectionList({commit}, data) {
    let result = await api.healthCare.getInspectionList(data)

    commit(types.SET_OCCUP_INSPECTION_TYPES, result)
  },
  async getOccupContraindicationList({commit}, data) {
    let result = await api.healthCare.getContraindicationList(data)
    commit(types.SET_OCCUP_CONTRAINDICATION_TYPES, result)
  },
  async getInquiriesList({commit}, data) {
    let result = await api.healthCare.getInquiryProjectsList(data)
    commit(types.SET_OCCUP_INQUIRIES_TYPES, result)
  },
  async getGroupItemsList({commit}, data) {
    let result = await api.healthCare.getItemClassList(data)
    commit(types.SET_OCCUP_GROUP_ITEMS_TYPES, result)
  },
  async getGroupItemsDetailsList({commit}, data) {
    let result = await api.healthCare.getGroupItemsList(data)
    commit(types.SET_OCCUP_GROUP_ITEMS_ITEMS_TYPES, result)
  },
  async adNewItemFun({commit}, data) {
    await api.healthCare.addNewItem(data)
  },
  async deletItemFun({commit}, data) {
    await api.healthCare.deletItem(data)
  },
  async amendItemFun({commit}, data) {
    await api.healthCare.amendItem(data)
  },
  /* async getOccupRightTypesList({commit}, data) {
    let result = await api.managementOccupationalDiseaseInductiveFactor.getRightList(data)
    commit(types.SET_OCCUP_RIGHT_TYPES, result)
  },
  async adNewItemFun({commit}, data) {
    await api.managementOccupationalDiseaseInductiveFactor.addNewItem(data)
  },
  async deletItemFun({commit}, data) {
    await api.managementOccupationalDiseaseInductiveFactor.deletItem(data)
  },
  async amendItemFun({commit}, data) {
    await api.managementOccupationalDiseaseInductiveFactor.amendItem(data)
  }, */
}
const getters = {
  OccupGroupItemsDetailsTypesList: (state) => {
    return state.OccupGroupItemsDetailsTypesList.items.map((item) => {
      item.item_type_name = item.item_type ? (item.item_type.name ? item.item_type.name : '') : ''
      item.group_item_id = item.id
      return item
    })
  },
  OccupGroupItemsTypesList: (state) => {
    /* let arr = [{lable: '全部', value: ''}]
    arr.concat(state.OccupGroupItemsTypesList.items.map((item) => {
      return {
        label: item.name,
        value: item.id,
      }
    })) */
    return state.OccupGroupItemsTypesList.items.map((item) => {
      return {
        label: item.name,
        value: item.id,
      }
    })
  },
  occupHealthTypesList: (state) => {
    return state.occupHealthTypesList.items.map((item) => {
      return {
        operater: item.operater,
        id: item.id,
        sort: item.sort,
        updated_at: item.updated_at,
        status: item.status,
        remark: item.remark,
        /* harm_personnel_type_id_name: (function(data) {
          switch (data) {
          case 1:
            return '接触有还化学因素工作人员'
          case 2:
            return '粉尘作业劳动者'
          case 3:
            return '接触有害物理因素作业人员'
          case 4:
            return '接触有害生物因素作业人员'
          case 5:
            return '特殊作业人员'
          default:
            return ''
          }
        })(item.harm_personnel_type_id), */
        harm_personnel_type_id: item.harm_personnel_type_id,
        occup_harm_factor_name: item.occup_harm_factor_name ? item.occup_harm_factor_name : '/',
        examination_content: item.examination_content ? item.examination_content : '/',
        occup_health_examination_type_name: item.occup_health_examination_type_name ? item.occup_health_examination_type_name : '/',
        occup_health_examination_type_id: item.occup_health_examination_type_id || '',
        occup_harm_type_id: item.occup_harm_type_id || '',
        occup_harm_factor_id: item.occup_harm_factor_id || '',
        occup_disease: item.occup_disease || [],
        occup_taboo: item.occup_taboo || [],
        /* , occupationalTaboo */
        target_disease: (function(targetOccupationalDisease, occupationalTaboo) {
          /* let targetOccupationalDiseaseStr = '目标职业病：'
          let occupationalTabooStr = '目标职业禁忌证' */
          let arritemtargetOccupationalDisease = targetOccupationalDisease.map((item) => {
            return item.occup_disease_name
          })
          let arroccupationalTaboo = occupationalTaboo.map((item) => {
            return item.occup_taboo_name
          })
          /* for (var k in arritemtargetOccupationalDisease) {
            var s = parseInt(k) + 1
            targetOccupationalDiseaseStr = targetOccupationalDiseaseStr + s + ')' + arritemtargetOccupationalDisease[k]
          } */
          /* for (var l in arroccupationalTaboo) {
            var m = parseInt(k) + 1
            occupationalTabooStr = occupationalTabooStr + m + ')' + arroccupationalTaboo[l]
          } */
          return [arritemtargetOccupationalDisease, arroccupationalTaboo]
         /*  return targetOccupationalDiseaseStr + '<br />' + occupationalTabooStr */
        })(item.occup_disease, item.occup_taboo),
        inquiry_item: (function(data) {
          if (data.length > 0) {
            return data.map((item) => { item.name = item.inquiry_item_name; return item })
          } else {
            return []
          }
        })(item.inquiry_item),
        inquiry_item_arr_name: (function(inquiryItemArr) {
          let arr = inquiryItemArr.map((item) => {
            return item.inquiry_item_name
          })
          if (arr.length) {
            return arr.join('、')
          } else {
            return '/'
          }
        })(item.inquiry_item),
        group_item: item.group_item,
        group_item_arr_name: (function(groupItemArr) {
          let nCheck = []
          let sCheck = []
          groupItemArr.map((item) => {
            if (item.type) {
              nCheck.push(item.group_item_name)
            } else {
              sCheck.push(item.group_item_name)
            }
          })
          /* if (nCheck) {
            nCheckStr = '必检项目：' + nCheck.join('、') + ';'
          } */
          /* if (sCheck) {
            sCheckStr = '选检项目：' + sCheck.join('、') + ';'
          } */
          return [nCheck, sCheck]
        })(item.group_item),
        other: (function() {
          return [item.pe_cycle, item.examination_object, item.examination_time]
        })(),
        pe_cycle: item.pe_cycle,
        examination_object: item.examination_object,
        examination_time: item.examination_time,
      }
    })
  },
  /* occupHarmTypesList: (state) => {
    console.log(state.occupHarmTypesList.items)
    return state.occupHarmTypesList.items
  }, */
  /* occupRightTypesList: (state) => {
    return state.occupRightTypesList.items.map((item) => {
      return {
        id: item.id,
        sort: item.sort,
        name: item.name,
        updated_at: item.updated_at,
        remark: item.remark,
        status: item.status,
        year: item.year,
        describe: item.describe || '/',
        affect: item.affect || '/',
        type_id: item.type_id || null,
      }
    })
  }, */
  pageInfo: (state) => {
    return state.occupHealthTypesList.meta
  },
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
