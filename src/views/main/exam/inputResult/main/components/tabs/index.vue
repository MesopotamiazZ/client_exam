<template>
  <div class="self-tab">
    <ul class="self-tab-ul paddingL20">
      <template>
        <li v-for="(item,index) in tab" class="fl font14" :class="{active: index===num}" :key="index">
          <span class="title-name curPointer" @click='changeTab(item,index)'>{{ item.title }}</span>
        </li>
      </template>
    </ul>
    <div class="tab-right-button">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// import * as _ from 'lodash'
export default {
  name: 'self-tab',
  props: {
    tab: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data () {
    return {
      msg: '测测测',
      num: 0,
    }
  },
  methods: {
    changeTab (data, index) { // 数据，index
      this.num = index
      this.$emit('tab-change', data, index)
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
@height: 50px;
@borderHeight:3px;
@marginLi: 25px;
@paddingLR: 3px;
.self-tab {
  // background-color: lightcyan;
  position: relative;
  .self-tab-ul {
    // outline: 1px solid red;
    height: @height;
    border-bottom: 1px solid @gradeAshFive;
    li {
      margin-right: @marginLi - @paddingLR*2;
      span {
        color: @gradeAshThree;
        // outline: 1px solid green;
        display: inline-block;
        line-height: @height - @borderHeight;
        padding-left: @paddingLR;
        padding-right: @paddingLR;
        border-bottom: @borderHeight solid transparent;
      }
    }
    .active {
      span {
        font-weight: bold;
        color: @gradeBlueOne;
        border-bottom-color: @gradeBlueOne;
      }
    }
  }
  // 右上角的菜单
  .tab-right-button {
    height: 50px;
    position: absolute;
    right: 0;
    top: 0;
    padding-right: 20px;
  }
}
</style>

