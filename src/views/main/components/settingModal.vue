/*
 * 弹窗---系统设置
 * @author 张祥
 * @date 2017/12/14
 */
<template>
  <div class="setting-modal">
    <Modal :styles="{width:360+'px'}" v-model="visible" class-name="vertical-center-modal" :transition-names='[]' :mask-closable="false" :transfer='false' :closable="false">
      <div class="header">
        <span class="title">设置</span>
        <icon name="modal_close_default" @click.native="close()"></icon>
      </div>
      <div class="body">
        <div class="row">
          <span class="label">主题颜色</span>
          <span :class="{btn_shadow:showThemeColor}">
            <span class="color_btn fr" :class="{btn_shadow:showThemeColor}" :style="curThemeStyle" @click="showThemeColor=!showThemeColor"></span>
          </span>
        </div>
        <div v-if="showThemeColor" class="row font0 colorSelectBg">
          <span
            v-for="(item,index) in themes" 
            class="color_btn marginR20"
            :style="{background: `linear-gradient(${item.property['--navbar-gradient-start']},${item.property['--navbar-gradient-end']})`}"
            :key="item.id"
            @click="changeThemeColor(index,item)">
          </span>
        </div>
        <div class="row">
          <span class="label">背景动画</span>
          <i-switch v-model="bgAnimateM" class="switch"></i-switch>
        </div>
        <div class="row">
          <span class="label">桌面通知</span>
          <i-switch v-model="desktopMsgM" class="switch"></i-switch>
        </div>
        <div class="row">
          <span class="label">开机自动启动</span>
          <i-switch v-model="autoStartM" class="switch"></i-switch>
        </div>
        <div class="row">
          <span class="label">截图快捷键</span>
          <Input
            :value="shortcutKeyM"
            placeholder=""
            class="fr marginT10 shortcutKey"
            style="width: 140px"
            onselectstart="return false;"
            @on-blur="ShortcutBlur()"
            @on-focus="ShortcutFocus()"
            @keyup.native="ShortcutKeyUp($event)"
            @keydown.native="ShortcutKeyDown($event)">
          </Input>
        </div>
        <div class="row">
          <span class="label">缩放比例</span>
          <Select v-model="zoomRatioM" placement="top" style="width:140px" placeholder="" class="fr marginT10 relative">
            <Option v-for="item in zoomRatioOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="row" v-if="false">
          <span class="label">语言切换</span>
          <Select v-model="langM" placement="top" style="width:140px" placeholder="" class="fr marginT10 relative">
            <Option v-for="item in languageOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div class="row">
          <span class="label">系统版本号</span>
        <span class="fr font12">{{version}}</span>
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="saveSetting()">确 定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import * as types from '@/store/types'
  import startOnBoot from '@/utils/startOnBoot'
  import shortcut from '@/store/plugins/shortcut.js'
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        screenshot_temp: {},
        themeIndex: 0,
        themeM: 'theme1',
        bgAnimateM: false, // 背景动画
        desktopMsgM: false, // 桌面通知
        autoStartM: false, // 开机自动启动
        shortcutKeyM: '', // 截图快捷键key
        zoomRatioM: '', // 屏幕缩放比例
        langM: '', // 语言
        temp: {
          theme: 'theme1',
          bgAnimate: false, // 背景动画
          desktopMsg: false, // 桌面通知
          autoStart: false, // 开机自动启动
          zoomRatio: '', // 屏幕缩放比例
          lang: '', // 语言
          screenshot: {}, // 截图快捷键对象
        },
        zoomRatioOptions: [
          {
            value: 0,
            label: '小',
          },
          {
            value: 0.5,
            label: '中',
          },
          {
            value: 1,
            label: '大',
          },
        ],
        showThemeColor: false, // 控制颜色选择器是否出现,
        languageOptions: [
          {
            value: 'zh',
            label: '中文',
          },
          {
            value: 'en',
            label: '英文',
          },
          {
            value: 'zh-tw',
            label: '繁体',
          },
        ],
      }
    },
    computed: {
      ...mapState('configModule', ['themes', 'version']),
      ...mapState([
        'theme',
        'lang',
        'desktopMsg',
        'bgAnimate',
        'zoomRatio',
        'autoStart',
        'shortcutMap',
        'userInfo',
        'screenshot',
      ]),
      getHeight() {
        if (this.backupDBs.length < 4) {
          return '160px'
        } else {
          return '361px'
        }
      },
      curThemeStyle() {
        if (this.themes && Array.isArray(this.themes)) {
          for (let i = 0; i < this.themes.length; i++) {
            const theme = this.themes[i]
            if (theme.className === this.themeM) {
              return {
                background: `linear-gradient(${theme.property['--navbar-gradient-start']}, ${theme.property['--navbar-gradient-end']})`,
              }
            }
          }
        }
      },
    },
    watch: {
      langM(cur) {
        console.log(cur)
        this.setLanguage(cur)
      },
      zoomRatioM(cur) {
        this.setZoomRatio(cur)
      },
      // autoStartM(cur) {
      //   console.log(cur)
      //   this.setAutoStart(cur)
      // },
      bgAnimateM(cur) {
        console.log(cur)
        this.setBgAnimate(cur)
      },
      desktopMsgM(cur) {
        console.log(cur)
        this.setDesktopMsg(cur)
        if (cur) {
          var options = {
            icon: '//www.baidu.com/img/bd_logo1.png',
            body: 'god of zero',
          }
          var notification = new Notification('Zero Title', options)
          notification.onshow = function() {
            setTimeout(function() {
              notification.close()
            }, 2000)
          }
        }
      },
      themeM(cur) {
        if (this.themes && Array.isArray(this.themes)) {
          for (let i = 0; i < this.themes.length; i++) {
            const theme = this.themes[i]
            if (theme.className === cur) {
              let property = theme.property
              for (let key in property) {
                document.documentElement.style.setProperty(key, property[key])
              }
              break
            }
          }
        }
      },
    },
    mounted() {
      // 将vuex的数据赋值到本地，绑定到控件的modal
      this.themeM = this.theme
      this.langM = this.lang
      this.zoomRatioM = this.zoomRatio
      this.autoStartM = this.autoStart
      this.bgAnimateM = this.bgAnimate
      this.desktopMsgM = this.desktopMsg
      this.shortcutKeyM = this.screenshot

      this.temp.theme = this.theme
      this.temp.lang = this.lang
      this.temp.zoomRatio = this.zoomRatio
      this.temp.autoStart = this.autoStart
      this.temp.bgAnimate = this.bgAnimate
      this.temp.desktopMsg = this.desktopMsg
      this.temp.screenshot = this.screenshot
    },
    methods: {
      ...mapMutations({
        setLanguage: types.SET_LANGUAGE,
        setZoomRatio: types.SET_ZOOMRATIO,
        setAutoStart: types.SET_AUTOSTART,
        setScreenshot: types.SET_SCREENSHOT,
        setBgAnimate: types.SET_BG_ANIMATE,
        setDesktopMsg: types.SET_DESKTOP_MSG,
        setTheme: types.SET_THEME,
      }),
      ...mapActions('configModule', ['getConfig', 'saveConfig', 'saveConfig_fs']),
      close() {
        // 还原设置
        this.setTheme(this.temp.theme)
        this.setLanguage(this.temp.lang)
        this.setZoomRatio(this.temp.zoomRatio)
        this.setBgAnimate(this.temp.bgAnimate)
        this.$emit('closeModal')
      },
      closeModal() {
        this.$emit('closeModal')
      },
      changeThemeColor(value, item) {
        this.themeM = item.className
      },
      autoStartChange(value) {
        this.setAutoStart(value)
        if (value) {
          startOnBoot.enableAutoStart('CSTJ', process.execPath)
        } else {
          startOnBoot.disableAutoStart('CSTJ')
        }
      },
      ShortcutKeyDown(ev) {
        ev.preventDefault()
        let kc = ev.keyCode
        if (!ev.ctrlKey && !ev.altKey && !ev.shiftKey) {
          return
        }
        if (ev.ctrlKey) {
          if (ev.altKey) {
            if (ev.shiftKey) {
              this.shortcutKeyM = 'Ctrl+Alt+Shift+'
            } else {
              this.shortcutKeyM = 'Ctrl+Alt+'
            }
          } else {
            if (ev.shiftKey) {
              this.shortcutKeyM = 'Ctrl+Shift+'
            } else {
              this.shortcutKeyM = 'Ctrl+'
            }
          }
        } else {
          if (ev.altKey) {
            if (ev.shiftKey) {
              this.shortcutKeyM = 'Alt+Shift+'
            } else {
              this.shortcutKeyM = 'Alt+'
            }
          } else {
            if (ev.shiftKey) {
              this.shortcutKeyM = 'Shift+'
            } else {
              this.shortcutKeyM = 'Ctrl+'
            }
          }
        }
        if (kc >= 16 && kc <= 18) {
          return
        }
        if ((kc >= 48 && kc <= 57) || (kc >= 65 && kc <= 90)) {
          this.shortcutKeyM += String.fromCharCode(ev.keyCode)
        } else {
          if (this.shortcutKeyM) {
            this.shortcutKeyM = ''
          }
        }
      },
      ShortcutKeyUp(ev) {
        let kc = ev.keyCode
        if (kc >= 16 && kc <= 18) {
          if (this.shortcutKeyM.match(/^.*\+$/)) {
            this.shortcutKeyM = ''
          }
        }
      },
      /* eslint-disable no-empty-function */
      ShortcutFocus() {
        shortcut.unregisterShortcut('screenshot', this.temp.screenshot)
      },
      ShortcutBlur() {
        shortcut.registerShortcut('screenshot', this.temp.screenshot)
      },
      /* eslint-disable no-empty-function */
      saveSetting() {
        this.closeModal()
        this.setTheme(this.themeM)
        this.setAutoStart(this.autoStartM)
        this.setScreenshot(this.shortcutKeyM)
        // this.setShortcutmapScreenshot({
        //   name: 'screenshot',
        //   key: this.shortcutKeyM,
        //   oldKey: this.temp.screenshot.key,
        //   // active: function() {
        //   //   childProcess.exec(path.join(process.cwd(), 'static', 'tools', 'screenshot', 'Snipaste.exe --snip'), function () {
        //   //     console.log(arguments)
        //   //   })
        //   // },
        //   // failed: function() {},
        // })
        this.saveConfig_fs({
          userId: this.userInfo.id,
          data: {
            settings: {
              theme: this.themeM,
              lang: this.langM,
              desktopMsg: this.desktopMsgM,
              bgAnimate: this.bgAnimateM,
              zoomRatio: this.zoomRatioM,
              autoStart: this.autoStartM,
              screenshot: this.shortcutKeyM,
            },
          },
        })
      },
      /**
       * 将origin对象的属性对等地赋值给target对象
       * @param target
       * @param origin
       */
      objectApply(target, origin) {
        Object.keys(origin).forEach((key) => {
          if (target[key] instanceof Object && origin[key] instanceof Object) {
            this.objectApply(target[key], origin[key])
          } else {
            target[key] = origin[key]
          }
        })
      },
    },

  }
</script>
<style lang="less">
  @import (reference) '~assets/less/public.less';
  .setting-modal {
    .header {
      text-align: center;
      height: 50px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      background-color: #f2f5fa;
      position: relative;

      .title {
        margin: 0 auto;
        display: inline-block;
        line-height: 50px;
        font-size: 16px;
        font-weight: bold;
        color: #111111;
      }

      .fa-icon {
        fill: #828282;
        padding: 3px;
        position: absolute;
        top: 17px;
        right: 20px;
        border-radius: 50%;
        cursor: pointer;
      }

      .fa-icon:hover {
        fill: white;
        background: #ff6262;
        border-radius: 50%;
      }
    }

    .ivu-modal {
      height: calc(~'100% - 100px');
      max-height: 530px;
    }
    .ivu-modal-content {
      height: 100%;
    }
    .ivu-modal-body {
      height: calc(~'100% - 50px');
    }

    .body {
      height: calc(~'100% - 50px');
      padding: 15px 0;
      overflow: auto;

      .row {
        position: relative;
        height: 50px;
        padding: 0 30px;
      }

      .colorSelectBg {
        background-color: #f7faff;
      }

      .label {
        font-size: 14px;
        color: #4a4a4a;
        line-height: 50px;
      }
      .font12 {
        font-size: 12px;
        color: #4a4a4a;
        line-height: 50px;
      }
      .color_btn {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-top: 15px;
        border-radius: 4px;
        cursor: pointer;
      }

      .btn_shadow {
        box-shadow: 0 2px 4px rgba(128, 128, 128, 0.5);
      }

      .switch {
        height: 20px;
        width: 40px;
        line-height: 20px;
        float: right;
        margin-top: 15px;
      }

      .ivu-switch::after {
        width: 16px;
        height: 16px;
        box-shadow: 0 3px 1px rgba(0, 0, 0, 0.05);
      }

      .ivu-switch-checked {
        border-color: #008cee;
        background-color: #008cee;
      }

      .ivu-switch-checked:after {
        left: 21px;
      }

      .shortcutKey .ivu-input {
        user-select: none;
      }
    }

    .list-wrapper {
      border: 1px solid #e0e0e0;
      border-radius: @borderRadiuBig;

      .tableWrapper {
        .ihandsontable,
        .ihandsontable > .handsontable,
        .ihandsontable > .handsontable .ht_master,
        .ihandsontable > .handsontable .wtHolder {
          height: 100% !important;
        }
      }
    }

    .ivu-modal-footer > div {
      padding-bottom: 20px;

      .ivu-btn {
        display: block;
        width: 100px;
        margin: 0 auto;
      }
    }
  }
</style>
