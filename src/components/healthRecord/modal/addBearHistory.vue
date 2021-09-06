<template>
  <div class='addBearHistory'
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
          <titleHasSlot>
            <span slot='titletHasSlotLeftTitle'>编辑生育史</span>
          </titleHasSlot>
        </div>
        <div class="addMenstruationHistorycontent">
          <!-- 第一行 -->
          <Row style="margin:0 0 15px 0;">
            <div class="fl">
              <div class="addBearHistory-text fl textJustify"
                   style="height:30px;width:48px">现有子女</div>
              <div class="addBearHistory-input fl">
                <Input v-model="birth_hist.child_num"
                       style="width:96px;height:30px;"
                       class="input-year"></Input>
              </div>
            </div>
            <div class="fl "
                 style="margin-left:40px;">
              <div class="addBearHistory-text fl textJustify"
                   style="height:30px;width:48px">流产</div>
              <div class="addBearHistory-input fl">
                <Input v-model="birth_hist.abortion_num"
                       style="width:98px;height:30px;"
                       class="input-day"></Input>
              </div>
            </div>
          </Row>
          <!-- 第二行 -->
          <Row style="margin:15px 0;">
            <div class="fl">
              <div class="addBearHistory-text fl textJustify"
                   style="height:30px;width:48px">早产</div>
              <div class="addBearHistory-input fl">
                <Input v-model="birth_hist.preterm_num"
                       style="width:96px;height:30px;"
                       class="input-day"></Input>
              </div>
            </div>
            <div class="fl "
                 style="margin-left:40px;">
              <div class="addBearHistory-text fl textJustify"
                   style="height:30px;width:48px">死产</div>
              <div class="addBearHistory-input fl">
                <Input v-model="birth_hist.stillbirth_num"
                       style="width:98px;height:30px;"
                       class="input-day"></Input>
              </div>
            </div>
          </Row>
          <!-- 第三行 -->
          <Row style="margin:20px 0;">
            <div class="fl">
              <div class="addBearHistory-text fl textJustify"
                   style="height:30px;width:48px">异常胎</div>
              <div class="addBearHistory-input fl">
                <Input v-model="birth_hist.abn_fetal_num"
                       style="width:96px;height:30px;"
                       class="input-day"></Input>
              </div>
            </div>
            <div class="fl "
                 style="margin-left:40px;">
              <div class="addBearHistory-text fl textJustify"
                   style="height:30px;width:48px">怀 孕</div>
              <div class="addBearHistory-input fl">
                <Input v-model="birth_hist.pregnant_num"
                       style="width:98px;height:30px;"
                       class="input-day"></Input>
              </div>
            </div>
          </Row>
          <!-- 第四行 -->
          <Row style="margin:20px 0;">
            <div class="fl">
              <div class="addBearHistory-text fl textJustify"
                   style="height:30px;width:48px">活产</div>
              <div class="addBearHistory-input fl">
                <Input v-model="birth_hist.live_birth_num"
                       style="width:96px;height:30px;"
                       class="input-day"></Input>
              </div>
            </div>
            <div class="fl "
                 style="margin-left:40px;">
              <div class="addBearHistory-text fl textJustify"
                   style="height:30px;width:48px">自然流产</div>
              <div class="addBearHistory-input fl">
                <Input v-model="birth_hist.natural_abortion_num"
                       style="width:98px;height:30px;"
                       class="input-day"></Input>
              </div>
            </div>
          </Row>
          <!-- 第五行 -->
          <Row style="margin:20px 0;">
            <div class="fl">
              <div class="addBearHistory-text fl textJustify"
                   style="height:30px;width:48px">多胎</div>
              <div class="addBearHistory-input fl">
                <Input v-model="birth_hist.multiple_birth"
                       style="width:96px;height:30px;"
                       class="input-day"></Input>
              </div>
            </div>
            <div class="fl "
                 style="margin-left:40px;">
              <div class="addBearHistory-text fl textJustify"
                   style="height:30px;width:48px">异位妊娠</div>
              <div class="addBearHistory-input fl">
                <Input v-model="birth_hist.eccyesis_num"
                       style="width:98px;height:30px;"
                       class="input-day"></Input>
              </div>
            </div>
          </Row>
          <!-- 第六行 -->
          <Row style="margin:20px 0;">
            <div class="fl">
              <div class="addBearHistory-text fl textJustify"
                   style="height:30px;width:72px">不孕不育原因</div>
              <div class="addBearHistory-input fl">
                <Input v-model="birth_hist.infertility_cause"
                       type="textarea"
                       :rows="2"
                       style="width:268px;height:55px;"
                       class="addBearHistory-input-textAre"></Input>
              </div>
            </div>
          </Row>
          <!-- 第七行 -->
          <Row style="margin:20px 0;">
            <div class="fl">
              <div class="addBearHistory-text fl textJustify"
                   style="height:30px;width:72px">子女健康情况</div>
              <div class="addBearHistory-input fl">
                <Input v-model="birth_hist.child_health_cond"
                       type="textarea"
                       :rows="2"
                       style="width:268px;height:55px;"
                       class="addBearHistory-input-textAre"></Input>
              </div>
            </div>
          </Row>
          <Row style="margin:20px 0 0 0;">
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
import { copy } from '@/utils/helper'
import { mapActions } from 'vuex'

export default {
  name: 'addBearHistory',
  props: {
    Model: {
      type: Boolean,
      default: false,
    },
    birth: {
      type: [Object],
    },
    id: {
      type: [Number, String],
    },
  },
  data() {
    return {
      clect: '',
      birth_hist: {
        child_num: '',
        abortion_num: '',
        preterm_num: '',
        stillbirth_num: '',
        abn_fetal_num: '',
        pregnant_num: '',
        live_birth_num: '',
        multiple_birth: '',
        natural_abortion_num: '',
        eccyesis_num: '',
        infertility_cause: '',
        child_health_cond: '',
      },
    }
  },
  watch: {
    birth(val) {
      if (val) {
        this.birth_hist = copy(val, true)
      }
    },
  },
  methods: {
    ...mapActions('healthRecordModule', ['birthPost']),
    //
    abolish() {
      this.$emit('addAbolish')
    },
    affirm() {
      let data = copy(this.birth_hist, true)
      data.ha_id = this.id
      let that = this
      this.birthPost(data).then(data => {
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
.addBearHistory .fontC {
  width: 69px;
  color: @tagGroupText;
  float: left;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
}
.addBearHistory .ivu-modal-body{
border-radius:8px;
overflow: hidden;
}
.addBearHistory .ivu-modal-header {
  padding: 0;
}
.addBearHistory .addBearHistory-text {
  line-height: 30px;
  font-size: 12px;
  color: #737373;
  letter-spacing: 0;
}
.addBearHistory .addBearHistory-input {
  margin-left: 10px;
  display: inline-block;
}

.addBearHistory .input-year {
  position: relative;
  display: inline-block;
  vertical-align: top;
  &::after {
    position: absolute;
    content: '人';
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
.addBearHistory .input-day {
  position: relative;
  display: inline-block;
  vertical-align: top;
  &::after {
    position: absolute;
    content: '次';
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

.addBearHistory .addMenstruationHistorytext {
  line-height: 30px;
  font-size: 12px;
  color: #737373;
  letter-spacing: 0;
}
.addBearHistory .addMenstruationHistoryinput {
  margin-left: 10px;
  display: inline-block;
  flex: 1;
}
.addBearHistory .addMenstruationHistorycontent-right-itemArr-flex {
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
.addBearHistory .addMenstruationHistorycontent-right-Row-flex {
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
.addBearHistory .addMenstruationHistorycontent-right-Row-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addBearHistory .addMenstruationHistorycontent-right-itemArr-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addBearHistory .margin {
  padding: 0;
}

.addBearHistory .addMenstruationHistorycontent-left {
  width: 60px;
  font-size: 12px;
  color: #4a4a4a;
}
.addBearHistory .addMenstruationHistorycontent-right {
  width: 60px;
  flex: 1;
  margin-left: 10px;
}
.addBearHistory .addMenstruationHistorycontent-right-itemArr-add {
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
.addBearHistory .addMenstruationHistorycontent-right-itemArr {
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

.addBearHistory .m20t20 {
  margin-top: 20px;
  margin-left: 20px;
}

.addBearHistory .requiredMustFill1 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 6px;
}
.addBearHistory .requiredMustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 2px;
}
.addBearHistory .border1px {
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
.addBearHistory .boder1pxLi:nth-child(1) {
  margin-top: 10px;
}
.addBearHistory .boder1pxLi {
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
.addBearHistory .floatF:nth-child(2) {
  width: 282px;
  height: 60px;
}
.addBearHistory .floatF {
  float: left;
}
.addBearHistory .mustFill1 {
  color: @tsIcon;
  position: absolute;

  right: 27px;
  fongt-size: 16px;
  top: 9px;
}
.addBearHistory textarea {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
}
.addBearHistory .mustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  fongt-size: 16px;
  top: 2px;
}
.addBearHistory .disableIput {
  float: left;
  height: 30px;
  line-height: 30px;
  width: 172px;
  color: @gradeAshTwo;
}
.addBearHistory .lageIput {
  float: left;
  width: 430px;
  color: @gradeAshTwo;
  height: 50px;
}

.addBearHistory .BlageIput {
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
