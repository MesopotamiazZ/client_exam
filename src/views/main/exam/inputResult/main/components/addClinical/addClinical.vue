<template>
  <div class="mymodel" v-if="addModel">
    <Modal v-model="addModel" :transfer='false' :mask-closable="false" :transition-names="['']" :closable="false" :width='434'>
      <div slot="header">
        <alertHeader :headerText="'新增临床诊断'" >
        </alertHeader>
      </div>

      <div><!-- <! ifrom 表格 -->
        <i-form ref="formValidate" :label-width="80" class="ifromClass">
          <Row style="margin-top:15px">
            <div class='verification' style="float:right; ">
              <div class=" fontC textJustify" style=" color:#797979;width:48px；">诊断类别</div>
              <div class="lageIput" style="height:30px;width:336px;">
                <i-select v-model="diagnoseType" @on-change="diagnoseTypeChange">
                  <Option v-for="item in diagnoseTypes" :value="item.id" :key="item.id">{{ item.name}}</Option>
                </i-select>
            </div>
             </div>
          </Row>

          <Row style="margin-top:15px" v-if="showDeseaseType">
            <div class='verification ' style="float:right;">
              <div class=" fontC textJustify" style=" color:#797979;width:48px;">疾病类型</div>
              <div class="lageIput paddingLeft10PX" style="height:30px;width:336px;">
                <i-select v-model="deseaseType" @on-change="deseaseTypeChange" :filterable="true">
                    <Option v-for="item in deseaseTypes" :value="item.id" :key="item.id">{{ item.name}}</Option>
                </i-select>
                 </div>
            </div>
          </Row>
       <Row style="margin-top:15px">
            <Input class="search"  icon="ios-search" placeholder="请输入疾病名称" style="width:336px;margin-left:58px "></Input>
       </Row>
      </i-form>
      <checkBox style="margin-top:15px;margin-left:20px" 
                :rawData = "checkItemLists" 
                :choosenDiagnose = "choosenDiagnose"
                @check-value="checkValue"></checkBox>
     </div>
      <div slot="footer" class="footerClass alertFooterBtn" style="height:70px;padding:20px;background:white">
        <div style="bakcground:white;">
          <ZButton :ZBtype='"ghost"' class="fr" @click="abolish">
            取 消
          </ZButton>
          <ZButtonHasBg class=" marginR20 fr" @click="affirm">
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
import checkBox from '@/components/checkBox/examResultCheckbox'
import alertHeader from '@/components/alert/alertHeader'
import { mapActions } from 'vuex'

export default {
  name: 'newModel',
  props: {
    choosenDiagnose: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data () {
    return {
      addModel: false,
      headerText: '新增临床诊断',
      checkArr: [],
      // 诊断类别
      diagnoseTypes: [
        {
          id: 'disease-types',
          name: '疾病(或异常)',
        },
        {
          id: 'occup-disease-types',
          name: '职业病',
        },
        {
          id: 'occup-taboos',
          name: '职业禁忌症',
        },
      ],
      //
      deseaseTypes: [], // 疾病类型
      diagnoseType: '', // 选中的诊断类别
      deseaseType: '', // 选中的疾病类别
      checkItemLists: [], // 疾病列表
      showDeseaseType: false,
    }
  },
  components: {
    ZButtonHasBg,
    ZButton,
    checkBox,
    alertHeader,
  },
  watch: {
  },
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
      console.log(this.checkArr)
      let choosen = []
      // 通过id找到哪些疾病对象被选择
      for (let checkObj of this.checkArr) {
        for (let obj of this.checkItemLists) {
          if (obj.id === checkObj.id) {
            choosen.push(obj)
          }
        }
      }
      this.$emit('checkValue', choosen)
    },
    abolish() {
      this.addModel = false
    },
    checkValue(data) {
      this.checkArr = data
    },
    async diagnoseTypeChange() {
      this.deseaseTypes = []
      this.deseaseType = ''
      this.checkItemLists = []
      if (this.diagnoseType === 'disease-types') {
        this.showDeseaseType = true
        let deseases = await this.getDiagnoseTypes(this.diagnoseType)
        this.deseaseTypes = deseases.items
      }
      if (this.diagnoseType === 'occup-disease-types') {
        let deseases = await this.getDiagnoseTypes(this.diagnoseType)
        this.deseaseTypes = deseases.items
        this.showDeseaseType = true
      }
      if (this.diagnoseType === 'occup-taboos') {
        this.showDeseaseType = false
        let result
        result = await this.getDeseases(this.deseaseType)
        this.checkItemLists = result.items
      }
    },
    async deseaseTypeChange() {
      if (this.diagnoseType === 'disease-types' && this.deseaseType !== undefined && this.deseaseType) {
        console.log(1)
        let result
        result = await this.getDeseases(this.deseaseType)
        this.checkItemLists = result.items
      }
      if (this.diagnoseType === 'occup-disease-types' && this.deseaseType !== undefined && this.deseaseType) {
        console.log(2)
        let result
        result = await this.getOccupDisease(this.deseaseType)
        this.checkItemLists = result.items
      }
    },
  },
  mounted() {
    console.log('1')
  },
}

</script>
<style >
  
</style>

<style  lang="less" >
@import (reference) '~assets/less/variable.less';
.paddingLeft10PX input{
  padding-left:10px;
}
.alertHeader {
  background-color: #F2F5FA;
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
    background-color: #6DAAFF;
  }
}
.footerClass{
    border-bottom-left-radius: @borderRadiuBig;
  border-bottom-right-radius: @borderRadiuBig;
}
.ifromClass{
  padding: 0 20px;
}

.fontC{
    width: 60;
    color:#797979 100%;
    float:left;height:30px;line-height:30px; margin-right:10px  
}
.disableIput{
    float:left;height:30px;line-height:30px;
    width: 172px;
    color:#4A4A4A 100%;
    position: relative;
}
.lageIput{
    float:left;
    width: 430px;
    color:#4A4A4A 100%;
    height: 50px;
}

.BlageIput{
    float:left;height:30px;line-height:30px;
    width: 430px;
    color:#4A4A4A 100%;
    height: 80px;
}
.lageIput>div>textarea{
 height: 50px;
}

.checkBox>label>span:nth-child(1){
    width: 16px;
    height: 16px;
    margin-right:5px;
}

.checkBox>label{
        margin-right:25px;
}
.docWright{
  width:479px;
  height:180px;
  background: #F2F2F2 100%;
  margin-top: 20px;
  margin-left:15px;
  position: relative;
  >.docWrightD{
    width:479px;
    height: 42px;
    position: absolute;
    bottom:10px;
    padding-bottom: 20px;
    >.flaotR{
      width: 78px;
      height: 30px;
      color: #FFFFFF 100%;
      border: 1px solid #cccccc;
      background: #ffffff;
      border-radius: 3px;
      margin-right: 10px;
    }
  }
}
.verification .mustFill1{
   color: #FF7C7C;
   position: absolute;
   right: 27px;
   font-size:20px;
   top:4px;
}
.verification{
  position: relative;
}
.disableIput .mustFill1{
   color: #FF7C7C;
   position: absolute;
   right: 15px;
   font-size:20px;
   top:4px;
}
.verification .requiredMustFill1{
    color: #FF7C7C;
   position: absolute;
   right: 27px;
   font-size:12px;
   top:6px;
}
.disableIput .requiredMustFill1{
   color: #FF7C7C;
   position: absolute;
   right: 15px;
   font-size:12px;
   top:3px;
}
</style>