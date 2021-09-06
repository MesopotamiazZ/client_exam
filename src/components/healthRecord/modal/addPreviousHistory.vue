<template>
  <div class='addPreviousHistory'
       v-if="controlModal">
    <Modal v-model="controlModal"
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false"
           :width='ModelWidth'
           :footerHide="true">
      <div>
        <div slot="header"
             style="padding:0">
          <titleHasSlot>
            <span slot='titletHasSlotLeftTitle'>新增{{name}}</span>
            <div slot='titletHasSlotRightContent'
                 style="margin-right:-6px;height:30px;">
              <div style="height:30px;">

              </div>
            </div>
          </titleHasSlot>
        </div>
        <div class="addPreviousHistory">
          <!-- 第一行 -->
          <Form class="maxaddPreviousHistory" :style="overflow"> 
            <div v-if="name === '输血史' || name === '外伤史' || name === '手术史'">
              <div v-for="(item, index) of data"
                   :key="index">
                <Row style="margin:20px;"
                     class="addPreviousHistory-item">
                  <div class="fl ">
                    <div class="addPreviousHistory-text fl textJustify"
                         style="height:30px;width:24px">原因</div>
                    <div class="addPreviousHistory-input">
                      <Input 
                             style="width:246px;"
                             v-model="item.name"></Input>
                    </div>
                  </div>
                  <div class="fl marginL20">
                    <div class="addPreviousHistory-text fl textJustify"
                         style="height:30px;width:24px">日期</div>
                    <div class="addPreviousHistory-input fl">
                      <DatePicker v-model="item.date"
                                  format="yyyy-MM-dd"
                                  type="date"
                                  placeholder="请选择"
                                  placement="left-start"
                                  style="width:134px"></DatePicker>
                    </div>
                      <div class="addPreviousHistory-item-ab fl">

                    <div @mouseover="iconMouseover"
                         @mouseout="iconMouseout"
                         @click="isaddItem(item,index)"
                         v-if="index +1 === data.length">
                      <icon :name='addNewItemS'></icon>
                    </div>
                    <div @mouseover="deliconMouseover"
                         @mouseout="deliconMouseout"
                         @click="isdelItem(item,index)"
                         v-if="index +1 !== data.length">
                      <icon :name='deletItemT'></icon>
                    </div>
                  </div>
                  </div>
                
                </Row>
              </div>
            </div>
            <div v-if="name === '职业病史' || name === '疾病史'">
              <div v-for="(item, index) of data"
                   :key="index">
                <Row style="margin:20px;"
                     class="addPreviousHistory-item">
                  <div class="fl ">
                    <div class="addPreviousHistory-text fl textJustify"
                         style="height:30px;width:36"
                         v-if="name === '职业病史'">职业病</div>
                    <div class="addPreviousHistory-text fl textJustify"
                         style="height:30px;width:36"
                         v-if="name === '疾病史'">疾病名称</div>
                    <div class="addPreviousHistory-input"
                         v-if="name === '职业病史'">
                      <Select filterable
                              style="height:30px;width:147px"
                              @on-change="diseaseOnChange(item.type_id,index)"
                              v-model="item.type_id">
                        <Option v-for="key of occup_disease_type"
                                :key="key.id"
                                :value="key.id">{{key.name}}</Option>
                      </Select>
                      <Select filterable
                              style="height:30px;width:147px"
                              v-model="item.name">
                        <Option v-for="(key,index1) of diseaseDataArry[index]"
                                :key="index1"
                                :value="key.name">{{key.name}}</Option>
                      </Select>
                    </div>
                    <div class="addPreviousHistory-input"
                         v-if="name === '疾病史'">
                      <Select filterable
                              style="height:30px;"
                              :class="(item.name === '恶性肿瘤' || item.name === '其他')? 'changgeItem' : 'changgeItemBig'  "
                              v-model="item.name">
                        <Option v-for="(key,index) of medicalArr"
                                :key="index"
                                :value="key.name">{{key.name}}</Option>
                      </Select>
                      <Input style="width:144px;height:30px;"
                             class="input-day"
                             v-if="item.name === '其他' ||  item.name === '恶性肿瘤'"
                             v-model="item.remark"></Input>
                    </div>
                  </div>
                  <div class="fl marginL20">
                    <div class="addPreviousHistory-text fl textJustify"
                         style="height:30px;width:48px">确诊日期</div>
                    <div class="addPreviousHistory-input fl">
                      <DatePicker v-model="item.date"
                                  value="S"
                                  format="yyyy-MM-dd"
                                  type="datetime"
                                  placeholder="请选择"
                                  placement="left-start"
                                  style="width:134px"></DatePicker>
                    </div>
                    <div class="addPreviousHistory-item-ab fl">

                    <div @mouseover="iconMouseover"
                         @mouseout="iconMouseout"
                         @click="isaddItem(item,inedx)"
                         v-if="index +1 === data.length">
                      <icon :name='addNewItemS'></icon>
                    </div>
                    <div @mouseover="deliconMouseover"
                         @mouseout="deliconMouseout"
                         @click="isdelItem(item,index)"
                         v-if="index +1 !== data.length">
                      <icon :name='deletItemT'></icon>
                    </div>
                  </div>
                  </div>

                </Row>
              </div>
            </div>
          </Form>

          <div slot="footer"
               class="footerClass alertFooterBtn"
               style="height:50px;padding:0  20px ;background:white;">
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
      <!-- 摩太框 -->
      <affmodel :id="id"
                :name="name"
                :medical_hist="transmitData"
                ref="affmodel"
                @affirmDel="affirmDel"
                :data="data"></affmodel>
    </Modal>
  </div>
</template>
<script>
import titleHasSlot from '@/components/titleHasSlot'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import ZButton from '@/components/button/ZButton'
import affmodel from '../otherModal/affmodel'
import { mapActions } from 'vuex'
import { copy } from '@/utils/helper'

export default {
  name: 'addPreviousHistory',
  props: {
    name: {
      type: String,
    },
    disease: {
      type: Array,
      default: [],
    },
    medical_hist: {
      type: [Array, Object, String],
    },
    smitData: {
      type: [Array, Object, String],
    },
    id: {
      type: [String, Number],
    },
  },
  data() {
    return {
      overflow: '',
      clect: '',
      ModelWidth: '536',
      addNewItemS: 'addNewItemS',
      deletItemT: 'deletItemT',
      transfusionArr: [{}],
      data: [],
      occup_disease_type: [
        { name: '职业性尘肺病', id: 1 },
        { name: '职业性其他呼吸系统疾病', id: 2 },
        { name: '职业性皮肤病', id: 3 },
        { name: '职业性眼病', id: 4 },
        { name: '职业性耳鼻喉口腔疾病', id: 5 },
        { name: '职业性化学中毒', id: 6 },
        { name: '物理因素所致职业病', id: 7 },
        { name: '职业性放射性疾病', id: 8 },
        { name: '职业性传染病', id: 9 },
        { name: '职业性肿瘤', id: 10 },
        { name: '其他职业病', id: 11 },
      ],
      // 疾病史的下拉框
      medicalArr: [],
      transmitData: {},
      controlModal: false,
      copyData: [],
      diseaseDataArryCopy: [],
      diseaseDataArry: [],
    }
  },
  watch: {
    name(val) {
      let that = this
      if (val === '输血史' || val === '外伤史' || val === '手术史') {
        this.ModelWidth = '536'
      }
      if (val === '疾病史' || val === '职业病史') {
        this.ModelWidth = '632'
        if (val === '疾病史') {
          this.medicalGet().then(data => {
            if (data) {
              that.medicalArr = data.items
              that.medicalArr.push({ name: '其他', remark: '' })
            }
          })
        }
      }
    },
    copyData(val) {
      if (val.length > 0) {
        this.data = copy(val, true)
        for (let key of this.data) {
          if (key.date) {
            key.date = new Date(key.date * 1000)
          }
        }
      }
    },
    controlModal(val) {
      if (val) {
        // this.setData(this.smitData)
      }
    },
    data(val, oldV) {
      if (oldV.length === 0) {
        this.diseaseDataArry = []
        for (let key in val) {
          this.diseaseGet(val[key].type_id).then(data => {
            if (data) {
              this.$set(this.diseaseDataArry, key, data.items)
            }
          })
        }
      }
      if (val.length > 8) {
        this.overflow = 'overflow-y:scroll;height:480px;'
      } else {
        this.overflow = ''
      }
    },
  },
  computed: {
    //
  },
  methods: {
    ...mapActions('healthRecordModule', ['diseaseGet', 'medicalGet']),
    //
    diseaseOnClick(index) {
      //
    },
    setData(w) {
      let a = copy(w, true)
      if (this.name === '疾病史') {
        this.copyData = a[0].value
          ? a[0].value
          : [{ name: '', date: '', remark: '' }]
        this.transmitData = a[0]
      }
      if (this.name === '职业病史') {
        this.copyData = a[1].value
          ? a[1].value
          : [{ name: '', date: '', remark: '' }]
        this.transmitData = a[1]
      }
      if (this.name === '手术史') {
        this.copyData = a[2].value
          ? a[2].value
          : [{ name: '', date: '', remark: '' }]
        this.transmitData = a[2]
      }
      if (this.name === '外伤史') {
        this.copyData = a[3].value
          ? a[3].value
          : [{ name: '', date: '', remark: '' }]
        this.transmitData = a[3]
      }
      if (this.name === '输血史') {
        this.copyData = a[4].value
          ? a[4].value
          : [{ name: '', date: '', remark: '' }]
        this.transmitData = a[4].value
      }
    },
    // 职业病 变化
    diseaseOnChange(a, index) {
      this.data[index].name = ''
      let that = this
      that.diseaseDataArry[index] = []
      this.diseaseGet(a).then(data => {
        if (data) {
          this.$set(this.diseaseDataArry, index, data.items)
        }
      })
    },
    abolish() {
      this.$emit('addAbolish')
      this.controlModal = false
      this.transfusionArr = [{}]
    },
    TransitionFlexCansle() {
      this.controlModal = true
      this.$refs.delmodel.openM()
    },
    affirmDel() {
      this.$emit('refresh')
      this.controlModal = false
    },
    delCancel() {
      this.controlModal = false
    },
    openM() {
      this.controlModal = true
    },
    // icon 鼠标移入
    iconMouseover() {
      this.addNewItemS = 'addNewItemT'
    },
    iconMouseout() {
      this.addNewItemS = 'addNewItemS'
    },
    // icon 鼠标移入
    deliconMouseover() {
      this.deletItemT = 'deletItemT'
    },
    deliconMouseout() {
      this.deletItemT = 'deletItemT'
    },
    // 添加数组
    isaddItem(a, b) {
      this.data.push({ name: '', date: '', remark: '' })
    },
    // 删除数组
    isdelItem(a, index) {
      this.data.splice(index, 1)
    },
    // 确认
    affirm() {
      this.$refs.affmodel.openM()
    },
  },
  mounted() {
    //
  },
  components: {
    titleHasSlot,
    ZButtonHasBg,
    ZButton,
    affmodel,
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.addPreviousHistory .fontC {
  width: 69px;
  color: @tagGroupText;
  float: left;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
}
.addPreviousHistory{
  .ivu-modal-content{
  border-radius: 8px;
  overflow: hidden;
  }
}
.addPreviousHistory .ivu-row{
  position: static;
}
.addPreviousHistory .ivu-modal-body{
border-radius:8px;
//overflow: hidden;
}
.addPreviousHistory .ivu-modal-header {
  padding: 0;
}
.addPreviousHistory .changgeItem {
  width: 147px;
}
.addPreviousHistory .changgeItemBig {
  width: 294px;
}
.addPreviousHistory .addPreviousHistory-text {
  line-height: 30px;
  font-size: 12px;
  color: #737373;
  letter-spacing: 0;
}
.addPreviousHistory .addPreviousHistory-input {
  margin-left: 10px;
  display: inline-block;
  flex: 1;
}
.addPreviousHistory .addPreviousHistory-item {
  // position: relative;
}
.addPreviousHistory .addPreviousHistory-item-ab {
  cursor: pointer;
  margin-left: 5px;
  margin-top:6px;
}
.addPreviousHistory .addPreviousHistory-right-itemArr-flex {
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
.addPreviousHistory .addPreviousHistory-right-Row-flex {
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
.addPreviousHistory .addPreviousHistory-right-Row-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addPreviousHistory .addPreviousHistory-right-itemArr-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addPreviousHistory .margin {
  padding: 0;
}

.addPreviousHistory .addPreviousHistory-left {
  width: 60px;
  font-size: 12px;
  color: #4a4a4a;
}
.addPreviousHistory .addPreviousHistory-right {
  width: 60px;
  flex: 1;
  margin-left: 10px;
}
.addPreviousHistory .addPreviousHistory-right-itemArr-add {
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
.addPreviousHistory .addPreviousHistory-right-itemArr {
  width: 520;
  height: auto;
  border: 1px solid #cccccc;
  padding: 0 5px 10px 5px;
  margin-top: 15px;
  border-radius: 4px;
  .addPreviousHistory-right-item {
    padding: 4px 25px;
    width: auto;
    float: left;
    background: #ffffff;
    border: 1px solid #cccccc;
    height: 30px;
    margin-top: 10px;
   // position: relative;
    margin-right: 10px;
  }
}
.inputRequired:after {
  content: '*';
  color: red;
  position: absolute;
  right: 12px;
  top: 7px;
  font-size: 16px;
}

.addPreviousHistory .m20t20 {
  margin-top: 20px;
  margin-left: 20px;
}
.addPreviousHistory textarea {
  padding: 0;
}
.addPreviousHistory .requiredMustFill1 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 6px;
}
.addPreviousHistory .requiredMustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 2px;
}
.addPreviousHistory .border1px {
  overflow: auto;
  background: @synthManageABg;
  border: 1px solid @menuTreeBorder;
  border-radius: 8px;
  width: 408px;
  height: 246px;
  padding: 0 10px;
  > ul > li {
    border: 1px solid @menuTreeBorder;
    border-radius: 4px;
    width: 364px;
    height: 60px;
  }
}
.addPreviousHistory .boder1pxLi:nth-child(1) {
  margin-top: 10px;
}
.addPreviousHistory .boder1pxLi {
  margin-top: 15px;
  position: relative;
  > .boder1pxLiAdd {
    position: absolute;
    right: -24px;
    bottom: 0;
    width: 14px;
    height: 14px;
    border-radius: 14px;
    background: @tagGroupTextLight;
    text-align: center;
    line-height: 12px;
    cursor: pointer;
    > span {
      width: 12px;
      height: 12px;
      color: #b0dcfa;
      font-size: 16px;
      font-weight: 600;
    }
  }
  > .boder1pxLiCanlse {
    cursor: pointer;
    width: 14px;
    border-radius: 14px;
    height: 14px;
    background: @menuTreeBorder;
    position: absolute;
    right: -7px;
    top: -7px;
    color: @synthManageABg;
    line-height: 11px;
    text-align: center;
    > svg {
      width: 7px;
      height: 7px;
      color: @tableTr;
    }
  }
  > .boder1pxLiCanlse:hover {
    cursor: pointer;
    background: @tsIcon;
  }
  > .floatF {
    float: left;
  }
  > .floatF:nth-child(1) {
    width: 80px;
    height: 58px;
    border-right: 1px solid @menuTreeBorder;
    line-height: 60px;
    text-align: center;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    color: @gradeAshTwo;
    > thead {
      line-height: 29px;
      th {
        color: @gradeAshTwo;
        font-weight: 500;
        border-bottom: 1px solid @menuTreeBorder;
      }
      th:nth-child(1) {
        width: 119px;
        height: 28px;
        border-right: 1px solid @menuTreeBorder;
      }
      th:nth-child(2) {
        width: 97px;
        height: 28px;
        border-right: 1px solid @menuTreeBorder;
      }
    }
    > tbody {
      line-height: 29px;
      > tr {
        .tdInput {
          > input {
            width: auto;
            height: 28px;
            text-align: center;
            border: none;
            padding: 0 10px;
          }
          > input:focus {
            outline: none;

            border: none;
          }
        }
        td:nth-child(1) {
          width: 119px;
          height: 28px;
          border-right: 1px solid @menuTreeBorder;
        }
        td:nth-child(2) {
          width: 97px;
          height: 28px;
          border-right: 1px solid @menuTreeBorder;
        }
      }
    }
  }
}
.addPreviousHistory .floatF:nth-child(2) {
  width: 282px;
  height: 60px;
}
.addPreviousHistory .floatF {
  float: left;
}
.addPreviousHistory .mustFill1 {
  color: @tsIcon;
  position: absolute;

  right: 27px;
  fongt-size: 16px;
  top: 9px;
}
.addPreviousHistory .mustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  fongt-size: 16px;
  top: 2px;
}
.addPreviousHistory .disableIput {
  float: left;
  height: 30px;
  line-height: 30px;
  width: 172px;
  color: @gradeAshTwo;
}
.addPreviousHistory .lageIput {
  float: left;
  width: 430px;
  color: @gradeAshTwo;
  height: 50px;
}

.addPreviousHistory .BlageIput {
  float: left;
  height: 30px;
  line-height: 30px;
  width: 430px;
  color: @gradeAshTwo;
  height: 80px;
}
</style>
<style>
.lageIput > div > textarea {
  height: 60px;
}

.checkBox > label > span:nth-child(1) {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.checkBox > label {
  margin-right: 25px;
}
</style>
