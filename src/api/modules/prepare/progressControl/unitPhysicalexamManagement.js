/**
 * @author jyl wzd
 * @date 2018/03/7
 * @content 单位体检订单管理
 */

import methods from '@/api/method'
import helper from '@/utils/helper'

// 获取从业行业列表unitPhysicalexamManagement
export function getUnitPhysicalexamManagement(params) {
  return methods.get(`/api/examine2/unit-order${helper.objToString(params)}`, {
    authorize: true,
  })
}

// 获取单位订单详情
export function getUnitPhysicalexamOrderDetail(params) {
  return methods.get(`/api/examine2/unit-order/info/${params.id}`, {
    authorize: true,
  })
}

// 获取单个单位所有订单
export function getUnitAllOrder(params) {
  return methods.get(`http://192.168.1.193/api/examine2/unit-order/${params.id}`, {authorize: true})
}

