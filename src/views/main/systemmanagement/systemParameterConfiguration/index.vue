<template>
  <div class="systemParameterConfiguration-wrapper height100P padding10">
    <div class="systemParameterConfiguration contentBg height100P">
      <div class="spc-head">
        <span class="title">系统参数配置</span>
        <z-button ZBtype="ghost" class="fr marginT15" @click="cancel">取 消</z-button>
        <z-button-has-bg ZBtype="ghost" class="fr marginR10 marginT15" @click="tipModal = true">保 存</z-button-has-bg>
      </div>
      <div class="spc-body">
        <div class="row">
          <div class="row-left">
            <span class="label">全局</span>
          </div>
          <div class="row-right">
            <span class="label">登录时，输入密码错误N次则会系统锁定账号，由管理员到账号管理页面进行解锁</span>
            <span class="tips">（输入框为空时，代表该参数未启用）</span>
            <div class="marginT10">
              <span class="input-label marginR10 lineH30">允许错误提示</span>
              <z-input v-model="formData.psdErrorCount" type="number" number class="count" :style="{width:'84px'}"></z-input>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="row-left">
            <span class="label">基础信息管理</span>
          </div>
          <div class="row-right">
            <span class="label">默认条码号使用：</span>
            <span class="tips">（组合项目中未使用采样号规则的项目，条码号生成方式）</span>
            <div class="marginT5">
              <RadioGroup v-model="formData.defaultBarcode">
                <Radio class="marginR20" :label="1">体检号</Radio>
                <Radio :label="0">编号规则</Radio>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="row-left">
            <span class="label">检前准备</span>
          </div>
          <div class="row-right">
            <div class="item">
              <span class="label">是否启用报告领取码？</span>
              <span class="tips">（默认为是）</span>
              <div class="marginT5">
                <RadioGroup v-model="formData.useReportCode">
                  <Radio class="marginR20" :label="1">是</Radio>
                  <Radio :label="0">否</Radio>
                </RadioGroup>
              </div>
            </div>
            <div class="item">
              <span class="label">是否默认打印缴费凭条？</span>
              <span class="tips">（默认为是）</span>
              <div class="marginT5">
                <RadioGroup v-model="formData.printPayCode">
                  <Radio class="marginR20" :label="1">是</Radio>
                  <Radio :label="0">否</Radio>
                </RadioGroup>
              </div>
            </div>
            <div class="item">
              <span class="label">是否默认打印指引单？</span>
              <span class="tips">（默认为是）</span>
              <div class="marginT5">
                <RadioGroup v-model="formData.printGuide">
                  <Radio class="marginR20" :label="1">是</Radio>
                  <Radio :label="0">否</Radio>
                </RadioGroup>
            </div>
            </div>
            <div class="item">
              <span class="label">是否默认打印样本条码？</span>
              <span class="tips">（默认为是）</span>
              <div class="marginT5">
                <RadioGroup v-model="formData.printSampleCode">
                  <Radio class="marginR20" :label="1">是</Radio>
                  <Radio :label="0">否</Radio>
                </RadioGroup>
              </div>
            </div>
            <div class="item">
              <span class="label">登记项目超过N天未检，设置为超时</span>
              <span class="tips">（输入框为空时，代表该参数未启用）</span>
              <div class="marginT10">
                <span class="input-label marginR10 lineH30">超时时间</span>
                <z-input v-model="formData.timeOut" type="number" number class="day" :style="{width:'84px'}"></z-input>
              </div>
            </div>
            <div class="item">
              <span class="label">收费时是否默认打印费用明细？</span>
              <span class="tips">（默认为是）</span>
              <div class="marginT5">
                <RadioGroup v-model="formData.printPayDetail">
                  <Radio class="marginR20" :label="1">是</Radio>
                  <Radio :label="0">否</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="row-left">
            <span class="label">体检工作台</span>
          </div>
          <div class="row-right">
            <div class="item">
              <span class="label">样本条码生成规则？</span>
              <span class="tips">（样本条码是根据采样台根据样本容器生成，或组合项目生成）</span>
              <div class="marginT5">
                <RadioGroup v-model="formData.sampleCodeRule">
                  <Radio class="marginR20" :label="1">是</Radio>
                  <Radio :label="0">否</Radio>
                </RadioGroup>
              </div>
            </div>
            <div class="item">
              <span class="label">是否启用多个采样台？</span>
              <span class="tips">（支持同时使用多个采样台，或者是一个采样台）</span>
              <div class="marginT5">
                <RadioGroup v-model="formData.useMultSamplingTable">
                  <Radio class="marginR20" :label="1">是</Radio>
                  <Radio :label="0">否</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="row-left">
            <span class="label">主检工作台</span>
          </div>
          <div class="row-right">
            <div class="item">
              <span class="label">是否启用主检的退回修改？</span>
              <span class="tips">（主检的退回修改功能权限控制）</span>
              <div class="marginT5">
                <RadioGroup v-model="formData.allowBack">
                  <Radio class="marginR20" :label="1">是</Radio>
                  <Radio :label="0">否</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tip-modal
      :controlModal="tipModal"
      mainContent="确定修改保存吗？"
      mainContentSize="16px"
      @tip-modal-affirm="submitSave"
      @tip-modal-cancel="tipModal=false">
    </tip-modal>
  </div>
</template>
<script>
export default {
  name: 'systemParameterConfiguration',
  data() {
    return {
      systemConfig: {
        psdErrorCount: '', // 密码错误次数
        defaultBarcode: 0, // 默认条码号
        useReportCode: 1, // 报告领取码
        printPayCode: 1, // 打印缴费条码
        printGuide: 1, // 打印指引单
        printSampleCode: 1, // 打印样本条码
        timeOut: '', // 超时时间
        printPayDetail: 1, // 打印费用明细
        sampleCodeRule: 1, // 样本条码生成规则
        useMultSamplingTable: 1, // 启用多个采样台
        allowBack: 1, // 启用主检的退回修改
      },
      formData: {},
      tipModal: false,
    }
  },
  methods: {
    submitSave() {
      this.$Message.success('保存成功')
      this.tipModal = false
    },
    cancel() {
      this.formData = JSON.parse(JSON.stringify(this.systemConfig))
    },
  },
  created() {
    this.formData = JSON.parse(JSON.stringify(this.systemConfig))
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .systemParameterConfiguration-wrapper{
    .lineH30{
      line-height: 30px;
    }
    .systemParameterConfiguration{
      padding: 0 20px;
      .spc-head{
        height: 60px;
        border-bottom: 1px solid @gradeAshFive;
        .title{
          line-height: 60px;
          font-size: 16px;
          color:@gradeAshOne;
        }
      }
      .spc-body{
        height: calc(~'100% - 60px');
        overflow: auto;
        .row{
          display: flex;
          padding:30px 0;
          border-bottom: 1px solid @gradeAshFive;

          &:nth-last-child(1){
            border-bottom: none;
          }
        }
        .row-left{
          width: 160px;
          .label{
            font-size: 14px;
            color: @gradeAshTwo;
          }
        }
        .row-right{
          .label{
            color: @gradeAshTwo;
          }
          .tips{
            color: #b3b3b3;
          }
          .input-label{
            color: @gradeAshThree;
          }
          .item{
            margin-top: 30px;
            &:nth-child(1){
              margin-top: 0;
            }
          }
          .ivu-radio-group-item{
            color: @gradeAshThree;
          }
          .count{
            .ivu-input{
              padding-right:20px; 
            }
            &:after{
              content:'次';
              position: absolute;
              right: 5px;
              top: 7px;
              color: #b3b3b3;
            }
          }
          .day{
            .ivu-input{
              padding-right:20px; 
            }
            &:after{
              content:'天';
              position: absolute;
              right: 5px;
              top: 7px;
              color: #b3b3b3;
            }
          }
        }
      }
    }
  }
</style>
