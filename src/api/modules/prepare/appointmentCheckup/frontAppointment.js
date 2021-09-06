/**
 * @author wzd
 * @date 2018/02/23
 * @content 前台预约主页面
 */

import methods from '@/api/method'
import helper from '@/utils/helper'

// 获取套餐列表
export function getPackages(params) {
  if (params) {
    return methods.get(`/api/baseinfo/packages${helper.objToString(params)}`, {
      authorize: true,
    })
  }
  return methods.get(`/api/baseinfo/packages`, { authorize: true })
}

// // 获取套餐内的组合
// export function getPackageGroupItems(id, params) {
//   return methods.get(`/api/baseinfo/packages/${id}/group-items${helper.objToString(params)}`, {
//     authorize: true,
//   })
// }

// 获取组合项目
export function getGroupItems(params) {
  return methods.get(`/api/baseinfo/group-items${helper.objToString(params)}`, {
    authorize: true,
  })
}

// 获取从业行业列表
export function getIndustrys(params) {
  return methods.get(`/api/baseinfo/industrys${helper.objToString(params)}`, {
    authorize: true,
  })
}

// 获取工种列表
export function getOccupTypes(params) {
  return methods.get(`/api/baseinfo/occup-types${helper.objToString(params)}`, {
    authorize: true,
  })
}

// 获取职业健康检查种类
export function getOccupHealthExaminationTypes(params) {
  return methods.get(
    `/api/baseinfo/occup-health-examination-types${helper.objToString(params)}`,
    {
      authorize: true,
    }
  )
}

// 获取职业病危害因素列表
export function getOccupHarmFactors(params) {
  return methods.get(
    `/api/baseinfo/occup-harm-factors${helper.objToString(params)}`,
    {
      authorize: true,
    }
  )
}

// 获取费用类别列表
export function getChargeCategories(params) {
  return methods.get(
    `/api/baseinfo/charge-categories${helper.objToString(params)}`,
    {
      authorize: true,
    }
  )
}

// 获取用户预约信息
export function getHistoricalOrders(params) {
  return methods.get(
    `api/examine2/historical-orders${helper.objToString(params)}`,
    {
      authorize: true,
    }
  )
}
// 修改套餐、项目和附加费

// 登记用户预约信息

// 加入复检项目

// 加入必检、选检项目

// 上传头像

// 获取单位部门
export function getUnitDepts(params) {
  return methods.get(`api/examine/unit-depts${helper.objToString(params)}`, { authorize: true })
}
