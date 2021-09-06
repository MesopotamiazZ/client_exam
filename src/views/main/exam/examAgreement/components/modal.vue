<template>
  <div class="recallSignModal">
    <Modal v-model="recallSign"
           :styles='{width:modalWidth+"px"}'
           :transition-names='[]'
           :mask-closable="maskClosable"
           :closable="closable"
           :transfer='false'>
      <div slot="header">
        <p name='adm-alertHeader'
           class="adm-alertHeader font14">
          <span class="adm-alertHeaderText font16">{{ headerText }}</span>
        </p>
      </div>
      <slot></slot>
      <div class="eidt-audit-footer fr" slot="footer">
        <Checkbox v-model="allApplies">应用于所有结果审核</Checkbox>
        <ZButtonHasBg class="marginL20 marginR20"
                      @click="affirm()">保 存
        </ZButtonHasBg>
        <Button type="ghost"
                class="cancelDelBtn marginR20"
                @click="abolish">取 消</Button>

        
      </div>
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
    maskClosable: {
      // 是否允许点击遮罩层关闭
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ZButton,
    ZButtonHasBg,
  },
  data() {
    return {
      allApplies: false, // 应用于所有结果审核
      // recallSignModal: false,
    }
  },
  watch: {
    recallSign(val) {
      if (!val) {
        this.sendBackReason = ''
      }
    },
  },
  methods: {
    // 取消
    abolish() {
      this.$emit('abolish')
    },
    // 保存
    affirm() {
      this.$emit('affirm', this.allApplies)
    },
  },
}
</script>
<style lang="less">
@import '~assets/less/variable.less';
.recallSignModal {
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
  .eidt-audit-footer {
    display: flex;
    align-items: center;
  }
}
</style>
