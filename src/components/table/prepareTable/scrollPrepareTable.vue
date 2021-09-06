/**
* author      : qf yhy wzd ljl
* cteate      : 2017/12/28 16:45
* description : 检前准备表格
*/
<template>
  <div class="prepare-table">
    <threeGroupTable 
      stripe
      ref="threeGroupTable"
      :data='newData'
      :columns="columns"
      :height='height'
      :row-class-name='rowClassName'
      @on-current-change='onCurrentChange'
      @on-select='onSelect'
      @on-select-cancel='onSelectCancel'
      @on-select-all='onSelectAll'
      @on-selection-change='onSelectionChange'
      @on-sort-change='onSortChange'
      @on-filter-change='onFilterChange'
      @on-row-click='onRowClick'
      @on-row-dblclick='onRowDbClick'
      @on-expand='onExpand'
      @body-scroll='bodyScroll'
      @contextmenu.native.prevent="contextmenu">
    </threeGroupTable>
    <z-context-menu :contextMenuData="contextMenuData" @copy="copy"></z-context-menu>
  </div>
</template>

<script>
  import threeGroupTable from './table'
  import zContextMenu from '@/components/tools/zContextmenu'
  import { mapActions } from 'vuex'
  export default {
    name: 'prepareTable',
    components: {
      threeGroupTable,
      zContextMenu,
    },
    props: {
      data: {
        type: Array,
        required: true,
      },
      columns: {
        type: Array,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      isBorder: {
        type: Boolean,
        default: true,
      },
      touchHeight: {
        type: Number,
        default: 40,
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
      requestDataApi: {
        type: Function,
        default: null,
      },
      params: {
        type: Object,
      },
    },
    data() {
      return {
        newData: this.data,
        currentIndex: -1,
        page: 1,
        pageSize: 20,
        total: 0,
        currentData: [],
        tempCopyData: null,
        contextMenuData: {
          menuName: `scrollprearetable`,
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
      }
    },
    methods: {
      // 行的 className 的回调方法
      rowClassName(row, index) {
        if (this.isBorder) {
          if (this.currentIndex === index) {
            return 'ivu-table-row-highlight-body-content'
          }
        }
        this.$emit('row-class-name', row, index)
      },
      // 开启 highlight-row 后有效，当表格的当前行发生变化的时候会触发
      onCurrentChange(currentRow, oldCurrentRow) {
        this.$emit('on-current-change', currentRow, oldCurrentRow)
      },
      // 在多选模式下有效，选中某一项时触发
      onSelect(selection, row, index) {
        this.$emit('on-select', selection, row, index)
      },
      // 在多选模式下有效，取消选中某一项时触发
      onSelectCancel(selection, row, index) {
        this.$emit('on-select-cancel', selection, row, index)
      },
      // 在多选模式下有效，点击全选时触发
      onSelectAll(selection) {
        this.$emit('on-select-all', selection)
      },
      // 在多选模式下有效，只要选中项发生变化时就会触发
      onSelectionChange(selection) {
        this.$emit('on-selection-change', selection)
      },
      // 排序时有效，当点击排序时触发
      onSortChange(column, key, order) {
        this.$emit('on-sort-change', column, key, order)
      },
      // 筛选时有效，筛选条件发生变化时触发
      onFilterChange(row) {
        this.$emit('on-select-cancel', row)
      },
      // 单击某一行时触发
      onRowClick(row, index) {
        if (this.isBorder) {
          this.currentIndex = index
        }
        this.$emit('on-row-click', row, index)
      },
      // 双击某一行时触发
      onRowDbClick(row, index) {
        this.$emit('on-row-dblclick', row, index)
      },
      // 展开或收起某一行时触发
      onExpand(row, status) {
        this.$emit('on-expand', row, status)
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
      // 复制
      copy() {
        this.setClipboard({ data: this.tempCopyData })
        this.tempCopyData = null
      },
      // 滚动条事件
      bodyScroll(event) {
        // console.log(event)
        let scrollTop = event.currentTarget.scrollTop
        let clientHeight = event.currentTarget.clientHeight
        let scrollHeight = event.currentTarget.scrollHeight
        if (scrollHeight - scrollTop - clientHeight <= this.touchHeight) {
          // console.log('触发底部滚动', scrollHeight - scrollTop - clientHeight)
          // this.changePage()
        }
      },
      // 请求
      async request() {
        if (this.requestDataApi) {
          this.$emit('before-request')
          let pageParams = {
            page: this.page,
            size: this.pageSize,
          }
          Object.assign(pageParams, this.params)
          await this.requestDataApi(pageParams)
          this.$emit('after-request')
        }
      },
      async changePage() {
        this.page += 1
        await this.request()
      },
      ...mapActions(['setClipboard']),
    },
    // watch: {
    //   data(val) {
    //     this.currentData.concat(this.currentData, val)
    //     this.newData = this.currentData
    //   },
    // },
    async mounted() {
      await this.request()
      // this.currentData = this.data
      this.newData = this.data
      this.page = this.pageInfo.page
      this.pageSize = this.pageInfo.page_size
      this.total = this.pageInfo.total
    },
    destroyed() {
      this.currentIndex = -1
      // console.log('destroyed')
    },
  }
</script>

<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .prepare-table {
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
</style>

