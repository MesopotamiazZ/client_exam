/**
 * Created 覃凤
 * Date: 2018/01/23/
 * content: tab
 * tab：传入数据，tab-change点击返回事件，tabR：右侧插槽名称
 */
<template>
  <div class="self-tab">
    <ul class="self-tab-ul paddingL20 fl">
      <template>
        <li v-for="(item,index) in tab" class="fl font14" :class="{active: index===num}" :key="index">
          <span class="title-name curPointer" @click='changeTab(item,index)'>{{ item.title }}</span>
        </li>
      </template>
    </ul>
    <div class="fr paddingR20">
      <slot name="tabR"></slot>
    </div>
    <div class="clearBoth"></div>
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
  .self-tab-ul {
    // outline: 1px solid red;
    height: @height;
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
}
</style>
