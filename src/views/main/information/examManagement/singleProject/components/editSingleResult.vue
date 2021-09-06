<template>
    <div class="edit-single-project-result" v-if="modaAddSingle">
        <Modal v-model="modaAddSingle" 
          :styles='{width:472+"px"}'
          :transition-names='[]'
          :mask-closable="false"
          :transfer='false'
          :closable="false">
          <div slot="header">
            <alert-header :headerText='"编辑单项结果"' @alert-retrun-num='editSort' :headerVal='newTotalSort'></alert-header>
          </div>
          <div class="edit-body">
            <Form
              ref='editForm'
              :model="editSingle"
              :rules="editSingleRule">
              <div class="edit-single-project paddingL20 paddingR20 paddingT20 paddingB20">
                <ul>
                  <li>
                    <span class="edit-project-list-title fl textJustify marginR10">检查所见</span>
                    <div class="fl edit-project-list-input edit-project-list-inputR ">
                    <FormItem prop="see">
                        <Input :class='{inputVerificationTs: isEmpty(editSingle.see)}' type="textarea" v-model.trim="editSingle.see"></Input>
                    </FormItem>
                    </div>
                  </li>
                  <li>
                    <span class="edit-project-list-title fl textJustify marginR10">检查结果</span>
                    <div class="fl edit-project-list-input edit-project-list-inputR ">
                    <FormItem prop="result">
                        <Input height=60 :class='{inputVerificationTs: isEmpty(editSingle.result)}' type="textarea" v-model.trim="editSingle.result"></Input>
                    </FormItem>
                    </div>
                  </li>
                  <li>
                    <span class="edit-project-list-title fl textJustify marginR10">适用体检类别</span>
                    <FormItem prop="pe_categories" class="fl edit-project-list-input edit-project-list-inputR">
                    <Select
                      ref="selecter"
                      v-model="editSingle.pe_categories" 
                      :class="{selectVerificationTs: isEmpty(editSingle.pe_categories)}"
                      multiple
                      filterable placeholder="">
                      <li @click="selectAll" class="ivu-select-item" :class="{'ivu-select-item-selected':editSingle.pe_categories.length===chooseType.length}">全部</li>
                      <Option v-for="item in chooseType" :value="item.value" :key="item.value">{{item.label}}</Option>
                    </Select>
                    </FormItem>
                  </li>
                  <li class="fl" style="width: 100%;">
                    <Checkbox class="fr check-choose" v-model="editSingle.status" style="margin-right: 0px;" :true-value="1" :false-value="0">启用</Checkbox>
                    <Checkbox class="fr marginR15 check-choose" v-model="editSingle.in_brief_summary" :true-value="1" :false-value="0">是否加入小结</Checkbox>
                    <Checkbox class="fr marginR15 check-choose" v-model="editSingle.is_default_res" :true-value="1" :false-value="0">默认结果</Checkbox>
                    <Checkbox class="fr marginR15 check-choose" v-model="editSingle.is_abn" :true-value="1" :false-value="0">是否异常</Checkbox>
                  </li>
                  <li class="fl marginT20" style="width: 100%;">
                    <p class='fl'>最后修改人：<span>{{editSingle.realname}}</span></p>
                    <p class='fl marginL20'>最后修改时间：<span>{{editSingle.updated_at}}</span></p>
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
import timeFilter from '@/fifters/timeFilter.js'
export default {
  name: 'amend-order',
  data() {
    return {
      editSingleSelf: { // 编辑修改数据
        see: '', // 单目名称
        result: '',
      },
      typeto: [],
      // chooseType: [
      //   {value: 0, label: 'hahaha'},
      //   {value: 1, label: 'wwwww'},
      //   {value: 2, label: 'ddddd'},
      //   {value: 3, label: 'ccccc'},
      //   {value: 4, label: 'ggggg'},
      //   {value: 5, label: 'hhhhh'},
      // ],
      newTotalSort: 0,
      editSingleRule: { // 编辑验证规则
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
  props: {
    modaAddSingle: {
      type: Boolean,
      default: false,
    },
    editSingle: { // 编辑修改数据
      type: Object,
      default: () => {
        return {
          sort: 0,
          see: '',
          result: '',
          pe_categories: null,
          status: 1,
          in_brief_summary: 1,
          is_default_res: 1,
          is_abn: 1,
          updated_at: '', // 最后修改时间
          realname: '',
        }
      },
    },
    chooseType: {// 适用体检类别
      type: Array,
      default: () => {
        return []
      },
    },
    // newTotalSort: {
    //   type: Number,
    //   default: 0,
    // },
  },
  watch: {
    chooseType(val) {
      // console.log(val)
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
    editSingle (val) {
      // console.log(val)
      this.newTotalSort = val.sort
      let peCategory = []
      for (let i in val.pe_categories) {
        peCategory.push(val.pe_categories[i].id)
      }
      // console.log(val.default_res_id)
      // console.log(val.id)
      if (val.default_res_id === val.id) {
        // console.log(1111)
        val.is_default_res = 1
      } else {
        // console.log(222)
        val.is_default_res = 0
      }
      console.log(val.is_default_res)
      // val.is_default_res
      this.editSingle.pe_categories = peCategory
      this.editSingle.updated_at = timeFilter(this.editSingle.updated_at)
      this.editSingle.realname = val.operater
    },
  },
  methods: {
    selectAll() {
      if (this.editSingle.pe_categories.length === this.chooseType.length) {
        this.editSingle.pe_categories = []
      } else {
        this.editSingle.pe_categories = this.chooseType.map(item => {
          return item.value
        })
      }
      this.$refs.selecter.$refs.dropdown.update()
    },
    editSort(data) {
      this.editSingle.sort = data
      // this.$emit('alert-retrun-num')
    },
    isEmpty (data) {
      if (data === '') {
        return true
      } else {
        return false
      }
    },
    addSingleQX() {
      this.$emit('add-single-qx')
    },
    async addSingleBC() {
      if (await this.$refs.editForm.validate()) {
        console.log(this.editSingle.is_default_res)
        console.log(this.editSingle)
        this.$emit('add-single-bc', this.editSingle)
      }
    },
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .edit-single-project-result{
    // .ivu-select-multiple .ivu-select-selection {
    //   max-height: 110px;
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