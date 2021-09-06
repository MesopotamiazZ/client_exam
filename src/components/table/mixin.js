export default {
  methods: {
    alignCls (column, row = {}) {
      let cellClassName = ''
      if (row.cellClassName && column.key && row.cellClassName[column.key]) {
        cellClassName = row.cellClassName[column.key]
      }
      return [
        {
          [`${cellClassName}`]: cellClassName,    // cell className
          [`${column.className}`]: column.className,    // column className
          [`${this.prefixCls}-column-${column.align}`]: column.align,
          [`${this.prefixCls}-hidden`]: (this.fixed === 'left' && column.fixed !== 'left') || (this.fixed === 'right' && column.fixed !== 'right') || (!this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right')),
        },
      ]
    },
    isPopperShow (column) {
      return column.filters && ((!this.fixed && !column.fixed) || (this.fixed === 'left' && column.fixed === 'left') || (this.fixed === 'right' && column.fixed === 'right'))
    },
    setCellWidth (column, index, top, dataLength) {
      let restWidth = this.$parent.tableWidth - this.columns.map((col) => { return col.minWidth || col.width || 0 }).reduce((a, b) => a + b, 50)
      if (~~restWidth <= 0) {
        restWidth = 0
      }
      let autoCount = 0
      let lastIndex = 0
      for (let i = 0; i < this.columns.length; i++) {
        let thisCol = this.columns[i]
        if (thisCol.minWidth !== undefined || thisCol.width === undefined) {
          lastIndex = i
          autoCount++
        }
      }
      let width = ''
      if (column.minWidth !== undefined || column.width === undefined) {
        let thisIndex = this.columns.findIndex((col) => col === column)
        if (thisIndex === lastIndex) {
          return {}
        } else {
          width = ~~column.minWidth + Math.floor(restWidth / autoCount)
        }
      } else if (column.width !== undefined) {
        width = column.width
      }
      /* else if (this.columnsWidth[column._index]) {
        column.width = width = this.columnsWidth[column._index].width
      } */
      // console.log('width', width, this.columnsWidth)
      // when browser has scrollBar,set a width to resolve scroll position bug
      // 无滚动条，表头的最后一列加滚动条宽度
      if (this.columns.length === index + 1 && top && this.$parent.bodyHeight !== 0 && dataLength !== 0 && !this.$parent.ifHasScroll()) {
        width += this.$parent.scrollBarWidth
      }
      // when fixed type,reset first right fixed column's width
      // 有滚动条时，非右固定列的最后列宽减去滚动条宽度
      if (this.columns.length === index + 1 && !top && this.$parent.bodyHeight !== 0 && dataLength !== 0 && this.$parent.ifHasScroll()) {
        width -= this.$parent.scrollBarWidth
      }

      // 右固定表格列宽
      // if (this.fixed === 'right') {
        // const firstFixedIndex = this.columns.findIndex((col) => col.fixed === 'right')
        // if (firstFixedIndex === index) width += this.$parent.scrollBarWidth
      // }

      // if (width === '0') width = ''
      // column.width && !void console.log('width', column.width) || column.minWidth && void console.log('minWidth', column.minWidth)

      // console.log({
      //   [column.minWidth !== undefined ? 'min-width' : 'width']: width + 'px',
      // })

      // return {
      //   [column.minWidth !== undefined ? 'min-width' : 'width']: width + 'px',
      // }
      return {width: width + 'px'}
    },
    // 删除每行倒数第二列单元格右边框
    setRightBorder(column, columns) {
      let style = {}
      if (columns.length - 2 === column._index && this.$parent.ifEdit) {
        style['border-right'] = 'none'
      } else {
        style['border-right-width'] = '1px'
      }
      return style
    },
  },
}
