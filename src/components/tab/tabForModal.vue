/**
 * Created 覃凤
 * Date: 2018/01/23/
 * content: tab
 * tab：传入的数据，[{title: 'A'}]
 */
<template>
  <div class="self-tab-for-modal paddingL20 paddingR20">
    <ul class="self-tab-ul-for-modal fl">
      <template>
        <li v-for="(item,index) in tab"
            class="fl font12"
            :class="{active: index===num}"
            :key="index">
          <span class="title-name curPointer" @click='changeTab(item,index)'>{{ item.title }}</span>
        </li>
      </template>
    </ul>
    <div class="fr paddingR20">
      <slot name="tabForModalR"></slot>
    </div>
    <div class="clearBoth"></div>
  </div>
</template>
<script>
export default {
  name: 'self-tab-for-modal',
  props: {
    tab: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      msg: '测测测',
      num: 0,
    }
  },
  methods: {
    changeTab(data, index) {
      // 数据，index
      this.num = index
      this.$emit('tab-change', data, index)
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
@height: 40px;
@borderHeight: 3px;
@marginLi: 25px;
@paddingLR: 3px;
.self-tab-for-modal {
  // background-color: lightcyan;
  .self-tab-ul-for-modal {
    // outline: 1px solid red;
    height: @height;
    width: 100%;
    border-bottom: 1px solid #D7E9FF;
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
