/**
* Created 黄伟
* Date: 2018/3/7
* Time: 15:16
* content: 
*/
<template>
  <div class="signModal">
    <Modal v-model="signModal" :styles='{width:modalWidth+"px"}'
      :transition-names='[]'
      :mask-closable="maskClosable"
      :closable="closable"
      :transfer='false'>
      <div slot="header">
        <p name='adm-alertHeader' class="adm-alertHeader font14">
          <span class="adm-alertHeaderText font16">{{ headerText }}</span>
        </p>
      </div>
       <div style="padding:20px;">
             <Row>
                <div class="signModal-text fl textJustify"
                      style="height:30px;width:72px">撤回签收原因</div>
                  <div class="signModal-input">
                    <Input 
                          style="width:225px;"
                          type="textarea"
                          :rows="4"
                        ></Input>
                  </div>

             </Row>

       </div>
      <div slot="footer">
          <Button type="ghost"
                  class="cancelDelBtn fr marginR20"
                  @click="abolish">取 消</Button>

          <ZButtonHasBg class=" marginR20 fr"
                        @click="affirm()">保 存
          </ZButtonHasBg>
       </div>
    </Modal>
  </div>
</template>
<script>
import ZButton from '@/components/button/ZButton'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
export default {
  name: 'signModal',
  props: {
    signModal: {
      type: Boolean,
      default: false,
    },
    headerText: {
        // title
      type: String,
      default: '撤回签收',
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
        // signModal: false,
    }
  },
  watch: {
  },
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
  .signModal {
    .ivu-modal-footer{
      height:50px;
    }
   .signModal-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .signModal-input {
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
  }
</style>
