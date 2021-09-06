import method from '@/api/method'

/**
 * 健康档案
 * @author 黄伟
 * @date 2017/02/11
 */
// get 健康档案
export function basicInformationGet (id, key) {
  // let a = 10
  // valid key
  // detailInfo,menstrualHist,marriageHist,birthHist,lifeHist,liveEnviron,rationalSymptom,radWorkOccupHist,medicalHist,occupHist,familyHist,heredityist
  if (key) {
    if (typeof key === 'string') key = [key]
    if (key.length) {
      return method.get(`/api/ha/health-archives/${id}?with=${key.join(',')}`, {authorize: true})
    } else {
      return method.get(`/api/ha/health-archives/${id}`, {authorize: true})
    }
  } else {
    return method.get(`/api/ha/health-archives/${id}?with=detailInfo,menstrualHist,marriageHist,birthHist,lifeHist,liveEnviron,rationalSymptom,radWorkOccupHist,medicalHist,occupHist,familyHist,heredityist`, {authorize: true})
  }
}
export function basicInformationPut (key) {
  console.log(typeof key)
  let a = 10
  return method.put(`/api/ha/health-archives/${a}`, key, {authorize: true})
}
// 个人生活史
export function personalLifeHistoryPut (key) {
  return method.put(`/api/ha/life-hists`, key, {authorize: true})
}
// 生活环境史
export function personalLifeEnvironsPut (key) {
  return method.put(`/api/ha/live-environs`, key, {authorize: true})
}
// 月经
export function menstruationPut (key) {
  return method.put(`/api/ha/menstrual-hists`, key, {authorize: true})
}
// 获取职业病下拉选择
export function diseaseGet (key) {
  return method.get(`/api/baseinfo/occup-diseases?disease_type_id=${key}&filters=status:1`, {authorize: true})
}

//  获取疾病史 的下拉选择
export function medicalGet () {
  return method.get(`/api/baseinfo/disease-abns?filters=is_add_history,status:1`, {authorize: true})
}
// 修改既往史 等
export function previousPost (key) {
  return method.post(`/api/ha/medical-hists`, key, {authorize: true})
}
// 遗传病 等
export function geneticDiseasePost (key) {
  return method.post(`/api/ha/heredity-hists`, key, {authorize: true})
}
// 家族史 等
export function familyPost (key) {
  return method.post(`/api/ha/family-hists`, key, {authorize: true})
}
// 婚姻史 等
export function marriagePost (key) {
  return method.post(`/api/ha/marriage-hists`, key, {authorize: true})
}
//   照射源
export function irradiationGet (key) {
  return method.get(`/api/baseinfo/irradiation-sources?filters=source:${key},status:1`, {authorize: true})
}
//   照射源
export function irradiationNameGet (key) {
  return method.get(`/api/baseinfo/irradiation-sources?filters=source:${key.id}&search=${key.name},status:1`, {authorize: true})
}
// 放射工作史
export function irradiationPost (key) {
  return method.post(`/api/ha/rad-work-occup-hists`, key, {authorize: true})
}
// 放射工作史
export function irradiationPut (key) {
  return method.put(`/api/ha/rad-work-occup-hists/${key.id}`, key, {authorize: true})
}
// 删除放射工作史
export function irradiationDel (key) {
  return method.del(`/api/ha/rad-work-occup-hists?ids=${key.id}`, {authorize: true})
}
// 工种的下拉框
export function craftGet (key) {
  return method.get(`/api/baseinfo/occup-types?per_page=100000&filters=status:1`, {authorize: true})
}
// 危害因素
export function harmGet (key) {
  return method.get(`/api/baseinfo/occup-harm-types?per_page=100000&filters=status:1`, {authorize: true})
}
// 根据危害因素ID 去查
export function harmWithGet (key) {
  return method.get(`/api/baseinfo/occup-harm-factors?filters=type_id:${key},status:1`, {authorize: true})
}
// 职业史提交
export function occupationalPost (key) {
  return method.post(`/api/ha/occup-hists`, key, {authorize: true})
}
export function harmWithNameGet (key) {
  return method.get(`/api/baseinfo/occup-harm-factors?filters=type_id:${key.id}&search=${key.name}&search_fields=name,status:1`, {authorize: true})
}
export function occupationalPut (key) {
  return method.put(`/api/ha/occup-hists/${key.id}`, key, {authorize: true})
}
// 删除职业史
export function occupationalDel (key) {
  return method.del(`/api/ha/occup-hists?ids=${key.id}`, {authorize: true})
}
// 添加生育
export function birthPost (key) {
  return method.post(`/api/ha/birth-hists`, key, {authorize: true})
}
