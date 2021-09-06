/**
 * Created by Admin on 2018/2/1/001.
 */

import xlsx from 'node-xlsx'

export default {
  export(data, name, cols) {
    if (!data || !data.length) {
      return
    }
    let exportData = []
    if (cols) {
      exportData.push(cols.map((col) => {
        return col.name
      }))
      exportData = exportData.concat(data.map((row) => {
        let rowData = []
        cols.forEach((col) => {
          rowData.push(row[col.key || col.index || col._index])
        })
        return rowData
      }))
    } else {
      let keys = Object.keys(data[0])
      let headerData = []
      keys.forEach((key) => {
        headerData.push(key)
      })
      exportData.push(headerData)
      exportData = exportData.concat(data.map((row) => {
        let rowData = []
        keys.forEach((key) => {
          rowData.push(row[key])
        })
        return rowData
      }))
    }
    let buffer = xlsx.build([{
      name: name || '1',
      data: exportData,
    }])
    return new Blob([new Uint8Array(buffer)])
  },
}
