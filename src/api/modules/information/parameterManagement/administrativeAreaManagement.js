/*
* 基本信息-参数管理-行政区域管理
* @author 肖康
* @date 2017/12/1
*/

import method from '@/api/method'
import helper from '@/utils/helper'

export function getAdminAreaList(p) {
  return p ? method.get(`api/baseinfo/districts${helper.objToString(p)}`, { authorize: true }) : method.get(`api/baseinfo/districts`, { authorize: true })
}
export function getAdminAreaParent(id) {
  return method.get(`api/baseinfo/districts/${id}`, { authorize: true })
}

export function addAdminArea(p) {
  return method.post('api/baseinfo/districts', p, { authorize: true })
}

export function editAdminArea(p) {
  return method.put(`api/baseinfo/districts/${p.id}`, p, { authorize: true })
}

export function delAdminArea(p) {
  return method.del(`api/baseinfo/districts?ids=${p.ids}`, { authorize: true })
}
