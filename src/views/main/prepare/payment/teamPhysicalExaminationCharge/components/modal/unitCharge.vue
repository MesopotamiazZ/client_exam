/** 
* @author 覃凤
* @date 2018/2/26
* @content 单位结算-个单位收费
* ifShowModal：控制弹窗显示隐藏，modalData：传入的数据，cancel-data：返回的取消事件，commit-data：返回的提交事件
*/
<template>
  <div class="unit-charge" v-if='ifShowModal'>
    <div class="person-charge">

      <Modal v-model="ifShowModal"
             :styles='{width:818+"px"}'
             :transition-names='[]'
             :mask-closable="false"
             :transfer='false'
             :closable="false">
        <div slot="header">
          <alert-header headerText="单位收费" :showInput='false'></alert-header>
        </div>
        <div class="unit-charge-body">
          <Form :model="showModalData"
                :rules="dataRule"
                ref="chargeBodyForm" autocomplete="off">
            <ul class="charge-body-ul">
              <li class="fl marginB20 marginR20">
                <span class="charge-body-name fl textJustify marginR10" style="width: 60px;">单位体检号</span>
                <div class="fl">
                  <Input v-model="showModalData.pe_sn" disabled></Input>
                </div>
              </li>
              <li class="fl marginB20 marginR20">
                <span class="charge-body-name fl textJustify marginR10">单位名称</span>
                <div class="fl" style="width: 266px;">
                  <Input v-model="showModalData.name" disabled></Input>
                </div>
              </li>
              <!-- <li class="fl marginB20 marginR20">
                <span class="charge-body-name fl textJustify marginR10">性别</span>
                <div class="fl">
                  <Input v-model="showModalData.self_sexShow" disabled></Input>
                </div>
              </li> -->
              <li class="fl marginB20">
                <span class="charge-body-name fl textJustify marginR10">登记日期</span>
                <div class="fl">
                  <Input v-model="showModalData.self_djDate" disabled></Input>
                </div>
              </li>
              <li class="fl marginB20 marginR20">
                <span class="charge-body-name fl textJustify marginR10" style="width: 60px;">单位总金额</span>
                <div class="fl">
                  <z-input class="self-input-price" type='number' disabled v-model="showModalData.self_oderMoney"></z-input>
                </div>
              </li>
              <li class="fl marginB20 marginR20">
                <span class="charge-body-name fl textJustify marginR10">已收金额</span>
                <div class="fl">
                  <z-input class="self-input-price" type='number' disabled v-model="showModalData.self_ysMoney"></z-input>
                </div>
              </li>
              <li class="fl marginB20 marginR20">
                <span class="charge-body-name fl textJustify marginR10">待收金额</span>
                <div class="fl">
                  <z-input class="self-input-price" disabled type='number' v-model="showModalData.self_dsMoney"></z-input>
                </div>
              </li>
              <!-- <li class="fl marginB20">
                <span class="charge-body-name fl textJustify marginR10">折扣</span>
                <div class="fl" style="width: 108px;">
                  <z-input disabled type='number' v-model="showModalData.self_zk"></z-input>
                </div>
              </li>
              <li class="fl marginB20 marginR20">
                <span class="charge-body-name fl textJustify marginR10" style="width: 60px;">减免金额</span>
                <div class="fl">
                  <z-input class="self-input-price" disabled type='number' v-model="showModalData.self_jm"></z-input>
                </div>
              </li> -->
              <li class="fl marginB20">
                <span class="charge-body-name fl textJustify marginR10">应收金额</span>
                <div class="fl">
                  <z-input class="self-input-price" disabled type='number' v-model="showModalData.self_ysje"></z-input>
                </div>
              </li>
              <li class="clearBoth"></li>
            </ul>
            <div style="height:30px;line-height:30px;">
              <Checkbox v-model="showUnitVip" class="font14" style="color: #111111;">账户余额：</Checkbox>
              <span class="font14" style="color: #000;font-weight:bold">{{showModalData.self_zhye}}</span>
              <div class="show-unit-vip-pay fr marginT10 marginB10" v-if='showUnitVip'>
                <div class="vip-point"></div>
                <div class="unit-vip-pay-content paddingT15 paddingL15 paddingB15 paddingR15">
                  <!-- 单位会员 -->
                  <ul class="charge-body-ul">
                    <li class="fl marginB20">
                      <span class="charge-body-name fl textJustify marginR10" style="width: 72px;">单位名称</span>
                      <div class="fl" style="width: 362px;">
                        <Input v-model="showModalData.self_unit_pe_sn"></Input>
                      </div>
                    </li>
                    <li class="fr marginB20">
                      <span class="charge-body-name fl textJustify marginR10" style="width: 72px;">单位支付密码</span>
                      <div class="fl" style="width: 201px;">
                        <Input type="password" v-model="showModalData.self_unit_password"></Input>
                      </div>
                    </li>
                    <li class="cleatBoth"></li>
                    <li class="fl check-phone-number">
                      <span class="charge-body-name fl textJustify marginR10" style="width: 39px;">手机号:</span>
                      <div class="fl" style="line-height: 30px;width: 127px;">
                        <span>{{ showModalData.self_unit_phone }}</span>
                        <!-- <p class="verification-code"
                           :class="{verifiCodeDisabled:unit.verifiCodeDisabled}"
                           @click="sendVeriCode">发送验证码</p> -->
                        <p class="verification-code" v-if='!unit.verifiCodeDisabled' @click="sendVeriCode">发送验证码</p>
                        <span class="marginL10" v-if='unit.verifiCodeDisabled'>{{ unit.timeNumber }}S</span>
                      </div>
                    </li>
                    <li class="fl" style="margin-left: 40px;">
                      <span class="charge-body-name fl textJustify marginR10" style="width: 36px;">验证码</span>
                      <div class="fl" style="width: 72px;">
                        <Input v-model="showModalData.self_unit_yzNum"></Input>
                      </div>
                    </li>
                    <li class="clearBoth"></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="charge-pay" style="overflow:hidden;height:30px;">
              <span class="charge-body-name fl textJustify marginR10" style="line-height:30px;">支付方式：</span>
              <RadioGroup v-model="showModalData.vipRechargePrice" class="fl radio-group">
                <Radio label="现金" class="radio fl">
                  <icon name="cashPay" scale="1.2" class="icon"></icon>
                  <span>现金</span>
                </Radio>
                <Radio label="银行卡" class="radio fl">
                  <icon name="bankCardPay" scale="1.2" class="icon"></icon>
                  <span>银行卡</span>
                </Radio>
                <Radio label="支付宝" class="radio">
                  <icon name="aliPay" scale="1.2" class="icon"></icon>
                  <span>支付宝</span>
                </Radio>
                <Radio label="微信" class="radio">
                  <icon name="weChatPay" scale="1.2" class="icon"></icon>
                  <span>微信</span>
                </Radio>
              </RadioGroup>
              <div class="clearBoth"></div>
            </div>
            <div class="charge-remark fl marginT10">
              <span class="textJustify fl marginR10" style="width: 48px;">备注</span>
              <div class="fl marginB10">
                <Input type="textarea"></Input>
              </div>
            </div>
            <div class="clearBoth"></div>
            <div class="infor-fp marginB10">
              <span class="fl charge-body-name-r textJustify marginR10" style="line-height:30px;">发票信息：</span>
              <RadioGroup v-model="showModalData.vipRechargePriceFp" class="radio-group">
                <Radio label="不打发票" class="radio">
                  <span>不打发票</span>
                </Radio>
                <Radio label="单位发票" class="radio">
                  <span>单位发票</span>
                </Radio>
              </RadioGroup>
            </div>
            <ul class="charge-body-ul"
                v-if='ifShowInvoiceInfor'>
              <li class="fl marginB20">
                <span class="charge-body-name-l fl textJustify marginR10" style="width: 72px;">发票单位</span>
                <div class="fl" style="width: 456px;">
                  <Input v-model="showModalData.self_pe_name"></Input>
                </div>
              </li>
              <li class="fl">
                <span class="fl textJustify marginR10" style="width: 72px;">纳税人识别号</span>
                <div class="fl" style="width: 456px;">
                  <FormItem prop="self_sbh">
                    <Input v-model.trim="showModalData.self_sbh" :class='{inputVerificationTs: isEmpty(showModalData.self_sbh)}'></Input>
                  </FormItem>
                </div>
              </li>
              <li class="clearBoth"></li>
            </ul>
            <div class="charge-cost">
              <div class="charge-cost-title marginL20">费用信息
                <span class="marginL10">（共2项）</span>
                <p class="fr marginR20 font14">以预约人数计：<span class="font14">共20人</span></p>
              </div>
              <div style="width: 100%;overflow: auto;">
                <Table stripe
                       :height='120'
                       :columns='column'
                       :data='showModalData.columnData'>
                </Table>
              </div>
            </div>
            <div class="last-line paddingT20 font14">
              <span>待收金额合计：
                <span class="pay">{{ collectMoney }}</span> 元</span>
              <span>应收金额合计：
                <span class="pay">{{ receivableMoney }}</span> 元</span>
            </div>
          </Form>
        </div>
        <div slot='footer'>
          <div class="unit-charge-footer paddingB20 paddingT20">
            <z-button ZBtype='ghost' class="fr marginR20" @click='cancelData'>取 消</z-button>
            <z-button ZBtype='primary' class="fr marginR20" @click='commitData("chargeBodyForm")'>完 成</z-button>
            <Checkbox 
              class="fr marginR20" 
              style="line-height: 30px;" 
              v-model="showModalData.fyqd" 
              :true-value=1
            :false-value=0>打印费用清单</Checkbox>
            <div class="clearBoth"></div>
          </div>

        </div>
      </Modal>
    </div>
    <!-- 附加费费用明细 -->
    <details-charges :ifShowModal='surchargeDetailsCharges.show'
                     :data='surchargeDetailsCharges.data'
                     :columns='surchargeDetailsCharges.columns'
                     :height='surchargeDetailsCharges.height'
                     :titleName='surchargeDetailsCharges.titleName'
                     @close-modal='surchargeDetailsCharges.show=false'></details-charges>
    <!-- 体检费费用明细 -->
    <details-charges :ifShowModal='physicalDetailsCharges.show'
                     :data='physicalDetailsCharges.data'
                     :columns='physicalDetailsCharges.columns'
                     :height='physicalDetailsCharges.height'
                     :titleName='physicalDetailsCharges.titleName'
                     @close-modal='physicalDetailsCharges.show=false'></details-charges>
  </div>
</template>
<script>
import * as _ from 'lodash'
import selfTabForModal from '@/components/tab/tabForModal.vue'
import detailsCharges from '@/views/main/prepare/payment/components/detailsCharges.vue' // 费用明细单
export default {
  name: 'unit-charge',
  components: {
    selfTabForModal,
    detailsCharges,
  },
  data() {
    let that = this
    const taxNumber = (rule, value, callback) => {
      let checkTax = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/
      if (value !== '') {
        if (!checkTax.test(value)) {
          callback(new Error('请输入正确的识别号'))
        } else {
          callback()
        }
      } else {
        callback(new Error('识别号不为空'))
      }
    }
    return {
      msg: '单位收费',
      tab: [
        {
          title: '个人会员',
        },
        {
          title: '单位会员',
        },
      ],
      physicalDetailsCharges: {
        // 体检费费用明细
        show: false,
        titleName: '体检费费用明细',
        height: 200,
        columns: [
          {
            title: '体检号',
            key: 'self_pe_sn',
            ellipsis: true,
            width: 116,
          },
          {
            title: '姓名',
            key: 'self_name',
            ellipsis: true,
            width: 200,
          },
          {
            title: '性别',
            key: 'self_sex',
            ellipsis: true,
            width: 98,
          },
          {
            title: '年龄',
            key: 'self_age',
            ellipsis: true,
            width: 98,
          },
          {
            title: '登记日期',
            key: 'self_djrq',
            ellipsis: true,
            width: 98,
          },
          {
            title: '体检套餐',
            key: 'self_tjtc',
            ellipsis: true,
            width: 98,
          },
          {
            title: '体检套餐金额',
            key: 'self_tjtcje',
            ellipsis: true,
            width: 60,
          }, {
            title: '待收金额（元）',
            key: 'self_dsje',
            ellipsis: true,
            width: 60,
          }, {
            title: '实收金额（元）',
            key: 'self_ssje',
            ellipsis: true,
            width: 60,
          }, {
            title: '单位支付比例',
            key: 'self_unitZfbl',
            ellipsis: true,
            width: 60,
          }, {
            title: '新增费用（元）',
            key: 'self_xzfy',
            ellipsis: true,
            width: 60,
          }, {
            title: '新增费用支付方',
            key: 'self_xzfyzf',
            ellipsis: true,
            width: 60,
          },
        ],
        data: [
          {
            self_pe_sn: '1801030056',
            self_name: '王树彤',
            self_sex: '女',
            self_age: 42,
            self_djrq: '2018-01-09',
            self_tjtc: '入职体检套餐',
            self_tjtcje: 4000.00,
            self_dsje: 0.00,
            self_ssje: 4000.00,
            self_unitZfbl: 1,
            self_xzfy: 20.00,
            self_xzfyzf: '单位支付',
          },
        ],
      },
      surchargeDetailsCharges: {
        // 附加费明细
        show: false,
        titleName: '附加费费用明细',
        height: 200,
        columns: [
          {
            title: '费用类别',
            key: 'self_type',
            ellipsis: true,
            width: 116,
          },
          {
            title: '附加费名称',
            key: 'self_name',
            ellipsis: true,
            width: 200,
          },
          {
            title: '待收金额（元）',
            key: 'self_dsMoney',
            ellipsis: true,
            width: 98,
          },
          {
            title: '实收金额（元）',
            key: 'self_ssMoney',
            ellipsis: true,
            width: 98,
          },
          {
            title: '实收比例',
            key: 'self_ssBl',
            ellipsis: true,
            width: 98,
          },
          {
            title: '实收优惠（元）',
            key: 'self_ssYh',
            ellipsis: true,
            width: 98,
          },
          {
            title: '状态',
            key: 'self_status',
            ellipsis: true,
            width: 60,
          },
        ],
        data: [
          {
            self_type: '耗材费',
            self_name: '早餐费',
            self_dsMoney: '10.00',
            self_ssMoney: '10.00',
            self_ssBl: '1',
            self_ssYh: '0',
            self_status: '已收费',
          },
        ],
      },
      column: [
        {
          title: '费用类型',
          key: 'self_type',
          width: 178,
          ellipsis: true,
        },
        {
          title: '待收金额（元）',
          key: 'self_dsMoney',
          width: 245,
          ellipsis: true,
        },
        {
          title: '应收金额（元）',
          key: 'self_ysMoney',
          width: 270,
          ellipsis: true,
        },
        {
          title: '操作',
          key: 'options',
          // width: 75,
          ellipsis: true,
          render: (h, params) => {
            // console.log(params.row)
            return h(
              'div',
              {
                style: {
                  color: '#008CEE',
                },
                on: {
                  click() {
                    that.showCharges(params.row.self_type)
                  },
                },
              },
              '查看明细',
            )
          },
        },
      ],
      showModalData: {}, // 弹窗中显示的数据
      showUnitVip: false, // 选中单位账户显示对应的部分
      unit: {
        verifiCodeDisabled: false, // 验证码
        timeNumber: null,
        timeNumberInit: 60, // 倒计时时间
        setTimeInterval: undefined, // 发送验证码调用时间
      },
      // person: {
      //   verifiCodeDisabled: false, // 验证码
      //   timeNumber: null,
      //   timeNumberInit: 10, // 倒计时时间
      //   setTimeInterval: undefined, // 发送验证码调用时间
      // },
      ifShowInvoiceInfor: true, // 是否显示发票单位和纳税人识别号
      dataRule: {
        // 验证规则
        self_sbh: [
          {
            required: true,
            validator: taxNumber,
            trigger: 'blur',
            type: 'string',
          },
        ],
      },
    }
  },
  props: {
    ifShowModal: {
      type: Boolean,
      default: false,
    },
    modalData: {
      type: Object,
      default() {
        return {
          // fyqd: 1,
        }
      },
    },
  },
  computed: {
    collectMoney () { // 待收金额合计
      return this.showModalData.columnData[0].self_dsMoney + this.showModalData.columnData[1].self_dsMoney
      // console.log(this.showModalData.columnData)
    },
    receivableMoney () { // 应收金额合计
      return this.showModalData.columnData[0].self_ysMoney + this.showModalData.columnData[1].self_ysMoney
      // console.log(this.showModalData.columnData)
    },
  },
  watch: {
    ifShowModal(val) {
      if (!val) {
        this.showModalData = {}
        this.showUnitVip = false
      } else {
        this.showModalData = _.clone(this.modalData)
      }
    },
    modalData(val) {
      this.showModalData = _.clone(val)
      this.initShowFp(this.showModalData.vipRechargePriceFp)
    },
    'showModalData.vipRechargePriceFp'(val) {
      // 发票信息为单位发票的时候，纳税人识别号必填
      this.initShowFp(val)
    },
  },
  methods: {
    isEmpty(data) {
      if (data === '') {
        return true
      } else {
        return false
      }
    },
    showCharges(data) {
      if (data === '体检费') {
        this.surchargeDetailsCharges.show = false // 附加费
        this.physicalDetailsCharges.show = true // 体检费
      } else {
        this.surchargeDetailsCharges.show = true
        this.physicalDetailsCharges.show = false
      }
      console.log('点击费用明细')
    },
    initShowFp(val) {
      if (val === '单位发票') {
        this.ifShowInvoiceInfor = true
      } else {
        this.ifShowInvoiceInfor = false
      }
    },
    sendVeriCode() {
      // 点击发送验证码(单位会员)
      // 计时数字开始
      // 计时完成之后
      this.unit.verifiCodeDisabled = true
      this.showTime()
    },
    showTime() {
      this.unit.timeNumber = this.unit.timeNumberInit
      this.unit.setTimeInterval = setInterval(() => {
        this.unit.timeNumber--
        if (this.unit.timeNumber < 0) {
          this.clearUnitInertval()
        }
      }, 1000)
    },
    clearUnitInertval() {
      // 清除单位会员调用
      clearInterval(this.unit.setTimeInterval)
      this.unit.timeNumber = this.unit.timeNumberInit
      this.unit.verifiCodeDisabled = false
    },
    async commitData(name) {
      // 完成
      this.$emit('commit-data', this.showModalData)
      // console.log(name)
      // console.log(this.showModalData)
      if (await this.$refs[name].validate()) {
        this.$emit('commit-data', this.showModalData)
        // console.log(this.showModalData)
        this.initData()
      }
    },
    cancelData() {
      // 取消
      this.$emit('cancel-data')
      this.initData()
      // console.log('取消')
    },
    initData() {
      this.showModalData = {}
    },
  },
  mounted() {
    this.showModalData = this.modalData
  },
  destroyed() {
    this.clearUnitInertval()
    // this.clearPersonInertval()
  },
}
</script>
<style lang="less">
@import '~assets/less/variable.less';
.unit-charge {
  color: @gradeAshThree;
  .ivu-modal {
    height: calc(~'100% - 30px');
    max-height: 685px;
    .ivu-modal-content {
      height: 100%;
      .ivu-modal-body {
        height: calc(~'100% - 120px');
        .unit-charge-body {
          // 弹窗中间内容部分
          overflow: auto;
          height: 100%;
        }
      }
    }
  }
  .unit-charge-body {
    color: @gradeAshThree;
    // padding: @num20;
    padding: @num20 @num20 0 @num20;
  }
  .charge-body-ul {
    // outline: 1px solid red;
    & > li {
      span {
        line-height: @num30;
        height: @num30;
        overflow: hidden;
      }
      & > div {
        width: 120px;
      }
    }
    // .charge-body-name-l {
    //   width: 60px;
    // }
    .charge-body-name {
      width: 48px;
    }
    // .charge-body-price {
    //   position: relative;
    //   .ivu-input {
    //     padding-right: 25px;
    //     font-weight: bold;
    //   }
    //   &::after {
    //     position: absolute;
    //     content: '元';
    //     display: inline-block;
    //     font-size: 12px;
    //     top: 7px;
    //     right: 10px;
    //   }
    // }
    // .charge-body-percent {
    //   position: relative;
    //   .ivu-input {
    //     padding-right: 30px;
    //     //  font-weight: bold;
    //   }
    //   &::after {
    //     position: absolute;
    //     content: '%';
    //     display: inline-block;
    //     font-size: 12px;
    //     top: 7px;
    //     right: 10px;
    //   }
    // }
  }
  .charge-pay {
    height: 30px;
    width: 100%;
    line-height: 30px;
    span:nth-of-type(2) {
      margin-right: 18px;
    }
  }
  .show-unit-vip-pay {
    // 单位账户对应部分
    border: 1px solid #add2fe;
    // height: 196px;
    // overflow: hidden;
    width: 100%;
    // width: calc(~'100% - 60px');
    background-color: rgb(247,250,255);
    position: relative;
    .vip-point {
      width: 10px;
      height: 10px;
      position: absolute;
      left: 25px;
      top: -5px;
      border-left: 1px solid #add2fe;
      border-top: 1px solid #add2fe;
      background-color: rgb(247, 255, 250);
      transform-origin: center;
      transform: rotate(45deg);
    }
    .unit-vip-pay-content {
      // outline: 1px solid red;
      .check-phone-number {
        position: relative;
        & > div span {
          color: @gradeAshThree;
        }
        .verification-code {
          // 验证码
          position: absolute;
          top: 0px;
          right: -20px;
          text-align: left;
          color: @gradeBlueOne;
          cursor: pointer;
        }
        .verifiCodeDisabled {
          color: #b3b3b3;
          cursor: auto;
          top: -20px;
          right: -27px;
        }
      }
    }
  }
  .charge-remark {
    // 备注
    width: 100%;
    & > span {
      margin-top: 7px;
    }
    & > div {
      width: calc(~'100% - 58px');
    }
    // .ivu-input-wrapper {
    //   textarea.ivu-input {
    //     height:30px;
    //     max-height:60px;
    //   }
    // }
    .left-span {
      width: 60px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
    }
  }
  .radio-group {
    // 支付方式
    height: 30px;
    line-height: 30px;
    .radio {
      span {
        font-weight: normal;
        color: @gradeAshOne;
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .infor-fp {
    // 发票信息
    height: 30px;
    overflow: hidden;
    // outline: 1px solid red;
    .radio-group {
      .radio {
        span {
          font-weight: normal;
        }
      }
    }
  }
  .charge-cost {
    // 体检费用
    border: 1px solid @gradeAshFive;
    border-radius: @borderRadiuBig;
    .charge-cost-title {
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      color: @gradeAshOne;
      letter-spacing: 0.04px;
      p {
        color: #83CB54;
        &>span {
          color: #83CB54;
          font-weight: normal;
        }
      }
      &>span {
        color: #49a50e;
        font-size: 12px;
        letter-spacing: 0.03px;
      }
    }
    p {
      font-size: 12px;
      color: @gradeAshThree;
      span {
        font-weight: bold;
        color: @gradeAshOne;
      }
    }
  }
  .last-line {
    // 最后一行合计
    & > span {
      color: @gradeAshThree;
      margin-right: @num30;
      .pay {
        font-weight: bold;
        color: @tsIcon;
        font-size: 18px;
      }
      .all-pay {
        font-size: 16px;
        font-weight: bold;
        color: @tsIcon;
      }
    }
  }
}
</style>
