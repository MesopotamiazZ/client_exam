/**
* 左侧主导航
* @author 张祥
* @date 2017/11/24
*/
<template>
  <div class="mainMenu">
    <ul class="nav">
      <Tooltip v-for="(item,key,index) in menuList" :content="generateTitle(item.title)" :key="key" :delay="0" placement="right">
        <li class="item curPointer" :class="{active:curMainMenu===item.name}" @click="switchMainMenu(item.name);setTreeMenu(true)">
          <icon :name="item.icon"></icon>
        </li>
      </Tooltip>
    </ul>
    <div class="spread curPointer" @click="setTreeMenu(!showTreeMenu)">
      <icon :name="showTreeMenu ? 'menuShrink' : 'menuSpread'"></icon>
    </div>
    <div class="setting curPointer" @click="clickSetting()">
      <icon name="navSystem"></icon>
    </div>
  </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import * as types from '@/store/types'
  import {generateTitle} from '@/utils/i18n'
  export default {
    props: {
      setTreeMenu: {
        type: Function,
      },
      showTreeMenu: {
        type: Boolean,
      },
    },
    name: 'mainMenu',
    computed: {
      ...mapState('configModule', ['menuList']),
      ...mapState(['curMainMenu']),
    },
    methods: {
      generateTitle,
      ...mapMutations({
        switchMainMenu: types.SET_CURRENT_MAIN_MENU,
      }),
      clickSetting() {
        this.$emit('clickSetting')
      },
    },
  }
</script>
<style lang="less">
  @import (reference) '~assets/less/public.less';
  .mainMenu {
    user-select: none;
    position: relative;
    height: 100%;
    width: @mainMenuWidth;
    background-color: @navOneBg;
    border-right: 1px solid @mainMenuBorder;

    .nav {
      float: left;
      width: @mainMenuWidth;
    }

    .item {
      height: 36px;
      margin-top: 28px;
      border-left: 2px solid @navOneBg;
      text-align: center;

      .fa-icon {
        fill: #999999;
        width: 24px;
        height: 24px;
        margin-top: 6px;
      }
    }

    .active {
      background-color: @navOneActiveBg;
      border-left: 2px solid @mainMenuItemActiveBorder;

      .fa-icon {
        fill: #007ae2;
      }
    }

    .setting {
      position: absolute;
      width: 100%;
      bottom: 22px;
      text-align: center;

      .fa-icon {
        fill: #999999;
        width: 24px;
        height: 24px;
        margin-top: 6px;
      }
    }
    .spread {
      position: absolute;
      width: 100%;
      bottom: 60px;
      text-align: center;
    }
    .settingMenu {
      position: absolute;
      .fa-icon {
        fill: #999999;
        width: 16px;
        height: 16px;
        margin-top: 6px;
      }
    }

    .ivu-tooltip {
      display: block;
      .ivu-tooltip-rel {
        display: block;
      }
      .ivu-tooltip-popper {
        left: 36px !important;
        .ivu-tooltip-arrow {
          display: none;
        }
        .ivu-tooltip-inner {
          background: rgba(0, 0, 0, 0.9);
          border-radius: 3px;
          font-size: 12px;
          padding: 4px 8px;
          min-height: 24px;
          max-width: initial;
          white-space: nowrap;
          color: #ffffff;
        }
      }
    }
  }
</style>
