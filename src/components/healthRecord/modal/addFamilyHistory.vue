<template>
  <div class='addFamilyHistory'  
       v-if="canModel">
    <Modal v-model="canModel"
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false"
           :width='446'
           :footerHide="true"
           >
      <div>
        <div slot="header"
             style="padding:0">
          <titleHasSlot>
            <span slot='titletHasSlotLeftTitle'>新增家族史</span>
          </titleHasSlot>
        </div>
        <div class="table-header clearBoth" style="padding:0 20px;">
          <ul class="table-choose fl clearBoth">
            <li v-for='(data,index) in datas'
                class="curPointer"
                :key="index"
                @click="addClassFun(data.name,index)"
                :class='{clickChange:data.name===chooseIndex}'>{{data.data}}</li>
          </ul>
        </div>
        <div class="addFamilyHistory-content">
          <div class="addFamilyHistory-content-item">
            <!-- 第一行 -->
            <div v-if="chooseIndex ==='father'">
              <div>
                <div class="fl addFamilyHistory-content-item-left">家族病</div>
                <div class="fl addFamilyHistory-content-item-right">
                  <CheckboxGroup v-model="fatherArr">
                    <Checkbox v-for="(key ,index) of disabilityFamilyArr"
                              :key="index"
                              :label="key"
                              style="margin-top:20px;min-width:150px;">
                      <span>{{key}}</span>
                      <div v-if="isShowdisabilityFamilfather && key === '恶性肿瘤'"
                           style="display:inline-block">
                        <Input style="width:200px;" v-model="mark.remark1"></Input>
                      </div>
                      <div v-if="isShowdOtherFamilyfather && key === '其他'"
                           style="display:inline-block;margin-left:24px;">
                        <Input style="width:200px;" v-model="mark.remark2"></Input>
                      </div>
                    </Checkbox>
                  </CheckboxGroup>

                </div>
                <div style="clear: both;"></div>
              </div>
            </div>
            <!-- 第一行 -->
            <div v-if="chooseIndex ==='mother'">
              <div>
                <div class="fl addFamilyHistory-content-item-left">家族病</div>
                <div class="fl addFamilyHistory-content-item-right">
                  <CheckboxGroup v-model="motherArr">
                    <Checkbox v-for="(key ,index) of disabilityFamilyArr"
                              :key="index"
                              :label="key"
                              style="margin-top:20px;min-width:150px;">
                      <span>{{key}}</span>
                      <div v-if="isShowdisabilityFamilmother && key === '恶性肿瘤'"
                           style="display:inline-block">
                        <Input style="width:200px;" v-model="mark.remark3"></Input>
                      </div>
                      <div v-if="isShowdOtherFamilymother && key === '其他'"
                           style="display:inline-block;margin-left:24px;">
                        <Input style="width:200px;" v-model="mark.remark4"></Input>
                      </div>
                    </Checkbox>
                  </CheckboxGroup>

                </div>
                <div style="clear: both;"></div>
              </div>
            </div>
            <!-- 第一行 -->
            <div v-if="chooseIndex ==='sister'">
              <div>
                <div class="fl addFamilyHistory-content-item-left">家族病</div>
                <div class="fl addFamilyHistory-content-item-right">
                  <CheckboxGroup v-model="bortherArr">
                    <Checkbox v-for="(key ,index) of disabilityFamilyArr"
                              :key="index"
                              :label="key"
                              style="margin-top:20px;min-width:150px;">
                      <span>{{key}}</span>
                      <div v-if="isShowdisabilityFamilyborther && key === '恶性肿瘤'"
                           style="display:inline-block">
                        <Input style="width:200px;" v-model="mark.remark5"></Input>
                      </div>
                      <div v-if="isShowdOtherFamilyborther && key === '其他'"
                           style="display:inline-block;margin-left:24px;">
                        <Input style="width:200px;" v-model="mark.remark6"></Input>
                      </div>
                    </Checkbox>
                  </CheckboxGroup>

                </div>
                <div style="clear: both;"></div>
              </div>
            </div>
            <!-- 第一行 -->
            <div v-if="chooseIndex ==='son'">
              <div>
                <div class="fl addFamilyHistory-content-item-left">家族病</div>
                <div class="fl addFamilyHistory-content-item-right">
                  <CheckboxGroup v-model="sonArr">
                    <Checkbox v-for="(key ,index) of disabilityFamilyArr"
                              :key="index"
                              :label="key"
                              style="margin-top:20px;min-width:150px;">
                      <span>{{key}}</span>
                      <div v-if="isShowdisabilityFamilyson && key === '恶性肿瘤'"
                           style="display:inline-block">
                        <Input style="width:200px;" v-model="mark.remark7"></Input>
                      </div>
                      <div v-if="isShowdOtherFamilyson && key === '其他'"
                           style="display:inline-block;margin-left:24px;">
                        <Input style="width:200px;" v-model="mark.remark8"></Input>
                      </div>
                    </Checkbox>
                  </CheckboxGroup>
                </div>
                <div style="clear: both;"></div>
              </div>
            </div>
          </div>
          <Row class="m20t20"
               style="margin-top:20px">
            <div>
              <span style="margin-right:20px;color: #737373">最后修改人：哦哦哦哦哦哦</span>
              <span style="color: #737373">最后修改时间：2018年1月19日</span>
            </div>
          </Row>
          <div slot="footer"
               class="footerClass alertFooterBtn"
               style="height:70px;padding:20px 20px 0 20px;background:white;margin-right:-20px;">
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
      <familyAffmodel ref="familyAffmodel"
                      :transmit="transmit"
                      :remark="mark"
                      :id="id"
                      @refresh="refresh"></familyAffmodel>
    </Modal>
  </div>
</template>
<script>
import titleHasSlot from '@/components/titleHasSlot'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import ZButton from '@/components/button/ZButton'
import familyAffmodel from '../otherModal/familyAffmodel'

export default {
  name: 'addFamilyHistory',
  props: {
    Model: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
    },
  },
  data() {
    return {
      canModel: false,
      clect: '',
      chooseIndex: 'order',
      datas: {
        data2: {
          data: '父亲',
          name: 'father',
        },
        data3: {
          data: '母亲',
          name: 'mother',
        },
        data4: {
          data: '兄弟姐妹',
          name: 'sister',
        },
        data5: {
          data: '子女',
          name: 'son',
        },
      },
      // 父亲
      // 显示恶性肿瘤
      isShowdisabilityFamilfather: false,
      // 显示其他
      isShowdOtherFamilyfather: false,
      // 妈妈
      // 显示恶性肿瘤
      isShowdisabilityFamilmother: false,
      // 显示其他
      isShowdOtherFamilymother: false,
      // 兄弟
      // 显示恶性肿瘤
      isShowdisabilityFamilborther: false,
      // 显示其他
      isShowdOtherFamilyborther: false,
      // 子女
      // 显示恶性肿瘤
      isShowdisabilityFamilson: false,
      // 显示其他
      isShowdOtherFamilyson: false,
      disabilityFamily: [],
      disabilityFamilyArr: [
        '无',
        '脑中卒',
        '高血压',
        '严重精神障碍',
        '糖尿病',
        '结核病',
        '冠心病',
        '肝炎',
        '慢性阻塞型肺疾病',
        '先天畸形',
        '恶性肿瘤',
        '其他',
      ],
      fatherArr: [],
      motherArr: [],
      bortherArr: [],
      sonArr: [],
      // 传递的数据
      transmit: [
        { ha_id: 10, relation: 1, value: [] },
        { ha_id: 10, relation: 2, value: [] },
        { ha_id: 10, relation: 3, value: [] },
        { ha_id: 10, relation: 4, value: [] },
      ],
      mark: {
        remark1: '',
        remark2: '',
        remark3: '',
        remark4: '',
        remark5: '',
        remark6: '',
        remark7: '',
        remark8: '',
      },
    }
  },
  watch: {
    Model(val) {
      this.canModel = val
    },
    fatherArr(val, oldV) {
      if (val) {
        this.$nextTick(() => {
          this.transmit[0].value = val
        })
      }

      if (oldV) {
        for (let key in oldV) {
          if (oldV[key] === '无' && oldV.length === 1) {
            if (val.length > 1) {
              this.fatherArr.splice(0, 1)
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
        this.fatherArr = ['无']
      }
      this.$nextTick(() => {
        if (
          val.some(item => {
            return item === '恶性肿瘤'
          })
        ) {
          this.isShowdisabilityFamilfather = true
        } else {
          this.isShowdisabilityFamilfather = false
        }
        if (
          val.some(item => {
            return item === '其他'
          })
        ) {
          this.isShowdOtherFamilyfather = true
        } else {
          this.isShowdOtherFamilyfather = false
        }
      })
    },
    motherArr(val, oldV) {
      if (val) {
        this.$nextTick(() => {
          this.transmit[1].value = val
        })
      }
      if (oldV) {
        for (let key in oldV) {
          if (oldV[key] === '无' && oldV.length === 1) {
            if (val.length > 1) {
              this.motherArr.splice(0, 1)
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
        this.motherArr = ['无']
      }
      // 控制显示
      if (
          val.some(item => {
            return item === '恶性肿瘤'
          })
        ) {
        this.isShowdisabilityFamilmother = true
      } else {
        this.isShowdisabilityFamilmother = false
      }
      if (
          val.some(item => {
            return item === '其他'
          })
        ) {
        this.isShowdOtherFamilymother = true
      } else {
        this.isShowdOtherFamilymother = false
      }
    },
    bortherArr(val, oldV) {
      if (val) {
        this.$nextTick(() => {
          this.transmit[2].value = val
        })
      }
      if (oldV) {
        for (let key in oldV) {
          if (oldV[key] === '无' && oldV.length === 1) {
            if (val.length > 1) {
              this.bortherArr.splice(0, 1)
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
        this.bortherArr = ['无']
      }
      if (
          val.some(item => {
            return item === '恶性肿瘤'
          })
        ) {
        this.isShowdisabilityFamilyborther = true
      } else {
        this.isShowdisabilityFamilyborther = false
      }
      if (
          val.some(item => {
            return item === '其他'
          })
        ) {
        this.isShowdOtherFamilyborther = true
      } else {
        this.isShowdOtherFamilyborther = false
      }
    },
    sonArr(val, oldV) {
      if (val) {
        this.$nextTick(() => {
          this.transmit[3].value = val
        })
      }
      if (oldV) {
        for (let key in oldV) {
          if (oldV[key] === '无' && oldV.length === 1) {
            if (val.length > 1) {
              this.sonArr.splice(0, 1)
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
        this.sonArr = ['无']
      }
      if (
          val.some(item => {
            return item === '恶性肿瘤'
          })
        ) {
        this.isShowdisabilityFamilyson = true
      } else {
        this.isShowdisabilityFamilyson = false
      }
      if (
          val.some(item => {
            return item === '其他'
          })
        ) {
        this.isShowdOtherFamilyson = true
      } else {
        this.isShowdOtherFamilyson = false
      }
    },
  },
  methods: {
    //
    abolish() {
      this.canModel = false
      this.$emit('addAbolish')
    },
    addClassFun(a) {
      this.chooseIndex = a
    },
    affirm() {
      //
      this.$refs.familyAffmodel.openM()
    },
    changgeValue(data) {
      this.remark1 = ''
      this.remark2 = ''
      if (data) {
        let a = []
        for (let key of data) {
          a.push(key.name)
        }
        return a
      } else {
        return []
      }
    },
    openM(val) {
      for (let key of val) {
        if (key.relation === 1) {
          this.fatherArr = this.changgeValue(key.value)
          for (let v of key.value) {
            if (v.name === '恶性肿瘤') {
              this.mark.remark1 = v.remark
            }
            if (v.name === '其他') {
              this.mark.remark2 = v.remark
            }
          }
        }
        if (key.relation === 2) {
          this.motherArr = this.changgeValue(key.value)
          for (let v of key.value) {
            if (v.name === '恶性肿瘤') {
              this.mark.remark3 = v.remark
            }
            if (v.name === '其他') {
              this.mark.remark4 = v.remark
            }
          }
        }
        if (key.relation === 3) {
          this.bortherArr = this.changgeValue(key.value)
          for (let v of key.value) {
            if (v.name === '恶性肿瘤') {
              this.mark.remark5 = v.remark
            }
            if (v.name === '其他') {
              this.mark.remark6 = v.remark
            }
          }
        }
        if (key.relation === 4) {
          this.sonArr = this.changgeValue(key.value)
          for (let v of key.value) {
            if (v.name === '恶性肿瘤') {
              this.mark.remark7 = v.remark
            }
            if (v.name === '其他') {
              this.mark.remark8 = v.remark
            }
          }
        }
      }
    },
    refresh() {
      this.$emit('refresh')
      this.canModel = false
    },
  },
  mounted() {
    this.addClassFun('father')
    //
  },
  components: {
    titleHasSlot,
    ZButtonHasBg,
    ZButton,
    familyAffmodel,
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.addFamilyHistory .fontC {
  width: 69px;
  color: @tagGroupText;
  float: left;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
}
.addFamilyHistory .ivu-modal-body{
border-radius:8px;
overflow: hidden;
}
.addFamilyHistory .ivu-modal-header {
  padding: 0;
}
.addFamilyHistory .addFamilyHistory-content-item-left {
  width: 36px;
}
.addFamilyHistory .addFamilyHistory-content-item-right {
  width: 360px;
  background: #fafafa;
  border: 1px solid #cccccc;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 20px;
  padding-bottom: 20px;
}
.marginL20 {
  margin-left: 20px;
}
.addFamilyHistory .table-header {
  height: 50px;
  .table-choose {
    width: 100%;
    line-height: 47px;
    font-size: 14px;
    border-bottom: 1px solid @gradeAshFive;
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
.addFamilyHistory .addFamilyHistory-text {
  line-height: 30px;
  font-size: 12px;
  color: #737373;
  letter-spacing: 0;
}
.addFamilyHistory .addFamilyHistory-input {
  margin-left: 10px;
  display: inline-block;
  flex: 1;
}
.addFamilyHistory .addFamilyHistory-content-item {
  .addFamilyHistory-content-item-margT {
    margin-top: 15px;
    position: relative;
  }
}
.addFamilyHistory .addFamilyHistory-content-right-itemArr-flex {
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

.addFamilyHistory .addFamilyHistory-content-right-Row-flex {
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
.addFamilyHistory .addFamilyHistory-content-right-Row-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addFamilyHistory .addFamilyHistory-content-right-itemArr-flex:hover {
  cursor: pointer;
  background: @tsIconHover;
}
.addFamilyHistory .margin {
  padding: 0;
}
.addFamilyHistory .addFamilyHistory-content {
  margin: 20px 20px 0 20px;
}
.addFamilyHistory .addFamilyHistory-content-left {
  width: 60px;
  font-size: 12px;
  color: #4a4a4a;
  font-weight: 700;
}
.addFamilyHistory .addFamilyHistory-content-right {
  width: 60px;
  flex: 1;
  margin-left: 10px;
}
.addFamilyHistory .addFamilyHistory-content-right-itemArr-add {
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
.addFamilyHistory .addFamilyHistory-content-right-itemArr {
  width: 520;
  height: auto;
  border: 1px solid #cccccc;
  padding: 0 5px 10px 5px;
  margin-top: 15px;
  border-radius: 4px;
  .addFamilyHistory-content-right-item {
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

.addFamilyHistory .input-price {
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
.addFamilyHistory .input-year {
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
.addFamilyHistory .m20t20 {
  margin-top: 20px;
}
.addFamilyHistory textarea {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
}
.addFamilyHistory .requiredMustFill1 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 6px;
}
.addFamilyHistory .requiredMustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 2px;
}
.addFamilyHistory .border1px {
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
.addFamilyHistory .boder1pxLi:nth-child(1) {
  margin-top: 10px;
}
.addFamilyHistory .boder1pxLi {
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
.addFamilyHistory .floatF:nth-child(2) {
  width: 282px;
  height: 60px;
}
.addFamilyHistory .floatF {
  float: left;
}
.addFamilyHistory .mustFill1 {
  color: @tsIcon;
  position: absolute;

  right: 27px;
  fongt-size: 16px;
  top: 9px;
}
.addFamilyHistory .mustFill2 {
  color: @tsIcon;
  position: absolute;
  right: 27px;
  fongt-size: 16px;
  top: 2px;
}
.addFamilyHistory .disableIput {
  float: left;
  height: 30px;
  line-height: 30px;
  width: 172px;
  color: @gradeAshTwo;
}
.addFamilyHistory .lageIput {
  float: left;
  width: 430px;
  color: @gradeAshTwo;
  height: 50px;
}

.addFamilyHistory .BlageIput {
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
