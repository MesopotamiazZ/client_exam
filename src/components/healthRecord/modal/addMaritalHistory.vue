<template>
  <div class='addMaritalHistory' v-if="canModel">
    <Modal v-model="canModel" :transfer='false' :mask-closable="false" :transition-names="['']" :closable="false" :width='528' :footerHide="true">
      <div>
        <div slot="header" style="padding:0">
          <titleHasSlot >
            <span slot='titletHasSlotLeftTitle'>新增婚姻史</span></titleHasSlot>
        </div>
        <div class="addMaritalHistory-content">
          <div class="addMaritalHistory-content-item" style="padding:5px 20px 0 20px;" :style="overflow">
            <!-- 第一行 -->
            <Row class="addMaritalHistory-content-item-margT" v-for="(item, index) of transfusionArr" :key="index">
              <div class="fl">
                <div class="addMaritalHistory-text fl textJustify" style="height:30px;width:48px">结婚日期</div>
                <div class="addMaritalHistory-input">
                    <DatePicker v-model="item.wedding_date" format="yyyy-MM-dd" type="date" placeholder="请选择" placement="bottom-start" style="width:160px"></DatePicker>
                </div>
              </div>
              <div class="fl " style="margin-left:20px;">
                <div class="addMaritalHistory-text fl textJustify" style="height:30px;width:108px">配偶接触放射线情况</div>
                <div class="addMaritalHistory-input">
                  <Select filterable style="height:30px;width:94px" v-model="item.spouse_radioactive">
                    <Option :value="1">是</Option>
                    <Option :value="0">否</Option>
                    </Select>
                </div>
              </div>
              <div class="fl" style="margin-top:20px">
                <div class="addMaritalHistory-text fl textJustify" style="height:30px;width:48px">配偶职业</div>
                <div class="addMaritalHistory-input">
                    <Input  style="height:30px;width:160px" v-model="item.spouse_occup"></Input>
                </div>
              </div>
              <div class="fl "  style="margin-left:20px;margin-top:20px;">
                <div class="addMaritalHistory-text fl textJustify" style="height:30px;width:108px">配偶健康状况</div>
                <div class="addMaritalHistory-input">
 
                     <Input  style="height:30px;width:94px" v-model="item.spouse_health"></Input>

                </div>
               <div class="addMaritalHistory-item-ab" @mouseover="iconMouseover" @mouseout="iconMouseout" >                  
                  <div  @mouseover="iconMouseover"  @mouseout="iconMouseout" @click="isaddItem(item,index)" v-if ="index +1 === transfusionArr.length"><icon :name='addNewItemS' ></icon></div>
                  <div  @mouseover="deliconMouseover"  @mouseout="deliconMouseout"  @click="isdelItem(item,index)" v-if ="index +1 !== transfusionArr.length"><icon :name='deletItemT'  ></icon></div>
                </div>
              </div>
            </Row>
          </div>
          <div slot="footer" class="footerClass alertFooterBtn" style="height:70px;padding:20px;background:white;">
            <div style="bakcground:white;">
              <ZButton :ZBtype='"ghost"' class="fr" @click="abolish">取 消</ZButton>
              <ZButtonHasBg class=" marginR20 fr" @click="affirm">保 存</ZButtonHasBg></div>
          </div>
        </div>
      </div>
            <maritalAffmodel ref="maritalAffmodel" :id="id" :transfusionArr="transfusionArr" @refresh= "refresh"></maritalAffmodel>

    </Modal>
  </div>
</template>
<script>
import titleHasSlot from '@/components/titleHasSlot'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import ZButton from '@/components/button/ZButton'
import maritalAffmodel from '../otherModal/maritalAffmodel'
import {copy} from '@/utils/helper'

export default {
  name: 'addMaritalHistory',
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
      overflow: '',
      clect: '',
      addNewItemS: 'addNewItemS',
      deletItemT: 'deletItemT',
      transfusionArr: [{wedding_date: '', spouse_radioactive: '', spouse_occup: null, spouse_health: ''}],
      canModel: false,
    }
  },
  watch: {
    Model(val) {
      this.canModel = val
    },
    'transfusionArr'(val, oldV) {
      if (val.length > 2) {
        this.overflow = 'height:300px;overflow:auto'
      } else {
        this.overflow = ''
      }
    },
  },
  methods: {
//
    setData(val) {
      console.log('进来了')
      if (val.length > 0) {
        this.transfusionArr = copy(val, true) || [{wedding_date: '', spouse_radioactive: '', spouse_occup: null, spouse_health: ''}]
        for (let key of this.transfusionArr) {
          if (key.wedding_date) {
            key.wedding_date = new Date(key.wedding_date * 1000)
          }
        }
      }
    },
    affirm() {
      this.$refs.maritalAffmodel.openM()
    },
    abolish() {
      this.transfusionArr = [{wedding_date: '', spouse_radioactive: '', spouse_occup: null, spouse_health: ''}]
      this.$emit('addAbolish')
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
      this.transfusionArr.push({wedding_date: '', spouse_radioactive: '', spouse_occup: null, spouse_health: ''})
    },
    // 删除数组
    isdelItem(a, index) {
      this.transfusionArr.splice(index, 1)
    },
    refresh() {
      this.$emit('refresh')
      this.canModel = false
    },
  },
  mounted() {
    //
  },
  components: {
    titleHasSlot,
    ZButtonHasBg,
    ZButton,
    maritalAffmodel,
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.addMaritalHistory .fontC{
    width: 69px;
    color:@tagGroupText;
    float:left;height:30px;line-height:30px; margin-right:10px  
}
.addMaritalHistory .ivu-modal-content{
    border-radius: 8px ;
    overflow: hidden;
}
.addMaritalHistory .ivu-modal-body{
border-radius:8px;
// overflow: hidden;
}
.addMaritalHistory .ivu-modal-header{
  padding: 0;
}
.addMaritalHistory .addMaritalHistory-item-ab{
    position: absolute;
    cursor: pointer;
    right:0;
    top:25px;
}
.addMaritalHistory .addMaritalHistory-text{
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
.addMaritalHistory .addMaritalHistory-input{
    margin-left: 10px;
    display: inline-block;
    flex: 1;
  }
.addMaritalHistory .addMaritalHistory-content-item{
   padding: 15px 20px 0 10px;
   .addMaritalHistory-content-item-margT{
     margin-top: 15px;
     position: relative;
   }
  }
.addMaritalHistory .addMaritalHistory-content-right-itemArr-flex{
    cursor: pointer;
    position: absolute;
    width: 14px;
    height:14px;
    background: @menuTreeBorder;
    border-radius:14px;
    line-height: 12px;
    text-align: center;
    top:-7px;
    right:-7px;
    >svg{
      width: 8px;
      height: 8px;
      color:  @tableTr
  }
}

.addMaritalHistory .addMaritalHistory-content-right-Row-flex{
    cursor: pointer;
    position: absolute;
    width: 14px;
    height:14px;
    background: @menuTreeBorder;
    border-radius:14px;
    line-height: 12px;
    text-align: center;
    top:7px;
    right:0px;
    >svg{
      width: 8px;
      height: 8px;
      color:  @tableTr
  }
}
.addMaritalHistory .addMaritalHistory-content-right-Row-flex:hover{
              cursor: pointer;
              background: @tsIconHover;
}
.addMaritalHistory .addMaritalHistory-content-right-itemArr-flex:hover{
              cursor: pointer;
              background: @tsIconHover;
              }
.addMaritalHistory .margin{
  padding: 0;
}
.addMaritalHistory .addMaritalHistory-content{
}
.addMaritalHistory .addMaritalHistory-content-left{
  width:60px;
  font-size: 12px;
  color: #4A4A4A;
  font-weight: 700;
}
.addMaritalHistory .addMaritalHistory-content-right{
  width:60px;
  flex: 1;
  margin-left: 10px;
}
.addMaritalHistory .addMaritalHistory-content-right-itemArr-add{
            display:inline-block;
            padding:0;
            width: 30px;
            height: 30px;
            margin-top: 10px;
            background: #FFFFFF;
            border: 1px dashed  #008CEE;
            position: relative;
            div:nth-child(1){
              position: absolute;
              width: 14px;
              height: 2px;
              top:14px;
              left: 7.5px;
              background: #008CEE;
            }
            div:nth-child(2){
              position: absolute;
              width: 2px;
              height: 14px;
              top:8px;
              left: 13.5px;
              background: #008CEE;
            }
}
.addMaritalHistory .addMaritalHistory-content-right-itemArr{
  width: 520;
  height: auto;
  border:1px solid #CCCCCc;
  padding: 0 5px 10px 5px;
   margin-top: 15px;
   border-radius: 4px;
  .addMaritalHistory-content-right-item{
      padding: 4px 25px;
      width: auto;
      float: left;
      background: #FFFFFF;
      border: 1px solid #CCCCCC;
      height:30px;
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

.addMaritalHistory .m20t20{
    margin-top: 20px;
    margin-left: 20px;
}

.addMaritalHistory .requiredMustFill1{
    color: @tsIcon;
   position: absolute;
   right: 27px;
   font-size:12px;
   top:6px;
}
.addMaritalHistory .requiredMustFill2{
   color: @tsIcon;
   position: absolute;
   right: 27px;
   font-size:12px;
   top:2px;
}
.addMaritalHistory .border1px{
  overflow: auto;
  background:@synthManageABg;
  border: 1px solid @menuTreeBorder;
  border-radius: 8px;
  width: 408px;
  height:246px;
  padding: 0 10px;
  >ul>li{
    border: 1px solid @menuTreeBorder;
    border-radius: 4px;
    width: 364px;
    height:60px;
  }
}
.addMaritalHistory .boder1pxLi:nth-child(1){
  margin-top: 10px;
}
.addMaritalHistory .boder1pxLi{
  margin-top: 15px;
  position: relative;
    >.boder1pxLiAdd{
    position: absolute;
    right: -24px;bottom: 0;
    width: 14px;
    height: 14px;
    border-radius: 14px;
    background: @tagGroupTextLight;
    text-align: center;
    line-height: 12px;
    cursor: pointer;
    >span{
      width: 12px;
      height:12px;
      color: #B0DCFA;
      font-size:16px;
      font-weight: 600;
    }
    }
  >.boder1pxLiCanlse{
    cursor: pointer;
    width: 14px;
    border-radius: 14px;
    height: 14px;
    background: @menuTreeBorder;
    position: absolute;
    right:-7px;
    top:-7px;
    color: @synthManageABg;
    line-height: 11px;
    text-align: center;
    >svg{
     width: 7px;
     height: 7px;
     color: @tableTr;
   }
  }
  >.boder1pxLiCanlse:hover{
    cursor: pointer;
    background: @tsIcon;
  }
  >.floatF{
    float: left;
  }
   >.floatF:nth-child(1){
    width: 80px;
    height: 58px;
    border-right:1px solid @menuTreeBorder;
    line-height: 60px;
    text-align: center;
  }
  table{
width:100%;border-collapse:collapse;
text-align: center;
color: @gradeAshTwo;
>thead{
  line-height: 29px;
  th{
  color: @gradeAshTwo;
  font-weight: 500;
   border-bottom: 1px solid @menuTreeBorder;
  }
  th:nth-child(1){
   width:119px;height:28px;
   border-right: 1px solid @menuTreeBorder;
  }
  th:nth-child(2){
   width:97px;height:28px;
   border-right: 1px solid @menuTreeBorder;
  }
}
>tbody{
   line-height: 29px;
   >tr{
     .tdInput{
       >input{
         width: auto;
         height: 28px;
         text-align: center;
         border: none;
         padding: 0 10px;
       }
       >input:focus {

outline:none;

    border: none;

}
     }
  td:nth-child(1){
   width:119px;height:28px;
   border-right: 1px solid @menuTreeBorder;
  }
  td:nth-child(2){
   width:97px;height:28px;
   border-right: 1px solid @menuTreeBorder;
  }
   }
}
} 
  }
.addMaritalHistory .floatF:nth-child(2){
    width: 282px;
    height: 60px;
  }
.addMaritalHistory .floatF{
    float: left;
  }
.addMaritalHistory .mustFill1{
   color: @tsIcon;
   position: absolute;

   right: 27px;
   fongt-size:16px;
   top:9px;
}
.addMaritalHistory .mustFill2{
   color: @tsIcon;
   position: absolute;
   right: 27px;
   fongt-size:16px;
   top:2px;
}
.addMaritalHistory .disableIput{
    float:left;height:30px;line-height:30px;
    width: 172px;
    color:@gradeAshTwo;
}
.addMaritalHistory .lageIput{
    float:left;
    width: 430px;
    color:@gradeAshTwo;
    height: 50px;
}

.addMaritalHistory .BlageIput{
    float:left;height:30px;line-height:30px;
    width: 430px;
    color:@gradeAshTwo;
    height: 80px;
}
</style>
<style>
.lageIput>div>textarea{
 height: 60px;
}

.checkBox>label>span:nth-child(1){
    width: 16px;
    height: 16px;
    margin-right:5px;
}

.checkBox>label{
        margin-right:25px;
}

</style>
