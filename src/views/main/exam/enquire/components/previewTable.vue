<template>
  <div class="previewTable marginL10 marginR10 marginT10 marginB10">
    <Table class="preview" ref='previewTable' :height="$store.state.windowHeight-428" align='center' ellipsis stripe border highlight-row :columns="columnsPreview" :data="dataPreview"></Table>
  </div>
</template>
<script>
export default {
  name: 'previewTable',
  data () {
    return {
      columnsPreview: [
        {
          title: '疾病 ( 异常名称 ) ',
          key: 'sicknessName',
          width: '187px',
        },
        {
          title: '健康建议',
          key: 'healthyTip',
          width: '187px',
        },
        {
          title: '职业建议',
          key: 'professionTip',
          width: '243px',
        },
        {
          title: '未检项目',
          key: 'noCheckItem',
          width: '180px',
        },
      ],
      dataPreview: [
        {
          sicknessName: '肝硬化',
          healthyTip: '规律作息',
          professionTip: '建议到专科医院检查复诊',
          noCheckItem: '血常规',
        },
        {
          sicknessName: '肝硬化',
          healthyTip: '规律作息',
          professionTip: '建议到专科医院检查复诊',
          noCheckItem: '血常规',
        },
        {
          sicknessName: '肝硬化',
          healthyTip: '规律作息',
          professionTip: '建议到专科医院检查复诊',
          noCheckItem: '血常规',
        },
        {
          sicknessName: '肝硬化',
          healthyTip: '规律作息',
          professionTip: '建议到专科医院检查复诊',
          noCheckItem: '血常规',
        },
        {
          sicknessName: '肝硬化',
          healthyTip: '规律作息',
          professionTip: '建议到专科医院检查复诊',
          noCheckItem: '血常规',
        },
        {
          sicknessName: '肝硬化',
          healthyTip: '规律作息',
          professionTip: '建议到专科医院检查复诊',
          noCheckItem: '血常规',
        },
        {
          sicknessName: '肝硬化',
          healthyTip: '规律作息',
          professionTip: '建议到专科医院检查复诊',
          noCheckItem: '血常规',
        },
      ],
    }
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.previewTable {
  // width: 100%;
  // height: 392px;
  .preview {
    border-left: 1px solid #D9D9D9;
    border-top: 1px solid #D9D9D9;
    border-radius: 10px;
    .ivu-table-border {
      border-radius: 10px;
    }
  }
}
.ivu-modal{
  .ivu-modal-footer {
    display: none;
  }
  .ivu-modal-content {
    height: 392px;
  }
}

</style>