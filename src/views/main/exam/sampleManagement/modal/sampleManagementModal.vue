<template>
  <div class='sampleManagementModal' v-if="Model" >
    <Modal v-model="Model" :transfer='false' :mask-closable="false" :transition-names="['']" :closable="false" :width='488' :footerHide="true">
      <div>
        <div slot="header" style="padding:0;">
          <titleHasSlot style="background: #F2F5FA;border-radius:8px 8px 0 0;">
            <span slot='titletHasSlotLeftTitle'>提示</span></titleHasSlot>
        </div>
        <div class="addMenstruationHistorycontent">
            <div class="addMenstruationHistorycontent-div" style="border:1px solid #D9D9D9;">
               <table> 
                       <tr>
                         <th width="50" style="border-right:1px solid  #D9D9D9;">序号</th>
                         <th  width="400" >备选弃检原因</th>
                       </tr>
                        <tr class="addMenstruationHistorycontent-tr" v-for="(item,index) of dataArr" :key="index" :class="index%2===0 ?'':'backgroundF2F7FF'">
                           <td width="50" style="border-right:1px solid  #D9D9D9;">{{index + 1}}</td>
                           <td width="400" class="addMenstruationHistorycontent-tr-hover" @click="contentClick(item)">{{item}}</td>
                        </tr>
               </table>
               <Input v-model="InputValue" type="textarea" class="InputValue" :rows="4"></Input>
           </div>

      </div>
           <div slot="footer" class="footerClass alertFooterBtn" style="height:70px;padding:20px;background:white;border-radius:0px 0px 8px 8px;">
            <div style="bakcground:white;">
              <ZButton :ZBtype='"ghost"' class="fr" @click="abolish">取 消</ZButton>
              <ZButtonHasBg class=" marginR20 fr" @click="abolish">取消弃检</ZButtonHasBg>
              <ZButtonHasBg class=" marginR20 fr" @click="abolish">确认弃检</ZButtonHasBg></div>
          </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import titleHasSlot from '@/components/titleHasSlot'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import ZButton from '@/components/button/ZButton'

export default {
  name: 'sampleManagementModal',
  props: {
    Model: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      clect: '',
      dataArr: ['受检者自愿放弃检查', '备孕期间，不适合做此项目检查', '受检者自愿放弃检查'],
      InputValue: '',
    }
  },
  watch: {
  },
  methods: {
//
    abolish() {
      this.$emit('addAbolish')
    },
    contentClick(a) {
      console.log(a)
      this.InputValue += a + ' '
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

.sampleManagementModal .fontC{
    width: 69px;
    color:@tagGroupText;
    float:left;height:30px;line-height:30px; margin-right:10px  
}

.sampleManagementModal .ivu-input{
  border-radius: 0 0 8px  8px;
  border:none;
  overflow: auto;

}



.sampleManagementModal .m20t20{
    margin-top: 20px;
    margin-left: 20px;
}
.addMenstruationHistorycontent{
  .addMenstruationHistorycontent-div{
    border-right:1px solid  #D9D9D9;
    border-radius: 8px;
    overflow: hidden;
    .InputValue{

    }
  }
  padding: 20px 20px 0 20px;
  table{
    border-collapse:collapse;
    .addMenstruationHistorycontent-tr{
      text-align: center;
      height:40px;
      .addMenstruationHistorycontent-tr-hover{
        cursor: pointer;
      }
    }
    .addMenstruationHistorycontent-tr:last-child{
      border-bottom: 1px solid #D9D9D9;
    }
  }
  th{
    height: 40px;
    background: #D7E9FF;
    font-weight: 500;
    color: #111111;
    }
   .backgroundF2F7FF{
     background: #F2F7FF;
   }
}

</style>
<style>

</style>
