/**
* author      : yhy
* cteate      : 2017/12/14 16:29
* description : iview tableBody源码
*/
<template>
  <table cellspacing="0" cellpadding="0" border="0" :style="styleObject">
    <colgroup>
      <col v-if="isShowSelectOrIndex" :width = "fixed === 'right' ? 70:50">
      <col v-for="(column, index) in columns" :style="setCellWidth(column, index, false)">   
    </colgroup>
    <tbody :class="[prefixCls + '-tbody']" id="popParent">
    <template v-for="(row, index) in data">
      <table-tr
        :row="row"
        :key="row._rowKey"
        :prefix-cls="prefixCls"
        @buttonRight="buttonRight"
        @mouseenter.native.stop="handleMouseIn(row._index)"
        @mouseleave.native.stop="handleMouseOut(row._index)"
        @click.native="clickCurrentRow(row._index)"
        @dblclick.native.stop="dblclickCurrentRow(row._index)">
        <td class="customDefine" v-if="isShowSelectOrIndex && fixed !== 'right'" v-for="column in checkboxColumn" v-show="isSelectMode" style="width: 50px;">
          <Cell
            :fixed="fixed"
            :prefix-cls="prefixCls"
            :row="row"
            :key="column._columnKey"
            :column="column"
            :natural-index="index"
            :index="row._index"
            :checked="rowChecked(row._index)"
            :disabled="rowDisabled(row._index)"
            :expanded="rowExpanded(row._index)"
          ></Cell>
        </td>
        <td class="customDefine" v-if="isShowSelectOrIndex && fixed !== 'right' && !isSelectMode" v-for="column in indexColumn" :class="alignCls(column, row)" style="width: 50px;">
          <Cell
            :fixed="fixed"
            :prefix-cls="prefixCls"
            :row="row"
            :key="column._columnKey"
            :column="column"
            :natural-index="index"
            :index="row._index"
            :checked="rowChecked(row._index)"
            :disabled="rowDisabled(row._index)"
            :expanded="rowExpanded(row._index)"
          ></Cell>
        </td>
        <td v-for="column in columns" @mouseenter="mouseenter($event,row[column.key],column)" @mouseleave="mouseleave" :class="alignCls(column, row)" :style="isDependent?{'border-right-width': '1px'}:setRightBorder(column,columns)">
          <Cell
            :fixed="fixed"
            :prefix-cls="prefixCls"
            :row="row"
            :key="column._columnKey"
            :column="column"
            :natural-index="index"
            :index="row._index"
            :checked="rowChecked(row._index)"
            :disabled="rowDisabled(row._index)"
            :expanded="rowExpanded(row._index)"
          ></Cell>
        </td>
      </table-tr>
      <tr v-if="rowExpanded(row._index)" :class="{[prefixCls + '-expanded-hidden']: fixed}">
        <td :colspan="columns.length" :class="prefixCls + '-expanded-cell'">
          <Expand :key="row._rowKey" :row="row" :render="expandRender" :index="row._index"></Expand>
        </td>
      </tr>
    </template>
    </tbody>
    <z-context-menu @hide="hideMenu" @mouseenter.native="mouseenterMenu" :contextMenuData="contextMenuData" @copy="copy"></z-context-menu>
  </table>
</template>
<script>
  // todo :key="row"
  import TableTr from './table-tr.vue'
  import Cell from 'iview/src/components/table/cell.vue'
  import Expand from 'iview/src/components/table/expand.js'
  import Mixin from './mixin'
  import zContextMenu from '@/components/tools/zContextmenu'
  import { mapActions } from 'vuex'

  export default {
    name: 'TableBody',
    mixins: [Mixin],
    components: {Cell, Expand, TableTr, zContextMenu},
    props: {
      pop: {
        type: Boolean,
        default: true,
      },
      isSelectMode: Boolean,
      indexColumn: Array,
      isShowSelectOrIndex: Boolean,
      prefixCls: String,
      styleObject: Object,
      checkboxColumn: Array,
      columns: Array,
      data: Array,    // rebuildData
      objData: Object,
      columnsWidth: Object,
      fixed: {
        type: [Boolean, String],
        default: false,
      },
      isDependent: Boolean,
    },
    data() {
      return {
        hidePopTimer: null,
        showPopTimer: null,
        showPop: false,
        stopPop: false,
        tempCopyData: null,
        targetDom: null,
        oldTargetDom: null,
        contextMenuData: {
          menuName: `pop`,
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
    computed: {
      expandRender() {
        let render = function () {
          return ''
        }
        for (let i = 0; i < this.columns.length; i++) {
          const column = this.columns[i]
          if (column.type && column.type === 'expand') {
            if (column.render) {
              render = column.render
            }
          }
        }
        return render
      },
    },
    watch: {
      showPop(cur) {
        let popDom = this.$el.parentElement.getElementsByClassName('pop')[0]
        if (cur) {
          popDom.style.visibility = 'visible'
        } else {
          popDom.style.visibility = 'hidden'
        }
      },
    },
    methods: {
      ...mapActions(['setClipboard']),
      buttonRight(data, event) {
        this.$emit('buttonRight', data, event)
      },
      rowChecked(_index) {
        return this.objData[_index] && this.objData[_index]._isChecked
      },
      rowDisabled(_index) {
        return this.objData[_index] && this.objData[_index]._isDisabled
      },
      rowExpanded(_index) {
        return this.objData[_index] && this.objData[_index]._isExpanded
      },
      handleMouseIn(_index) {
        this.$parent.handleMouseIn(_index)
      },
      handleMouseOut(_index) {
        this.$parent.handleMouseOut(_index)
      },
      clickCurrentRow(_index) {
        this.$parent.clickCurrentRow(_index)
      },
      dblclickCurrentRow(_index) {
        this.$parent.dblclickCurrentRow(_index)
      },
      copy() {
        if (this.tempCopyData) {
          this.stopPop = false
        }
        this.setClipboard({ data: this.tempCopyData })
        this.tempCopyData = null
      },
      hideMenu() {
        if ((typeof event.target.className) === 'string' && event.target.className.indexOf('pop') === -1 && event.target.className.indexOf('text') === -1) {
          this.showPop = false
        }
        this.stopPop = false
      },
      createPop() {
        let popDom = document.createElement('div')
        popDom.id = 'pop'
        popDom.className = 'pop'
        let spanDom = document.createElement('span')
        spanDom.className = 'text'
        popDom.appendChild(spanDom)
        popDom.style.visibility = 'hidden'
        this.$el.parentElement.appendChild(popDom)
        popDom.addEventListener('mouseenter', () => {
          if (this.hidePopTimer) {
            clearTimeout(this.hidePopTimer)
          }
        })
        popDom.addEventListener('contextmenu', () => {
          event.stopPropagation()
          // event.preventDefault()
          // this.stopPop = true
          // this.tempCopyData = document.getSelection().toString()
          // this.contextMenuData.menulists[0].disabled = !this.tempCopyData
          // this.contextMenuData.axios = {
          //   x: event.x,
          //   y: event.y,
          // }
        })
        popDom.addEventListener('mouseleave', () => {
          if (this.stopPop) {
            return
          }
          this.hidePopTimer = setTimeout(() => {
            this.showPop = false
          }, 300)
        })
      },
      mouseenter(event, data, column) {
        if (!this.pop) {
          return
        }
        if (column._pop === false) {
          return
        }
        if (this.stopPop) {
          return
        }
        if (event.target.innerText === '') {
          return
        }
        this.oldTargetDom = this.targetDom
        this.targetDom = event.target
        let popDom = this.$el.parentElement.getElementsByClassName('pop')[0]
        if (!popDom) {
          this.createPop()
        }
        if (this.hidePopTimer) {
          clearTimeout(this.hidePopTimer)
        }
        this.showPop = false
        if (this.showPopTimer) {
          clearTimeout(this.showPopTimer)
        }
        this.showPopTimer = setTimeout(() => {
          this.showPop = true
          if (this.targetDom !== this.oldTargetDom) {
            this.setInnerText()
          }
          this.$nextTick(() => {
            this.setPopStyle()
          })
        }, 1000)
      },
      setPopStyle() {
        let popDom = this.$el.parentElement.getElementsByClassName('pop')[0]

        popDom.style.left = null
        popDom.style.right = null

        let targetRect = this.targetDom.getBoundingClientRect()
        let winRect = document.getElementsByTagName('body')[0].getBoundingClientRect()

        if (targetRect.left + 306 > winRect.right) {
          popDom.style.left = null
          popDom.style.right = winRect.right - targetRect.left - this.targetDom.offsetWidth + 'px'
        } else {
          popDom.style.left = targetRect.left + 'px'
        }

        popDom.style.top = targetRect.top - popDom.offsetHeight + 'px'

        let popRect = popDom.getBoundingClientRect()
        if (popRect.top < 0) {
          popDom.style.top = targetRect.bottom + 'px'
        }

        popRect = popDom.getBoundingClientRect()
        if (popRect.bottom > winRect.bottom) {
          popDom.style.top = 0 + 'px'
          popDom.style.maxHeight = winRect.bottom + 'px'
        }
      },
      setInnerText() {
        let popDom = this.$el.parentElement.getElementsByClassName('pop')[0]
        let spanDom = popDom.getElementsByClassName('text')[0]
        spanDom.innerText = ''
        spanDom.innerText = this.targetDom.innerText
      },
      mouseleave(event) {
        if (this.stopPop) {
          return
        }
        if (this.showPopTimer) {
          clearTimeout(this.showPopTimer)
        }
        this.hidePopTimer = setTimeout(() => {
          this.showPop = false
        }, 300)
      },
      mouseenterMenu() {
        if (this.hidePopTimer) {
          clearTimeout(this.hidePopTimer)
        }
      },
    },
  }
</script>
<style lang="less">
  .pop {
    position: fixed;
    z-index: 100;
    max-width: 300px;
    overflow: auto;
    background: #fff;
    padding: 12px 14px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    box-shadow: 0 2px 15px 0 rgba(206, 213, 242, 0.7);
    text-align: left;

    .text {
      word-wrap: break-word;
      word-break: break-all;
      word-spacing: normal;
      text-align: left;
    }
  }
</style>
