<template>
  <div style="padding: 0 20px" class='vipUpgradeNew' v-if="Model">
        <Modal v-model="Model" :transfer='false' :mask-closable="false" :transition-names="['']"
    :closable="false" :width='638'>
      <div slot="header">
        <alertHeader :headerText="'复查项目'" >
        </alertHeader>
      </div>
      <div style="padding-left:20px">

       <custom-transfer :moveAll="true" title="已选择列表" :targetData="targetDataCom" :canAdd="editCanAdd"  :columns="columss" @getSourcetargetSelectRow="getEditSourceRow" :sourceData="getSourceDataFun" listHeight="'383px'"></custom-transfer>

      </div>
      <div slot="footer" class="footerClass alertFooterBtn" style="height:70px;padding:20px;background:white">
        <div style="bakcground:white;">
          <Checkbox class="chekBox" v-model="chekBoxValue" style="margin-right: 32px;margin-top:7px">
            启用
          </Checkbox>
          <ZButton :ZBtype='"ghost"' class="fr" @click="closeM">
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
import alertHeader from '@/components/alert/alertHeader'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import ZButton from '@/components/button/ZButton'

export default {
  name: 'newbianJ',
  props: {
  },
  data() {
    return {
      Model: false,
    }
  },
  watch: {
  },
  methods: {
    openM() {
      this.Model = true
    },
    closeM() {
      this.Model = false
    },
    affirm() {
      console.log('1')
    },
  },
  mounted() {
    this.industriainput = ''
  },
  components: {
    alertHeader,
    ZButtonHasBg,
    ZButton,
  },
}
</script>
<style lang="less" scoped>
@import "~assets/less/variable.less";
.vipUpgradeNew .fontC{
    width: 69px;
    color:@tagGroupText;
    float:left;height:30px;line-height:30px; margin-right:10px  
}

.vipUpgradeNew .m20t15{
    margin-top: 15px;
    margin-left: 20px;
}
.vipUpgradeNew textarea{
  padding: 0
}
.vipUpgradeNew .requiredMustFill1{
    color: @tsIcon;
   position: absolute;
   right: 27px;
   font-size:12px;
   top:6px;
}
.vipUpgradeNew .requiredMustFill2{
   color: @tsIcon;
   position: absolute;
   right: 27px;
   font-size:12px;
   top:2px;
}
.vipUpgradeNew .border1px{
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
.vipUpgradeNew .boder1pxLi:nth-child(1){
  margin-top: 10px;
}
.vipUpgradeNew .boder1pxLi{
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
.vipUpgradeNew .floatF:nth-child(2){
    width: 282px;
    height: 60px;
  }
.vipUpgradeNew .floatF{
    float: left;
  }
.vipUpgradeNew .mustFill1{
   color: @tsIcon;
   position: absolute;

   right: 27px;
   fongt-size:16px;
   top:9px;
}
.vipUpgradeNew .mustFill2{
   color: @tsIcon;
   position: absolute;
   right: 27px;
   fongt-size:16px;
   top:2px;
}
.vipUpgradeNew .disableIput{
    float:left;height:30px;line-height:30px;
    width: 172px;
    color:@gradeAshTwo;
}
.vipUpgradeNew .lageIput{
    float:left;
    width: 430px;
    color:@gradeAshTwo;
    height: 50px;
}

.vipUpgradeNew .BlageIput{
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
