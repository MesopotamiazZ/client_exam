/**
* Created 黄伟
* Date: 2018/3/7
* Time: 15:16
* content: 
*/
<template>
  <div class="detilModal">
    <Modal v-model="recallSign"
           :styles='{width:modalWidth+"px"}'
           :transition-names='[]'
           :mask-closable="maskClosable"
           :closable="closable"
           :transfer='false'>
      <div slot="header"
           class="detilModal-header">
        <p name='adm-alertHeader'
           class="adm-alertHeader font14">
          <span class="adm-alertHeaderText font16">{{ headerText }}</span>
        </p>
        <div class="fr detilModal-menu"
             @click="menuMouseOver">
          <icon class="icon_close"
                name="physicalDetailsMenu"></icon>
          <ul class="detilModal-menu-ul"
              v-if="menu">
            <li @mouseout="menuMouseOut"
                @click="anchorClick">
              主检检查结果
            </li>
          </ul>
        </div>
      </div>
      <div style="padding:20px;"
           class="detilModal-body">
        <Row class="detilModal-title">
          <div class="detilModal-body-title">体检结果汇总</div>
        </Row>
        <!-- 个人信息 -->
        <Row class="detilModal-body-baseIfon marginT20">
          <div class="detilModal-body-baseIfon-title">
            <div class="fl">本次体检详情</div>
            <div class="fr"
                 style="color:#008cee;cursor: pointer;"
                 @click="detailClick">审核详情（9/10)</div>
            <div style="clear: both;"></div>
          </div>
          <div class="detilModal-body-baseIfon-content">
            <titleHasSlotSmall :height="36">
              <span slot="titletHasSlotLeftTitle">个人基本信息</span>
            </titleHasSlotSmall>
            <div class="detilModal-body-baseIfon-content-message">
              <!-- 个人信息 第一排 -->
              <Row>
                <div class="fl ">
                  <div class="detilModal-body-baseIfon-content-message-text fl textJustify"
                       style="height:30px;width:48px">体检号</div>
                  <div class="detilModal-body-baseIfon-content-message-input">
                    <Input disabled
                           style="width:113px;"
                           v-model="baseInfo.pe_sn"></Input>
                  </div>
                </div>
                <div class="fl marginL20">
                  <div class="detilModal-body-baseIfon-content-message-text fl textJustify"
                       style="height:30px;width:48px">姓名</div>
                  <div class="detilModal-body-baseIfon-content-message-input">
                    <Input disabled
                           style="width:98px;"
                           v-model="baseInfo.name"></Input>
                  </div>
                </div>
                <div class="fl marginL20">
                  <div class="detilModal-body-baseIfon-content-message-text fl textJustify"
                       style="height:30px;width:46px">性别</div>
                  <div class="detilModal-body-baseIfon-content-message-input">
                    <Input disabled
                           style="width:74px;"
                           v-model="baseInfo.sex"></Input>
                  </div>
                </div>
                <div class="fl marginL20">
                  <div class="detilModal-body-baseIfon-content-message-text fl textJustify"
                       style="height:30px;width:24px">年龄</div>
                  <div class="detilModal-body-baseIfon-content-message-input">
                    <Input disabled
                           style="width:41px;"
                           v-model="baseInfo.age"></Input>
                  </div>
                </div>
              </Row>
              <!-- 个人信息 第二排 -->
              <Row class="marginT20">
                <div class="fl ">
                  <div class="detilModal-body-baseIfon-content-message-text fl textJustify"
                       style="height:30px;width:48px">证件类型</div>
                  <div class="detilModal-body-baseIfon-content-message-input">
                    <Input disabled
                           style="width:288px;"
                           v-model="baseInfo.credit_type"></Input>
                  </div>
                </div>
                <div class="fl marginL20">
                  <div class="detilModal-body-baseIfon-content-message-text fl textJustify"
                       style="height:30px;width:48px">证件号码</div>
                  <div class="detilModal-body-baseIfon-content-message-input">
                    <Input disabled
                           style="width:169px;"
                           v-model="baseInfo.credit_num"></Input>
                  </div>
                </div>
              </Row>
              <!-- 个人信息 第三排 -->
              <Row class="marginT20">
                <div class="fl ">
                  <div class="detilModal-body-baseIfon-content-message-text fl textJustify"
                       style="height:30px;width:48px">工作单位</div>
                  <div class="detilModal-body-baseIfon-content-message-input">
                    <Input disabled
                           style="width:288px;"
                           v-model="baseInfo.company"></Input>
                  </div>
                </div>
                <div class="fl marginL20">
                  <div class="detilModal-body-baseIfon-content-message-text fl textJustify"
                       style="height:30px;width:48px">体检时间</div>
                  <div class="detilModal-body-baseIfon-content-message-input">
                    <Input disabled
                           style="width:169px;"
                           v-model="baseInfo.exam_time"></Input>
                  </div>
                </div>
              </Row>
            </div>
          </div>
        </Row>
        <!-- 套餐信息 -->
        <Row class="detilModal-body-baseIfon marginT10">
          <div class="detilModal-body-baseIfon-content">
            <titleHasSlotSmall :height="36">
              <span slot="titletHasSlotLeftTitle">套餐信息</span>
            </titleHasSlotSmall>
            <div class="detilModal-body-baseIfon-content-message">
              <Row>
                <div class="fl ">
                  <div class="detilModal-body-baseIfon-content-message-text fl textJustify"
                       style="height:30px;width:96px">套餐名称</div>
                  <div class="detilModal-body-baseIfon-content-message-input">
                    <Input disabled
                           style="width:184px;"></Input>
                  </div>
                </div>

              </Row>
              <Row>
                <div class="fl marginT20">
                  <div class="detilModal-body-baseIfon-content-message-text fl textJustify"
                       style="height:30px;width:96px">套餐包含组合项目</div>
                  <div class="detilModal-body-baseIfon-content-message-input">
                    <Input disabled
                           style="width:487px;"
                           type="textarea"
                           :rows="3 "></Input>
                  </div>
                </div>
              </Row>
            </div>
          </div>
        </Row>
        <!-- 数字型 -->
        <Row class="detilModal-body-baseIfon marginT10">
          <numberType></numberType>
        </Row>
        <!-- 描述型 -->
<!--         <Row class="detilModal-body-baseIfon marginT10">
          <describeType></describeType>
        </Row> -->
        <!-- B超 -->
<!--         <Row class="detilModal-body-baseIfon marginT10">
          <BType></BType>
        </Row> -->
        <!-- X超 -->
<!--         <Row class="detilModal-body-baseIfon marginT10"
             id="anchor">
          <XType></XType>
        </Row> -->
        <!-- 主检检查结果 -->
        <Row class="detilModal-body-baseIfon marginT10">
          <mainResult></mainResult>
        </Row>
      </div>
      <div slot="footer" style="margin-top:20px;">
        <Button type="ghost"
                class="cancelDelBtn fr marginR10"
                @click="abolish">取 消</Button>

        <ZButtonHasBg class=" marginR20 fr"
                      @click="affirm()">打 印
        </ZButtonHasBg>
      </div>
    </Modal>
    <reviewDetailsModal></reviewDetailsModal>
    <default-modal :openModal="defaultModalStatus"  @abolish="abolishAuditDetailModal">
      <div class="padding20" style="max-height: 560px; overflow: auto;">
        <div class="audit-detail-default-modal-item">
          <titleHasSlot>
            <span slot="titletHasSlotLeftTitle">第一次审核详情</span>
            <span slot="titletHasSlotRightContent" class="statistics">(3/10)</span>
          </titleHasSlot>
          <z-table :isShowSelectOrIndex="false"
                   stripe
                   :columns="auditDetailColumns"
                   :data="auditDetailData"></z-table>
        </div>
      </div>
    </default-modal>
  </div>
</template>
<script>
import ZButton from '@/components/button/ZButton'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import titleHasSlotSmall from './titleHasSlotSmall'
import titleHasSlot from '@/components/titleHasSlot'
import numberType from './numberType'
import describeType from './describeType'
import BType from './BType'
import XType from './XType'
import mainResult from './mainResult'
import reviewDetailsModal from './reviewDetailsModal'
import defaultModal from './defaultModal'
import ZTable from '@/components/table/zTable'
import baseInfo from './data'
export default {
  name: 'detilModal',
  props: {
    recallSign: {
      type: Boolean,
      default: false,
    },
    headerText: {
      // title
      type: String,
      default: '体检详情',
    },
    modalWidth: {
      // modal宽度
      type: Number,
      default: 681,
    },
    maskClosable: {
      // 是否允许点击遮罩层关闭
      type: Boolean,
      default: false,
    },
    closable: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ZButton,
    ZButtonHasBg,
    titleHasSlotSmall,
    titleHasSlot,
    numberType,
    describeType,
    BType,
    XType,
    mainResult,
    reviewDetailsModal,
    defaultModal,
    ZTable,
  },
  data() {
    return {
      // detilModal: false,
      menu: false,
      defaultModalStatus: false,
      auditDetailColumns: [
        {
          title: '审核人',
          key: 'audit_name',
          width: 80,
        },
        {
          title: '审核结果',
          key: 'audit_result',
          width: 70,
        },
        {
          title: '审核详情',
          key: 'audit_detail',
        },
        {
          title: '审核时间',
          key: 'audit_time',
          width: 124,
        },
      ],
      auditDetailData: [
        {
          audit_name: '李芳',
          audit_result: '通过',
          audit_detail: '/',
          audit_time: '2017-12-12 13:00',
        },
        {
          audit_name: '张芳',
          audit_result: '通过',
          audit_detail: '/',
          audit_time: '2017-12-12 13:00',
        },
        {
          audit_name: '林芳',
          audit_result: '退回',
          audit_detail: '退回修改: 小结需要补充',
          audit_time: '2017-12-12 13:00',
        },
      ],
      baseInfo: {},
    }
  },
  watch: {
    recallSign(val, oldV) {
      console.log(val, 11)
    },
  },
  mounted() {
    this.baseInfo = baseInfo
  },
  methods: {
    // 取消
    abolish() {
      this.$emit('abolish')
    },
    // 保存
    affirm() {
      this.$emit('affirm')
    },
    menuMouseOver() {
      this.menu = true
    },
    menuMouseOut() {
      this.menu = false
    },
    // 锚点
    anchorClick() {
      //
      let a = this.$el.querySelector('#anchor')
      let b = this.$el.querySelector('.detilModal-body')
      b.scrollTop = a.offsetTop
    },
    // 审核详情
    detailClick() {
      this.defaultModalStatus = true
    },
    // 关闭
    abolishAuditDetailModal () {
      this.defaultModalStatus = false
    },
  },
}
</script>
<style lang="less">
@import '~assets/less/variable.less';
.detilModal {
  .detilModal-header {
    position: relative;
    .detilModal-menu {
      width: 16px;
      height: 16px;
      position: absolute;
      top: 20px;
      right: 0;
      z-index: 10;
      cursor: pointer;
      .detilModal-menu-ul {
        width: 158px;
        margin-left: -122px;
        background: #ffffff;
        border: 1px solid #dddddd;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
          0 0 6px 0 rgba(0, 0, 0, 0.04);
        border-radius: 2px;
        > li {
          width: 158px;
          height: 36px;
          text-align: center;
          line-height: 36px;
        }
        > li:hover {
          cursor: pointer;
          background: #e8f2ff;
        }
      }
    }
  }
  .detilModal-body {
    max-height: 479px;
    overflow: auto;
    .detilModal-body-title {
      width: 100%;
      font-size: 14px;
      color: #111111;
      letter-spacing: 0;
      line-height: 20px;
      text-align: center;
    }
    .detilModal-body-baseIfon-content {
      background: #ffffff;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      margin-top: 10px;
      .detilModal-body-baseIfon-content-message {
        border-top: 1px solid #d9d9d9;
        padding: 20px;
      }
    }
    .detilModal-body-baseIfon-content-message-text {
      line-height: 30px;
      font-size: 12px;
      color: #737373;
      letter-spacing: 0;
    }
    .detilModal-body-baseIfon-content-message-input {
      margin-left: 10px;
      display: inline-block;
      flex: 1;
    }
  }
  .ivu-modal-footer {
    height: 50px;
  }
  .detilModal-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
  .detilModal-input {
    margin-left: 10px;
    display: inline-block;
    flex: 1;
  }
  .adm-alertHeader {
    background-color: #f2f5fa;
    line-height: 50px;
    height: 50px;
    color: @gradeAshOne;
    letter-spacing: 0.04px;
    font-weight: normal;
    .adm-alertHeaderText::before {
      content: '';
      width: 4px;
      height: 17px;
      margin-right: 8px;
      display: inline-block;
      vertical-align: middle;
      background-color: @gradeBlueOne;
    }
  }
  .holdMomentModal-main {
    text-align: center;
    font-size: 16px;
    display: block;
    color: #4a4a4a;
    letter-spacing: 0.07px;
    font-weight: 500;
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .audit-detail-default-modal-item {
    border: 1px solid @gradeAshFive;
    border-radius: 8px;
    overflow: hidden;
    .statistics{
      display: inline-block;
      width: 70px;
      font-size: 16px;
    }
  }
}
</style>
