/** 
* @author wzd
* @date 2018/03/06
* @content 报告提取码
*/ 
<template>
  <div class="getReportCode">
    <Modal v-model="controlModal"
           class="getReportCode-modal "
           :width='328'
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false">
      <div slot="header">
        <p name='alertHeader'
           class="alertHeader font14">
          <span class="alertHeaderText font16">报告领取码</span>
        </p>
      </div>
      <div class="main">
        <Form ref="reportCodeForm"
              :model="reportCodeForm.reportCode"
              :rules="reportCodeForm.rule"
              :label-width="96 + 10"
              class="reportCode-form">
          <!-- <Input type="text" placeholder="6位数字"></Input> -->
          <FormItem label="设置报告领取码:"
                    prop="reportCode"
                    class="reportCode-form-row">
            <Input type="text"
                   placeholder="6位数字"
                   v-model.trim="reportCodeForm.reportCode"></Input>
          </FormItem>
          <span @click="autoCreate">自动生成</span>
        </Form>
      </div>
      <div slot="footer">
        <div class="modelFooter">
          <Button type="primary"
                  @click="affirm">确 认</Button>
          <Button type="ghost"
                  @click="cancel">取 消</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'getReportCode',
  props: {
    controlModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      reportCodeForm: {
        rule: {
          reportCode: [
            {
              required: true,
              type: 'number',
              message: '领取码不能为空',
              trigger: 'blur',
            },
            {
              validator: (rule, value, callback) => {
                if (
                  typeof value === 'number' &&
                  value === 6 &&
                  value === ~~value
                ) {
                  callback()
                } else {
                  callback(new Error('领取码必须是6位数字'))
                }
              },
              trigger: 'blur',
            },
          ],
        },
        reportCode: null,
      },
    }
  },
  methods: {
    affirm () {
      this.$emit('report-code-affirm')
    },
    cancel() {
      this.$emit('report-code-cancel')
    },
    autoCreate () {
      // 自动生成算法
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.getReportCode {
  .alertHeader {
    background-color: #f2f5fa;
    line-height: 50px;
    height: 50px;
    color: @gradeAshOne;
    letter-spacing: 0.04px;
    color: @gradeAshOne;
    font-weight: normal;
    .alertHeaderText::before {
      content: '';
      width: 3px;
      height: 17px;
      margin-right: 8px;
      display: inline-block;
      vertical-align: middle;
      background-color: @gradeBlueOne;
      position: relative;
      top: -0.7px;
    }
  }
  .main {
    text-align: center;
    // height: 90px;
    // line-height: 90px;
    font-size: 0;
    span {
      font-size: @font12;
      color: #008cee;
      cursor: pointer;
      position: relative;
      top: 5px;
    }
    .reportCode-form {
      padding-top: @num20;
      margin: @num10 0;
      font-size: 0;
      .reportCode-form-row {
        padding: 0 @num20;
        height: 30px;
        & > .ivu-form-item-label {
          padding: @num10 @num10 0 0;
          text-align: justify;
          &::after {
            content: '';
            display: inline-block;
            width: 100%;
            overflow: hidden;
            height: 0%;
          }
          &::before {
            display: none;
          }
        }
        &.ivu-form-item {
          margin-bottom: @num20;
          padding-right: @num10;
          padding-left: 0;
          display: inline-block;
          .ivu-form-item-content {
            width: 120px;
          }
        }
      }
    }
  }
  .modelFooter {
    height: 50px;
    Button {
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>
