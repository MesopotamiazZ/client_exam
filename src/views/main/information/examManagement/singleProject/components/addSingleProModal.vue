/**
* @author wzd
* Date: 2018/02/02
* content: 新增/编辑单个项目(描述型/数值型)
* 参数props: ifShowModal:控制modal显示隐藏  data:form表单数据  selectData: 项目类别接口数据
* 方法methods: 
*/
<template>
  <div class="add-single-pro-modal" v-if='ifShowModal'>
    <Modal v-model="ifShowModal" 
      :styles='{width:521+"px"}'
      :transition-names='[]'
      :mask-closable="false"
      :transfer='false'
      :closable="false">
      <div slot="header">
        <alert-header :headerText='"新增单个项目"' @alert-retrun-num='editSort' :headerVal='modalForm.data.sort'></alert-header>
      </div>
      <div class="aspm-main">
        <div class="partOne">
          <Form
            :model="modalForm.data"
            :rules="modalForm.dataRule"
            :label-width="84 + 10"
            class="modal-form"
            ref="partOneForm">
            <FormItem prop="name" label="单项名称" class="modal-form-row first-row">
              <Input type="text" v-model.trim="modalForm.data.name" 
              :class='{inputVerificationTs: isEmpty(modalForm.data.name)}'></Input>
            </FormItem>
            <FormItem prop="report_name" label="报告显示名称" class="modal-form-row first-row">
              <Input type="text" v-model.trim="modalForm.data.report_name" 
              :class='{inputVerificationTs: isEmpty(modalForm.data.report_name)}'></Input>
            </FormItem>
            <FormItem prop="en_abbr" label="英文简称" class="modal-form-row second-row" id="second-row-left">
              <Input type="text" v-model.trim="modalForm.data.en_abbr"></Input>
            </FormItem>
            <FormItem prop="code" label="单项编号" class="modal-form-row second-row" id="second-row-right">
              <Input type="text" v-model.trim="modalForm.data.code" disabled></Input>
            </FormItem>
            <FormItem prop="type_id" label="项目类别" class="modal-form-row second-row" id="three-row-left">
              <Select 
                v-model="modalForm.data.type_id" 
                filterable 
                :class='{selectVerificationTs: isEmpty(modalForm.data.type_id)}'
                placeholder=''>
                <Option v-for="item in publickOptionData.selectTypeId" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem prop="res_type" label="结果类型" class="modal-form-row second-row" id="three-row-right">
              <Select 
                v-model="modalForm.data.res_type" 
                filterable 
                :class='{selectVerificationTs: isEmpty(modalForm.data.res_type)}'
                placeholder=''>
                <Option v-for="item in publickOptionData.resultType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem prop="sex" label="适用性别" class="modal-form-row four-row" id="four-row-left">
              <Select v-model="modalForm.data.sex" filterable :class='{selectVerificationTs: isEmpty(modalForm.data.sex)}' placeholder=''>
                <Option v-for="item in publickOptionData.matchSex" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem prop="displayed_rows" label="显示行数" class="modal-form-row four-row" id="four-row-right">
              <Input type="text" v-model.trim="modalForm.data.displayed_rows"></Input>
            </FormItem>
            <div class="partTwo" v-if="!isNumberResultLoc">
              <!-- <Form
                :model="modalForm.data"
                :rules="modalForm.rule"
                :label-width="84 + 10"
                class="modal-form"
                ref="partTwoForm"> -->
                <FormItem prop="low_limit_man" label="参考下限（男）" class="modal-form-row second-row">
                  <z-input type="number" :disabled='ifMan' v-model.trim="modalForm.data.low_limit_man" style="margin-right: 30px;"></z-input>
                </FormItem>
                <FormItem prop="upper_limit_man" label="参考上限（男）" class="modal-form-row second-row">
                  <z-input type="number" :disabled='ifMan' v-model.trim="modalForm.data.upper_limit_man"></z-input>
                </FormItem>
                <FormItem prop="low_limit_woman" label="参考下限（女）" class="modal-form-row second-row" id="low_limit_woman">
                  <z-input type="number" :disabled='ifWoman' v-model.trim="modalForm.data.low_limit_woman"></z-input>
                </FormItem>
                <FormItem prop="upper_limit_woman" label="参考上限（女）" class="modal-form-row second-row" id="upper_limit_woman">
                  <z-input type="number" :disabled='ifWoman' v-model.trim="modalForm.data.upper_limit_woman"></z-input>
                </FormItem>
                <FormItem prop="min_val" label="检查所见最小值" class="modal-form-row third-row" id="min_val">
                  <z-input type="number" v-model.trim="modalForm.data.min_val"></z-input>
                </FormItem>
                <FormItem prop="max_val" label="检查所见最大值" class="modal-form-row third-row" id="max_val">
                  <z-input type="number" v-model.trim="modalForm.data.max_val"></z-input>
                </FormItem>
                <FormItem prop="low_side" label="偏低显示" class="modal-form-row four-row" id="low_side">
                  <Select v-model="modalForm.data.low_side" filterable placeholder=''>
                    <Option v-for="item in publickOptionData.pdxs" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem prop="high_side" label="偏高显示" class="modal-form-row four-row" id="upper_side">
                  <Select v-model="modalForm.data.high_side" filterable placeholder=''>
                    <Option v-for="item in publickOptionData.pgxs" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <FormItem prop="unit" label="单位" class="modal-form-row six-row" id="unit">
                  <Input type="text" v-model.trim="modalForm.data.unit"></Input>
                </FormItem>
                <FormItem prop="reference_rule.left" label="参考规则" class="modal-form-row seven-row" id="unit">
                  <span class="seven-row-span">下限</span>
                  <Select v-model="modalForm.data.reference_rule.left" filterable placeholder=''>
                    <Option v-for="item in publickOptionData.reference_rules" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  <span class="seven-row-span">检查所见</span>
                  <Select v-model="modalForm.data.reference_rule.right" filterable placeholder=''>
                    <Option v-for="item in publickOptionData.reference_rules" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  <span class="seven-row-span">上限</span>
                </FormItem>
              <!-- </Form> -->
            </div>

            <div class="partThree">
              <!-- <Form
                :model="modalForm.data"
                :rules="modalForm.rule"
                :label-width="84 + 10"
                class="modal-form"
                ref="partThreeForm"> -->
                <FormItem prop="brief_summary" label="小结汇总规则" class="modal-form-row one-row">
                  <Select 
                    v-model="modalForm.data.brief_summary" 
                    filterable 
                    :class='{selectVerificationTs: isEmpty(modalForm.data.brief_summary)}'
                    placeholder=''>
                    <Option v-for="item in publickOptionData.summary" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
                <Checkbox class="marginR20" style="line-height: 30px;margin-left: 94px;" v-model="modalForm.data.is_show_name" :true-value=1 :false-value=0>
                  小结显示项目名称
                </Checkbox>
                <Checkbox class="marginR20" style="line-height: 30px;" v-model="modalForm.data.is_has_summary" :true-value=1 :false-value=0>
                  是否小结
                </Checkbox>
                <FormItem prop="remark" label="备注" class="modal-form-row three-row marginT20">
                  <Input type="textarea" v-model.trim="modalForm.data.remark" :rows="2"></Input>
                </FormItem>
              <!-- </Form> -->
            </div>

          </Form>
        </div>
       
        
      </div>

      <div slot='footer'>
        <div class="alert-footer-btn paddingB20 paddingT20">
          <Button type="ghost" class="fr marginR20" @click="singleModalCancel">取 消</Button>
          <Button type="primary" class="fr marginR20" @click="singleModalSave('partOneForm')">保 存</Button>
          <Checkbox class="fr marginR20" style="line-height: 30px;" v-model="modalForm.data.status" :true-value=1 :false-value=0>启用</Checkbox>
          <div class="clearBoth"></div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    ifShowModal: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: {},
    },
    selectData: {
      type: Array,
      default: [],
    },
    isNumberResult: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    const lowMan = (rule, value, callback) => {
      let val = value === null ? '' : parseFloat(value)
      if (this.modalForm.data.upper_limit_man !== null && val !== '') {
        if (val > this.modalForm.data.upper_limit_man) {
          this.$refs.partOneForm.validateField('upper_limit_man')
          callback()
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const upperMan = (rule, value, callback) => {
      let val = value === null ? '' : parseFloat(value)
      if (this.modalForm.data.low_limit_man !== null && val !== '') {
        if (val < this.modalForm.data.low_limit_man) {
          callback(new Error('上限值需大于下限值'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const lowWoMan = (rule, value, callback) => {
      let val = value === null ? '' : parseFloat(value)
      if (this.modalForm.data.upper_limit_woman !== null && val !== '') {
        if (val > this.modalForm.data.upper_limit_woman) {
          this.$refs.partOneForm.validateField('upper_limit_woman')
          callback()
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const upperWoMan = (rule, value, callback) => {
      let val = value === null ? '' : parseFloat(value)
      if (this.modalForm.data.low_limit_woman !== null && val !== '') {
        if (val < this.modalForm.data.low_limit_woman) {
          callback(new Error('上限值需大于下限值'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      isNumberResultLoc: true, // 是否显示数值型
      resTypeDis: 1, // 描述型
      resTypeNum: 2, // 数值型
      ifMan: true, // 参考男是否能编辑
      ifWoman: true, // 参考女是否能编辑
      // ifCommit: false, // 是否提交数据
      modalForm: {
        data: {
          sort: 0,
          type_id: -1, // 项目类别 1:描述型 2:数值型
          code: '', // 单项编号
          name: '', // 单项名称
          sex: '', // 适用性别
          res_abbr: '', // 英文简称
          res_type: '', // 结果类型
          report_name: '', // 报告显示名称
          displayed_rows: 1, // 显示行数
          brief_summary: '', // 小结汇总规则
          status: 1, // 是否啟用
          is_show_name: 1, // 小结是否显示
          low_limit_man: null, // 参考下限(男)
          upper_limit_man: null, // 参考上限(男)
          low_limit_woman: null, // 参考下限(女)
          upper_limit_woman: null, // 参考上限(女)
          min_val: null, // 检查所见最小值
          max_val: null, // 见笑哈所见最大值
          low_side: null, // 偏低显示(0是向下箭头,1上向上)
          high_side: null, // 偏高显示
          reference_rule: {
            left: null,
            right: null,
          },
          // reference_rule_left: 2, // 参考规则左符号
          // reference_rule_right: 2, // 参考规则右符号
          unit: '', // 单位
          is_has_summary: 1, // 默认勾选是否加入小结
          pe_categories: [],
          remark: '', // 备注
        },
        dataRule: { // 编辑验证规则
          report_name: [
            {
              required: true,
              message: '报告显示名称不能为空',
              type: 'string',
              trigger: 'blur',
            },
          ],
          type_id: [
            {
              required: true,
              message: '项目类别不能为空',
              type: 'number',
              trigger: 'change',
            },
          ],
          sex: [
            {
              required: true,
              message: '适用性别不能为空',
              type: 'number',
              trigger: 'change',
            },
          ],
          name: [ // 检测项目名称
            {
              required: true, message: '检测项目名称不能为空', type: 'string', trigger: 'blur',
            },
          ],
          upper_limit_man: [
            {
              validator: upperMan, trigger: 'blur',
            },
          ],
          low_limit_man: [
            {
              validator: lowMan, trigger: 'blur',
            },
          ],
          upper_limit_woman: [
            {
              validator: upperWoMan, trigger: 'blur',
            },
          ],
          low_limit_woman: [
            {
              validator: lowWoMan, trigger: 'blur',
            },
          ],
          res_type: [ // 结果类型
            {
              required: true, message: '结果类型不能为空', type: 'number', trigger: 'change',
            },
          ],
          brief_summary: [ // 小结汇总
            {
              required: true, message: '小结汇总不能为空', type: 'number', trigger: 'change',
            },
          ],
          // upper_limit_woman: [
          //   {

          //   }
          // ]
        },
      },
      publickOptionData: {
        selectTypeId: [],
        resultType: [
          {
            label: '描述型',
            value: 1,
          },
          {
            label: '数值型',
            value: 2,
          },
        ],
        matchSex: [
          {
            value: 0,
            label: '通用',
          },
          {
            value: 1,
            label: '男',
          },
          {
            value: 2,
            label: '女',
          },
        ],
        summary: [
          {
            value: 1,
            label: '检查所见+单位',
          },
          {
            value: 2,
            label: '检查所见+异常标志',
          },
          {
            value: 3,
            label: '检查所见',
          },
          {
            value: 4,
            label: '检查结果',
          },
          {
            value: 5,
            label: '检查所见+单位+异常标志',
          },
        ],
        pdxs: [
          {value: 1, label: '↑'},
          {value: 2, label: '偏高'},
          {value: 3, label: '阳性'},
          {value: 4, label: '*'},
          {value: 5, label: '↓'},
          {value: 6, label: '阴性'},
          {value: 7, label: '空白显示'},
        ],
        pgxs: [
          {value: 1, label: '↑'},
          {value: 2, label: '偏高'},
          {value: 3, label: '阳性'},
          {value: 4, label: '*'},
          {value: 5, label: '↓'},
          {value: 6, label: '阴性'},
          {value: 7, label: '空白显示'},
        ],
        reference_rules: [
          {
            label: '<',
            value: 1,
          },
          {
            label: '≤',
            value: 2,
          },
          {
            label: '=',
            value: 3,
          },
        ],
      },
    }
  },
  methods: {
    isEmpty (data) {
      if (data === '') {
        return true
      } else {
        return false
      }
    },
    editSort (num) { // 修改显示顺序,失去焦点
      this.modalForm.data.sort = num
      // this.$emit('alert-return-num', num)
    },
    singleModalCancel () { // 新增取消
      // 取消前需要清空
      this.$emit('single-modal-cancel', false)
    },
    async singleModalSave (name) { // 新增保存
      if (await this.$refs[name].validate()) {
        this.$emit('single-modal-save', this.modalForm.data)
      }
    },
    initClearData () { // 清空数据
      this.modalForm.data.type_id = -1
      this.modalForm.data.code = ''
      this.modalForm.data.name = ''
      this.modalForm.data.sex = ''
      this.modalForm.data.res_abbr = ''
      this.modalForm.data.res_type = ''
      this.modalForm.data.report_name = ''
      this.modalForm.data.displayed_rows = 1
      this.modalForm.data.brief_summary = ''
      this.modalForm.data.status = 1
      this.modalForm.data.is_show_name = 1
      this.modalForm.data.low_limit_man = null
      this.modalForm.data.upper_limit_man = null
      this.modalForm.data.low_limit_woman = null
      this.modalForm.data.upper_limit_woman = null
      this.modalForm.data.min_val = null
      this.modalForm.data.max_val = null
      this.modalForm.data.low_side = null
      this.modalForm.data.high_side = null
      this.modalForm.data.reference_rule = {
        left: null,
        right: null,
      }
      this.modalForm.data.unit = ''
      this.modalForm.data.is_has_summary = 1
      this.modalForm.data.pe_categories = []
      this.modalForm.data.remark = ''
    },
  },
  watch: {
    selectData: {
      handler(selectTypeId) {
        this.publickOptionData.selectTypeId = selectTypeId
      },
      deep: true,
    },
    ifShowModal (val) { // 数据是否清空
      // console.log(val)
      if (!val) {
        this.initClearData()
      }
    },
    'modalForm.data.sex' (val) { // 适用性别改变
      // console.log(val)
      if (val === 0) { // 通用
        this.ifWoman = false
        this.ifMan = false
      } else if (val === 1) { // 男
        this.ifWoman = true
        this.ifMan = false
        this.modalForm.data.upper_limit_woman = null
        this.modalForm.data.low_limit_woman = null
      } else if (val === 2) { // 女
        this.ifWoman = false
        this.ifMan = true
        this.modalForm.data.upper_limit_man = null
        this.modalForm.data.low_limit_man = null
      } else {
        this.ifWoman = true
        this.ifMan = true
      }
    },
    data: {
      handler (val) {
        // console.log('data', val)
        this.modalForm.data.sort = val.showSort
        if (val.type_id !== -1) {
          this.modalForm.data.type_id = val.type_id
        }
      },
      deep: true,
    },
    'modalForm.data.res_type' (val) {
      // console.log(val)
      if (val === this.resTypeDis) { // 描述型
        this.isNumberResultLoc = true
      } else if (val === this.resTypeNum) {
        this.isNumberResultLoc = false
      } else {
        this.isNumberResultLoc = true
      }
    },
    isNumberResult (data) {
      this.isNumberResultLoc = data
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
// .add-single-pro-modal {
//   .ivu-modal {
//     height: calc(~'100% - 40px');
//     max-height: 600px;
//     .ivu-modal-content {
//       height: 100%;
//       .ivu-modal-body {
//         height: calc(~'100% - 101px');
//         .aspm-main {
//           overflow: auto;
//           height: 100%;
//         }
//       }
//     }
//   }
// }
.add-single-pro-modal {
  .ivu-modal {
    height: calc(~'100% - 120px');
    max-height: 518px;
    .ivu-modal-content {
      height: 100%;
      .ivu-modal-body {
        height: calc(~'100% - 120px');
        .aspm-main { // 弹窗中间内容部分
          overflow: auto;
          height: 100%;
        }
      }
    }
  }
  .aspm-main {
    font-size: @font16;
    color: @gradeAshThree;
    padding: @num20 @num20 0 @num20;
    position: relative;
    // max-height: 500px;
    // overflow-y: scroll;
    .partOne {
      .modal-form {
        // border-bottom: 1px solid @gradeAshFive;
        font-size: 0;
        .modal-form-row {
          // padding: 0;
          height: @num30;
          &>.ivu-form-item-label {
            padding: @num10 @num10 0 0;
            text-align: justify;
            &::after {
              content: "";
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
          }
          // .ivu-form-item:nth-last-of-type {
          //   margin-bottom: 0;
          // }
        }
        .first-row {
          display: inline-block;
          .ivu-input {
            width: 128px;
          }
        }
        .first-row:nth-child(1) {
          padding-right: @num30;
        }
        .first-row:nth-child(2) {
          padding-left: 0;
          padding-right: 0;
        }
        .second-row {
          display: inline-block;
          .ivu-select-selection {
            width: 128px;
          }
          .ivu-input {
            width: 128px;
          }
        }
        #second-row-left {
          padding-right: @num30;
        }
        #second-row-right {
          padding-left: 0;
          padding-right: 0;
        }
        .three-row {
          display: inline-block;
          .ivu-form-item-content {
            width: 385px;
            overflow: hidden;
          }
          .ivu-input-wrapper {
            width: 100%;
          }
        }
        #three-row-left {
          padding-right: @num30;
        }
        #three-row-right {
          padding-left: 0;
          padding-right: 0;
        }
        .four-row {
          display: inline-block;
          .ivu-select {
            width: 128px;
          }
          .ivu-input {
            width: 128px;
          }
        }
        #four-row-left {
          padding-right: @num30;
        }
        #four-row-right {
          padding-left: 0;
          padding-right: 0;
        }
      }
    }
    .partTwo {
      padding-top: @num20;
      border-top: 1px solid @gradeAshFive;
      // .modal-form {
        // font-size: 0;
        // border-bottom: 1px solid @gradeAshFive;
        .modal-form-row {
          padding: 0;
          height: 30px;
          &>.ivu-form-item-label {
            padding: @num10 @num10 0 0;
            text-align: justify;
            &::after {
              content: "";
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
          }
        }
        .first-row {
        //   display: inline-block;
        //   .ivu-form-item-content {
        //     width: 128px;
        //     overflow: hidden;
        //   }
        //   .ivu-input-number-input-wrap {
        //     width: 100%;
        //   }
        }
        // .first-row:nth-child(1) {
        //   padding-right: @num30;
        // }
        // .first-row:nth-child(2) {
        //   padding-left: 0;
        //   padding-right: 0;
        // }
        .second-row {
          display: inline-block;
          .ivu-input {
            width: 128px;
          }
        }
        #low_limit_woman {
          padding-right: @num30;
        }
        #upper_limit_woman {
          padding-left: 0;
          padding-right: 0;
        }
        .third-row {
          display: inline-block;
          .ivu-input {
            width: 128px;
          }
        }
        .six-row {
          display: inline-block;
          .ivu-input {
            width: 128px;
          }
        }
        #min_val {
          padding-right: @num30;
        }
        #max_val {
          padding-left: 0;
          padding-right: 0;
        }
        .four-row {
          display: inline-block;
          .ivu-form-item-content {
            width: 128px;
          }
        }
        #low_side {
          padding-right: @num30;
        }
        #upper_side {
          padding-left: 0;
          padding-right: 0;
        }
        .seven-row {
          height: 40px!important;
          line-height: 40px;
          .ivu-form-item-content {
            background: @gradeBlueFive;
          }
          .ivu-form-item-label {
            height: 40px;
            padding-top: 15px!important;
          }
          .ivu-select {
            display: inline-block;
            width: 50px;
            box-sizing: border-box;
            font-family: MicrosoftYaHei;
            font-size: @font12;
            color: @gradeAshTwo;
            letter-spacing: 0;
            position: relative;
            top: -2px;
          }
          .seven-row-span {
            display: inline-block;
            height: 40px;
            line-height: 40px;
            margin: 0 10px;
          }
        }
      // }
    }
    .partThree {
      padding-top: @num20;
      // padding-bottom: 20px;
      border-top: 1px solid @gradeAshFive;
      width: 100%;
      .modal-form {
        font-size: 0;
        .modal-form-row {
          padding: 0;
          height: 30px;
          &>.ivu-form-item-label {
            padding: @num10 @num10 0 0;
            text-align: justify;
            &::after {
              content: "";
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
          }
        }
        .three-row{
          margin-bottom: 47px!important;
        }
      }
    }
  }
  .selectionRequired {
    .ivu-select-selection {
      position: relative;
    }
    .ivu-select-selection:after {
      content: '*';
      color: red;
      position: absolute;
      right: 20px;
      top: 2px;
      font-size: 16px;
    }
  }
}
</style>

