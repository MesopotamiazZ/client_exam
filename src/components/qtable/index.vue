<template>
  <div class="custom-defined-table"
       ref="custom_defined_table">
    <custom-defined-table ref="table"
                          :pop="pop"
                          :data="data"
                          :columns="dealColumns"
                          :height="tableHeight"
                          :isBorder="isBorder"
                          :accordion="accordion"
                          :tableContentWidth="tableWidth"
                          stripe
                          @scroll="$emit('scroll', $event)"
                          @contextmenu.native.prevent="contextmenu"
                          @mousedown.native="buttonRight(null, $event)"
                          @edit-row="editRow"
                          @button-right="buttonRight"
                          :row-class-name="selectHighlight"
                          @on-expand="onExpand"
                          @on-filter-change="onFilterChange"
                          @on-sort-change="onSortChange"
                          @on-current-change="onCurrentChange"
                          @on-select="selectRow"
                          @on-select-cancel="selectRowCancel"
                          @on-select-all="selectRowAll"
                          @on-selection-change="changeSelection"
                          @on-row-click="clickRow"
                          @on-row-dblclick="dbClickRow"
                          @mousemove.native="mousemove"
                          @on-selection-value="onselectionvalue"
                          @on-selection-all-value="selectionAllValue"
                          :fixedRightWidth="fixedRightWidth"></custom-defined-table>
    <!-- 鼠标右键菜单 -->
    <z-context-menu :contextMenuData="contextMenuData"
                    @copy="copy"
                    @editRow="editRow"
                    @deleteRow="deleteRow"
                    @getDistance="getDistance"></z-context-menu>
    <!-- 页码组件开始 -->
    <div class="z-table-page-box"
         v-if="ifShowPagination">
      <!-- <div class="z-page-mask" v-if="selectMode"></div> -->
      <Page placement="top"
            show-sizer
            show-total
            :total="pageInfo.total"
            :current="pageInfo.current_page"
            :page-size="pageSize"
            :page-size-opts="pageSizeOpts"
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange">
      </Page>
    </div>
    <!-- 页码组件结束 -->
  </div>
</template>

<script>
// import expandRow from './expandRow'
// import operate from './operate'
import customDefinedTable from './table'
import zContextMenu from '@/components/tools/zContextmenu'
import { mapActions } from 'vuex'

export default {
  name: 'q-table',
  components: {
    customDefinedTable,
    zContextMenu,
  },
  props: {
    // 控制整个表格是否开启气泡功能
    pop: {
      type: Boolean,
      default: true,
    },
    // 表格数据
    data: {
      type: Array,
      default() {
        return []
      },
    },
    // 表格列名
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    // 显示或隐藏序号整列
    isShowSelectOrIndex: {
      type: Boolean,
      default: true,
    },
    // 切换编辑模式
    selectMode: {
      type: Boolean,
      default: false,
    },
    requestDataApi: {
      type: Function,
      default: null,
    },
    // 分页的
    ifShowPagination: {
      type: Boolean,
      default: true,
    },
    initReq: {
      type: Boolean,
      default: true,
    },
    params: {
      type: Object,
    },
    pageInfo: {
      type: [Array, Object],
      default() {
        return {
          total: 0,
          current_page: 1,
          per_page: 20,
        }
      },
    },
    pageSizeOpts: {
      type: Array,
      default: () => [20, 30, 50, 100],
    },
    // 勾选是否有框
    isBorder: {
      type: Boolean,
      default: false,
    },
    // 是否关联多行,在点击行有框边框的时候使用
    isRelatedMulti: {
      type: Boolean,
      default: false,
    },
    // 是否显示操作列
    showOperateColumn: {
      type: Boolean,
      default: true,
    },
    // 操作列是否固定
    isFixedOperateColumn: {
      type: Boolean,
      default: true,
    },
    accordion: {
      type: Boolean,
      default: false,
    },
    // 表格高度
    height: {
      type: [Number, String],
      default: 150,
    },
    width: {
      type: [Number],
    },
    // 点击行是否触发勾选事件
    rowClickRelation: {
      type: Boolean,
      default: true,
    },
    // 操作列是否有复制按钮
    hasOperateCopy: {
      type: Boolean,
      default: false,
    },
    // 自定义操作列
    customOperationLine: {
      type: [Object, Array],
      default() {
        return {}
      },
    },
    fixedRightWidth: {
      type: Number,
      default: 70,
    },
  },
  data() {
    const that = this
    return {
      tableHeight: 0,
      tableWidth: this.width,
      activated: false,
      // 右键菜单数据
      contextMenuData: {
        menuName: `table`,
        axios: {
          x: null,
          y: null,
        },
        menulists: [
          {
            fnHandler: 'copy',
            btnName: '复制',
            className: '',
            disabled: false,
          },
          {
            fnHandler: 'editRow',
            btnName: '编辑行',
            className: '',
            disabled: false,
          },
          {
            fnHandler: 'deleteRow',
            btnName: '删除行',
            className: '',
            disabled: false,
          },
        ],
      },
      x: null,
      y: null,
      totalPage: 0,
      sortField: {
        name: null,
        order: null,
      },
      timeField: {},
      filters: {},
      // 分页的
      page: this.pageInfo.current_page,
      pageSize: this.pageInfo.per_page,
      tempCopyData: null,
      currentArray: [],
      devideArray: [],
      // checkArray: [],
      rclickData: null,
      rEvent: {},
      rIndex: {},
      // 操作列
      editIcon: '/static/icons/public/table-hover-edit.svg', // 编辑
      delIcon: '/static/icons/public/table-hover-del.svg', // 删除
      editBanIcon: '/static/icons/public/table-edit.svg', // 编辑
      delBanIcon: '/static/icons/public/table-del.svg', // 删除
      copyIcon: '/static/icons/public/copy.svg', // 复制
      copyBanIcon: '/static/icons/public/copy-disable.svg', // 复制
      operateColumn: {
        title: '操作',
        key: 'operate',
        width: that.hasOperateCopy ? 90 : 70,
        fixed: that.isFixedOperateColumn ? 'right' : '',
        render: (h, params) => {
          // if (this.numberType.data.length > 0) {
          return h('div', [
            that.hasOperateCopy &&
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '13px',
                  height: '13px',
                  'margin-right': '10px',
                  'margin-left': '5px',
                  background: `url(${this.selectMode ? this.copyBanIcon : this.copyIcon})`,
                },
                on: {
                  click: event => {
                    event.stopPropagation()
                    if (this.selectMode) {
                      return
                    }
                    this.$emit('copy', params.row, params.index, params.column)
                  },
                },
              }),
            h('span', {
              style: {
                display: 'inline-block',
                width: '12px',
                height: '13px',
                'margin-right': '10px',
                'margin-left': '5px',
                background:
                  'url(' +
                  (this.selectMode ? this.editBanIcon : this.editIcon) +
                  ') no-repeat',
              },
              on: {
                click: event => {
                  event.stopPropagation()
                  if (this.selectMode) {
                    return
                  }
                  console.log('编辑')
                  this.$emit('edit', params.row, params.index, params.column)
                },
              },
            }),
            !params.row.is_std &&
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '12px',
                  height: '13px',
                  background:
                    'url(' +
                    (this.selectMode ? this.delBanIcon : this.delIcon) +
                    ') no-repeat',
                },
                on: {
                  click: event => {
                    event.stopPropagation()
                    if (this.selectMode) {
                      return
                    }
                    this.$emit(
                      'delete',
                      params.row,
                      params.index,
                      params.column,
                    )
                  },
                },
              }),
          ])
          // }
        },
      },
      // 序号-多选列
      indexSelectColumn: {
        title: '序号',
        key: 'indexSelect',
        width: 50,
        renderHeader(h, params) {
          if (that.selectMode) {
            let data = Object.values(that.$refs.table.objData)
            let selectNumber = data.filter(data => {
              return data._isChecked
            }).length
            return h('Checkbox', {
              style: {
                'margin-right': 0,
              },
              on: {
                'on-change'(status) {
                  that.$refs.table.selectAll(status)
                },
              },
              props: {
                value: !data.some(data => data._isChecked !== true),
                indeterminate: selectNumber !== 0 && selectNumber < data.length,
              },
            })
          }
          return h('div', '序号')
        },
        render(h, params) {
          if (that.selectMode) {
            return h('Checkbox', {
              style: {
                'margin-right': 0,
              },
              props: {
                value: that.$refs.table.objData[params.index]._isChecked,
              },
              nativeOn: {
                click() {
                  that.$refs.table.toggleSelect(params.index)
                },
              },
            })
          }
          return h(
            'div',
            (that.currentPage - 1) * that.pageSize + params.index + 1,
          )
        },
      },
      currentPage: 1,
      allSelection: [], // 存放所有页选择的数据
      clickedRows: {}, // 点击的行
    }
  },
  methods: {
    // rowClassName (index) {
    //   if (index % 2) {
    //     return 'select-event-style'
    //   } else {
    //     return 'select-odd-style'
    //   }
    // },
    // 右键菜单
    exportCsv() {
      this.$refs.table.exportCsv({
        filename: '自定义表格',
        columns: this.columns,
        data: this.data7,
      })
    },
    contextmenu(event) {
      let target = event.target
      while (target.nodeName !== 'TD' && target.nodeName !== 'TH') {
        target = target.parentNode
      }
      this.tempCopyData = document.getSelection().toString()
        ? document.getSelection().toString()
        : target.innerText
      //        console.log(this.tempCopyData)
      this.contextMenuData.menulists[0].disabled = !this.tempCopyData
      if (this.selectMode || target.nodeName !== 'TD') {
        this.contextMenuData.menulists[1].disabled = true
        this.contextMenuData.menulists[2].disabled = true
      } else {
        this.contextMenuData.menulists[1].disabled = false
        this.contextMenuData.menulists[2].disabled = false
      }
      this.contextMenuData.axios = {
        x: event.x,
        y: event.y,
      }
    },
    ...mapActions(['setClipboard']),
    // 复制
    copy() {
      this.setClipboard({ data: this.tempCopyData })
      this.tempCopyData = null
    },
    // 右键菜单操作
    editRow() {
      this.$emit('edit-row', this.rclickData, this.rEvent, this.rIndex)
    },
    getDistance(a, b) {
      this.x = a
      this.y = b
    },
    deleteRow() {
      this.$emit('delete-row', this.rclickData, this.rEvent, this.rIndex)
    },
    buttonRight(data, event, index) {
      this.rclickData = data
      this.rEvent = event
      this.rIndex = index
    },
    // 鼠标移动
    mousemove(event) {
      if (typeof event.target.className !== 'string') return
      let element
      if (
        event.target.className.indexOf('ivu-table-cell') !== -1 &&
        event.target.parentNode.tagName === 'TD'
      ) {
        element = event.target
      } else if (
        event.target.parentNode.className.indexOf('ivu-table-cell') !== -1 &&
        event.target.parentNode.parentNode.tagName === 'TD'
      ) {
        element = event.target.parentNode
      } else {
        return
      }
      element.parentNode.onmouseleave = () => {
        this.tipConfig.show = false
      }
      let bound = element.parentNode.getBoundingClientRect()
      this.tipConfig = {
        show: true,
        top: bound.top,
        left: bound.left,
        content: element.innerText,
      }
    },
    // iview table的原始操作
    onExpand(row, status) {
      this.$emit('on-expand', row, status)
    },
    onFilterChange(data) {
      this.$emit('on-filter-change', data)
    },
    // 自定义的表头筛选事件
    filterChange(key, value) {
      if (value.length > 0) {
        this.filters[key] = value
      } else {
        if (this.filters[key]) {
          delete this.filters[key]
        }
      }
      this.request()
    },
    // 自定义的表头排序事件
    sortChange(key, value) {
      this.sortField = {
        name: key,
        order: value,
      }
      this.request()
    },
    timeChange(start, end) {
      console.log(start, end)
      this.timeField = {
        start_time: start,
        end_time: end,
      }
      this.request()
    },
    onSortChange({ column, key, order }) {
      this.sortField = {
        name: key,
        order,
      }
      this.request()
      // this.$emit('on-sort-change', column, key, order)
    },
    // 分页的操作
    // 请求
    async request(params, state) {
      if (this.requestDataApi) {
        this.$emit('before-request')
        let _params = {
          page: this.page,
          per_page: this.pageSize,
        }
        // console.log((this.sortField))
        if (['asc', 'desc'].indexOf(this.sortField.order) !== -1) {
          _params.sort_fields = this.sortField.name
          _params.sort_direc = this.sortField.order
        }
        for (let key in this.params) {
          _params[key] = this.params[key]
        }
        if (params) {
          for (let key in params) {
            _params[key] = params[key]
          }
        }
        if (this.filters) {
          let filterStr = ''
          for (let key in this.filters) {
            if (this.filters[key]) {
              filterStr += key + ':' + this.filters[key].join(',') + ';'
            }
          }
          if (this.params && this.params.filters !== undefined) {
            filterStr = ';' + filterStr
            _params.filters += filterStr
          } else {
            _params.filters = filterStr
          }
        }
        if (this.timeField.start_time && this.timeField.end_time) {
          _params.start_time = this.timeField.start_time
          _params.end_time = this.timeField.end_time
        }
        // 更新page
        this.page = _params.page
        // 将参数信息克隆后去掉页码参数，提交出去，供页面导出数据使用
        let cloneParams = JSON.parse(JSON.stringify(_params))
        delete cloneParams.page
        delete cloneParams.per_page
        this.$emit('getRequestParams', cloneParams)
        await this.requestDataApi(_params)
        // 当前页 - this.currentPage
        // 当前页数据 - this.data
        this.$emit('after-request')
        if (!state) {
          this.$emit('all-selection', [])
        }
      }
    },
    // 页码改变
    async pageChange(page) {
      this.currentPage = page
      this.$emit('on-change', page)
      if (this.editMode) {
        this.$emit('change-selection', [])
      }
      // console.log('page', page)
      this.page = page
      this.totalPage = this.pageSize * (this.page - 1)

      await this.request({}, true)
      // console.log(this.allSelection, 'page change')
      for (let key in this.data) {
        for (let obj of this.allSelection) {
          if (obj.id === this.data[key].id) {
            this.$refs.table.toggleSelect(key, 1)
          }
        }
      }
    },
    // 页码数量改变
    async pageSizeChange(pageSize) {
      this.$emit('on-page-size-change', pageSize)
      this.pageSize = pageSize
      this.totalPage = this.pageSize * (this.page - 1)
      // console.log('pageSizeChange', this.totalPage)
      await this.request({}, true)
      for (let key in this.data) {
        for (let obj of this.allSelection) {
          if (obj.id === this.data[key].id) {
            this.$refs.table.toggleSelect(key, 1)
          }
        }
      }
    },
    addPageMask() {
      let ivuTbody = document.querySelector('.ivu-table')
      //        console.log(ivuTbody)
      ivuTbody.addEventListener('scroll', this.scrollChange)
    },
    scrollChange(event) {
      //        console.log(111)
    },
    // 开启 highlight-row 后有效，当表格的当前行发生变化的时候会触发
    onCurrentChange(currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    // 在多选模式下有效，选中某一项时触发
    selectRow(selection, row, index) {
      // if (this.isBorder) {
      //   if (!this.currentArray.includes(index)) {
      //     this.currentArray.push(index)
      //   }
      //   this.currentArray.sort((a, b) => {
      //     return a - b
      //   })
      //   this.devideArray = this.devideIntoGroups(this.currentArray)
      // }
      this.$emit('on-select', selection, row, index)
    },
    // 在多选模式下有效，取消选中某一项时触发
    selectRowCancel(selection, row, mindex) {
      // if (this.isBorder) {
      //   this.currentArray.forEach((item, index) => {
      //     if (item === mindex) {
      //       this.currentArray.splice(index, 1)
      //     }
      //   })
      //   this.devideArray = this.devideIntoGroups(this.currentArray)
      // }
      this.$emit('on-select-cancel', selection, row, mindex)
    },
    // 在多选模式下有效，点击全选时触发
    selectRowAll(selection) {
      // if (this.isBorder) {
      //   let tempArr = []
      //   for (let i = 0; i < selection.length; i++) {
      //     tempArr.push(i)
      //   }
      //   this.currentArray = tempArr
      //   this.devideArray = [tempArr]
      // }
      this.$emit('on-select-all', selection)
    },
    selectionAllValue(status, selection) {
      // 因为selection可能是空数组
      for (let obj of this.data) {
        for (let key in this.allSelection) {
          if (obj.id === this.allSelection[key].id) {
            this.allSelection.splice(key, 1)
          }
        }
      }
      if (status) {
        for (let obj of selection) {
          this.allSelection.push(obj)
        }
      }
      // emit所有选中的行数据
      this.$emit('all-selection', this.allSelection)
    },
    // 在多选模式下有效，只要选中项发生变化时就会触发
    changeSelection(selection) {
      // if (this.isBorder) {
      //   if (selection.length === 0) {
      //     this.currentArray = []
      //     this.devideArray = []
      //   }
      // }
      this.$emit('on-selection-change', selection)
    },
    selectHighlight(row, index) {
      // console.log(index)

      if (this.isBorder) {
        for (let i = 0; i < this.devideArray.length; i++) {
          if (this.devideArray[i].includes(index)) {
            let curIndex = this.devideArray[i].indexOf(index)
            if (this.devideArray[i].length === 1) {
              return 'ivu-table-row-highlight-body-content'
            } else {
              if (curIndex === 0) {
                return 'ivu-table-row-highlight-body-first-row'
              } else if (curIndex === this.devideArray[i].length - 1) {
                return 'ivu-table-row-highlight-body-last-row'
              } else {
                return 'ivu-table-row-highlight-body'
              }
            }
          }
        }
      } else {
        if (index % 2) {
          return 'select-event-style'
        } else {
          return 'select-odd-style'
        }
      }
      this.$emit('select-highlight', row, index)
    },
    // 单击一行
    clickRow(selection, row, index, column) {
      // 不让点击行触发勾选的情况
      // ① 规定不让行点击时间关联多选框
      // ② 点击勾选框列时候
      // ③ 操作列的时候
      // ④ 展开列的时候
      // ⑤ 多选框没出现的时候
      if (
        this.rowClickRelation &&
        column.key !== 'indexSelect' &&
        column.key !== 'operate' &&
        column.type !== 'expand' &&
        this.selectMode
      ) {
        this.$refs.table.toggleSelect(index)
      }
      if (this.isRelatedMulti) {
        if (this.clickedRows[index] !== undefined) {
          delete this.clickedRows[index]
        } else {
          this.clickedRows[index] = index
        }
      } else {
        if (this.clickedRows[index] !== undefined) {
          delete this.clickedRows[index]
        } else {
          this.clickedRows = {}
          this.clickedRows[index] = index
        }
      }

      this.devideArray = this.devideIntoGroups(Object.values(this.clickedRows))
      this.$emit('on-row-click', selection, row, index, column)
    },
    onselectionvalue(status, row) {
      if (status) {
        this.allSelection.push(row)
      } else {
        for (let key in this.allSelection) {
          if (this.allSelection[key].id === row.id) {
            this.allSelection.splice(key, 1)
          }
        }
      }
      // emit所有选中的行
      this.$emit('all-selection', this.allSelection)
    },
    // 双击一行
    dbClickRow(data, index) {
      this.$emit('on-row-dbClick', data, index)
    },
    // 辅助函数 - 按照是否连续进行分组
    devideIntoGroups(arr) {
      let index = 0
      let arrnew = []
      for (var i = 0; i < arr.length - 1; i++) {
        if (typeof arrnew[index] === 'undefined') {
          arrnew[index] = []
        }
        if (arr[i] + 1 === arr[i + 1]) {
          arrnew[index].push(arr[i])
        } else {
          arrnew[index].push(arr[i])
          index++
        }
      }
      if (arr[arr.length - 2] + 1 === arr[arr.length - 1]) {
        arrnew[arrnew.length - 1].push(arr[arr.length - 1])
      } else {
        arrnew[arrnew.length] = []
        arrnew[arrnew.length - 1].push(arr[arr.length - 1])
      }
      return arrnew
    },
    handleHeightResize() {
      this.tableHeight =
        parseInt(
          window.getComputedStyle(this.$refs.custom_defined_table.parentNode)
            .height,
        ) - 55
    },
  },
  computed: {
    dealColumns() {
      let arr = []
      let indexSelectExist = false
      let operateExist = false
      if (this.columns) {
        arr = this.columns
      }

      for (let i in arr) {
        // console.log('arr[i].filterType', arr[i])
        if (arr[i].key === 'operate') {
          arr.splice(i, 1, this.operateColumn)
          operateExist = true
        }
        if (arr[i].key === 'indexSelect') {
          // 存在就删除了再添加
          arr.splice(i, 1, this.indexSelectColumn)
          indexSelectExist = true
        }
        let column = arr[i]
        if (
          column.filterType === 'type' ||
          column.filterType === 'time' ||
          column.filterType === 'date'
        ) {
          column.renderHeader = (h, params) => {
            return h('table-head-filter', {
              class: 'custom-header',
              props: {
                column: column,
                sortKey: this.sortField.name,
              },
              on: {
                filterChange: this.filterChange,
                sortChange: this.sortChange,
                timeChange: this.timeChange,
              },
            })
          }
        } else {
          if (column.canSort !== false) {
            column.renderHeader = (h, params) => {
              return h('table-head-sort', {
                class: 'custom-header',
                props: {
                  column: column,
                  sortKey: this.sortField.name,
                },
                on: {
                  sortChange: this.sortChange,
                },
              })
            }
          }
        }
      }
      // arr.push(this.operateColumn)
      // 不存在就添加进去
      if (!indexSelectExist && this.isShowSelectOrIndex) {
        arr.unshift(this.indexSelectColumn)
      }
      if (!operateExist && this.showOperateColumn) {
        this.customOperationLine.fixed
          ? arr.push(this.customOperationLine)
          : arr.push(this.operateColumn)
      }
      return arr
    },
  },
  watch: {
    params: {
      // 初始化页码
      handler() {
        this.page = 1
        this.request()
      },
      deep: true,
    },
    selectMode(val) {
      if (!val) {
        this.allSelection = []
        this.$refs.table.selectAll(false)
      }
    },
    customOperationLine(val) {
      console.log(val, 'vvvvvvvvvv')
    },
  },
  created() {
    // // 加上一列操作
    // if (this.showOperateColumn && this.columns[this.columns.length - 1].key !== 'operate') {
    //   this.columns[this.columns.length] = this.operateColumn
    // }
  },
  async mounted() {
    if (this.initReq) {
      await this.request()
    }
    window.addEventListener('resize', this.handleHeightResize)
    if (!this.tableWidth) {
      this.tableWidth = this.$el.getBoundingClientRect().width
    }

    this.handleHeightResize()
    this.activated = true
  },
  activated() {
    if (!this.activated) {
      window.addEventListener('resize', this.handleHeightResize)
      this.handleHeightResize()
    }
    this.activated = true
  },
  deactivated() {
    window.removeEventListener('resize', this.handleHeightResize)
    this.activated = false
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleHeightResize)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import (reference) '~assets/less/variable.less';
.ivu-table-expanded-cell {
  position: relative;
  z-index: 1;
}
.custom-defined-table {
  .ivu-table {
    .ivu-table-fixed-right {
      .select-event-style td {
        background-color: @tableTr;
      }
      .select-odd-style td {
        background-color: #fff;
      }
    }
    .ivu-table-body {
      .ivu-table-tbody {
        .select-event-style td {
          background-color: @tableTr;
        }
        .select-event-style + tr {
          .ivu-table-expanded-cell {
            background-color: @tableTr;
          }
        }
        .select-odd-style td {
          background-color: #fff;
        }
        .select-odd-style + tr {
          .ivu-table-expanded-cell {
            background-color: #fff;
          }
        }
      }
    }
  }
}

.custom-defined-table {
  // 表格相关
  // 连续多行的第一行
  .ivu-table-row-highlight-body-first-row td {
    &:first-child {
      border-left: 2px solid @gradeBlueOne;
    }
    &:last-child {
      border-right: 2px solid @gradeBlueOne;
    }
    border-top: 2px solid @gradeBlueOne;
  }

  // 连续多行的最后一行
  .ivu-table-row-highlight-body-last-row td {
    &:first-child {
      border-left: 2px solid @gradeBlueOne;
    }
    &:last-child {
      border-right: 2px solid @gradeBlueOne;
    }
    border-bottom: 2px solid @gradeBlueOne;
  }

  // 连续多行的中间行
  .ivu-table-row-highlight-body td {
    &:first-child {
      border-left: 2px solid @gradeBlueOne;
    }
    &:last-child {
      border-right: 2px solid @gradeBlueOne;
    }
  }
  // FIXME:edit
  // 单独一行时的样式
  .ivu-table-row-highlight-body-content td {
    box-sizing: border-box;
    &:first-child {
      border-left: 2px solid @gradeBlueOne;
    }
    &:last-child {
      border-right: 2px solid @gradeBlueOne;
    }
    border-bottom: 2px solid @gradeBlueOne!important;
    border-top: 2px solid @gradeBlueOne;
    height: 40px;
  }
  // 分页条
  .z-table-page-box {
    float: right;
    position: relative;
    padding: 10px 20px;
    height: 50px;
    .z-page-mask {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .z-page-mask:hover {
      cursor: not-allowed;
    }
    .ivu-page-options {
      float: right;
    }
    .ivu-page-total {
      line-height: 30px;
      height: 30px;
    }
    .ivu-page-options-sizer {
      margin: 0;
    }
  }
  // 去掉固定行的下边框
  .ivu-table-fixed::before,
  .ivu-table-fixed-right::before {
    height: 0;
  }

  // 连续多行的第一行
  .ivu-table-row-highlight-body-first-row td {
    &:first-child {
      border-left: 2px solid @gradeBlueOne;
    }
    &:last-child {
      border-right: 2px solid @gradeBlueOne;
    }
    border-top: 2px solid @gradeBlueOne;
  }

  // 连续多行的最后一行
  .ivu-table-row-highlight-body-last-row td {
    &:first-child {
      border-left: 2px solid @gradeBlueOne;
    }
    &:last-child {
      border-right: 2px solid @gradeBlueOne;
    }
    border-bottom: 2px solid @gradeBlueOne;
  }

  // 连续多行的中间行
  .ivu-table-row-highlight-body td {
    &:first-child {
      border-left: 2px solid @gradeBlueOne;
    }
    &:last-child {
      border-right: 2px solid @gradeBlueOne;
    }
  }
  // 单独一行时的样式
  .ivu-table-row-highlight-body-content td {
    &:first-child {
      border-left: 2px solid @gradeBlueOne;
    }
    &:last-child {
      border-right: 2px solid @gradeBlueOne;
    }
    border-bottom: 2px solid @gradeBlueOne;
    border-top: 2px solid @gradeBlueOne;
  }
}
</style>
