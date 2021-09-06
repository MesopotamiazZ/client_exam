<template>
  <div class='addOccupationalHistory'
       v-if="canModel">
    <Modal v-model="canModel"
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false"
           :width='520'
           :footerHide="true">
      <div>
        <div slot="header"
             style="padding:0">
          <titleHasSlot >
            <span slot='titletHasSlotLeftTitle'>{{state?'新增':'编辑'}}职业史</span>
          </titleHasSlot>
        </div>
        <div class="addOccupationalHistory-content">
          <div class="addOccupationalHistory-content-item"
               style="padding:5px 20px 0px 20px;">
            <!-- 职业史 -->
            <div v-if="chooseIndex ==='order'">
              <!-- 第一行 -->
              <Row class="addOccupationalHistory-content-item-margT">
                <div class="fl">
                  <div class="addOccupationalHistory-text fl textJustify"
                       style="height:30px;width:84px">单位名称</div>
                  <div class="addOccupationalHistory-input">
                    <Input style="width:386px;height:30px;"
                           type="text"
                           v-model="dataArr.unit_name"></Input>
                  </div>
                </div>
              </Row>
              <!-- 第二行 -->
              <Row class="addOccupationalHistory-content-item-margT">
                <div class="fl">
                  <div class="addOccupationalHistory-text fl textJustify"
                       style="height:30px;width:84px">部门/车间</div>
                  <div class="addOccupationalHistory-input">
                    <Input style="width:170px;height:30px;"
                           type="text"
                           v-model="dataArr.unit_dept_name"></Input>
                  </div>
                </div>
                <div class="fl"
                     style="margin-left:20px;">
                  <div class="addOccupationalHistory-text fl textJustify"
                       style="height:30px;width:48px;">工种</div>
                  <div class="addOccupationalHistory-input">

                    <Select filterable
                            style="height:30px;width:138px"
                            v-model="dataArr.occup_type_name">
                      <Option v-for="item of craftArr"
                              :key="item.id"
                              :value="item.name">{{item.name}}</Option>
                    </Select>
                  </div>
                </div>
              </Row>
              <!-- 第三行 -->
              <Row class="addOccupationalHistory-content-item-margT">
                <div class="fl">
                  <div class="addOccupationalHistory-text fl textJustify"
                       style="height:30px;width:84px">总工龄</div>
                  <div class="addOccupationalHistory-input">
                    <Input style="width:170px;height:30px;"
                           type="text"
                           v-model="dataArr.work_age"></Input>
                  </div>
                </div>
                <div class="fl"
                     style="margin-left:20px;">
                  <div class="addOccupationalHistory-text fl textJustify"
                       style="height:30px;width:48px;">接害工龄</div>
                  <div class="addOccupationalHistory-input">
                    <Input style="width:138px;height:30px;"
                           type="text"
                           v-model="dataArr.contact_harm_work_age"></Input>

                  </div>
                </div>
              </Row>

              <!-- 第六行 -->
              <Row class="addOccupationalHistory-content-item-margT">
                <div class="fl">
                  <div class="addOccupationalHistory-text fl textJustify"
                       style="height:30px;width:84px">职业危害病因素</div>
                  <div class="addOccupationalHistory-input">
                    <Input type="textarea"
                           disabled
                           :rows="2"
                           style="width:386px;height:55px;"
                           class="addOccupationalHistory-input-textAre"
                           v-model="dataArr.occup_harm_factor"></Input>
                    <div class="addOccupationalHistory-input-float"
                         @click="addOccupationalHistoryFloatClick">
                      <icon name='selectorButton'></icon>
                    </div>
                  </div>
                </div>
              </Row>
              <!-- 第七行 -->
              <Row class="addOccupationalHistory-content-item-margT"
                   style="mar">
                <div class="fl">
                  <div class="addOccupationalHistory-text fl textJustify"
                       style="height:30px;width:84px">备注</div>
                  <div class="addOccupationalHistory-input">
                    <Input type="textarea"
                           :rows="2"
                           style="width:386px;height:55px;"
                           v-model="dataArr.remark"
                           class="addOccupationalHistory-input-textAre"></Input>
                  </div>
                </div>
              </Row>
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
      </div>
    </Modal>
    <addOccupationalHistoryOther ref="addOccupationalHistoryOther"
                                 @checkValue="checkValue"></addOccupationalHistoryOther>
  </div>
</template>
<script>
import titleHasSlot from '@/components/titleHasSlot'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import ZButton from '@/components/button/ZButton'
import addOccupationalHistoryOther from '../otherModal/addOccupationalHistoryOther'
import { mapActions } from 'vuex'
import { copy } from '@/utils/helper'

export default {
  name: 'addOccupationalHistory',
  props: {
    Model: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [Number, String],
    },
    detilData: {
      type: [Object, Array],
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      state: true,
      canModel: false,
      clect: '',
      chooseIndex: 'order',
      dataArr: {
        unit_name: '', // 单位名称
        unit_dept_name: '',
        occup_type_name: '',
        work_age: null,
        contact_harm_work_age: null,
        occup_harm_factor: '',
        remark: '',
        occup_harm_type_id: null,
      },
      craftArr: [],
      copyoccup_source_type: [],
    }
  },
  watch: {
    Model(val) {
      this.canModel = val
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
    state(val) {
      if (!val) {
        this.dataArr = copy(this.detilData, true)
      }
    },
  },
  methods: {
    ...mapActions('healthRecordModule', [
      'craftGet',
      'occupationalPost',
      'occupationalPut',
    ]),
    //
    setData(v) {
      this.state = v
    },
    abolish() {
      this.state = true
      this.canModel = false
      this.$emit('addAbolish')
    },
    addClassFun(a) {
      this.chooseIndex = a
    },
    addOccupationalHistoryFloatClick() {
      this.$refs.addOccupationalHistoryOther.open()
      if (!this.state) {
        this.$refs.addOccupationalHistoryOther.setId(
          this.dataArr.occup_harm_type_id,
          this.dataArr.occup_harm_factor,
        )
      }
    },
    affirm() {
      // 提交 ====》
      let that = this
      let data = copy(this.dataArr, true)
      data.ha_id = this.id
      if (this.state) {
        data.occup_harm_factor = this.copyoccup_source_type
        this.occupationalPost(data).then(data => {
          that.$emit('refresh')
          that.abolish()
        })
      } else {
        if (this.copyoccup_source_type) {
          data.occup_harm_factor = this.copyoccup_source_type
        } else {
          data = this.detilData.occup_harm_factor
        }
        this.occupationalPut(data).then(data => {
          that.$emit('refresh')
          that.abolish()
        })
      }
    },
    checkValue(val, id) {
      if (val) {
        this.copyoccup_source_type = []
        this.dataArr.occup_harm_factor = ''
        for (let key in val) {
          this.copyoccup_source_type.push(val[key])
          this.dataArr.occup_harm_factor += val[key] + ','
        }
        this.dataArr.occup_harm_factor = this.dataArr.occup_harm_factor.substring(0, this.dataArr.occup_harm_factor.length - 1)
      }
      if (id) {
        this.dataArr.occup_harm_type_id = id
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
    addOccupationalHistoryOther,
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.addOccupationalHistory .fontC {
  width: 69px;
  color: @tagGroupText;
  float: left;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
}
.addOccupationalHistory .ivu-modal-body{
border-radius:8px;
overflow: hidden;
}
.addOccupationalHistory .ivu-modal-header {
  padding: 0;
}
.marginL20 {
  margin-left: 20px;
}
.addOccupationalHistory .table-header {
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
.addOccupationalHistory .addOccupationalHistory-text {
  line-height: 30px;
  font-size: 12px;
  color: #737373;
  letter-spacing: 0;
}
.addOccupationalHistory .addOccupationalHistory-input {
  margin-left: 10px;
  display: inline-block;
  flex: 1;
  position: relative;
  .addOccupationalHistory-input-float {
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
.addOccupationalHistory .addOccupationalHistory-content-item {
  padding: 15px 20px 0 10px;
  .addOccupationalHistory-content-item-margT {
    margin-top: 15px;
    position: relative;
  }
}
.addOccupationalHistory .addOccupationalHistory-content-right-itemArr-flex {
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

.addOccupationalHistory .addOccupationalHistory-content-right-Row-flex {
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
.addOccupationalHistory .addOccupationalHistory-content-right-Row-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addOccupationalHistory
  .addOccupationalHistory-content-right-itemArr-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addOccupationalHistory .margin {
  padding: 0;
}
.addOccupationalHistory .addOccupationalHistory-content {
}
.addOccupationalHistory .addOccupationalHistory-content-left {
  width: 60px;
  font-size: 12px;
  color: #4a4a4a;
  font-weight: 700;
}
.addOccupationalHistory .addOccupationalHistory-content-right {
  width: 60px;
  flex: 1;
  margin-left: 10px;
}
.addOccupationalHistory .addOccupationalHistory-content-right-itemArr-add {
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
.addOccupationalHistory .addOccupationalHistory-content-right-itemArr {
  width: 520;
  height: auto;
  border: 1px solid #cccccc;
  padding: 0 5px 10px 5px;
  margin-top: 15px;
  border-radius: 4px;
  .addOccupationalHistory-content-right-item {
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

.addOccupationalHistory .input-price {
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
.addOccupationalHistory .input-year {
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
.addOccupationalHistory .m20t20 {
  margin-top: 20px;
  margin-left: 20px;
}
.addOccupationalHistory textarea {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
}
.addOccupationalHistory .requiredMustFill1 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 6px;
}
.addOccupationalHistory .requiredMustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 2px;
}
.addOccupationalHistory .border1px {
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
.addOccupationalHistory .boder1pxLi:nth-child(1) {
  margin-top: 10px;
}
.addOccupationalHistory .boder1pxLi {
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
.addOccupationalHistory .floatF:nth-child(2) {
  width: 282px;
  height: 60px;
}
.addOccupationalHistory .floatF {
  float: left;
}
.addOccupationalHistory .mustFill1 {
  color: @tsIcon;
  position: absolute;

  right: 27px;
  fongt-size: 16px;
  top: 9px;
}
.addOccupationalHistory .mustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  fongt-size: 16px;
  top: 2px;
}
.addOccupationalHistory .disableIput {
  float: left;
  height: 30px;
  line-height: 30px;
  width: 172px;
  color: @gradeAshTwo;
}
.addOccupationalHistory .lageIput {
  float: left;
  width: 430px;
  color: @gradeAshTwo;
  height: 50px;
}

.addOccupationalHistory .BlageIput {
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
