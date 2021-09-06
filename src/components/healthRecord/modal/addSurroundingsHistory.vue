<template>
  <div class='addSurroundingsHistory'
       v-if="Model"
       >
    <Modal v-model="Model"
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false"
           :width='1033'
           :footerHide="true">
      <div>
        <div slot="header"
             style="padding:0">
          <titleHasSlot >
            <span slot='titletHasSlotLeftTitle'>{{live_environ ? '编辑':'新增'}}生活环境史</span>
          </titleHasSlot>
        </div>
        <div class="addSurroundingsHistory-content"
             style="margin-top:20px;border-radius: 0 0 8px 8px;overflow:hidden" >
          <div class="addSurroundingsHistory-content-item"
               style="padding:0px 20px 0px 20px;">
            <div class="addSurroundingsHistory-table">
              <Row>
                <div class="fl">
                  <div class="addSurroundingsHistory-table-left">厨房排风设施</div>
                  <div class="addSurroundingsHistory-table-left">燃料类型</div>
                  <div class="addSurroundingsHistory-table-left">饮水</div>
                  <div class="addSurroundingsHistory-table-left">厕所</div>
                  <div class="addSurroundingsHistory-table-left">禽畜栏</div>
                </div>
                <div class="fl">
                  <div class="addSurroundingsHistory-table-right-one">
                    <CheckboxGroup v-model="liveEnviron.kitchen_exhaust_facility">
                      <Checkbox :label="1"
                                style="width:110px;">
                        <span>无</span>
                      </Checkbox>
                      <Checkbox :label="2"
                                style="width:110px;"
                                class="marginL30">
                        <span>油烟机</span>
                      </Checkbox>
                      <Checkbox :label="3"
                                style="width:110px;"
                                class="marginL30">
                        <span>换气扇</span>
                      </Checkbox>
                      <Checkbox :label="4"
                                style="width:110px;"
                                class="marginL30">
                        <span>烟囱</span>
                      </Checkbox>
                    </CheckboxGroup>
                  </div>
                  <div class="addSurroundingsHistory-table-right-one">
                    <CheckboxGroup v-model="liveEnviron.fuel_type">
                      <Checkbox :label="1"
                                style="width:110px;">
                        <span>液化气</span>
                      </Checkbox>
                      <Checkbox :label="2"
                                style="width:110px;"
                                class="marginL30">
                        <span>煤</span>
                      </Checkbox>
                      <Checkbox :label="3"
                                style="width:110px;"
                                class="marginL30">
                        <span>换气扇</span>
                      </Checkbox>
                      <Checkbox :label="4"
                                style="width:110px;"
                                class="marginL30">
                        <span>沼气</span>
                      </Checkbox>
                      <Checkbox :label="5"
                                style="width:115px">
                        <span>柴火</span>
                      </Checkbox>
                      <Checkbox :label="6"
                                class="marginL10">
                        <span>其他</span>
                      </Checkbox>
                    </CheckboxGroup>
                  </div>
                  <div class="addSurroundingsHistory-table-right-one">
                    <CheckboxGroup v-model="liveEnviron.drink_water">
                      <Checkbox :label="1"
                                style="width:110px;">
                        <span>液化气</span>
                      </Checkbox>
                      <Checkbox :label="2"
                                style="width:110px;"
                                class="marginL30">
                        <span>煤</span>
                      </Checkbox>
                      <Checkbox :label="3"
                                style="width:110px;"
                                class="marginL30">
                        <span>井水</span>
                      </Checkbox>
                      <Checkbox :label="4"
                                style="width:110px;"
                                class="marginL30">
                        <span>河湖水</span>
                      </Checkbox>
                      </Checkbox>
                      <Checkbox :label="5"
                                style="width:115px">
                        <span>简易棚厕</span>
                      </Checkbox>
                      <Checkbox :label="6"
                                class="marginL10">
                        <span>其他</span>
                      </Checkbox>
                    </CheckboxGroup>
                  </div>
                  <div class="addSurroundingsHistory-table-right-one">
                    <CheckboxGroup v-model="liveEnviron.toilet">
                      <Checkbox :label="1"
                                style="width:110px;">
                        <span>卫生厕所</span>
                      </Checkbox>
                      <Checkbox :label="2"
                                style="width:110px;"
                                class="marginL30">
                        <span>马桶</span>
                      </Checkbox>
                      <Checkbox :label="3"
                                style="width:110px;"
                                class="marginL30">
                        <span>露天粪坑</span>
                      </Checkbox>
                      <Checkbox :label="4"
                                style="width:110px;"
                                class="marginL30">
                        <span>简易棚厕</span>
                      </Checkbox>
                      </Checkbox>
                      <Checkbox :label="5"
                                style="width:115px">
                        <span>一格或二格粪池式</span>
                      </Checkbox>
                      <Checkbox :label="6"
                                class="marginL10">
                        <span>其他</span>
                      </Checkbox>
                    </CheckboxGroup>
                  </div>
                  <div class="addSurroundingsHistory-table-right-one">
                    <CheckboxGroup v-model="liveEnviron.poultry_bar">
                      <Checkbox :label="1"
                                style="width:110px;">
                        <span>无</span>
                      </Checkbox>
                      <Checkbox :label="2"
                                style="width:110px;"
                                class="marginL30">
                        <span>单设</span>
                      </Checkbox>
                      <Checkbox :label="3"
                                style="width:110px;"
                                class="marginL30">
                        <span>室内</span>
                      </Checkbox>
                      <Checkbox :label="4"
                                style="width:110px;"
                                class="marginL30">
                        <span>室外</span>
                      </Checkbox>
                      </Checkbox>
                    </CheckboxGroup>
                  </div>
                </div>
              </Row>
            </div>
            <Row class="m20t20"
                 style="margin-top:20px">
              <div>
                <span style="margin-right:20px;color: #737373">最后修改人：哦哦哦哦哦哦</span>
                <span style="color: #737373">最后修改时间：2018年1月19日</span>
              </div>
            </Row>
          </div>
          <div slot="footer"
               class="footerClass alertFooterBtn"
               style="height:70px;padding:20px;background:white;">
            <div style="bakcground:white;">
              <ZButton :ZBtype='"ghost"'
                       class="fr"
                       @click="abolish">取 消</ZButton>
              <ZButtonHasBg class=" marginR20 fr"
                            @click="affirm">保 存</ZButtonHasBg>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import titleHasSlot from '@/components/titleHasSlot'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import ZButton from '@/components/button/ZButton'
import { mapActions } from 'vuex'
export default {
  name: 'addSurroundingsHistory',
  props: {
    Model: {
      type: Boolean,
      default: false,
    },
    live_environ: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      clect: '',
      liveEnviron: {
        kitchen_exhaust_facility: [],
        fuel_type: [],
        drink_water: [],
        toilet: [],
        poultry_bar: [],
      },
    }
  },
  watch: {
    live_environ(val) {
      this.liveEnviron = val
    },
    'liveEnviron.kitchen_exhaust_facility'(val, oldV) {
      if (val && oldV) {
        if (
          val.some(item => {
            return item === 1
          }) &&
          oldV.every(item => {
            return item !== 1
          })
        ) {
          this.liveEnviron.kitchen_exhaust_facility = [1]
        }
        if (
          val.some(item => {
            return item === 1
          }) &&
          oldV.every(item => {
            return item === 1
          })
        ) {
          this.liveEnviron.kitchen_exhaust_facility.splice(0, 1)
        }
      }
    },
    'liveEnviron.poultry_bar'(val, oldV) {
      if (val && oldV) {
        if (
          val.some(item => {
            return item === 1
          }) &&
          oldV.every(item => {
            return item !== 1
          })
        ) {
          this.liveEnviron.poultry_bar = [1]
        }
        if (
          val.some(item => {
            return item === 1
          }) &&
          oldV.every(item => {
            return item === 1
          })
        ) {
          this.liveEnviron.poultry_bar.splice(0, 1)
        }
      }
    },
  },
  methods: {
    ...mapActions('healthRecordModule', ['personalLifeEnvironsPut']),
    //
    abolish() {
      this.$emit('addAbolish')
    },
    addClassFun(a) {
      this.chooseIndex = a
    },
    async affirm() {
      let a = this.liveEnviron
      a.ha_id = 10
      let that = this
      this.personalLifeEnvironsPut(a).then(data => {
        if (data) {
          that.$emit('refresh')
          that.$emit('close')
        }
      })
    },
  },
  mounted() {
    //
  },
  components: {
    titleHasSlot,
    ZButtonHasBg,
    ZButton,
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.addSurroundingsHistory .fontC {
  width: 69px;
  color: @tagGroupText;
  float: left;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
}
.addSurroundingsHistory .ivu-modal-body{
border-radius:8px;
overflow: hidden;
}
.addSurroundingsHistory{
  border-radius: 0 0 8px 8px;
  overflow:hidden;
}
.addSurroundingsHistory .ivu-modal-header {
  padding: 0;
}
.marginL20 {
  margin-left: 20px;
}
.addSurroundingsHistory .table-header {
  height: 50px;
  border-bottom: 1px solid @gradeAshFive;
  .table-choose {
    padding-left: 20px;
    line-height: 47px;
    font-size: 14px;
    > li {
      margin-right: 25px;
      float: left;
      color: @gradeAshThree;
      // border-bottom:3px solid red;
      border-bottom: 3px solid transparent;
      > span {
        font-size: 12px;
        line-height: 18px;
        padding-left: 4px;
        padding-right: 4px;
        color: @contentBg;
        margin-left: 3px;
        display: inline-block;
        border-radius: 100px;
        background: @gradeAshFour;
      }
    }
    li:hover {
      color: @gradeBlueOne;
      font-weight: bold;
      > span {
        font-weight: normal;
        background: #83cb54;
      }
    }
    .clickChange {
      color: @gradeBlueOne;
      font-weight: bold;
      border-bottom: 3px solid @gradeBlueOne;
      > span {
        font-weight: normal;
        background: #83cb54;
      }
    }
  }
}
.addSurroundingsHistory .addSurroundingsHistory-text {
  line-height: 30px;
  font-size: 12px;
  color: #737373;
  letter-spacing: 0;
}
.addSurroundingsHistory .addSurroundingsHistory-input {
  margin-left: 10px;
  display: inline-block;
  flex: 1;
}
.addSurroundingsHistory .addSurroundingsHistory-content-item {
  padding: 15px 20px 0 10px;
  .addSurroundingsHistory-content-item-margT {
    margin-top: 15px;
    position: relative;
  }
}
.addSurroundingsHistory .addSurroundingsHistory-content-right-itemArr-flex {
  cursor: pointer;
  position: absolute;
  width: 14px;
  height: 14px;
  background: @menuTreeBorder;
  border-radius: 14px;
  line-height: 12px;
  text-align: center;
  top: -7px;
  right: -7px;
  > svg {
    width: 8px;
    height: 8px;
    color: @tableTr;
  }
}

.addSurroundingsHistory .addSurroundingsHistory-content-right-Row-flex {
  cursor: pointer;
  position: absolute;
  width: 14px;
  height: 14px;
  background: @menuTreeBorder;
  border-radius: 14px;
  line-height: 12px;
  text-align: center;
  top: 7px;
  right: 0px;
  > svg {
    width: 8px;
    height: 8px;
    color: @tableTr;
  }
}
.addSurroundingsHistory .addSurroundingsHistory-content-right-Row-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addSurroundingsHistory
  .addSurroundingsHistory-content-right-itemArr-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addSurroundingsHistory .margin {
  padding: 0;
}

.addSurroundingsHistory .addSurroundingsHistory-content-left {
  width: 60px;
  font-size: 12px;
  color: #4a4a4a;
  font-weight: 700;
}
.addSurroundingsHistory .addSurroundingsHistory-content-right {
  width: 60px;
  flex: 1;
  margin-left: 10px;
}
.addSurroundingsHistory-table-left {
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
.addSurroundingsHistory-table-left-big {
  text-align: center;
  width: 170px;
  height: 80px;
  background: #e8f2ff;
  line-height: 80px;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}
.addSurroundingsHistory-table-left:last-child {
  text-align: center;
  width: 170px;
  height: 40px;
  background: #e8f2ff;
  line-height: 40px;
  border-right: 1px solid #d9d9d9;
  border-bottom: none;
  padding: 0 20px;
}
.addSurroundingsHistory-table {
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
}
.addSurroundingsHistory-table-right-one {
  width: 821px;
  border-bottom: 1px solid #d9d9d9;
  height: 40px;
  text-align: left;
  line-height: 30px;
  padding: 0 20px;
}
.addSurroundingsHistory-table-right-one:last-child {
  width: 821px;
  border-bottom: none;
  height: 40px;
  text-align: left;
  line-height: 30px;
  padding: 0 20px;
}
.addSurroundingsHistory-table-right-two {
  width: 821px;
  border-bottom: 1px solid #d9d9d9;
  height: 40px;
  text-align: left;
  line-height: 30px;
  overflow: hidden;
}
.addSurroundingsHistory-table-right-two:last-child {
  width: 821px;
  border-bottom: none;
  height: 40px;
  text-align: left;
  line-height: 30px;
}
.addSurroundingsHistory-table-right-one-item {
  height: 30px;
  border: 1px solid #d9d9d9;
  line-height: 30px;
  text-align: center;
  min-width: 74px;
  display: inline-block;
}
.addSurroundingsHistory-table-right-two-name {
  width: 140px;
  height: 40px;
  background: #e8f2ff;
  text-align: center;
  border-right: 1px solid #d9d9d9;
  float: left;
  line-height: 40px;
  padding: 0 5px;
}
.addSurroundingsHistory-table-right-two-nameValue {
  width: 297px;
  height: 40px;
  text-align: center;
  border-right: 1px solid #d9d9d9;
  float: left;
  line-height: 40px;
  padding: 0 5px;
}
.addSurroundingsHistory-table-right-two-data {
  width: 140px;
  height: 40px;
  background: #e8f2ff;
  text-align: center;
  border-right: 1px solid #d9d9d9;
  float: left;
  line-height: 40px;
  padding: 0 5px;
}
.addSurroundingsHistory-table-right-two-dataValue {
  width: 236px;
  height: 40px;
  text-align: center;
}
.addSurroundingsHistory-table-left {
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
.addSurroundingsHistory-table-left-big {
  text-align: center;
  width: 170px;
  height: 80px;
  background: #e8f2ff;
  line-height: 80px;
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}
.addSurroundingsHistory-table-left:last-child {
  text-align: center;
  width: 170px;
  height: 40px;
  background: #e8f2ff;
  line-height: 40px;
  border-right: 1px solid #d9d9d9;
  border-bottom: none;
  padding: 0 20px;
}
.addSurroundingsHistory-table-right-one {
  width: 821px;
  border-bottom: 1px solid #d9d9d9;
  height: 40px;
  text-align: left;
  line-height: 30px;
  padding: 0 20px;
}
.addSurroundingsHistory-table-right-one:last-child {
  width: 821px;
  border-bottom: none;
  height: 40px;
  text-align: left;
  line-height: 30px;
  padding: 0 20px;
}
.addSurroundingsHistory-table-right-two {
  width: 821px;
  border-bottom: 1px solid #d9d9d9;
  height: 40px;
  text-align: left;
  line-height: 30px;
  overflow: hidden;
}
.addSurroundingsHistory-table-right-two:last-child {
  width: 821px;
  border-bottom: none;
  height: 40px;
  text-align: left;
  line-height: 30px;
}
.addSurroundingsHistory-table-right-one-item {
  height: 30px;
  border: 1px solid #d9d9d9;
  line-height: 30px;
  text-align: center;
  min-width: 74px;
  display: inline-block;
}
.addSurroundingsHistory-table-right-two-name {
  width: 140px;
  height: 40px;
  background: #e8f2ff;
  text-align: center;
  border-right: 1px solid #d9d9d9;
  float: left;
  line-height: 40px;
  padding: 0 5px;
}
.addSurroundingsHistory-table-right-two-nameValue {
  width: 297px;
  height: 40px;
  text-align: center;
  border-right: 1px solid #d9d9d9;
  float: left;
  line-height: 40px;
  padding: 0 5px;
}
.addSurroundingsHistory-table-right-two-data {
  width: 140px;
  height: 40px;
  background: #e8f2ff;
  text-align: center;
  border-right: 1px solid #d9d9d9;
  float: left;
  line-height: 40px;
  padding: 0 5px;
}
.addSurroundingsHistory-table-right-two-dataValue {
  width: 236px;
  height: 40px;
  text-align: center;
  float: left;
  line-height: 40px;
  padding: 0 5px;
}
.addSurroundingsHistory .addSurroundingsHistory-content-right-itemArr-add {
  display: inline-block;
  padding: 0;
  width: 30px;
  height: 30px;
  margin-top: 10px;
  background: #ffffff;
  border: 1px dashed #008cee;
  position: relative;
  div:nth-child(1) {
    position: absolute;
    width: 14px;
    height: 2px;
    top: 14px;
    left: 7.5px;
    background: #008cee;
  }
  div:nth-child(2) {
    position: absolute;
    width: 2px;
    height: 14px;
    top: 8px;
    left: 13.5px;
    background: #008cee;
  }
}
.addSurroundingsHistory .addSurroundingsHistory-content-right-itemArr {
  width: 520;
  height: auto;
  border: 1px solid #cccccc;
  padding: 0 5px 10px 5px;
  margin-top: 15px;
  border-radius: 4px;
  .addSurroundingsHistory-content-right-item {
    padding: 4px 25px;
    width: auto;
    float: left;
    background: #ffffff;
    border: 1px solid #cccccc;
    height: 30px;
    margin-top: 10px;
    position: relative;
    margin-right: 10px;
  }
}
</style>
