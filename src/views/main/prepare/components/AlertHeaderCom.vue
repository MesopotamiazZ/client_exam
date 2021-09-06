/**
* author      : yhy
* cteate      : 2018/02/23 
* description : 体检费用清单/结算费用清单 弹窗里的头布局
*/
<template>
   <div class="alert-head-com">
     <div class="title-name font14">{{titleName}}</div>
     <div class="close-camera" @click='close'></div>   
   </div>
</template>

<script>
export default {
  name: 'AlertHeaderCom',
  props: {
    titleName: {
      type: String,
      defalut: '已结算体检费用列表',
    },
  },
  methods: {
    close() {
      this.$emit('close-modal')
    },
  },

}
</script>

<style lang="less" scoped>
@import '~assets/less/variable.less';
.alert-head-com{
    // background: lightpink;
  height: 50px;
  position: relative;
  .title-name{
    // margin-left: 20px;
    line-height: 50px;
    display: inline-block;
    // font-size: 14px;
    color: @gradeAshOne;
    letter-spacing: 0.04px;
  }
  .close-camera{
    cursor: pointer;
    position: absolute;
    top: 18px;
    right: 0;
  //  right: 16px;
    width: 16px;
    height: 16px;
    border-radius: 16px;
    display: inline-block;
    background: url(/static/icons/public/closeNormal2.png) no-repeat center center;
    background-size: @num20;
    &:hover{
      // width: @num20;
      // height: @num20;
      background: url(/static/icons/public/closeRed2.png) no-repeat center center;
      // background-size: @num20;
    }
  }
}
</style>

