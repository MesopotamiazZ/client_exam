<template>
  <div class="surroundingsHistory">
    <titleHasSlotMiddle>
      <span slot='titletHasSlotLeftTitle'>生活环境史</span>
      <div slot='titletHasSlotRightContent'
           style="margin-right:-6px;height:30px;">
        <div style="height:30px;">
          <div class="fr surroundingsHistory-title-btn"
               style="margin-left:10px"
               @click="isAllPickUp">
            <Icon :type="thisItems ? 'arrow-up-b' : 'arrow-down-b'"
                  size="8"
                  color="white"
                  style="margin-top:5px;"></Icon>
          </div>
          <ZButton :ZBtype='"ghost"'
                   class="fr"
                   @click="compile">{{live_environ?'编辑':'新增'}}</ZButton>
        </div>
      </div>
    </titleHasSlotMiddle>
    <div v-if="thisItems">
      <div class="surroundingsHistory-table"
           :style="thisItems ? 'border-top:1px solid #cccccc;': ''">
        <Row>
          <div class="fl">
            <div class="surroundingsHistory-table-left">厨房排风设施</div>
            <div class="surroundingsHistory-table-left">燃料类型</div>
            <div class="surroundingsHistory-table-left">饮水</div>
            <div class="surroundingsHistory-table-left">厕所</div>
            <div class="surroundingsHistory-table-left">禽畜栏</div>
          </div>
          <div class="fl">
            <div class="surroundingsHistory-table-right-one">
              <CheckboxGroup v-model="liveEnviron.kitchen_exhaust_facility">
                <Checkbox :label="1"
                          disabled
                          style="width:110px;">
                  <span>无</span>
                </Checkbox>
                <Checkbox :label="2"
                          disabled
                          style="width:110px;"
                          class="marginL30">
                  <span>油烟机</span>
                </Checkbox>
                <Checkbox :label="3"
                          disabled
                          style="width:110px;"
                          class="marginL30">
                  <span>换气扇</span>
                </Checkbox>
                <Checkbox :label="4"
                          disabled
                          style="width:110px;"
                          class="marginL30">
                  <span>烟囱</span>
                </Checkbox>
              </CheckboxGroup>
            </div>
            <div class="surroundingsHistory-table-right-one">
              <CheckboxGroup v-model="liveEnviron.fuel_type">
                <Checkbox :label="1"
                          style="width:110px;"
                          disabled>
                  <span>液化气</span>
                </Checkbox>
                <Checkbox :label="2"
                          disabled
                          style="width:110px;"
                          class="marginL30">
                  <span>煤</span>
                </Checkbox>
                <Checkbox :label="3"
                          disabled
                          style="width:110px;"
                          class="marginL30">
                  <span>换气扇</span>
                </Checkbox>
                <Checkbox :label="4"
                          disabled
                          style="width:110px;"
                          class="marginL30">
                  <span>沼气</span>
                </Checkbox>
                </Checkbox>
                <Checkbox :label="5"
                          disabled
                          style="width:115px">
                  <span>柴火</span>
                </Checkbox>
                <Checkbox :label="6"
                          disabled
                          class="marginL10">
                  <span>其他</span>
                </Checkbox>
              </CheckboxGroup>
            </div>
            <div class="surroundingsHistory-table-right-one">
              <CheckboxGroup v-model="liveEnviron.drink_water">
                <Checkbox :label="1"
                          style="width:110px;"
                          disabled>
                  <span>自来水</span>
                </Checkbox>
                <Checkbox :label="2"
                          disabled
                          style="width:110px;"
                          class="marginL30">
                  <span>经净化过滤的水</span>
                </Checkbox>
                <Checkbox :label="3"
                          disabled
                          style="width:110px;"
                          class="marginL30">
                  <span>井水</span>
                </Checkbox>
                <Checkbox :label="4"
                          disabled
                          style="width:110px;"
                          class="marginL30">
                  <span>河湖水</span>
                </Checkbox>
                </Checkbox>
                <Checkbox :label="5"
                          disabled
                          style="width:115px">
                  <span>塘水</span>
                </Checkbox>
                <Checkbox :label="6"
                          disabled
                          class="marginL10">
                  <span>其他</span>
                </Checkbox>
              </CheckboxGroup>
            </div>
            <div class="surroundingsHistory-table-right-one">
              <CheckboxGroup v-model="liveEnviron.toilet">
                <Checkbox :label="1"
                          style="width:110px;"
                          disabled>
                  <span>卫生厕所</span>
                </Checkbox>
                <Checkbox :label="2"
                          disabled
                          style="width:110px;"
                          class="marginL30">
                  <span>马桶</span>
                </Checkbox>
                <Checkbox :label="3"
                          disabled
                          style="width:110px;"
                          class="marginL30">
                  <span>露天粪坑</span>
                </Checkbox>
                <Checkbox :label="4"
                          disabled
                          style="width:110px;"
                          class="marginL30">
                  <span>简易棚厕</span>
                </Checkbox>
                </Checkbox>
                <Checkbox :label="5"
                          disabled
                          style="width:115px">
                  <span>一格或二格粪池式</span>
                </Checkbox>
                <Checkbox :label="6"
                          disabled
                          class="marginL10">
                  <span>其他</span>
                </Checkbox>
              </CheckboxGroup>
            </div>
            <div class="surroundingsHistory-table-right-one">
              <CheckboxGroup v-model="liveEnviron.poultry_bar">
                <Checkbox :label="1"
                          style="width:110px;"
                          disabled>
                  <span>无</span>
                </Checkbox>
                <Checkbox :label="2"
                          disabled
                          style="width:110px;"
                          class="marginL30">
                  <span>单设</span>
                </Checkbox>
                <Checkbox :label="3"
                          disabled
                          style="width:110px;"
                          class="marginL30">
                  <span>室内</span>
                </Checkbox>
                <Checkbox :label="4"
                          disabled
                          style="width:110px;"
                          class="marginL30">
                  <span>室外</span>
                </Checkbox>
              </CheckboxGroup>
            </div>
          </div>
        </Row>
      </div>
    </div>
    <addSurroundingsHistory :Model="newAdd"
                            @addAbolish="addAbolish"
                            :live_environ="live_environ"
                            @refresh="refresh"
                            @close="addAbolish"></addSurroundingsHistory>
  </div>
</template>
<script>
import titleHasSlotMiddle from '@/components/titleHasSlotMiddle'
import ZButton from '@/components/button/ZButton'
import addSurroundingsHistory from '../modal/addSurroundingsHistory'
import {copy} from '@/utils/helper'
export default {
  name: 'surroundingsHistory',
  data() {
    return {
      //
      basicInformationData: {},
      basicInformationRule: {},
      //  弹出框
      newAdd: false,
      thisItems: false,
      liveEnviron: {
        kitchen_exhaust_facility: [],
        poultry_bar: [],
        toilet: [],
        drink_water: [],
        fuel_type: [],
      },
      copylive_environ: {},
    }
  },
  components: {
    titleHasSlotMiddle,
    ZButton,
    addSurroundingsHistory,
  },
  watch: {
    live_environ(val) {
      this.liveEnviron = copy(val, true)
      this.copylive_environ = copy(val, true)
      console.log(val, '生活环境')
    },
  },
  props: {
    allItems: {
      type: Boolean,
      defalut: false,
    },
    live_environ: {
      type: Object,
      defalut: {},
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
      this.newAdd = true
    },
    addAbolish() {
      this.newAdd = false
    },
    // 刷新
    refresh() {
      this.$emit('refresh')
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
.surroundingsHistory {
  overflow: hidden;
  .ivu-checkbox-disabled.ivu-checkbox-checked .ivu-checkbox-inner {
    background-color:#2d8cf0;
    border-color: #2d8cf0;
  }
  .ivu-checkbox-disabled + span{
    color: rgb(73, 80, 96);
    cursor: default;
  }
  .surroundingsHistory-table {
    border-top: #cccccc;
  }
  .surroundingsHistory-table-left {
    text-align: center;
    width: 170px;
    height: 40px;
    background: #e8f2ff;
    line-height: 40px;
    border-right: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }
  .marginL30 {
    margin-left: 30px;
  }
  .surroundingsHistory-table-left-big {
    text-align: center;
    width: 170px;
    height: 80px;
    background: #e8f2ff;
    line-height: 80px;
    border-right: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }
  .surroundingsHistory-table-left:last-child {
    text-align: center;
    width: 170px;
    height: 40px;
    background: #e8f2ff;
    line-height: 40px;
    border-right: 1px solid #d9d9d9;
    border-bottom: none;
    padding: 0 20px;
  }
  .surroundingsHistory-table-right-one {
    width: 813px;
    border-bottom: 1px solid #d9d9d9;
    height: 40px;
    text-align: left;
    line-height: 30px;
    padding: 0 20px;
  }
  .surroundingsHistory-table-right-one:last-child {
    width: 813px;
    border-bottom: none;
    height: 40px;
    text-align: left;
    line-height: 30px;
    padding: 0 20px;
  }
  .surroundingsHistory-table-right-two {
    width: 813px;
    border-bottom: 1px solid #d9d9d9;
    height: 40px;
    text-align: left;
    line-height: 30px;
    overflow: hidden;
  }
  .surroundingsHistory-table-right-two:last-child {
    width: 813px;
    border-bottom: none;
    height: 40px;
    text-align: left;
    line-height: 30px;
  }
  .surroundingsHistory-table-right-one-item {
    height: 30px;
    border: 1px solid #d9d9d9;
    line-height: 30px;
    text-align: center;
    min-width: 74px;
    display: inline-block;
  }
  .surroundingsHistory-table-right-two-name {
    width: 140px;
    height: 40px;
    background: #e8f2ff;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  .surroundingsHistory-table-right-two-nameValue {
    width: 297px;
    height: 40px;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  .surroundingsHistory-table-right-two-data {
    width: 140px;
    height: 40px;
    background: #e8f2ff;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  .surroundingsHistory-table-right-two-dataValue {
    width: 236px;
    height: 40px;
    text-align: center;
    .surroundingsHistory-table-left {
      text-align: center;
      width: 170px;
      height: 40px;
      background: #e8f2ff;
      line-height: 40px;
      border-right: 1px solid #d9d9d9;
      border-bottom: 1px solid #d9d9d9;
    }
  }
  .marginL30 {
    margin-left: 30px;
  }
  .surroundingsHistory-table-left-big {
    text-align: center;
    width: 170px;
    height: 80px;
    background: #e8f2ff;
    line-height: 80px;
    border-right: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }
  .surroundingsHistory-table-left:last-child {
    text-align: center;
    width: 170px;
    height: 40px;
    background: #e8f2ff;
    line-height: 40px;
    border-right: 1px solid #d9d9d9;
    border-bottom: none;
    padding: 0 20px;
  }
  .surroundingsHistory-table-right-one {
    width: 813px;
    border-bottom: 1px solid #d9d9d9;
    height: 40px;
    text-align: left;
    line-height: 30px;
    padding: 0 20px;
  }
  .surroundingsHistory-table-right-one:last-child {
    width: 813px;
    border-bottom: none;
    height: 40px;
    text-align: left;
    line-height: 30px;
    padding: 0 20px;
  }
  .surroundingsHistory-table-right-two {
    width: 813px;
    border-bottom: 1px solid #d9d9d9;
    height: 40px;
    text-align: left;
    line-height: 30px;
    overflow: hidden;
  }
  .surroundingsHistory-table-right-two:last-child {
    width: 813px;
    border-bottom: none;
    height: 40px;
    text-align: left;
    line-height: 30px;
  }
  .surroundingsHistory-table-right-one-item {
    height: 30px;
    border: 1px solid #d9d9d9;
    line-height: 30px;
    text-align: center;
    min-width: 74px;
    display: inline-block;
  }
  .surroundingsHistory-table-right-two-name {
    width: 140px;
    height: 40px;
    background: #e8f2ff;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  .surroundingsHistory-table-right-two-nameValue {
    width: 297px;
    height: 40px;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  .surroundingsHistory-table-right-two-data {
    width: 140px;
    height: 40px;
    background: #e8f2ff;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  .surroundingsHistory-table-right-two-dataValue {
    width: 236px;
    height: 40px;
    text-align: center;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  background: #ffffff;
  border: 1px solid #e0e0e0;
  // box-shadow: 0 1px 15px 0 rgba(206,213,242,0.70);
  border-radius: 8px;
  .surroundingsHistory-title-btn {
    width: 20px;
    height: 20px;
    background: #008cee;
    display: inline-block;
    margin-top: 5px;
    border-radius: 4px;
    text-align: center;
  }
  .surroundingsHistory-title-btn:hover {
    cursor: pointer;
  }
  .basicInformationForm {
    padding: 20px;
    position: relative;
    .surroundingsHistory-img-po {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .surroundingsHistory-img {
      width: 90px;
      height: 120px;
      border: 1px solid red;
    }
  }
  .surroundingsHistory-row {
    height: 30px;
  }
  .surroundingsHistory-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .surroundingsHistory-input {
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
  .surroundingsHistory-row-detail {
    font-size: 14px;
    color: #111111;
    letter-spacing: 0.04px;
  }
}
</style>