/**
 * 过滤器
 * Created by 覃凤 on 2017/01/11.
 */
// 身份证号格式器
export default (value) => {
  let dataArray = value.split('')
  let newIdNum = ''
  let i = ''
  dataArray.splice(parseInt(dataArray.length) - 4, 4, '****')
  for (i in dataArray) {
    newIdNum += dataArray[i]
  }
  return newIdNum
}
