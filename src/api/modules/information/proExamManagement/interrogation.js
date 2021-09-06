import method from '@/api/method'

// 项目
export function projectPost (pid) {
  return method.post(`api/baseinfo/occup-diseases`, {}, {authorize: true})
}
export function projectGet (key) {
  return key ? method.get(`api/baseinfo/occup-diseases/?key=` + key, {authorize: true}) : method.get(`api/baseinfo/occup-diseases`, {authorize: true})
}
export function dropdownGet(pid) { // 获取分类
  return method.get(`api/baseinfo/occup-disease-types`, {authorize: true})
}

export function newAddPost(pid) {
  return method.post(`api/baseinfo/occup-diseases`, pid, {authorize: true})
}
export function newAddget(pid) { // 左侧栏 搜索
  return method.get(`api/baseinfo/occup-diseases/?disease_type_id=` + pid, {authorize: true})
}
export function changAddPut(pid, key) { // 修改分类
  return method.put(`api/baseinfo/occup-diseases/${pid}`, key, {authorize: true})
}
export function dropdownPost(pid) { // 新增分类
  return method.post(`api/baseinfo/occup-disease-types`, pid, {authorize: true})
}
export function dropdownDelet(key) { // 删除 数组 []
  return method.del(`api/baseinfo/occup-diseases?ids=` + key, {authorize: true})
}
export function getSelectOption(key) { // 获取复查项目的数组
  return method.get(`api/baseinfo/reexam-items?per_page=100000&filters=status:1`, {authorize: true})
}
