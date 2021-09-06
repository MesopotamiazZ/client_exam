<template>
  <div class="mymodel" v-if="addModel">
    <Modal v-model="addModel" :transfer='false' :mask-closable="false" :transition-names="['']" :closable="false" :width='434'>
      <div slot="header">
        <titletHasSlot>
          <span slot="titletHasSlotLeftTitle">关联单项</span>
        </titletHasSlot>
      </div>

      <div class="marginT15 marginL20" style="font-size: 16px;">组合项目: <span>{{groupItem.group_item_name}}</span></div>
      <div class="marginT15 marginL20" style="font-size: 16px;">单项</div>

      <!-- 单项勾选框 -->
      <checkBox :rawData="groupItem.group_item.items" class="marginT15 marginL20" @check-value="checkValue"></checkBox>
      
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
import checkBox from './singleRealationCheckbox'
import titletHasSlot from '@/components/titleHasSlot'

export default {
  name: 'newModel',
  props: {
    groupItem: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data () {
    return {
      addModel: false,
      checkArr: [],
      //
      checkItemLists: [],
    }
  },
  components: {
    ZButtonHasBg,
    ZButton,
    checkBox,
    titletHasSlot,
  },
  watch: {
  },
  methods: {
    checkValue(data) {
      this.checkArr = data
    },
    open() {
      this.addModel = true
    },
    closed() {
      this.addModel = false
    },
    affirm() {
      // this.addModel = false
      this.$emit('checkValue', this.checkArr)
    },
    abolish() {
      this.addModel = false
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