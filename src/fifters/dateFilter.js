import moment from 'moment'
/**
 * 过滤器
 * Created by ljl on 2018/03/06.
 */
// 时间戳格式器
export default (value, format = 'YYYY-MM-DD') => {
  return moment.unix(parseInt(value)).format(format)
}
