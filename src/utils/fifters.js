// 过滤器
import Vue from 'vue'
import moment from 'moment'

let fifters = {}

for (let key in fifters) {
  Vue.filter(key, fifters[key])
}

/**
 * 过滤器
 * Created by 黄伟 on 2017/11/29.
 */
// 时间戳格式器
export function timeFilter(value, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment.unix(parseInt(value)).format(format)
}

// unix时间戳格式器
export function unixTimeFilter (value, format = 'YYYY-MM-DD HH:mm:ss') {
  if (moment(parseInt(value)).format(format) === '不是一个正确时间') {   // 格式不对直接返回值
    return value
  } else {
    return moment(parseInt(value)).format(format)
  }
}
// 是否 状态过滤器
export function isTrueFilter (value) {
  switch (value) {
  case '1' : return true
  case 1 : return true
  case '0' : return false
  case 0 : return false
  }
}
// 男女状态
export function sexFilter (value) {
  switch (value) {
  case '1' : return '男'
  case 1 : return '男'
  case '0' : return '女'
  case 0 : return '女'
  default : return '未知'
  }
}

/**
* 验证
* CreatedBy 覃凤 on 2017/12/2
**/
// 判断是否为空
export function ifNullInput (rule, value, callback, source, options) {
  let errors = []
  let numValue = value
  if (numValue === '' || numValue === null || numValue === undefined) {
    errors.push('必填项')
  } else {
    errors.push('*')
  }
  callback(errors)
}

// 判断是否为正整数
export function ifNumberInput (rule, value, callback, source, options) {
  let errors = []
  let numValue = value
  // console.log(value)
  let isNum = /^\d*$/
  if (numValue === '' || numValue === null || numValue === undefined) {
    errors.push('必填项')
  } else {
    if (isNum.test(Number(numValue))) {
      errors.push('*')
    } else {
      errors.push('请输入数字')
    }
  }
  callback(errors)
}
// 判断是否为小数
export function ifNumberFloatInput (rule, value, callback, source, options) {
  let errors = []
  let numValue = value
  console.log(value)
  let isNum = /^(-?\d+)(\.\d+)?$/
  if (numValue === '' || numValue === null || numValue === undefined) {
    errors.push('必填项')
  } else {
    if (isNum.test(Number(numValue))) {
      errors.push('*')
    } else {
      errors.push('请输入数字')
    }
  }
  callback(errors)
}

 // 判断是否为手机号
export function ifPhoneNum (rule, value, callback, source, options) {
  let errors = []
  let numValue = Number(value)
  let phoneTest = /^1[3|4|5|7|8][0-9]{9}$/
  if (numValue === '' || numValue === null || numValue === undefined || numValue === 0) {
    errors.push('必填项')
  } else {
    if (!phoneTest.test(numValue)) {
      errors.push('请输入正确的手机号码')
    } else {
      errors.push('*')
    }
  }
  callback(errors)
}

 // 判断是否为身份证号
export function ifIdNum (rule, value, callback, source, options) {
  let errors = []
  let numValue = Number(value)
  // 15或18位
  let phoneTest = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
  if (numValue === '' || numValue === null || numValue === undefined || numValue === 0) {
    errors.push('必填项')
  } else {
    if (!phoneTest.test(numValue)) {
      errors.push('请输入正确的身份证号')
    } else {
      errors.push('*')
    }
  }
  callback(errors)
}

 // 判断是否为固定电话
export function ifFamilyPhoneNum (rule, value, callback, source, options) {
  let errors = []
  let numValue = Number(value)
  let phoneTest = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
  if (numValue === '' || numValue === null || numValue === undefined || numValue === 0) {
    errors.push('必填项')
  } else {
    if (!phoneTest.test(numValue)) {
      errors.push('请输入正确的固定电话')
    } else {
      errors.push('*')
    }
  }
  callback(errors)
}

export default {
  timeFilter,
  unixTimeFilter,
  ifPhoneNum,
  ifIdNum,
  ifFamilyPhoneNum,
  ifNumberInput,
  ifNullInput,
  ifNumberFloatInput,
  isTrueFilter,
  sexFilter,
}
