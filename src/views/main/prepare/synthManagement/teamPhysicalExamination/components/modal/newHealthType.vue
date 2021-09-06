/*
*单位管理-新增职业健康检查种类
*@author ljl
*@date 2018/2/23
*/
<template>
    <Modal v-model="modelVoid"  class="model-void-new"
           :width='478'
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false">
      <div slot="header">
        <alert-header 
          :showInput='false'
          :headerText="headerText">
        </alert-header>
      </div>
      <div class="content">
         <Form
         ref='voidForm'
         :model="voidin"
         :rules="voidRule">
            <div class="left-name">职业健康检查种类</div>
            <FormItem prop="result" style="display:inline-block">
                <Select v-model="voidin.result"
                    :class='{selectVerificationTs: isEmpty(voidin.result)}'
                    class="marginT20"
                    style="width:332px"
                    placeholder=""
                    filterable>
                  <Option v-for="item in resultChange"
                          :value="item.value"
                          :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
         </Form>
      </div>
      <div slot="footer">
        <div class="bottom">
          <div class="bottom-right">
            <Button type="primary" class="button" @click="sure">确 认</Button>
            <Button type="ghost" class="button" @click="cancel">取 消</Button>
          </div>
        </div>
      </div>
    </Modal>
</template>

<script>
export default {
  name: 'void',
  data () {
    return {
      resultChange: [
        {
          label: '作废原因1',
          value: 1,
        },
        {
          label: '作废原因2',
          value: 2,
        },
        {
          label: '作废原因3',
          value: 3,
        },
        {
          label: '作废原因4',
          value: 4,
        },
        {
          label: '作废原因5',
          value: 5,
        },
      ],
      voidin: {
        result: null,
      },
      voidRule: { // 编辑验证规则
        result: [ // 检查结果
          {
            required: true, message: '职业健康检查种类不能为空', type: 'number', trigger: 'change',
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
      default: '新增职业健康检查种类',
    },
  },
  methods: {
    sure() {
      this.$refs.voidForm.validate(valid => {
        if (valid) {
          this.$emit('sure')
          this.voidin.result = null
        }
      })
    },
    cancel() {
      this.$emit('cancel')
    },
    isEmpty (data) {
      if (data === '' || data === null) {
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
    font-weight:bold;
}
</style>


<style lang="less">
@import (reference) '~assets/less/variable.less';
  .model-void-new{
    box-shadow: 0 2px 10px 0;
    .ivu-modal-mask {
      background-color: transparent!important;
    }
    .ivu-modal-content {
      border-radius: @borderRadiuBig;
      background-color: #FFFFFF;
      box-shadow: 0 2px 15px 0 rgba(206,213,242,0.70);
    }
    .content{
        .left-name{
            vertical-align: top;
            line-height: 30px;
            height: 30px;
            overflow: hidden;
            margin: 20px 6px 0 20px;
            display: inline-block;
            text-align: justify;
            width:96px;
            color:@gradeAshThree;
            &::after{
              content:'';
              padding-left:100%;
              display: inline-block;

            }
        }
        textarea.ivu-input{
            height: 90px!important;
        }
        .right-input{
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

