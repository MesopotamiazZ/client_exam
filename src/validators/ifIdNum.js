/**
 * 验证
 * CreatedBy 覃凤 on 2017/12/2
 **/
// 判断是否为身份证号
export default (rule, value, callback, source, options) => {
  let errors = []
  let numValue = Number(value)
  // 15或18位
  let phoneTest = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
  if (
    numValue === '' ||
    numValue === null ||
    numValue === undefined ||
    numValue === 0
  ) {
    errors.push('必填项')
  } else {
    if (!phoneTest.test(numValue)) {
      errors.push('请输入正确的身份证号')
    }
  }
  callback(errors)
}
