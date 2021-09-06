<template>
  <div class="header font12">
    <vue-particles
      color="#ffffff" class="bg-animation"
      :hoverEffect="false"
      :clickEffect="false"
      :particlesNumber="300"
      :moveSpeed="1"
      v-if="isAnimation"
    >
    </vue-particles>
    <div class="logo fl">
      <img src="/static/images/header/logo.png" alt="">
      <span class="font20 fontBold">{{generateTitle('title1')}}</span>
      <span class="font20 fontBold">{{generateTitle('title2')}}</span>
    </div>
    <div class="user fr font12">
      <img class="avatar fl curPointer" :src="avatarUrl" alt=""
           @click="showOperation=true"
           @error="error">
      <ul class=" fr userInfomation">
        <li class="name font12 fontBold curPointer" @click="showOperation=true">{{userInfo.name}}</li>
        <li class="job font12 curPointer" @click="showOperation=true">{{userInfo.job}}</li>
      </ul>
      <div class="operation" v-if="showOperation">
        <ul>
          <li @mousedown="changeAvatar()">
            <span>修改头像</span>
          </li>
          <li @mousedown="logout()">
            <span>注销登录</span>
          </li>
          <li @mousedown="changePassword()">
            <span>修改密码</span>
          </li>
          <li @mousedown="changeAccount()">
            <span>切换账号</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="changeWindow">
      <div class="flex">
        <div class="winToSmall" @click='winToSmall'>
          <!-- <Icon type="minus"></Icon> -->
          <icon name="windowToSmall"></icon>
        </div>
        <div class="winToBig" @click='winToBig($event)' :class="{winToBigRotate:isFullscreen}">
          <icon name="windowToBig"></icon>
        </div>
        <div class="winToClose" @click='winToClose'>
          <icon name="windowToClose"></icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * 顶部header
   * @author 张祥
   * @date 2017/11/20
   */
  import {generateTitle} from '@/utils/i18n'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        isAnimation: true,
        logo: '/static/images/header/logo.png',
        winToBigIcon: '/static/images/header/windowToBig.png',
        windowCenterIcon: 'windowToBig',
        isFullscreen: false,
        showOperation: false,
      }
    },
    computed: {
      ...mapState(['userInfo']),
      avatarUrl() {
        if (this.userInfo && this.userInfo.avatar) {
          return this.userInfo.avatar
        } else {
          return '/static/images/public/default_avatar.svg'
        }
      },
    },
    watch: {
      showOperation (val) {
        if (val === true) {
          document.addEventListener('mouseup', this.hideMenu)
        } else {
          document.removeEventListener('mouseup', this.hideMenu)
        }
      },
    },
    methods: {
      error(event) {
        event.target.src = '/static/images/public/default_avatar.svg'
      },
      generateTitle,
      hideMenu () {
        this.showOperation = false
      },
      winToSmall () {
        // 窗口变小
        // TODO: 解决最大化后最小后再打开后卡屏的BUG
        if (this.nwWindow.isFullscreen) {
          this.nwWindow.leaveFullscreen()
        }
        this.nwWindow.minimize()
      },
      winToBig (event) {
        // 窗口变大
        this.nwWindow.toggleFullscreen()
        this.isFullscreen = !this.nwWindow.isFullscreen
      },
      winToClose () {
        // 窗口关闭
        nw.App.quit()
      },
      logout () {
        console.log('注销登录')
        this.showOperation = false
        this.$emit('logout')
      },
      changePassword () {
        console.log('修改密码')
        this.showOperation = false
        this.$emit('changePassword')
      },
      changeAccount () {
        console.log('切换账号')
        this.showOperation = false
        this.$emit('changeAccount')
      },
      changeAvatar() {
        this.showOperation = false
        this.$emit('changeAvatar')
      },
    },
  }
</script>
<style lang="less">
@import (reference) '~assets/less/color.less';
.particles-js-canvas-el {
  -webkit-app-region: drag;
}
.changeWindow {
    width: 84px;
    height: 21px;
    position: absolute;
    right: 0;
    top: 0;
    background-color: @winIconBg;
    border-bottom-left-radius: 17.5px;
    -webkit-app-region: no-drag;
    & > div {
      // position: relative;
      width: 100%;
      // height: 100%;
      & > div {
        width: 30%;
        // margin-left: 3%;
        // outline: 1px solid red;
        // position: absolute;
        // display: inline-block;
        // width: 11px;
        // height: 10px;
        // padding: 7px;
        cursor: pointer;
        // top: 0px;
        // outline: 1px solid red;
        svg {
          // width: 11px;
        //   fill: @winIcon;
        }
      }
      .winToSmall {
        margin-left: 5px;
        svg {
          // height: 5px;
          // outline: 1px solid green;
          transform-origin: center;
          transform: translate(10px, 10px);
        }
        .fa-icon{
          g {
            fill: @winIconHover;
          }
          opacity: 0.5;
        }
        &:hover .fa-icon{
          opacity: 1;
            // g {
            //   fill: @winIconHover;
            // }
          }
      }
      .winToBig {
        svg {
          // outline: 1px solid green;
          width: 10px;
          transform-origin: center;
          transform: translate(8px, 3px);
        }
        .fa-icon{
          g {
              fill: @winIconHover;
            }
          opacity: 0.5;
        }
        &:hover .fa-icon{
          opacity: 1;
            // g {
            //   fill: @winIconHover;
            // }
          }
      }
      .winToBigRotate {
        svg {
          transform-origin: center;
          transform: translate(8px, 2px) rotate(180deg);
        }
      }
      .winToClose {
        width: 16px;
        height: 16px;
        margin-top: 2px;
        margin-left: 1px;
        border-radius: 18px;
        // background-color: red;
        svg {
          // outline: 1px solid green;
          width: 10px;
          transform-origin: center;
          transform: translate(3px, -0.5px);
        }
        &:hover{
          background-color: @winCloseHoverBg;
        }
        .fa-icon{
          g {
              fill: @winIconHover;
            }
          opacity: 0.5;
        }
        &:hover .fa-icon{
          opacity: 1;
          // g {
          //   fill: @winCloseIcon;
          // }
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  @import (reference) '~assets/less/public.less';
  @import (reference) '~assets/less/color.less';

  .header {
    user-select: none;
    width: 100%;
    height: 100%;
    color: @headerText;
    position: relative;
    background: linear-gradient(to right, @headerBgL, @headerBgR);
    -webkit-app-region: drag;
    .bg-animation {
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      -webkit-app-region: drag;
    }
    .logo {
      display: flex;
      height: 100%;
      align-items: center;
      -webkit-app-region: drag;

      img {
        -webkit-app-region: no-drag;
        width: 30px;
        height: 30px;
        display: inline-block;
        margin-left: 27px;
        margin-right: 11px;
      }
      span {
        -webkit-app-region: no-drag;
      }
    }
    .user {
      position: relative;
      -webkit-app-region: drag;
      margin-right: 80px;
      height: 100%;
      align-items: center;

      .avatar {
        width: 40px;
        height: 40px;
        margin: 10px;
        border-radius: 50%;
        background: #fff;
        -webkit-app-region: no-drag;
      }
      .userInfomation {
        width: 100%;
        margin-top: 14px;
        vertical-align: middle;
        letter-spacing: 1px;
        width: auto;
        -webkit-app-region: no-drag;
      }
      .operation {
        z-index: 9999;
        position: absolute;
        top: @headerHeight;
        left: 10px;
        background-color: @backgourdWithe;
        box-shadow: @userMenushadow;
        padding: 5px 0;

        li {
          width: 98px;
          height: 36px;
          cursor: pointer;
        }

        li:hover {
          background-color: @userMenuItemHover;
        }
        span {
          font-size: 12px;
          color: @gradeAshTwo;
          line-height: 36px;
          padding-left: 10px;
        }
      }
    }
  }

</style>
