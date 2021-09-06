<template>
  <div class="alertFooter">
    <div name='alertFooter' class="alertFooterBtn">
      <button class="delBtn selfButtonLine fr" @click="del">{{ toFooter.cancel }}</button>
      <button class="confirmBtn selfButton marginR20 fr" @click="confirmFun()">{{ toFooter.confirmText }}</button>
      <div class="clearBoth"></div>
    </div>
   
  </div>
</template>
<script>
export default {
  props: ['toFooter', 'msg'], // :msg="msg"
  data () {
    return {
      modal9: '',
    }
  },
  methods: {
    del () {
      this.$emit('childSay', '取消')
      // console.log('取消')
    },
    confirmFun () {
      this.$emit('childSay', '确定')
      // console.log('保存')
    },
  },
}
</script>
<style lang="less" scoped>
@import (reference) '~assets/less/variable.less';
.alertFooter {
  padding: @num20;
  border-bottom-left-radius: @borderRadiuBig;
  border-bottom-right-radius: @borderRadiuBig;
  .alertFooterBtn {
    button {
      // @border: 1px;
      // border-radius: @borderRadiuSmall;
      // background: none;
      // width: 74px;
      // height: 30px;
      // border: @borderWidth solid #5BA6FE;
      // cursor: pointer;
      // padding: 7px 25px;
    }
    .confirmBtn {
      // background: linear-gradient(224deg, #ABD4FF, #6DAAFF);
      // height: 30px;
      // width: 78px;
      // border: none;
      // color: #fff;
    }
    .delBtn {
      color: #1770D7;
    }
  }
}
</style>
