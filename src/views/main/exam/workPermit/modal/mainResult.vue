/* 
HW */
<template>
  <div class="BType">
       <div  class="BType-body-baseIfon-content" >
                   <titleHasSlotSmall :height="36">
                   <span slot="titletHasSlotLeftTitle">主检检查结果</span>
                   </titleHasSlotSmall>
                   <div class="BType-body-baseIfon-content-message">
                      <Row >
                      <div class="fl ">
                          <div class="BType-body-baseIfon-content-message-text fl textJustify"
                              style="height:30px;width:48px">临床诊断</div>
                          <div class="BType-body-baseIfon-content-message-input">
                            <Input disabled
                                  style="width:535px;"
                                  type="textarea"
                                  :rows="3 "
                                  ></Input>
                          </div>
                        </div>
                      </Row>
                      <Row >
                      <div class="fl marginT20">
                          <div class="BType-body-baseIfon-content-message-text fl textJustify"
                              style="height:30px;width:48px">建议</div>
                          <div class="BType-body-baseIfon-content-message-input">
                            <Input disabled
                                  style="width:535px;"
                                  type="textarea"
                                  :rows="4"
                                  ></Input>
                          </div>
                        </div>
                      </Row>
                      <div class="fl marginT20">
                          <div class="BType-body-baseIfon-content-message-text fl textJustify"
                              style="height:30px;width:48px">医嘱结论</div>
                          <div class="BType-body-baseIfon-content-message-input">
                            <Input disabled
                                  style="width:535px;"
                                  type="textarea"
                                  :rows="5"
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
  name: 'BType',
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
.BType {
 //
 .ivu-table-wrapper{
   border-left:1px solid #e9eaec;
   border-top:1px solid #e9eaec;
 }
  .BType-body-baseIfon-content{
      background: #FFFFFF;
      border: 1px solid #D9D9D9;
      border-radius: 8px;
              margin-top: 10px;
      .BType-body-baseIfon-content-message{
        border-top:1px solid #D9D9D9;
        padding: 20px;
      }
  }
     .BType-body-baseIfon-content-message-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
   .BType-body-baseIfon-content-message-input {
    margin-left: 10px;
    display: inline-block;
    flex: 1;
  }
  .BType-item{
  }

}

</style>
