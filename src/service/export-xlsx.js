// 导出csv文件
const xlsx = require('node-xlsx')
const fs = require('fs')

// exportXlsx('套餐列表', {
//   api: api.frontAppointment.getPackages,
//   params: { fields: 'id,name,code,target' },
//   columns = [
//   {
//     key: 'id',
//     title: 'ID',
//   },
//   {
//     key: 'target',
//     title: '适用对象',
//     dict: { 0: '通用', 1: '单位', 2: '个人' },
//   },
//   {
//     key: 'name',
//     title: '套餐名称',
//   },
//   {
//     key: 'code',
//     title: '套餐编号',
//   },
// ]
// })

export default async function(saveName, { api, params = {}, columns = false, callback = false }) {
  if (!api) return

  // 选择保存目录
  let $input = document.createElement('input')
  $input.type = 'file'
  $input.setAttribute('nwsaveas', `${saveName}.xlsx`)
  $input.addEventListener('change', onChange)
  $input.click()

  async function onChange(event) {
    let savePath = $input.value

    try {
      // 获取数据
      let data = await getApiData(api, params)

      // 生成xlsx数据
      let buffer = xlsx.build([
        {
          name: 'sheet1',
          data: [
            columns.map(col => col.title),
            ...data.map(item => {
              let row = []
              for (let column of columns) {
                let value = column.key.split('.').reduce((a, b) => a[b], item)
                if (column.render) {
                  row.push(column.render(value, item))
                } else {
                  row.push(value)
                }
              }
              return row
            }),
          ],
        },
      ])
      fs.writeFileSync(savePath, buffer)
      callback(true)
    } catch (err) {
      console.error(err)
      callback(false)
    }
  }
}

// 请求所有数据
async function getApiData(api, params) {
  // 第一次请求获取总数
  const prePage = 1000
  let result = await api(Object.assign(params, { per_page: prePage }))
  if (!result.items) {
    result.items = []
  }

  // 凭借数据
  if (result && result.meta && result.meta.total > prePage) {
    let total = result.meta.total

    const count = Math.ceil(total / prePage)
    const req = []
    let curPage = 2

    for (let i = 1; i < count; i++) {
      req.push(
        api(Object.assign(params, { per_page: prePage, page: curPage++ }))
      )
    }
    let nextResult = await Promise.all(req)
    return nextResult.reduce((a, b) => a.concat(b.items), result.items)
  }

  return result.items
}
