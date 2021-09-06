/**
* Created hw
* Date: 2017/12/34/
* Time: 9:00
* content: 有效标志组件
* 使用说明 : 名字： alertCheckBox
属性: textTitle标题文字 (string 类型) , marginNuM： 组件距离左侧距离 (int 类型) ,isShow:是否选中 (boolean)
*
*/
<template>
  <div class="check-box" :style="{'margin-left':marginNuM+ 'px'}">
    <div class="img" >
      <img src="../../static/icons/public/success.png" height="16" width="16" v-show="showImage" class="image"/>
    </div>
    <div class="title">{{textTitle}}</div>
  </div>
</template>
<script>
export default {
  computed: {
    // 计算属性的 getter
    showImage() {
      // `this` 指向 vm 实例
      return this.isShow
    },
  },
  props: {
    textTitle: {
      type: String,
      default: '有效标志',
    },
    marginNuM: {
      type: Number,
      default: 20,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
<style lang="less" scoped>
.check-box {
  height: 18px;
  position: relative;
  .img {
    width: 18px;
    height: 18px;
    display: inline-block;
    border-radius: 50%;
    border: 1px solid #5cad00;
  }

  .title {
    display: inline-block;
    font-size: 12px;
    color: #737373;
    position: absolute;
    top: 0;
    left: 30px;
  }
}
</style>
