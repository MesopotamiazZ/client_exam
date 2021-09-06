<template>
  <collapse-transition>
    <ul :class="classes">
      <li :class="{showChild:data.expand&&(data.children?data.children.length!==0:data.children)}">
        <span v-if="showArrow || showLoading"
              :class="arrowClasses"
              @click="handleExpand">
          <Icon v-if="showArrow"
                type="arrow-right-b"
                :class="{open:data.expand,close:!data.expand}"></Icon>
          <Icon v-if="showLoading"
                type="load-c"
                class="ivu-load-loop icon"></Icon>
        </span>
        <Checkbox v-if="showCheckbox"
                  :value="data.checked"
                  :indeterminate="data.indeterminate"
                  :disabled="data.disabled || data.disableCheckbox"
                  @click.native.prevent="handleCheck"></Checkbox>
        <Render v-if="data.render"
                :render="data.render"
                :data="data"
                :node="node"></Render>
        <Render v-else-if="isParentRender"
                :render="parentRender"
                :data="data"
                :node="node"></Render>
        <div v-else
             :class="titleClasses" style="position:relative;">
          <span @click="handleSelect">{{ data.title }}</span>
          <div style="display:inline-block;width:44px;height:0"></div>
          <div v-if="showInlineCtrl"
               class="inline-ctrl-wrapper">
            <button class="add"
                    @click.stop="addEvent(data)"></button>
            <button class="del"
                    @click.stop="deleteEvent(data)"></button>
          </div>
        </div>
        <Tree-node v-if="data.expand"
                   v-for="(item, i) in data.children"
                   :key="i"
                   :data="item"
                   :multiple="multiple"
                   :show-checkbox="showCheckbox" @on-add="addEventOut" @on-delete="deleteEventOut"
                   >
        </Tree-node>
      </li>
    </ul>
  </collapse-transition>
</template>
<script>
import Checkbox from 'iview/src/components/checkbox/checkbox.vue'
import Icon from 'iview/src/components/icon/icon.vue'
import Render from 'iview/src/components/tree/render'
import CollapseTransition from './collapse-transition'
import Emitter from 'iview/src/mixins/emitter'
import { findComponentUpward } from 'iview/src/utils/assist'

const prefixCls = 'ivu-tree'

export default {
  name: 'TreeNode',
  mixins: [Emitter],
  components: { Checkbox, Icon, CollapseTransition, Render },
  props: {
    data: {
      type: Object,
      default() {
        return {}
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
    showInlineCtrl: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      prefixCls: prefixCls,
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}-children`]
    },
    selectedCls() {
      return [
        {
          [`${prefixCls}-node-selected`]: this.data.selected,
        },
      ]
    },
    arrowClasses() {
      return [
        `${prefixCls}-arrow`,
        {
          [`${prefixCls}-arrow-disabled`]: this.data.disabled,
          [`${prefixCls}-arrow-open`]: this.data.expand,
        },
      ]
    },
    titleClasses() {
      return [
        `${prefixCls}-title`,
        {
          [`${prefixCls}-title-selected`]: this.data.selected,
        },
      ]
    },
    showArrow() {
      return (
        (this.data.children && this.data.children.length) ||
        ('loading' in this.data && !this.data.loading)
      )
    },
    showLoading() {
      return 'loading' in this.data && this.data.loading
    },
    isParentRender() {
      const Tree = findComponentUpward(this, 'sTree')
      return Tree && Tree.render
    },
    parentRender() {
      const Tree = findComponentUpward(this, 'sTree')
      if (Tree && Tree.render) {
        return Tree.render
      } else {
        return null
      }
    },
    node() {
      const Tree = findComponentUpward(this, 'sTree')
      if (Tree) {
        // 将所有的 node（即flatState）和当前 node 都传递
        return [
          Tree.flatState,
          Tree.flatState.find(item => item.nodeKey === this.data.nodeKey),
        ]
      } else {
        return []
      }
    },
  },
  methods: {
    handleExpand() {
      const item = this.data
      if (item.disabled) return

      // async loading
      if (item.children.length === 0) {
        const tree = findComponentUpward(this, 'sTree')
        if (tree && tree.loadData) {
          this.$set(this.data, 'loading', true)
          tree.loadData(item, children => {
            this.$set(this.data, 'loading', false)
            if (children.length) {
              this.$set(this.data, 'children', children)
              // console.log('111', this.data)
              this.$nextTick(() => {
                this.handleExpand()
                tree.flatState = tree.compileFlatState()
                tree.rebuildTree()
              })
            }
          })
          return
        }
      }

      if (item.children && item.children.length) {
        this.$set(this.data, 'expand', !this.data.expand)
        // try {
        this.dispatch('sTree', 'toggle-expand', this.data)
        // } catch (err) {}
      }
    },
    handleSelect() {
      if (this.data.disabled) return
      // console.log(this.data)
      // let parent = this.$parent || this.$root;
      //       let name = parent.$options.name;

      //       while (parent && (!name || name !== 'sTree')) {
      //           parent = parent.$parent;

      //           if (parent) {
      //               name = parent.$options.name;
      //           }
      //       }
      //       if (parent) {
      //           parent.$emit.apply(parent, ['on-selected'].concat(this.data.nodeKey));
      //       }
      // try {
      this.dispatch('sTree', 'on-selected', this.data.nodeKey)
      // } catch (err) {}
    },
    addEvent(data) {
      // console.log('tree in',data)    
      // this.dispatch('sTree', 'on-add', this.data.nodeKey)
        
      this.$emit('on-add', data)
    },
    deleteEvent(data) {
      // this.dispatch('sTree', 'on-delete', this.data.nodeKey)
      
      this.$emit('on-delete', data)
    },
    addEventOut(data) {
      // console.log('tree out',data)
      // this.dispatch('sTree', 'on-add', this.data.nodeKey)
      
      this.$emit('on-add', data)
    },
    deleteEventOut(data) {
      // this.dispatch('sTree', 'on-delete', this.data.nodeKey)
      
      this.$emit('on-delete', data)
    },
    handleCheck() {
      if (this.data.disabled) return
      const changes = {
        checked: !this.data.checked && !this.data.indeterminate,
        nodeKey: this.data.nodeKey,
      }
      // try {
      this.dispatch('sTree', 'on-check', changes)
      // } catch (err) {}
    },
  },
}
</script>
<style lang="less" scoped>
.inline-ctrl-wrapper {
  // display: inline-block;
  position: absolute;
  right: 0;
  width:44px;
  display: none;
  font-size: 0;
  height: auto;
  line-height: 32px;

  vertical-align: bottom;
  // vertical-align: middle;
  button {
    cursor: pointer;
    display: inline-block;
    width: 12px;
    height: 12px;
    border: none;
    outline: none;
    margin-left: 10px;
    vertical-align: middle;
  }
  .add {
    background: url(/static/icons/public/add-blue.svg) no-repeat center;
  }
  .del {
    background: url(/static/icons/public/close-blue.svg) no-repeat center;
  }
  .del:hover {
    background: url(/static/icons/public/close-red.svg) no-repeat center;
  }
}
</style>

<style lang="less">
@import (reference) '~assets/less/public.less';
.s-tree-wrapper {
  .icon {
    width: 14px;
    height: 14px;
    margin-top: 9px;
  }
  .open {
    background: url(/static/icons/open.svg) no-repeat;
    width: 14px;
    height: 14px;
    margin-top: 9px;
  }
  .close {
    background: url(/static/icons/close.svg) no-repeat;
    width: 14px;
    height: 14px;
    margin-top: 9px;
  }
  .showChild {
    > :nth-last-child(1) {
      background: url('/static/icons/public/lastGroup.svg') no-repeat 6px -6px !important;
      background-size: 16px 30px !important;
    }
  }

  // TODO:
  > .ivu-tree-children {
    .showChild {
      .ivu-tree-title {
        span {
          max-width: 134px;
        }
      }
    }
    > li {
      > .ivu-tree-title {
        span {
        }

        .del {
        }
      }
      > .ivu-tree-children {
        .showChild {
          .ivu-tree-title {
            span {
              max-width: 134px;
            }
          }
        }
        > li {
          > .ivu-tree-title {
            span {
            }
          }
          .ivu-tree-children {
            .showChild {
              .ivu-tree-title {
                span {
                  max-width: 134px;
                }
              }
            }
            li {
              .ivu-tree-title {
                span {
                }
              }
            }
          }
        }
      }
    }
  }
  // .open::before {
  //   background: url(/static/icons/open.svg) no-repeat;
  //   width: 14px;
  //   height: 14px;
  //   margin-top: 9px;
  // }
  // .close::before {
  //   background: url(/static/icons/close.svg) no-repeat;
  //   width: 14px;
  //   height: 14px;
  //   margin-top: 9px;
  // }
  .ivu-tree-title:hover {
    // background: #F2F7FF;
    background: none;
    color: #68ccff !important;

    .inline-ctrl-wrapper {
      display: inline-block;
      button {
      }
    }
  }
}
</style>