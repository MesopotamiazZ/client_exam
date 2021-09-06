<template>
  <div class='addMedicalHistory'
       v-if="Model">
    <Modal v-model="Model"
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false"
           :width='632'
           :footerHide="true">
      <div>
        <div slot="header"
             style="padding:0">
          <titleHasSlot >
            <span slot='titletHasSlotLeftTitle'>新增既往史</span>
          </titleHasSlot>
        </div>
        <div class="addMedicalHistory-content">
          <!-- 第一行 -->
          <Row style="margin:20px;">
            <div style="display:flex">
              <div class="addMedicalHistory-content-left fl textJustify">疾病史</div>
              <div class="addMedicalHistory-content-right fl">
                <div>
                  <RadioGroup v-model="clect"
                              style="margin-top:-5px;">
                    <Radio label="有"></Radio>
                    <Radio label="无"></Radio>
                  </RadioGroup>
                </div>
                <div class="addMedicalHistory-content-right-itemArr">
                  <div class="addMedicalHistory-content-right-item">高血压
                    <div class="addMedicalHistory-content-right-itemArr-flex"
                         @click="TransitionFlexCansle(index)">
                      <icon class="icon_close"
                            name="modal_close_default"></icon>
                    </div>
                  </div>
                  <div class="addMedicalHistory-content-right-itemArr-add"
                       @click="addClinicalClick">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <!-- 第二行 -->
          <Row style="margin:20px;">
            <div style="display:flex">
              <div class="addMedicalHistory-content-left fl textJustify">遗传病史</div>
              <div class="addMedicalHistory-content-right fl">
                <div>
                  <RadioGroup v-model="clect"
                              style="margin-top:-5px;">
                    <Radio label="有"></Radio>
                    <Radio label="无"></Radio>
                  </RadioGroup>
                </div>
                <div class="addMedicalHistory-content-right-itemArr">
                  <div class="addMedicalHistory-content-right-item">高血压
                    <div class="addMedicalHistory-content-right-itemArr-flex"
                         @click="TransitionFlexCansle(index)">
                      <icon class="icon_close"
                            name="modal_close_default"></icon>
                    </div>
                  </div>
                  <div class="addMedicalHistory-content-right-itemArr-add"
                       @click="addClinicalClick">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <!-- 第三行 -->
          <Row style="margin:20px;">
            <div style="display:flex">
              <div class="addMedicalHistory-content-left fl textJustify">药物过敏史</div>
              <div class="addMedicalHistory-content-right fl">
                <div>
                  <RadioGroup v-model="clect"
                              style="margin-top:-5px;">
                    <Radio label="有"></Radio>
                    <Radio label="无"></Radio>
                  </RadioGroup>
                </div>
                <div class="addMedicalHistory-content-right-itemArr">
                  <div class="addMedicalHistory-content-right-item">高血压
                    <div class="addMedicalHistory-content-right-itemArr-flex"
                         @click="TransitionFlexCansle(index)">
                      <icon class="icon_close"
                            name="modal_close_default"></icon>
                    </div>
                  </div>
                  <div class="addMedicalHistory-content-right-itemArr-add"
                       @click="addClinicalClick">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <!-- 第四行 -->
          <Row style="margin:20px;">
            <div style="display:flex">
              <div class="addMedicalHistory-content-left fl textJustify">暴露史</div>
              <div class="addMedicalHistory-content-right fl">
                <div>
                  <RadioGroup v-model="clect"
                              style="margin-top:-5px;">
                    <Radio label="有"></Radio>
                    <Radio label="无"></Radio>
                  </RadioGroup>
                </div>
                <div class="addMedicalHistory-content-right-itemArr">
                  <div class="addMedicalHistory-content-right-item">高血压
                    <div class="addMedicalHistory-content-right-itemArr-flex"
                         @click="TransitionFlexCansle(index)">
                      <icon class="icon_close"
                            name="modal_close_default"></icon>
                    </div>
                  </div>
                  <div class="addMedicalHistory-content-right-itemArr-add"
                       @click="addClinicalClick">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <!-- 第五行 -->
          <Row style="margin:20px;">
            <div style="display:flex">
              <div class="addMedicalHistory-content-left fl textJustify">残疾情况</div>
              <div class="addMedicalHistory-content-right fl">
                <div>
                  <RadioGroup v-model="clect"
                              style="margin-top:-5px;">
                    <Radio label="有"></Radio>
                    <Radio label="无"></Radio>
                  </RadioGroup>
                </div>
                <div class="addMedicalHistory-content-right-itemArr">
                  <div class="addMedicalHistory-content-right-item">高血压
                    <div class="addMedicalHistory-content-right-itemArr-flex"
                         @click="TransitionFlexCansle(index)">
                      <icon class="icon_close"
                            name="modal_close_default"></icon>
                    </div>
                  </div>
                  <div class="addMedicalHistory-content-right-itemArr-add"
                       @click="addClinicalClick">
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <!-- 第六行 -->
          <Row style="margin:20px;">
            <div style="display:flex">
              <div class="addMedicalHistory-content-left fl textJustify">手术史</div>
              <div class="addMedicalHistory-content-right fl">
                <div>
                  <RadioGroup v-model="clect"
                              style="margin-top:-5px;">
                    <Radio label="有"></Radio>
                    <Radio label="无"></Radio>
                  </RadioGroup>
                </div>
                <div style="margin-top:10px;">
                  <Row>
                    <div class="fl">
                      <div class="addMedicalHistory-text fl textJustify"
                           style="height:30px;width:48px">名称</div>
                      <div class="addMedicalHistory-input">
                        <Input style="width:250px;"></Input>
                      </div>
                    </div>
                    <div class="fl"
                         style="margin-left:20px;">
                      <div class="addMedicalHistory-text fl textJustify"
                           style="height:30px;width:36px">日期</div>
                      <div class="addMedicalHistory-input">
                        <DatePicker :value="value1"
                                    format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="Select date"
                                    placement="left-start"
                                    style="width: 120px"></DatePicker>
                      </div>
                    </div>
                    <div>
                      <div class="addMedicalHistory-content-right-Row-flex"
                           @click="TransitionFlexCansle(index)">
                        <icon class="icon_close"
                              name="modal_close_default"></icon>
                      </div>
                    </div>
                  </Row>
                  <Row style="margin-top:15px;">
                    <div class="fl">
                      <div class="addMedicalHistory-text fl textJustify"
                           style="height:30px;width:48px">名称</div>
                      <div class="addMedicalHistory-input">
                        <Input style="width:250px;"></Input>
                      </div>
                    </div>
                    <div class="fl"
                         style="margin-left:20px;">
                      <div class="addMedicalHistory-text fl textJustify"
                           style="height:30px;width:36px">日期</div>
                      <div class="addMedicalHistory-input">
                        <DatePicker :value="value1"
                                    format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="Select date"
                                    placement="left-start"
                                    style="width: 120px"></DatePicker>
                      </div>
                    </div>
                    <div>
                      <div class="addMedicalHistory-content-right-Row-flex"
                           @click="TransitionFlexCansle(index)">
                        <icon class="icon_close"
                              name="modal_close_default"></icon>
                      </div>
                    </div>
                  </Row>
                </div>
              </div>
            </div>
          </Row>
          <!-- 第七行 -->
          <Row style="margin:20px;">
            <div style="display:flex">
              <div class="addMedicalHistory-content-left fl textJustify">外伤史</div>
              <div class="addMedicalHistory-content-right fl">
                <div>
                  <RadioGroup v-model="clect"
                              style="margin-top:-5px;">
                    <Radio label="有"></Radio>
                    <Radio label="无"></Radio>
                  </RadioGroup>
                </div>
                <div style="margin-top:10px;">
                  <Row>
                    <div class="fl">
                      <div class="addMedicalHistory-text fl textJustify"
                           style="height:30px;width:48px">名称</div>
                      <div class="addMedicalHistory-input">
                        <Input style="width:250px;"></Input>
                      </div>
                    </div>
                    <div class="fl"
                         style="margin-left:20px;">
                      <div class="addMedicalHistory-text fl textJustify"
                           style="height:30px;width:36px">日期</div>
                      <div class="addMedicalHistory-input">
                        <DatePicker :value="value1"
                                    format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="Select date"
                                    placement="left-start"
                                    style="width: 120px"></DatePicker>
                      </div>
                    </div>
                    <div>
                      <div class="addMedicalHistory-content-right-Row-flex"
                           @click="TransitionFlexCansle(index)">
                        <icon class="icon_close"
                              name="modal_close_default"></icon>
                      </div>
                    </div>
                  </Row>
                </div>
              </div>
            </div>
          </Row>
          <!-- 第八行 -->
          <Row style="margin:20px;">
            <div style="display:flex">
              <div class="addMedicalHistory-content-left fl textJustify">输血史</div>
              <div class="addMedicalHistory-content-right fl">
                <div>
                  <RadioGroup v-model="clect"
                              style="margin-top:-5px;">
                    <Radio label="有"></Radio>
                    <Radio label="无"></Radio>
                  </RadioGroup>
                </div>
                <div style="margin-top:10px;">
                  <Row>
                    <div class="fl">
                      <div class="addMedicalHistory-text fl textJustify"
                           style="height:30px;width:48px">原因</div>
                      <div class="addMedicalHistory-input">
                        <Input style="width:250px;"></Input>
                      </div>
                    </div>
                    <div class="fl"
                         style="margin-left:20px;">
                      <div class="addMedicalHistory-text fl textJustify"
                           style="height:30px;width:36px">日期</div>
                      <div class="addMedicalHistory-input">
                        <DatePicker :value="value1"
                                    format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="Select date"
                                    placement="left-start"
                                    style="width: 120px"></DatePicker>
                      </div>
                    </div>
                    <div>
                      <div class="addMedicalHistory-content-right-Row-flex"
                           @click="TransitionFlexCansle(index)">
                        <icon class="icon_close"
                              name="modal_close_default"></icon>
                      </div>
                    </div>
                  </Row>
                </div>
              </div>
            </div>
          </Row>
          <!-- 第九行 -->
          <Row style="margin:20px;">
            <div style="display:flex">
              <div class="addMedicalHistory-content-left fl textJustify">输血史</div>
              <div class="addMedicalHistory-content-right fl">
                <div>
                  <RadioGroup v-model="clect"
                              style="margin-top:-5px;">
                    <Radio label="有"></Radio>
                    <Radio label="无"></Radio>
                  </RadioGroup>
                </div>
                <div style="margin-top:10px;">
                  <Row>
                    <div class="fl">
                      <div class="addMedicalHistory-text fl textJustify"
                           style="height:30px;width:48px">家族病</div>
                      <div class="addMedicalHistory-input">
                        <Select filterable
                                style="height:30px;width:250px">
                          <Option value="1">男</Option>
                          <Option value="2">女</Option>
                        </Select>
                      </div>
                    </div>
                    <div class="fl"
                         style="margin-left:20px;">
                      <div class="addMedicalHistory-text fl textJustify"
                           style="height:30px;width:36px">关系</div>
                      <div class="addMedicalHistory-input">
                        <Select filterable
                                style="height:30px;width:120px">
                          <Option value="1">男</Option>
                          <Option value="2">女</Option>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <div class="addMedicalHistory-content-right-Row-flex"
                           @click="TransitionFlexCansle(index)">
                        <icon class="icon_close"
                              name="modal_close_default"></icon>
                      </div>
                    </div>
                  </Row>
                </div>
              </div>
            </div>
          </Row>
          <!-- <Row class="m20t20">
          <div>
          <span style="margin-right:20px;color: #737373">
          最后修改人：{{realName}}
          </span>
          <span style="color: #737373">
          最后修改时间：{{upDataTime | timeFilter}}
          </span>
          </div>
          </Row> -->
          <div slot="footer"
               class="footerClass alertFooterBtn"
               style="height:70px;padding:20px;background:white;border-top:1px solid #d9d9d9;">
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

export default {
  name: 'addMedicalHistory',
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
.addMedicalHistory .fontC {
  width: 69px;
  color: @tagGroupText;
  float: left;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
}
.addMedicalHistory .ivu-modal-body{
border-radius:8px;
overflow: hidden;
}
.addMedicalHistory .ivu-modal-header {
  padding: 0;
}
.addMedicalHistory .addMedicalHistory-text {
  line-height: 30px;
  font-size: 12px;
  color: #737373;
  letter-spacing: 0;
}
.addMedicalHistory .addMedicalHistory-input {
  margin-left: 10px;
  display: inline-block;
  flex: 1;
}
.addMedicalHistory .addMedicalHistory-content-right-itemArr-flex {
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
.addMedicalHistory .addMedicalHistory-content-right-Row-flex {
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
.addMedicalHistory .addMedicalHistory-content-right-Row-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addMedicalHistory .addMedicalHistory-content-right-itemArr-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addMedicalHistory .margin {
  padding: 0;
}
.addMedicalHistory .addMedicalHistory-content {
  height: 490px;
  overflow: auto;
}
.addMedicalHistory .addMedicalHistory-content-left {
  width: 60px;
  font-size: 12px;
  color: #4a4a4a;
  font-weight: 700;
}
.addMedicalHistory .addMedicalHistory-content-right {
  width: 60px;
  flex: 1;
  margin-left: 10px;
}
.addMedicalHistory .addMedicalHistory-content-right-itemArr-add {
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
.addMedicalHistory .addMedicalHistory-content-right-itemArr {
  width: 520;
  height: auto;
  border: 1px solid #cccccc;
  padding: 0 5px 10px 5px;
  margin-top: 15px;
  border-radius: 4px;
  .addMedicalHistory-content-right-item {
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

.addMedicalHistory .m20t20 {
  margin-top: 20px;
  margin-left: 20px;
}
.addMedicalHistory textarea {
  padding: 0;
}
.addMedicalHistory .requiredMustFill1 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 6px;
}
.addMedicalHistory .requiredMustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 2px;
}
.addMedicalHistory .border1px {
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
.addMedicalHistory .boder1pxLi:nth-child(1) {
  margin-top: 10px;
}
.addMedicalHistory .boder1pxLi {
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
.addMedicalHistory .floatF:nth-child(2) {
  width: 282px;
  height: 60px;
}
.addMedicalHistory .floatF {
  float: left;
}
.addMedicalHistory .mustFill1 {
  color: @tsIcon;
  position: absolute;

  right: 27px;
  fongt-size: 16px;
  top: 9px;
}
.addMedicalHistory .mustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  fongt-size: 16px;
  top: 2px;
}
.addMedicalHistory .disableIput {
  float: left;
  height: 30px;
  line-height: 30px;
  width: 172px;
  color: @gradeAshTwo;
}
.addMedicalHistory .lageIput {
  float: left;
  width: 430px;
  color: @gradeAshTwo;
  height: 50px;
}

.addMedicalHistory .BlageIput {
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
