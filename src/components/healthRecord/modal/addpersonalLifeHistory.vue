<template>
  <div class='addpersonalLifeHistory'
       v-if="Model">
    <Modal v-model="Model"
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false"
           :width='446'
           :footerHide="true">
      <div>
        <div slot="header"
             style="padding:0">
          <titleHasSlot >
            <span slot='titletHasSlotLeftTitle'>新增个人生活史</span>
          </titleHasSlot>
        </div>
        <div class="addpersonalLifeHistory-content">
          <!-- 第一行 -->
          <Row style="margin:20px;">
            <div style="display:flex">
              <div class="addpersonalLifeHistory-content-left fl textJustify">吸烟情况</div>
              <div class="addpersonalLifeHistory-content-right fl">
                <div>
                  <RadioGroup v-model="lisf_hist.is_smoke"
                              style="margin-top:-5px;">
                    <Radio :disabled="!lifeHist"
                           :label="1"
                           class="width100">不吸烟</Radio>
                    <Radio :disabled="!lifeHist"
                           :label="2"
                           class="width100">偶尔吸烟</Radio>
                    <Radio :disabled="!lifeHist"
                           :label="3"
                           class="width100">经常吸烟</Radio>
                  </RadioGroup>
                </div>
                <div class="addpersonalLifeHistory-content-right-itemArr">
                  <div class="fl">
                    <Input style="width:89px;height:30px;"
                           class="input-zhi"
                           v-model="lisf_hist.smoke_per_day"></Input>
                  </div>
                  <div class="fl marginL20">
                    <span class="addpersonalLifeHistory-span">共</span>
                    <Input style="width:72px;height:30px;"
                           class="marginL10 input-price"
                           v-model="lisf_hist.smoke_year"></Input>
                  </div>
                  <div class="fl marginL20">
                    <span class="addpersonalLifeHistory-span">戒烟</span>
                    <Input style="width:70px;height:30px;"
                           type="text"
                           class="marginL10 input-price"
                           v-model="lisf_hist.stop_smoke_year"></Input>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <!-- 第二行 -->
          <Row style="margin:20px;">
            <div style="display:flex">
              <div class="addpersonalLifeHistory-content-left fl textJustify">饮酒情况</div>
              <div class="addpersonalLifeHistory-content-right fl">
                <div>
                  <RadioGroup v-model="lisf_hist.is_drink"
                              style="margin-top:-5px;">
                    <Radio :disabled="!lifeHist"
                           :label="1"
                           class="width100">不饮酒</Radio>
                    <Radio :disabled="!lifeHist"
                           :label="2"
                           class="width100">偶尔饮酒</Radio>
                    <Radio :disabled="!lifeHist"
                           :label="3"
                           class="width100">经常饮酒</Radio>
                  </RadioGroup>
                </div>
                <div class="addpersonalLifeHistory-content-right-itemArr">
                  <div class="fl ">
                    <span class="addpersonalLifeHistory-span">共</span>
                    <Input style="width:65px;height:30px;"
                           class="marginL10 input-price"
                           v-model="lisf_hist.drink_year"></Input>
                  </div>
                  <div class="fl marginL20">
                    <span class="addpersonalLifeHistory-span">戒酒</span>
                    <Input style="width:60px;height:30px;"
                           class="marginL10 input-price"
                           v-model="lisf_hist.stop_drink_year"></Input>
                  </div>
                </div>
              </div>
            </div>
          </Row>
          <!-- 第三行 -->
          <Row style="margin:20px;">
            <div style="display:flex">
              <div class="addpersonalLifeHistory-content-left fl textJustify">总结</div>
              <div class="addpersonalLifeHistory-content-right fl">
                <div>
                  <Input type="textarea"
                         :rows="3"
                         style="width:330px;height:60px;margin-left:5px;"
                         v-model="lisf_hist.summary"></Input>
                </div>
              </div>
            </div>
          </Row>
          <!-- 第四行 -->

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
  name: 'addpersonalLifeHistory',
  props: {
    Model: {
      type: Boolean,
      default: false,
    },
    lifeHist: {
      type: [Object, Array],
    },
  },
  data() {
    return {
      lisf_hist: {
        ha_id: '',
        is_smoke: '',
        smoke_per_day: '',
        smoke_year: '',
        stop_smoke_year: '',
        is_drink: '',
        drink_year: '',
        stop_drink_year: '',
        summary: '',
      },
      clect: '',
    }
  },
  watch: {
    lifeHist(val) {
      if (val) {
        this.lisf_hist = val
      }
    },
  },
  methods: {
    //
    ...mapActions('healthRecordModule', ['personalLifeHistoryPut']),
    abolish() {
      this.$emit('addAbolish')
    },
    affirm() {
      this.lisf_hist.ha_id = 10
      let that = this
      this.personalLifeHistoryPut(this.lisf_hist).then(data => {
        if (data) {
          that.$emit('refresh')
          that.abolish()
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
.marginL30 {
  margin-left: 30px;
}
.addpersonalLifeHistory .fontC {
  width: 69px;
  color: @tagGroupText;
  float: left;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
}
.addpersonalLifeHistory .ivu-modal-body{
border-radius:8px;
overflow: hidden;
}
.addpersonalLifeHistory .ivu-modal-header {
  padding: 0;
}
.addpersonalLifeHistory .addpersonalLifeHistory-text {
  line-height: 30px;
  font-size: 12px;
  color: #737373;
  letter-spacing: 0;
}
.addpersonalLifeHistory .addpersonalLifeHistory-input {
  margin-left: 10px;
  display: inline-block;
  flex: 1;
}
.addpersonalLifeHistory .width100 {
  width: 100px;
}
.addpersonalLifeHistory Input {
  > textarea {
    padding: 0 10px;
  }
}
.addpersonalLifeHistory .addpersonalLifeHistory-content-right-itemArr-flex {
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
.addpersonalLifeHistory .addpersonalLifeHistory-content-right-Row-flex {
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
.addpersonalLifeHistory .addpersonalLifeHistory-content-right-Row-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addpersonalLifeHistory
  .addpersonalLifeHistory-content-right-itemArr-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addpersonalLifeHistory .margin {
  padding: 0;
}
.addpersonalLifeHistory .addpersonalLifeHistory-content {
  overflow: auto;
}
.addpersonalLifeHistory .addpersonalLifeHistory-content-left {
  width: 60px;
  font-size: 12px;
  color: #4a4a4a;
}
.addpersonalLifeHistory .addpersonalLifeHistory-content-right {
  width: 60px;
  flex: 1;
  margin-left: 10px;
}
.addpersonalLifeHistory .addpersonalLifeHistory-content-right-itemArr-add {
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
.addpersonalLifeHistory .addpersonalLifeHistory-content-right-itemArr {
  width: 336;
  height: auto;
  padding: 0 0 10px 0;
  margin-top: 15px;
  border-radius: 4px;
  .addpersonalLifeHistory-content-right-item {
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

.addpersonalLifeHistory .m20t20 {
  margin-top: 20px;
  margin-left: 20px;
}
.addpersonalLifeHistory textarea {
  padding: 0 10px;
}
.addpersonalLifeHistory .requiredMustFill1 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 6px;
}
.addpersonalLifeHistory .requiredMustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 2px;
}
.addpersonalLifeHistory .border1px {
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
.addpersonalLifeHistory .boder1pxLi:nth-child(1) {
  margin-top: 10px;
}
.addpersonalLifeHistory .boder1pxLi {
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
.addpersonalLifeHistory .floatF:nth-child(2) {
  width: 282px;
  height: 60px;
}
.addpersonalLifeHistory .floatF {
  float: left;
}
.addpersonalLifeHistory .addpersonalLifeHistory-span {
  display: inline-block;
  line-height: 26px;
}
.addpersonalLifeHistory .input-price {
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
    color: #cccccc;
  }
  > input {
    padding-right: 23px;
  }
}
.addpersonalLifeHistory .input-zhi {
  position: relative;
  display: inline-block;
  vertical-align: top;
  &::after {
    position: absolute;
    content: '支/每天';
    display: inline-block;
    top: 7px;
    right: 10px;
    font-size: 12px;
    color: #cccccc;
  }
  > input {
    padding-right: 48px;
  }
}
.addpersonalLifeHistory .input-ml {
  position: relative;
  display: inline-block;
  vertical-align: top;
  &::after {
    position: absolute;
    content: 'ml/每天';
    display: inline-block;
    top: 7px;
    right: 10px;
    font-size: 12px;
    color: #cccccc;
  }
  > input {
    padding-right: 48px;
  }
}
.addpersonalLifeHistory .mustFill1 {
  color: @tsIcon;
  position: absolute;

  right: 27px;
  fongt-size: 16px;
  top: 9px;
}
.addpersonalLifeHistory .mustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  fongt-size: 16px;
  top: 2px;
}
.addpersonalLifeHistory .disableIput {
  float: left;
  height: 30px;
  line-height: 30px;
  width: 172px;
  color: @gradeAshTwo;
}
.addpersonalLifeHistory .lageIput {
  float: left;
  width: 430px;
  color: @gradeAshTwo;
  height: 50px;
}

.addpersonalLifeHistory .BlageIput {
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
