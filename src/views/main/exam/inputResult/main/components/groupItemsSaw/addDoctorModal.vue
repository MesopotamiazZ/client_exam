<template>
  <div class="mymodel"
       v-if="addModel">
    <Modal v-model="addModel"
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false"
           :width='434'>
      <div slot="header">
        <alertHeader :headerText="'新增临床诊断'">
        </alertHeader>
      </div>

      <div>
        <checkBox style="margin-top:15px;margin-left:20px"
                  :addedDoctor="addedDoctor"
                  :rawData="datalist"
                  @check-value="checkValue"></checkBox>
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
            保 存
          </ZButtonHasBg>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import ZButton from '@/components/button/ZButton'
import checkBox from './doctorCheckbox'
import alertHeader from '@/components/alert/alertHeader'
import { mapActions } from 'vuex'

export default {
  name: 'newModel',
  props: {
    datalist: {
      type: Array,
      default() {
        return []
      },
    },
    // 已添加的阅片医生
    addedDoctor: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      addModel: false,
      headerText: '添加阅片人',
      checkArr: [],
      showDeseaseType: false,
    }
  },
  components: {
    ZButtonHasBg,
    ZButton,
    checkBox,
    alertHeader,
  },
  watch: {},
  methods: {
    ...mapActions('inputResultModule', [
      'getDiagnoseTypes',
      'getDeseases',
      'getOccupDisease',
    ]),
    open() {
      this.addModel = true
    },
    closed() {
      this.addModel = false
    },
    affirm() {
      this.addModel = false
      this.$emit('checkValue', this.checkArr)
    },
    abolish() {
      this.addModel = false
    },
    checkValue(data) {
      this.checkArr = data
    },
  },
  // mounted() {
  //   console.log('1')
  // },
}
</script>
<style >

</style>

<style  lang="less" >
@import (reference) '~assets/less/variable.less';
.paddingLeft10PX input {
  padding-left: 10px;
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