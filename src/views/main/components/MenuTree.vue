<template>
  <div class="tree" @wheel="mouseScroll()" @scroll="scrolls()" ref="tree" :style="{'overflow-y': showScroll ? 'auto': 'hidden'}">
    <ul :class="{'level1': true, 'dragging': dragging}" @mousedown.stop="dragMouseDown($event)" @mousemove.stop="dragging && dragMouseMove($event)">
      <li v-for="(item1,index1) in list" :key="item1.name" :data-title="item1.title">
        <div class="wrapper">
          <router-link v-if="!item1.children||item1.children.length===0" class="tree_item item1" tag="div" :to="{name: item1.name}" @click.native="changePage(item1)">
            <span>{{generateTitle(item1.title)}}</span>
          </router-link>
          <div v-if="item1.children && item1.children.length>0" class="tree_item item1" :class="{active:hasOpenPage(item1.title)}" @click="toggle(item1)">
            <span>{{generateTitle(item1.title)}}</span>
            <Icon type="ios-arrow-down" :class="{expand:hasOpenPage(item1.title)}"></Icon>
          </div>
        </div>
        <!-- <collapseTransition> -->
        <ul class="level2" v-if="hasOpenPage(item1.title)" @mousedown.stop="dragMouseDown($event)" @mousemove.stop="dragging && dragMouseMove($event)">
          <li
            v-for="(item2,index2) in item1.children"
            :key="item2.name"
            :data-title="item2.title"
            :class="{bottom_border:showBottomBorder&&isLast(item1,index1,index2)}">
            <div class="wrapper" @mouseenter="mousein($event,item1,item2,index1,index2)">
              <router-link 
                v-if="!item2.children||item2.children.length===0"
                class="tree_item item2"
                tag="div"
                :to="{name: item2.name}"
                @click.native="changePage(item2)">
                <span>{{generateTitle(item2.title)}}</span>
              </router-link>
              <div v-if="item2.children&&item2.children.length>0" class="tree_item item2">
                <span>{{generateTitle(item2.title)}}</span>
                <Icon type="ios-arrow-right"></Icon>
              </div>
            </div>
            <!-- <collapseTransition> -->
            <ul class="level3" :style="{'top': lv3DomHeight}">
              <li v-for="(item3,index3) in item2.children" :key="item3.name" :class="{left_border:showLeftBorder}">
                <router-link class="item3" tag="div" :to="{name: item3.name}" @click.native="changePage(item3)">
                  <span>{{generateTitle(item3.title)}}</span>
                </router-link>
              </li>
            </ul>
            <!-- </collapseTransition> -->
          </li>
        </ul>
        <!-- </collapseTransition> -->
      </li>
    </ul>
  </div>
</template>
<script>
/**
   * 左侧折叠导航
   * @author 张祥
   * @date 2017/11/21
   */
import collapseTransition from '@/assets/js/collapseTransition.js'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import * as types from '@/store/types'
import { generateTitle } from '@/utils/i18n'
export default {
  components: {
    collapseTransition,
  },
  data() {
    return {
      lv3DomHeight: 0,
      list: [],
      openList: [],
      showBottomBorder: false,
      showLeftBorder: false,
      showScroll: false,
      timer: undefined,
      dragging: null,
    }
  },
  computed: {
    ...mapGetters('configModule', ['curMenuList']),
    ...mapState(['curMainMenu', 'userInfo']),
  },
  watch: {
    curMainMenu(cur, old) {
      // 重置openList
      if (cur !== old) {
        this.list = this.curMenuList
        this.openList = this.list.filter(item => item.children).map(item => item.title)
        this.menuRange()
      }
    },
  },
  mounted() {
    this.list = this.curMenuList
    this.openList = this.list
      .filter(item => item.children)
      .map(item => item.title)

    this.menuRange()
  },
  methods: {
    ...mapActions('configModule', ['getConfig', 'saveConfig', 'saveConfig_fs']),
    generateTitle,
    toggle(item) {
      // 展开或折叠一级菜单
      let index = this.openList.indexOf(item.title)
      if (index === -1) {
        this.openList.push(item.title)
      } else {
        this.openList.splice(index, 1)
      }
    },
    mousein($e, item1, item2, index1, index2) {
      // 鼠标移入，计算悬浮菜单的显示位置
      if (!item2.children || item2.children === 0) {
        return
      }
      this.currentDom = $e.target
      let h = $e.target.getBoundingClientRect().top
      let level3 = this.currentDom.parentElement.getElementsByTagName('ul')[0]
      let d = h + level3.offsetHeight - document.body.offsetHeight
      if (d > 0) {
        h = document.body.offsetHeight - level3.offsetHeight
        // this.showLeftBorder = true // 特殊情况下，补全悬浮菜单左边框
      } else {
        this.showLeftBorder = false
      }
      this.lv3DomHeight = h + 'px'
    },
    isLast(item1, index1, index2) {
      // 判断菜单是否是最后一个
      if (
        index1 === this.list.length - 1 &&
        index2 === item1.children.length - 1
      ) {
        return true
      } else {
        return false
      }
    },
    mouseScroll() {
      // 滚动滚轮，显示滚动条
      this.showScroll = true
      if (this.timer) {
        clearTimeout(this.timer)
      }
      // 1秒后移除滚动条
      this.timer = setTimeout(
        function() {
          if (this.showScroll) {
            this.showScroll = false
          }
        }.bind(this),
        1000
      )
    },
    scrolls() {
      // 滚动时，悬浮菜单跟着移动
      if (this.currentDom) {
        this.lv3DomHeight = this.currentDom.getBoundingClientRect().y + 'px'
      }
    },
    hasOpenPage(pageTitle) {
      return this.openList.indexOf(pageTitle) !== -1
    },
    changePage(item) {
      this.openPage(item)
      this.setCurPage(item.name)
    },
    ...mapMutations({
      openPage: types.OPEN_PAGE,
      setCurPage: types.SET_CURRENT_PAGE_NAME,
    }),
    /**
       * 获取指定元素相对窗口最上方的像素距离
       * @author 张澈
       * @param dom Element 对象
       * @returns {number}
       */
    getPositionY(dom) {
      let y = 0
      let body = document.body
      let root = document.documentElement
      do {
        y +=
          dom.offsetTop +
          ~~parseInt(window.getComputedStyle(dom)['border-top-width'])
        dom = dom.offsetParent
      } while (dom && dom !== body && dom !== root)
      return y
    },
    /**
       * 在菜单上绑定的用于处理拖拽的函数
       * @author 张澈
       * @param event
       */
    dragMouseDown(event) {
      let tree = this.$refs['tree']
      let target = event.srcElement
      while (target.nodeName.toLowerCase() !== 'li') {
        target = target.parentNode
      }
      let children = target.parentNode.children
      let level = target.parentNode.className
      for (let i = 0; i < children.length; i++) {
        if (
          level === 'level1' &&
          this.openList.indexOf(children[i].getAttribute('data-title')) >= 0
        ) {
          return
        }
      }
      let parentPositionY = this.getPositionY(target.parentNode)
      target.style.position = 'relative'
      target.className += ' target'
      this.dragging = {
        target: target,
        tree: tree,
        children: children,
        targetIndex: (function(children) {
          for (let i = 0; i < children.length; i++) {
            if (children[i] === target) {
              return i
            }
          }
        })(children),
        oy: event.pageY - parentPositionY + tree.scrollTop,
        preY: event.pageY,
        start: false,
        height: target.offsetHeight,
        curIndex: null,
        parentPositionY: parentPositionY,
        level: level,
        parentTitle: (function() {
          if (level === 'level1') {
            return null
          } else {
            let parentItem = target
            do {
              parentItem = parentItem.parentNode
            } while (parentItem.nodeName.toLowerCase() !== 'li')
            return parentItem.getAttribute('data-title') || ''
          }
        })(),
      }
      document.body.addEventListener('mouseup', this.dragMouseUp)
    },
    /**
       * 在菜单上绑定的用于处理拖拽的函数
       * @author 张澈
       * @param event
       */
    dragMouseMove(event) {
      let data = this.dragging
      let y = event.pageY - data.parentPositionY + data.tree.scrollTop
      let dy = y - data.oy
      if (!data.start) {
        if (Math.abs(dy) > 15) {
          data.start = true
          data.target.style['z-index'] = '10000'
        }
        return
      }
      let target = data.target
      let children = target.parentNode.children
      target.style.top = dy + 'px'
      let height = data.height
      let curIndex = Math.floor(
        y / height + (event.pageY - data.preY > 0 ? 0.5 : 0.5)
      )
      data.preY = event.pageY
      if (curIndex < 0) {
        curIndex = 0
      }
      if (curIndex > children.length) {
        curIndex = children.length
      }
      let targetIndex = data.targetIndex
      if (data.curIndex === curIndex) {
        return
      } else {
        data.curIndex = curIndex
      }
      if (curIndex < targetIndex) {
        let i
        for (i = 0; i < curIndex; i++) {
          children[i].style.top = '0'
        }
        for (i = curIndex; i < targetIndex; i++) {
          children[i].style.top = height + 'px'
        }
        for (i = targetIndex + 1; i < children.length; i++) {
          children[i].style.top = '0'
        }
      } else if (curIndex > targetIndex) {
        let i
        for (i = 0; i < targetIndex; i++) {
          children[i].style.top = '0'
        }
        for (i = targetIndex + 1; i < curIndex; i++) {
          children[i].style.top = -height + 'px'
        }
        for (i = curIndex; i < children.length; i++) {
          children[i].style.top = '0'
        }
      } else {
        for (let i = 0; i < children.length; i++) {
          if (i !== targetIndex) {
            children[i].style.top = '0'
          }
        }
      }
    },
    /**
       * 在拖拽开始时绑定到body上以做拖拽后续处理的函数
       * @author 张澈
       */
    dragMouseUp() {
      if (!this.dragging || !this.dragging.start) {
        this.dragging = null
        return
      }
      let data = this.dragging
      let { target, children, targetIndex, curIndex } = data
      this.dragging = null
      for (let i = 0; i < children.length; i++) {
        children[i].style.top = '0'
      }
      target.style['z-index'] = 'auto'
      target.className = target.className.replace(' target ', ' ')
      document.body.removeEventListener('mouseup', this.dragMouseUp)
      if (targetIndex === curIndex) {
        return
      }
      let originListAccessor = (function() {
        if (data.level === 'level1') {
          return [this, 'list']
        } else {
          let parentTitle = data.parentTitle
          return (function() {
            let result = null
            let len = this.list.length
            for (let i = 0; i < len; i++) {
              if (this.list[i].title === parentTitle) {
                result = [this.list[i], 'children']
                break
              }
            }
            if (result === null) {
              throw new Error('error in attempt to get parent menu item')
            }
            return result
          }.call(this))
        }
      }.call(this))
      let originList = originListAccessor[0][originListAccessor[1]]
      if (children[curIndex]) {
        let newList = []
        for (let i = 0; i < children.length; i++) {
          if (i === targetIndex) {
            continue
          }
          if (i === curIndex) {
            newList.push(originList[targetIndex])
          }
          newList.push(originList[i])
        }
        //          originList = originListAccessor[0][originListAccessor[1]] = newList
        originList.length = 0
        for (let i = 0; i < newList.length; i++) {
          originList[i] = newList[i]
        }
      } else {
        let newList = []
        for (let i = 0; i < children.length; i++) {
          if (i === targetIndex) {
            continue
          }
          newList.push(originList[i])
        }
        newList.push(originList[targetIndex])
        //          originList = originListAccessor[0][originListAccessor[1]] = newList
        originList.length = 0
        for (let i = 0; i < newList.length; i++) {
          originList[i] = newList[i]
        }
      }
      originList.forEach(function(item, index) {
        item.weight = index
      })
      this.saveList(originList, data.parentTitle)
    },
    /**
       * 对整个菜单进行排序
       * @author 张澈
       */
    menuRange() {
      this.getConfig(this.userInfo.id).then((udata) => {
        if (!udata) {
          return
        }
        this.list.forEach(item => {
          let parentTitle = item.title
          let data = udata[parentTitle] && udata[parentTitle].children
          if (data && item.children && item.children.length) {
            this.menuSort(item.children, data)
          }
        })
        this.menuSort(this.list, udata)

        let newList = []
        for (let i = 0; i < this.list.length; i++) {
          newList[i] = this.list[i]
        }
        this.list = newList
      })
    },
    /**
       * 对制定菜单项进行排序
       * @author 张澈
       * @param list 菜单项数组
       * @param data 相关配置数据
       */
    menuSort(list, data) {
      // 因为菜单title存在重复，在同级菜单存在重复的情况下，可能出现死循环
      // 暂时在存在重复的情况下不执行排序
      let set = {}
      list.forEach(item => {
        set[item.title] = 1
      })
      if (Object.keys(set).length !== list.length) {
        return
      }

      let newList = null
      for (let i = 0; i < list.length; i++) {
        let itemData = data[list[i].title]
        if (itemData && typeof itemData.weight === 'number') {
          newList = newList || []
          newList[itemData.weight] = list[i]
        }
      }
      if (!newList) {
        return
      }
      for (let i = 0, j = 0; i < list.length; i++) {
        let itemData = data[list[i].title]
        if (!itemData || typeof itemData.weight !== 'number') {
          while (newList[j]) {
            j++
          }
          newList[j] = list[i]
        }
      }

      for (let i = 0, j = 0; i < newList.length; i++) {
        // while (!newList[i]) {
        //   continue
        // }
        list[j++] = newList[i]
      }
    },
    /**
       * 将列表排序保存到用户配置
       * @author 张澈
       * @param list
       */
    saveList(list, parentTitle) {
      let data = {}
      list.forEach(function(item) {
        if (!isNaN(item.weight)) {
          data[item.title] = { weight: item.weight }
        }
      })
      this.saveConfig_fs({
        userId: this.userInfo.id,
        data: {
          menuWeight: parentTitle ? { [parentTitle]: { children: data } } : data,
        },
      })
    },
  },
}
</script>
<style lang="less" scoped>
@import (reference) "~assets/less/color.less";
@import (reference) "~assets/less/public.less";

/* dragging */

.level1.dragging {
  position: relative;
}
.level1.dragging .level2 {
  position: relative;
}
.indicator {
  position: absolute;
  left: 0;
  z-index: 9999;
  background-color: #c7d9ff;
  border: 1px dashed #72b7ff;
  opacity: 0.5;
  box-sizing: border-box;
  border-radius: 3px;
}
.level1.dragging li {
  position: relative;
  /*transition: top 0.1s linear;*/
}
/*.level1.dragging li.target{*/
/*transition: none;*/
/*}*/
/* dragging */

.tree {
  user-select: none;
  position: absolute;
  top: 0;
  left: @mainMenuWidth;
  bottom: 0;
  width: @menuTreeWidth;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: #f5f7fa;
  border-right: 1px solid @menuTreeBorder;
  z-index: 1;
}

.level1 > li {
  border-bottom: 1px solid @menuTreeLevel1ItemBorder;
}

.level1 > li:nth-last-child(1) {
  border-bottom: none;
}

.level1 > li:nth-last-child(1) .level2 > li:nth-last-child(1) .item2 {
  border-bottom: 1px solid rgba(217, 217, 217, 0.5);
}

// .level1 > li .item1:hover span {
//   color: @menuTreeLevel1TextLight;
// }
// .level1 > li .item1:hover .ivu-icon-ios-arrow-down {
//   color: @menuTreeLevel1TextLight;
// }

// .level1 > li:last-child {
//   border-bottom: 1px solid #f3f8ff;
// }

// .level2 > li {
//   border-bottom: 1px solid #bfdaff;
// }

.level2 > li:last-child {
  border-bottom: none;
}

.level2 .bottom_border {
  border-bottom: 1px solid @menuTreeLevel2ItemBorder !important;
}

.level3 {
  display: none;
  position: fixed;
  margin-left: @menuTreeWidth;
  margin-top: -1px;
  border: 1px solid rgba(217, 217, 217, 0.5);
  border-left: none;
}

// .level3 > li {
//   // border-right: 1px solid @menuTreeLevel3ItemBorder;
//   border-right: 1px solid rgba(217, 217, 217, 0.5);
// }

// .level3 > li:first-child {
//   // border-top: 1px solid @menuTreeLevel3ItemBorder;
//   border-right: 1px solid rgba(217, 217, 217, 0.5);
// }

// .level3 > li:last-child {
//   // border-bottom: 1px solid @menuTreeLevel3ItemBorder;
//   border-right: 1px solid rgba(217, 217, 217, 0.5);
// }

// .level3 > .left_border {
//   border-left: 1px solid rgba(217, 217, 217, 0.5) !important;
// }

.level2 > li:hover {
  // background-color: @menuTreeLevel2ItemHover;
  background-color: @menuTreeHoverBg;
}

.level2 > li:nth-last-child(1) .item2 {
  border-bottom: none;
}

.level2 > li:hover .level3 {
  display: block;
}

// .level2 > li:hover .ivu-icon-ios-arrow-right {
//   display: none;
// }
.tree_item {
  display: flex;
  // width: @menuTreeWidth;
  height: 50px;
  align-items: center;
  cursor: pointer;
}

.item1 {
  background: #fff;
  position: relative;
}

.item2 {
  // background: @menuTreeLevel2ItemBg;
  margin-left: 30px;
  border-bottom: 1px solid rgba(217, 217, 217, 0.5);
}

.level2 .wrapper{
  position: relative;
}

.item3 {
  display: flex;
  position: relative;
  height: 50px;
  align-items: center;
  cursor: pointer;
  // background: @menuTreeLevel3ItemBg;
  background-color: #dff0ff;
}

.item1 span {
  font-size: 14px;
  // font-family: "Microsoft YaHei";
  // color: @menuTreeLevel1Text;
  color: #111111;
  word-wrap: break-word;
  word-break: break-all;
  text-align: left;
  padding-left: 16px;
  padding-right: 12px;
}

.item2 span {
  font-size: 12px;
  // font-family: "Microsoft YaHei";
  // color: @menuTreeLevel2Text;
  color: #4a4a4a;
  word-wrap: break-word;
  word-break: break-all;
  text-align: left;
  padding-left: 0;
  padding-right: 12px;
}

.item3 span {
  font-size: 12px;
  // font-family: "Microsoft YaHei";
  color: @menuTreeLevel3Text;
  text-align: left;
  padding-left: 30px;
  padding-right: 30px;
}

.item3:hover span {
  color: @menuTreeLevel3TextLight;
}

.tree_item .ivu-icon-ios-arrow-down,
.tree_item .ivu-icon-ios-arrow-right {
  position: absolute;
  left: 147px;
  width: 11px;
  top: 16px;
  height: 18px;
  font-size: 18px;
  // color: @menuTreeIcon;
  color: #cccccc;
  transition: all 0.1s;
}

.level2 > li:hover .ivu-icon-ios-arrow-right {
  display: none;
}

.tree_item .ivu-icon-ios-arrow-down.expand {
  // color: #348fff;
  transform: rotate(180deg);
}

.item3.router-link-active {
  color: @menuTreeLevel3TextLight;
}

// .item1.active span {
//   color: @menuTreeLevel1TextLight;
// }
</style>
