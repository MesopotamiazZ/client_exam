<template>
  <div class='addOtherHistory'
       v-if="Model">
    <Modal v-model="Model"
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false"
           :width='358'
           :footerHide="true">
      <div>
        <div slot="header"
             style="padding:0">
          <titleHasSlot >
            <span slot='titletHasSlotLeftTitle'>新增其他</span>
          </titleHasSlot>
        </div>
        <div class="addOtherHistorycontent">
          <!-- 第一行 -->
          <Row style="margin:15px 20px;">
            <h5>问诊</h5>
          </Row>
          <Row style="margin:15px 20px;">
            <div style="display:flex">
              <div class="addOtherHistory-content-left fl textJustify"
                   style="height:30px;width:48px">项目名称</div>
              <div class="addOtherHistory-content-right fl">
                <div>
                  <div class="addOtherHistory-content-right-itemArr">
                    <div class="addOtherHistory-content-right-item">记忆力衰减
                      <div class="addOtherHistory-content-right-itemArr-flex"
                           @click="TransitionFlexCansle()">
                        <icon class="icon_close"
                              name="modal_close_default"></icon>
                      </div>
                    </div>
                    <div class="addOtherHistory-content-right-itemArr-add"
                         @click="addClinicalClick">
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <!-- 第二行 -->
          <Row style="margin:15px 20px;">
            <h5>自觉症状</h5>
          </Row>
          <Row style="margin:15px 20px;">
            <div class="fl">
              <div class="addOccupationalDiseaseHistory-text fl textJustify"
                   style="height:30px;width:48px">症状</div>
              <div class="addOccupationalDiseaseHistory-input fl">
                <Input type="textarea"
                       :rows="2"
                       style="width:259px;height:55px;"
                       class="addOccupationalDiseaseHistory-input-textAre"></Input>
              </div>
            </div>
          </Row>
          <Row style="margin:15px 20px;">
            <div class="fl">
              <div class="addOccupationalDiseaseHistory-text fl textJustify"
                   style="height:30px;width:48px">程度</div>
              <div class="addOccupationalDiseaseHistory-input fl">
                <Input type="textarea"
                       :rows="2"
                       style="width:259px;height:55px;"
                       class="addOccupationalDiseaseHistory-input-textAre"></Input>
              </div>
            </div>
          </Row>
          <Row style="margin:15px 20px;">
            <div class="fl">
              <div class="addOccupationalDiseaseHistory-text fl textJustify"
                   style="height:30px;width:48px">出现时间</div>
              <div class="addOccupationalDiseaseHistory-input fl">
                <DatePicker :value="value1"
                            format="yyyy-MM-dd"
                            type="date"
                            placeholder="请选择"
                            placement="top-start"
                            style="width: 259px"></DatePicker>
              </div>
            </div>
          </Row>
          <Row class="m20t20">
            <div>
              <span style="margin-right:20px;color: #737373">最后修改人：哦哦哦哦哦哦</span>
              <span style="color: #737373">最后修改时间：2018年1月19日</span>
            </div>
          </Row>
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
      <!-- 摩太框 -->
      <delmodel ref="delmodel"
                @affirmDel="affirmDel"></delmodel>
    </Modal>
  </div>
</template>
<script>
import titleHasSlot from '@/components/titleHasSlot'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import ZButton from '@/components/button/ZButton'
import delmodel from '../otherModal/delmodel'
export default {
  name: 'addOtherHistory',
  props: {
    Model: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      clect: '',
    }
  },
  watch: {},
  methods: {
    //
    abolish() {
      this.$emit('addAbolish')
    },
    TransitionFlexCansle() {
      this.$refs.delmodel.openM()
    },
    affirmDel() {
      this.$refs.delmodel.closeM()
    },
  },
  mounted() {
    //
  },
  components: {
    titleHasSlot,
    ZButtonHasBg,
    ZButton,
    delmodel,
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.addOtherHistory .fontC {
  width: 69px;
  color: @tagGroupText;
  float: left;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
}
.addOtherHistory .ivu-modal-body{
border-radius:8px;
overflow: hidden;
}
.addOtherHistory .ivu-modal-header {
  padding: 0;
}
.addOtherHistory .addOccupationalDiseaseHistory-text {
  line-height: 30px;
  font-size: 12px;
  color: #737373;
  letter-spacing: 0;
}
.addOtherHistory .addOccupationalDiseaseHistory-input {
  margin-left: 10px;
  display: inline-block;
}

.addOtherHistory .input-year {
  position: relative;
  display: inline-block;
  vertical-align: top;
  &::after {
    position: absolute;
    content: '岁';
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
.addOtherHistory .input-day {
  position: relative;
  display: inline-block;
  vertical-align: top;
  &::after {
    position: absolute;
    content: '天';
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

.addOtherHistory .addOtherHistorytext {
  line-height: 30px;
  font-size: 12px;
  color: #737373;
  letter-spacing: 0;
}
.addOtherHistory .addOtherHistory-content {
  height: 490px;
  overflow: auto;
}
.addOtherHistory .addOtherHistory-content-left {
  width: 60px;
  font-size: 12px;
  color: #4a4a4a;
}
.addOtherHistory .addOtherHistory-content-right {
  width: 60px;
  flex: 1;
  margin-left: 10px;
}
.addOtherHistory .addOtherHistoryinput {
  margin-left: 10px;
  display: inline-block;
  flex: 1;
}
.addOtherHistory .addOtherHistory-content-right-itemArr-flex {
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
.addOtherHistory .addOtherHistory-content-right-Row-flex {
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
.addOtherHistory .addOtherHistory-content-right-Row-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addOtherHistory .addOtherHistory-content-right-itemArr-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addOtherHistory .margin {
  padding: 0;
}

.addOtherHistory .addOtherHistorycontent-left {
  width: 60px;
  font-size: 12px;
  color: #4a4a4a;
}
.addOtherHistory .addOtherHistorycontent-right {
  width: 60px;
  flex: 1;
  margin-left: 10px;
}
.addOtherHistory .addOtherHistory-content-right-itemArr {
  width: 520;
  max-height: 90px;
  overflow-y: auto;
  border: 1px solid #cccccc;
  padding: 0 5px 10px 5px;
  border-radius: 4px;
  .addOtherHistory-content-right-item {
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
.addOtherHistory .addOtherHistory-content-right-Row-flex {
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
.addOtherHistory .addOtherHistory-content-right-Row-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addOtherHistory .addOtherHistory-content-right-itemArr-add {
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
.addOtherHistory .addOtherHistorycontent-right-itemArr {
  width: 520;
  height: auto;
  border: 1px solid #cccccc;
  padding: 0 5px 10px 5px;
  margin-top: 15px;
  border-radius: 4px;
  .addOtherHistorycontent-right-item {
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

.addOtherHistory .m20t20 {
  margin-top: 20px;
  margin-left: 20px;
}

.addOtherHistory .requiredMustFill1 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 6px;
}
.addOtherHistory .requiredMustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 2px;
}
.addOtherHistory .border1px {
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
.addOtherHistory .boder1pxLi:nth-child(1) {
  margin-top: 10px;
}
.addOtherHistory .boder1pxLi {
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
.addOtherHistory .floatF:nth-child(2) {
  width: 282px;
  height: 60px;
}
.addOtherHistory .floatF {
  float: left;
}
.addOtherHistory .mustFill1 {
  color: @tsIcon;
  position: absolute;

  right: 27px;
  fongt-size: 16px;
  top: 9px;
}
.addOtherHistory .mustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  fongt-size: 16px;
  top: 2px;
}
.addOtherHistory .disableIput {
  float: left;
  height: 30px;
  line-height: 30px;
  width: 172px;
  color: @gradeAshTwo;
}
.addOtherHistory .lageIput {
  float: left;
  width: 430px;
  color: @gradeAshTwo;
  height: 50px;
}

.addOtherHistory .BlageIput {
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
