<template>
  <div class="tooltip" ref="Ztooltip">
      <div @mouseover="wrapMouseOver" @mouseout="wrapMouseOut" ref="reference">
          <slot></slot>
      </div>
      <div @mouseenter="popperMouseEnter" @mouseleave="popperMouseLeave" class="popper" ref="popperWrapper" v-show="popperShow">
        <!-- 暂时取消自定义插入元素 -->
          <!-- <slot v-if="content"></slot>
          <p v-else></p> -->
          {{context}}
      </div>
      <zContextMenu :contextMenuData="contextMenuData" @copy="copy"></zContextMenu>
  </div>
</template>

<script>
  /**
   * 内容提示框组件
   * @author xiaok
   * @date 2017/12/26
   */
  import Popper from '@/../static/vendor/popper/popper.min'
  import zContextMenu from '@/components/tools/zContextmenu'
  import { mapActions } from 'vuex'
  export default {
    name: 'Ztooltip',
    components: {
      zContextMenu,
    },
    props: {
      // 气泡位置
      placement: {
        default: () => {
          return 'top-start'
        },
      },
      //   触发元素（class名）
      trigger: {
        default: () => {
          return false
        },
      },
      // 边界元素
      boundaries: {
        default: () => {
          return 'tbody'
        },
      },
      content: {
        default: () => {
          return false
        },
      },
    },
    data() {
      return {
        popper: null, // popper 实例对象
        context: '', // popper 显示文字
        reference: false, // reference 触发对象
        popperShow: false,
        referenceOnListen: false,
        delay: 100,
        timeout: null,
        // 鼠标右键
        onContextMenu: false,
        nextClick: false,
        tempCopyData: null,
        contextMenuData: {
          menuName: `popper`,
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
      ...mapActions(['setClipboard']),
      wrapMouseOver(e) {
        if (this.onContextMenu) {
          return false
        }
        this.reference = this.returnElm(e)
        if (this.reference) {
          this.createPopper(this.reference)
        }
      },

      wrapMouseOut(e) {
        //
      },
      //   popper event
      popperMouseEnter(e) {
        this.referenceEnter()
      },
      popperMouseLeave(e) {
        this.referenceLeave()
      },
      // 配置popper
      setPopper() {
        let boundaries = null
        if (
          this.$refs.Ztooltip.getElementsByClassName(this.boundaries).length > 0
        ) {
          boundaries = this.$refs.Ztooltip.getElementsByClassName(
            this.boundaries
          )[0]
        } else if (
          this.$refs.Ztooltip.getElementsByTagName(this.boundaries).length > 0
        ) {
          boundaries = this.$refs.Ztooltip.getElementsByTagName(
            this.boundaries
          )[0]
        } else {
          boundaries = ''
        }

        return {
          // 放置位置
          placement: this.placement,
          //   // 创建回调
          // onCreate: data => {
          // },
          //   // 更新回调
          // onUpdate: data => {
          // },
          styles: {
            marginLeft: '5px',
          },
          // 修饰符
          modifiers: {
            preventOverflow: {
              enabled: true,
              boundariesElement: boundaries,
            },
          },
        }
      },

      // create Instance elm:触发元素
      createPopper(elm) {
        // TODO: 延时不可用
        // if (this.timeout) clearTimeout(this.timeout)
        // this.timeout = setTimeout(() => {
        try {
          if (elm) {
            let options = this.setPopper()
            this.popper = new Popper(elm, this.$refs.popperWrapper, options)
            document.execCommand('unselect')
            this.showPopper()
            elm.addEventListener('mouseenter', this.referenceEnter)
            elm.addEventListener('mouseleave', this.referenceLeave)
            this.$refs.popperWrapper.addEventListener(
              'contextmenu',
              this.popperContextMenu
            )
            this.$nextTick(() => {
              this.popper.update()
            })
          }
        } catch (err) {
          // console.error(err)
        }
        // }, this.delay)
        // console.log(this.timeout)
      },

      // show Popper
      showPopper() {
        if (this.context.length > 0) {
          this.popperShow = true
        } else {
          this.popperShow = false
        }
      },
      // 返回触发元素
      returnElm(e) {
        // 默认table
        if (!this.trigger) {
          // console.log(e.target)
          // 返回td
          if (e.target.tagName === 'TD') {
            // console.log('text', e.target.innerText, e.target.innerText.length)
            this.context = e.target.innerText.trim()

            return e.target
          } else if (e.target.parentNode.tagName === 'TD') {
            this.context = e.target.parentNode.innerText.trim()

            return e.target.parentNode
          }
        } else {
          if (
            e.target.className === this.trigger ||
            e.target.tagName === this.target
          ) {
            this.context = e.target.innerText.trim()
            return e.target
          } else {
            return false
          }
        }
      },
      // 触发元素mouseenter事件
      referenceEnter(e) {
        this.createPopper(this.reference)

        // this.popperShow = true
      },
      // 触发元素mouseleave事件
      referenceLeave(e) {
        if (!this.onContextMenu && !this.nextClick) {
          this.popperShow = false
          this.popper.destroy()
          try {
            this.reference.removeEventListener('mouseenter', this.referenceEnter)
            this.reference.removeEventListener('mouseleave', this.referenceLeave)
          } catch (err) {
            // 没有元素
          }
        }
      },
      // popper 右键事件
      popperContextMenu(e) {
        this.onContextMenu = true
        // 全局监听第二次点击事件
        document.addEventListener('mouseup', this.listenNextClick)
        // 阻止默认事件
        e.preventDefault()
        // 调用右键组件
        this.setContextMenu(e)
      },
      listenNextClick(e) {
        this.onContextMenu = false
        this.$refs.popperWrapper.removeEventListener(
          'contextmenu',
          this.listenMenu
        )
        // TODO: 可能需要判断target元素
        if (e.target === this.$refs.popperWrapper) {
          this.nextClick = false
        } else {
          // 点击框外直接隐藏
          this.popperShow = false
          this.popper.destroy()
          this.nextClick = true
        }
        // 移除二次
        document.removeEventListener('mouseup', this.listenNextClick)
        this.nextClick = false
      },
      // popper copy
      copy() {
        this.setClipboard({ data: this.tempCopyData })
        this.tempCopyData = null
      },
      // 设置右键菜单
      setContextMenu(event) {
        this.tempCopyData = document.getSelection().toString()
        this.contextMenuData.menulists[0].disabled = !this.tempCopyData
        this.contextMenuData.axios = {
          x: event.x,
          y: event.y,
        }
      },
      // 右键后的点击事件
      popperNextClick(e) {
        this.nextClick = true
      },
    },
  }
</script>

<style lang="less" scoped>
  .tooltip {
    & > .popper {
      position: relative;
      max-width: 300px;
      min-height: 34px;
      padding: 12px 15px;
      color: #000000;
      text-align: left;
      text-decoration: none;
      border: 1px solid #e0e0e0;
      letter-spacing: 0.4px;
      background-color: #ffffff;
      border-radius: 4px;
      // 太丑,去掉
      // box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      white-space: normal;
      word-wrap: break-word;
      line-height: 20px;
      margin-left: 4px;
    }
  }
</style>
