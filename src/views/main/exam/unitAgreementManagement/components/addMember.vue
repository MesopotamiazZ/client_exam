<template>
  <div class="audit-detail-modal-wrapper">
    <Modal v-model="recallSign"
           :styles='{width:modalWidth+"px"}'
           :transition-names='[]'
           :mask-closable="false"
           :closable="false"
           :transfer='false'>
      <div slot="header">
        <div name='adm-alertHeader'
             class="adm-alertHeader font14">
          <span class="adm-alertHeaderText font16">{{ headerText }}</span>
          <div style="position: absolute; top: 0; right: 17px;">
            <search-input class="marginR30"></search-input>
            <ZButtonHasBg class="marginR10" @click="affirm">确认添加</ZButtonHasBg>
            <ZButton @click="abolish">取消</ZButton>
          </div>
        </div>

      </div>
      <slot></slot>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import ZButton from '@/components/button/ZButton'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
export default {
  name: 'recallSignModal',
  props: {
    // 模态框显隐字段
    recallSign: {
      type: Boolean,
      default: false,
    },
    headerText: {
      // title
      type: String,
      default: '撤回签发原因',
    },
    modalWidth: {
      // modal宽度
      type: Number,
      default: 347,
    },
  },
  components: {
    ZButton,
    ZButtonHasBg,
  },
  data() {
    return {
      modalStatus: false,
    }
  },
  watch: {

  },
  methods: {
    abolish () {
      this.$emit('abolish')
    },
    affirm () {
      this.$emit('affirm')
    },
  },
}
</script>
<style lang="less">
@import '~assets/less/variable.less';
.audit-detail-modal-wrapper {
  .ivu-modal-footer {
    height: 50px;
  }
  .recallSignModal-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .recallSignModal-input {
    margin-left: 10px;
    display: inline-block;
    flex: 1;
  }
  .adm-alertHeader {
    background-color: #f2f5fa;
    line-height: 50px;
    height: 50px;
    color: @gradeAshOne;
    letter-spacing: 0.04px;
    font-weight: normal;
    .adm-alertHeaderText::before {
      content: '';
      width: 3px;
      height: 17px;
      margin-right: 8px;
      display: inline-block;
      vertical-align: middle;
      background-color: @gradeBlueOne;
    }
    .search-input .input-wrapper .icon-wrapper {
      top: 13px;
      .icon{
        position: absolute;
        right: 3px;
      }
    }
  }
  .holdMomentModal-main {
    text-align: center;
    font-size: 16px;
    display: block;
    color: #4a4a4a;
    letter-spacing: 0.07px;
    font-weight: 500;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .ivu-modal-footer {
    height: 0;
  }
}
</style>
