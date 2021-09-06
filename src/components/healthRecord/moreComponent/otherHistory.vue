<template>
  <div class="otherHistory">
    <titleHasSlotMiddle :style="thisItems?'border-bottom:1px solid #cccccc;':''">
      <span slot='titletHasSlotLeftTitle'>问诊症状、自觉症状</span>
      <div slot='titletHasSlotRightContent'
           style="margin-right:-6px;height:30px;">
        <div style="height:30px;">
          <div class="fr otherHistory-title-btn"
               style="margin-left:10px"
               @click="isAllPickUp">
            <Icon :type="thisItems ? 'arrow-up-b' : 'arrow-down-b'"
                  size="8"
                  color="white"
                  style="margin-top:5px;"></Icon>
          </div>
          <!--           <ZButton :ZBtype='"ghost"' class="fr" @click="compile">新 增</ZButton>
 -->
        </div>
      </div>
    </titleHasSlotMiddle>
    <div v-if="thisItems"
         class="otherHistory-content">
      <div class="otherHistory-content-body">
        <div class="otherHistory-table-background otherHistory-table-item  otherHistory-table-title">问诊症状</div>
        <div style="display:flex;"
             class="otherHistory-content-flex-content">
          <div class="fl otherHistory-content-flex"
               style="flex:1;font-size: 12px;color: #111111;">项目名称</div>
          <div class="fl otherHistory-content-flex"
               style="width:160px;font-size: 12px;color: #111111;">问诊日期</div>
        </div>
        <div style="display:flex;"
             class="otherHistory-content-flex-content">
          <div class="fl otherHistory-content-flex"
               style="flex:1;text-align:left">
            <Tooltip placement="top">
              <div class="otherHistory-content-body-item">头疼</div>
              <div slot="content">
                <p>显示多行信息</p>
                <p>
                  <i>可以自定义样式</i>
                </p>
              </div>
            </Tooltip>
            <div class="otherHistory-content-body-item">目眩</div>
            <div class="otherHistory-content-body-item">头晕</div>
          </div>
          <div class="fl otherHistory-content-flex"
               style="width:160px">2019-09-09</div>
        </div>
        <div style="display:flex;"
             class="otherHistory-content-flex-content">
          <div class="fl otherHistory-content-flex"
               style="flex:1;text-align:left">
            <div class="otherHistory-content-body-item">头晕</div>
            <div class="otherHistory-content-body-item">头晕</div>
            <div class="otherHistory-content-body-item">头晕</div>
          </div>
          <div class="fl otherHistory-content-flex"
               style="width:160px">2019-09-09</div>
        </div>
      </div>
      <div class="otherHistory-content-body"
           style="margin-top:10px;">
        <div class="otherHistory-table-background otherHistory-table-item  otherHistory-table-title">自觉症状</div>
        <div style="display:flex;"
             class="otherHistory-content-flex-content">
          <div class="fl otherHistory-content-flex"
               style="flex:1;font-size: 12px;color: #111111;">症状</div>
          <div class="fl otherHistory-content-flex"
               style="width:160px;font-size: 12px;color: #111111;">问诊日期</div>
        </div>
        <div style="display:flex;"
             class="otherHistory-content-flex-content">
          <div class="fl otherHistory-content-flex"
               style="flex:1;font-size: 12px;color: #111111;">头晕</div>
          <div class="fl otherHistory-content-flex"
               style="width:160px;font-size: 12px;color: #111111;">2018-2-7</div>
        </div>
      </div>
    </div>
    <addOtherHistory :Model="isAddNew"
                     @addAbolish="addAbolish"></addOtherHistory>
  </div>
</template>
<script>
import titleHasSlotMiddle from '@/components/titleHasSlotMiddle'
import ZButton from '@/components/button/ZButton'
import addOtherHistory from '../modal/addOtherHistory'

export default {
  name: 'otherHistory',
  data() {
    return {
      //
      thisItems: false,
      basicInformationData: {},
      basicInformationRule: {},
      isAddNew: false,
    }
  },
  components: {
    titleHasSlotMiddle,
    ZButton,
    addOtherHistory,
  },
  watch: {},
  props: {
    allItems: {
      type: Boolean,
      defalut: false,
    },
  },
  methods: {
    //
    unfold() {
      this.thisItems = true
    },
    retract() {
      this.thisItems = false
    },
    isAllPickUp() {
      this.thisItems = !this.thisItems
    },
    compile() {
      this.isAddNew = true
    },
    addAbolish() {
      this.isAddNew = false
    },
  },
  mounted() {
   // console.log('1')
  },
}
</script>
<style >

</style>

<style  lang="less" >
@import (reference) '~assets/less/variable.less';
.otherHistory {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  // box-shadow: 0 1px 15px 0 rgba(206,213,242,0.70);
  border-radius: 8px;
  .otherHistory-content {
    padding: 10px;
  }
  .marginT10 {
    margin-top: 10px;
  }
  .otherHistory-content-symptoms {
    border: 1px solid #d9d9d9;
    overflow: hidden;
    background: #ffffff;
    border-radius: 8px;
    .otherHistory-table-item {
      height: 40px;
    }
    .otherHistory-table-item-content {
      .otherHistory-table-item-content-div {
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-right: 1px solid #d9d9d9;
        border-top: 1px solid #d9d9d9;
      }
      .otherHistory-table-item-content-div:last-child {
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-right: none;
        border-top: 1px solid #d9d9d9;
      }
    }
    .otherHistory-table-title {
      font-size: 14px;
      color: #111111;
      text-align: center;
      line-height: 40px;
    }
  }
  .otherHistory-content-body-item {
    height: 30px;
    border: 1px solid #d9d9d9;
    line-height: 30px;
    text-align: center;
    min-width: 74px;
    display: inline-block;
    margin-right: 10px;
  }
  .otherHistory-content-body-item-noborder {
    height: 30px;
    line-height: 30px;
    text-align: center;
    min-width: 74px;
    display: inline-block;
    margin-right: 10px;
  }
  .otherHistory-content-body {
    border: 1px solid #d9d9d9;
    overflow: hidden;
    background: #ffffff;
    border-radius: 8px;
  }
  .otherHistory-content-flex-content {
    .otherHistory-content-flex {
      line-height: 40px;
      text-align: center;
      border-right: 1px solid #d9d9d9;
      border-top: 1px solid #d9d9d9;
      padding: 4px 10px;
    }
  }
  .otherHistory-content-flex-content {
    .otherHistory-content-flex:last-child {
      line-height: 40px;
      text-align: center;
      border-right: none;
    }
  }

  .otherHistory-table-background {
    background: #e8f2ff;
  }
  .otherHistory-table-item {
    height: 40px;
  }
  .otherHistory-table-title {
    font-size: 14px;
    color: #111111;
    text-align: center;
    line-height: 40px;
  }
  .otherHistory-title-btn {
    width: 20px;
    height: 20px;
    background: #008cee;
    display: inline-block;
    margin-top: 5px;
    text-align: center;
    border-radius: 4px;
  }
  .otherHistory-title-btn:hover {
    cursor: pointer;
  }
  .basicInformationForm {
    padding: 20px;
    position: relative;
    .otherHistory-img-po {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .otherHistory-img {
      width: 90px;
      height: 120px;
      border: 1px solid red;
    }
  }
  .otherHistory-row {
    height: 30px;
  }
  .otherHistory-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .otherHistory-input {
    margin-left: 10px;
    display: inline-block;
    flex: 1;
  }
  .marginL30px {
    margin-left: 30px;
  }
  .marginT15 {
    margin-top: 15px;
  }
  .otherHistory-row-detail {
    font-size: 14px;
    color: #111111;
    letter-spacing: 0.04px;
  }
}
</style>