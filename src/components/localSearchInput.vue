/**
* @author wzd
* Date: 2018/01/10
* content:本地实时搜索框
* 参数props：  inputWidth：输入框宽度 ,inputText：输入框提示文字
* 方法funtion : @search-key: 返回输入框实时内容
*/
<template>
  <div class="localSearchInput" style="width: 100%;">
    <!-- 没有获得焦点的情况 -->
    <template v-if="!isFocus">
      <div class="notFocusSearch">
        <z-input 
        :placeholder="inputText" 
        @on-focus="toFocus"></z-input>
        <i class="searchIcon1"></i>
      </div>
      
    </template>
    <!-- 没有获得焦点的情况 -->

    <!-- 获得焦点的情况 calc(~'100% - 50px') -->
    <template v-else>
      <div class="onFocusSearch" style="width: 100%;">
        <z-input 
        ref="onFocusSearch"
        v-model="allSearch"
        placeholder="" 
        autofocus
        @input="searchInput"
        @on-enter="enter"></z-input>
        <i class="searchIcon2" @click="addirm"></i>
        <div class="cancelSearch" @click="cancelSearch">取消</div>
      </div>
    </template>
    <!-- 获得焦点的情况 -->
  </div>
</template>
<script>
import zInput from '@/components/form/input/zInput'
export default {
  name: 'local-search-input',
  components: {
    zInput,
  },
  props: {
    // inputWidth: { // 控制input长度
    //   type: Number,
    //   default: 220,
    // },
    inputText: { // placeholder
      type: String,
    },
  },
  data () {
    return {
      isFocus: false, // 是否触发焦点事件
      allSearch: '', // 搜索到的所有内容
    }
  },
  methods: {
    toFocus () { // 获得焦点
      this.isFocus = true
      this.$emit('to-focus')
    },
    // toBlur () { // 失去焦点
    //   this.isFocus = false
    // },
    searchInput (value) { // 实时搜索返回数据
      this.$emit('search-key', value)
    },
    // 点击取消
    cancelSearch () {
      this.isFocus = false
      // 清空input
      this.allSearch = ''
      this.$emit('search-key', '')
    },
    enter (event) {
      console.log(this.allSearch)
      this.$emit('on-enter', event, this.allSearch)
    },
    addirm (event) {
      this.$emit('on-addirm', event, this.allSearch)
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.localSearchInput {
  font-size: 0;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  .notFocusSearch {
    position: relative;
    height: @num30;
    .ivu-input-wrapper {
      
    }
    .searchIcon1 {
      display: inline-block;
      width: 20px;
      height: 20px;
      // font-size: @num20;
      background: url('/static/icons/public/Search.svg') no-repeat;
      cursor: pointer;
      position: absolute;
      right: 0px;
      top: 8px;
    }
    .searchIcon1:hover {
      // color: #49B4FF;
    }
  }
  .onFocusSearch {
    position: relative;
    height: @num30;
    .ivu-input-wrapper {
      display: inline-block;
      // vertical-align: top;
      width: calc(~'100% - 30px')
    }
    .searchIcon2 {
      display: inline-block;
      width: 20px;
      height: 20px;
      // font-size: @num20;
      background: url('/static/icons/public/Search.svg') no-repeat;
      cursor: pointer;
      position: absolute;
      right: 30px;
      top: 8px;
      // text-align: center;
      // line-height: 25px;
    }
    .searchIcon1:hover {
      // color: #49B4FF;
    }
    .cancelSearch {
      display: inline-block;
      height: 30px;
      width: 25px;
      line-height: 30px;
      margin-left: 5px;
      font-size: @font12;
      color: @gradeBlueOne;
      letter-spacing: 0;
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .ivu-input {
    padding-right: 30px;
  }
}
</style>
