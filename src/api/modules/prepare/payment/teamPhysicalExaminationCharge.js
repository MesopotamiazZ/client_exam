/**
* author      : 覃凤
* cteate      : 2018/03/19
* description : 单位结算
*/
import method from '@/api/method'
import helper from '@/utils/helper'

export function initTable(data) { // 单位结算
  // return method.get(`api/examine2/unit-order?filters=settlement_method:1;`, {authorize: true})
  return method.get(`api/examine2/unit-order${helper.objToString(data)}`, {authorize: true})
}
