import method from '@/api/method'

// 项目
export function projectGet (key) {
  return key ? method.get(`api/baseinfo/dust-chests?key=` + key, {authorize: true}) : method.get(`api/baseinfo/dust-chests`, {authorize: true})
}
export function projectGetOne (key) {
  return method.get(`api/baseinfo/dust-chests/` + key, {authorize: true})
}
export function projectput (data) { // 右侧数据编辑
  return method.put(`api/baseinfo/dust-chest/` + data.valuesid + `/arguments`, {value: data.values}, {authorize: true})
}
export function projectdel (data) { // 删除
  console.log(data, 'data')
  return method.del(`api/baseinfo/dust-chest/` + data.id + `/arguments?ids=` + data.valuesid, {authorize: true})
}
export function projectadd(data) { // 添加
  return method.post(`api/baseinfo/dust-chest/` + data.id + `/arguments`, {value: data.value}, {authorize: true})
}
export function projectaddLeft(data) { // 添加
  console.log(data, 'dataaaaaaaaaaaaa')
  return method.post(`api/baseinfo/dust-chests`, {name: data}, {authorize: true})
}
