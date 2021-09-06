/**
* Created 黄伟
* Date: 2018/1/2
* Time: 15:16
* content: 主检
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
      <p class="holdMomentModal-main">{{content}}</p>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'warning-modal',
    props: {
      warningModal: {
        type: Boolean,
        default: false,
      },
      headerText: {
        // title
        type: String,
        default: '提示',
      },
      content: {
        type: String,
        default: '',
      },
      modalWidth: {
        // modal宽度
        type: Number,
        default: 378,
      },
      maskClosable: {
        // 是否允许点击遮罩层关闭
        type: Boolean,
        default: false,
      },
      closable: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        // warningModal: false,
      }
    },
    watch: {
      warningModal(val) {
        if (val) {
          this.show()
        }
      },
    },
    methods: {
      show() {
        setTimeout(() => {
          this.$nextTick(() => {
            this.$emit('hold')
          })
        }, 2000)
      },
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
    .holdMomentModal-main {
      text-align: center;
      font-size: 16px;
      display: block;
      color: #4a4a4a;
      letter-spacing: 0.07px;
      font-weight: 500;
      padding-top: 40px;
      padding-bottom: 40px;
    }
  }
</style>
