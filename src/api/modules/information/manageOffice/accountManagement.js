/**
  * 账户管理
  * 张祥
  * @date 2018/3/13
  */
 import method from '@/api/method'
 import helper from '@/utils/helper'

// 获取账户列表
 export function getAccountList(data) {
   if (data) {
     return method.get(`api/baseinfo/staff-accounts${helper.objToString(data)}`, {authorize: true})
   } else {
     return method.get('api/baseinfo/staff-accounts?per_page=100000&filters=status:1', {authorize: true})
   }
 }
// 获取账户详情
 export function getAccountInfo(id, data) {
   if (data) {
     return method.get(`api/baseinfo/staff-accounts/${id}${helper.objToString(data)}`, {authorize: true})
   } else {
     return method.get('api/baseinfo/staff-accounts/' + id, {authorize: true})
   }
 }
 // 新增账户
 export function addAccount(data) {
   return method.post(`api/baseinfo/staff-accounts`, data, {authorize: true})
 }
// 修改账户
 export function updateAccount(params) {
   return method.put(`api/baseinfo/staff-accounts/` + params.id, params.data, {authorize: true})
 }
 // 删除账户
 export function delAccount(params) {
   return method.del(`api/baseinfo/staff-accounts${helper.objToString(params)}`, {authorize: true})
 }
// 获取职员列表
 export function getStaffList(data) {
   if (data) {
     return method.get(`api/baseinfo/staffs${helper.objToString(data)}`, {authorize: true})
   } else {
     return method.get('api/baseinfo/staffs?per_page=100000&filters=status:1', {authorize: true})
   }
 }
