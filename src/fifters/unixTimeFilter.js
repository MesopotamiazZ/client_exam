import moment from 'moment'
/**
 * 过滤器
 * Created by 黄伟 on 2017/11/29.
 */
// unix时间戳格式器
export default (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (moment(parseInt(value)).format(format) === '不是一个正确时间') {   // 格式不对直接返回值
    return value
  } else {
    return moment(parseInt(value)).format(format)
  }
}
