<template>
  <div class="audit-detail-wrapper-9527">
    <Modal v-model="openModal"
           :styles='{"width": "514px", "box-shadow": "0 0 8px #ccc", "border-radius": "8px"}'
           :transition-names='[]'
           :mask-closable="maskClosable"
           :closable="closable"
           :transfer='false'>
      <div style="position: relative;" slot="header">
        <p name='adm-alertHeader'
           class="adm-alertHeader font14">
          <span class="adm-alertHeaderText font16">{{ headerText }}</span>
        </p>
        <i class="close-icon" @click="abolish"></i>
      </div>
      
      <slot></slot>

      <div slot="footer">
        <!-- <Button type="ghost"
                class="cancelDelBtn fr marginR20"
                @click="abolish">取 消</Button>
        <ZButtonHasBg class=" marginR20 fr"
                      @click="affirm">保 存
        </ZButtonHasBg> -->
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
    openModal: {
      type: Boolean,
      default: false,
    },
    headerText: {
      // title
      type: String,
      default: '体检详情',
    },
    modalWidth: {
      // modal宽度
      type: Number,
      default: 467,
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
      // recallSignModal: false,
    }
  },
  watch: {},
  methods: {
    // 取消
    abolish() {
      this.$emit('abolish')
    },
    // 保存
    affirm() {
      this.$emit('affirm')
    },
  },
}
</script>
<style lang="less">
@import '~assets/less/variable.less';
.audit-detail-wrapper-9527 {
  .ivu-modal-mask {
    background: transparent;
  }
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
  .ivu-modal-footer{
    height: 0;
  }
  .close-icon {
    display: inline-block; 
    width: 16px; 
    height: 16px; 
    border-radius: 50%;
    background: url('/static/icons/public/closeNormal.svg'); 
    position: absolute; 
    right: 0; 
    top: 20px;
    cursor: pointer;
    &:hover {
      background: url('/static/icons/public/closeRed.svg'); 
    }
  }
}
</style>
