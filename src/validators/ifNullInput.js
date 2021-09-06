/**
* 验证
* CreatedBy 覃凤 on 2017/12/2
**/
// 判断是否为空
export default (rule, value, callback, source, options) => {
  let errors = []
  let numValue = value
  if (numValue === '' || numValue === null || numValue === undefined) {
    errors.push('必填项')
  } else {
    errors.push('*')
  }
  callback(errors)
}
