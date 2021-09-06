/**
 * Created 刘佳莉
 * Date: 2017/11/28/
 * content:采样状态管理 
 */
<template>
  <div class="sampling-state-wrapper">
    <div class="sampling-state">
      <title-has-slot>
        <span slot='titletHasSlotLeftTitle'>采样状态列表</span>
        <div slot='titletHasSlotRightContent' class="titlet-has-slot-right-content">
          <div class="fl">
            <span class="start-state">启用状态</span>
            <Select v-model="valueStartState" style="width:92px" class="marginR10" placeholder="全部" :filterable='true'>
              <Option v-for="item in valueStartStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <search-input  :searchWidth="160" :searText="'采样状态'" @on-enter='searchByKey' 
              @on-Icon='searchByKey' @on-cancel='searchByKey'>
            </search-input> 
          </div>
          <Button type="ghost" class="fl marginR10" @click="addType" v-show="!selectMode">新 增</Button>
          <Button type="ghost" class="fl" @click="toggleMode" v-show="!selectMode">选 择</Button>
          <Button type="success" class="fl marginR10" @click="deleteClick" v-show="selectMode" :disabled="isdisabled">删 除</Button>
          <Button type="ghost" class="fl marginR10" v-show="selectMode">打 印</Button>
          <Button type="primary" class="fl" @click="toggleMode" v-show="selectMode">取 消</Button>
        </div>
      </title-has-slot>
      <div class="table"  ref="tabelContent">
        <!-- <z-base-info-table
          ref="zBaseInfoTable"
          :columns="columns"
          :data="SamplingTypeFilter"
          :height="tableHeight"
          :requestDataApi="getSamplingState"
          :isSelectMode="selectMode"
          :pageInfo="pageInfo"
          :ifEdit="ifEdit"
          :params="params"
          @on-row-click="editRow"
          @cancle-row ="deSelect"
          @edit-row="editRowR"
          @delete-row="deleteRow"
          @on-selection-change="selectChange"
          @edit-btn-selectData='editRowR'
          @del-btn-selectData='listDelRow'
          @on-change='onChange'
          @on-page-size-change='onPageSizeChange'>
        </z-base-info-table> -->
      </div>
    </div>

    <!--新增对话框-->
    <div class="sure-to-add" v-if='handleAdd'>
      <Modal 
        v-model="handleAdd" 
        width="352" 
        height="170"
        :transfer='false' 
        :closable="false" 
        :mask-closable="false" 
        :transition-names="['']">
        <div slot="header">
          <alert-header :headerText='headerTextxz' :headerVal="valueAddHeaderVal"  @alert-retrun-num='alertRetrunNumAdd'></alert-header>
        </div>
        <Form ref="addFormValidate" :model="formValidate" :rules="ruleValidate">
          <div class="ybzt marginB20 marginT20" style="height:30px;">
            <p class="middlezt fl">采样状态</p>
            <FormItem prop="addmsg" class="ill-message-left">
              <Input placeholder="请输入" v-model.trim="formValidate.addmsg" style="width:254px;" :class="{inputVerificationTs: isEmpty(formValidate.addmsg)}"></Input>
            </FormItem>
          </div>
          <div class="ybzt" style="height:75px;">
            <p class="middlezt fl">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</p>
            <div>
                <Input v-model="formValidate.addRemark" type="textarea" placeholder="" class="result"/>
            </div>
          </div>
        </Form>
        <div slot="footer" style="height:50px;">
          <Button type="ghost" class="button-in" @click="cancel" type="ghost">取 消</Button>
          <Button type="primary" class="button-in" type="ghost" @click="save">保 存</Button>
          <Checkbox v-model="valueAddStart"  class="checkbox">启用</Checkbox>
        </div>
      </Modal>
    </div>

    <!--编辑对话框-->
    <div class="sure-to-write" v-if="handleChange">
      <Modal 
        v-model="handleChange"
        width="352" 
        height="271"
        :transfer='false' 
        :closable="false" 
        :mask-closable="false" 
        :transition-names="['']">
        <div slot="header">
          <alert-header :headerText='headerTextbjtj' :headerVal="valueEditHeaderVal" @alert-retrun-num='alertRetrunNumEdit'></alert-header>
        </div>
         <Form ref="editFormValidate" :model="formEditValidate" :rules="ruleEditValidate">
          <div class="ybzt marginB20 marginT20" style="height:30px;">
            <p class="middlezt fl">采样状态</p>
            <FormItem prop="editmsg" class="ill-message-left">
              <Input placeholder="请输入" v-model.trim="formEditValidate.editmsg" style="width:254px;" 
                :class="{inputVerificationTs: isEmpty(formEditValidate.editmsg)}">
              </Input>
            </FormItem>
          </div>
          <div class="ybzt" style="height:75px;">
            <p class="middlezt fl">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</p>
            <div>
                <Input v-model="formEditValidate.editRemark" type="textarea" placeholder="" class="result"/>
            </div>
          </div>
        </Form>
        <div class="time"><span>最后修改人：{{kind.realname}}</span><span>最后修改时间：{{kind.updated_at}}</span></div>
        <div slot="footer"  style="height:50px;width:100%;clear:both;">
          <Button type="ghost" class="button-in" @click="cancelThis" type="ghost" >取 消</Button>
          <Button type="primary"  class="button-in" @click="bc" type="ghost">保 存</Button>
          <Checkbox v-model="valueEditStart"  class="checkbox">启用</Checkbox>
        </div>
      </Modal>
    </div>
    
    <!--确认删除对话框-->
    <affirm-del-modal :controlModal="handleDelete" :delCounts="count" @delCancel="cancelSure"
      @affirmDel="SureToCancel">
    </affirm-del-modal>
  </div>
</template>
<script>
import {mapState, mapActions, mapGetters} from 'vuex'

export default {
  name: 'samplingState',
  data() {
    return {
      addShowNumber: 0,
      tableHeight: 400,
      formValidate: {
        addmsg: '',
        addRemark: '',
      },
      formEditValidate: {
        editmsg: '',
        editRemark: '',
      },
      ruleValidate: {
        addmsg: [{required: true, message: '采样状态不能为空', trigger: 'blur'}],
      },
      ruleEditValidate: {
        editmsg: [{required: true, message: '采样状态不能为空', trigger: 'blur'}],
      },
      valueEditStart: 0,
      valueAddStart: 0,
      kind: ' ',
      count: 1,
      valueAddHeaderVal: 0,
      valueEditHeaderVal: 0,
      isdisabled: true,
      selectData: null,
      selectMode: false,
      ifEdit: true,
      headerTextbjtj: '编辑采样状态',
      headerTextts: '提示',
      headerTextxz: '新增采样状态',
      handleAdd: false,
      handleChange: false,
      handleDelete: false,
      totalSize: 0,
      searchIn: '',
      message: '',
      tishi: '*',
      succState: true,
      errState: false,
      isEdit: false, // 是否选中一行
      lists: '',
      editNewReason: {},
      valueSearrchName: '',
      valueStartState: 2,
      valueStartStateList: [
        {
          label: '全部',
          value: 2,
        },
        {
          label: '启用',
          value: 1,
        },
        {
          label: '未启用',
          value: 0,
        },
      ],
      columns: [
        {
          title: '采样状态',
          key: 'sample_status',
          renderer: 'html',
          ellipsis: true,
        },
        {
          title: '备注',
          key: 'remark',
          ellipsis: true,
          renderer: 'html' },
        {
          title: '启用',
          key: 'status',
          className: 'htCenter htMiddle',
          readOnly: true,
          ellipsis: true,
          width: 60,
          render: (h, params) => {
            if (params.row.status === 1) {
              return h('div', [
                h('div', {
                  style: {
                    margin: '0 auto',
                    background: "url('/static/icons/public/success.png') no-repeat",
                    width: '16px',
                    height: '16px',
                  },
                }),
              ])
            }
          },
        },
        {
          title: '显示顺序',
          key: 'sort',
          width: 70,
          readOnly: true,
        },
      ],
    }
  },
  methods: {
    ...mapActions('samplingStateModule', [
      'getSamplingState',
      'createSamplingState',
      'deleteSampleState',
      'writeSampleState',
    ]
      ),
    alertRetrunNumAdd(data) {
      this.valueAddHeaderVal = data
    },
      // 编辑显示顺序的回调
    alertRetrunNumEdit(data) {
      this.valueEditHeaderVal = data
    },
    isEmpty (data) {
      if (data === '') {
        return true
      } else {
        return false
      }
    },
    onChange(page) {
      this.selectData = null
      this.isdisabled = true
    },
    onPageSizeChange(pageSize) {
      this.selectData = null
      this.isdisabled = true
    },
    toggleMode() {
      this.selectMode = !this.selectMode
    },
    async save() {
      if (await this.$refs.addFormValidate.validate()) {
        let params = {
          sort: this.valueAddHeaderVal,
          sample_status: this.formValidate.addmsg,
          remark: this.formValidate.addRemark,
          status: Number(this.valueAddStart),
        }
        await this.createSamplingState(params)
        await this.$refs.zBaseInfoTable.request()
        this.handleAdd = false
        this.valueAddHeaderVal = Number(this.addShowNumber) + 1
      }
    },
    editRow (data) {
      this.message = data.sample_status
      this.editNewReason.sample_status = data.sample_status
      this.editNewReason.id = data.id
    },
    editRowR(data) {
      this.valueEditHeaderVal = data.sort
      this.formEditValidate.editmsg = data.sample_status
      this.formEditValidate.editRemark = data.remark
      this.kind = data
      if (data.status === 1) {
        this.valueEditStart = true
      } else {
        this.valueEditStart = false
      }
      this.message = this.editNewReason.sample_status
      this.handleChange = true
    },
    deSelect () {
      this.formEditValidate.editmsg = null
    },
    cancel() {
      this.handleAdd = false
      this.valueAddHeaderVal = this.addShowNumber
    },
    cancelAll() {
      this.handleChange = true
      this.handleDelete = true
      this.succState = true
      this.errState = false
    },
    cancelSure() {
      if (this.handleChange) {
        this.handleChange = true
        this.handleDelete = false
        this.succState = true
        this.errState = false
      } else {
        this.handleDelete = false
        this.succState = true
        this.errState = false
      }
    },
    async addType() {
      this.formValidate = {
        addmsg: '',
        addRemark: '',
      }
      this.handleAdd = true
      this.addShowNumber = this.valueAddHeaderVal
    },
    searchByKey(data) {
      this.valueSearrchName = data
      this.searchIn = data
      this.isdisabled = true
    }, // 模糊搜索
    async bc() {
      if (await this.$refs.editFormValidate.validate()) {
        let params = {
          id: this.kind.id,
          params: {
            sample_status: this.formEditValidate.editmsg,
            remark: this.formEditValidate.editRemark,
            status: Number(this.valueEditStart),
            sort: this.valueEditHeaderVal,
          },
        }
        console.log(params)
        await this.writeSampleState(params)
        await this.$refs.zBaseInfoTable.request()
        this.handleChange = false
        this.message = ''
      }
    },
    handleChange() {
      this.message = this.editNewReason.sample_status
    },
    cancelThis() {
      this.handleChange = false
      this.message = this.editNewReason.sample_status
    },
    async SureToCancel() {
      this.isdisabled = true
      let ids = []
      if (this.selectData && this.selectData.id) {
        await this.deleteSampleState({ids: this.selectData.id})
        this.selectData = false
      } else if (this.selectData && this.selectData[0].id) {
        for (let i in this.selectData) {
          ids.push(this.selectData[i].id)
        }
        await this.deleteSampleState(ids)
        this.selectData = false
      } else {
        await this.deleteSampleState(this.editNewReason.id)
      }
      this.handleChange = false
      this.handleDelete = false
      this.valueAddHeaderVal -= this.count
      if (this.pageInfo.total <= (this.pageInfo.page - 1) * this.pageInfo.page_size + this.count && this.pageInfo.page !== 1) {
        await this.$refs.zBaseInfoTable.request({page: this.pageInfo.page - 1}) // 重新请求页面数据
      } else {
        await this.$refs.zBaseInfoTable.request() // 重新请求页面数据
      }
      this.count = 1
    },
    deleteRow (data) {
      this.count = 1
      this.selectData = [data]
      this.handleDelete = true
    },
    editReason() {
      this.show = true
      this.alertHeaderText = this.headerText.edittext
      this.placeholderText = this.placeholder.edittext
      this.showDel = true
    },
    newReason() {
      this.show = true
      this.alertHeaderText = this.headerText.newttext
      this.placeholderText = this.placeholder.newttext
      this.showDel = false
    },
    deleteClick() {
      this.handleDelete = true
    },
    selectChange(data) {
      if (this.selectMode) {
        this.selectData = data
        this.count = this.selectData.length
        if (data.length >= 1) {
          this.isdisabled = false
        } else {
          this.isdisabled = true
        }
      }
    },
    listDelRow(data) {
      this.count = 1
      this.selectData = [data]
      this.handleDelete = true
    },
  },
  computed: {
    params() {
      //        启用时
      if (this.valueStartState === 1) {
        if (this.valueSearrchName) {
          return {
            key: this.valueSearrchName,
            status: 1,
          }
        } else {
          return {
            status: 1,
          }
        }
      //          未启用时
      } else if (this.valueStartState === 0) {
        if (this.valueSearrchName) {
          return {
            key: this.valueSearrchName,
            status: 0,
          }
        } else {
          return {
            status: 0,
          }
        }
      //          全部
      } else {
        if (this.valueSearrchName) {
          return {
            key: this.valueSearrchName,
          }
        } else {
          return {}
        }
      }
    },
    ...mapState('samplingStateModule', [
      'SamplingTypeList',
    ]),
    ...mapState(['windowHeight']),
    ...mapGetters('samplingStateModule', ['SamplingTypeFilter', 'pageInfo']),
  },
  async mounted () {
    await this.getSamplingState()
    this.valueAddHeaderVal = this.pageInfo.total + 1
    this.tableHeight = this.$refs.tabelContent.offsetHeight
  },
  activated() {
    this.tableHeight = this.$refs.tabelContent.offsetHeight
  },
  watch: {
    windowHeight() {
      this.tableHeight = this.$refs.tabelContent.offsetHeight
    },
  },
}
</script>
<style lang="less" scoped>
 @import "~assets/less/variable.less"; 
 .sampling-state-wrapper{
    width: 100%;
    height: 100%;
    padding: 10px;
    position: relative;
    textarea.ivu-input {
      padding-top: 5px!important;
    }
    .result{
      line-height: 20px;
      resize: none;
      height: 60px;
      width: 254px;
    }
    .titlet-has-slot-right-content{
      .start-state{
        float: left;
        line-height: 30px;
        font-size: 12px;
        color: @gradeAshThree;
        margin-right: 10px;
      }
    }
   .sampling-state{
      height: 100%;
      width:100%;
      position: relative;
      margin :auto;
      background: @contentBg;
      border: 1px solid @menuTreeLevel1ItemBorder;
      border-radius: 8px;
      box-shadow: 0 2px 15px 0 rgba(206,213,242,0.50);
      overflow: hidden;
    .table {
      height: calc(~'100% - 50px');
    }
  }
  .middlezt{
    margin-left: 20px;
    line-height: 30px;
    margin-right: 10px;
  }
  .btx{
    position: absolute;
    right: 32px;
    font-size: 14px;
    line-height: 30px;
    color: @tsIcon;
  }
  .button-in{
    width: 74px;
    margin-right:20px;
    margin-left: 0px;
    float: right;
  }
  .time{
    margin-bottom: 20px;
    font-size: 12px;
    color: @tagGroupText;
    position: relative;
    span{
      margin-left: 20px;
      display: block;
      float: left;
    }
    span:nth-child(2){
      margin-bottom:15px;
    }
  }
  .checkbox{
    line-height: 30px;
    margin-right:20px;
  }
  .ill-message-left{
    width:254px;
    float: left;
    position: relative;
    .xinghao{
      position: absolute;
      right: 2px;
      top:6px;
      font-size: 16px;
      color: @tsIcon;
    }
  }
 }
 .box {
    padding: @num15;
    height: 100%;
    .title {
      line-height: 17px;
      height: 17px;
      border-left: 3px solid @gradeBlueTwo;
      padding-left: 5px;
      font-size: 14px;
      color: @gradeAshOne;
      letter-spacing: 0.04px;
    }
  }

</style>