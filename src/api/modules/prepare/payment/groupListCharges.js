/**
* @author 覃凤
* @date 2018/03/10
* @content 团体收费清单
*/
import method from '@/api/method'
import helper from '@/utils/helper'
export function initTable(data) {
  return method.get(`api/examine/order-counts${helper.objToString(data)}`, {authorize: true})
}
