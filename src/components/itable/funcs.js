/**
 * Created by Admin on 2018/1/24/024.
 */
export default {
  deepCopy: function (data) {
    const t = typeof data
    let o

    if (t === 'object') {
      if (data instanceof Array) {
        o = []
      } else {
        o = {}
      }
    } else {
      return data
    }

    if (t === 'array') {
      for (let i = 0; i < data.length; i++) {
        o.push(this.deepCopy(data[i]))
      }
    } else if (t === 'object') {
      for (let i in data) {
        o[i] = this.deepCopy(data[i])
      }
    }
    return o
  },
}
