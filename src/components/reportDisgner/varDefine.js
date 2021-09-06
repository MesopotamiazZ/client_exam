
export default [
  {
    name: '日期',
    key: 'date',
    type: 'single',    // single | list | table
    param: [
      {
        name: 'min',
        required: false,
        check: (val) => true,
        value: '',
      }
    ],
    // fetcher() {
    //   let date = new Date()
    //   return date.getFullYear() + '-' + (date.getMonth + 1) + '-' + date.getDate()
    // },
  },
  {
    name: '姓名',
    key: 'name',
    type: 'single',
    // fetcher() {
    //   return '张三'
    // },
  },
  {
    name: '单位体检员工信息表',
    key: 'stuff',
    type: 'table',
    cols: [
      {
        name: '姓名',
        key: 'name',
      },
      {
        name: '体检号',
        key: 'sn',
      },
      {
        name: '性别',
        key: 'gender',
      },
    ],
  }
]
