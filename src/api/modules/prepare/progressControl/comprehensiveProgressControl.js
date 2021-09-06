/**
 * @author ljl
 * @date 2018/03/07
 * @content 体检进度综合管理
 */

import methods from '@/api/method'
import helper from '@/utils/helper'

export function getOrderManagement(params) {
  return methods.get(`/api/examine2/pe-routines${helper.objToString(params)}`, {
    authorize: true,
  })
}
