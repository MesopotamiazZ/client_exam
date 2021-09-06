<template>
  <div class="insertRow">
    <div v-for="(rowCouter, index) in rowCouters" :key="index">
      <ul><!-- 添加的手术模板 -->
        <li class="ssText">手术名称</li>
        <li class="ssInput1">
          <input type="text" value="" placeholder="请输入手术名称...">
        </li>
        <li class="ssText">手术日期</li>
        <li class="ssInput2">
          <DatePicker type="date" placeholder="请选择"></DatePicker>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="less"> 
.insertRow {
  ul {
    font-size: 0;
    li {
      display: inline-block;
      font-size: 12px;
    }
    .ssText {
      height: 40px;
      width: 140px;
      line-height: 40px;
      background-color: #E8F2FF;
      border-right: 1px solid #E0E0E0;
      border-bottom: 1px solid #E0E0E0;
      text-align: center;
    }
    .ssInput1 {
      height: 40px;
      width: 373px;
      text-align: center;
      border: 0 !important;
      // border-right: 1px solid #E0E0E0;
      // border-bottom: 1px solid #E0E0E0;
      line-height: 40px;
    }
    input::-webkit-input-placeholder {
      color: #D9D9D9;
    }
    .ssInput2 {
      height: 40px !important;
      width: 171px;
      text-align: center;
      // border-right: 1px solid #E0E0E0;
      // border-bottom: 1px solid #E0E0E0;
      line-height: 40px;
      .ivu-input {
        box-sizing: border-box;
        width: 100%;
        // height: 40px important;
        // border: 0;
        outline: none;
        border-radius: 0;
        position: relative;
        top: -1px;
      }
    }
    input {
      vertical-align: top;
      border: 0;
      border-bottom: 1px solid #D9D9D9;
      outline: 0;
      text-align: center;
      box-sizing: border-box;
      // background-color: #E0E0E0;
      width: 150px;
      height: 20px;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
<script>
  // import Vue from 'vue'
  // Vue.component('')
  export default {
    props: ['rowCouters'],
    data () {
      return {
        temp: this.rowCouters,
      }
    },
  }
</script>