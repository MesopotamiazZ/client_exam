<template>
<!-- style="width: 100%;height: 500px; overflow:hidden;" -->
  <div class="ihandsontable">
    <div ref="ihandsontable" :style="{display: this.width?'inline-block':'block'}"></div>
<!--     <div class="addData" @click="addClick">+</div>
 -->  </div>
</template>
<script>
/**
 * handsontable表格组件
 * @author zero
 * @date 2017/11/25
 */
import Handsontable from 'handsontable'
import customBordersInit from '@/assets/js/customBorders'

export default {
  name: 'ihandsontable',
  data () {
    return {
      hot: null,
      customBorders: null,
      tempSelectRow: null,
      tempSelectCol: null,
      addIndex: [],
    }
  },
  props: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
      default: 400,
    },
    colHeaders: {},
    columns: {},
    contextMenu: {
      default: function () {
        let that = this
        return {
          items: {
            'copy': {
              name: '复制',
              disabled: (key, options) => {
                return that.hot.getCellMeta(this.tempSelectRow, this.tempSelectCol).renderer !== 'html'
              },
            },
            'editCell': {
              name: '编辑单元格',
              callback: (key, options) => {
                // let handsontableInputHolder = document.getElementsByClassName('handsontableInputHolder')
                // let length = handsontableInputHolder.length - 1
                // console.log(handsontableInputHolder)
                let arr = that.addIndex
                if (arr.length > 0) {
                  for (let key of arr) {
                    console.log(key, arr)
                    if (this.tempSelectRow === key - 1) {
                      that.hot.selectCell(this.tempSelectRow, this.tempSelectCol)
                      that.hot.getActiveEditor().beginEditing()
                      that.hot.getActiveEditor().TEXTAREA.selectionStart = that.hot.getActiveEditor().TEXTAREA.selectionEnd
                      setTimeout(function () {
                        that.hot.getActiveEditor().TEXTAREA.focus()
                      }, 0)
                    }
                  }
                }

                // for (let i = length - 1; i >= 0; i--) {
                //   console.log(i)
                //   handsontableInputHolder[i].remove()
                // }
              },
              disabled: function() {
                return that.hot.getCellMeta(that.tempSelectRow, that.tempSelectCol).readOnly
              },
            },
            'editRow': {
              name: '修改行',
              callback: (key, options) => {
                that.handleEmit(key, that.hot.getSourceDataAtRow(that.tempSelectRow))
              },
              disabled: () => {
                return !that.editRow
              },
            },
            'deleteRow': {
              name: '删除行',
              callback: (key, options) => {
                that.handleEmit(key, that.hot.getSourceDataAtRow(that.tempSelectRow))
                if (that.addIndex.length > 0 && that.addIndex) {
                  for (let key in that.addIndex) {
                    if (that.addIndex[key] > 1) {
                      that.addIndex[key] = that.addIndex[key] - 1
                    }
                  }
                }
              },
              disabled: () => {
                return !that.editRow
              },
            },
          },
        }
      },
    },
    columnSorting: {
      type: Boolean,
      default: true,
    },
    unit: {
      default: 3,
    },
    rowHeaders: {
      default: false,
    },
    addBtn: {
      default: false,
    },
    data: {},
    editRow: {type: Boolean, default: true},
  },
  mounted () {
    let that = this
    this.hot = new Handsontable(this.$refs.ihandsontable, {
      data: this.data, // 数据
      width: this.width <= 0 ? '100%' : this.width, // 宽
      height: this.height,
      colHeaders: this.colHeaders, // 列头
      rowHeaders: this.rowHeaders, // 行头
      stretchH: 'all', // 自动扩张
      columnSorting: this.columnSorting, // 列排序
      wordWrap: false, // 不换行
      // colWidths: 100,
      rowHeights: 40, // 行高
      manualColumnResize: false, // 手动控制列宽
      // manualRowResize: true,
      customBorders: true, // 自定义边框
      // multiSelect: false,
      columns: this.columns, // 列属性
      contextMenu: this.contextMenu, // 右键菜单
      // cells: function () {
      //   console.log(arguments)
      // },
      afterChange: function (changes, source) {
        // 数据变更事件
        if (changes && this.hot && changes[0][2] !== changes[0][3] && source === 'edit' && typeof changes[0] === 'object') {
          this.handleEmit('editCell', {
            rowData: this.hot.getSourceDataAtRow(changes[0][0]),
            field: changes[0][1],
            old: changes[0][2],
            cur: changes[0][3],
          })
        }
      }.bind(this),
      afterOnCellMouseDown: function (event, coords) {
        // 选中事件
        // 取消上一次的选中框
        console.log(this.tempSelectRow, this.tempSelectCol)
        if (this.tempSelectRow !== null) {
          this.customBorders.setRowAllBorder(this.tempSelectRow, true)
        }
        // 如果单元格只读 则选中一行
        // 如果单元格
        // 如果单元格只读
        // if (this.hot.getCellMeta(coords.row, coords.col).readOnly) {
        // 选中相同的行且是鼠标左键 则取消
        if (this.tempSelectRow === coords.row && event.button === 0) {
          this.tempSelectRow = null
          this.tempSelectCol = null
          this.$emit('deSelect')
          this.hot.deselectCell()
        } else {
          this.tempSelectRow = coords.row
          this.tempSelectCol = coords.col
          this.customBorders.setRowAllBorder(this.tempSelectRow, false)
          this.$emit('selectRow', coords.row, this.hot.getSourceDataAtRow(coords.row))
          // this.hot.selectCell(coords.row, 0, coords.row, this.hot.countCols() - 1)
          let arr = that.addIndex
          this.hot.deselectCell()
          if (arr.length > 0 && arr) {
            for (let key of arr) {
              if (this.tempSelectRow === key - 1) {
                that.hot.selectCell(this.tempSelectRow, this.tempSelectCol)
                that.hot.getActiveEditor().beginEditing()
                that.hot.getActiveEditor().TEXTAREA.selectionStart = that.hot.getActiveEditor().TEXTAREA.selectionEnd
                setTimeout(function () {
                  that.hot.getActiveEditor().TEXTAREA.focus()
                }, 0)
              }
            }
          }
        }
        // } else {
        //   this.$emit('deSelect')
        // }
      }.bind(this),
      afterInit: function () {
        //
      },
    })
    if (this.addBtn) {
      let div = document.getElementsByClassName('wtHolder')
      let a = document.createElement('div')
      a.className = 'creatClass'
      a.style.border = '1px dashed #008CEE'
      a.style.height = '40px'
      a.innerHTML = '+'
      a.style.fontSize = '24px'
      a.style.color = '#008CEE'
      a.background = 'white'
      a.onclick = this.click
      div[0].appendChild(a)
    }
    this.customBorders = customBordersInit(this.hot)
    window.hot = this.hot
  },
  methods: {
    handleEmit (name, data) {
      this.$emit(name, data)
    },
    click () {
      this.hot.alter('insert_row', this.hot.countRows())
      this.addIndex.push(this.hot.countRows())
      this.$emit('addRow')
    },
    // 手动置空
    duration () {
      console.log('ddddddddd')
    },
  },
  watch: {
    data (val) {
      console.log('data', val.length)
      this.hot.loadData(val)
      if (this.tempSelectRow !== null || this.tempSelectCol !== null) {
        this.customBorders.setRowAllBorder(this.tempSelectRow, true)
        this.tempSelectRow = null
        this.tempSelectCol = null
        this.$emit('deSelect')
      }
    },
    options (val) {
      if (this.tempSelectRow) {
        this.customBorders.setRowAllBorder(this.tempSelectRow, true)
        this.tempSelectRow = null
      }
      this.hot.updateSettings(val)
    },
    columns (val) {
      this.hot.updateSettings({
        columns: this.columns,
      })
    },
    colHeaders (val) {
      this.hot.updateSettings({
        colHeaders: this.colHeaders,
      })
    },
    width (val) {
      this.hot.updateSettings({
        width: this.width || document.getElementById(this.hot.guid).parentNode.clientWidth,
      })
    },
    height (val) {
      this.hot.updateSettings({
        height: val,
      })
    },
  },
  destroyed () {
    this.hot.destroy()
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/color.less';

  .ihandsontable {
    background: #fff;
    .handsontable {
      overflow:hidden;
      .wtBorder.current {
        background-color: @gradeBlueTwo !important;
      }
      .corner {
        display: none !important;
      }
      .columnSorting:hover {
          text-decoration: none;
      }
      .handsontableInput {
        line-height: 41px;
        text-align: center;
        box-shadow: 0 0 0 2px @gradeBlueTwo inset !important;
      }
      .htCore {
        td {
          color: @gradeAshTwo !important;
          // height: 40px;
          // text-align: center;
          // vertical-align: middle;
          // border: 0;
          border-right: 1px solid @gradeAshFive;
          overflow: hidden;
          &:last-child {
            border-right: 0;
          }
          &:first-child {
            border-left: 0;
          }
          background: none;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        tr {
          &:nth-child(even) {
            background-color: @gradeBlueFive;
            td {
              border-bottom: 1px solid @gradeBlueFive;
            }
            td:first-child {
              border-left: 1px solid @gradeBlueFive;
            }
          }
          &:nth-child(odd) {
            td {
              border-bottom: 1px solid @backgourdWithe;
            }
            td:first-child {
              border-left: 1px solid @backgourdWithe;
            }
          }
        }
        tr:first-child th, tr:first-child td {
          border-top: 1px solid @gradeBlueFive !important;
        }
        tr:last-child > td {
          border-bottom: 1px solid @gradeAshFive;
        }
        th {
          height: 40px;
          vertical-align: middle;
          font-size: 12px;
          color: @gradeAshOne;
          background-color: @gradeBlueFour;
          border: 0;
          border-top: none !important;
          border-bottom: none !important;
          border-right: 1px solid @gradeAshFive;
          &:last-child {
            border-right: 0;
          }
          &:first-child {
            border-left: 0;
          }
          &ht__highlight{
            background: none;
          }
        }
      }
    }
    .handsontable tbody th.ht__highlight, .handsontable thead th.ht__highlight {
      background-color: @gradeBlueFour;
    }
  }

  .htContextMenu .htCore>colgroup>col{
      width:100px!important;
      height: 36px !important;
      border-radius: 4px;
      background: #FFFFFF;
      text-decoration: none;
      list-style: none;
  }
  .htContextMenu table tbody tr td {
    padding: 0;
  }
  .htContextMenu {
    user-select: none;
    .htItemWrapper {
      height: 36px;
      line-height: 40px;
      font-size: 14px;
    }
    .highlight {
      background-color: @gradeBlueFive !important;
    }
    table.htCore {
      border: 1px solid @gradeAshFive;
      box-shadow: 0px .5px 1px @gradeAshFive;
    }
    .wtHider, .wtHolder {
      width: 100px !important;
    }
  }
</style>
