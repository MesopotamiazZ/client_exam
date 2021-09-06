<template>
  <div class="mymodel"
       v-if="addModel">
    <Modal v-model="addModel"
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false"
           :width='394'>
      <div slot="header">
        <titleHasSlot style="border-bottom: 1px solid #cccccc;">
          <span slot='titletHasSlotLeftTitle'>编辑职业病危害因素</span>
        </titleHasSlot>
      </div>

      <div>
        <!-- <! ifrom 表格 -->
        <i-form ref="formValidate"
                :label-width="80"
                class="ifromClass">
          <Row style="margin-top:15px">
            <div class='verification'
                 style="float:right; ">
              <div class=" fontC textJustify"
                   style=" color:#797979;width:74px">危害因素类别</div>
              <div class="lageIput"
                   style="height:30px;width:270px;">
                <i-select v-model="diagnoseType"
                          @on-change="diagnoseTypeChange">
                  <Option v-for="item in diagnoseTypes"
                          :value="item.id"
                          :key="item.id">{{ item.name}}</Option>
                </i-select>
              </div>
            </div>
          </Row>
          <Row style="margin-top:15px">
            <Input class="search"
                   v-model="changgeValue"
                   icon="ios-search"
                   placeholder="请搜索职业病危害因素名称"
                   style="width:354px;"
                   @on-click="inputValue"
                   @on-blur="inputValue"></Input>
          </Row>
        </i-form>
        <checkBox ref="checkB"
                  style="margin-top:15px;margin-left:20px"
                  :rawData="checkItemLists"
                  @check-value="checkValue"
                  :width="354"></checkBox>
      </div>
      <div slot="footer"
           class="footerClass alertFooterBtn"
           style="height:70px;padding:20px;background:white">
        <div style="bakcground:white;">
          <ZButton :ZBtype='"ghost"'
                   class="fr"
                   @click="abolish">
            取 消
          </ZButton>
          <ZButtonHasBg class=" marginR20 fr"
                        @click="affirm">
            确 认
          </ZButtonHasBg>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import ZButton from '@/components/button/ZButton'
import checkBox from '@/components/checkBox/fcheckboxChoice'
import titleHasSlot from '@/components/titleHasSlot'
import { mapActions } from 'vuex'
// import {copy} from '@/utils/helper'

export default {
  name: 'addOccupationalHistoryOther',
  data() {
    return {
      addModel: false,
      headerText: '新增临床诊断',
      checkArr: [],
      // 诊断类别
      diagnoseTypes: [],
      //
      deseaseTypes: [], // 疾病类型
      diagnoseType: '', // 选中的诊断类别
      deseaseType: '', // 选中的疾病类别
      checkItemLists: [], // 疾病列表
      showDeseaseType: false,
      typeId: null,
      changgeValue: '',
    }
  },
  components: {
    ZButtonHasBg,
    ZButton,
    checkBox,
    titleHasSlot,
  },
  watch: {
    addModel(val) {
      if (val) {
        let that = this
        this.harmGet().then(data => {
          that.diagnoseTypes = data.items
        })
      }
    },
  },
  props: {},
  methods: {
    ...mapActions('healthRecordModule', [
      'harmGet',
      'harmWithGet',
      'harmWithNameGet',
    ]),
    setId(a, b) {
      this.$nextTick(() => {
        this.diagnoseType = a
        this.diagnoseTypeChangeFormart(a)
        this.$refs.checkB.transmitData(b)
      })
    },
    open() {
      this.addModel = true
    },
    closed() {
      this.addModel = false
    },
    affirm() {
      this.addModel = false
      // let choosen = []
      // 通过id找到哪些疾病对象被选择
      /*       for (let id of this.checkArr) {
        for (let obj of this.checkItemLists) {
          if (obj.id === id) {
            choosen.push(obj)
          }
        }
      } */
      this.$emit('checkValue', this.checkArr, this.typeId)
    },
    abolish() {
      this.addModel = false
    },
    checkValue(data) {
      this.checkArr = data
    },
    diagnoseTypeChange(val) {
      this.changgeValue = ''
      this.typeId = val
      let that = this
      this.$refs.checkB.transmitData([])
      this.harmWithGet(val).then(data => {
        if (data) {
          that.checkItemLists = data.items
        }
      })
    },
    diagnoseTypeChangeFormart(val) {
      this.typeId = val
      let that = this
      this.harmWithGet(val).then(data => {
        if (data) {
          that.checkItemLists = data.items
        }
      })
    },
    inputValue() {
      let that = this
      this.harmWithNameGet({
        id: this.diagnoseType,
        name: this.changgeValue,
      }).then(data => {
        if (data) {
          that.checkItemLists = []
          for (let key of data.items) {
            that.checkItemLists.push({ name: key.name, id: key.id })
          }
        }
      })
    },
  },
  mounted() {
   // console.log('1')
  },
}
</script>
<style >

</style>

<style  lang="less" >
@import (reference) '~assets/less/variable.less';
.paddingLeft10PX input {
  padding-left: 10px;
}
.mymodel {
  .fcheckboxChoice {
    .checkBoxes {
      .checkBox:first-child {
        width: 120px;
      }
    }
  }
}
.alertHeader {
  background-color: #f2f5fa;
  // padding: 16px 20px;
  // padding: 6px 0;
  line-height: 28px;
  height: 50px;
  // border-top-left-radius: 8px;
  // border-top-right-radius: 8px;
  color: @gradeAshOne;
  letter-spacing: 0.04px;
  font-weight: 500;
  .alertHeaderText::before {
    content: '';
    width: 3px;
    height: 17px;
    margin-right: 8px;
    display: inline-block;
    vertical-align: middle;
    background-color: #6daaff;
  }
}
.footerClass {
  border-bottom-left-radius: @borderRadiuBig;
  border-bottom-right-radius: @borderRadiuBig;
}
.ifromClass {
  padding: 0 20px;
}

.fontC {
  width: 60;
  color: #797979 100%;
  float: left;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
}
.disableIput {
  float: left;
  height: 30px;
  line-height: 30px;
  width: 172px;
  color: #4a4a4a 100%;
  position: relative;
}
.lageIput {
  float: left;
  width: 430px;
  color: #4a4a4a 100%;
  height: 50px;
}

.BlageIput {
  float: left;
  height: 30px;
  line-height: 30px;
  width: 430px;
  color: #4a4a4a 100%;
  height: 80px;
}
.lageIput > div > textarea {
  height: 50px;
}

.checkBox > label > span:nth-child(1) {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}

.checkBox > label {
  margin-right: 25px;
}
.docWright {
  width: 479px;
  height: 180px;
  background: #f2f2f2 100%;
  margin-top: 20px;
  margin-left: 15px;
  position: relative;
  > .docWrightD {
    width: 479px;
    height: 42px;
    position: absolute;
    bottom: 10px;
    padding-bottom: 20px;
    > .flaotR {
      width: 78px;
      height: 30px;
      color: #ffffff 100%;
      border: 1px solid #cccccc;
      background: #ffffff;
      border-radius: 3px;
      margin-right: 10px;
    }
  }
}
.verification .mustFill1 {
  color: #ff7c7c;
  position: absolute;
  right: 27px;
  font-size: 20px;
  top: 4px;
}
.verification {
  position: relative;
}
.disableIput .mustFill1 {
  color: #ff7c7c;
  position: absolute;
  right: 15px;
  font-size: 20px;
  top: 4px;
}
.verification .requiredMustFill1 {
  color: #ff7c7c;
  position: absolute;
  right: 27px;
  font-size: 12px;
  top: 6px;
}
.disableIput .requiredMustFill1 {
  color: #ff7c7c;
  position: absolute;
  right: 15px;
  font-size: 12px;
  top: 3px;
}
</style>