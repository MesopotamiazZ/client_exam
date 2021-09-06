
// 判断是否为企业税号
export default (rule, value, callback, source, options) => {
  let errors = []
  let numValue = value
  let checkTax = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/
  if (numValue === '' || numValue === null || numValue === undefined || numValue === 0) {
    errors.push('必填项')
  } else {
    if (!checkTax.test(numValue)) {
      errors.push('请输入正确的识别号')
    } else {
      errors.push('*')
    }
  }
  callback(errors)
}
