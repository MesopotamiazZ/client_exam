/**
 * Created wzd
 * Date: 2017/11/29/
 * Time: 13:20
 * content: 项目类别
 *  * Created 刘洋
 * Date: 2017/12/19/
 * Time: 16:25
 */
import method from '@/api/method'
import helper from '@/utils/helper'

export function getProjectCategoryList (params) { // 获取项目类别
  // console.log(2)
  return method.get(`api/baseinfo/item-types${helper.objToString(params)}`, {authorize: true})
}

export function addProjectCategoryList (params) { // 增加项目类别管理
  // console.log(6)
  // console.log(params)
  return method.post(`api/baseinfo/item-types`, params, {authorize: true})
}

export function updateProjectCategoryList (params) { // 修改项目类别
  return method.put(`api/baseinfo/item-types/` + params.id, params.data, {authorize: true})
}
// 根据id删除
export function delProjectCategoryList(params) {
  // post请求要将请求参数放到请求体中
  // console.log('params')
  // console.log(params)
  return method.del(`api/baseinfo/item-types${helper.objToString(params)}`, {authorize: true})
}
