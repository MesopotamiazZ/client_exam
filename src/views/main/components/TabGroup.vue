<template>
  <div @mousewheel="handleScroll" class="tab-group">
    <div class="line"></div>
    <div class="scroll-container" ref="scrollCon">
      <div class="scroll-body" :style="{left: `${scrollLeftOffset}px`}" ref="scrollBody">
        <template v-for="tag in pageOpenList">
          <div :key="tag.name" class="item curPointer" :name="tag.name" :class="{active: curPageName === tag.name}" @click="changePage(tag)" ref="openTag">
            <div class="wrapper">
              <span class="font12 overflowEllipsis">{{generateTitle(tag.title)}}</span>
            </div>
            <!-- <Icon class="close" type="ios-close-empty" @click.native.stop="handleClose(tag)"></Icon> -->
            <icon name="modal_close_default" @click.native.stop="handleClose(tag)"></icon>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import * as types from '@/store/types'
  import {generateTitle} from '@/utils/i18n'

  export default {
    name: 'tabs',
    data() {
      return {
        tags: [],
        scrollLeftOffset: 0,
      }
    },
    methods: {
      generateTitle,
      handleScroll(e) {
        let left = 0
        if (e.wheelDelta > 0) {
          left = Math.min(0, this.scrollLeftOffset + e.wheelDelta)
        } else {
          if (
            this.$refs.scrollCon.offsetWidth < this.$refs.scrollBody.offsetWidth
          ) {
            if (
              this.scrollLeftOffset <
              -(
                this.$refs.scrollBody.offsetWidth -
                this.$refs.scrollCon.offsetWidth
              )
            ) {
              left = this.scrollLeftOffset
            } else {
              left = Math.max(
                this.scrollLeftOffset + e.wheelDelta,
                this.$refs.scrollCon.offsetWidth -
                  this.$refs.scrollBody.offsetWidth
              )
            }
          } else {
            this.scrollLeftOffset = 0
          }
        }
        this.scrollLeftOffset = left
      },
      handleClose(item) {
        this.closePage(item.name)
        this.$nextTick(() => {
          let scrollCon = this.$refs.scrollCon
          let scrollBody = this.$refs.scrollBody
          if (scrollBody.offsetWidth + parseInt(window.getComputedStyle(scrollBody).left) < scrollCon.offsetWidth) {
            if (scrollBody.offsetWidth > scrollCon.offsetWidth) {
              scrollBody.style.left = scrollCon.offsetWidth - scrollBody.offsetWidth + 'px'
            } else {
              scrollBody.style.left = '0'
            }
          }
        })
      },
      changePage(item) {
        this.setCurPage(item.name)
        this.$router.push({name: item.name})
      },
      moveToView(tag) {
        if (tag.offsetLeft < -this.scrollLeftOffset) {
          // 标签在可视区域左侧
          // 第一个元素
          if (tag.offsetLeft === 0) {
            this.scrollLeftOffset = 0
          } else {
            this.scrollLeftOffset = -tag.offsetLeft + 20
          }
        } else if (
          tag.offsetLeft + 20 > -this.scrollLeftOffset &&
          tag.offsetLeft + tag.offsetWidth <
            -this.scrollLeftOffset + this.$refs.scrollCon.offsetWidth
        ) {
          // 标签在可视区域
        } else {
          // 标签在可视区域右侧
          // 最后一个元素
          if (
            this.$refs.scrollBody.offsetWidth ===
            tag.offsetLeft + tag.clientWidth
          ) {
            this.scrollLeftOffset = -(
              tag.offsetLeft -
              (this.$refs.scrollCon.offsetWidth - tag.offsetWidth)
            )
          } else {
            this.scrollLeftOffset = -(
              tag.offsetLeft -
              (this.$refs.scrollCon.offsetWidth - tag.offsetWidth) +
              20
            )
          }
        }
      },
      ...mapMutations({
        setCurPage: types.SET_CURRENT_PAGE_NAME,
        closePage: types.CLOSE_PAGE,
      }),
    },
    computed: {
      ...mapState(['pageOpenList', 'curPageName']),
    },
    watch: {
      curPageName() {
        let index = false
        if (this.$refs.openTag && this.$refs.openTag.length) {
          this.$refs.openTag.some((item, i) => {
            if (item.getAttribute('name') === this.curPageName) {
              index = i
              return true
            }
            return false
          })
        }
        if (index !== false) {
          this.moveToView(this.$refs.openTag[index])
        } else {
          let scrollBodyWidth = this.$refs.scrollBody.offsetWidth
          let screenWidth = document.body.offsetWidth
          let dWidth =
            scrollBodyWidth + this.scrollLeftOffset + 225 + 10 + 150 - screenWidth
          if (dWidth > 0) {
            this.scrollLeftOffset -= dWidth + 10
          }
        }
      },
    },
  }
</script>
<style lang="less" scoped>
  @import (reference) '~assets/less/public.less';
  .tab-group {
    height: 51px;
    padding-left: 10px;
    padding-right: 10px;
    position: relative;
    background-color: @allBg;
    overflow: hidden;
    user-select: none;

    .scroll-container {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .scroll-body {
      display: flex;
      height: 100%;
      align-items: flex-end;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: all 300ms;

      .item {
        position: relative;
        display: flex;
        width: 150px;
        height: 42px;
        align-items: flex-end;

        .wrapper {
          width: 100%;
          height: 30px;
          text-align: center;
          border-left: 1px solid @tagGroupBorder;

          span {
            display: inline-block;
            width: 106px;
            color: @tagGroupText;
            margin-top: 2px;
          }
        }

        &:nth-child(1) .wrapper {
          border-left: none;
        }

        &:nth-last-child(1) .wrapper {
          border-right: 1px solid @tagGroupBorder;
        }

        .close {
          position: absolute;
          font-size: 22px;
          right: 8px;
          top: 10px;
        }

        .fa-icon {
          display: none;
          fill: #828282;
          padding: 3px;
          position: absolute;
          top: 14px;
          right: 4px;
          border-radius: 50%;
          cursor: pointer;
        }

        .fa-icon:hover {
          fill: white;
          background: #ff6262;
          border-radius: 50%;
        }

        &:hover .fa-icon{
          display: inline-block;
        }
      }

      .item.active {
        padding-left: 20px;
        padding-right: 20px;
        background-color: @backgourdWithe;
        border: 1px solid @tagGroupBorder;
        border-bottom: none;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;

        .wrapper {
          border-left: none;
          border-right: none;

          span {
            color: @tagGroupTextLight;
          }
        }

        .fa-icon {
          display: inline-block;
        }

        & + .item .wrapper {
          border-left: none;
        }
      }
    }

    .line {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background-color: @tagGroupBorder;
    }
  }
</style>
