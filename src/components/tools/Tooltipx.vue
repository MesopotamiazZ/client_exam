<template>
  <div class="z-tooltip">
    <!-- 自己插入的内容 -->
    <div class="popper" @mouseenter="handleShowPopper" @mouseleave="handleClosePopper" ref="reference">
      <slot></slot>
    </div>
    <!-- 弹出的内容 -->
    <div
      class="z-tooltip-content"
      ref="popper"
      v-show="visibleCtrl"
      @mouseenter="handleShowPopper" 
      @mouseleave="handleClosePopper">
      {{content}} 
    </div>
  </div>
</template>

<script>
import Popper from 'popper'
import zContextmenu from '@/components/tools/zContextmenu'
/*
介绍：文字弹框
引用方式：template/render
参数说明：
  content:必须，弹出内容 string类型
  options：其他配置对象，
    例如：placement(弹框相对于触发元素的显示位置)：'top-start',说明：'方向'-'开始/结束',方向有 top,right,bottom,left,
    每个方向可以再添加一个 start或者end，类似于：'top','top-end','right','right-start'
    具体配置项参考：https://popper.js.org/popper-documentation.html

  delay: 弹出延迟时间（ms）默认100 number类型
  showBefore：弹出前钩子
  showAfter: 弹出后钩子
  hiddenBefore：隐藏前钩子
  hiddenAfter：隐藏后钩子
*/
export default {
  name: 'ZTooltip',
  components: {
    zContextmenu,
  },
  props: {
    // 内容
    content: {
      type: String || Number,
      default: '',
      required: true,
    },
    // 延时
    delay: {
      type: Number,
      default: 100,
    },
    // 弹出前钩子
    showBefore: {
      type: Function,
      default: function() {
        console.log('弹出前')
      },
    },
    // 弹出后钩子
    showAfter: {
      type: Function,
      default: function() {
        console.log('弹出后')
      },
    },
    // 消失后的钩子
    hiddenAfter: {
      type: Function,
      default: function() {
        console.log('消失后')
      },
    },
    // 消失前钩子
    hiddenBefore: {
      type: Function,
      default: function() {
        console.log('消失前')
      },
    },
    // 其他配置
    options: {
      type: Object,
      default: () => {
        return {
          // 放置位置
          placement: 'top-start',
          // 创建回调
          onCreate: data => {
            // console.log('created')
          },
          // 更新回调
          onUpdate: data => {
            // console.log('updated')
          },
          // 修饰符
          modifiers: {
            preventOverflow: {
              enabled: true,
              boundariesElement: '',
            },
          },
        }
      },
    },
  },
  data() {
    return {
      visibleCtrl: false, // 显示控制
      visible: false,
      noContextMenu: false, // 右键菜单是否存在
      nextClick: false,
      popper: {},
      popStyle: {
        display: 'none',
      },
    }
  },
  watch: {
    visible: function(data) {
      // watch这个变量，在不同阶段添加钩子函数
      console.log('显示', data)

      if (data === false) {
        this.hiddenBefore()
        this.visibleCtrl = false
        // 清楚掉选中文字
        document.execCommand('unselect')
        this.$nextTick(function() {
          this.hiddenAfter()
        })
      } else if (data === true) {
        this.showBefore()

        this.visibleCtrl = true
        this.$nextTick(function() {
          this.showAfter()
        })
      }
    },
  },
  mounted() {
    this.createPopper()
  },
  methods: {

    // 显示popper
    handleShowPopper() {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.visible = true

        this.$nextTick(function() {
          this.popper.update()
          if (!this.noContextMenu) {
            this.$refs.popper.addEventListener('contextmenu', this.listenMenu)
          }
        })
      }, this.delay)
    },
    // 隐藏popper
    handleClosePopper() {
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          if (!this.noContextMenu && !this.nextClick) {
            // 没有右键&没有二次
            this.visible = false
          }
        }, 100)
      }
    },

    // 创建实例
    createPopper() {
      this.popper = new Popper(
        this.$refs.reference,
        this.$refs.popper,
        this.options
      )
    },

    // 右键菜单事件
    listenMenu(e) {
      // console.log('右键')
      const that = this
      that.noContextMenu = true
      document.addEventListener('mouseup', this.listenNextClick, false)
    },

    listenNextClick(event) {
      this.noContextMenu = false
      this.$refs.popper.removeEventListener('contextmenu', this.listenMenu)
      if (event.target === this.$refs.popper) {
        // console.log('框内')
        this.nextClick = false
      } else {
        // 点击框外直接隐藏
        // console.log('框外')
        this.visible = false
        this.nextClick = true
      }
    // 移除二次
      document.removeEventListener('mouseup', this.listenNextClick)
      this.nextClick = false
    },

  },
}
</script>

<style lang="less">
.z-tooltip {
  line-height: 20px;
  .popper {
    display: inline-block;
    /* height: 100%; */
  }
  .z-tooltip-content {
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
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    white-space: normal;
    word-wrap: break-word;
  }
}
</style>