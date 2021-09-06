/*
*检测项目列表(单个项目管理)
*@author 覃凤
*@date 2017/11/27
* */
export const SET_ALL_REQ = 'getAllReq' // 一起请求单个项目中项目类别和适用体检类别
export const GET_XMLB = 'getXmlb' // 请求项目类别
export const GET_TJLB = 'getTjlb' // 请求体检类别
export const SET_INIT_ALL_REQ = 'getInitAllReq' // 批量请求加载进入时左侧和右侧所有数据（获得sort）
export const SET_INIT_DEL_ALL_REQ = 'getInitDelAllReq' // 批量请求删除三级菜单

export const SET_SINGLE_LEFT_ALL = 'setSingleftAll' // 左侧所有数据

// export const SET_SINGLE_TYPES_L = 'setSingleTypesL' // 单个项目左侧分类

// export const SET_SINGLE_TAB = 'setSingleTypesL' // 二级右侧tab切换

export const SET_SINGLE_TYPES_SEARCHLEV = 'setSingleTypesLev3' // 左侧树形点击请求子菜单数据

export const SET_SINGLE_COUNT_R = 'setSingleCountR' // 单个项目右侧加载进入的数据

export const SET_SINGLE_ALL_COUNT_R = 'setSingleAllCountR' // 单个项目右侧加载所有

export const SET_SINGLE_RIGHT_DATA = 'setSingleRightData' // 左侧三级菜单选择右侧对应数据
export const SET_SINGLE_RIGHT_DATA_DES = 'setSingleRightDataDes' // 左侧三级菜单选择右侧对应数据(描述型)
export const SET_SINGLE_RESLUT_DATA = 'setSingleResult' // 新增单项结果
// export const SET_SINGLE_TYPESEARCH = 'setSingleTypeSearch' // 单个项目左侧筛选右侧数据
export const SET_SINGLE_EDIT = 'setSingleEdit' // 单个项目右侧数据编辑
export const SET_SINGLE_ADD = 'setSingleAdd' // 新增单个项目
export const SET_SINGLE_TABLE_SELECT = 'setSingleTableSel' // 点击表格下拉

export const RESET = 'resetSingle' // 重置
// export const SET_SINGLE_DELETE = 'setDelSingle' // 删除项目
// export const SET_SINGLE_SEARCH = 'setSingleSearchAll' // 模糊查询搜索

