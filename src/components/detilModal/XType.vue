/* 
HW */
<template>
  <div class="XType">
       <div  class="XType-body-baseIfon-content" >
                   <titleHasSlotSmall :height="36">
                   <span slot="titletHasSlotLeftTitle">X超</span>
                   </titleHasSlotSmall>
                   <div class="XType-body-baseIfon-content-message">
                    <Row >
                       <div class= "XType-item">
                         <div >
                             <div class="fl XType-itemName">弃检</div> 
                             <div class="fl XType-Value">患者因为身体不适，放弃检查</div>
                         </div>
                       <div style=" clear: both;"></div>
                       </div>

                    </Row>
                     
                      <Row >
                      <div class="fr marginT20">
                         检查医生：王晓丽
                      </div>
                      </Row>
                   </div>
               </div>
  </div>
</template>
<script>
import titleHasSlotSmall from './titleHasSlotSmall'
import ZTable from '@/components/table/zTable'

export default {
  name: 'XType',
  components: {
    titleHasSlotSmall,
    ZTable,
  },
  data() {
    return {
      detilData: [{name: '测试数据'}],
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '检测项目',
          type: 'name',
        },
        {
          title: '检测结果',
          key: 'name',
        },
        {
          title: '标志',
          key: 'name',
        },
        {
          title: '参考值',
          key: 'name',
        },
        {
          title: '单位',
          key: 'name',
        },
      ]
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.XType {
 //
 .ivu-table-wrapper{
   border-left:1px solid #e9eaec;
   border-top:1px solid #e9eaec;
 }
  .XType-body-baseIfon-content{
      background: #FFFFFF;
      border: 1px solid #D9D9D9;
      border-radius: 8px;
              margin-top: 10px;
      .XType-body-baseIfon-content-message{
        border-top:1px solid #D9D9D9;
        padding: 20px;
      }
  }
     .XType-body-baseIfon-content-message-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
   .XType-body-baseIfon-content-message-input {
    margin-left: 10px;
    display: inline-block;
    flex: 1;
  }
  .XType-item{
    border:1px solid #d9d9d9;
    height:100%;
    width: 598px;
      .XType-itemName{
    width: 108px;
    height:40px;
    border-right:1px solid  #d9d9d9;
    text-align: center;
    line-height: 40px;
    text-overflow: ellipsis;
    background: #E8F2FF;
  }
  .XType-Value{
    width: 480px;
    height:40px;
    text-align: center;
    line-height: 40px;
    text-overflow: ellipsis;
  }
      .XType-itemNameFor{
    width: 108px;
    height:40px;
    border-right:1px solid  #d9d9d9;
    text-align: center;
    line-height: 40px;
    text-overflow: ellipsis;
    background: #E8F2FF;
    border-top:1px solid  #d9d9d9;
  }
  .XType-ValueFor{
    width: 480px;
    height:40px;
    text-align: center;
    line-height: 40px;
    text-overflow: ellipsis;
    border-top:1px solid  #d9d9d9;
  }
  }

}

</style>
