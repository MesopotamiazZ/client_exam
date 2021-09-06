 /**
 * 过滤器
 * Created by 黄伟 on 2017/12/20.
 */
// 四舍五入格式数据
export default function(value, num = 2) {
  let _test = /^-?\d+(\.\d*)?$/.test(value)
  if (_test) {
    const _number = parseFloat(value)
    return _number.toFixed(num)
  }
  return value
}
