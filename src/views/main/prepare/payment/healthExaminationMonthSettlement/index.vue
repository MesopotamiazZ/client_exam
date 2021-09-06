<template>
<div class="healthExaminationMonthSettlement-wrapper">
  <div class="healthExaminationMonthSettlement contentBg">
    <div class="content-header">
      <span class="settledDate">结算时段</span><date-component dateType="daterange"></date-component>
      <span class="payee">领款人 : 李医生 </span>
      <div class="right-header fr">
        <span class="title-save"></span>
        <span class="title-print"></span>
        <span class="jian" @click="reduceSlider">-</span><Slider v-model="sliderVal" :step="10" disabled></Slider><span class="jia" @click="addSlider">+</span>
        <span class="percent">{{sliderVal}}%</span>
        <!-- monthSettlement -->
        <Button type="ghost" @click="monthSettlement">月结</Button>
      </div>
    </div>
    <div class="content-main">
      <div class="main-topic">
        体检收费月结
      </div>
    </div>
  </div>
  <!-- 当月月结完成提示弹窗开始 -->
  <div class="monthSettlementCompleteModal">
    <monthSettlementComplete :controlModal="controlModal1" 
    @close-this-modal="closeCompleteModal"></monthSettlementComplete>
  </div>
  <!-- 当月月结完成提示弹窗结束 -->

  <!-- 当月月结时间未到提示弹窗开始 -->
  <div class="monthSettlementNotTimeYetModal">
    <monthSettlementNotTimeYet :controlModal="controlModal2" 
    @close-this-modal="closeNotTimeYetModal"></monthSettlementNotTimeYet>
  </div>
  <!-- 当月月结时间未到提示弹窗结束 -->

  <!-- 当月月结时间未到提示弹窗开始 -->
  <div class="monthSettlementNotTimeYetModal">
    <affirmMonthSettlement :controlModal="controlModal3" 
    @cancel-affirm="cancelAffirm" @affirm-settlement="affirmSettlement"></affirmMonthSettlement>
  </div>
  <!-- 当月月结时间未到提示弹窗结束 -->
</div>
</template>
<script>
import monthSettlementComplete from '@/views/main/prepare/components/modal/monthSettlementComplete'
import monthSettlementNotTimeYet from '@/views/main/prepare/components/modal/monthSettlementNotTimeYet'
import affirmMonthSettlement from '@/views/main/prepare/components/modal/affirmMonthSettlement'
export default {
  name: 'healthExaminationMonthSettlement',
  components: {
    monthSettlementComplete,
    monthSettlementNotTimeYet,
    affirmMonthSettlement,
  },
  data () {
    return {
      sliderVal: 50,
      controlModal1: false, // 控制提示月结完成
      controlModal2: false, // 控制提示月结事件未到
      controlModal3: false, // 控制月结确认提示
    }
  },
  methods: {
    // 对slider进行控制
    addSlider () {
      if (this.sliderVal === 100) return
      this.sliderVal += 10
    },
    reduceSlider () {
      if (this.sliderVal === 0) return
      this.sliderVal -= 10
    },
    monthSettlement () { // 点击月结
      // this.controlModal1 = true
      this.controlModal3 = true
    },
    closeCompleteModal (data) { // 关闭月结完成提示modal
      this.controlModal1 = data
    },
    closeNotTimeYetModal (data) { // 关闭月结时间未到Modal
      this.controlModal2 = data
    },
    cancelAffirm (data) { // 取消确认月结
      this.controlModal3 = data
    },
    affirmSettlement (data) { // 确认月结
      this.controlModal3 = data
    },
  },
}
</script>
<style lang="less">
@import "~assets/less/variable.less"; 
.healthExaminationMonthSettlement-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  padding: @num10;
  .healthExaminationMonthSettlement {
    margin: 0 auto;
    overflow: hidden;
    position: relative;
    height: 100%;
    .content-header {
      box-sizing: border-box;
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #E4E6EB;
      padding: 0 @num20;
      font-size: 0;
      .settledDate {
        font-size: @font12;
        color: @inforSingleFormText;
        letter-spacing: 0.04px; 
      }
      .self-date {
        display: inline-block;
        width: 181px;
        height: 30px;
        margin-left: @num10;
        position: relative;
        top: -5px;
        font-size: @font12;
      }
      .payee {
        font-size: 12px;
        color: @inforSingleFormText;
        letter-spacing: 0.04px;
        margin-left: 20px;
      }
      .right-header {
        height: 100%;
        line-height: 50px;
        .ivu-slider {
          width: 89px;
          margin-top: 7px;
          display: inline-block;
        }
        .title-save {
          display: inline-block;
          width: 18px;
          height: 18px;
          font-size: 20px;
          background: url('/static/icons/public/title-save.svg');
          vertical-align: top;
          position: relative;
          top: 17px;
          margin-right: @num20;
          cursor: pointer;
        }
        .title-print {
          display: inline-block;
          width: 18px;
          height: 18px;
          font-size: 20px;
          background: url('/static/icons/public/title-print.svg');
          vertical-align: top;
          position: relative;
          top: 17px;
          margin-right: @num20;
          cursor: pointer;
        }
        .jian {
          cursor: pointer;
          margin-right: 5px;
          color: @gradeAshThree;
          font-size: 25px;
          font-weight: 700;
          vertical-align: top;
          position: relative;
          top: -1.5px;
        }
        .jia {
          cursor: pointer;
          margin-left: 5px;
          color: @gradeAshThree;
          font-size: 25px;
          font-weight: 700;
          vertical-align: top;
          position: relative;
          top: -1.5px;
        }
        .percent {
          vertical-align: top;
          margin-left: 5px;
          margin-right: @num20;
          font-size: 12px;
        }
        .ivu-btn{
          vertical-align: top;
          position: relative;
          top: 9px;
        }
      }
    }
    .content-main {
      width: 100%;
      text-align: center;
      padding: @num20 0;
      font-size: 18px;
      color: @gradeAshOne;
      letter-spacing: 0.05px;
    }
  }
}
</style>