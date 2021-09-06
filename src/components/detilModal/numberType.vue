/* 
HW */
<template>
  <div class="numberType">
    <div class="numberType-body-baseIfon-content">
      <titleHasSlotSmall :height="36">
        <span slot="titletHasSlotLeftTitle">血常规</span>
      </titleHasSlotSmall>
      <div class="numberType-body-baseIfon-content-message">
        <Row>
          <ZTable :isShowSelectOrIndex="false"
                  border
                  stripe
                  :columns="columns"
                  :data="detilData"
                  :height="tableHeight -50"
                  :isDependent="true">
          </ZTable>
        </Row>
        <Row>
          <div class="fl marginT20">
            <div class="numberType-body-baseIfon-content-message-text fl textJustify"
                 style="height:30px;width:48px">小结</div>
            <div class="numberType-body-baseIfon-content-message-input">
              <Input disabled
                     style="width:535px;"
                     type="textarea"
                     :rows="3 "></Input>
            </div>
          </div>
        </Row>
        <Row>
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
  name: 'numberType',
  components: {
    titleHasSlotSmall,
    ZTable,
  },
  data() {
    return {
      detilData: [{ name1: '白细胞数量', name2: '4.6', name3: '*10`9/L', name4: '3.5-9.5' }, { name1: '中心粒%', name2: '35', name3: '%', name4: '40.00-75.00' }],
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '单项名称',
          key: 'name1',
        },
        {
          title: '检查所见',
          key: 'name2',
        },
        {
          title: '单位',
          key: 'name3',
        },
        {
          title: '参考范围',
          key: 'name4',
        },
      ]
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.numberType {
  //
  .ivu-table-wrapper {
    border-left: 1px solid #e9eaec;
    border-top: 1px solid #e9eaec;
  }
  .numberType-body-baseIfon-content {
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    margin-top: 10px;
    .numberType-body-baseIfon-content-message {
      border-top: 1px solid #d9d9d9;
      padding: 20px;
    }
  }
  .numberType-body-baseIfon-content-message-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .numberType-body-baseIfon-content-message-input {
    margin-left: 10px;
    display: inline-block;
    flex: 1;
  }
}
</style>
