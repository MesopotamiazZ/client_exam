<template>
<div class="tree-node">
  <div :class="prefixCls">
    <div class="controll-bar"
         v-if="showControlBar">
        <div
            @click="putAway">
          <icon  name="upDoubleArrow" class="gray"></icon>
          <icon name="upDoubleArrowBlue" class="up blue"></icon>
          全部收起</div>
        <div
            @click="expand">
          <icon name="downDoubleArrowGray" class="gray"></icon>
          <icon name="downDoubleArrow" class="up blue"></icon>
          全部展开</div>
      </div>
      <Tree-node
          :class="{treeline:stateTree.length!==0}"
          v-for="(item, i) in stateTree"
          :key="i"
          :data="item"
          visible
          :multiple="multiple"
          :show-checkbox="showCheckbox">
      </Tree-node>
      <div :class="[prefixCls + '-empty']" v-if="!stateTree.length">{{ localeEmptyText }}</div>
  </div>
</div>
    
</template>
<script>
import TreeNode from './treeNode.vue'
import Emitter from 'iview/src/mixins/emitter'
import Locale from 'iview/src/mixins/locale'

const prefixCls = 'ivu-tree'

export default {
  name: 'Tree',
  mixins: [Emitter, Locale],
  components: { TreeNode },
  props: {
    data: {
      type: Array,
      default () {
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
    emptyText: {
      type: String,
    },
    loadData: {
      type: Function,
    },
    render: {
      type: Function,
    },
    showControlBar: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      prefixCls: prefixCls,
      stateTree: this.data,
      flatState: [],
    }
  },
  watch: {
    data: {
      deep: true,
      handler (val) {
        this.stateTree = val
        this.flatState = this.compileFlatState()
        this.rebuildTree()
      },
    },
  },
  computed: {
    localeEmptyText () {
      if (typeof this.emptyText === 'undefined') {
        return this.t('i.tree.emptyText')
      } else {
        return this.emptyText
      }
    },
  },
  methods: {
    compileFlatState () { // so we have always a relation parent/children of each node
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
      if (node.checked === parent.checked && node.indeterminate === parent.indeterminate) return // no need to update upwards

      if (node.checked === true) {
        this.$set(parent, 'checked', parent.children.every(node => node.checked))
        this.$set(parent, 'indeterminate', !parent.checked)
      } else {
        this.$set(parent, 'checked', false)
        this.$set(parent, 'indeterminate', parent.children.some(node => node.checked || node.indeterminate))
      }
      this.updateTreeUp(parentKey)
    },
    rebuildTree () { // only called when `data` prop changes
      const checkedNodes = this.getCheckedNodes()
      checkedNodes.forEach(node => {
        this.updateTreeDown(node, {checked: true})
                // propagate upwards
        const parentKey = this.flatState[node.nodeKey].parent
        if (!parentKey && parentKey !== 0) return
        const parent = this.flatState[parentKey].node
        const childHasCheckSetter = typeof node.checked !== 'undefined' && node.checked
        if (childHasCheckSetter && parent.checked !== node.checked) {
          this.updateTreeUp(node.nodeKey) // update tree upwards
        }
      })
    },

    getSelectedNodes () {
                /* public API */
      return this.flatState.filter(obj => obj.node.selected).map(obj => obj.node)
    },
    getCheckedNodes () {
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
    handleSelect (nodeKey) {
      const node = this.flatState[nodeKey].node
      if (!this.multiple) { // reset previously selected node
        const currentSelectedKey = this.flatState.findIndex(obj => obj.node.selected)
        if (currentSelectedKey >= 0 && currentSelectedKey !== nodeKey) this.$set(this.flatState[currentSelectedKey].node, 'selected', false)
      }

      this.$set(node, 'selected', true)

      this.$emit('on-select-change', this.getSelectedNodes())
    },
    handleCheck({ checked, nodeKey }) {
      const node = this.flatState[nodeKey].node
      this.$set(node, 'checked', checked)
      this.$set(node, 'indeterminate', false)

      this.updateTreeUp(nodeKey) // propagate up
      this.updateTreeDown(node, {checked, indeterminate: false}) // reset `indeterminate` when going down

      this.$emit('on-check-change', this.getCheckedNodes())
    },
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
    ctrlAll(data, val) {
      data.map(item => {
        if (item.children && item.children.length) {
          item.expand = val
          this.ctrlAll(item.children, val)
        }
      })
    },
  },
  created() {
    this.flatState = this.compileFlatState()
    this.rebuildTree()
  },
  mounted () {
    this.$on('on-check', this.handleCheck)
    this.$on('on-selected', this.handleSelect)
    this.$on('toggle-expand', node => this.$emit('on-toggle-expand', node))
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/public.less';
  .tree-node{
    .ivu-icon-arrow-right-b:before {
    content: " ";
    width:15px;
    height:15px;
    display: inline-block;
   }
   .ivu-tree-arrow-open i{
       transform:none;
   }
   .ivu-tree-arrow-close i{
    transform:none;
   }
    .ivu-tree li ul {
      margin-left: 20px;
      padding: 0 0 0 5px;
    }
   .ivu-tree{
     position: relative;
     margin-left:-10px;
     .controll-bar {
        display: flex;
        align-items: center;
        margin-left: 22px;
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
        > div:hover{
          color: #008cee;
        }
        > div .up{
          display: none;
        }
        > div:hover .gray{
          display: none
        }    
        > div:hover .blue{
          display: inline-block;
        } 
      }
     .ivu-tree-title{
        transition: none!important;
     }
     .ivu-tree-empty{
       text-align: center;
       margin-top:20px;
       color:@gradeAshFour;
     }
      .ivu-tree-title-selected{
        color:@gradeBlueOne!important;
        font-weight:bold;
        background: none;
      }
      >.ivu-tree-children{
        >li{
          margin:0;
          >.ivu-tree-title{
            font-size:14px;
            line-height: 32px;
            color: #111111;
          }
          >.ivu-tree-children{
            padding: 0 0 0 -24px;
            background: url('/static/icons/public/Group.svg') no-repeat 6px -6px;
            >li{
              margin:0;
              >.ivu-tree-title{
                  font-size:14px;
                  line-height: 32px;
                  color: #111111;
              }
              .ivu-tree-children{
                background: url('/static/icons/public/Group.svg') no-repeat 6px -6px;
                li{
                  margin:0;
                  .ivu-tree-title{
                      color: #4A4A4A;
                      line-height: 32px;
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
