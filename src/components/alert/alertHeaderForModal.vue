/** 
* 弹窗内表头
* headerText：显示名称
*/
<template>
	<div name='alertHeaderForModal' class="alert-header-for-modal font12">
		<span class="alert-header-text fl">{{ headerText }}</span>
		<div class="alert-header-search fr">
			<slot name='alertHeaderSearch'></slot>
		</div>
	</div>
</template>
<script>
export default {
  name: 'alert-header-for-modal',
  props: {
    headerText: {
      type: String,
    },
  },
  data() {
    return {
      data: '',
    }
  },
  // watch: {
  //   headerVal() {
  //     this.data = this.headerVal
  //   },
  // },
  // mounted() {
  //   this.data = this.headerVal
  // },
  // methods: {
  //   mustNumber() {
  //     // 必须为数组
  //     this.data = this.data.replace(/[^\d]/g, '')
  //   },
  //   alertBlur() {
  //     this.$emit('alert-retrun-num', this.data)
  //   },
  // },
}
</script>
<style lang="less">
@import (reference) "~assets/less/variable.less";
.alert-header-for-modal {
  // background-color: @alertHeadBg;
  height: 50px;
  color: @gradeAshOne;
  letter-spacing: 0.05px;
  font-weight: normal;
  .alert-header-text {
    display: inline-block;
    line-height: 50px;
    margin-left: 20px;
  }

  .alert-header-text::before {
    content: "";
    width: 2px;
    height: 12px;
    margin-right: 4px;
    display: inline-block;
    margin-top: -4px;
    vertical-align: middle;
    background-color: @gradeBlueOne;
  }
  .alert-header-search {
    margin-right: 9px;
    margin-top: @num10;
    // line-height: @num30;
  }
  .localSearchInput .onFocusSearch .cancelSearch {
    float: right;
  }
}
</style>
