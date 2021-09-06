/**
 * Created yhy
 * Date: 2018/03/05/
 * content:单位体检接口地址
 */
import method from '@/api/method'
import helper from '@/utils/helper'

// 获取单位列表
export function getExamineUnits(params) {
  return method.get(`api/examine/units${helper.objToString(params)}`, {authorize: true})
}

// 获取某单位下所有员工
export function getExamineUnitStaff(params) {
  return method.get(`api/examine/unit-staff${helper.objToString(params)}`, {authorize: true})
}
// export function getOnePersonal(params) { // 选中单行查询这一条信息
//   // console.log(params.id)
//   return method.get(`api/examine/physical-examines/` + params.id, {authorize: true})
// }
// export function updateOnePersonal (params) { // 修改一行的数据
//   return method.put(`api/baseinfo/physical-examines/` + params.id, params, {authorize: true})
// }
// export function getOneCustomer(params) { // 选中名字查询个人信息
//   // console.log(params.id)
//   return method.get(`api/examine/physical-examines/` + params.id + `/customer`, {authorize: true})
// }
// export function getVipAccount(params) { // vip账户变动记录表vip_card_num
//   return method.get(`api/examine/vip/change-records${helper.objToString(params)}`, {authorize: true})
// }
// export function initAmendOrder(params) { // 修改订单数据请求
//   return method.get(`api/examine/physical-examines/${params}/detail`, {authorize: true})
// }

// export function phyExaminPro() { // 修改体检项目
//   return method.get(`api/baseinfo/group-items?per_page=100000&filters=status:1`, {authorize: true})
// }
// export function commitPhyExaminPro(params, data) { // 修改订单提交
//   return method.put(`api/examine/physical-examines/${params}/detail`, data, {authorize: true})
// }
