/**
* 验证
* CreatedBy 覃凤 on 2017/12/2
**/
// 判断是否为固定电话
export default (rule, value, callback, source, options) => {
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
