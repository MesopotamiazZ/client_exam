<template>
  <span class="z-contextmenu-listWrapper" :class="'z-contextmenuName-' + contextMenuData.menuName">
    <li v-for="item in contextMenuData.menulists" class="context-menu-list" :key="item.btnName">
      <button
        @click.stop="fnHandler(item)"
        class="z-contextmenu-button"
        :class="{[item.className]: !!item.className, 'z-contextmenu-button-disabled': item.disabled}">
        <span>{{item.btnName}}</span>
      </button>
    </li>
  </span>
</template>
<script>
/**
 * 自定义右键菜单
 * @author zero
 * @date 2017/11/21
 */
  export default {
    props: {
      contextMenuData: {
        type: Object,
        requred: true,
        default () {
          return {
          }
        },
      },
      transferIndex: {
        type: Number,
        default: 0,
      },
    },
    mounted () {
      document.addEventListener('mouseup', this.hide)
    },
    beforeDestroy () {
      document.removeEventListener('mouseup', this.hide)
    },
    watch: {
      'contextMenuData.axios' (val) {
        document.removeEventListener('mouseup', this.hide)
        var x = val.x
        var y = val.y
        var _this = this
        var index = _this.transferIndex
        var menuName = 'z-contextmenuName-' + _this.contextMenuData.menuName
        var menu = document.getElementsByClassName(menuName)[index]
        menu.style.display = 'block'
        menu.style.left = x + 'px'
        menu.style.top = y + 'px'
        document.addEventListener('mouseup', this.hide)
      },
    },
    methods: {
      fnHandler (item) {
        if (item.disabled === false) {
          // 在这里判断是否是在点击区域内和是否有禁用属性。
          // 然后把值返回
          this.$emit(item.fnHandler, this.contextMenuData.payload)
        }
      },
      hide (event) {
        // 判断是否左键点击禁用选项
        if (event.button === 0 && typeof event.target.className === 'string' &&
            (event.target.className.indexOf('z-contextmenu-button-disabled') !== -1 ||
            event.target.parentNode.className.indexOf('z-contextmenu-button-disabled') !== -1)) {
          return
        }
        let index = this.transferIndex
        let menuName = 'z-contextmenuName-' + this.contextMenuData.menuName
        let menu = document.getElementsByClassName(menuName)[index]
        menu.style.display = 'none'
        document.removeEventListener('mouseup', this.hide)
        this.$emit('hide')
      },
    },
  }
</script>
<style>
  .z-contextmenu-listWrapper {
    background: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,.12);
    box-shadow: 0px 0px 6px 0px rgba(0,0,0,.04);
    border: 1px solid #dddddd;
    display: none;
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    padding: 5px 0;
  }
  .z-contextmenu-listWrapper .context-menu-list {
    min-width: 100px;
    height: 36px;
    border-radius: 4px;
    background: #FFFFFF;
    text-decoration: none;
    list-style: none;
  }
  .z-contextmenu-listWrapper .context-menu-list button {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: block;
    outline: 0;
    border: 0;
    background-color: #ffffff;
    padding-left: 9px;
  }
  .z-contextmenu-listWrapper .context-menu-list button span {
    float: left;
  }
  .z-contextmenu-listWrapper .context-menu-list button.z-contextmenu-button-disabled{
    color: rgb(200,200,200)
  }
  .z-contextmenu-listWrapper .context-menu-list button:hover {
    background-color: #F1F5FF;
  }
</style>
