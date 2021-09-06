/**
 * 自定义右键菜单
 * @author zero
 * @date 2017/11/21
 */
<template>
  <span class="vue-contextmenu-listWrapper" :class="'vue-contextmenuName-' + contextMenuData.menuName">
    <li v-for="item in contextMenuData.menulists" class="context-menu-list" >
      <button
        @click.stop="fnHandler(item)"
        class="vue-contextmenu-button"
        :class="{[item.className]: !!item.className, 'vue-contextmenu-button-disabled': !item.enable}">
        <span>{{item.btnName}}</span>
      </button>
    </li>
  </span>
</template>
<script>
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
      document.addEventListener('mouseup', this.hide, false)
    },
    beforeDestroy () {
      document.removeEventListener('mouseup', this.hide)
    },
    watch: {
      'contextMenuData.axios' (val) {
        var x = val.x
        var y = val.y
        var _this = this
        var index = _this.transferIndex
        var menuName = 'vue-contextmenuName-' + _this.contextMenuData.menuName
        var menu = document.getElementsByClassName(menuName)[index]
        menu.style.display = 'block'
        menu.style.left = x + 'px'
        menu.style.top = y + 'px'
      },
    },
    methods: {
      fnHandler (item) {
        if (item.enable !== false) {
          // 在这里判断是否是在点击区域内和是否有禁用属性。
          // 然后把值返回
          this.$emit(item.fnHandler, this.contextMenuData.payload)
        }
      },
      hide (event) {
        // 判断是否左键点击禁用选项
        if (event.button === 0 &&
            (event.target.className.indexOf('vue-contextmenu-button-disabled') !== -1 ||
            event.target.parentNode.className.indexOf('vue-contextmenu-button-disabled') !== -1)) {
          return
        }
        let index = this.transferIndex
        let menuName = 'vue-contextmenuName-' + this.contextMenuData.menuName
        let menu = document.getElementsByClassName(menuName)[index]
        menu.style.display = 'none'
      },
    },
  }
</script>
<style>
  .vue-contextmenu-listWrapper {
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

  .vue-contextmenu-listWrapper .context-menu-list {
    min-width: 100px;
    height: 36px;
    border-radius: 4px;
    background: #FFFFFF;
    text-decoration: none;
    list-style: none;
  }

  .vue-contextmenu-listWrapper .context-menu-list button {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: block;
    outline: 0;
    border: 0;
    background-color: #ffffff;
    padding-left: 9px;
  }

  .vue-contextmenu-listWrapper .context-menu-list button span {
    float: left;
  }

  .vue-contextmenu-listWrapper .context-menu-list button.vue-contextmenu-button-disabled{
    color: rgb(200,200,200)
  }

  .vue-contextmenu-listWrapper .context-menu-list button:hover {
    background-color: #F1F5FF;
  }
</style>
