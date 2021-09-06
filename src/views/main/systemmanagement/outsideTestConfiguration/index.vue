<template>
  <div class="outsideTestConfiguration-wrapper height100P padding10">
    <div class="outsideTestConfiguration contentBg height100P">
      <div class="spc-head">
        <span class="title">外检配置</span>
        <z-button ZBtype="ghost" class="fr marginT15" @click="cancel">取 消</z-button>
        <z-button-has-bg ZBtype="ghost" class="fr marginR10 marginT15" @click="tipModal = true">保 存</z-button-has-bg>
      </div>
      <div class="spc-body">
        <div class="row" v-if="">
          <div class="row-left">
            <span class="label">外检</span>
          </div>
          <div class="row-right">
            <div class="item">
              <span class="label">设置为外检电脑</span>
              <span class="tips">（是否设置这台电脑为外检电脑）</span>
              <div class="marginT5">
                <RadioGroup v-model="formData.outSidePC">
                  <Radio class="marginR20" :label="1">是</Radio>
                  <Radio :label="0">否</Radio>
                </RadioGroup>
              </div>
            </div>
            <div class="item" :style="{marginTop:'15px'}" v-if="formData.outSidePC">
              <div class="itemBorder">
                <div class="itemBorderRow">
                  <span class="labeled">是否适用外检服务器</span>
                  <div class="valued">
                    <RadioGroup>
                      <Radio class="marginR20" :label="1">是</Radio>
                      <Radio :label="0">否</Radio>
                    </RadioGroup>
                  </div>
                </div>
                <div class="itemBorderRow">
                  <span class="labeled">服务器请求地址（外网）</span>
                  <div class="valued">
                      <Input type="text"  :style="{width:'213px'}"></Input>
                  </div>
                </div>
                <div class="itemBorderRow">
                  <span class="labeled">外检时候，使用那种网络连接</span>
                  <div class="valued" style="width:413px">
                    <RadioGroup>
                      <Radio class="marginR20" :label="1">外网链接</Radio>
                      <Radio :label="0">流转卡</Radio>
                      <Radio class="marginR20" :label="1">局域网</Radio>
                    </RadioGroup>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <!-- <div class="rowButton" >
          <div class="row-left">
          </div>
          <div class="row-right">
            <div class="item">
              <span class="label">是否启用报告领取码？</span>
              <span class="tips">（默认为是）</span>
              <div class="marginT5">
                <RadioGroup v-model="formData.outSidePC">
                  <Radio class="marginR20" :label="1">是</Radio>
                  <Radio :label="0">否</Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <tip-modal
      :controlModal="tipModal"
      mainContent="确定保存修改吗？"
      mainContentSize="16px"
      @tip-modal-affirm="submitSave"
      @tip-modal-cancel="tipModal=false">
    </tip-modal>
  </div>
</template>
<script>
export default {
  name: 'outsideTestConfiguration',
  data() {
    return {
      systemConfig: {
        outSidePC: 0,
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
  .outsideTestConfiguration-wrapper{
    .lineH30{
      line-height: 30px;
    }
    .outsideTestConfiguration{
      padding: 0 20px;
      .spc-head{
        height: 60px;
        // border-bottom: 1px solid @gradeAshFive;
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
      //  .rowButton{
      //     display: flex;
      //     padding:30px 0;


      //     &:nth-last-child(1){
      //       border-bottom: none;
      //     }
      //   }

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
            .itemBorder{
                position: relative;
                padding:  0px 20px;
                background: #F7FAFF;
                border: 1px solid #ADD2FE;
                width: 450px;
                height: 144px;
                .itemBorderRow{
                    margin-top: 20px;
                    display: flex;
                    .labeled{
                      width: 165px;
                    }
                    .valued{
                      flex: 1;
                    }
                }
                // background-color:  @gradeAshThree;
            }
            .itemBorder:before{
              content: "";
              position: absolute;
              top: -6px;
              left: 7px;
              display: inline-block;
              background: #f7faff;
              width: 20px;
              height: 10px;
              border-top: 1px solid #ADD2FE;
              transform: rotate(-30deg);
            }
            .itemBorder:after{
              content: "";
              position: absolute;
              top: -7px;
              display: inline-block;
              background: #f7faff;
              width: 20px;
              height: 10px;
              border-top: 1px solid #ADD2FE;
              transform: rotate(30deg);
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
