<template>
  <div :class="prefixCls" class="s-tree-wrapper">
    <div class="controll-bar"
         v-if="showControlBar">
      <div :class="{active:activeCtrl(2)}"
           @click="putAway">
        <icon name="upDoubleArrow"
              class="gray"></icon>
        <icon name="upDoubleArrowBlue"
              class="up blue"></icon>
        全部收起</div>
      <div :class="{active:activeCtrl('expand')}"
           @click="expand">
        <icon name="downDoubleArrowGray"
              class="gray"></icon>
        <icon name="downDoubleArrow"
              class="up blue"></icon>
        全部展开</div>
    </div>
    <Tree-node v-for="(item, i) in stateTree"
               :key="i"
               :data="item"
               visible
               :multiple="multiple"
               :show-checkbox="showCheckbox"
               :showInlineCtrl="showInlineCtrl"
               @on-add="addEvent"
               @on-delete="deleteEvent"
               class="s-tree-wrapper">
    </Tree-node>
    <div :class="[prefixCls + '-empty']"
         v-if="!stateTree.length">{{ localeEmptyText }}</div>
  </div>
</template>
<script>
// 包含iview组件本身功能
// 额外参数：showControlBar：是否显示所有操作; inlineCtrl: 是否显示每一行的新增和删除操作；
// 额外事件：expandAll，putAwayAll，在组件外将数据expand字段设为对应值。
import TreeNode from './node.vue'
import Emitter from 'iview/src/mixins/emitter'
import Locale from 'iview/src/mixins/locale'

const prefixCls = 'ivu-tree'

export default {
  name: 'sTree',
  mixins: [Emitter, Locale],
  components: { TreeNode },
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    showControlBar: {
      type: Boolean,
      default: true,
    },
    showInlineCtrl: {
      type: Boolean,
      default: true,
    },
    emptyText: {
      type: String,
    },
    loadData: {
      type: Function,
    },
    render: {
      type: Function,
    },
  },
  data() {
    return {
      prefixCls: prefixCls,
      stateTree: this.data,
      flatState: [],
      ctrlActive: 0,
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        // console.log('变', this.data)
        this.stateTree = this.data
        this.flatState = this.compileFlatState()
        this.rebuildTree()
      },
    },
  },
  computed: {
    localeEmptyText() {
      if (typeof this.emptyText === 'undefined') {
        return this.t('i.tree.emptyText')
      } else {
        return this.emptyText
      }
    },
  },
  methods: {
    ctrlAll(data, val) {
      data.map(item => {
        if (item.children && item.children.length) {
          item.expand = val
          this.ctrlAll(item.children, val)
        }
      })
    },
    updateData() {
      // this.data
    },
    // 展开
    expand() {
      this.ctrlAll(this.data, true)
      this.$emit('expandAll')
    },
    putAway() {
      this.ctrlAll(this.data, false)
      this.$emit('putAwayAll')
    },
    activeCtrl(val) {
      if (val === 'expand') {
        return true
      } else {
        return false
      }
    },
    addEvent(data) {
      this.$emit('on-adds', data)
    },
    deleteEvent(data) {
      this.$emit('on-deletes', data)
    },
    compileFlatState() {
      // so we have always a relation parent/children of each node
      let keyCounter = 0
      const flatTree = []
      function flattenChildren(node, parent) {
        node.nodeKey = keyCounter++
        flatTree[node.nodeKey] = { node: node, nodeKey: node.nodeKey }
        if (typeof parent !== 'undefined') {
          flatTree[node.nodeKey].parent = parent.nodeKey
          flatTree[parent.nodeKey].children.push(node.nodeKey)
        }

        if (node.children) {
          flatTree[node.nodeKey].children = []
          node.children.forEach(child => flattenChildren(child, node))
        }
      }
      this.stateTree.forEach(rootNode => {
        flattenChildren(rootNode)
      })
      return flatTree
    },
    updateTreeUp(nodeKey) {
      const parentKey = this.flatState[nodeKey].parent
      if (typeof parentKey === 'undefined') return

      const node = this.flatState[nodeKey].node
      const parent = this.flatState[parentKey].node
      //   FIXME: 这里改了三个全等
      if (
        node.checked == parent.checked &&
        node.indeterminate == parent.indeterminate
      ) {
        return
      } // no need to update upwards

      if (node.checked == true) {
        this.$set(
          parent,
          'checked',
          parent.children.every(node => node.checked),
        )
        this.$set(parent, 'indeterminate', !parent.checked)
      } else {
        this.$set(parent, 'checked', false)
        this.$set(
          parent,
          'indeterminate',
          parent.children.some(node => node.checked || node.indeterminate),
        )
      }
      this.updateTreeUp(parentKey)
    },
    rebuildTree() {
      // only called when `data` prop changes
      const checkedNodes = this.getCheckedNodes()
      checkedNodes.forEach(node => {
        this.updateTreeDown(node, { checked: true })
        // propagate upwards
        const parentKey = this.flatState[node.nodeKey].parent
        if (!parentKey && parentKey !== 0) return
        const parent = this.flatState[parentKey].node
        const childHasCheckSetter =
          typeof node.checked !== 'undefined' && node.checked
        //   FIXME: 这里也是
        if (childHasCheckSetter && parent.checked != node.checked) {
          this.updateTreeUp(node.nodeKey) // update tree upwards
        }
      })
    },

    getSelectedNodes() {
      /* public API */
      return this.flatState
        .filter(obj => obj.node.selected)
        .map(obj => obj.node)
    },
    getCheckedNodes() {
      /* public API */
      return this.flatState.filter(obj => obj.node.checked).map(obj => obj.node)
    },
    updateTreeDown(node, changes = {}) {
      for (let key in changes) {
        this.$set(node, key, changes[key])
      }
      if (node.children) {
        node.children.forEach(child => {
          this.updateTreeDown(child, changes)
        })
      }
    },
    handleSelect(nodeKey) {
      // console.log('11111',this.flatState,nodeKey)
      // console.log(nodeKey)
      const node = this.flatState[nodeKey].node
      if (!this.multiple) {
        // reset previously selected node
        const currentSelectedKey = this.flatState.findIndex(
          obj => obj.node.selected,
        )
        if (currentSelectedKey >= 0 && currentSelectedKey !== nodeKey) {
          this.$set(this.flatState[currentSelectedKey].node, 'selected', false)
        }
      }
      this.$set(node, 'selected', !node.selected)

      this.$emit('on-select-change', this.getSelectedNodes())
    },
    // TODO:
    handleAdd(nodeKey){
      this.$emit('on-add', this.getCheckedNodes())

    },
    handleDelete(nodeKey){
      this.$emit('on-delete', this.getCheckedNodes())

    },
    handleCheck({ checked, nodeKey }) {
      const node = this.flatState[nodeKey].node
      this.$set(node, 'checked', checked)
      this.$set(node, 'indeterminate', false)

      this.updateTreeUp(nodeKey) // propagate up
      this.updateTreeDown(node, { checked, indeterminate: false }) // reset `indeterminate` when going down

      this.$emit('on-check-change', this.getCheckedNodes())
    },
  },

  created() {
    this.flatState = this.compileFlatState()
    this.rebuildTree()
  },
  mounted() {
    this.$on('on-check', this.handleCheck)
    this.$on('on-selected', this.handleSelect)
    this.$on('on-add', this.handleAdd)
    this.$on('on-delete', this.handleDelete)
    this.$on('toggle-expand', node => this.$emit('on-toggle-expand', node))
  },
}
</script>
<style lang="less" >
@import (reference) '~assets/less/public.less';
.ivu-icon-arrow-right-b:before {
  content: ' ';
  width: 15px;
  height: 15px;
  display: inline-block;
}
.ivu-tree-arrow {
  margin-right: 4px;
}
.ivu-tree-arrow i {
  transition: none;
}
.ivu-tree-title {
  padding: 0;
  display: inline-block;
}
.ivu-tree-arrow-open i {
  transform: none;
}
.ivu-tree-arrow-close i {
  transform: none;
}
.ivu-tree {
  position: relative;
  margin-left: 10px;
  .controll-bar {
    display: flex;
    align-items: center;
    margin-top: 8px;
    // height: 30px;

    > div {
      display: flex;
      align-items: center;
      height: 20px;
      line-height: 20px;
      width: 64px;
      color: #737373;
      cursor: pointer;
      .fa-icon {
        width: 12px;
        height: 12px;
        margin-top: 2px;
      }
      > i {
        display: inline-block;
      }
    }
    > div:last-child {
      margin-left: 18px;
    }
    > div:hover {
      color: #008cee;
    }
    > div .up {
      display: none;
    }
    > div:hover .gray {
      display: none;
    }
    > div:hover .blue {
      display: inline-block;
    }
  }
  .ivu-tree-title {
    // width: 100%;
    transition: none !important;
  }
  .ivu-tree-empty {
    text-align: center;
    margin-top: 20px;
    color: @gradeAshFour;
  }
  .ivu-tree-title-selected {
    color: @gradeBlueOne!important;
    font-weight: bold;
    background: none;
  }
  // > .ivu-tree-children {
  //   > li {
  //     margin: 0;
  //     > .ivu-tree-title {
  //       // width: calc(100% - 26px);
  //       font-size: 0;
  //       color: #111111;
  //       span {
  //         display: inline-block;
  //         line-height: 32px;
  //         font-size: 14px;
  //         max-width: 154px;
  //         overflow: hidden;
  //         text-overflow: ellipsis;
  //         white-space: nowrap;
  //       }

  //       .del {
  //         display: none;
  //       }
  //     }
  //     > .ivu-tree-children {
  //       // font-size: 0;
  //       width: calc(100% - 26px);

  //       padding: 0 0 0 26px;
  //       background: url('/static/icons/public/Group.svg') no-repeat 6px -6px;
  //       > li {
  //         margin: 0;
  //         > .ivu-tree-title {
  //           // font-size: 0;
  //           color: #111111;
  //           span {
  //             display: inline-block;
  //             line-height: 32px;
  //             max-width: 154px;
  //             font-size: 14px;
  //             overflow: hidden;
  //             text-overflow: ellipsis;
  //             white-space: nowrap;
  //           }
  //         }
  //         .ivu-tree-children {
  //           padding: 0 0 0 26px;
  //           background: url('/static/icons/public/Group.svg') no-repeat 6px -6px;
  //           li {
  //             margin: 0;
  //             .ivu-tree-title {
  //               // width: 100%;

  //               color: #4a4a4a;
  //               font-size: 0;
  //               span {
  //                 display: inline-block;
  //                 line-height: 32px;
  //                 max-width: 154px;
  //                 font-size: 12px;
  //                 overflow: hidden;
  //                 text-overflow: ellipsis;
  //                 white-space: nowrap;
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
}
.s-tree-wrapper{
  display: flex;
  flex-direction: column;
  background: #F2F7FF;
  height: 100%;
  overflow: auto;
  > .ivu-tree-children {
    > li {
      margin: 0;
      > .ivu-tree-title {
        // width: calc(100% - 26px);
        font-size: 0;
        color: #111111;
        span {
          display: inline-block;
          line-height: 32px;
          font-size: 14px;
          max-width: 154px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .del {
          display: none;
        }
      }
      > .ivu-tree-children {
        // font-size: 0;
        // width: calc(100% - 26px);
        padding: 0 0 0 26px;
        background: url('/static/icons/public/Group.svg') no-repeat 6px -6px;
        > li {
          margin: 0;
          > .ivu-tree-title {
            font-size: 0;
            color: #111111;
            span {
              display: inline-block;
              line-height: 32px;
              max-width: 154px;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .ivu-tree-children {
            padding: 0 0 0 26px;
            background: url('/static/icons/public/Group.svg') no-repeat 6px -6px;
            li {
              margin: 0;
              .ivu-tree-title {
                // width: 100%;
                color: #4a4a4a;
                font-size: 0;
                span {
                  display: inline-block;
                  line-height: 32px;
                  max-width: 154px;
                  font-size: 12px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>