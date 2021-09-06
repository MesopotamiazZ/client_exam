/** 
* @author ljl
* @date 2018/03/09
* @content 个人主页
*/ 
<template>
  <div class="personal-page-page">
    <!-- 主页面 -->
    <div class="unitPhysicalexamOrderDetail-main">
      <bread :firstTitle="firstTitle"
             class="main-bread"
             :secondTitle="'个人主页'"
             @button-first="backToHome"></bread>
      <div class="unitPhysicalexamOrderDetail-main-content contentBg">
        <div class="unitPhysicalexamOrderDetail-main-content-wrapper">
          <div class="content-title fr">
            <z-button ZBtype="primary"
                      v-if="changeInfo"
                      @click="saveChange"
                      class="fr marginR20">保 存</z-button>
            <z-button ZBtype="primary"
                      v-if="!changeInfo"
                      @click="changeInfo=true"
                      class="fr marginR20">修改信息</z-button>
            <z-button ZBtype="ghost"
                      @click="changeUpdataVipModalPer"
                      class="fr marginR10">升级VIP</z-button>
            <z-button ZBtype="ghost"
                      @click="changeAccountWithdrawalPer"
                      class="fr marginR10">提 现</z-button>
            <z-button ZBtype="ghost"
                      @click="changeAccountRecharge"
                      class="fr marginR10">充 值</z-button>
            <z-button ZBtype="ghost"
                      @click="changePayPsd"
                      class="fr marginR10">修改支付密码</z-button>
            <z-button ZBtype="ghost"
                      @click="changeAuthentication"
                      v-if="!changeInfo"
                      class="fr marginR10">认 证</z-button>
            <z-button ZBtype="ghost"
                      @click="changeEditPhone"
                      v-if="changeInfo"
                      class="fr marginR10">修改验证手机</z-button>
            <z-button ZBtype="ghost"
                      @click="gotoHealthyRecord"
                      class="fr marginR10">健康档案</z-button>
            <z-button ZBtype="ghost"
                      @click="printChangeRecord"
                      class="fr marginR10">导出变动记录</z-button>
          </div>
          <div class="clearBoth"></div>
          <div class="content-total">
            <div class="content-head">个人信息</div>
            <div>
              <div class="avatar fl"
                   :style="{'background-image': `url(${userAvatar})`}">
                <div class="editAvatar" v-if="changeInfo"
                     @click="addPhoto">
                  <span>编辑头像</span>
                </div>
              </div>
              <div class="fl avatar-center" v-if="changeInfo">
                <Form ref='editData'
                      :model="editData"
                      :rules="editRule">
                  <div class="left-name"
                       style="width:24px;margin-left:24px;">姓名</div>
                  <FormItem style="display:inline-block"
                            prop="name">
                    <Input v-model.trim="editData.name"
                           class="right-input"
                           :class='{inputVerificationTs: isEmpty(editData.name)}'
                           style="width: 112px;" />
                  </FormItem>
                  <div class="left-name"
                       style="width:24px;margin-left:21px;">年龄</div>
                  <FormItem style="display:inline-block" class="age"
                            prop="age">
                    <Input v-model.trim="editData.age"
                           class="right-input"
                           :class='{inputVerificationTs: isEmpty(editData.age)}'
                           style="width: 66px;" />
                  </FormItem>
                  <div class="left-name"
                       style="width:24px;margin-left:21px;">性别</div>
                  <FormItem style="display:inline-block"
                            prop="sex">
                    <Select :class="{selectVerificationTs: isEmpty(editData.sex)}"
                            v-model.trim="editData.sex"
                            class="right-input"
                            style="width: 82px;"
                            filterable
                            placeholder="">
                      <Option v-for="item in sexChoose"
                              :value="item.value"
                              :key="item.value">{{item.label}}</Option>
                    </Select>
                  </FormItem>
                  <div class="left-name"
                       style="margin-left:21px;">出生日期</div>
                  <FormItem style="display:inline-block"
                            prop="date">
                    <DatePicker type="date"
                                style="width: 214px"
                                :class="{selectVerificationTs: isEmpty(editData.date)}"
                                v-model.trim="editData.date"></DatePicker>
                  </FormItem>
                  <div class="left-name">身份证号</div>
                  <FormItem style="display:inline-block"
                            prop="card">
                    <Input v-model.trim="editData.card"
                           class="right-input"
                           :class='{inputVerificationTs: isEmpty(editData.card)}'
                           style="width: 302px;" />
                  </FormItem>
                  <div class="left-name"
                       style="margin-left:21px;">手机号码</div>
                  <FormItem style="display:inline-block">
                    <Input v-model.trim="editData.mobail"
                           class="right-input"
                           style="width: 290px;" />
                  </FormItem>
                  <div class="left-name">工作单位</div>
                  <FormItem style="display:inline-block">
                    <Input v-model.trim="editData.unit_name"
                           class="right-input"
                           style="width: 302px;" />
                  </FormItem>
                  <div class="left-name"
                       style="margin-left:45px;width:24px;">备注</div>
                  <FormItem style="display:inline-block">
                    <Input v-model.trim="editData.remark"
                           class="right-input"
                           style="width: 290px;" />
                  </FormItem>
                </Form>
              </div>
              <div class="fl avatar-right" v-if="changeInfo">
                <div>个人档案编号：<span>{{editData.count}}</span></div>
                <div>历史体检记录：<span>{{editData.time}}次</span></div>
              </div>
              <div class="amount fl" v-if="!changeInfo">
                  <ul>
                    <li class="fl">
                      <div class="fl">姓名：<span>{{editData.name}}</span></div>
                      <div class="fl">年龄：<span>{{editData.age}}</span></div>
                      <div class="fl">性别：<span>{{editData.sex}}</span></div>
                      <div class="fl">出生日期：<span>1995-03-01</span></div>
                    </li>
                    <li class="fl">
                      <div class="fl">身份证号：<span>{{editData.card}}</span></div>
                      <div class="fl">手机号码：<span>{{editData.mobail}}</span></div>
                      <div class="fl">个人档案编号：<span>{{editData.count}}</span></div>
                    </li>
                    <li class="fl">
                      <div class="fl">单位名称：<span>{{editData.unit_name}}</span></div>
                      <div class="fl">历史体检次数：<span>{{editData.time}}</span></div>
                    </li>
                    <li class="fl">
                      <div class="fl">备注：<span>{{editData.remark}}</span></div>
                    </li>
                    <div class="clearBoth"></div>
                  </ul>
                </div>
            </div>
          </div>
          <div class="content-table">
            <div class="content-table-top">
              <div class="content-head fl" style="margin-bottom:0px;">个人账户信息</div>
              <div class="fl" style="margin-left:72px;">个人账户编号：<span>123123123</span></div>
              <div class="fl" style="margin-left:72px;">账户余额：<span>11.00元</span></div>
              <div class="clearBoth"></div>
            </div>
            <div class="header-wrapper">
              <div class="eap-header">
                <title-has-slot>
                  <span slot="titletHasSlotLeftTitle">账户变动记录</span>
                  <search-input
                    :searchWidth="192"
                    class="fr"
                    searText="请输入搜索内容"
                    @on-enter="search"
                    @on-Icon="search"
                    @on-cancel="search">
                  </search-input>
                </title-has-slot>
              </div>
              <div class="contently" ref="contentTable">
                <q-table
                  ref="zBaseInfoTable"
                  :columns="columns"
                  :data="data"
                  :isShowSelectOrIndex="false"
                  :showOperateColumn="false"
                  >
                </q-table>
              </div>
            </div>
            
          </div>
          <!-- 修改支付密码 -->
          <editUnitPay
            :editUnitPayModal="editUnitPayModal"
            @cancel="editUnitPayModal=false"
            @send="sureChangePayPsd"
            @reset-psd="changeResetEditUnitPay"
          ></editUnitPay>
          <!-- 认证 -->
          <authentication
            :authenticationModal="authenticationModal"
            @cancel="authenticationModal=false"
            @send="sureAuthentication"
          ></authentication>
          <!-- 重置支付密码 -->
          <resetEditUnitPay
            :resetEditUnitPayModal="resetEditUnitPayModal"
            @cancel="cancelResetEditUnitPay"
            @send="sureResetEditUnitPay"
          ></resetEditUnitPay>
          <!-- 修改验证手机 -->
          <editPhone 
            :ifShowModal="editPhone"
            @cancel-data="editPhone=false"
            @commit-data="sureEditPhone"
            @reset-phone="resetEditPhone"
          ></editPhone>
          <!-- 重置验证手机 -->
          <resetPhone 
            :ifShowModal="resetPhone"
            @cancel-data="calcelResetPhone"
            @commit-data="sureResetPhone"
          ></resetPhone>
          <!-- 账户充值 -->
          <accountRecharge 
            :modelRechargeVip="accountRecharge"
            @cancel="accountRecharge=false"
            @commit-data="sureAccountRecharge"
          ></accountRecharge>
          <!-- 账户提现 -->
          <accountWithdrawalPer 
            :controlModal="accountWithdrawalPer"
            @cancel-data="accountWithdrawalPer=false"
            @commit-data="sureAccountWithdrawalPer"
          ></accountWithdrawalPer>
          <!-- 升级VIP -->
          <updataVipModalPer 
            :modelRechargeVip="updataVipModalPer"
            @rechargeVipSure="sureUpdataVipModalPer"
            @cancel-data="updataVipModalPer=false"
          ></updataVipModalPer>
          <!-- 编辑头像 -->
          <photo-modal :photoModal.sync='photoModal'
                      @take-photo='takePhotoOne'></photo-modal>
          <add-photo-modal :addPhotoModal.sync='addPhotoModal'
                          @take-photo='takePhoto'
                          @save-photo='savePhoto'></add-photo-modal>
          <!-- 主页面 -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import bread from '@/views/main/prepare/components/bread'
import editUnitPay from './components/modal/editUnitPay'
import authentication from '../../components/modal/authentication'
import resetEditUnitPay from './components/modal/resetEditUnitPay'
import editPhone from '../../components/modal/editPhone'
import resetPhone from '../../components/modal/resetPhone'
import accountRecharge from './components/modal/accountRecharge'
import accountWithdrawalPer from './components/modal/accountWithdrawalPer'
import updataVipModalPer from './components/modal/updataVipModalPer'
import photoModal from '@/views/main/prepare/components/modal/photoModal'
import addPhotoModal from '@/views/main/prepare/components/modal/addPhotoModal'
import * as types from '@/store/types'
import dateFilter from '@/fifters/dateFilter.js'
// import config from '@/../static/config.json'
// import moment from 'moment'
export default {
  name: 'personalPage',
  components: {
    bread,
    editUnitPay,
    authentication,
    resetEditUnitPay,
    editPhone,
    resetPhone,
    accountRecharge,
    accountWithdrawalPer,
    updataVipModalPer,
    photoModal,
    addPhotoModal,
    dateFilter,
  },
  data() {
    return {
      changeInfo: true,
      addPhotoModal: false,
      photoModal: false,
      updataVipModalPer: false,
      accountWithdrawalPer: false,
      accountRecharge: false,
      resetPhone: false,
      editPhone: false,
      editUnitPayModal: false,
      authenticationModal: false,
      resetEditUnitPayModal: false,
      name: '',
      defaultAvatar: '/static/images/public/default_avatar.svg',
      editData: {
        name: '张若迪',
        age: '23',
        sex: 1,
        date: '1995-03-02',
        card: '510182199503021145',
        mobail: '13433916485',
        unit_name: '四川小蓝科技',
        remark: '无',
        count: '21846495',
        time: '5',
      },
      editRule: {
        name: [
          {
            required: true,
            message: '姓名不能为空',
            type: 'string',
            trigger: 'blur',
          },
        ],
        age: [
          {
            required: true,
            message: '年龄不能为空',
            type: 'string',
            trigger: 'blur',
          },
        ],
        sex: [
          {
            required: true,
            message: '性别不能为空',
            type: 'number',
            trigger: 'change',
          },
        ],
        date: [
          {
            required: true,
            message: '出生日期不能为空',
            type: 'date',
            trigger: 'change',
          },
        ],
        card: [
          {
            required: true,
            message: '身份证号不能为空',
            type: 'string',
            trigger: 'blur',
          },
        ],
      },
      sexChoose: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
      ],
      columns: [
        {
          title: '个人结算单号',
          key: 'name',
          align: 'center',
          ellipsis: true,
          minWidth: 160,
          // render: ()
        },
        {
          title: '体检号',
          key: 'tjh',
          align: 'center',
          ellipsis: true,
          minWidth: 120,
        },
        {
          title: '姓名',
          key: 'xm',
          align: 'center',
          ellipsis: true,
          minWidth: 110,
        }, {
          title: '变动类型',
          key: 'bdjl',
          align: 'center',
          ellipsis: true,
          minWidth: 100,
        }, {
          title: '摘要',
          key: 'zy',
          align: 'center',
          ellipsis: true,
          minWidth: 100,
        }, {
          title: '变动金额',
          key: 'bdje',
          align: 'center',
          ellipsis: true,
          minWidth: 129,
        }, {
          title: '账户余额',
          key: 'zhye',
          align: 'center',
          ellipsis: true,
          minWidth: 129,
        }, {
          title: '操作人',
          key: 'czr',
          align: 'center',
          ellipsis: true,
          minWidth: 110,
        },
        {
          title: '变动日期',
          key: 'bdrq',
          align: 'center',
          ellipsis: true,
          minWidth: 110,
        }, {
          title: '备注',
          key: 'remark',
          align: 'center',
          ellipsis: true,
          minWidth: 70,
        },
      ],
      data: [
        {
          name: 620403001002,
          tjh: '1702030002',
          xm: '王树彤',
          bdjl: '支出',
          zy: '提现',
          bdje: '1000.00',
          zhye: '9983.00',
          czr: '王树彤',
          bdrq: '2017-09-23',
          remark: '',
        },
        {
          name: 620403001002,
          tjh: '1702030002',
          xm: '王树彤欣那',
          bdjl: '存入',
          zy: '在线充值',
          bdje: '784.00',
          zhye: '220.00',
          czr: '王树彤',
          bdrq: '2017-09-23',
          remark: '',
        },
        {
          name: 620403001002,
          tjh: '1702030002',
          xm: '王树彤',
          bdjl: '支出',
          zy: '退款',
          bdje: '784.00',
          zhye: '9983.00',
          czr: '王树彤',
          bdrq: '2017-09-23',
          remark: '',
        },
        {
          name: 62040300100,
          tjh: '1702030002',
          xm: '王树彤',
          bdjl: '存入',
          zy: '体检费',
          bdje: '784.00',
          zhye: '9983.00',
          czr: '王树彤',
          bdrq: '2017-09-23',
          remark: '',
        },
        {
          name: 62040300100,
          tjh: '1702030002',
          xm: '王树彤',
          bdjl: '支出',
          zy: '体检费',
          bdje: '784.00',
          zhye: '9983.00',
          czr: '王树彤',
          bdrq: '2017-09-23',
          remark: '',
        },
      ],
    }
  },
  props: {
    firstTitle: {
      type: String,
      default: '体检进度综合管理',
    },
  },
  computed: {
    userAvatar() {
      // if (this.customerForm.img) {
      //   return config.serverUrl + '/' + this.customerForm.img
      // }
      return this.defaultAvatar
    },
  },
  methods: {
    ...mapMutations({
      openPage: types.OPEN_PAGE,
      setCurPage: types.SET_CURRENT_PAGE_NAME,
    }),
    backToHome() {
      this.$emit('changeComponent', this.name)
    },
    // 添加头像
    addPhoto() {
      this.photoModal = true
    },
    isEmpty(data) {
      if (data === '' || data === '') {
        return true
      } else {
        return false
      }
    },
    search() {
      console.log('search')
    },
    gotoHealthyRecord() { // 健康档案
      this.$router.push({ name: 'healthRecord' })
      let temp = {}
      temp.name = 'healthRecord'
      temp.title = 'healthRecord'
      this.openPage(temp)
      this.setCurPage(temp.name)
    },
    changePayPsd() { // 修改支付密码
      this.editUnitPayModal = true
    },
    sureChangePayPsd() { // 修改支付密码
      this.editUnitPayModal = false
    },
    changeAuthentication() { // 认证
      this.authenticationModal = true
    },
    sureAuthentication() { // 认证
      this.authenticationModal = false
    },
    changeResetEditUnitPay() { // 重置支付密码
      this.resetEditUnitPayModal = true
      this.editUnitPayModal = false
    },
    sureResetEditUnitPay() { // 重置支付密码
      this.resetEditUnitPayModal = false
    },
    cancelResetEditUnitPay() {
      this.resetEditUnitPayModal = false
      this.editUnitPayModal = true
    },
    changeEditPhone() { // 重置支付密码
      this.editPhone = true
    },
    sureEditPhone() { // 修改验证手机
      this.editPhone = false
    },
    resetEditPhone() { // 修改验证手机
      this.editPhone = false
      this.resetPhone = true
    },
    sureResetPhone() { // 重置验证手机
      this.resetPhone = false
    },
    calcelResetPhone() {
      this.resetPhone = false
      this.editPhone = true
    },
    changeAccountRecharge() { // 账户充值
      this.accountRecharge = true
    },
    sureAccountRecharge() { // 账户充值
      this.accountRecharge = false
    },
    changeAccountWithdrawalPer() { // 账户提现
      this.accountWithdrawalPer = true
    },
    sureAccountWithdrawalPer() { // 账户提现
      this.accountWithdrawalPer = false
    },
    changeUpdataVipModalPer() { // 升级VIP
      this.updataVipModalPer = true
    },
    sureUpdataVipModalPer() { // 升级VIP
      this.updataVipModalPer = false
    },
    takePhotoOne(urldata) { // 编辑头像
      this.addPhotoModal = true
      this.photoModal = false
    },
    takePhoto() { // 编辑头像
      this.photoModal = true
      this.addPhotoModal = false
    },
    savePhoto() {
      this.addPhotoModal = false
    },
    printChangeRecord() { // 打印变动记录
      this.$refs.zBaseInfoTable.$refs.table.exportCsv({
        filename: '个人账户变动记录',
        columns: this.columns.filter((col, index) => index < 1000),
        data: this.data.filter((data, index) => index < 1000),
      })
    },
    async saveChange() {
      if (await this.$refs.editData.validate()) {
        this.changeInfo = false
      }
    },
  },
  mounted() {
    this.name = this.$parent.oldview
  },
}
</script>

<style lang="less">
@import (reference) '~assets/less/variable.less';
.personal-page-page {
  position: relative;
  margin: 0 auto;
  height: 100%;
  .unitPhysicalexamOrderDetail-main {
    padding: 40px @num10 @num10 @num10;
    width: 100%;
    height: 100%;
    position: relative;
    .main-bread {
      position: absolute;
      top: -3px;
    }
    .unitPhysicalexamOrderDetail-main-content {
      overflow: auto;
      height: 100%;
      .unitPhysicalexamOrderDetail-main-content-wrapper {
        min-width: 1180px;
        height: 100%;
        .content-title {
          padding: @num10 0 @num10 0;
          height: 60px;
        }
        .content-head {
          font-weight: bold;
          font-size: 13px;
          color: #4a4a4a;
          margin-bottom: 10px;
        }
        .content-total {
          height: 190px;
          width: calc(~'100%-40px');
          margin: 0 20px 10px 20px;
          border-bottom: 1px solid #d9d9d9;
          .avatar {
            height: 140px;
            width: 114px;
            border: 1px solid #008cee;
            background-repeat: no-repeat;
            background-size: 100%;
            position: relative;
            .editAvatar {
              width: 100%;
              height: @num20;
              line-height: @num20;
              color: @gradeBlueOne;
              background: #ffffff;
              opacity: 0.8;
              position: absolute;
              bottom: 0;
              cursor: pointer;
              text-align: center;
            }
          }
          .avatar-center {
            width: 779px;
            padding: 0 20px;
            .left-name {
              vertical-align: top;
              line-height: 30px;
              height: 30px;
              overflow: hidden;
              margin-right: 6px;
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
            .age{
              .ivu-form-item-error-tip {
                left: -6px;
              }
            }
            .right-input {
              display: inline-block;
              vertical-align: top;
            }
          }
          .avatar-right{
            div{
              line-height:30px;
              margin-bottom:20px;
              font-size: 14px;
              color: #797979;
              >span{
                color: #4A4A4A;
              }
            }
          }
          .amount {
            margin-left:20px;
            font-size: @font12;
            width:calc(~'100% - 154px') ;
            ul {
              margin-top:-14px;
              width:100%;
              li {
                width:100%;
                height: 40px;
                line-height: 40px;
                border-bottom: 1px dashed #d9d9d9;
                div{
                  margin-right: 40px;
                  span{
                    font-size: 14px;
                    color: #4A4A4A;
                  }
                }
              }
              li:last-child{
                border-bottom: none;
              }
            }
          }
        }
        .content-table {
          padding:0 20px;
          height: calc(~'100% - 280px');
          overflow: hidden;
          .content-table-top{
            line-height:14px;
            margin-top:10px;
            span{
              line-height:14px;
              color: #4A4A4A;
              font-size: 14px;
            }
          }
          .header-wrapper {
            width: 100%;
            height: calc(~'100% - 45px');
            margin: 15px auto;
            border-radius: 8px;
            position: relative;
            background: #ffffff;
            border: 1px solid #d9d9d9;
            color: #111111;
            box-shadow: 0 2px 15px 0 rgba(206, 213, 242, 0.5);
            overflow: hidden;
          }
          .eap-header {
            position: relative;
            .titlet-slot-left {
              .start-state {
                line-height: 30px;
                font-size: 12px;
                color: @gradeAshThree;
                margin-right: 10px;
              }
            }
          }
          .contently {
            height: calc(~'100% - 50px');
            
          }
        }
      }
    }
  }
}
</style>
