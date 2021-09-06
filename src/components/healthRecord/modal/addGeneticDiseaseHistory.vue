<template>
  <div class='addGeneticDiseaseHistory'
       v-if="canModel">
    <Modal v-model="canModel"
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false"
           :width='ModelWidth'
           :footerHide="true">
      <div>
        <div slot="header"
             style="padding:0">
          <titleHasSlot >
            <span slot='titletHasSlotLeftTitle'>新增{{name}}</span>
            <div slot='titletHasSlotRightContent'
                 style="margin-right:-6px;height:30px;">
              <div style="height:30px;">
              </div>
            </div>
          </titleHasSlot>
        </div>
        <div class="addGeneticDiseaseHistory">
          <!-- 第一行 -->
          <div v-if="name==='遗传病史'"
               class="addGeneticDiseaseHistory-item">
            <Row style="margin:20px;margin-top:0px">
              <div>
                <CheckboxGroup v-model="social">
                  <Checkbox v-for="(key ,index) of socialArr"
                            :key="index"
                            :label="key"
                            style="margin-top:20px;min-width:75px;">
                    <span>{{key}}</span>
                  </Checkbox>
                  <div v-if="isShowOther"
                       style="margin-top:15px;display:inline-block">
                    <Input style="width:200px;" v-model="remark"></Input>
                  </div>
                </CheckboxGroup>
              </div>
            </Row>
          </div>
          <div v-if="name==='暴露史'"
               class="addGeneticDiseaseHistory-item">
            <Row style="margin:20px;margin-top:0px">
              <div>
                <CheckboxGroup v-model="expose">
                  <Checkbox v-for="(key ,index) of exposeArr"
                            :key="index"
                            :label="key"
                            style="margin-top:20px;min-width:70px;">
                    <span>{{key}}</span>
                  </Checkbox>
                                      <div v-if="isShowOtherexpose"
                       style="margin-top:15px;display:inline-block">
                    <Input style="width:200px;"  v-model="remark"></Input>
                  </div>
                </CheckboxGroup>
              </div>
            </Row>
          </div>
          <div v-if="name==='残疾情况'"
               class="addGeneticDiseaseHistory-item">
            <Row style="margin:20px;margin-top:0px">
              <div>
                <CheckboxGroup v-model="disability">
                  <Checkbox v-for="(key ,index) of disabilityArr"
                            :key="index"
                            :label="key"
                            style="margin-top:20px;min-width:100px;">
                    <span>{{key}}</span>
                  </Checkbox>
                    <div v-if="isShowOtherdisability"
                       style="margin-top:15px;display:inline-block">
                    <Input style="width:110px;"  v-model="remark"></Input>
                  </div>
                </CheckboxGroup>
              </div>
            </Row>
          </div>
          <div v-if="name==='药物过敏史'"
               class="addGeneticDiseaseHistory-item">
            <Row style="margin:20px;margin-top:0px">
              <div>
                <CheckboxGroup v-model="drugAllergy">
                  <Checkbox v-for="(key ,index) of drugAllergyArr"
                            :key="index"
                            :label="key"
                            style="margin-top:20px;min-width:70px;">
                    <span>{{key}}</span>
                  </Checkbox>
                  <div v-if="isShowOtherdrug"
                       style="margin-top:15px;display:inline-block">
                    <Input style="width:200px;"  v-model="remark"></Input>
                  </div>
                </CheckboxGroup>
              </div>
            </Row>
          </div>
          <Row class="m20t20"
               style="margin-top:20px;margin-left:20px">
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
      <genAffmodel ref="affmodel"
                   :id="id"
                   :typeN="typeN"
                   :transmit="transmit"
                   :remark="remark"
                   @affirmDel="affirmDel"
                   @refresh="refresh"></genAffmodel>
    </Modal>
  </div>
</template>
<script>
import titleHasSlot from '@/components/titleHasSlot'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import ZButton from '@/components/button/ZButton'
import genAffmodel from '../otherModal/genAffmodel'
import { copy } from '@/utils/helper'
export default {
  name: 'addGeneticDiseaseHistory',
  props: {
    Model: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    id: {
      type: [String, Number],
    },
  },
  data() {
    return {
      transmitData: null,
      canModel: false,
      clect: '',
      ModelWidth: '420',
      addNewItemS: 'addNewItemS',
      deletItemT: 'deletItemT',
      transfusionArr: [{}],
      //  遗传病史多选框
      social: [],
      socialArr: [
        '无',
        '高血压',
        '糖尿病',
        '血脂异常',
        '乳腺癌',
        '胃癌',
        '大肠癌',
        '肺癌',
        '哮喘',
        '抑郁症',
        '阿尔茨海默病',
        '超重',
        '骨质疏松',
        '勃起功能障碍',
        '其他',
      ],
      remark: '',
      expose: [],
      exposeArr: ['无', '化学物品', '毒物', '射线', '其他'],
      // 残疾情况
      disability: [],
      disabilityArr: [
        '无',
        '视力残疾',
        '听力残疾',
        '言语残疾',
        '肢体残疾',
        '智力残疾',
        '精神残疾',
        '其他',
      ],
      // 药物过敏
      drugAllergy: [],
      drugAllergyArr: ['无', '青霉素', '磺胺', '链霉素', '其他'],
      // 是否显示其他
      isShowOther: false,
      // 是否显示其他
      isShowOtherdrug: false,
      // isShowOtherdisability
      isShowOtherdisability: false,
      // isShowOtherexpose
      isShowOtherexpose: false,
      transmitName: '',
      // 传下层的数据
      typeN: null,
      transmit: [],
    }
  },
  watch: {
    'Model'(val) {
      this.canModel = val
      if (val) {
        this.setData(this.name)
      }
    },
    social(val, oldV) {
      if (val) {
        this.transmit = val
      }
      if (oldV) {
        for (let key in oldV) {
          if (oldV[key] === '无' && oldV.length === 1) {
            if (val.length > 1) {
              this.social.splice(0, 1)
            }
          }
        }
      }
      if (
        val.some(item => {
          return item === '无'
        }) &&
        oldV.every(item => {
          return item !== '无'
        })
      ) {
        this.social = ['无']
      }
      if (val.some(item => {
        return item === '其他'
      })) { this.isShowOther = true } else {
        this.isShowOther = false
      }
    },
    disability(val, oldV) {
      if (val) {
        this.transmit = val
      }
      if (oldV) {
        for (let key in oldV) {
          if (oldV[key] === '无' && oldV.length === 1) {
            if (val.length > 1) {
              this.disability.splice(0, 1)
            }
          }
        }
      }
      if (
        val.some(item => {
          return item === '无'
        }) &&
        oldV.every(item => {
          return item !== '无'
        })
      ) {
        this.disability = ['无']
      }
      if (val.some(item => {
        return item === '其他'
      })) { this.isShowOtherdisability = true } else {
        this.isShowOtherdisability = false
      }
    },
    expose(val, oldV) {
      if (val) {
        this.transmit = val
      }
      if (oldV) {
        for (let key in oldV) {
          if (oldV[key] === '无' && oldV.length === 1) {
            if (val.length > 1) {
              this.expose.splice(0, 1)
            }
          }
        }
      }
      if (
        val.some(item => {
          return item === '无'
        }) &&
        oldV.every(item => {
          return item !== '无'
        })
      ) {
        this.expose = ['无']
      }
      if (val.some(item => {
        return item === '其他'
      })) { this.isShowOtherexpose = true } else {
        this.isShowOtherexpose = false
      }
    },
    drugAllergy(val, oldV) {
      if (val) {
        this.transmit = val
      }
      if (oldV) {
        for (let key in oldV) {
          if (oldV[key] === '无' && oldV.length === 1) {
            if (val.length > 1) {
              this.drugAllergy.splice(0, 1)
            }
          }
        }
      }
      if (
        val.some(item => {
          return item === '无'
        }) &&
        oldV.every(item => {
          return item !== '无'
        })
      ) {
        this.drugAllergy = ['无']
      }
      if (val.some(item => {
        return item === '其他'
      })) { this.isShowOtherdrug = true } else {
        this.isShowOtherdrug = false
      }
    },
/*     name(val) {
      if (val) {
        this.setData(val)
      }
    }, */
  },
  methods: {
    //
    openM(val) {
      this.transmitData = copy(val, true)
    },
    setData(a) {
      this.remark = ''
      if (a === '遗传病史') {
        this.social = []
        this.typeN = 1
        for (let key of this.transmitData) {
          if (key.type === 1) {
            this.$nextTick(() => {
              if (key.value) {
                for (let v of key.value) {
                  this.social.push(v.name)
                  if (v.name === '其他') {
                    this.remark = v.remark || ''
                  }
                }
              }
            })
          }
        }
      }
      if (a === '药物过敏史') {
        console.log(a, '药物过敏史')
        this.drugAllergy = []
        this.typeN = 2
        for (let key of this.transmitData) {
          if (key.type === 2) {
            this.$nextTick(() => {
              if (key.value) {
                for (let v of key.value) {
                  this.drugAllergy.push(v.name)
                  if (v.name === '其他') {
                    this.remark = v.remark || ''
                  }
                }
              }
            })
          }
        }
      }
      if (a === '暴露史') {
        console.log(a, '暴露史')
        this.expose = []
        this.typeN = 3
        for (let key of this.transmitData) {
          if (key.type === 3) {
            this.$nextTick(() => {
              if (key.value) {
                for (let v of key.value) {
                  this.expose.push(v.name)
                  if (v.name === '其他') {
                    this.remark = v.remark || ''
                  }
                }
              }
            })
          }
        }
      }
      if (a === '残疾情况') {
        console.log(a, '残疾情况')

        this.disability = []
        this.typeN = 4
        for (let key of this.transmitData) {
          if (key.type === 4) {
            this.$nextTick(() => {
              if (key.value) {
                for (let v of key.value) {
                  this.disability.push(v.name)
                  if (v.name === '其他') {
                    this.remark = v.remark || ''
                  }
                }
              }
            })
          }
        }
      }
    },
    // 刷新
    refresh() {
      this.$emit('refresh')
    },
    abolish() {
      this.social = []
      this.disability = []
      this.expose = []
      this.drugAllergy = []
      this.$emit('addAbolish')
      this.transfusionArr = [{}]
      this.canModel = false
    },
    TransitionFlexCansle() {
      this.canModel = true
      this.$refs.delmodel.openM()
    },
    affirmDel() {
      this.canModel = false
    },
    delCancel() {
      this.canModel = false
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
      this.transfusionArr.push({})
    },
    // 删除数组
    isdelItem(a, index) {
      this.transfusionArr.splice(index, 1)
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
    genAffmodel,
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.addGeneticDiseaseHistory .fontC {
  width: 69px;
  color: @tagGroupText;
  float: left;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
}
.addGeneticDiseaseHistory .ivu-modal-body{
border-radius:8px;
overflow: hidden;
}
.addGeneticDiseaseHistory .ivu-modal-header {
  padding: 0;
}
.addGeneticDiseaseHistory .addGeneticDiseaseHistory-text {
  line-height: 30px;
  font-size: 12px;
  color: #737373;
  letter-spacing: 0;
}
.addGeneticDiseaseHistory .addGeneticDiseaseHistory-input {
  margin-left: 10px;
  display: inline-block;
  flex: 1;
}
.addGeneticDiseaseHistory .addGeneticDiseaseHistory-item {
  position: relative;
  width: 380px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  background: #fafafa;
  margin: 20px;
}
.addGeneticDiseaseHistory .addGeneticDiseaseHistory-item-ab {
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 5px;
}
.addGeneticDiseaseHistory .addGeneticDiseaseHistory-right-itemArr-flex {
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
.addGeneticDiseaseHistory .addGeneticDiseaseHistory-right-Row-flex {
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
.addGeneticDiseaseHistory .addGeneticDiseaseHistory-right-Row-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addGeneticDiseaseHistory .addGeneticDiseaseHistory-right-itemArr-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addGeneticDiseaseHistory .margin {
  padding: 0;
}
/* .addGeneticDiseaseHistory .addGeneticDiseaseHistory{
height:490px;overflow:auto;
} */
.addGeneticDiseaseHistory .addGeneticDiseaseHistory-left {
  width: 60px;
  font-size: 12px;
  color: #4a4a4a;
}
.addGeneticDiseaseHistory .addGeneticDiseaseHistory-right {
  width: 60px;
  flex: 1;
  margin-left: 10px;
}
.addGeneticDiseaseHistory .addGeneticDiseaseHistory-right-itemArr-add {
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
.addGeneticDiseaseHistory .addGeneticDiseaseHistory-right-itemArr {
  width: 520;
  height: auto;
  border: 1px solid #cccccc;
  padding: 0 5px 10px 5px;
  margin-top: 15px;
  border-radius: 4px;
  .addGeneticDiseaseHistory-right-item {
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

.addGeneticDiseaseHistory .m20t20 {
  margin-top: 20px;
}
.addGeneticDiseaseHistory textarea {
  padding: 0;
}
.addGeneticDiseaseHistory .requiredMustFill1 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 6px;
}
.addGeneticDiseaseHistory .requiredMustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 2px;
}
.addGeneticDiseaseHistory .border1px {
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
.addGeneticDiseaseHistory .boder1pxLi:nth-child(1) {
  margin-top: 10px;
}
.addGeneticDiseaseHistory .boder1pxLi {
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
.addGeneticDiseaseHistory .floatF:nth-child(2) {
  width: 282px;
  height: 60px;
}
.addGeneticDiseaseHistory .floatF {
  float: left;
}
.addGeneticDiseaseHistory .mustFill1 {
  color: @tsIcon;
  position: absolute;

  right: 27px;
  fongt-size: 16px;
  top: 9px;
}
.addGeneticDiseaseHistory .mustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  fongt-size: 16px;
  top: 2px;
}
.addGeneticDiseaseHistory .disableIput {
  float: left;
  height: 30px;
  line-height: 30px;
  width: 172px;
  color: @gradeAshTwo;
}
.addGeneticDiseaseHistory .lageIput {
  float: left;
  width: 430px;
  color: @gradeAshTwo;
  height: 50px;
}

.addGeneticDiseaseHistory .BlageIput {
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
