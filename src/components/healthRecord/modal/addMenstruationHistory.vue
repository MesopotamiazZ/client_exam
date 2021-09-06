<template>
  <div class='addMenstruationHistory'
       v-if="Model">
    <Modal v-model="Model"
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false"
           :width='390'
           :footerHide="true">
      <div>
        <div slot="header"
             style="padding:0">
          <titleHasSlot style="border-bottom: 1px solid #cccccc;">
            <span slot='titletHasSlotLeftTitle'>编辑月经史</span>
          </titleHasSlot>
        </div>
        <div class="addMenstruationHistorycontent">
          <!-- 第一行 -->
          <Row style="margin:0  0 15px 0;">
            <div class="fl">
              <div class="addOccupationalDiseaseHistory-text fl textJustify"
                   style="height:30px;width:24px">初潮</div>
              <div class="addOccupationalDiseaseHistory-input fl">
                <zInput type="number"
                        style="width:117px;height:30px;"
                        class="input-year"
                        v-model="menstrual_hist.menarche_age"></zInput>
              </div>
            </div>
            <div class="fl marginL20">
              <div class="addOccupationalDiseaseHistory-text fl textJustify"
                   style="height:30px;width:50px">经期</div>
              <div class="addOccupationalDiseaseHistory-input fl">
                <zInput type="number"
                        style="width:117px;height:30px;"
                        class="input-day"
                        v-model="menstrual_hist.period"></zInput>
              </div>
            </div>
          </Row>
          <!-- 第二行 -->
          <Row style="margin:15px 0;">
            <div class="fl">
              <div class="addOccupationalDiseaseHistory-text fl textJustify"
                   style="height:30px;width:24px">周期</div>
              <div class="addOccupationalDiseaseHistory-input fl">
                <zInput type="number"
                        style="width:117px;height:30px;"
                        class="input-day"
                        v-model="menstrual_hist.MC"></zInput>
              </div>
            </div>
            <div class="fl marginL20">
              <div class="addOccupationalDiseaseHistory-text fl textJustify"
                   style="height:30px;width:50px">停经年龄</div>
              <div class="addOccupationalDiseaseHistory-input fl">
                <zInput type="number"
                        style="width:117px;height:30px;"
                        class="input-year"
                        v-model="menstrual_hist.menopause_age"></zInput>
              </div>
            </div>
          </Row>
          <Row style="margin:15px 0 0 0;">
            <div>
              <span style="margin-right:20px;color: #737373">最后修改人：哦哦哦哦哦哦</span>
              <span style="color: #737373">最后修改时间：2018年1月19日</span>
            </div>
          </Row>
          <div slot="footer"
               class="footerClass alertFooterBtn"
               style="height:70px;padding:20px 0 20px 20px;background:white;">
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
import zInput from '@/components/zInput'
export default {
  name: 'addMenstruationHistory',
  props: {
    Model: {
      type: Boolean,
      default: false,
    },
    menstrualHist: {
      type: Object,
    },
  },
  data() {
    return {
      clect: '',
      menstrual_hist: {
        ha_id: 10,
        menarche_age: null,
        period: null,
        MC: null,
        menopause_age: null,
      },
    }
  },
  watch: {
    menstrualHist(val) {
      if (val) {
        this.menstrual_hist = val
      }
    },
  },
  methods: {
    ...mapActions('healthRecordModule', ['menstruationPut']),
    abolish() {
      this.$emit('addAbolish')
    },
    affirm() {
      let that = this
      this.menstruationPut(this.menstrual_hist).then(data => {
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
    zInput,
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.addMenstruationHistory .fontC {
  width: 69px;
  color: @tagGroupText;
  float: left;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
}
.addMenstruationHistory .ivu-modal-body{
border-radius:8px;
overflow: hidden;
}
.addMenstruationHistory .ivu-modal-header {
  padding: 0;
}
.addMenstruationHistory .addOccupationalDiseaseHistory-text {
  line-height: 30px;
  font-size: 12px;
  color: #737373;
  letter-spacing: 0;
}
.addMenstruationHistory .addOccupationalDiseaseHistory-input {
  margin-left: 10px;
  display: inline-block;
}

.addMenstruationHistory .input-year {
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
    color: #cccccc;
  }
  > input {
    padding-right: 23px;
  }
}
.addMenstruationHistory .input-day {
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
    color: #cccccc;
  }
  > input {
    padding-right: 23px;
  }
}

.addMenstruationHistory .addMenstruationHistorytext {
  line-height: 30px;
  font-size: 12px;
  color: #737373;
  letter-spacing: 0;
}
wfw .addMenstruationHistory .addMenstruationHistoryinput {
  margin-left: 10px;
  display: inline-block;
  flex: 1;
}
.addMenstruationHistory .addMenstruationHistorycontent-right-itemArr-flex {
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
.addMenstruationHistory .addMenstruationHistorycontent-right-Row-flex {
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
.addMenstruationHistory .addMenstruationHistorycontent-right-Row-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addMenstruationHistory
  .addMenstruationHistorycontent-right-itemArr-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addMenstruationHistory .margin {
  padding: 0;
}

.addMenstruationHistory .addMenstruationHistorycontent-left {
  width: 60px;
  font-size: 12px;
  color: #4a4a4a;
}
.addMenstruationHistory .addMenstruationHistorycontent-right {
  width: 60px;
  flex: 1;
  margin-left: 10px;
}
.addMenstruationHistory .addMenstruationHistorycontent-right-itemArr-add {
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
.addMenstruationHistory .addMenstruationHistorycontent-right-itemArr {
  width: 520;
  height: auto;
  border: 1px solid #cccccc;
  padding: 0 5px 10px 5px;
  margin-top: 15px;
  border-radius: 4px;
  .addMenstruationHistorycontent-right-item {
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

.addMenstruationHistory .m20t20 {
  margin-top: 20px;
  margin-left: 20px;
}

.addMenstruationHistory .requiredMustFill1 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 6px;
}
.addMenstruationHistory .requiredMustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 2px;
}
.addMenstruationHistory .border1px {
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
.addMenstruationHistory .boder1pxLi:nth-child(1) {
  margin-top: 10px;
}
.addMenstruationHistory .boder1pxLi {
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
.addMenstruationHistory .floatF:nth-child(2) {
  width: 282px;
  height: 60px;
}
.addMenstruationHistory .floatF {
  float: left;
}
.addMenstruationHistory .mustFill1 {
  color: @tsIcon;
  position: absolute;

  right: 27px;
  fongt-size: 16px;
  top: 9px;
}
.addMenstruationHistory .mustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  fongt-size: 16px;
  top: 2px;
}
.addMenstruationHistory .disableIput {
  float: left;
  height: 30px;
  line-height: 30px;
  width: 172px;
  color: @gradeAshTwo;
}
.addMenstruationHistory .lageIput {
  float: left;
  width: 430px;
  color: @gradeAshTwo;
  height: 50px;
}

.addMenstruationHistory .BlageIput {
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
