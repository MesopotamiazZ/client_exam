/**
* Created 黄伟
* Date: 2018/3/8
* Time: 15:16
* content: 
*/
<template>
  <div class="reportToSign">
    <Modal v-model="recallSign" :styles='{width:modalWidth+"px"}'
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
         <!-- 第一排 -->
             <Row>
               <div class="fl">
                  <div class="reportToSign-text fl textJustify"
                        style="height:30px;width:60px">签收数量</div>
                    <div class="reportToSign-input">
                      <Input  disabled
                              style="width:100px;height:30px;"
                          ></Input>
                  </div>
               </div>
               <div class="fl marginL20">
                <div class="reportToSign-text fl textJustify"
                        style="height:30px;width:36px">签收人</div>
                    <div class="reportToSign-input">
                      <Input  
                              style="width:98px;height:30px;"
                          ></Input>
                 </div>
               </div>
             </Row>
         <!-- 第二排 -->
             <Row>
               <div class="fl marginT20">
                  <div class="reportToSign-text fl textJustify"
                        style="height:30px;width:60px">证件号码</div>
                    <div class="reportToSign-input">
                      <Input  
                              style="width:265px;height:30px;"
                          ></Input>
                  </div>
               </div>
             </Row>
         <!-- 第三排 -->
             <Row>
               <div class="fl marginT20">
                  <div class="reportToSign-text fl textJustify"
                        style="height:30px;width:60px">报告领取码</div>
                    <div class="reportToSign-input">
                      <Input  disabled
                              style="width:265px;height:30px;"
                          ></Input>
                  </div>
               </div>
             </Row>
         <!-- 第三排 -->
             <Row>
               <div class="fl marginT20" >
                  <div class="reportToSign-text fl textJustify"
                        style="height:30px;width:60px">签字</div>
                  <div class="reportToSign-imgBackGround">
                  </div>
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
  name: 'reportToSign',
  props: {
    recallSign: {
      type: Boolean,
      default: false,
    },
    headerText: {
        // title
      type: String,
      default: '报告签收',
    },
    modalWidth: {
        // modal宽度
      type: Number,
      default: 375,
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
        // reportToSign: false,
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
  .reportToSign {
    .ivu-modal-footer{
      height:50px;
    }
   .reportToSign-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .reportToSign-input {
    margin-left: 10px;
    display: inline-block;
    flex: 1;
  }
  .reportToSign-imgBackGround{
    width: 265px;
    height: 135px;background: #F4F4F4;
    border-radius: 4px;
    margin-left: 10px;
    display: inline-block;
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
