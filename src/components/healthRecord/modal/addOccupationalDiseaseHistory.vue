<template>
  <div class='addOccupationalDiseaseHistory'
       v-if="canModel">
    <Modal v-model="canModel"
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false"
           :width='526'
           :footerHide="true">
      <div>
        <div slot="header"
             style="padding:0">
          <titleHasSlot >
            <span slot='titletHasSlotLeftTitle'>{{state?'新增':'编辑'}}放射工作职业史</span>
          </titleHasSlot>
        </div>
        <div class="addOccupationalDiseaseHistory-content">
          <div class="addOccupationalDiseaseHistory-content-item"
               style="padding:5px 20px 0px 20px;">
            <!-- 第一行 -->

            <!-- 放射工作职业史 -->
            <div>
              <Row class="addOccupationalDiseaseHistory-content-item-margT">
                <div class="fl">
                  <div class="addOccupationalDiseaseHistory-text fl textJustify"
                       style="height:30px;width:80px">单位名称</div>
                  <div class="addOccupationalDiseaseHistory-input">
                    <Input style="width:390px;height:30px;"
                           type="text"
                           v-model="dataArr.unit_name"></Input>
                  </div>
                </div>
              </Row>
              <Row class="addOccupationalDiseaseHistory-content-item-margT">
                <div class="fl">
                  <div class="addOccupationalDiseaseHistory-text fl textJustify"
                       style="height:30px;width:80px">部门/车间</div>
                  <div class="addOccupationalDiseaseHistory-input">
                    <Input style="width:180px;height:30px;"
                           type="text"
                           v-model="dataArr.unit_dept_name"></Input>
                  </div>
                </div>
                <div class="fl"
                     style="margin-left:20px;">
                  <div class="addOccupationalDiseaseHistory-text fl textJustify"
                       style="height:30px;width:24px;">工种</div>
                  <div class="addOccupationalDiseaseHistory-input">
                    <Select filterable
                            style="height:30px;width:156px"
                            v-model="dataArr.occup_type_name">
                      <Option v-for="item of craftArr"
                              :key="item.id"
                              :value="item.name">{{item.name}}</Option>
                    </Select>
                  </div>
                </div>
              </Row>
              <Row class="addOccupationalDiseaseHistory-content-item-margT">
                <div class="fl">
                  <div class="addOccupationalDiseaseHistory-text fl textJustify"
                       style="height:30px;width:80px">职业照射种类</div>
                  <div class="addOccupationalDiseaseHistory-input">
                    <Input type="textarea"
                           :rows="2"
                           style="width:390px;height:55px;"
                           class="addOccupationalDiseaseHistory-input-textAre"
                           v-model="dataArr.occup_source_type"></Input>
                    <div class="addOccupationalDiseaseHistory-input-float"
                         @click="addOccupationalDiseaseHistoryOtherClick">
                      <icon name='selectorButton'></icon>
                    </div>
                  </div>
                </div>
              </Row>
              <!-- 第一行 -->
              <Row class="marginT15">
                <div class="addOccupationalDiseaseHistory-text fl textJustify"
                     style="height:30px;width:80px">特殊情况</div>
                <div class="addOccupationalDiseaseHistory-input">
                  <CheckboxGroup class="social"
                                 v-model="dataArr.special_case">
                    <Checkbox :label="1">
                      <span style="transform:translateY(3px);display:inline-block;">防护装置</span>
                    </Checkbox>
                    <Checkbox :label="2"
                              style="margin-left:15px;">
                      <span style="transform:translateY(3px);display:inline-block;">涉及非密封源</span>
                    </Checkbox>
                    <Checkbox :label="3"
                              style="margin-left:15px;">
                      <span style="transform:translateY(3px);display:inline-block;">心理障碍</span>
                    </Checkbox>
                  </CheckboxGroup>
                </div>
              </Row>
              <Row class="marginT15">
                <div class="addOccupationalDiseaseHistory-text fl textJustify"
                     style="height:30px;width:80px">放射线种类</div>
                <div class="addOccupationalDiseaseHistory-input">
                  <div class="addOccupationalDiseaseHistory-input-itemsArr">
                    <CheckboxGroup class="social"
                                   v-model="dataArr.rad_type">
                      <Checkbox :label="item.value"
                                v-for="(item,index) of special_caseArr"
                                :key="index"
                                class="addOccupationalDiseaseHistory-input-itemsArr-checkBox"
                                >
                        <span style="transform:translateY(3px);display:inline-block;">{{item.name}}</span>
                      </Checkbox>
                    </CheckboxGroup>
                  </div>
                </div>
              </Row>

              <!-- 每日工作量 -->
              <Row class="marginT15">
                <div class="fl">
                  <div class="addOccupationalDiseaseHistory-text fl textJustify"
                       style="height:30px;width:120px">每日工作时数或工作量</div>
                  <div class="addOccupationalDiseaseHistory-input">
                    <Input style="width:136px;height:30px;"
                           type="text"
                           class="marginL10 input-price"
                           v-model="dataArr.daily_workload"></Input>
                  </div>
                </div>
                <div class="fl marginL20">
                  <div class="addOccupationalDiseaseHistory-text fl textJustify"
                       style="height:30px;width:84px">累计受照剂量</div>
                  <div class="addOccupationalDiseaseHistory-input">
                    <Input style="width:90px;height:30px;"
                           placeholder="PH(00.00)"
                           type="text"
                           v-model="dataArr.rad_amount"></Input>
                  </div>
                </div>
              </Row>

              <!-- 第三行 -->
              <Row class="marginT15">
                <div class="fl">
                  <div class="addOccupationalDiseaseHistory-text fl textJustify"
                       style="height:30px;width:80px">过量照射史</div>
                  <div class="addOccupationalDiseaseHistory-input">
                    <Select filterable
                            style="height:30px;width:186px"
                            v-model="dataArr.excess_rad_hist">
                      <Option :value="1">是</Option>
                      <Option :value="2">否</Option>
                    </Select>
                  </div>
                </div>
                <div class="fl"
                     style="margin-left:20px;">
                  <div class="addOccupationalDiseaseHistory-text fl textJustify"
                       style="height:30px;width:84px">佩戴个人剂量计</div>
                  <div class="addOccupationalDiseaseHistory-input">
                    <Select filterable
                            style="height:30px;width:90px"
                            v-model="dataArr.is_wear_personal_dosimeter">
                      <Option :value="1">是</Option>
                      <Option :value="2">否</Option>
                    </Select>
                  </div>
                </div>
              </Row>

              <Row class="addOccupationalDiseaseHistory-content-item-margT">
                <div class="fl">
                  <div class="addOccupationalDiseaseHistory-text fl textJustify"
                       style="height:30px;width:72px">备注</div>
                  <div class="addOccupationalDiseaseHistory-input">
                    <Input type="textarea"
                           v-model="dataArr.remark"
                           :rows="2"
                           style="width:398px;height:55px;"
                           class="addOccupationalDiseaseHistory-input-textAre"></Input>
                  </div>
                </div>
              </Row>
              <Row class="marginT15">
                <div>
                  <span style="margin-right:20px;color: #737373">最后修改人：哦哦哦哦哦哦</span>
                  <span style="color: #737373">最后修改时间：2018年1月19日</span>
                </div>
              </Row>
            </div>
            <!-- 职业史 -->
          </div>

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
      <addOccupationalDiseaseHistoryOther ref="addOccupationalDiseaseHistoryOther"
                                          @checkValue="checkValue"></addOccupationalDiseaseHistoryOther>
    </Modal>
  </div>
</template>
<script>
import titleHasSlot from '@/components/titleHasSlot'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import ZButton from '@/components/button/ZButton'
import checkBox from '@/components/checkBox/fcheckboxChoice'
import addOccupationalDiseaseHistoryOther from '../otherModal/addOccupationalDiseaseHistoryOther'
import { copy } from '@/utils/helper'
import { mapActions } from 'vuex'

export default {
  name: 'addOccupationalDiseaseHistory',
  props: {
    Model: {
      type: Boolean,
      default: false,
    },
    detilData: {
      type: [Object, Array],
      default: [],
    },
    id: {
      type: [String, Number],
    },
  },
  data() {
    return {
      clect: '',
      social: '',
      state: true,
      canModel: false,
      dataArr: {
        unit_name: '',
        unit_dept_name: '', // 车间部门
        occup_type_name: '', // 工种
        occup_source_type: '',
        special_case: [], // 特殊情况
        rad_type: [], // 放射种类
        daily_workload: '',
        rad_amount: '',
        excess_rad_hist: null,
        is_wear_personal_dosimeter: null,
        remark: '',
        source_id: null,
      },
      copyoccup_source_type: [],
      special_caseArr: [
        { name: 'α射线', value: 1 },
        { name: 'γ射线', value: 2 },
        { name: 'β射线', value: 3 },
        { name: '中子射线', value: 4 },
        { name: '电子射线', value: 5 },
        { name: '质子射线', value: 6 },
        { name: '其他射线', value: 7 },
      ],
      craftArr: [],
    }
  },
  watch: {
    Model(val) {
      this.canModel = val
    },
    state(val) {
      if (!val) {
        this.dataArr = copy(this.detilData, true)
      }
    },
    canModel(val) {
      if (val) {
        let that = this
        this.$nextTick(() => {
          this.craftGet().then(data => {
            if (data) {
              that.craftArr = data.items
            }
          })
        })
      }
    },
  },
  methods: {
    //
    ...mapActions('healthRecordModule', [
      'irradiationPost',
      'craftGet',
      'irradiationPut',
    ]),
    abolish() {
      this.$emit('addAbolish')
      this.canModel = false
      this.state = true
    },
    addOccupationalDiseaseHistoryOtherClick() {
      this.$refs.addOccupationalDiseaseHistoryOther.open()
      if (!this.state) {
        this.$refs.addOccupationalDiseaseHistoryOther.setId(
          this.dataArr.source_id,
          this.dataArr.occup_source_type,
        )
      }
    },
    setData(v) {
      this.state = v
    },
    affirm() {
      let that = this
      let data = copy(this.dataArr, true)
      data.occup_source_type = this.copyoccup_source_type
      if (this.copyoccup_source_type.length < 1 && this.state === false) {
        data.occup_source_type = copy(this.dataArr, true).occup_source_type
      }
      data.ha_id = this.id
      if (this.state) {
        this.irradiationPost(data).then(data => {
          if (data) {
            that.$emit('refresh')
            that.canModel = false
            that.state = true
          }
        })
      } else {
        this.irradiationPut(data).then(data => {
          if (data) {
            that.$emit('refresh')
            that.canModel = false
            that.state = true
          }
        })
      }
    },
    checkValue(val, id) {
      if (val) {
        this.copyoccup_source_type = []
        this.dataArr.occup_source_type = ''
        for (let key in val) {
          this.copyoccup_source_type.push(val[key])
          this.dataArr.occup_source_type += val[key] + ','
        }
        this.dataArr.occup_source_type = this.dataArr.occup_source_type.substring(0, this.dataArr.occup_source_type.length - 1)
      }
      if (id) {
        this.dataArr.source_id = id
      }
    },
  },
  mounted() {
    //
  },
  components: {
    titleHasSlot,
    ZButtonHasBg,
    ZButton,
    checkBox,
    addOccupationalDiseaseHistoryOther,
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.addOccupationalDiseaseHistory .fontC {
  width: 69px;
  color: @tagGroupText;
  float: left;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
}
.addOccupationalDiseaseHistory .addOccupationalDiseaseHistory-input-itemsArr-checkBox{
  width:80px;
  margin-top: 15px;
}
.addOccupationalDiseaseHistory .ivu-modal-body{
border-radius:8px;
overflow: hidden;
}
.addOccupationalDiseaseHistory .ivu-modal-header {
  padding: 0;
}
.addOccupationalDiseaseHistory .addOccupationalDiseaseHistory-input-itemsArr {
  background: #fafafa;
  border-radius: 4px;
  width: 390px;
  height: 94px;
  border: 1px solid #cccccc;
  padding-left: 20px;
}
.addOccupationalDiseaseHistory .social {
  .ivu-checkbox {
    input {
      margin-top: 5px;
    }
    span {
      margin-top: 5px;

      display: inline-block;
    }
  }
}

.addOccupationalDiseaseHistory-input-itemsArr .social {
  .ivu-checkbox {
    input {
      margin-top: 5px;
      margin-left: 5px;
    }
    span {
      margin-top: 5px;
      margin-left: 5px;

      display: inline-block;
    }
  }
}

.marginL20 {
  margin-left: 20px;
}
.addOccupationalDiseaseHistory .table-header {
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
.addOccupationalDiseaseHistory .addOccupationalDiseaseHistory-text {
  line-height: 30px;
  font-size: 12px;
  color: #737373;
  letter-spacing: 0;
}
.addOccupationalDiseaseHistory .addOccupationalDiseaseHistory-input {
  margin-left: 10px;
  display: inline-block;
  flex: 1;
  position: relative;
  .addOccupationalDiseaseHistory-input-float {
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 0px;
    text-align: center;
    margin-right: 8px;
  }
}
.addOccupationalDiseaseHistory .addOccupationalDiseaseHistory-content-item {
  padding: 15px 20px 0 10px;
  .addOccupationalDiseaseHistory-content-item-margT {
    margin-top: 15px;
    position: relative;
  }
}
.addOccupationalDiseaseHistory
  .addOccupationalDiseaseHistory-content-right-itemArr-flex {
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

.addOccupationalDiseaseHistory
  .addOccupationalDiseaseHistory-content-right-Row-flex {
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
.addOccupationalDiseaseHistory
  .addOccupationalDiseaseHistory-content-right-Row-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addOccupationalDiseaseHistory
  .addOccupationalDiseaseHistory-content-right-itemArr-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addOccupationalDiseaseHistory .margin {
  padding: 0;
}
.addOccupationalDiseaseHistory .addOccupationalDiseaseHistory-content {
  height: 470px;
  overflow: auto;
}
.addOccupationalDiseaseHistory .addOccupationalDiseaseHistory-content-left {
  width: 60px;
  font-size: 12px;
  color: #4a4a4a;
  font-weight: 700;
}
.addOccupationalDiseaseHistory .addOccupationalDiseaseHistory-content-right {
  width: 60px;
  flex: 1;
  margin-left: 10px;
}
.addOccupationalDiseaseHistory
  .addOccupationalDiseaseHistory-content-right-itemArr-add {
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
.addOccupationalDiseaseHistory
  .addOccupationalDiseaseHistory-content-right-itemArr {
  width: 520;
  height: auto;
  border: 1px solid #cccccc;
  padding: 0 5px 10px 5px;
  margin-top: 15px;
  border-radius: 4px;
  .addOccupationalDiseaseHistory-content-right-item {
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
.inputRequired:after {
  content: '*';
  color: red;
  position: absolute;
  right: 12px;
  top: 7px;
  font-size: 16px;
}

.addOccupationalDiseaseHistory .input-price {
  position: relative;
  display: inline-block;
  vertical-align: top;
  &::after {
    position: absolute;
    content: 'h';
    display: inline-block;
    top: 7px;
    right: 10px;
    font-size: 12px;
    color: #737373;
  }
  > input {
    padding-right: 23px;
  }
}
.addOccupationalDiseaseHistory .input-year {
  position: relative;
  display: inline-block;
  vertical-align: top;
  &::after {
    position: absolute;
    content: '年';
    display: inline-block;
    top: 7px;
    right: 10px;
    font-size: 12px;
    color: #737373;
  }
  > input {
    padding-right: 23px;
  }
}
.addOccupationalDiseaseHistory .m20t20 {
  margin-top: 20px;
  margin-left: 20px;
}
.addOccupationalDiseaseHistory textarea {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
}
.addOccupationalDiseaseHistory .requiredMustFill1 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 6px;
}
.addOccupationalDiseaseHistory .requiredMustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 2px;
}
.addOccupationalDiseaseHistory .border1px {
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
.addOccupationalDiseaseHistory .boder1pxLi:nth-child(1) {
  margin-top: 10px;
}
.addOccupationalDiseaseHistory .boder1pxLi {
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
.addOccupationalDiseaseHistory .floatF:nth-child(2) {
  width: 282px;
  height: 60px;
}
.addOccupationalDiseaseHistory .floatF {
  float: left;
}
.addOccupationalDiseaseHistory .mustFill1 {
  color: @tsIcon;
  position: absolute;

  right: 27px;
  fongt-size: 16px;
  top: 9px;
}
.addOccupationalDiseaseHistory .mustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  fongt-size: 16px;
  top: 2px;
}
.addOccupationalDiseaseHistory .disableIput {
  float: left;
  height: 30px;
  line-height: 30px;
  width: 172px;
  color: @gradeAshTwo;
}
.addOccupationalDiseaseHistory .lageIput {
  float: left;
  width: 430px;
  color: @gradeAshTwo;
  height: 50px;
}

.addOccupationalDiseaseHistory .BlageIput {
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
