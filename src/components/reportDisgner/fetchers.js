export default {
  date() {
    let date = new Date()
      return date.getFullYear() + '-' + (date.getMonth + 1) + '-' + date.getDate()
  },
  name() {
    return '张三'
  },
}
