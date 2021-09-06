// 岗位管理 xk
import method from '@/api/method'
import helper from '@/utils/helper'

export function getPosts(p) {
  return method.get(`api/baseinfo/jobs${helper.objToString(p)}`, {authorize: true})
}
export function getPostsParent(id) {
  return method.get(`api/baseinfo/jobs/${id}`, {authorize: true})
}
export function addPosts(p) {
  return method.post(`api/baseinfo/jobs`, p, {authorize: true})
}
export function editPosts(p) {
  return method.put(`api/baseinfo/jobs/${p.id}`, p, {authorize: true})
}
export function deletePosts(p) {
  return method.del(`api/baseinfo/jobs?ids=${p}`, {authorize: true})
}
