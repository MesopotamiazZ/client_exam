<template>
  <div class="x-input">
    <span class="x-input-label" :class="{focusing:focusing,offseting:!focusing&&currentValue===''}" @click="inputFocus">{{label}}</span>
    <z-input
      ref="input"
      :maxlength="maxlength"
      :type="type"
      :step="step"
      v-model="currentValue"
      @on-focus="handleFocus"
      @on-blur="handleBlur"
      @on-change="handleChange">
    </z-input>
  </div>
</template>
<script>
export default {
  name: 'x-input',
  props: {
    type: {
      type: String,
      default: 'text',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    step: Number,
    maxlength: Number,
  },
  data() {
    return {
      focusing: false,
      currentValue: this.value,
    }
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
  },
  methods: {
    handleFocus() {
      this.focusing = true
    },
    handleBlur() {
      this.focusing = false
    },
    handleChange() {
      this.$emit('input', this.currentValue)
    },
    inputFocus() {
      this.$refs.input.focus()
    },
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .x-input{
    position: relative;
    .ivu-input{
      margin-top: 16px;
      padding: 0 2px; 
      font-size: 16px;
      border: none;
      border-bottom: 1px solid @gradeAshThree;
      border-radius: 0;
      box-shadow: none;
    }
    .ivu-input:hover,
    .ivu-input:focus{
      box-shadow: none;
    }
    .x-input-label{
      position: absolute;
      top: 0;
      font-size: 12px;
      color: #b3b3b3;
      display: inline-block;
      transition:all 0.2s ease-in-out;
      z-index: 10;
    }
    .x-input-label.focusing{
      color: @gradeBlueOne;
    }
    .x-input-label.offseting{
      top:20px;
      font-size: 16px;
    }
  }
</style>