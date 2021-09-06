import moment from 'moment'
/**
 * 过滤器
 * Created by 黄伟 on 2017/11/29.
 */
// 时间戳格式器
export default (value, format = 'YYYY-MM-DD HH:mm') => {
  return moment.unix(parseInt(value)).format(format)
}
