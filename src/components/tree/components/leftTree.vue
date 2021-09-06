<template>
  <div class="tree-content">
    <div class="search-line flex">
      <div class="marginL10 flx1">
        <localSearchInput @search-key='localSearchKey'></localSearchInput>
      </div>
      <span class='curPointer marginL10 marginR10'>
        <icon name='tableTitleJump' @click.native="skipTo"></icon>
      </span>
    </div>
    <div :class="prefixCls" class="contentL-content marginL10">
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
import { mapMutations } from 'vuex'
import * as types from '@/store/types'
import * as _ from 'lodash'
import TreeNode from './treeNode.vue'
import Emitter from 'iview/src/mixins/emitter'
import Locale from 'iview/src/mixins/locale'
import localSearchInput from '@/components/localSearchInput'

const prefixCls = 'ivu-tree'

export default {
  name: 'leftTree',
  mixins: [Emitter, Locale],
  components: { TreeNode, localSearchInput },
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
    skipName: {
      type: String,
      default: '',
    },
    render: {
      type: Function,
    },
  },
  data () {
    return {
      newDataList: null,
      prefixCls: prefixCls,
      stateTree: this.data,
      flatState: [],
      // leftTree: {
      //   data: [],
      // },
    }
  },
  watch: {
    newDataList(val) {
      // console.log(val)
    },
    stateTree(val) {
      // console.log(val)
    },
    data: {
      deep: true,
      handler (val, old) {
        // console.log(val)
        if (val && val.length > 0 && old.length === 0 && this.stateTree.length === 0) {
          this.newDataList = _.cloneDeep(val)
        }
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
    ...mapMutations({
      openPage: types.OPEN_PAGE,
      setCurPage: types.SET_CURRENT_PAGE_NAME,
    }),
    // localSearchKey(data) {
    //   this.$emit('localSearchKey', data)
    // },
    skipTo() {
      if (this.skipName) {
        this.$router.push({ name: this.skipName })
        let temp = {}
        temp.name = this.skipName
        temp.title = this.skipName
        this.openPage(temp)
        this.setCurPage(temp.name)
      }
    },
    localSearchKey (data) { // 本地搜索
      // console.log(data)
      let arr = []
      let arrErr = []
      let arrFin = []
      // console.log(this.newDataList[0])
      for (let i in this.newDataList[0].children) {
        if (this.newDataList[0].children[i].title.indexOf(data) !== -1) {
          if (data) {
            this.newDataList[0].children[i].expand = true
          } else {
            this.newDataList[0].children[i].expand = false
          }
          arr.push(this.newDataList[0].children[i])
        } else {
          arrErr.push(this.newDataList[0].children[i])
        }
      }
      arrFin = _.cloneDeep(arrErr)
      for (let i in arrErr) {
        let num = 0
        arrFin[i].children = []
        for (let j in arrErr[i].children) {
          if (arrErr[i].children[j].title.indexOf(data) !== -1) {
            arrFin[i].children[num] = arrErr[i].children[j]
            num++
            if (data) {
              arrFin[i].expand = true
            } else {
              arrFin[i].expand = false
            }
          }
        }
        if (arrFin[i].children.length !== 0) {
          arr.push(arrFin[i])
        }
      }
      if (!data) {
        this.stateTree = _.cloneDeep(this.newDataList)
      } else {
        if (arr.length === 0) {
          // console.log(arr)
          this.stateTree = _.cloneDeep(arr)
        } else {
          if (this.stateTree[0]) {
            this.stateTree[0].children = _.cloneDeep(arr)
          } else {
            let data = [
              {
                title: '所有类别',
                expand: true,
                selected: true,
                children: [],
              },
            ]
            this.stateTree = data
            this.stateTree[0].children = _.cloneDeep(arr)
          }
        }
      }
      // if (data === '') { // 点击取消，重新请求右侧数据
      //   this.type_id = ''
      //   this.searchKey = data
      //   this.res_type = ''
      //   this.leftTree.ifLev3 = false
      // }
      // this.$emit('local-search-key', data)
    },
    compileFlatState () { // so we have always a relation parent/children of each node
      let keyCounter = 0
      const flatTree = []
      function flattenChildren(node, parent) {
        // console.log(node.nodeKey)
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
      this.newDataList.forEach(rootNode => {
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

      console.log('bef node selected', node.selected)
      this.$set(node, 'selected', true)
      console.log('node selected', node.selected, node)
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
  .tree-content {
    height: 100%;
    width: calc(~'100% - 10px');
    // background-color: #F2F7FF;
    .search-line {
      height: 50px;
      width: calc(~'100% + 10px')!important;
      &>span {
        margin-top: 6px;
      }
    }
    .contentL-content {
      width: 100%;
      height: calc(~'100% - 50px');
      overflow: auto;
    }
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
   .ivu-tree{
     position: relative;
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
            padding: 0 0 0 24px;
            background: url('/static/icons/public/Group.svg') no-repeat 6px -6px;
            >li{
              margin:0;
              >.ivu-tree-title{
                  font-size:14px;
                  line-height: 32px;
                  color: #111111;
              }
              >.ivu-tree-children{
                background: url('/static/icons/public/Group.svg') no-repeat 6px -6px;
                >li{
                  margin:0;
                  >.ivu-tree-title{
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
