<template>
  <div class="plzModal">
    <Modal v-model="controlModal" :styles="{width: '298px'}"
    :transition-names='[]'
    :mask-closable="false"
    :transfer='false'
    :closable="false">
      <div slot="header">
        <p name='plz-alertHeader' class="plz-alertHeader font14">
          <span class="plz-alertHeaderText font16">提示</span>
        </p>
      </div>
      <div class="main">请先选中某行数据</div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  export default {
    name: 'plzModal',
    data () {
      return {
        controlModal: false,
      }
    },
    methods: {
      show () {
        this.controlModal = true
        setTimeout(() => {
          this.$nextTick(() => {
            this.controlModal = false
          })
        }, 1000)
      },
    },
  }
</script>
<style lang="less">
@import '~assets/less/variable.less';
.plzModal {
  .plz-alertHeader {
    background-color: #F2F5FA;
    line-height: 50px;
    height: 50px;
    color: @gradeAshOne;
    letter-spacing: 0.04px;
    color: @gradeAshOne;
    font-weight: normal;
    .plz-alertHeaderText::before {
      content: '';
      width: 3px;
      height: 17px;
      margin-right: 8px;
      display: inline-block;
      vertical-align: middle;
      background-color: @gradeBlueOne;
      position: relative;
      top: -.7px;
    }
  }
  .main {
    width: 100%;
    display: inline-block;
    text-align: center;
    font-size: 16px;
    color: @gradeAshTwo;
    margin-top: 45px;
    margin-bottom: 45px;
  }
  .ivu-modal-content {
    border-radius: @borderRadiuBig;
    box-shadow: 0 2px 15px 0 rgba(206,213,242,0.70);
  }
  .ivu-modal-mask {
    background-color: transparent;
  }
}
</style>
