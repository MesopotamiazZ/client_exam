/**
 * @author ljl
 * @date 2018/03/07
 * @content 预约管理
 */

import methods from '@/api/method'
import helper from '@/utils/helper'

export function getOrderManagement(params) {
  return methods.get(`/api/examine2/appointments${helper.objToString(params)}`, {
    authorize: true,
  })
}
