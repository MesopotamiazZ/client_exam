/*
* xk
*/
<template>
  <div class="s-tabs-wrapper">
    <div v-for="(item,i) in list"
         :key="i"
         class="s-tabs-item"
         :class="{active:select(i)}"
         :style="marginCompute(i)"
         @click="change(i)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sTabs',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
    margin: {
      type: Number || String,
      default: 25,
    },
  },
  data() {
    return {
      activeNumber: 0,
    }
  },
  methods: {
    select(i) {
      if (this.activeNumber === i) {
        return true
      } else {
        return false
      }
    },
    change(i) {
      this.activeNumber = i
      this.$emit('on-change', i)
    },
    marginCompute(i) {
      if (i === 0) {
        return ''
      } else {
        return `margin-left:${this.margin}px;`
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import (reference) '~assets/less/public.less';

.s-tabs-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding:0 20px 0 20px;
  .s-tabs-item {
    display: flex;
    color: #000;
    height: 100%;
    align-items: center;
    cursor: pointer;
    span {
      display: flex;      
      height: 100%;
      align-items: center;      
      color: #737373;
      box-sizing: border-box;
      border-bottom: 3px solid transparent;
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
</style>
