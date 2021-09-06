/**
* 验证
* CreatedBy 覃凤 on 2017/12/2
**/
// 判断是否为正整数
export default (rule, value, callback, source, options) => {
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
