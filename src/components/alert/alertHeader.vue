/** 
* headerText：显示名称，showInput：是否显示显示顺序，disabled：是否禁用
*/
<template>
	<div name='alertHeader' class="alertHeader font14">
		<span class="alertHeaderText font16 fl">{{ headerText }}</span>
		<div class="alertHeaderInput fr" v-if="showInput">
			<span class="fl">显示顺序</span>
			<div class="fl" style="width: 60px;">
				<Input :disabled='disabled' v-model='data' @keyup.native="mustNumber" :maxlength='5' @on-blur='alertBlur'></Input>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  name: 'alert-header',
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
    mustNumber() {
      // 必须为数组
      this.data = this.data.replace(/[^\d]/g, '')
    },
    alertBlur() {
      this.$emit('alert-retrun-num', this.data)
    },
  },
}
</script>
<style lang="less">
@import (reference) "~assets/less/variable.less";
.alertHeader {
  background-color: @alertHeadBg;
  height: 50px;
  color: @gradeAshOne;
  letter-spacing: 0.04px;
  font-weight: normal;
  .alertHeaderText {
    display: inline-block;
    line-height: 50px;
    font-weight: 500;
  }

  .alertHeaderText::before {
    content: "";
    width: 4px;
    height: 18px;
    margin-right: 6px;
    display: inline-block;
    margin-top: -4px;
    vertical-align: middle;
    background-color: @gradeBlueOne;
  }

  .alertHeaderInput {
    margin-top: 12px;
    width: 120px;
    height: 26px;
    border: 1px solid @gradeAshFour;
    border-radius: 30px;
    position: relative;
    overflow: hidden;
    & > span {
      display: inline-block;
      width: 60px;
      text-align: center;
      line-height: 23px;
      font-size: 12px;
      color: @gradeAshThree;
      letter-spacing: 0.04px;
    }

    & > div {
      position: absolute;
      right: -2px;
      top: -3px;
      .ivu-input {
        text-align: center;
        border: none;
        outline: medium;
        box-shadow: none;
        width: 57px;
        border-left: 1px solid @gradeAshFour;
      }

      .ivu-input-wrapper {
        padding-left: 0 !important;
        padding-right: 10px !important;
        input {
          border: none;
          border-left: 1px solid @gradeAshFour;
        }

        .ivu-input {
          border: none;
          border-left: 1px solid @gradeAshFour;
        }
      }
    }
  }
}
</style>
