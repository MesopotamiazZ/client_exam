<template>
  <div class="prepare-baseinfo-table">
    <!-- 表格组件开始 -->
    <!-- 添加Tooltip -->
    <!-- <zTooltip> -->
    <LJTable
      :checkboxColumn="selectColumn"
      :indexColumn="indexColumn"
      :isShowSelectOrIndex="isShowSelectOrIndex"
      :ifEdit = "ifEdit"
      :data="data"
      :columns="newColumns"
      :height="height - 50 - 6"
      stripe
      :rowHeight="rowHeight"
      :row-class-name="selectHighlight "
      @on-expand="onExpand"
      @on-filter-change="onFilterChange"
      @on-sort-change="onSortChange"
      @on-current-change="onCurrentChange"
      @button-right="buttonRight"
      @on-select="selectRow"
      @on-select-cancel="selectRowCancel"
      @on-select-all="selectRowAll"
      @on-selection-change="changeSelection"
      @on-row-click="clickRow"
      @on-row-dblclick="dbClickRow"
      @contextmenu.native.prevent="contextmenu"
      @mousemove.native="mousemove"
      ref="table">
    </LJTable>
    <!-- </zTooltip> -->
    <!-- 表格组件结束 -->

    <!-- 页码组件开始 -->
    <!--<div class="z-table-page-out-box">-->
    <div class="z-table-page-box">
      <div class="z-page-mask" v-if="editMode"></div>
      <Page
        :total="pageInfo.total"
        :current="pageInfo.page"
        :page-size="pageSize"
        :page-size-opts="pageSizeOpts"
        placement="top"
        show-sizer
        show-total
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange">
      </Page>
    </div>
    <!--</div>-->

    <!-- 页码组件结束 -->

    <!-- 右键菜单开始 -->
    <z-context-menu :contextMenuData="contextMenuData" @copy="copy" ></z-context-menu>
    <!-- 右键菜单结束 -->

    <!-- 文字提示框开始 -->
    <!-- <z-tooltip  @contextmenu.native.prevent="contextmenu" :position="{top: tipConfig.top, left: tipConfig.left}" :show="tipConfig.show" :content="tipConfig.content"></z-tooltip> -->
    <!-- 文字提示框结束 -->
  </div>
</template>
<script>
  /**
   * 检前准备表格组件
   * @author 潘泽文 尹浩宇 覃凤
   * @date 2017/12/10
   */
  import LJTable from './../zTable'
  import zContextMenu from '@/components/tools/zContextmenu'
  // import * as types from '@/store/types'
  import { mapActions } from 'vuex'
  import zTooltip from '@/components/tools/ZTooltip'

  export default {
    name: 'prepare-table',
    props: {
      crtIndex: {
        type: Number,
        default: -1,
      },
      isShowSelectOrIndex: {
        type: Boolean,
        default: false,
      },
      isBorder: {
        type: Boolean,
        default: true,
      },
      enableContextMenu: {
        type: Boolean,
        default: true,
      },
      columns: {
        type: Array,
        required: true,
      },
      ifEdit: {
        type: Boolean,
        default: false,
      }, // 是否在最后一列添加删除编辑按钮
      ifSort: {
        type: Boolean,
        default: true,
      },
      data: {
        type: Array,
        required: true,
      },
      enablePager: {
        type: Boolean,
        default: true,
      },
      pageInfo: {
        total: {
          type: Number,
          default: 0,
        },
        page: {
          type: Number,
          default: 1,
        },
        page_size: {
          type: Number,
          default: 20,
        },
      },
      deleteMode: {
        type: Boolean,
        default: false,
      },
      showTooltip: {
        type: Boolean,
        default: true,
      },
      width: {
        type: Number,
        default: null,
      },
      height: {
        type: Number,
        default: null,
      },
      loading: {
        type: Boolean,
        default: false,
      },
      pageSizeOpts: {
        type: Array,
        default: () => [20, 30, 50, 100],
      },
      requestDataApi: {
        type: Function,
        default: null,
      },
      params: {
        type: Object,
      },
      initReq: {
        type: Boolean,
        default: true,
      },
      rowHeight: {
        type: Number,
        default: 40,
      },
    },
    components: {
      zContextMenu,
      zTooltip,
      LJTable,
    },
    data() {
      return {
        currentIndex: -1,
        sortField: {
          name: null,
          order: null,
        },
        selectColumn: [
          {
            type: 'selection',
            width: 50,
            key: 'addSelectMode',
            align: 'center',
          },
        ],
        indexColumn: [
          {
            title: '序号',
            width: 50,
            key: 'addSelectMode',
            render: (h, params) => {
              return h('div', params.row._index + 1)
            },
          },
        ],
        editColumn: {
          title: '操作',
          key: 'editData',
          fixed: 'right',
          width: 70,
          render: (h, params) => {
            params.sortable = false
            // console.log(params.row.is_std)
            if (
              typeof params.row.is_std !== 'undefined' &&
              params.row.is_std === 1
            ) {
              return h(
                'div',
                {
                  class: 'tableDelBtnIcon',
                  on: {
                    click: event => {
                      event.stopPropagation()
                      this.$emit(
                        'preview-btn-selectData',
                        params.row,
                        params.index
                      )
                    },
                  },
                },
                [
                  h('div', {
                    // 预览图标
                    style: {
                      display: 'inline-block',
                      width: '17px',
                      height: '11px',
                      background: 'url(' + this.previewIcon + ') no-repeat',
                    },
                  }),
                ]
              )
            } else {
              return h(
                'div',
                {
                  class: 'tableDelBtnIcon',
                },
                [
                  h('div', {
                    // 编辑
                    style: {
                      display: 'inline-block',
                      width: '12px',
                      height: '13px',
                      'margin-right': '10px',
                      background: 'url(' + this.editIcon + ') no-repeat',
                    },
                    on: {
                      click: event => {
                        event.stopPropagation() // 阻止
                        this.$emit(
                          'edit-btn-selectData',
                          params.row,
                          params.index
                        )
                      },
                    },
                  }),
                  h('div', {
                    // 删除
                    name: 'tableDelIcon',
                    style: {
                      display: 'inline-block',
                      width: '12px',
                      height: '13px',
                      background: 'url(' + this.delIcon + ') no-repeat',
                    },
                    on: {
                      click: event => {
                        event.stopPropagation() // 阻止
                        this.$emit('del-btn-selectData', params.row, params.index)
                      },
                    },
                  }),
                ]
              )
            }
          },
        },
        page: this.pageInfo.page,
        pageSize: this.pageInfo.page_size,
        highlight: null,
        isHoverTableLine: false, // 是否移入行
        editIcon: '/static/icons/public//* table-hover-edit */.svg', // 初始按钮
        delIcon: '/static/icons/public/table-hover-del.svg',
        previewIcon: '/static/icons/public/table-preview.svg',
        // contextmenu data (菜单数据)
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
          ],
        },
        tipConfig: {
          show: false,
          top: 0,
          left: 0,
          content: '',
        },
        tempCopyData: null,
        checkArray: [],
        rclickData: {},
        rEvent: {},
      }
    },
    methods: {
      onExpand(row, status) {
        this.$emit('on-expand', row, status)
      },
      onFilterChange(data) {
        this.$emit('on-filter-change', data)
      },
      onSortChange({ column, key, order }) {
        this.sortField = {
          name: key,
          order,
        }
        this.request()
        // this.$emit('on-sort-change', column, key, order)
      },
      onCurrentChange(currentRow, oldCurrentRow) {
        this.$emit('on-current-change', currentRow, oldCurrentRow)
      },
      buttonRight(data, event) {
        this.rclickData = data
        this.rEvent = event
        //        this.$emit('buttonRight', , event)
      },
      // 鼠标移动
      mousemove(event) {
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
        // console.log(element)

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
      // 右键菜单
      contextmenu(event) {
        this.tempCopyData = document.getSelection().toString()
        //        console.log(this.tempCopyData)
        this.contextMenuData.menulists[0].disabled = !this.tempCopyData
        this.contextMenuData.axios = {
          x: event.x,
          y: event.y,
        }
      },
      // 在多选模式下有效，只要选中项发生变化时就会触发
      changeSelection(selection) {
        this.$emit('on-selection-change', selection)
      },
      // 在多选模式下有效，选中某一项时触发
      selectRow(selection, row, index) {
        this.$emit('on-select', selection, row, index)
      },
      // 在多选模式下有效，取消选中某一项时触发
      selectRowCancel(selection, row, mindex) {
        this.$emit('on-select-cancel', selection, row, mindex)
      },
      // 在多选模式下有效，点击全选时触发
      selectRowAll(selection) {
        this.$emit('on-select-all', selection)
      },
      selectHighlight(row, index) {
        if (this.isBorder) {
          if (this.currentIndex === index) {
            return 'ivu-table-row-highlight-body-content'
          }
        }
        this.$emit('select-highlight', row, index)
      },
      // 单击一行
      clickRow(selection, data, index) {
        if (this.isBorder) {
          this.currentIndex = index
        }
        this.$emit('on-row-click', selection, data, index)
      },
      // 双击一行
      dbClickRow(data, index) {
        this.$emit('on-row-dblclick', data, index)
      },
      // 复制
      copy() {
        this.setClipboard({ data: this.tempCopyData })
        this.tempCopyData = null
      },
      // 请求
      async request(params) {
        if (this.requestDataApi) {
          this.$emit('before-request')
          let _params = {
            page: this.page,
            size: this.pageSize,
          }
          // console.log((this.sortField))
          if (['asc', 'desc'].indexOf(this.sortField.order) !== -1) {
            _params.sort_field = this.sortField.name
            _params.sort_direc = this.sortField.order
          }
          for (let key in this.params) {
            _params[key] = this.params[key]
          }
          for (let key in params) {
            _params[key] = params[key]
          }

          // 更新page
          this.page = _params.page
          await this.requestDataApi(_params)
          this.$emit('after-request')
        }
      },
      // 页码改变
      pageChange(page) {
        this.currentIndex = -1
        this.$emit('on-change', page)
        if (this.editMode) {
          this.$emit('change-selection', [])
        }
        // console.log('page', page)
        this.page = page
        this.request()
      },
      // 页码数量改变
      pageSizeChange(pageSize) {
        this.currentIndex = -1
        this.$emit('on-page-size-change', pageSize)
        this.pageSize = pageSize
        this.request()
      },
      addPageMask() {
        let ivuTbody = document.querySelector('.ivu-table')
        ivuTbody.addEventListener('scroll', this.scrollChange)
      },
      scrollChange(event) {
        //        console.log(111)
      },
      ...mapActions(['setClipboard']),
    },
    async mounted() {
      this.currentIndex = this.crtIndex
      if (this.initReq) {
        await this.request()
      }
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
      editMode() {
        if (this.highlight !== null) {
          this.$refs.table.handleCurrentRow('clear')
          this.highlight = null
          this.$emit('cancle-row')
        }
      },
      page() {
        if (this.highlight !== null) {
          this.$refs.table.handleCurrentRow('clear')
          this.highlight = null
          this.$emit('cancle-row')
        }
      },
      crtIndex(val) {
        console.log('crtIndex')
        this.currentIndex = val
      },
    },
    computed: {
      newColumns() {
        let cols = []
        cols = cols.concat(
          this.columns.map(col => {
            col.sortable = 'custom'
            return col
          })
        )
        if (this.ifEdit) {
          cols.push(this.editColumn)
        }
        return cols
      },
      editMode() {
        return this.columns[0] && this.columns[0].type === 'selection'
      },
    },
    destroyed() {
      this.currentIndex = -1
    },
  }
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';

  .prepare-baseinfo-table {
    position: relative;
    .ivu-table-cell {
      padding: 0;
      padding-left: 10px;
      padding-right: 10px;
      .ivu-tooltip-inner {
        white-space: normal;
      }
    }
    .ivu-table-row {
      & > td:nth-of-type(1) {
        border-left: 2px solid transparent;
      }
    }
    .ivu-table {
      tr:nth-last-of-type(1) {
        td {
          border-top: 2px solid transparent;
          // border-bottom: 2px solid transparent;
        }
      }
      tr.ivu-table-row-highlight-body-content {
        // 高亮背景
        td {
          background-color: @menuTreeHoverBg;
          border-top: 2px solid @gradeBlueOne;
        }
      }
      .ivu-table-tbody {
        border-bottom: 1px solid @gradeAshFive;
      }
    }
  }

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

  .prepare-baseinfo-table {
    // 单独一行时的样式
    .ivu-table .ivu-table-row-highlight-body-content td {
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

  .ban-table-row td {
    background: #e8ecf2 !important;
  }
</style>
