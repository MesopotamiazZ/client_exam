<template>
  <div class="currentInfo marginL10 marginR10 ">
    <div class="info-left fl"
         @mouseenter="mouseEnter"
         @mouseleave="mouseLeave">
      <p class="fl marginL20 marginR20 click-style current-dept"
      @mouseenter = "deptMouseEnter"
      @mouseleave = "deptMouseLeave"
         @click="handleDept">当前科室：
        <span>{{deptName}}</span>
      </p>
      <p class="click-style fl"
         @click="handleOpenCheckup">{{seperateCheckupTitle}}：
        <span>{{willCheckup}}人</span>
      </p>
      <p v-if="isLastCheckup"
         class="click-style fl paddingL20"
         @click="handleOpenCheckup">已主检人数：
        <span>{{beCheckuped}}人</span>
      </p>
      <p class="click-style icon"
         :style="{background: isShowBox? backgroundIconDown : backgroundIconUp}"
         @click="handleOpenCheckup"></p>
    </div>
    <div class="info-right fr"
         v-if="isShowInstrumentConnection">
      <span class="fl">当前电脑连接仪器:</span>
      <div class="scroll">
        <div class="info-container-wrapper fl marginL10">
          <ul class="info-container">
            <li v-for="item in carouselData">
              <span>{{item.instrument}}</span>
              <a :class="[!!item.status?'success': 'error']">{{item.status?'正常':"异常"}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="current-dept-tooltip" v-if="tooltipVisible">
      <span>{{deptName}}</span>
      <!-- <i></i> -->
      <!-- <z-tooltip :visible="tooltipVisible" content="sssssssss"></z-tooltip> -->
    </div>
  </div>
</template>
<script>
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
  props: {
    carouselData: {
      type: Array,
      default() {
        return []
      },
    },
    willCheckup: {
      type: Number,
      default: 0,
    },
    beCheckuped: {
      type: Number,
      default: 0,
    },
    isShowInstrumentConnection: {
      // 是否显示仪器连接
      type: Boolean,
      default: false,
    },
    isShowBox: {
      type: Boolean,
      default: false,
    },
    // 当前科室名称
    curOfficeNames: {
      type: Array,
      default() {
        return []
      },
    },
    // 是否主检
    isLastCheckup: {
      type: Boolean,
      default: true,
    },
    // 分检title
    seperateCheckupTitle: {
      type: String,
      default: '可主检人数',
    },
  },
  data() {
    return {
      curInfoContainer: null, // 移动的元素
      curInfoContaienrWidth: 0,
      curTimer: null, // 定时器
      curMoveNode: null, // 当前移动的元素
      curMoveWidth: 0,
      isAtCenter: true,
      backgroundIconUp: "url('/static/icons/public/green_triangle_up.png')",
      backgroundIconDown: "url('/static/icons/public/green_triangle_down.png')",
      observer: null,
      isMouseInCrossBandLeft: false,
      deptName: '',
      tooltipVisible: false,
    }
  },
  mounted() {
    this.observer = elementResizeDetectorMaker()
    let scrollEl = document.querySelector('.scroll')
    this.observer.listenTo(scrollEl, this.recalculateSize)
  },
  watch: {
    curOfficeNames: {
      // 初始化页码
      handler(val) {
        let deptnames = []
        for (let obj of this.curOfficeNames) {
          deptnames.push(obj.dept.name)
        }
        this.deptName = deptnames.join(',')
      },
      deep: true,
    },
  },
  methods: {
    deptMouseEnter() {
      this.tooltipVisible = true
    },
    deptMouseLeave() {
      this.tooltipVisible = false
    },
    recalculateSize() {
      if (this.isShowInstrumentConnection) {
        this.curInfoContainer = document.querySelector('.info-container')
        this.curInfoContaienrWidth = parseInt(
          getComputedStyle(this.curInfoContainer).width,
        )
        let infoItems = document.querySelectorAll('.info-container>li')
        for (let i = 0; i < infoItems.length; i++) {
          infoItems[i].style.left = `${this.curInfoContaienrWidth}px`
        }
        // clearTimeout(this.curTimer)
        // this.curTimer = null
        this.animation()
      }
    },
    animation() {
      clearTimeout(this.curTimer)
      this.curTimer = null

      this.curMoveNode = this.curInfoContainer.children[0]
      this.curMoveWidth = parseInt(getComputedStyle(this.curMoveNode).width)
      this.curTimer = setTimeout(() => {
        this.curMoveNode = this.curInfoContainer.children[0]
        let curMoveLeft = parseInt(getComputedStyle(this.curMoveNode).left)
        this.curMoveNode.style.left = curMoveLeft - 1 + 'px'
        if (
          this.isAtCenter &&
          (this.curInfoContaienrWidth - this.curMoveWidth) / 2 > curMoveLeft
        ) {
          // clearInterval(this.curTimer)
          this.curTimer = null
          setTimeout(() => {
            clearTimeout(this.curTimer)
            this.curTimer = null
            this.isAtCenter = false
            this.animation()
          }, 2000)
        } else if (curMoveLeft < -this.curMoveWidth) {
          this.isAtCenter = true
          // clearInterval(this.curTimer)
          this.curTimer = null
          let cloneNode = this.curMoveNode.cloneNode(true)
          cloneNode.style.left = `${this.curInfoContaienrWidth}px`
          this.curInfoContainer.removeChild(this.curMoveNode)
          this.curInfoContainer.appendChild(cloneNode)

          this.animation()
        } else {
          this.animation()
        }
      }, 20)
    },
    // 侯检人数
    handleOpenCheckup() {
      this.$emit('open-check-up-modal')
    },
    // 当前科室
    handleDept() {
      this.$emit('open-dept-choices-modal')
    },
    // 鼠标移入/出左边部分
    mouseEnter() {
      this.isMouseInCrossBandLeft = true
      this.$emit('cross-band-mouse-pos', this.isMouseInCrossBandLeft)
    },
    mouseLeave() {
      this.isMouseInCrossBandLeft = false
      this.$emit('cross-band-mouse-pos', this.isMouseInCrossBandLeft)
    },
  },
  beforeDestroy() {
    // 清除定时器
    clearTimeout(this.curTimer)
    this.curTimer = null
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
@import '~assets/less/color.less';
@import '~assets/less/iviewPublic';
// 连接仪器动态效果
.currentInfo {
  overflow: hidden;
  margin: 0 auto;
  height: 30px;
  width: 100%;
  line-height: 30px;
  background-color: @backgourdWithe;
  border-radius: 15px;
  box-shadow: 0 2px 15px 0 rgba(206, 213, 242, 0.7);
  .info-left {
    width: 48%;
    overflow: hidden;
    p > span {
      color: @gradeBlueOne;
    }
    p.icon {
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-left: 5px;
      margin-top: 8px;
      background: url('/static/icons/public/green_triangle_up.png');
    }
    .click-style {
      &.current-dept {
        max-width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  .info-right {
    width: 50%;
    margin-left: 10px;
    .scroll {
      width: 75%;
      height: 30px;
      overflow: hidden;
      position: relative;
      .info-container-wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        .info-container {
          width: 100%;
          position: absolute;
          left: 0;
          & > li {
            display: inline-block;
            position: relative;
            // margin-right: 10px;
            & > a {
              // display: inline-block;
              padding: 2px 8px;
              border-radius: 4px;
              color: #fff;
              &.success {
                background-color: @sidebarTopIcon;
              }
              &.error {
                background-color: #ee3b3b;
              }
            }
          }
        }
      }
    }
  }
  // tooltip样式
  .current-dept-tooltip {
    z-index: 999;
    position: absolute;
    max-width: 200px;
    padding: 10px;
    background: #fff;
    top: 40px;
    left: 90px;
    border: 1px solid @gradeAshFive;
    border-radius: 4px;
    line-height: 24px;
    color: @gradeAshTwo;
    // i{
    //   display: inline-block;
    //   width: 0;
    //   height: 0;
    //   border: 4px solid transparent;
    //   border-bottom: 6px solid #fff;
    //   position: absolute;
    //   top: -10px;
    //   // left:
    // }
  }
}
</style>

