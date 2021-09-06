/**
* author      : yhy
* cteate      : 2018/03/02
* description : 单位账户详情
*/
<template>
  <div class="account-detail-home">
    <div class="wrapper ">
      <bread @button-first='buttonFirstBread'></bread>
      <div class="account-detail-home-content contentBg">
        <div class="info">
          <div class="unit-name">
            <div class="name">中国石油化工股份有限公司</div>
            <div class="bottom">
              <span>单位账户编号：GB7637473</span>
              <span>账户余额：
                <b>10000.00</b> 元</span>
            </div>
          </div>
          <div class="unit-button">
            <Button type="ghost" v-if="isButton" class="marginR10 " @click='buttonAttestation'>认 证</Button>
            <Button type="ghost" v-else class="marginR10 " @click='buttonChangePhone'>修改验证手机号</Button>
            <Button type="ghost" class="marginR10" @click='buttonChangePassword'>修改支付密码</Button>
            <Button type="ghost" class="marginR10" @click='buttonRecharge'>充 值</Button>
            <Button type="ghost" class="marginR10" @click='buttonGetMoney'>提 现</Button>
            <Button type="ghost" class="marginR10" @click='buttonUpgradeVIP'>升级VIP</Button>
            <Button type="ghost" class="marginR10" @click='buttonPrint'>打印变动记录</Button>
          </div>
        </div>
        <div class="border"></div>
        <title-has-slot class="title-has-slot">
          <span slot="titletHasSlotLeftTitle">账户变动记录</span>
          <div slot='titletHasSlotRightContent' class="titlet-has-slot-right-content">
            <search-input :searchWidth='350' style="margin-right: 0px;"></search-input>
            <Button v-if='ifChoose' type="ghost" class="marginL20" @click="chooseBtn">选 择</Button>
            <Button v-if='!ifChoose' type="success" class="marginR10 marginL20" @click="delBtn" :disabled='delBtnDisabled'>删 除</Button>
            <Button v-if='!ifChoose' type="ghost" @click='cancelBtn'>取 消</Button>
          </div>
        </title-has-slot>
        <div class="table">
          <q-table ref="zBaseInfoTable"
                    :width='1201'
                   :showOperateColumn="false"
                   :requestDataApi="getAccountChangeTable"
                   :selectMode='ifSelecMode'
                   :columns="columns"
                   :data="accountChangeItem"
                   :pageInfo="accountChangePageInfo"
                   @all-selection='tableAllSelect'>
          </q-table>
        </div>
      </div>
    </div>
    <!-- 重置手机号 -->
    <reset-phone :ifShowModal='ifShowModalReset'
                 @cancel-data='buttonResetCancle'
                 @commit-data='buttonResetSave'></reset-phone>

    <!-- 修改验证手机号 -->
    <edit-phone :ifShowModal='ifShowModalEdit'
                @cancel-data='buttonEditCancle'
                @commit-data='buttonEditSave'
                @reset-phone='buttonEditResetPhone'></edit-phone>

    <!-- 认证 -->
    <authentication :authenticationModal='authenticationModal'
                    @sendyzm='buttonSendApprove'
                    @send='buttonApproveSave'
                    @cancel='buttonApproveCancel'></authentication>

    <!-- 修改单位支付密码 -->
    <edit-unit-pay :editUnitPayModal='editUnitPayModal'
                   @send='buttonUnitPaySave'
                   @cancel='buttonUnitPayCancle'
                   @sendyzm='buttonSendPay'
                   @reset-psd='buttonResetPay'></edit-unit-pay>

    <!--重置单位支付密码-->
    <reset-edit-unit-pay :resetEditUnitPayModal='resetEditUnitPayModal'
                         @send='buttonResetUnitPaySave'
                         @cancel='buttonResetUnitPayCancle'
                         @sendyzm='buttonResetSendPay'></reset-edit-unit-pay>

    <!-- 升级vip -->
    <updata-vip-modal :modelRechargeVip.sync='updataVip'
                      @rechargeVipSure='buttonUpdataVipSave'></updata-vip-modal>

    <!-- 充值 -->
    <recharge-vip-modal :modelRechargeVip.sync='modelRechargeVip'
                        @rechargeVipSure='buttonRechargeSave'></recharge-vip-modal>

    <!-- 提现 -->
    <account-withdrawal :controlModal='controlModal'
                        @account-withdrawal-affirm='buttonWithDrawalSave'
                        @account-withdrawal-cancel='buttonWithDrawalCancle'> </account-withdrawal>
    <!-- 删除 -->
    <affirm-del-modal
        :controlModal='delModal.show'
        :delCounts='delModal.delCounts'
        @delCancel='delModalCancel'
        @affirmDel='delModalCommit'>
    </affirm-del-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import bread from '@/views/main/prepare/components/bread'
import resetPhone from '@/views/main/prepare/components/modal/resetPhone.vue'
import editPhone from '@/views/main/prepare/components/modal/editPhone.vue'
import authentication from './components/modal/authentication'
import updataVipModal from './components/modal/updataVipModal'
import editUnitPay from './components/modal/editUnitPay'
import rechargeVipModal from './components/modal/rechargeVipModal'
import accountWithdrawal from './components/modal/accountWithdrawal'
import resetEditUnitPay from './components/modal/resetEditUnitPay'
export default {
  name: 'accountDetailHome',
  components: {
    resetEditUnitPay,
    accountWithdrawal,
    rechargeVipModal,
    resetPhone,
    bread,
    editPhone,
    authentication,
    updataVipModal,
    editUnitPay,
  },
  data() {
    return {
      ifChoose: true, // 是否是选择按钮状态
      delBtnDisabled: true, // 删除按钮
      ifSelecMode: false, // 表格是否是多选状态
      delModal: {
        show: false,
        delCounts: 0, // 删除条数
      },
      resetEditUnitPayModal: false, // 重置单位支付密码
      controlModal: false, // 提现
      modelRechargeVip: false, // 充值
      updataVip: false, // 升级vip
      ifShowModalReset: false, // 重置手机号
      ifShowModalEdit: false, // 修改验证手机号
      authenticationModal: false, // 认证
      isButton: false, // 是否认证
      editUnitPayModal: false, // 修改支付密码
      columns: [
        {
          title: '单位/个人结算单号',
          key: 'acountNumber',
          width: 151,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '体检号',
          key: 'physicalNumber',
          // widt: 99,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '姓名/单位名称',
          key: 'unitName',
          width: 220,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '变动类型',
          key: 'changeType',
          // minWidth: 68,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '摘要',
          key: 'digest',
          // minWidth: 164,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '变动金额（元）',
          key: 'changeMoney',
          // width: 99,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '账户余额（元）',
          key: 'reduceMoney',
          // width: 99,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '操作人',
          key: 'person',
          // minWidth: 100,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '变动日期',
          key: 'changeDate',
          width: 100,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '备注',
          key: 'remark',
          width: 50,
          align: 'center',
          ellipsis: true,
          render: (h, params) => {
            let val = params.row.remark
            if (val) {
              return h('remark-in-table', {
                props: {
                  text: val,
                },
              })
            }
            return ''
          },
        },
      ],
    }
  },
  computed: {
    ...mapGetters('teamPhysicalExaminationModule', [
      'accountChangeItem',
      'accountChangePageInfo',
    ]),
  },
  methods: {
    /* =============================================================表格操作 */
    tableAllSelect(data) {
      if (data.length > 0) {
        this.delBtnDisabled = false
      } else {
        this.delBtnDisabled = true
      }
      this.delModal.delCounts = data.length
    },
    /* =============================================================选择、删除、取消按钮切换 */
    chooseBtn () {
      this.ifChoose = false
      this.ifSelecMode = true
    },
    cancelBtn () {
      this.ifChoose = true
      this.ifSelecMode = false
    },
    /* ==============================================================表格删除 */
    delBtn () {
      console.log(111)
      this.delModal.show = true
    },
    delModalCancel () {
      this.delModal.show = false
    },
    delModalCommit () {
      this.delModal.show = false
    },
    // ----------------------------认证-------------------------------------
    // 发送验证码
    buttonSendApprove() {
      console.log()
    },
    // 保存
    buttonApproveSave() {
      this.authenticationModal = false
    },
    // 取消
    buttonApproveCancel() {
      this.authenticationModal = false
    },
    // --------------------------修改验证手机号-----------------
    buttonEditCancle() {
      this.ifShowModalEdit = false
    },
    buttonEditSave() {
      this.ifShowModalEdit = false
    },
    buttonEditResetPhone() {
      this.ifShowModalReset = true
      this.ifShowModalEdit = false
    },
    // --------------------重置手机号----------------
    buttonResetCancle() {
      this.ifShowModalReset = false
      this.ifShowModalEdit = true
    },
    buttonResetSave() {
      this.ifShowModalReset = false
      this.ifShowModalEdit = true
    },
    // ------------------修改支付密码------------------
    // 保存
    buttonUnitPaySave() {
      this.editUnitPayModal = false
    },
    // 取消
    buttonUnitPayCancle() {
      this.editUnitPayModal = false
    },
    // 发送验证码
    buttonSendPay() {
      console.log()
    },
    // 重置密码
    buttonResetPay() {
      this.resetEditUnitPayModal = true
      this.editUnitPayModal = false
    },
     // ------------------重置支付密码------------------
    // 保存
    buttonResetUnitPaySave() {
      this.resetEditUnitPayModal = false
      this.editUnitPayModal = true
    },
    // 取消
    buttonResetUnitPayCancle() {
      this.resetEditUnitPayModal = false
      this.editUnitPayModal = true
    },
    // 发送验证码
    buttonResetSendPay() {
      console.log()
    },
    // ---------------------------升级保存-------------
    buttonUpdataVipSave() {
      this.updataVip = false
    },
    // ------------------------------充值保存------------
    buttonRechargeSave() {
      this.modelRechargeVip = false
    },
    buttonWithDrawalSave() {
      this.controlModal = false
    },
    buttonWithDrawalCancle() {
      this.controlModal = false
    },
    // ---------------------------主界面按钮--------------------------
    // 认证
    buttonAttestation() {
      this.authenticationModal = true
    },
    // 修改验证手机号
    buttonChangePhone() {
      this.ifShowModalEdit = true
    },
    // 修改支付密码
    buttonChangePassword() {
      console.log(111)
      this.editUnitPayModal = true
    },
    // 充值
    buttonRecharge() {
      this.modelRechargeVip = true
    },
    // 提现
    buttonGetMoney() {
      this.controlModal = true
    },
    // 升级vip
    buttonUpgradeVIP() {
      this.updataVip = true
    },
    // 打印变动记录
    buttonPrint() {
      console.log()
    },
    buttonFirstBread() {
      this.setSwitchComponent('unitManageHome')
    },
    ...mapMutations('teamPhysicalExaminationModule', ['setSwitchComponent']),
    ...mapActions('teamPhysicalExaminationModule', ['getAccountChangeTable']),
  },
}
</script>

<style lang='less' scoped>
.account-detail-home {
  height: 100%;
  padding: 0 10px 10px 10px;
  .wrapper {
    height: 100%;
    .account-detail-home-content {
      overflow: hidden;
      height: calc(~'100% - 50px');
      .border {
        border-bottom: 1px solid #e0e0e0;
      }
      .info {
        justify-content: space-between;
        display: flex;
        height: 100px;
        // background-color: lightblue;
        .name {
          margin: 20px 0 20px 30px;
          font-weight: bold;
          font-size: 18px;
          color: #4a4a4a;
        }
        .bottom {
          margin-left: 30px;
          & span:nth-of-type(2) {
            margin-left: 30px;
          }
        }
        .unit-button {
          padding-top: 35px;
          padding-right: 10px;
        }
      }
      .table {
        height: calc(~'100% - 150px');
      }
    }
  }
}
</style>
