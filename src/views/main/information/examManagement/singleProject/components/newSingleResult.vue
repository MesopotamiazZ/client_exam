<template>
    <div class="add-single-project-result" v-if='modaAddSingle'>
        <Modal v-model="modaAddSingle" 
          :styles='{width:472+"px"}'
          :transition-names='[]'
          :mask-closable="false"
          :transfer='false'
          :closable="false">
          <div slot="header">
            <alert-header :headerText='"新增单项结果"' @alert-retrun-num='editSort' :headerVal='addSingle.sort'></alert-header>
          </div>
          <div class="edit-body">
            <Form
              ref='addForm'
              :model="addSingle"
              :rules="addSingleRule">
              <div class="edit-single-project paddingL20 paddingR20 paddingT20 paddingB20">
                <ul>
                  <li>
                    <span class="edit-project-list-title fl textJustify marginR10">检查所见</span>
                    <div class="fl edit-project-list-input edit-project-list-inputR ">
                    <FormItem prop="see">
                        <Input :class='{inputVerificationTs: isEmpty(addSingle.see)}' type="textarea" v-model.trim="addSingle.see"></Input>
                    </FormItem>
                    </div>
                  </li>
                  <li>
                    <span class="edit-project-list-title fl textJustify marginR10">检查结果</span>
                    <div class="fl edit-project-list-input edit-project-list-inputR ">
                    <FormItem prop="result">
                        <Input :class='{inputVerificationTs: isEmpty(addSingle.result)}' type="textarea" v-model.trim="addSingle.result"></Input>
                    </FormItem>
                    </div>
                  </li>
                  <li>
                    <span class="edit-project-list-title fl textJustify marginR10">适用体检类别</span>
                    <FormItem prop="pe_categories" class="fl edit-project-list-input edit-project-list-inputR">
                      <Select
                        :class="{selectVerificationTs: isEmpty(addSingle.pe_categories)}" 
                        ref="selecter"
                        v-model="addSingle.pe_categories" 
                        multiple
                        filterable placeholder="">
                        <li @click="selectAll" class="ivu-select-item" :class="{'ivu-select-item-selected':addSingle.pe_categories.length===chooseType.length}">全部</li>
                        <Option v-for="item in chooseType" :value="item.value" :key="item.value">{{item.label}}</Option>
                      </Select>
                    </FormItem>
                  </li>
                  <li class="fl" style="width: 100%;">
                    <Checkbox class="fr check-choose" v-model="addSingle.status" style="margin-right: 0px;" :true-value="1" :false-value="0">启用</Checkbox>
                    <Checkbox class="fr marginR15 check-choose" v-model="addSingle.in_brief_summary" :true-value="1" :false-value="0">加入小结</Checkbox>
                    <Checkbox class="fr marginR15 check-choose" @on-change="changeTo" v-model="addSingle.is_abn" :true-value="1" :false-value="0">是否异常</Checkbox>
                    <Checkbox class="fr marginR15 check-choose" v-model="addSingle.is_default_res" :true-value="1" :false-value="0">默认结果</Checkbox>
                  </li>
                  <div class="clearBoth"></div>
                </ul>
              </div>
            </Form>
          </div>

          <div slot='footer'>
            <div class="alert-footer-btn paddingB20">
              <Button type="ghost" class="fr marginR20" @click="addSingleQX">取 消</Button>
              <Button type="primary" class="fr marginR20" @click="addSingleBC">保 存</Button>
              <div class="clearBoth"></div>
            </div>
          </div>
        </Modal>
    </div>
</template>

<script>
export default {
  name: 'amend-order',
  data() {
    return {
      addSingle: { // 编辑修改数据
        sort: this.newTotalSort,
        see: '', // 单目名称
        result: '',
        status: 1,
        in_brief_summary: 1,
        is_default_res: 1,
        is_abn: 1,
        pe_categories: [],
      },
      addSingleRule: { // 编辑验证规则
        see: [// 检测所见
          {
            required: true,
            message: '检查所见不能为空',
            type: 'string',
            trigger: 'blur',
          },
        ],
        result: [ // 检查结果
          {
            required: true, message: '检查结果不能为空', type: 'string', trigger: 'blur',
          },
        ],
        pe_categories: [
          {
            validator: (rule, value, callback) => {
              if (Array.isArray(value) && value.length > 0) {
                callback()
              } else {
                callback(new Error('适用体检类别不能为空'))
              }
            },
          },
        ],
      },
    }
  },
  watch: {
    newTotalSort(val) {
      this.addSingle.sort = val
    },
    modaAddSingle(val) {
      if (!val) {
        this.addSingle = { // 编辑修改数据
          sort: this.newTotalSort,
          see: '', // 单目名称
          result: '',
          pe_categories: [],
          status: 1,
          in_brief_summary: 1,
          is_default_res: 1,
          is_abn: 1,
        }
      }
    },
  },
  props: {
    modaAddSingle: {
      type: Boolean,
      default: false,
    },
    newTotalSort: {
      type: Number,
      default: 0,
    },
    chooseType: {// 适用体检类别
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    editSort() {
      this.$emit('alert-retrun-num')
    },
    selectAll() {
      if (this.addSingle.pe_categories.length === this.chooseType.length) {
        this.addSingle.pe_categories = []
      } else {
        this.addSingle.pe_categories = this.chooseType.map(item => {
          return item.value
        })
      }
      this.$refs.selecter.$refs.dropdown.update()
    },
    changeTo() {
      if (this.addSingle.is_abn === 0) {
        this.addSingle.in_brief_summary = 0
      } else {
        this.addSingle.in_brief_summary = 1
      }
    },
    isEmpty (data) {
      if (data === '' || !data.length) {
        return true
      } else {
        return false
      }
    },
    async addSingleQX() {
      await this.$emit('add-single-qx')
    },
    async addSingleBC() {
      if (await this.$refs.addForm.validate()) {
        await this.$emit('add-single-bc', this.addSingle)
      }
    },
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .add-single-project-result{
    // .ivu-select-multiple .ivu-select-selection {
    //   max-height: 100px;
    //   overflow: auto;
    // }
    .ivu-select-dropdown{
      max-height: 190px;
    }
    .edit-project-list-title {
      width: 72px;
      height: 32px;
      line-height: 32px;
      display: inline-block;
      color: #737373;
    }
    .edit-project-list-input {
      width: 350px;
      position: relative;
    }
    .check-choose{
        color: #737373;
        line-height: 16px;
    }
  }
</style>