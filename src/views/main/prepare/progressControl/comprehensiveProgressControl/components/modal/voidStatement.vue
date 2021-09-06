/*
*单位收费-弹窗弃检原因
*@author ljl
*@date 2018/2/23
*/
<template>
  <div v-if="modelVoid">
    <Modal v-model="modelVoid"
           class="model-void"
           :width='319'
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false">
      <div slot="header">
        <alert-header :showInput='false'
                      :headerText="headerText">
        </alert-header>
      </div>
      <div class="content">
        <Form ref='voidForm'
              :model="voidin"
              :rules="voidRule">
          <div class="left-name">弃检原因</div>
          <FormItem prop="result"
                    style="display:inline-block">
            <Input v-model.trim="voidin.result"
                   type="textarea"
                   class="right-input"
                   :class='{inputVerificationTs: isEmpty(voidin.result)}'
                   style="width: 215px;" />
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <div class="bottom">
          <div class="bottom-right">
            <Button type="primary"
                    class="button"
                    @click="sure">确 认</Button>
            <Button type="ghost"
                    class="button"
                    @click="cancel">取 消</Button>
          </div>
        </div>
      </div>
    </Modal>
  </div>

</template>

<script>
export default {
  name: 'void',
  data() {
    return {
      voidin: {
        result: '',
      },
      voidRule: {
        // 编辑验证规则
        result: [
          // 检查结果
          {
            required: true,
            message: '弃检原因不能为空',
            type: 'string',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  props: {
    modelVoid: {
      type: Boolean,
      default: false,
    },
    headerText: {
      type: String,
      default: '作废结算单',
    },
  },
  methods: {
    async sure() {
      if (await this.$refs.voidForm.validate()) {
        this.$emit('sure')
        this.voidin.result = ''
      }
    },
    cancel() {
      this.$emit('cancel')
      this.voidin.result = ''
    },
    isEmpty(data) {
      if (data === '') {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
<style lang="less">
.model-refund-order .price .ivu-input {
  padding: 10px 22px 10px 10px;
  font-weight: bold;
}
</style>


<style lang="less">
@import (reference) '~assets/less/variable.less';
.model-void {
  .ivu-modal-mask {
    background-color: transparent!important;
  }
  .ivu-modal-content {
    border-radius: @borderRadiuBig;
    background-color: #FFFFFF;
    box-shadow: 0 2px 15px 0 rgba(206,213,242,0.70);
  }
  .content {
    .left-name {
      vertical-align: top;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      margin: 20px 10px 0 20px;
      display: inline-block;
      text-align: justify;
      width: 48px;
      color: @gradeAshThree;
      &::after {
        content: '';
        padding-left: 100%;
        display: inline-block;
      }
    }
    textarea.ivu-input {
      height: 60px !important;
    }
    .right-input {
      display: inline-block;
      vertical-align: top;
      margin-top: 20px;
    }
  }
  .bottom {
    height: 50px;
    .bottom-right {
      .button {
        // margin-top: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>

