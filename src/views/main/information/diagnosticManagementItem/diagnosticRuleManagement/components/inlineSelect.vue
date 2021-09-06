<template>
  <div class="x-inline-select-wrapper">
    <div class="xis-content-wrapper" @click="selectClick">
      <div class="xis-content">content</div>
      <div class="xis-icon">
        <i></i>
      </div>
    </div>
    <!-- 下拉 FIXME: 无动画 -->
    <div class="xis-options-wrapper" v-show="showOptions">
      <div>123</div>
      <div>123</div>
      <div>123</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inlineSelect',
  data() {
    return {
      showOptions: false,
    }
  },
  methods: {
    selectClick() {
      this.showOptions = !this.showOptions
      console.log('click')
    },
  },
}
</script>

<style lang="less" scoped>
.x-inline-select-wrapper{
  display: inline-block;
  position: relative;
  font-size: 0;
  width: 100%;
  height: 32px;
  min-height: 30px;
  .xis-content-wrapper{
    display: flex;
    height: 100%;
    min-height: 30px;
    .xis-content{
      flex:1;
    }
    .xis-icon{
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      // margin-right: 5px;
      // margin-left: 5px;

      >i{
        width: 0;
        height: 0;
        border-top:6px solid rgba(204, 204, 204, 1); 
        border-right:3px solid rgba(0, 0, 0, 0); 
        border-bottom:0;
        border-left:3px solid rgba(0, 0, 0, 0);
      }
    }
  }
  
  .xis-options-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 50px;
    background: red;
  }

}
</style>
