/**
* author      : 覃凤
* cteate      : 2018/03/9
* description : 个人结算主页面
*/
import method from '@/api/method'
import helper from '@/utils/helper'

export function initTable(data) { // 个人结算
  return method.get(`api/examine2/personal-order${helper.objToString(data)}`, {authorize: true})
}
export function initSettlement(data) { // 结算单
  return method.get(`api/examine2/settlements/charge/${data}`, {authorize: true})
}
