<template>
  <div class="z-baseinfo-table">
    <!-- 表格组件开始 -->
    <LJTable
      stripe
      :data="data"
      :columns="newColumns"
      :height="height - 50"
      :disabled-hover="true"
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
      <!--<div slot="footer">-->
      <!--<div class="z-table-page-box">-->
      <!--<div class="z-page-mask" v-if="editMode"></div>-->
      <!--<Page-->
      <!--:total="pageInfo.total"-->
      <!--:current="pageInfo.page"-->
      <!--:page-size="pageSize"-->
      <!--:page-size-opts="pageSizeOpts"-->
      <!--placement="top"-->
      <!--show-sizer-->
      <!--show-elevator-->
      <!--show-total-->
      <!--@on-change="pageChange"-->
      <!--@on-page-size-change="pageSizeChange">-->
      <!--</Page>-->
      <!--</div>-->
      <!--</div>-->
    </LJTable>
    <!-- 表格组件结束 -->

    <!-- 页码组件开始 -->
    <!--<div class="z-table-page-out-box">-->
    <div class="z-table-page-box">
      <div class="z-page-mask" v-if="editMode"></div>
      <Page
        placement="top"
        show-sizer
        show-total
        :total="pageInfo.total"
        :current="pageInfo.page"
        :page-size="pageSize"
        :page-size-opts="pageSizeOpts"
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange">
      </Page>
    </div>
    <!--</div>-->

    <!-- 页码组件结束 -->

    <!-- 右键菜单开始 -->
    <z-context-menu :contextMenuData="contextMenuData" @copy="copy" @editRow="editRow" @deleteRow="deleteRow"></z-context-menu>
    <!-- 右键菜单结束 -->

    <!-- 文字提示框开始 -->
    <!-- <z-tooltip  @contextmenu.native.prevent="contextmenu" :position="{top: tipConfig.top, left: tipConfig.left}" :show="tipConfig.show" :content="tipConfig.content"></z-tooltip> -->
    <!-- 文字提示框结束 -->
  </div>
</template>
<script>
  /**
   * 基础信息表格组件
   * @author zero 尹浩宇 覃凤
   * @date 2017/12/10
   */
  import LJTable from './table'
  import zContextMenu from '@/components/tools/zContextmenu'
  // import * as types from '@/store/types'
  import { mapActions } from 'vuex'
  // import zTooltip from '@/components/tools/zTooltip'

  export default {
    name: 'zBaseInfoTable',
    props: {
      isSelectMode: {
        type: Boolean,
        default: false,
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
    },
    components: {
      zContextMenu,
      // zTooltip,
      LJTable,
    },
    data() {
      return {
        selectColumn: {
          type: 'selection',
          width: 50,
          key: 'addSelectMode',
          align: 'center',
        },
        indexColumn: {
          title: '序号',
          width: 50,
          key: 'addSelectMode',
          render: (h, params) => {
            return h('div', params.row._index + 1)
          },
        },
        editColumn: {
          title: '操作',
          key: 'editData',
          fixed: 'right',
          width: 70,
          render: (h, params) => {
            params.sortable = false
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
                    'margin-left': '8px',
                    'margin-right': '10px',
                    background: 'url(' + this.editIcon + ') no-repeat',
                  },
                  on: {
                    click: event => {
                      event.stopPropagation() // 阻止
                      this.$emit('edit-btn-selectData', params.row, params.index)
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
          },
        },
        page: this.pageInfo.page,
        pageSize: this.pageInfo.page_size,
        highlight: null,
        isHoverTableLine: false, // 是否移入行
        editIcon: '/static/icons/public/table-edit.svg', // 初始按钮
        delIcon: '/static/icons/public/table-hover-del.svg',
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
        tipConfig: {
          show: false,
          top: 0,
          left: 0,
          content: '',
        },
        tempCopyData: null,
        currentArray: [],
        devideArray: [],
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
      onSortChange(column, key, order) {
        this.$emit('on-sort-change', column, key, order)
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
        //        console.log('里面被点击了')
        //        if (selection.length === 0) {
        //          this.currentArray = []
        //          this.devideArray = []
        //          this.refreshBord()
        //        }
        this.$emit('on-selection-change', selection)
      },
      //      清楚边框线
      refreshBord() {
        this.currentArray = []
        this.devideArray = []
        this.$refs.table.selectAll(false)
      },
      // 在多选模式下有效，选中某一项时触发
      selectRow(selection, row, index) {
        if (!this.currentArray.includes(index)) {
          this.currentArray.push(index)
        }
        this.currentArray.sort((a, b) => {
          return a - b
        })
        this.devideArray = this.devideIntoGroups(this.currentArray)
        this.$emit('on-select', selection, row, index)
      },
      // 在多选模式下有效，取消选中某一项时触发
      selectRowCancel(selection, row, mindex) {
        this.currentArray.forEach((item, index) => {
          if (item === mindex) {
            //            if (this.currentArray) {
            this.currentArray.splice(index, 1)
            //            }
          }
        })
        // console.log(this.currentArray)
        this.devideArray = this.devideIntoGroups(this.currentArray)
        this.$emit('on-select-cancel', selection, row, mindex)
      },
      // 在多选模式下有效，点击全选时触发
      selectRowAll(selection) {
        let tempArr = []
        for (let i = 0; i < selection.length; i++) {
          tempArr.push(i)
        }
        this.currentArray = tempArr
        this.devideArray = [tempArr]
        this.$emit('on-select-all', selection)
      },
      selectHighlight(row, index) {
        for (let i = 0; i < this.devideArray.length; i++) {
          if (this.devideArray[i].includes(index)) {
            let curIndex = this.devideArray[i].indexOf(index)
            //            switch (this.devideArray[i].length) {
            //              case 1:
            //                return 'ivu-table-row-highlight-body-content'
            //              default:
            //                if (curIndex === 0) {
            //                  return 'ivu-table-row-highlight-body-first-row'
            //                } else if (curIndex === this.devideArray[i].length - 1) {
            //                  return 'ivu-table-row-highlight-body-last-row'
            //                } else {
            //                  return 'ivu-table-row-highlight-body'
            //                }
            //            }
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
        this.$emit('select-highlight', row, index)
      },
      // 单击一行
      clickRow(data, index) {
        //        if (!this.editMode) {
        //          if (this.highlight !== index) {
        //            this.$refs.table.handleCurrentRow('highlight', index)
        //            this.highlight = index
        //            this.$emit('select-row', data, index)
        //          } else {
        //            this.$refs.table.handleCurrentRow('clear')
        //            this.highlight = null
        //            this.$emit('cancle-row')
        //          }
        //        }
        this.$emit('on-row-click', data, index)
      },
      // 双击一行
      dbClickRow(data, index) {
        this.$refs.table.handleCurrentRow('highlight', index)
        this.highlight = index
        this.$emit('on-row-dblclick', data, index)
      },
      // 复制
      copy() {
        this.setClipboard({ data: this.tempCopyData })
        this.tempCopyData = null
      },
      // 编辑行
      editRow() {
        this.$emit('edit-row', this.rclickData, this.rEvent)
      },
      deleteRow() {
        this.$emit('delete-row', this.rclickData, this.rEvent)
      },
      // 请求
      async request() {
        if (this.requestDataApi) {
          this.$emit('before-request')
          let params = {
            page: this.page,
            size: this.pageSize,
          }
          for (let key in this.params) {
            params[key] = this.params[key]
          }
          this.requestDataApi(params)
          //          this.refreshBord()
          this.$emit('after-request')
        }
      },
      // 页码改变
      pageChange(page) {
        if (this.editMode) {
          this.$emit('change-selection', [])
        }
        this.page = page
        this.request()
      },
      // 页码数量改变
      pageSizeChange(pageSize) {
        this.pageSize = pageSize
        this.request()
      },
      addPageMask() {
        let ivuTbody = document.querySelector('.ivu-table')
        //        console.log(ivuTbody)
        ivuTbody.addEventListener('scroll', this.scrollChange)
      },
      scrollChange(event) {
        //        console.log(111)
      },
      ...mapActions(['setClipboard']),
      // 按照连续分组
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
    },
    async mounted() {
      //      this.addPageMask()
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
      isSelectMode(val) {
        if (!val) {
          this.currentArray = []
          this.devideArray = []
          this.$refs.table.selectAll(false)
        }
      },
    },
    computed: {
      newColumns() {
        // this.isSelectMode
        // this.ifEdit
        let cols = []
        cols.push(this.isSelectMode ? this.selectColumn : this.indexColumn)
        cols = cols.concat(this.columns)
        if (this.ifEdit) {
          cols.push(this.editColumn)
        }
        //        console.log('newColumns')
        return cols
      },
      editMode() {
        return this.columns[0] && this.columns[0].type === 'selection'
      },
    },
  }
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';

  .z-baseinfo-table {
    position: relative;
    .ivu-table-cell {
      // height: 40px;
      // line-height: 40px;
      // white-space: nowrap;
      .ivu-tooltip-inner {
        white-space: normal;
      }
    }
    /*.ivu-table-body {*/
    /*padding-bottom: 50px;*/
    /*}*/
    /*.z-table-page-out-box {*/
    /*position: absolute;*/
    /*bottom: 0;*/
    /*right: 0;*/
    /*opacity: 1;*/
    /*}*/
  }

  .z-table-page-box {
    float: right;
    position: relative;
    padding: 7px 20px;
    max-height: 50px;
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
  }

  /*.ivu-table-row-highlight-first td {*/
  /*&:first-child {*/
  /*border-left: 2px solid @gradeBlueOne;*/
  /*}*/
  /*&:last-child {*/
  /*border-right: 2px solid @gradeBlueOne;*/
  /*}*/
  /*border-top: 2px solid @gradeBlueOne;*/
  /*}*/

  /*.ivu-table-row-highlight-last td {*/
  /*&:first-child {*/
  /*border-left: 2px solid @gradeBlueOne;*/
  /*}*/
  /*&:last-child {*/
  /*border-right: 2px solid @gradeBlueOne;*/
  /*}*/
  /*border-bottom: 2px solid @gradeBlueOne;*/
  /*}*/
  .z-baseinfo-table {
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
