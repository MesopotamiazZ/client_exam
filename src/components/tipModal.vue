/* 王振东 */
<template>
  <div class="tipModal" v-if='controlModal'>
    <Modal v-model="controlModal" :class="{'none-mask': !isMask}"
           :styles="{width: modalWidth}"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <p name='alertHeader'
           class="alertHeader font14">
          <span class="alertHeaderText font16">{{headerText}}</span>
        </p>
      </div>
      <div class="main"
           :style="{fontSize: mainContentSize}">{{mainContent}}</div>
      <div slot="footer">
        <div class="modelFooter">
          <Button type="primary"
                  @click="affirm">确 认</Button>
          <Button type="ghost"
                  @click="cancel">取 消</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'tip-modal',
  props: {
    modalWidth: {
      type: String,
      default: '319px',
    },
    controlModal: {
      type: Boolean,
      default: false,
    },
    mainContent: {
      type: String,
      default: '',
    },
    mainContentSize: {
      // 设置内容字体
      type: String,
      default: '12px',
    },
    headerText: {
      type: String,
      default: '提示',
    },
    isMask: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    affirm() {
      this.$emit('tip-modal-affirm', false)
    },
    cancel() {
      this.$emit('tip-modal-cancel', false)
    },
  },
}
</script>
<style lang="less">
@import '~assets/less/variable.less';
.tipModal {
  .alertHeader {
    background-color: #f2f5fa;
    line-height: 50px;
    height: 50px;
    color: @gradeAshOne;
    letter-spacing: 0.04px;
    color: @gradeAshOne;
    font-weight: normal;
    .alertHeaderText::before {
      content: '';
      width: 3px;
      height: 17px;
      margin-right: 8px;
      display: inline-block;
      vertical-align: middle;
      background-color: @gradeBlueOne;
      position: relative;
      top: -0.7px;
    }
  }
  .main {
    width: 100%;
    text-align: center;
    // font-family: MicrosoftYaHei;
    color: @gradeAshTwo;
    padding: 30px 60px;
  }
  .ivu-modal-content {
    // border-radius: 0;
  }
  .modelFooter {
    height: 50px;
    Button {
      width: 74px;
      height: 30px;
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
  .none-mask {
    .ivu-modal-mask {
      background-color: transparent!important;
    }
    .ivu-modal-content {
      border-radius: @borderRadiuBig;
      background-color: #FFFFFF;
      box-shadow: 0 2px 15px 0 rgba(206,213,242,0.70);
    }
  }
}
</style>
