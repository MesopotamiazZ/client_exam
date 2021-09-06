/*
*弹窗状态组件
*@author蒋易伶
*@date 2017.11.26
*content: 状态组件
*使用说明：名字statusDisplay
*         属性: displayName （传入状态名字[暂时只有四个,分别是loading,saving,loadFail,passworldWrong]，string类型），display（是否启用组件,boolean）
*         特别说明：组件调用位置与Modal一致。                                      
*
*/
<template>
<div v-if="display" class="position">
    <div class="child"> 
      <component :is="displayName"></component>
    </div>
</div>
</template>
<script>
 import loading from './components/loading'
 import saving from './components/saving'
 import loadFail from './components/loadFail'
 import passwordWrong from './components/passwordWrong'
 export default {
   props: {
     displayName: {
       type: String,
       default: function() {
         return 'loading'
       },
     },
     display: {
       type: Boolean,
       default: function() {
         return false
       },
     },
   },
   components: {
     loading,
     saving,
     loadFail,
     passwordWrong,
   },
}
</script>
<style lang="less">
  .position {
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    left:0;
    .child {
      position:absolute;
      left:50%;
      top:50%;
      margin-left:-44px;
      margin-top:-44px;
      height:88px;
      width:88px;
    }
  }
</style>