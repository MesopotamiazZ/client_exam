/** 
* @author wzd
* @date 2018/01/09
* @content 体检收费月结确认提示modal
*/ 
<template>
  <div class="affirmMonthSettlement">
    <Modal v-model="controlModal" :styles="{width: '374px'}"
    :transition-names='[]'
    :mask-closable="false"
    :transfer='false'
    :closable="false">
      <div slot="header">
        <p name='dsc-alertHeader' class="dsc-alertHeader font14">
          <span class="dsc-alertHeaderText font16">体检收费月结</span>
        </p>
      </div>
      <div class="main">确认进行月结吗 ?</div>
      <div class="monthSettlementInfo">
        <span class="settlementMan">月结人 : 徐荣</span><span class="settlementTime">月结时间 : 2017-12-08 14:00</span>
      </div>
      <div slot="footer">
        <div class="dsc-modelFooter">
          <Button type="primary" @click="affirmSettlement">确 定</Button><Button type="ghost" @click="cancelAffirm">取 消</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<<script>
export default {
  name: 'affirmMonthSettlement',
  props: {
    controlModal: { // 控制Modal显示与关闭
      type: Boolean,
      default: false,
    },
    monthSettlementMan: { // 月结人
      type: String,
    },
    monthSettlementTime: { // 月结时间
      type: String,
    },
  },
  methods: {
    cancelAffirm () { // 取消月结
      this.$emit('cancel-affirm', false)
    },
    affirmSettlement () { // 确认月结
      this.$emit('affirm-settlement', false)
    },
  },
}
</script>
<<style lang="less">
@import '~assets/less/variable.less';
.affirmMonthSettlement {
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
    letter-spacing: 0.07px;
    margin-top: 30px;
    margin-Bottom: 30px;
  }
  .monthSettlementInfo {
    margin-bottom: 20px;
    text-align: center;
    .settlementMan {
      margin-right: 20px;
      font-size: @font12;
      color: #4A4A4A;
      letter-spacing: 0.05px;
    }
    .settlementTime {
      font-size: @font12;
      color: #4A4A4A;
      letter-spacing: 0.05px;
    }
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


