/**
* Created 刘佳莉
* Date: 2017/12/25
* Time: 15:16
* content:存在标准数据时点击删除的警告框
*/
<template>
  <div class="warningModal">
    <Modal v-model="warningModal" :styles='{width:modalWidth+"px"}'
      :transition-names='[]'
      :mask-closable="maskClosable"
      :closable="closable"
      :transfer='false'>
      <div slot="header">
        <p name='adm-alertHeader' class="adm-alertHeader font14">
          <span class="adm-alertHeaderText font16">{{ headerText }}</span>
        </p>
      </div>
      <p class="adm-main">{{content}}</p>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'warning-modal',
    props: {
      headerText: {
        // title
        type: String,
        default: '提示',
      },
      content: {
        type: String,
        default: '您选中的信息中包含数据库源数据，不允许删除！',
      },
      // warningModal: { // v-model
      //   type: Boolean,
      //   default: false,
      // },
      modalWidth: {
        // modal宽度
        type: Number,
        default: 472,
      },
      maskClosable: {
        // 是否允许点击遮罩层关闭
        type: Boolean,
        default: false,
      },
      closable: {
        // 是否显示右上角的关闭按钮，关闭后 Esc 按键也将关闭
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        warningModal: false,
      }
    },
    methods: {
      show() {
        this.warningModal = true
        setTimeout(() => {
          this.$nextTick(() => {
            this.warningModal = false
          })
        }, 3000)
      },
      // hide() {
      //   this.warningModal = false
      // },
    },
  }
</script>
<style lang="less">
  @import '~assets/less/variable.less';
  .warningModal {
    .adm-alertHeader {
      background-color: #f2f5fa;
      line-height: 50px;
      height: 50px;
      color: @gradeAshOne;
      letter-spacing: 0.04px;
      font-weight: normal;
      .adm-alertHeaderText::before {
        content: '';
        width: 3px;
        height: 17px;
        margin-right: 8px;
        display: inline-block;
        vertical-align: middle;
        background-color: @gradeBlueOne;
      }
    }
    .adm-main {
      text-align: center;
      font-size: 16px;
      display: block;
      color: #ff6262;
      letter-spacing: 0;
      padding-top: 40px;
      padding-bottom: 40px;
    }
  }
</style>
