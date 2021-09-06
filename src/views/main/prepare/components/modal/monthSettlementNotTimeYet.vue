/** 
* @author wzd
* @date 2018/01/09
* @content 体检收费月结时间未到
*/ 
<template>
  <div class="monthSettlementNotTimeYet">
    <Modal v-model="controlModal" :styles="{width: '358px'}"
    :transition-names='[]'
    :mask-closable="false"
    :transfer='false'
    :closable="false">
      <div slot="header">
        <p name='dsc-alertHeader' class="dsc-alertHeader font14">
          <span class="dsc-alertHeaderText font16">体检收费月结</span>
        </p>
      </div>
      <div class="main">只能在15日18:00后才能进行月结</div>
      <div slot="footer">
        <div class="dsc-modelFooter">
          <Button type="primary" @click="affirmClose">确 定</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<<script>
export default {
  name: 'monthSettlementNotTimeYet',
  props: {
    controlModal: { // 控制Modal显示与关闭
      type: Boolean,
      default: false,
    },
  },
  methods: {
    affirmClose () { // 确认关闭
      this.$emit('close-this-modal', false)
    },
  },
}
</script>
<<style lang="less">
@import '~assets/less/variable.less';
.monthSettlementNotTimeYet {
  .dsc-alertHeader {
    background-color: #F2F5FA;
    line-height: 50px;
    height: 50px;
    color: @gradeAshOne;
    letter-spacing: 0.04px;
    font-weight: normal;
    .dsc-alertHeaderText::before {
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
    text-align: center;
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 0;
    margin-top: 30px;
    margin-Bottom: 30px;
  }
  .dsc-modelFooter {
    height: 50px;
    Button {
      width: 74px;
      height: 30px;
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>