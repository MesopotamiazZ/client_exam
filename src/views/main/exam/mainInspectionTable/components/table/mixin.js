export default {
  methods: {
    calcTableWidth(columns) {
      let width = 0
      columns.forEach(column => {
        width += (column.width || column.minWidth || 100)
      })
      return width
    },
    setTableWidth(columns) {
      // this.parentWidth - 外框宽度, 该函数在index.vue中使用
      let width = this.calcTableWidth(columns)
      return {width: `${Math.max(this.parentWidth, width)}px`}
    },
    setColWidth(column, index, columns, isHead) {
      // this.tableWidth - 外框宽度, 该函数在table-body, table-head中使用
      if (isHead) {
        return column.width
      } else {
        if (index === columns.length - 1) {
          return column.width - 6
        } else {
          return column.width
        }
      }
    },
  },
}
