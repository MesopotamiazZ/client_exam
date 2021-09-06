<template>
  <div class="self-tab">
    <ul class="self-tab-ul paddingL20"  >
      <template>
        <li v-for="(item,index) in tab" class="fl font14" style="width:70px;" :class="{active: index===num}" :key="index" @mouseenter="mouseoverN(index)"  @mouseleave="mouseoutN">
          <span class="title-name curPointer" @click='changeTab(item,index)'>{{ item.title }}</span>
          <div class="self-tab-rightClassTransitionFlex" @click="del(item,index)" v-if="index !==0 && index ===showIndex" >
               <icon class="icon_close" name="modal_close_default"></icon>
          </div>
        </li>
        <li class="fl font14 addItem" v-if="addShow">
           <div class="addItem-kuang" @click="addItem()"> <div class="addItem-kuang-span">+ 添加</div>
           </div>
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
      addShow: true,
      showIndex: null,
    }
  },
  watch: {
    tab(val) {
      console.log(val, 'fsafsafsafasf')
    },
  },
  methods: {
    changeTab (data, index) { // 数据，index
      this.num = index
      this.$emit('tab-change', data.key)
    },
    addItem() {
      this.$emit('addItem')
    },
    show() {
      this.addShow = true
    },
    unshow() {
      this.addShow = false
    },
    del(item, index) {
      this.num = 0
      this.$emit('tab-change', 1)
      this.$emit('del', index)
    },
    mouseoverN(index) {
      this.showIndex = index
    },
    mouseoutN(index) {
      this.showIndex = null
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
   right: -10px;
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
      margin-right:31px;
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

