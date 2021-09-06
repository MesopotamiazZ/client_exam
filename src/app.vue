<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import Message from '@/components/message'
import * as types from '@/store/types'
import shortcut from '@/store/plugins/shortcut.js'

export default {
  name: 'app',
  computed: {
    ...mapState(['zoomRatio', 'theme', 'screenshot', 'title', 'initialization', 'windowHeight', 'windowWidth', 'nwWindowHeight', 'nwWindowWidth']),
    ...mapState('configModule', ['themes']),
  },
  methods: {
    ...mapMutations({
      'setWindowHeight': types.SET_WINDOW_HEIGHT, // 设置窗体内容高度
      'setWindowWidth': types.SET_WINDOW_WIDTH, // 设置窗体内容宽度
      'setNwWindowHeight': types.SET_NW_WINDOW_HEIGHT, // 设置屏幕高度
      'setNwWindowWidth': types.SET_NW_WINDOW_WIDTH, // 设置屏幕宽度
    }),
    handleResize () {
      this.setWindowHeight(window.innerHeight)
      this.setWindowWidth(window.innerWidth)
      this.setNwWindowHeight(this.nwWindow.height)
      this.setNwWindowWidth(this.nwWindow.width)
    },
  },
  watch: {
    title () {
      document.title = this.title
    },
    zoomRatio(cur, old) {
      let win = nw.Window.get()
      win.zoomLevel = cur
    },
    screenshot(cur, old) {
      if (old) {
        shortcut.unregisterShortcut('screenshot', old)
      }
      if (cur !== '') {
        shortcut.registerShortcut('screenshot', cur)
      }
    },
    theme(cur) {
      if (this.themes && Array.isArray(this.themes)) {
        for (let i = 0; i < this.themes.length; i++) {
          const theme = this.themes[i]
          if (theme.className === this.theme) {
            let property = theme.property
            for (let key in property) {
              document.documentElement.style.setProperty(key, property[key])
            }
            break
          }
        }
      }
    },
    windowHeight (val) {
      Message.setTop(val * 0.4)
    },
  },
  created () {
    nw.Window.get().show(true)
    Message.config({
      duration: 2,
    })
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>

<style lang='less'>
* {
  box-sizing: border-box;
}
html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
html, body {
  margin: 0;
  padding: 0;
}
/* body {
  user-select: none;
} */
@font-face {
  font-family: 'yh';
  src: url('./assets/fonts/msyh.ttf');
}
@font-face {
  font-family: 'yhBold';
  src: url('./assets/fonts/msyhbd.ttf');
}
#app {
  font-family: 'yh', 'MicrosoftYaHe', 'yhBold';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

</style>
