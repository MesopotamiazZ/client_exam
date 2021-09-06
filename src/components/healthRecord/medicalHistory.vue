<template>
  <div class="medicalHistory">
    <titletHasSlot>
      <span slot='titletHasSlotLeftTitle'>历史体检记录</span>
    </titletHasSlot>
    <Form ref="medicalHistory"
          :model="basicInformationData"
          :rules="basicInformationRule"
          class="medicalHistoryForm">
      <!-- 第一行 -->
      <ZTable :isShowSelectOrIndex="false"
              border
              stripe
              :columns="columns"
              :data="detilData"
              :height="tableHeight -50"
              :isDependent="true"
              style="border:none;"></ZTable>
      <!-- 定位图片 -->
    </Form>
  </div>
</template>
<script>
import titletHasSlot from '@/components/titleHasSlot'
import ZButton from '@/components/button/ZButton'
import ZTable from '@/components/table/zTable'

export default {
  name: 'medicalHistory',
  data() {
    return {
      //
      medicalHistoryData: {},
      medicalHistoryRule: {},
      columns: [
        {
          title: '体检日期',
          key: 'index1',
        },
        {
          title: '体检类别',
          key: 'index2',
        },
        {
          title: '医嘱',
          key: 'index3',
        },
        {
          title: '体检结论',
          key: 'index4',
        },
        {
          title: '建议',
          key: 'index5',
        },
      ],
      detilData: [
        {index1: '17-01-01', index2: '健康体检', index3: '复查项目：血常规', index4: '复查项目：血常规', index5: '复查项目：血常规'},
        {index1: '17-01-01', index2: '职业体检', index3: '/', index4: '未见明显异常', index5: '建议脱离噪声岗位至少2周，视复查结...'},
        {index1: '17-01-01', index2: '健康体检', index3: '/', index4: '/', index5: '/'},
      ],
      tableHeight: 300,
      basicInformationData: {},
      basicInformationRule: {},
    }
  },
  components: {
    titletHasSlot,
    ZButton,
    ZTable,
  },
  watch: {},
  props: {},
  methods: {
    //
  },
  mounted() {
  //  console.log('1')
  },
}
</script>
<style >

</style>

<style  lang="less" >
@import (reference) '~assets/less/variable.less';
.medicalHistory {
  .ivu-table::before {
    width: 0;
    height: 0;
  }
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 15px 0 rgba(206, 213, 242, 0.7);
  border-radius: 8px;
  width: 1033px;
  margin: 0 auto;
  .medicalHistoryForm {
    position: relative;
    .medicalHistory-img-po {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .medicalHistory-img {
      width: 90px;
      height: 120px;
      border: 1px solid red;
    }
  }
  .medicalHistory-row {
    height: 30px;
  }
  .medicalHistory-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .medicalHistory-input {
    margin-left: 10px;
    display: inline-block;
    flex: 1;
  }
  .marginL30px {
    margin-left: 30px;
  }
  .marginT15 {
    margin-top: 15px;
  }
  .medicalHistory-row-detail {
    font-size: 14px;
    color: #111111;
    letter-spacing: 0.04px;
  }
}
</style>