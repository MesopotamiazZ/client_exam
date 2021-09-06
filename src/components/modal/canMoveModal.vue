/**
* Created 黄伟
* Date: 2018/1/7
* Time: 15:16
* content: 主检
*/
<template>
<div class= "orientationModal">
  <!--单位体检报告审核-->
  <div class="orientationModal-content"  v-show="moveModal" :style="{width: width + 'px', height: height + 'px'}" ref="panel">
    <div @mousedown="down">
      <titletHasSlot style="background:#F2F5FA;">
        <span slot='titletHasSlotLeftTitle'>{{title}}</span>
        <div slot="titletHasSlotRightContent">
          <div class="orientationModal-rightClassTransitionFlex" @click="close">
            <icon class="icon_close" name="modal_close_default"></icon>
          </div>
        </div>
      </titletHasSlot>
    </div>
    <div class="panel_container">
      <template v-if="componentName" :is="componentName" ></template>
      <slot></slot>
    </div>
  </div>
  <!--<button @click="click">1111</button>-->
</div>
</template>
<script>
  import titletHasSlot from '@/components/titleHasSlot'

  export default {
    name: 'moModeal',
    props: {
      componentName: '',
      title: {
        type: String,
        default: '这里是标题',
      },
      width: {
        type: Number,
        default: 1006,
      },
      height: {
        type: Number,
        default: 292,
      },
    },
    data() {
      return {
        //      isMove: false,
        //      dx: 0,
        //      dy: 0,
        //      sx: 0,
        //      sy: 0,
        moveModal: false,
        curX: undefined,
        curY: undefined,
        panelX: undefined,
        panelY: undefined,
        panel: (() => {
          this.$nextTick(() => {
            this.panel = this.$refs.panel
          })
        })(),
      }
    },
    components: {
      titletHasSlot,
    },
    watch: {
      moveModal(val) {
        let panel = this.$refs.panel
        panel.style.top =
          Math.floor((panel.offsetParent.offsetHeight - panel.offsetHeight) / 2) +
          'px'
        panel.style.left =
          Math.floor((panel.offsetParent.offsetWidth - panel.offsetWidth) / 2) +
          'px'
      },
    },
    methods: {
      //    click() {
      //      let content = document.querySelectorAll('.orientationModal-content')[0]
      //      content.style.left = '50px'
      //      content.style.top = '50px'
      //    },
      //    mousedown() {
      //      console.log(event)
      //      let content = document.querySelectorAll('.orientationModal-content')[0]
      //      this.dx = event.clientX
      //      this.dy = event.clientY
      //      this.sx = parseInt(content.style.left)
      //      this.sy = parseInt(content.style.top)
      //      if (!this.isMove) {
      //        this.isMove = true
      //      }
      //    },
      //    mousemove(e) {
      //      console.log(this.isMove)
      //      if (this.isMove) {
      //        let content = document.querySelectorAll('.orientationModal-content')[0]
      //        let contentStyle = window.getComputedStyle(content)
      //        let h1 = contentStyle.height
      //        let w1 = contentStyle.width
      //        let orientationModal = document.querySelectorAll('.orientationModal')[0]
      //        let elemnt = window.getComputedStyle(orientationModal)
      //        let h = elemnt.height
      //        let w = elemnt.width
      //        let differh = parseInt(h) - parseInt(h1)
      //        let differw = parseInt(w) - parseInt(w1)
      //        if (e.clientY - (this.dy - this.sy) > 0 && e.clientX - (this.dx - this.sx) > 0 & e.clientY - (this.dy - this.sy) < differh & e.clientX - (this.dx - this.sx) < differw) {
      //          content.style.top = e.clientY - (this.dy - this.sy) + 'px'
      //          content.style.left = e.clientX - (this.dx - this.sx) + 'px'
      //        }
      //      }
      //    },
      //    mouseup() {
      //      console.log('11')
      //      if (this.isMove) {
      //        this.isMove = false
      //      }
      //    },
      down() {
        this.curX = event.clientX
        this.curY = event.clientY
        this.panelX = this.panel.offsetLeft
        this.panelY = this.panel.offsetTop
        window.addEventListener('mousemove', this.move)
        window.addEventListener('mouseup', this.up)
      },
      move(e) {
        console.log('fdfff', this.panel.offsetParent)
        let x = this.panelX + e.clientX - this.curX
        let y = this.panelY + e.clientY - this.curY
        if (x < 0) x = 0
        if (y < 0) y = 0
        let maxX = this.panel.offsetParent.offsetWidth - this.panel.offsetWidth
        let maxY = this.panel.offsetParent.offsetHeight - this.panel.offsetHeight
        if (x > maxX) x = maxX
        if (y > maxY) y = maxY
        this.panel.style.left = x + 'px'
        this.panel.style.top = y + 'px'
      },
      up() {
        window.removeEventListener('mousemove', this.move)
        window.removeEventListener('mouseup', this.up)
      },
      open() {
        this.moveModal = true
      },
      close() {
        this.moveModal = false
      },
    },
    mounted() {
      let panel = this.$refs.panel
      panel.style.top = Math.floor((panel.offsetParent.offsetHeight - panel.offsetHeight) / 2) + 'px'
      panel.style.left = Math.floor((panel.offsetParent.offsetWidth - panel.offsetWidth) / 2) + 'px'
    },
    //  mounted() {
    //    window.addEventListener('mouseup', this.mouseup)
    //  },
    //  destroyed() {
    //    window.removeEventListener('mouseup', this.mouseup)
    //  },
  }
</script>
<style lang="less" scoped>
  @import (reference) '~assets/less/variable.less';

  .orientationModal-rightClassTransitionFlex {
    cursor: pointer;
    position: absolute;
    width: 20px;
    height: 20px;
    background: #b3b3b3;
    border-radius: 16px;
    line-height: 30px;
    text-align: center;
    top: 12px;
    right: 12px;
    > svg {
      width: 10px;
      height: 10px;
      color: @tableTr;
    }
  }
  .orientationModal-rightClassTransitionFlex:hover {
    cursor: pointer;
    position: absolute;
    background: @tsIconHover;
  }
  .orientationModal {
    height: 100%;
  }
  .orientationModal-content {
    position: absolute;
    top: 40px;
    left: 10px;
    overflow: hidden;
    box-shadow: 0 0 1px gray;
    z-index: 99999999999;
    background-color: white;
  }
  .panel_bar {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    -webkit-user-select: none;
    background: linear-gradient(
      to right,
      rgba(242, 245, 250, 1) 0,
      rgba(242, 245, 250, 0) 40px
    );
    font-size: 17px;
    span {
      cursor: default;
      &:before {
        content: '';
        display: inline-block;
        height: 1.1em;
        background-color: #008cee;
        width: 4px;
        margin-right: 5px;
        position: relative;
        top: 3px;
      }
    }
  }
  .panel_container {
  }
</style>
