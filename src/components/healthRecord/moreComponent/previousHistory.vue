<template>
  <div class="previousHistory">
    <titleHasSlotMiddle>
      <span slot='titletHasSlotLeftTitle'>既往史（疾病史、职业病史、手术史、外伤史、输血史）</span>
      <div slot='titletHasSlotRightContent'
           style="margin-right:-6px;height:30px;">
        <div style="height:30px;">
          <div class="fr previousHistory-title-btn"
               style="margin-left:10px"
               @click="isAllPickUp">
            <Icon :type="thisItems ? 'arrow-up-b' : 'arrow-down-b'"
                  size="8"
                  color="white"
                  style="margin-top:5px;"></Icon>
          </div>
          <Dropdown style="margin-left: 20px"
                    @on-click="selcetDropDown">
            <Button type="ghost">
              新 增
              <Icon type="arrow-down-b"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem v-for="(item, index) of disease"
                            :name="item.name"
                            :key="index">{{item.name}}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

      </div>
    </titleHasSlotMiddle>
    <div v-if="thisItems">
      <div class="previousHistory-table">
        <Row>
          <div class="fl">
            <div class="previousHistory-table-left"
                 v-for="(item, index) of disease"
                 :key="index">
              <div> {{item.name}}</div>
              <div>
                <RadioGroup v-model="item.value"
                            class="RadioGroup">
                  <Radio :label="1"
                         :disabled="item.type_status">有</Radio>
                  <Radio :label="0"
                         :disabled="!item.type_status">无</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
          <div class="fl">
            <div class="previousHistory-table-right-one"
                 v-for="(item, index) of diseaseData"
                 :key="index">
              <div class="previousHistory-table-right-one-item"
                   v-for="(key, indexofkey) of item"
                   :key="indexofkey">{{key.name==='其他'?key.remark:key.name}}:{{key.date|timeFilter('YYYY-MM-DD')}}</div>
            </div>
          </div>

        </Row>
      </div>
    </div>
    <addPreviousHistory :id="id"
                        :smitData="transmitData"
                        ref="addMedicalHistory"
                        @refresh="refresh"
                        @addAbolish="addAbolish"
                        :name="name"
                        :disease="disease"
                        :medical_hist="medical_hist"></addPreviousHistory>
  </div>
</template>
<script>
import titleHasSlotMiddle from '@/components/titleHasSlotMiddle'
import ZButton from '@/components/button/ZButton'
import addPreviousHistory from '../modal/addPreviousHistory'

export default {
  name: 'previousHistory',
  data() {
    return {
      //
      basicInformationData: {},
      basicInformationRule: {},
      clect: '',
      // 摩太框
      thisItems: false,
      name: '',
      disease: [
        { name: '疾病史', value: 0 },
        { name: '职业病史', value: 0 },
        { name: '手术史', value: 0 },
        { name: '外伤史', value: 0 },
        { name: '输血史', value: 0 },
      ], // 疾病史基础数据
      diseaseData: [[], [], [], [], []],
      transmitData: [{}, {}, {}, {}, {}],
    }
  },
  components: {
    titleHasSlotMiddle,
    ZButton,
    addPreviousHistory,
  },
  watch: {
    thisItems(val) {
  //    console.log(val)
    },
    medical_hist(val) {
      for (let key of val) {
        if (key.type) {
          this.disease[key.type - 1].value = 1
          this.diseaseData[key.type - 1] = key.value
          this.transmitData[key.type - 1] = key
        }
      }
    },
  },
  props: {
    allItems: {
      type: Boolean,
      defalut: false,
    },
    medical_hist: {
      type: [Object, Array],
    },
    id: {
      type: [String, Number],
    },
  },
  methods: {
    //
    refresh() {
      this.$emit('refresh')
    },
    unfold() {
      this.thisItems = true
    },
    retract() {
      this.thisItems = false
    },
    isAllPickUp() {
      this.thisItems = !this.thisItems
    },
    openM() {
      this.$refs.addMedicalHistory.openM()
    },
    addAbolish() {
      this.$refs.addMedicalHistory.delCancel()
    },
    selcetDropDown() {
      this.name = arguments[0]
      this.$nextTick(() => {
        if (this.name) {
          let a = this.transmitData
          this.openM()
          this.$refs.addMedicalHistory.setData(a)
        }
      })
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
.previousHistory {
  overflow: hidden;
  .ivu-dropdown-item:hover{
    background: #E8F2FF;
  }
  .RadioGroup {
    span {
      cursor: default;
    }
    input {
      cursor: default;
    }
    label {
      cursor: default;
    }
  }
  .previousHistory-table {
    border-top: 1px solid #cccccc;
  }
  .previousHistory-table-left {
    text-align: center;
    width: 170px;
    height: 60px;
    background: #e8f2ff;
    border-right: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    padding-top: 10px;
  }
  .previousHistory-table-left:last-child {
    border-bottom: none;
  }
  .previousHistory-table-left-big {
    text-align: center;
    width: 170px;
    height: 80px;
    background: #e8f2ff;
    line-height: 80px;
    border-right: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
  }
  /*   .previousHistory-table-left:last-child{
   text-align: center;
   width: 170px;
   height: 40px;
   background: #e8f2ff;
   line-height: 40px;
   border-right: 1px solid #D9D9D9;
   border-bottom: none;
  } */
  .previousHistory-table-right-one {
    width: 813px;
    border-bottom: 1px solid #d9d9d9;
    height: 60px;
    text-align: left;
    line-height: 50px;
    padding: 5px;
    overflow: hidden;
  }
  .previousHistory-table-right-one:last-child {
    border-bottom: none;
  }
  .previousHistory-table-right-two {
    width: 813px;
    border-bottom: 1px solid #d9d9d9;
    height: 40px;
    text-align: left;
    line-height: 30px;
    overflow: hidden;
  }
  .previousHistory-table-right-two:last-child {
    width: 813px;
    border-bottom: none;
    height: 40px;
    text-align: left;
    line-height: 30px;
  }
  .previousHistory-table-right-one-item {
    height: 30px;
    //  border: 1px solid #D9D9D9;
    line-height: 30px;
    text-align: center;
    min-width: 74px;
    margin-left: 10px;
    display: inline-block;
  }
  .previousHistory-table-right-two-name {
    width: 140px;
    height: 40px;
    background: #e8f2ff;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  .previousHistory-table-right-two-nameValue {
    width: 297px;
    height: 40px;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  .previousHistory-table-right-two-data {
    width: 140px;
    height: 40px;
    background: #e8f2ff;
    text-align: center;
    border-right: 1px solid #d9d9d9;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  .previousHistory-table-right-two-dataValue {
    width: 236px;
    height: 40px;
    text-align: center;
    float: left;
    line-height: 40px;
    padding: 0 5px;
  }
  background: #ffffff;
  border: 1px solid #e0e0e0;
  /*   box-shadow: 0 1px 15px 0 rgba(206,213,242,0.70);
 */
  border-radius: 8px;
  .previousHistory-title-btn {
    width: 20px;
    height: 20px;
    background: #008cee;
    display: inline-block;
    margin-top: 5px;
    text-align: center;
    border-radius: 4px;
  }
  .previousHistory-title-btn:hover {
    cursor: pointer;
  }
  .basicInformationForm {
    padding: 20px;
    position: relative;
    .previousHistory-img-po {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .previousHistory-img {
      width: 90px;
      height: 120px;
      border: 1px solid red;
    }
  }
  .previousHistory-row {
    height: 30px;
  }
  .previousHistory-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .previousHistory-input {
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
  .previousHistory-row-detail {
    font-size: 14px;
    color: #111111;
    letter-spacing: 0.04px;
  }
}
</style>