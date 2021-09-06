<template>
  <div class="itable_container" ref="itable_container" :style="{width: width && width + 'px' || '100%', height: height && height + 'px' || !maxHeight && '100%', 'max-height': !height && maxHeight > 0 && maxHeight}" :class="{multiRow: rowHeight, sizing: sizing}" @mouseout="hoverIndex = -1">
    <div class="fixedLeft" ref="fixedLeft" v-if="leftFixedColumns.length || selectMode" :style="{height: hasBottomScrollBar ? 'calc(100% - 6px)' : '100%'}">
      <div class="header" ref="leftHeader">
        <table>
          <tr :style="{height: headerHeight + 'px'}">
            <th v-for="(col, index) in leftFixedColumns" :style="{'min-width': col.minWidth + 'px', width: col.width + 'px'}">
              <span @click.stop="" v-if="col.checking > 0"><Checkbox :value="allChecked" @on-change="toggleCheckAll"></Checkbox></span>
              <cell
                v-if="col.checking !== 1"
                :content="col.name"
                :render="col.renderHeader"
                :column="col"
                :row="{_height: headerHeight}"
              ></cell>
              <div v-if="col.colResize" class="colSizer" @mousedown="colSizing($event, col)"></div>
            </th>
          </tr>
        </table>
      </div>
      <div class="body" ref="leftBody" :style="{'max-height': !height && maxHeight > 0 ? maxHeight - headerHeight - (pageInfo ? 50 : 0) - !!hasBottomScrollBar * 6 + 1 + 'px' : `calc(100% - ${headerHeight}px)`}" @mouseover="scrollBinder('leftBody', $event)">
        <table ref="leftFixedBodyTable">
          <tr v-if="rows.length" @mouseover="hoverIndex = 0" :class="{hover: hoverIndex === 0 && rowSelectable, selected: sIndex === 0 && rowSelectable}" @click="selectRow(0)">
            <td v-for="col in leftFixedColumns" :style="{'min-width': col.minWidth + 'px', width: col.width + 'px', height: rows[0]._height + 'px'}">
              <span @click.stop="" v-if="col.checking > 0"><Checkbox v-model="rows[0]._checked" @on-change="checkbox_toggle(rows[0])"></Checkbox></span>
              <cell
                v-if="col.checking !== 1"
                :content="rows[0][col.key || col.index || col._index]"
                :row="rows[0]"
                :render="col.render"
                :index="0"
                :column="col"
              ></cell>
              <div v-if="col.rowResize" class="rowSizer" @mousedown="rowSizing($event, rows[0])" @click.stop=""></div>
            </td>
          </tr>
          <tr v-if="rows.length && rows[0]._spread" ><td :colspan="leftFixedColumns.length"></td></tr>
          <template v-for="(row, index) in rows">
            <tr v-if="index" :class="{evenLine: lineColor && index % 2, hover: hoverIndex === index && rowSelectable, selected: sIndex === index && rowSelectable}" @mouseover="hoverIndex = index" @click="selectRow(index)">
              <td v-for="col in leftFixedColumns" :style="{height: row._height + 'px'}">
                <span @click.stop="" v-if="col.checking > 0"><Checkbox v-model="row._checked" @on-change="checkbox_toggle(row)"></Checkbox></span>
                <cell
                  v-if="col.checking !== 1"
                  :content="row[col.key || col.index || col._index]"
                  :row="row"
                  :render="col.render"
                  :index="index"
                  :column="col"
                ></cell>
                <div v-if="col.rowResize" class="rowSizer" @mousedown="rowSizing($event, row)" @click.stop=""></div>
              </td>
            </tr>
            <tr v-if="index && row._spread" ><td :colspan="leftFixedColumns.length"></td></tr>
          </template>
        </table>
      </div>
    </div>
    <div class="mainBlock" ref="mainBlock">
      <div class="header" ref="mainHeader">
        <table :style="{width: tableWidth + 'px'}">
          <tr :style="{height: headerHeight + 'px'}">
            <th v-if="leftFixedColumns.length || selectMode" :style="{width: leftFixedPoster && fixedLeft.offsetWidth - 1 + 'px', 'min-width': leftFixedPoster && fixedLeft.offsetWidth - 1 + 'px'}"></th>
            <th v-for="(col, index) in mainColumns" :style="{'min-width': col.minWidth - (hasRightScrollBar && index === mainColumns.length - 1 && !col.grow ? 6 : 0) + 'px', width: !col.grow && col.width - (hasRightScrollBar && index === mainColumns.length - 1 ? 6 : 0) + 'px'}">
              <span @click.stop="" v-if="col.checking > 0"><Checkbox :value="allChecked" @on-change="toggleCheckAll"></Checkbox></span>
              <cell
                v-if="col.checking !== 1"
                :content="col.name"
                :render="col.renderHeader"
                :column="col"
                :row="{_height: headerHeight}"
                :cssObj="{'margin-right': hasRightScrollBar && index === mainColumns.length - 1 && !col.grow ? '-6px' : '0'}"
              ></cell>
              <div v-if="col.colResize  && !col.grow" class="colSizer" @mousedown="colSizing($event, col)"></div>
            </th>
            <th class="rightFix" v-if="rightFixedColumns.length || !hasGrowColumn || hasRightScrollBar" :style="{[rightFixedColumns.length && !hasGrowColumn ? 'min-width' : 'width']: (rightFixedPoster && fixedRight && fixedRight.offsetWidth || 0) + !!hasRightScrollBar * 6 + 'px' || undefined}"></th>
          </tr>
        </table>
      </div>
      <div class="body" ref="mainBody" :style="{'max-height': !height && maxHeight > 0 ? maxHeight - headerHeight - (pageInfo ? 50 : 0) + 1 + 'px' : `calc(100% - ${headerHeight}px)`}" @mouseover="scrollBinder('mainBody', $event)">
        <table :style="{width: tableWidth - !!hasRightScrollBar * 6 + 'px'}" ref="mainBodyTable">
          <tr v-if="rows.length" @mouseover="hoverIndex = 0" :class="{hover: hoverIndex === 0 && rowSelectable, selected: sIndex === 0 && rowSelectable}" @click="selectRow(0)">
            <td v-if="leftFixedColumns.length || selectMode" :style="{width: leftFixedPoster && fixedLeft.offsetWidth - 1 + 'px', 'min-width': leftFixedPoster && fixedLeft.offsetWidth - 1 + 'px', height: rows[0]._height + 'px'}"></td>
            <td v-for="(col, index) in mainColumns" :style="{'min-width': col.minWidth - (hasRightScrollBar && index === mainColumns.length - 1 && !col.grow ? 6 : 0) + 'px', width: !col.grow && col.width - (hasRightScrollBar && index === mainColumns.length - 1 ? 6 : 0) + 'px', height: rows[0]._height + 'px'}">
              <span @click.stop="" v-if="col.checking > 0"><Checkbox v-model="rows[0]._checked" @on-change="checkbox_toggle(rows[0])"></Checkbox></span>
              <cell
                v-if="col.checking !== 1"
                :content="rows[0][col.key || col.index || col._index]"
                :row="rows[0]"
                :render="col.render"
                :index="0"
                :column="col"
                :cssObj="{'margin-right': hasRightScrollBar && index === mainColumns.length - 1 && !col.grow ? '-6px' : '0'}"
                :maxHeight="!rowHeightInitialized && maxInitialRowHeight || 0"
              ></cell>
              <div v-if="col.rowResize && (!autoRowHeight || maxInitialRowHeight)" class="rowSizer" @mousedown="rowSizing($event, rows[0])" @click.stop=""></div>
            </td>
            <td class="rightFix" v-if="rightFixedColumns.length || !hasGrowColumn" :style="{[rightFixedColumns.length && !hasGrowColumn ? 'min-width' : 'width']: rightFixedPoster && fixedRight && fixedRight.offsetWidth + 'px' || undefined, height: rows[0]._height + 'px'}" ></td>
          </tr>
          <tr v-if="rows.length && rows[0]._spread" class="expandRow">
            <td :colspan="mainColumns.length + !!leftFixedColumns.length + !!rightFixedColumns.length" class="expandCell">
              <justRender v-if="rows[0]._spreadRender" :render="rows[0]._spreadRender" :param="{row: rows[0]}"></justRender>
              <slot v-else-if="rows[0]._spreadSlot" :name="rows[0]._spreadSlot" :row="rows[0]" ></slot>
            </td>
          </tr>
          <template v-for="(row, index) in rows" v-if="index" >
            <tr :class="{evenLine: lineColor && index % 2, hover: hoverIndex === index && rowSelectable, selected: sIndex === index && rowSelectable}" @mouseover="hoverIndex = index" @click="selectRow(index)">
              <td v-if="leftFixedColumns.length || selectMode" :style="{height: row._height + 'px'}"></td>
              <td v-for="(col, index2) in mainColumns"  :style="{height: row._height + 'px'}">
                <span @click.stop="" v-if="col.checking > 0"><Checkbox v-model="row._checked" @on-change="checkbox_toggle(row)"></Checkbox></span>
                <cell
                  v-if="col.checking !== 1"
                  :content="row[col.key || col.index || col._index]"
                  :row="row"
                  :render="col.render"
                  :index="index"
                  :column="col"
                  :cssObj="{'margin-right': hasRightScrollBar && index2 === mainColumns.length - 1 && !col.grow ? '-6px' : '0'}"
                  :maxHeight="!rowHeightInitialized && maxInitialRowHeight || 0"
                ></cell>
                <div v-if="col.rowResize && (!autoRowHeight || maxInitialRowHeight)" class="rowSizer" @mousedown="rowSizing($event, row)" @click.stop=""></div>
              </td>
              <td class="rightFix" v-if="rightFixedColumns.length || !hasGrowColumn" :style="{height: row._height + 'px'}" ></td>
            </tr>
            <tr v-if="index && row._spread" class="expandRow">
              <td :colspan="mainColumns.length + !!leftFixedColumns.length + !!rightFixedColumns.length" class="expandCell">
                <justRender v-if="row._spreadRender" :render="row._spreadRender" :param="{row: row}"></justRender>
                <slot v-else-if="row._spreadSlot" :name="row._spreadSlot" :row="row" ></slot>
              </td>
            </tr>
          </template>
        </table>
        <div class="indicator" v-if="rowSelectable" :style="{top: indicator.top + 'px', left: indicator.left + 'px'}">
          <div class="indicatorLeft" style="top: 0; left: 0; width: 2px;" :style="{height: indicator.height + 'px'}"></div>
          <div class="indicatorRight" style="top: 0; right: 0; width: 2px;" :style="{height: indicator.height + 'px'}"></div>
          <div class="indicatorBottom" style="left: 0; width: 100%; height: 2px;" :style="{top: indicator.height - 2 + 'px'}"></div>
        </div>
      </div>
    </div>
    <div class="fixedRight" ref="fixedRight" v-if="rightFixedColumns.length" :style="{right: hasRightScrollBar ? '6px' : '0', height: hasBottomScrollBar ? 'calc(100% - 6px)' : '100%'}">
      <div class="header" ref="rightHeader">
        <table>
          <tr :style="{height: headerHeight + 'px'}">
            <th v-for="(col, index) in rightFixedColumns" :style="{'min-width': col.minWidth + 'px', width: col.width + 'px'}">
              <span @click.stop="" v-if="col.checking > 0"><Checkbox :value="allChecked" @on-change="toggleCheckAll"></Checkbox></span>
              <cell
                v-if="col.checking !== 1"
                :content="col.name"
                :render="col.renderHeader"
                :column="col"
                :row="{_height: headerHeight}"
              ></cell>
              <div v-if="col.colResize" class="colSizer" @mousedown="rightFixedColSizing($event, col)"></div>
            </th>
          </tr>
        </table>
      </div>
      <div class="body" ref="rightBody" :style="{'max-height': !height && maxHeight > 0 ? maxHeight - headerHeight - (pageInfo ? 50 : 0) - !!hasBottomScrollBar * 6 + 1 + 'px' : `calc(100% - ${headerHeight}px)`}" @mouseover="scrollBinder('rightBody', $event)">
        <table ref="rightFixedBodyTable">
          <tr v-if="rows.length" @mouseover="hoverIndex = 0" :class="{hover: hoverIndex === 0 && rowSelectable, selected: sIndex === 0 && rowSelectable}" @click="selectRow(0)">
            <td v-for="col in rightFixedColumns" :style="{'min-width': col.minWidth + 'px', width: col.width + 'px', height: rows[0]._height + 'px'}">
              <span @click.stop="" v-if="col.checking > 0"><Checkbox v-model="rows[0]._checked" @on-change="checkbox_toggle(rows[0])"></Checkbox></span>
              <cell
                v-if="col.checking !== 1"
                :content="rows[0][col.key || col.index || col._index]"
                :row="rows[0]"
                :render="col.render"
                :index="0"
                :column="col"
              ></cell>
              <div v-if="col.rowResize" class="rowSizer" @mousedown="rowSizing($event, rows[0])" @click.stop=""></div>
            </td>
          </tr>
          <tr v-if="rows.length && rows[0]._spread" ><td :colspan="rightFixedColumns.length"></td></tr>
          <template v-for="(row, index) in rows" >
            <tr v-if="index" :class="{evenLine: lineColor && index % 2, hover: hoverIndex === index && rowSelectable, selected: sIndex === index && rowSelectable}" @mouseover="hoverIndex = index" @click="selectRow(index)">
              <td v-for="col in rightFixedColumns" :style="{height: row._height + 'px'}">
                <span @click.stop="" v-if="col.checking > 0"><Checkbox v-model="row._checked" @on-change="checkbox_toggle(row)"></Checkbox></span>
                <cell
                  v-if="col.checking !== 1"
                  :content="row[col.key || col.index || col._index]"
                  :row="row"
                  :render="col.render"
                  :index="index"
                  :column="col"
                ></cell>
                <div v-if="col.rowResize" class="rowSizer" @mousedown="rowSizing($event, row)" @click.stop=""></div>
              </td>
            </tr>
            <tr v-if="index && row._spread" ><td :colspan="rightFixedColumns.length"></td></tr>
          </template>
        </table>
      </div>
    </div>
    <div class="headerRightScrollbarCover" v-if="hasRightScrollBar" :style="{width: '7px', height: headerHeight + 'px'}"></div>
  </div>
</template>
<script>
import cell from './cell.js'
import justRender from './justRender'
import funcs from './funcs'
import renders from './renders'
import excel from './excel-operation'
export default {
  name: 'itable',
  components: {
    cell,
    justRender,
  },
  props: {
    // {name, key, renderHeader 绘制表头单元格,
    // render, sort: Function|string, colResize: boolean, rowResize: boolean,
    // type 指定使用renders中预定义的render渲染,
    // amalgamate: 同列相邻相同的单元格合并,
    // spreadable: 点击单元格下方展开行,
    // checking: 当前列进入复选框状态， 0 未进入  1 当前列被替换为复选框  2 在当前列内容前加复选框 }
    // spreadSlot: 调用slot在展开行中展示
    // spreadRender 通过render渲染展开行
    // grow: Boolean 动态列宽
    // tip: Boolean 显示提示的等待时间
    // merge  Boolean
    columns: {
      type: Array,
    },
    data: {
      type: Array,
    },
    selectMode: {
      type: Boolean,
    },
    idColumn: {  // 在标记每一行是否选中时使用的标识符的键，通过此属性在每一行的数据中获取。如果没有指定此参数，则只能选中当页
      defautl: null,
    },
    selectedIndex: {
      type: Number,
    },
//    snCol: {  // 是否展示序号列
//      type: Boolean,
//    },
//     spreadX: Boolean,
//     spreadY: Boolean,
    rowSelectable: {
      type: Boolean,
      default: true,
    },
    lineColor: Boolean,
    tableName: String,
    width: Number,
    height: Number,
    maxHeight: Number,
    autoRowHeight: Boolean,
    maxInitialRowHeight: Number,
    headerHeight: {
      type: Number,
      default: 40,
    },
    rowHeight: {
      type: Number,
      default: 40,
    },
    defaultColumnWidth: {
      type: Number,
      default: 100,
    },
//    resizable: { // [boolean]  按下标指定对应的列是否可以通过拖动改变列宽
//      type: Array,
//    },
//    sortable: { //  [Function|string] 按下标指定对应列的排序方法，为空不排序
//      type: Array,
//    },
    pageInfo: Object, // {total, page, pages, page_size}
  },
  data() {
    return {
      leftFixedPoster: 0,
      rightFixedPoster: 0,
      mainColumns: [],
      rows: [],
      leftFixedColumns: [],
      rightFixedColumns: [],
      fixedLeft: null,
      fixedRight: null,
      mainBodyTable: null,
//      widthInitialized: false,
      checkMarks: null,
      startSn: 1,
      posters: {
        scrollBar: 1,
        tableWidth: 1,
        checking: 1,
        spread: 1,
      },
      scrolling: false,
      hoverIndex: -1,
      sIndex: -1,
      indicator: {
        top: -1000,
        left: 0,
        height: 0,
      },
      rowHeightAutoFix: false,
      rowHeightInitialized: false,
      componentActivated: false,
      hasGrowColumn: false,
      sizing: false,
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let columns = funcs.deepCopy(this.columns)
      this.mainColumns.length = 0
      this.leftFixedColumns.length = 0
      this.rightFixedColumns.length = 0
      columns.forEach((col, index) => {
        if (col.type) col.render = renders[col.type] || col.render
        col._index = index
        if (col.width === undefined) {
          col.width = this.defaultColumnWidth
        }
        if (col.width < col.minWidth) {
          col.width = col.minWidth
        }
        if (col.fixed === 'left') {
          this.leftFixedColumns.push(col)
        } else if (col.fixed === 'right') {
          this.rightFixedColumns.push(col)
        } else {
          this.mainColumns.push(col)
        }
      })
      if (this.leftFixedColumns.length + this.rightFixedColumns.length) this.rowHeightAutoFix = false
      else this.rowHeightAutoFix = this.autoRowHeight
      // 初始化列的同时也初始化行
      let rows = funcs.deepCopy(this.data)
      rows.forEach((row) => {
        // console.log(row, '--==')
        if (!this.rowHeightAutoFix || this.maxInitialRowHeight) row._height = this.rowHeight
        if (row._checked === undefined) row._checked = false
        if (row._spread === undefined) row._spread = false
      })
      this.rows = rows

      if (this.idColumn) this.checkMarks = {}
      else this.checkMarks = []

      this.hasGrowColumn = this.mainColumns.some((col) => col.grow)

      window.setTimeout(() => {
        this.mergeEquivalentCell()
      })
    },
//    initWidth() {
//      this.leftFixedColumns.concat(this.mainColumns).concat(this.rightFixedColumns).forEach((col) => {
//        if (col.width < col.minWidth) {
//          col.width = col.minWidth
//        }
//      })
//      let leftCols = this.$refs.fixedLeft.querySelector('tr').children
//      let mainCols = this.$refs.mainBlock.querySelector('tr').children
//      let rightCols = this.$refs.fixedRight.querySelector('tr').children
//      this.leftFixedColumns.forEach((col, index) => {
//
//      })
//      this.widthInitialized = true
//    },
    exportTable(name, filter) {
      let dataPack = excel.export(this.data.filter(filter || (() => true)), name, this.leftFixedColumns.concat(this.mainColumns).concat(this.rightFixedColumns))
      let link = document.createElement('a')
      link.download = name || '1.xlsx'
      link.href = URL.createObjectURL(dataPack)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    scrollBinder(targetName, event) {
      if (event.buttons) {
        return
      }
      let b = {
        leftBody: this.$refs.leftBody,
        mainBody: this.$refs.mainBody,
        rightBody: this.$refs.rightBody,
      }
      b.leftBody && b.leftBody.removeEventListener('scroll', this.leftBodyScroll)
      b.mainBody && b.mainBody.removeEventListener('scroll', this.mainBodyScroll)
      b.rightBody && b.rightBody.removeEventListener('scroll', this.rightBodyScroll)
      switch (targetName) {
      case 'leftBody':
        b.leftBody.addEventListener('scroll', this.leftBodyScroll)
        break
      case 'mainBody':
        b.mainBody.addEventListener('scroll', this.mainBodyScroll)
        break
      case 'rightBody':
        b.rightBody.addEventListener('scroll', this.rightBodyScroll)
        break
      }
    },
    leftBodyScroll() {
      let leftBody = this.$refs.leftBody
      let mainBody = this.$refs.mainBody
      let rightBody = this.$refs.rightBody
      let leftHeader = this.$refs.leftHeader
      try {
        mainBody && (mainBody.scrollTop = leftBody.scrollTop)
        rightBody && (rightBody.scrollTop = leftBody.scrollTop)
        leftHeader.scrollLeft = leftBody.scrollLeft
      } catch (e) {
        console.error(e)
      }
    },
    mainBodyScroll() {
      let leftBody = this.$refs.leftBody
      let mainBody = this.$refs.mainBody
      let rightBody = this.$refs.rightBody
      let mainHeader = this.$refs.mainHeader
      try {
        leftBody && (leftBody.scrollTop = mainBody.scrollTop)
        rightBody && (rightBody.scrollTop = mainBody.scrollTop)
        mainHeader.scrollLeft = mainBody.scrollLeft
        this.indicator.left = mainBody.scrollLeft
      } catch (e) {
        console.error(e)
      }
    },
    rightBodyScroll() {
      let leftBody = this.$refs.leftBody
      let mainBody = this.$refs.mainBody
      let rightBody = this.$refs.rightBody
      let rightHeader = this.$refs.rightHeader
      try {
        leftBody && (leftBody.scrollTop = rightBody.scrollTop)
        mainBody && (mainBody.scrollTop = rightBody.scrollTop)
        rightHeader.scrollLeft = rightBody.scrollLeft
      } catch (e) {
        console.error(e)
      }
    },
    selectRow(index, reselect, state) {
//      console.log('-=selectRow ', index)
      if (index >= 0 && index < this.data.length) {
        if (index === this.sIndex && !reselect && !state) {
          this.sIndex = -1
          this.indicator.top = -1000
        } else {
          this.sIndex = index
          let selectedRow = this.$refs.mainBody.children[0].rows[index + this.countExpandRow(index)]
          this.indicator.top = selectedRow.offsetTop
          this.indicator.height = selectedRow.offsetHeight
          if (!reselect) this.$emit('on-select', this.data[this.sIndex])
        }
      }
//      console.log('-=selectRow ', index, this.indicator)
    },
    colSizing(event, col) {
//      let sizer = event.srcElement
      let ox = event.pageX
      let ow = col.width < col.minWidth ? col.minWidth : col.width
      let move = (e) => {
        // console.log(e, 'move')
//        console.log('=--=-=', ox, ow, e.pageX)
        if (!this.componentActivated) return
        col.width = e.pageX - ox + ow
        window.setTimeout(() => {
          this.posters.scrollBar++
          this.$refs.mainBody.scrollLeft = this.$refs.mainHeader.scrollLeft
        })
      }
      let up = () => {
        window.removeEventListener('mousemove', move)
        window.removeEventListener('mouseup', up)
        this.sizing = false
      }
      this.sizing = true
      window.addEventListener('mousemove', move)
      window.addEventListener('mouseup', up)
    },
    rightFixedColSizing(event, col) {
      let ox = event.pageX
      let ow = col.width < col.minWidth ? col.minWidth : col.width
      let move = (e) => {
//        console.log('=--=-=', ox, ow, e.pageX)
        if (!this.componentActivated) return
        col.width = ox - e.pageX + ow
        window.setTimeout(() => {
          this.posters.scrollBar++
          this.$refs.mainBody.scrollLeft = this.$refs.mainHeader.scrollLeft
        })
      }
      let up = () => {
        window.removeEventListener('mousemove', move)
        window.removeEventListener('mouseup', up)
        this.sizing = false
      }
      this.sizing = true
      window.addEventListener('mousemove', move)
      window.addEventListener('mouseup', up)
    },
    rowSizing(event, row) {
      // console.log(row)
      let oy = event.pageY
      let oh = row._height
      console.log('-=-=', row)
      let move = (e) => {
        if (!this.componentActivated) return
        row._height = e.pageY - oy + oh
        if (this.sIndex >= 0) {
          window.setTimeout(() => {
            let selectedRow = this.$refs.mainBody.children[0].rows[this.sIndex + this.countExpandRow(this.sIndex)]
            this.indicator.top = selectedRow.offsetTop
            this.indicator.height = selectedRow.offsetHeight
          })
        }
      }
      let up = () => {
        window.removeEventListener('mousemove', move)
        window.removeEventListener('mouseup', up)
        this.sizing = false
      }
      this.sizing = true
      window.addEventListener('mousemove', move)
      window.addEventListener('mouseup', up)
    },
    toggleCheckAll() {
      // console.log(this.allChecked(col), '--==-')
      // console.log(this.allChecked(col))
      // if (this.allChecked(col)) {
      //   this.rows.forEach((row) => {
      //     console.log(row)
      //     row._checked = false
      //   })
      // } else {
      //   this.rows.forEach((row) => {
      //     console.log(row)
      //     row._checked = true
      //   })
      // }
      if (event.srcElement.checked) {
        this.rows.forEach((row) => { row._checked = true })
      } else {
        this.rows.forEach((row) => { row._checked = false })
      }
    },
    checkbox_toggle(row) {
      let checked = row._checked
      if (this.idColumn) {
        if (checked) this.checkMarks[row[this.idColumn.key || this.idColumn._index || this.idColumn.index]] = row
        else delete this.checkMarks[row[this.idColumn.key || this.idColumn._index || this.idColumn.index]]
      } else {
        if (checked) {
          if (!this.checkMarks.some((markRow) => markRow === row)) this.checkMarks.push(row)
        } else {
          let index = this.checkMarks.indexOf(row)
          if (index >= 0) this.checkMarks.splice(index, 1)
        }
      }
      // console.log(this.checkMarks, '-=-==')
    },
    countExpandRow(index) {
      // console.log('123123123123')
      let count = 0
      for (let i = 0; i < index; i++) {
        if (this.rows[i]._spread) count++
      }
      return count
    },
    expandLine(rowIndex, renderCol) {
      let row = this.rows[rowIndex]
      if (row) {
        let spreadRender
        let spreadSlot
        let spread = false
        if (renderCol instanceof Function) {
          spreadRender = renderCol
          spreadSlot = row._spreadSlot
          spread = true
        } else if (renderCol instanceof Object) {
          spreadRender = renderCol._spreadRender
          spreadSlot = renderCol._spreadSlot
          spread = true
        }
        window.setTimeout(() => {
          this.posters.scrollBar++
          if (spread) this.syncExpandHeight(rowIndex)
          this.selectRow(this.sIndex, true)
          this.mergeEquivalentCell()
        })
        if (spread) {
          row._spreadRender = spreadRender
          if (spreadSlot) row._spreadSlot = spreadSlot
        } else {
          delete row._spreadRender
          delete row._spreadSlot
        }
        row._spread = spread
        // if (renderCol instanceof Function) {
        //   row._spread = true
        //   row._spreadRender = renderCol
        // } else if (renderCol instanceof Object) {
        //   row._spread = true
        //   row._spreadRender = renderCol._spreadRender
        //   row._spreadSlot = renderCol._spreadSlot
        // } else {
        //   row._spread = false
        //   delete row._spreadRender
        //   delete row._spreadSlot
        // }
      }
    },
    syncExpandHeight(index) {
      let preExpandCount = this.countExpandRow(index)
      let height = this.$refs.mainBodyTable && this.$refs.mainBodyTable.rows[index + preExpandCount + 1].offsetHeight
      this.$refs.leftFixedBodyTable && (this.$refs.leftFixedBodyTable.rows[index + preExpandCount + 1].style.height = height + 'px')
      this.$refs.rightFixedBodyTable && (this.$refs.rightFixedBodyTable.rows[index + preExpandCount + 1].style.height = height + 'px')
    },
    initializeRowHeight() {
      if (!this.rowHeightAutoFix || this.maxInitialRowHeight) {
        if (this.rowHeightAutoFix) {
          let elRows = this.$refs.mainBodyTable.rows
          for (let i = 0, j = 0; i < elRows.length; i++) {
            if (elRows[i].className.indexOf('expandRow') === -1) {
//              console.log(elRows[i].offsetHeight, '-=-=-=')
              let actualHeight = elRows[i].offsetHeight
              this.rows[j]._height = actualHeight < this.rowHeight ? this.rowHeight : actualHeight
              j++
            }
          }
        }
//        else {
//          this.rows.forEach((row) => {
//            if (row._height === undefined) row._height = this.rowHeight
//          })
//        }
      }
//      else {
//        this.rows.forEach((row) => {
//          delete row._height
//        })
//      }
      this.rowHeightInitialized = true
    },
    windowResize() {
      this.posters.scrollBar++
    },
    mergeEquivalentCell() {
//      console.log('merge --- ')
      let left = this.$refs.leftFixedBodyTable
      let main = this.$refs.mainBodyTable
      let right = this.$refs.rightFixedBodyTable
      this.leftFixedColumns.forEach((col, index) => {
        if (!col.merge) return
        for (let rindex = 0; rindex < this.rows.length; rindex++) {
          let row = this.rows[rindex]
//          let prev = rindex && this.rows[rindex - 1][col.key || col.index || col._index]
          let cur = row[col.key || col.index || col._index]
          let prevSpreadNum = this.countExpandRow(rindex + 1) || 0
          let cellEl = left.rows[rindex + prevSpreadNum].cells[index]
          let spanVal = 1
          cellEl.style.cssText = cellEl.style.cssText.replace(/display:\s*none;/g, '')
          for (let i = rindex + 1; i < this.rows.length; i++, rindex++) {
            if (this.rows[i][col.key || col.index || col._index] === cur && !this.rows[i - 1]._spread) {
              left.rows[i + prevSpreadNum].cells[index].style.display = 'none'
              spanVal++
            } else {
              break
            }
          }
          if (spanVal > 1) cellEl.setAttribute('rowspan', String(spanVal))
          else cellEl.removeAttribute('rowspan')
        }
      })
      let offset = ~~!!this.leftFixedColumns.length
      this.mainColumns.forEach((col, index) => {
        if (!col.merge) return
        for (let rindex = 0; rindex < this.rows.length; rindex++) {
          let row = this.rows[rindex]
//          let prev = rindex && this.rows[rindex - 1][col.key || col.index || col._index]
          let cur = row[col.key || col.index || col._index]
          let prevSpreadNum = this.countExpandRow(rindex) || 0
          let cellEl = main.rows[rindex + prevSpreadNum].cells[index + offset]
          let spanVal = 1
          cellEl.style.cssText = cellEl.style.cssText.replace(/display:\s*none;/g, '')
          for (let i = rindex + 1; i < this.rows.length; i++, rindex++) {
//            console.log(this.rows[i - 1]._spread, '====')
            if (this.rows[i][col.key || col.index || col._index] === cur && !this.rows[i - 1]._spread) {
              main.rows[i + prevSpreadNum].cells[index].style.display = 'none'
              spanVal++
            } else {
              break
            }
          }
          if (spanVal > 1) cellEl.setAttribute('rowspan', String(spanVal))
          else cellEl.removeAttribute('rowspan')
        }
      })
      this.rightFixedColumns.forEach((col, index) => {
        if (!col.merge) return
        for (let rindex = 0; rindex < this.rows.length; rindex++) {
          let row = this.rows[rindex]
//          let prev = rindex && this.rows[rindex - 1][col.key || col.index || col._index]
          let cur = row[col.key || col.index || col._index]
          let prevSpreadNum = this.countExpandRow(rindex) || 0
          let cellEl = right.rows[rindex + prevSpreadNum].cells[index]
          let spanVal = 1
          cellEl.style.cssText = cellEl.style.cssText.replace(/display:\s*none;/g, '')
          for (let i = rindex + 1; i < this.rows.length; i++, rindex++) {
            if (this.rows[i][col.key || col.index || col._index] === cur && !this.rows[i - 1]._spread) {
              right.rows[i + prevSpreadNum].cells[index].style.display = 'none'
              spanVal++
            } else {
              break
            }
          }
          if (spanVal > 1) cellEl.setAttribute('rowspan', String(spanVal))
          else cellEl.removeAttribute('rowspan')
        }
      })
    },
    test(p) {
      console.log('=== pass ===', p)
      return true
    },
  },
  computed: {
    allChecked() {
      this.posters.checking
      try {
        this.rows.forEach((row) => {
          if (!row._checked) {
            throw new Error()
          }
        })
      } catch (e) {
        return false
      }
      return true
    },
    hasBottomScrollBar() {
      let rightBarWidth = !!(this.$refs.mainBody && this.$refs.mainBody.offsetHeight < this.$refs.mainBody.scrollHeight) * 6
      return this.posters.scrollBar && this.$refs.mainBody && this.$refs.mainBody.offsetWidth < this.$refs.mainBody.scrollWidth + rightBarWidth
//      this.posters.scrollBar
//      let mainBody = this.$refs.mainBody
//      if (mainBody) {
//        let sleft = mainBody.scrollLeft
//        mainBody.scrollLeft = sleft + 1
//        let result = sleft !== mainBody.scrollLeft
//        let sleft2 = mainBody.scrollLeft
//        mainBody.scrollLeft = sleft2 - 1
//        result = result || sleft2 !== mainBody.scrollLeft
//        mainBody.scrollLeft = sleft
//        return result
//      }
    },
    hasRightScrollBar() {
      let bottomBarWidth = !!(this.$refs.mainBody && this.$refs.mainBody.offsetWidth < this.$refs.mainBody.scrollWidth) * 6
//      this.$refs.mainBody && console.log('-=-===', this.$refs.mainBody.offsetHeight, this.$refs.mainBody.scrollHeight, bottomBarWidth)
//      console.log(this.posters.scrollBar && this.$refs.mainBody && this.$refs.mainBody.offsetHeight < this.$refs.mainBody.scrollHeight + bottomBarWidth)
      return this.posters.scrollBar && this.$refs.mainBody && this.$refs.mainBody.offsetHeight < this.$refs.mainBody.scrollHeight + bottomBarWidth
//      this.posters.scrollBar
//      let mainBody = this.$refs.mainBody
//      let sleft = mainBody.scrollLeft
//      mainBody.scrollLeft = sleft + 1
//      let result = sleft !== mainBody.scrollLeft
//      let sleft2 = mainBody.scrollLeft
//      mainBody.scrollLeft = sleft2 - 1
//      result = result || sleft2 !== mainBody.scrollLeft
//      mainBody.scrollLeft = sleft
//      return result
    },
    tableWidth() {
      let width = 0
      1 && [...this.leftFixedColumns, ...this.rightFixedColumns].forEach((col) => {
        if (col.width < col.minWidth) {
          width += col.minWidth
//          console.log('--', col.minWidth)
        } else {
          width += col.width
//          console.log('--', col.width)
        }
      })
      this.mainColumns.forEach((col) => {
        if (col.grow) {
          if (col.minWidth) width += col.minWidth
        } else {
          if (col.width < col.minWidth) {
            width += col.minWidth
          } else {
            width += col.width
          }
        }
      })
//      console.log('-=-=-=-=', width)
      return width + 1
    },
//    rowMergeLen(index, col) {
//      console.log(col, '-=-=-=-=-=')
//      let len = 1
//      let refer = this.rows[0][col.key || col.index || col._index]
//      for (let i = index + 1; i < this.rows.length; i++) {
//        if (this.rows[i][col.key || col.index || col._index] === refer) len++
//        else break
//      }
//      return len
//    },
  },
  watch: {
    columns() {
      this.init()
//      if (this.data.length) {
//        window.setTimeout(() => {
//          this.initWidth()
//        })
//      } else {
//        this.widthInitialized = false
//      }
    },
    data: {
      handler(val) {
        let rows = funcs.deepCopy(val)
        rows.forEach((row) => {
          if (row._height === undefined) row._height = this.rowHeight
          if (row._checked === undefined) {
            if (this.idColumn) {
              if (this.checkMarks[row[this.idColumn.key || this.idColumn._index || this.idColumn.index]]) row._checked = true
              else row._checked = false
            } else {
              if (this.checkMarks.some((markRow) => markRow === row)) row._checked = true
              else row._checked = false
            }
          }
          if (row._spread === undefined) row._spread = false
        })
        rows.forEach((row) => {
          if (this.rowHeightAutoFix && !this.maxInitialRowHeight) {
            delete row._height
          }
        })
        this.rows = rows
        this.indicator.top = -1000

        window.setTimeout(() => {
          this.mergeEquivalentCell()
        })
      },
      deep: true,
    },
    selectedIndex(val) {
      this.sIndex = val
    },
    height(val) {
      window.setTimeout(() => {
        this.posters.scrollBar++
      })
    },
    maxHeight(val) {
      window.setTimeout(() => {
        this.posters.scrollBar++
      })
    },
  },
  mounted() {
    this.fixedLeft = this.$refs.fixedLeft
    this.fixedRight = this.$refs.fixedRight
    this.mainBodyTable = this.$refs.mainBodyTable
    this.leftFixedPoster++
    this.rightFixedPoster++
//    if (this.data.length) {
//      this.initWidth()
//    }
    let pageInfo = this.pageInfo
    if (pageInfo) {
      this.startSn = pageInfo.page * pageInfo.page_size + 1
    }
    window.setTimeout(() => {
      this.posters.scrollBar++
      this.selectRow(this.selectedIndex)
      window.setTimeout(() => {
        this.initializeRowHeight()
      })

      this.mergeEquivalentCell()
//      window.addEventListener('click', () => {
//        1 && [...elRows].forEach((r) => {
//          console.log('===', r.offsetHeight)
//        })
//      })
//      this.rowHeightInitialized = true
    })

    // window.setTimeout(() => {
    //   this.rows.forEach((row) => {
    //     row._checked = true
    //   })
    // }, 3000)

//    let rowHeight = this.rowHeight
//    1 && [...this.$refs.itable_container.querySelectorAll(':not(.header) table tr')].forEach((tr) => {
//      tr.style.height = rowHeight + 'px'
//      tr.children[0].style.height = rowHeight + 'px'
//    })

//    Object.defineProperty(this, 'rowHeight', {
//      configurable: true,
//      enumerable: true,
//      writable: true,
//      value: this.rowHeight,
//    })
//    window.setInterval(() => {
//      this.rowHeight += 2
//    }, 400)
//    console.log('--=', this)
//    let leftBody = this.$refs.leftBody
//    let mainBody = this.$refs.mainBody
//    leftBody.addEventListener('scroll', this.leftBodyScroll)
//    mainBody.addEventListener('scroll', this.mainBodyScroll)
    // TODO 将 minfontLen 换算为 minWidth
    this.componentActivated = true
  },
  activated() {
    if (!this.componentActivated) {
      window.addEventListener('resize', this.windowResize)
    }
    this.componentActivated = true
  },
  deactivated() {
    window.removeEventListener('resize', this.windowResize)
    this.componentActivated = false
  },
}
</script>
<style lang="less" scoped>

  /* dev */
  /*.itable_container{*/

  /*}*/
  /* ------------- */

  *{
    box-sizing: border-box;
  }
  table{
    border-collapse: collapse;
    text-align: center;
    td,th{
      border: 1px solid #DBDCDD;
      position: relative;
      /*overflow: hidden;*/
      & > *{
        /*overflow: hidden;*/
      }
    }
    th{
      background-color: #D7E9FF;
    }
    td{
      overflow: hidden;
    }
    tr{
      /*height: 40px;*/
      background-color: white;
    }
    tr.evenLine{
      background-color: #F2F7FF;
    }
    tr.hover{
      background-color: #DFF0FF;
    }
    tr.selected{
      background-color: #DFF0FF;
    }
  }
  .itable_container.sizing{
    -webkit-user-select: none;
    *{
      -webkit-user-select: none;
    }
  }
  .itable_container{
    position: relative;
    .header{
      overflow: hidden;
    }
    .fixedLeft{
      position: absolute;
      z-index: 1;
      left: 0;
      top: 0;
      height: 100%;
      .body{
        overflow-x: auto;
        overflow-y: auto;
      }
      .body::-webkit-scrollbar{
        display: none;
      }
    }
    .mainBlock{
      position: relative;
      height: 100%;
      .body{
        overflow: auto;
        position: relative;
        .indicator{
          position: absolute;
          left: 0;
          width: 100%;
          z-index: 2;
          background-color: #008CEE;
          height: 2px;
          div{
            position: absolute;
            background-color: #008CEE;
          }
        }
        .expandCell{
          position: relative;
          z-index: 2;
          background-color: white;
        }
      }
      .rightFix{
        border-left: none;
        border-right: none;
      }
      .body::-webkit-scrollbar{
        width: 6px;
      }
      .body::-webkit-scrollbar-thumb{
        width: 6px;
      }
      table{
        min-width: 100%;
      }
    }
    .fixedRight{
      position: absolute;
      z-index: 1;
      top: 0;
      height: 100%;
      .body{
        overflow-x: auto;
        overflow-y: auto;
      }
      .body::-webkit-scrollbar{
        display: none;
      }
      .colSizer{
        left: -3px;
      }
    }
    .colSizer{
      position: absolute;
      width: 5px;
      height: 100%;
      top: 0;
      right: -3px;
      z-index: 1;
      cursor: col-resize;
    }
    .rowSizer{
      position: absolute;
      height: 3px;
      width: 100%;
      left: 0;
      bottom: 0;
      z-index: 1;
      cursor: row-resize
    }
    .headerRightScrollbarCover{
      background-color: #D7E9FF;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1;
      border-right: 1px solid #DBDCDD;
      border-top:  1px solid #DBDCDD;
    }
  }
  .ivu-checkbox-wrapper{
    margin-right: 0;
  }
</style>
