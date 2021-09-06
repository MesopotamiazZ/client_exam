/* 
HW */
<template>
  <div class="describeType">
       <div  class="describeType-body-baseIfon-content" >
                   <titleHasSlotSmall :height="36">
                   <span slot="titletHasSlotLeftTitle">内科常规</span>
                   </titleHasSlotSmall>
                   <div class="describeType-body-baseIfon-content-message">
                    <Row >
                       <div class= "describeType-item">
                         <div >
                             <div class="fl describeType-itemName">检查项目</div> 
                            <div class="fl describeType-Value">检测见过</div>
                         </div>
                         <div >
                             <div class="fl describeType-itemNameFor">心脏听诊</div> 
                            <div class="fl describeType-ValueFor">心音有力，律齐，未触及震颤</div>
                         </div>
                         <div >
                             <div class="fl describeType-itemNameFor">肺</div> 
                            <div class="fl describeType-ValueFor">双肺呼吸音清，未闻及干、湿罗音</div>
                         </div>
                       <div style=" clear: both;"></div>
                       </div>

                    </Row>
                      <Row >
                      <div class="fl marginT20">
                          <div class="describeType-body-baseIfon-content-message-text fl textJustify"
                              style="height:30px;width:48px">科室小结</div>
                          <div class="describeType-body-baseIfon-content-message-input">
                            <Input disabled
                                  style="width:535px;"
                                  type="textarea"
                                  :rows="3 "
                                  ></Input>
                          </div>
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
  name: 'describeType',
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
.describeType {
 //
 .ivu-table-wrapper{
   border-left:1px solid #e9eaec;
   border-top:1px solid #e9eaec;
 }
  .describeType-body-baseIfon-content{
      background: #FFFFFF;
      border: 1px solid #D9D9D9;
      border-radius: 8px;
              margin-top: 10px;
      .describeType-body-baseIfon-content-message{
        border-top:1px solid #D9D9D9;
        padding: 20px;
      }
  }
     .describeType-body-baseIfon-content-message-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
   .describeType-body-baseIfon-content-message-input {
    margin-left: 10px;
    display: inline-block;
    flex: 1;
  }
  .describeType-item{
    border:1px solid #d9d9d9;
    height:100%;
    width: 598px;
      .describeType-itemName{
    width: 108px;
    height:40px;
    border-right:1px solid  #d9d9d9;
    text-align: center;
    line-height: 40px;
    text-overflow: ellipsis;
    background: #E8F2FF;
  }
  .describeType-Value{
    width: 480px;
    height:40px;
    text-align: center;
    line-height: 40px;
    text-overflow: ellipsis;
  }
      .describeType-itemNameFor{
    width: 108px;
    height:40px;
    border-right:1px solid  #d9d9d9;
    text-align: center;
    line-height: 40px;
    text-overflow: ellipsis;
    background: #E8F2FF;
    border-top:1px solid  #d9d9d9;
  }
  .describeType-ValueFor{
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
