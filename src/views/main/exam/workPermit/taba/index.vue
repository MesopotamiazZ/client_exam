<template>
  <div class="self-tab">
    <ul class="self-tab-ul paddingL20">
      <template>
        <li v-for="(item,index) in tab" class="fl font14" :class="{active: index===num}" :key="index">
          <span class="title-name curPointer" @click='changeTab(index)'>{{ item.title }}</span>
        </li>
      </template>
      <div class="fr"><slot name="tab-btn"></slot> </div>
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
      addShow: true,
    }
  },
  watch: {
    tab(val) {
      console.log(val, 'fsafsafsafasf')
    },
  },
  methods: {
    changeTab (index) { // 数据，index
      this.num = index
      this.$emit('tab-change', index)
    },

    show() {
      this.addShow = true
    },
    unshow() {
      this.addShow = false
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
  .self-tab-rightClassTransitionFlex{
   cursor: pointer;
   position: absolute;
   width: 16px;
   height:16px;
   background: #b3b3b3;
   border-radius: 16px;
   line-height: 13px;
   text-align: center;
   top:15px;
   right:-18px;
   >svg{
     width: 8px;
     height: 8px;
     color:  @tableTr
   }
 }
 .self-tab-rightClassTransitionFlex:hover{
   cursor: pointer;
   position: absolute;
   background: @tsIconHover;
 }
  .self-tab-ul {
    // outline: 1px solid red;
    height: @height;
    border-bottom: 1px solid @gradeAshFive;
    li {
      position: relative;
      margin-right:25px;
      display: inline-block;
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
    .addItem{
      width: 70px;
      height: 50px;
      text-align: center;
      .addItem-kuang{
        cursor: pointer;
        margin-top: 12px;
        display: inline-block;
        width: 100%;
        height: 25px;
        border: 1px dashed #B3B3B3;
        .addItem-kuang-span{
          height: 25px;
          line-height: 25px;
          font-size: 12px;
          color: #737373;
          >span{
            height:25px;
            
          }
        }
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

