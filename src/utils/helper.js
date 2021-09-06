// const crypto = require('crypto')

export default {
  // md5,
  copy,
  arrayPk,
  pkArray,
  getDotData,
  arrayColumn,
  isEqual,
  mapGetValue,
  merge,
  trimFun,
  replaceSpaceDeep,
  handleJsonStringArr,
  getObjNature,
  stringToObj,
  objToString,
  IsExpression,
  returnNumberAndPoint,
  getAge,
  retainedDecimal,
}

// MD5加密
// author: zero
// function md5 (str = '') {
//   let result = ''
//   let md5sum = crypto.createHash('md5')
//   md5sum.update(str)
//   result = md5sum.digest('hex')
//   return result
// }

/**
 * 基础方法
 * Created by 黄伟 on 2017/11/20.
 */
import lodash from 'lodash'
/* eslint-disable no-useless-escape */

// 只能输入数字和小数点 和小数点两位
export function returnNumberAndPoint(str) {
  console.log(str, 'sterrrrrrrrrrrrrrrrrrrrrrrrrrrr')
  let a = str
    .replace(/[^\d\.]/g, '')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
  let result = a.toString().indexOf('.')
  let b
  if (result !== -1) {
    b = a.substring(0, a.indexOf('.') + 3)
    return b
  }
  return a
}
// 获取object 里的的数据，避免保错
export function getDotData(object, dotString, defaultValue = undefined) {
  return lodash.get(object, dotString, defaultValue)
}

// 根据点语法设置值
export function setDotData(object, path, value) {
  lodash.set(object, path, value)
}

// 数组转化为主键对象
export function arrayPk(arr = [], id = 'id') {
  let refer = {}
  for (let v of arr) {
    refer[v[id]] = v
  }
  return refer
}

// 主键对象转化为数组
export function pkArray(obj) {
  let refer = []
  for (let k in obj) {
    refer.push(obj[k])
  }
  return refer
}

// 拷贝数组或对象
export function copy(value, deep = false) {
  if (deep) {
    return lodash.cloneDeep(value)
  }
  return lodash.clone(value)
}

// copy alias
export function clone(value, deep = false) {
  return copy(value, deep)
}

// 判断复杂对象是否相等
export function isEqual(value, other) {
  return lodash.isEqual(value, other)
}

// array_column
export function arrayColumn(arr, key) {
  let temp = []
  arr.forEach(v => {
    temp.push(v[key])
  })
  return temp
}

// 深度克隆一个vue对象
export function deepCloneNodes(vnodes, createElement) {
  function cloneVNode(vnode) {
    const clonedChildren =
      vnode.children && vnode.children.map(vnode => cloneVNode(vnode))
    const cloned = createElement(vnode.tag, vnode.data, clonedChildren)
    cloned.text = vnode.text
    cloned.isComment = vnode.isComment
    cloned.componentOptions = vnode.componentOptions
    cloned.elm = vnode.elm
    cloned.context = vnode.context
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key
    return cloned
  }
  const clonedVNodes = vnodes.map(vnode => cloneVNode(vnode))
  return clonedVNodes
}

// 将map 转化为值
export function mapGetValue(object) {
  if (Array.isArray(object)) {
    let temp = []
    for (let value of object) {
      temp.push(mapGetValue(value))
    }
    return temp
  } else {
    let temp = {}
    const isObject = lodash.isObjectLike(object)
    if (isObject) {
      for (let key in object) {
        let objectValue = object[key]
        if (lodash.isObjectLike(objectValue) && !/Map$/.test(key)) {
          temp[key] = mapGetValue(objectValue)
        } else {
          if (/Map$/.test(key)) {
            const value = getDotData(objectValue, 'value')
            if (value !== null || value !== undefined) {
              temp[key.replace(/Map$/, '')] = value
              delete temp[key]
            }
          } else {
            temp[key] = objectValue
          }
        }
      }
    } else {
      temp = object
    }
    return temp
  }
}

// 对象合并
export const merge = lodash.merge

// 删除一条数据
export function delArr(arr, index) {
  console.log(arr, index, 'delete')
  if (arr.length > 1) {
    arr.splice(index, 1)
  }
}

// [{value: '', text: ''}, ...] 形式转化为map
export function valueMapText(arr) {
  let temp = new Map()
  arr.forEach(v => {
    temp.set(v.value, v.text)
  })
  return temp
}

// 替换null 为 ''空
export function replaceNullDeep(object) {
  if (Array.isArray(object)) {
    let temp = []
    for (let value of object) {
      temp.push(replaceNullDeep(value))
    }
    return temp
  } else {
    let temp = {}
    const isObject = lodash.isObjectLike(object)
    if (isObject && object) {
      for (let k in object) {
        temp[k] = replaceNullDeep(object[k])
      }
    } else {
      temp = object === null ? '' : object
    }
    return temp
  }
}

// 格式一下导出excel json
export function formatExcelJson(arr, header) {
  let temp = []
  let row = []
  for (let k in header) {
    row.push(header[k])
  }
  temp.push(row)
  arr.forEach(v => {
    let row = []
    for (let k in header) {
      row.push(getDotData(v, k))
    }
    temp.push(row)
  })
  return temp
}
// 过滤掉数据中的null、undefined
export function trimFun(object) {
  if (Array.isArray(object)) {
    for (let item of object) {
      if (!lodash.isObjectLike(object) && !Array.isArray(object)) {
        item = lodash.trim(item)
      } else {
        trimFun(item)
      }
    }
  } else {
    if (lodash.isObjectLike(object)) {
      for (let key in object) {
        if (!lodash.isObjectLike(object[key]) && !Array.isArray(object[key])) {
          object[key] = lodash.trim(object[key])
        } else {
          trimFun(object[key])
        }
      }
    }
  }
  return object
}
// 过滤掉对象内字符串内的空格
export function replaceSpaceDeep(obj) {
  for (let k in obj) {
    if (lodash.isString(obj[k])) {
      obj[k] = lodash.trim(obj[k])
    }
  }
  return obj
}

// 用户token
/* export function getToken () {
  return dotData(store.get(loginUserKey), 'token')
}
 */
// 将一个json 字符串转化未 数组
export function handleJsonStringArr(str) {
  if (Array.isArray(str)) {
    return str
  }
  if (str) {
    try {
      let arr = JSON.parse(str)
      if (Array.isArray(arr)) {
        return arr
      } else {
        console.error('不是一个可转化为数组的json串：' + str)
      }
    } catch (e) {
      console.error(e)
    }
  }
  return []
}
// 对象数组对象数组的格式 获取其中的某个属性, 以数组的形式return
function getObjNature(obj, name) {
  let arr = []
  for (var key in obj) {
    for (var i = 0; i < obj[key].length; i++) {
      if (obj[key][i].name) {
        arr.push(obj[key][i].name) // 存入属性
      } else {
        getObjNature(obj[key]) // 递归遍历
      }
    }
  }
  if (arr.length > 0) {
    return arr
  } else {
    return '没有这个属性'
  }
}
// 对象转为字符串  访问请求时用
function objToString(obj) {
  let str = '?'
  for (let item in obj) {
    str = str + item + '=' + obj[item] + '&'
  }
  let strs = str.substring(0, str.length - 1)
  return strs
}

// 字符串转为对象  访问请求时用

function stringToObj(str) {
  let strs = str.substring(1, str.length)
  let arr = strs.split('&')
  let newObj = {}
  arr.forEach(v => {
    let itemm = v.split('=')
    let a = itemm[0]
    let b = itemm[1]
    newObj[a] = b
  })
  return newObj
}
// 正则判断表达式的正确性
function IsExpression(str) {
  str = str.replace(/\s/g, '')

  if (str === '') {
    return false
  }
  if (/[\+\-\*\/]{2,}/.test(str)) {
    return false
  }
  var stack = []
  for (var i = 0, item; i < str.length; i++) {
    item = str.charAt(i)
    if (item === '(') {
      stack.push('(')
    } else if (item === ')') {
      if (stack.length > 0) {
        stack.pop()
      } else {
        return false
      }
    }
  }
  if (stack.length !== 0) {
    return false
  }
  if (/\([\+\-\*\/]/.test(str)) {
    return false
  }
  if (/[\+\-\*\/]\)/.test(str)) {
    return false
  }
  if (/[^\+\-\*\/]\(/.test(str)) {
    return false
  }
  if (/\)[^\+\-\*\/\)\(]/.test(str)) {
    return false
  }
  if (/^[\+\-\*\/]/.test(str)) {
    return false
  }
  if (/[\+\-\*\/]$/.test(str)) {
    return false
  }
  return true
}

// 获取年龄
function getAge(strBirthday) {
  var returnAge
  var strBirthdayArr = strBirthday.split('-')
  var birthYear = strBirthdayArr[0]
  var birthMonth = strBirthdayArr[1]
  var birthDay = strBirthdayArr[2]

  var d = new Date()
  var nowYear = d.getFullYear()
  var nowMonth = d.getMonth() + 1
  var nowDay = d.getDate()

  if (nowYear === birthYear) {
    returnAge = 0 // 同年 则为0岁
  } else {
    var ageDiff = nowYear - birthYear // 年之差
    if (ageDiff > 0) {
      if (nowMonth === birthMonth) {
        var dayDiff = nowDay - birthDay // 日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        var monthDiff = nowMonth - birthMonth // 月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
    }
  }

  return returnAge // 返回周岁年龄
}
// 保留2位小数
function retainedDecimal(floatvar) {
  var fX = parseFloat(floatvar)
  if (isNaN(fX)) {
    return '0.00'
  }
  fX = Math.round(fX * 100) / 100
  var sX = fX.toString()
  var posDecimal = sX.indexOf('.')
  if (posDecimal < 0) {
    posDecimal = sX.length
    sX += '.'
  }
  while (sX.length <= posDecimal + 2) {
    sX += '0'
  }
  return sX
}
