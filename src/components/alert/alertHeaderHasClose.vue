/*
*头部含有关闭按钮
*@author 覃凤
*@date 2017/1/12*/
<template>
	<div name='alertHeaderClose' class="alert-header-has-close font14">
		<span class="alert-header-text font16 fl">{{ headerText }}</span>
		<div class="alert-header-icon fr">
			<icon name="modal_close_default" @click.native="close"></icon>
		</div>
	</div>
</template>
<script>
export default {
  name: 'alert-header-has-close',
  props: {
    headerText: {
      type: String,
    },
    headerVal: {
      type: [Number, String],
    },
    showInput: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      data: '',
    }
  },
  watch: {
    headerVal() {
      this.data = this.headerVal
    },
  },
  mounted() {
    this.data = this.headerVal
  },
  methods: {
    close () {
      this.$emit('close')
    },
    // mustNumber() {
    //   // 必须为数组
    //   this.data = this.data.replace(/[^\d]/g, '')
    // },
    // alertBlur() {
    //   this.$emit('alert-retrun-num', this.data)
    // },
  },
}
</script>
<style lang="less">
@import (reference) "~assets/less/variable.less";
.alert-header-has-close {
  background-color: @alertHeadBg;
  height: 50px;
  color: @gradeAshOne;
  letter-spacing: 0.04px;
  font-weight: normal;
  .alert-header-text {
    display: inline-block;
    line-height: 50px;
    font-weight: 500;
  }

  .alert-header-text::before {
    content: "";
    width: 4px;
    height: 18px;
    margin-right: 6px;
    display: inline-block;
    margin-top: -4px;
    vertical-align: middle;
    background-color: @gradeBlueOne;
  }
  .alert-header-icon {
    .fa-icon {
      fill: #fff;
      width: 16px;
      height: 16px;
      padding: 3px;
      position: absolute;
      top: 17px;
      right: 20px;
      background: #b3b3b3;
      border-radius: 50%;
      cursor: pointer;
    }

    .fa-icon:hover {
      background: @tsIcon;
      border-radius: 50%;
    }
  }
}
</style>
