/** 
* @author wzd
* @date 2018/02/23
* @content 前台预约主页面
*/ 
<template>
  <div class="frontAppointment-wrapper">
    <!-- 主页面 -->
    <div class="frontAppointment-main">
      <div class="frontAppointment-main-content contentBg">
        <div class="frontAppointment-main-content-wrapper">
          <!-- left -->
          <div class="content-left">
            <!-- 头像列 -->
            <div class="avatar-col">
              <div class="avatar"
                   :style="{'background-image': `url(${userAvatar})`}">
                <div class="editAvatar"
                     @click="addPhoto">
                  <span>编辑头像</span>
                </div>
              </div>
              <Button type="ghost"
                      :disabled="!orderForm.data.ha_id"
                      @click="gotoHealthyRecord">健康档案{{curOrder.is_recheck}}</Button>
              <div class="recheckIcon"
                   v-if="curOrder.is_recheck">
                <i class="icon-success"></i>
                <span class="recheck">复检</span>
              </div>
            </div>
            <!-- 头像列 -->
            <!-- 表单列 -->
            <div class="form-col">
              <div class="form-col-one">
                <!-- 表单部分 -->
                <div class="form-content">
                  <Form ref="orderForm"
                        :model="orderForm.data"
                        :rules="orderForm.rules"
                        :label-width="48 + 10"
                        class="front-form">
                    <ul>
                      <li class="first-row">
                        <FormItem label="个人档案编号"
                                  prop="ha_id"
                                  class="front-form-row">
                          <Input type="text"
                                 v-model.trim="orderForm.data.ha_id"
                                 disabled></Input>
                        </FormItem>
                        <!-- <FormItem label="VIP号"
                                  prop="vip_id"
                                  class="front-form-row">
                          <Input type="text"
                                 :class='{inputVerificationTs: isEmpty(orderForm.data.vip_id)}'
                                 v-model.trim="orderForm.data.vip_id"></Input>
                        </FormItem> -->
                        <FormItem label="初/复检"
                                  prop="is_recheck"
                                  class="front-form-row">
                          <Select v-model="orderForm.data.is_recheck"
                                  :class='{selectVerificationTs: isEmpty(orderForm.data.is_recheck)}'
                                  filterable>
                            <Option v-for="item in selectOptions.is_recheck"
                                    :value="item.value"
                                    :key="item.value">{{ item.label }}</Option>
                          </Select>
                        </FormItem>
                      </li>
                      <li class="second-row">
                        <FormItem label="姓名"
                                  prop="name"
                                  class="front-form-row">
                          <Input type="text"
                                 v-model.trim="orderForm.data.name"></Input>
                        </FormItem>
                        <FormItem label="证件类型"
                                  prop="identity_type"
                                  class="front-form-row">
                          <Select v-model="orderForm.data.identity_type"
                                  filterable>
                            <Option v-for="item in selectOptions.identity_type"
                                    :value="item.value"
                                    :key="item.value">{{ item.label }}</Option>
                          </Select>
                        </FormItem>
                        <FormItem label="证件号"
                                  prop="identity_num"
                                  class="front-form-row"
                                  :label-width="55 + 10">
                          <Input type="text"
                                 :disabled="orderForm.data.identity_type !== 1"
                                 @on-enter="getAppointmentInfo"
                                 v-model.trim="orderForm.data.identity_num"></Input>
                        </FormItem>
                      </li>
                      <li class="third-row">
                        <FormItem label="年龄"
                                  prop="age"
                                  class="front-form-row">
                          <z-input type="number"
                                   number
                                   v-model="orderForm.data.age"></z-input>
                        </FormItem>
                        <FormItem label="性别"
                                  prop="sex"
                                  class="front-form-row">
                          <Select v-model="orderForm.data.sex"
                                  filterable>
                            <Option v-for="item in selectOptions.sex"
                                    :value="item.value"
                                    :key="item.value">{{ item.label }}</Option>
                          </Select>
                        </FormItem>
                        <FormItem label="手机号码"
                                  prop="mobile"
                                  class="front-form-row"
                                  :label-width="55 + 10">
                          <Input type="text"
                                 v-model.trim="orderForm.data.mobile"></Input>
                        </FormItem>
                      </li>
                      <li class="four-row">
                        <FormItem label="单位名称"
                                  prop="unit_name"
                                  class="front-form-row">
                          <Input type="text"
                                 v-model.trim="orderForm.data.unit_name"></Input>
                        </FormItem>
                        <FormItem label="车间/部门"
                                  prop="department"
                                  class="front-form-row"
                                  :label-width="55 + 10">
                          <Select v-model="orderForm.data.department"
                                  :class='{selectVerificationTs: isEmpty(orderForm.data.department)}'
                                  filterable>
                            <Option v-for="item in department"
                                    :value="item.value"
                                    :key="item.value">{{ item.label }}</Option>
                          </Select>
                        </FormItem>
                        <p>
                          <template v-if="isFromUnit">
                            <span>来源：
                              <b>单位</b>
                            </span>
                            <span>个人支付比例：
                              <b>0.9</b>
                            </span>
                            <span>新增费用支付方：
                              <b>单位</b>
                            </span>
                            <span>预约渠道：
                              <b>微信</b>
                            </span>
                          </template>
                          <template v-else>
                            <span>来源：
                              <b>个人</b>
                            </span>
                          </template>
                        </p>
                      </li>
                      <li class="six-row">
                        <FormItem label="体检类别"
                                  prop="pe_type"
                                  class="front-form-row">
                          <Select v-model="orderForm.data.pe_type"
                                  filterable>
                            <Option v-for="item in selectOptions.pe_type"
                                    :value="item.value"
                                    :key="item.value">{{ item.label }}</Option>
                          </Select>
                        </FormItem>
                      </li>
                      <li class="other-row">
                        <template v-if="orderForm.data.pe_type === 1"></template>
                        <template v-else-if="orderForm.data.pe_type === 3">
                          <div class="healthyCardExam-box">
                            <FormItem label="从业行业"
                                      prop="industry"
                                      class="front-form-row">
                              <Select v-model="orderForm.data.industry"
                                      filterable>
                                <Option v-for="item in industrys"
                                        :value="item.id"
                                        :key="item.id">{{ item.name }}</Option>
                              </Select>
                            </FormItem>
                            <FormItem label="工种"
                                      prop="typeOfWork"
                                      class="front-form-row">
                              <Select v-model="orderForm.data.typeOfWork"
                                      filterable>
                                <Option v-for="item in occupTypes"
                                        :value="item.id"
                                        :key="item.id">{{ item.name }}</Option>
                              </Select>
                            </FormItem>
                          </div>
                        </template>
                        <template v-if="orderForm.data.pe_type === 2">
                          <!-- <div class="proExam-box contentBg">
                            <title-has-slot>
                              <span slot="titletHasSlotLeftTitle">职业病危害因素</span>
                              <div slot="titletHasSlotRightContent"
                                   class="title-form">
                                <FormItem label="工种"
                                          prop="typeOfWork"
                                          class="front-form-row">
                                  <Select v-model="orderForm.data.typeOfWork"
                                          filterable>
                                    <Option v-for="item in occupTypes"
                                            :value="item.id"
                                            :key="item.id">{{ item.name }}</Option>
                                  </Select>
                                </FormItem>
                                <FormItem label="接害工龄"
                                          prop="touchHarmTime"
                                          class="front-form-row">
                                  <Input type="text"
                                         v-model.trim="orderForm.data.touchHarmTime"
                                         class="year"></Input>
                                </FormItem>
                                <FormItem label="总工龄"
                                          prop="totalTime"
                                          class="front-form-row">
                                  <Input type="text"
                                         v-model.trim="orderForm.data.totalTime"
                                         class="year"></Input>
                                </FormItem>
                              </div>
                            </title-has-slot>
                            <div class="likenessTable">
                              <div class="likenessTable-th">
                                <div class="likenessTable-th-l">
                                  职业病危害因素名称
                                </div>
                                <div class="likenessTable-th-r">
                                  职业健康检查种类
                                </div>
                              </div>
                              <div class="likenessTable-tr">
                                <ul>
                                  <li v-for="(item, index) in affirmFactorArr"
                                      :key="item.id"
                                      class="lis">
                                    <span class="likenessTable-tr-l">{{item.name}}</span>
                                    <span class="likenessTable-tr-r">
                                      <Select v-model="orderForm.data.healthyCheckType"
                                              filterable>
                                        <Option v-for="item in selectOptions.healthyCheckType"
                                                :value="item.value"
                                                :key="item.value">{{ item.label }}</Option>
                                      </Select>
                                    </span>
                                  </li>
                                  <li class="lis">
                                    <span class="likenessTable-tr-l"
                                          style="color: #CCCCCC;cursor: pointer;"
                                          @click="openAffirmFactor">添加危害因素</span>
                                    <span class="likenessTable-tr-r"
                                          style="color: #CCCCCC;cursor: pointer;">选择在岗位状态</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div> -->
                          <harmFactorBox @edit-harm-factor="openAffirmFactor">
                            <div slot="title-form-slot">
                              <FormItem label="工种"
                                        prop="typeOfWork"
                                        class="front-form-row">
                                <Select v-model="orderForm.data.typeOfWork"
                                        filterable>
                                  <Option v-for="item in selectOptions.typeOfWork"
                                          :value="item.value"
                                          :key="item.value">{{ item.label }}</Option>
                                </Select>
                              </FormItem>
                              <FormItem label="接害工龄"
                                        prop="touchHarmTime"
                                        class="front-form-row">
                                <Input type="text"
                                       v-model.trim="orderForm.data.touchHarmTime"
                                       class="year"></Input>
                              </FormItem>
                              <FormItem label="总工龄"
                                        prop="totalTime"
                                        class="front-form-row">
                                <Input type="text"
                                       v-model.trim="orderForm.data.totalTime"
                                       class="year"></Input>
                              </FormItem>
                            </div>
                          </harmFactorBox>
                        </template>
                        <!-- 职业体检 -->
                        <template v-if="orderForm.data.pe_type === 4">
                          <ul class="radiateExam-box">
                            <li class="first">
                              <FormItem label="放射线种类:"
                                        prop="radiationType"
                                        class="front-form-row">
                                <CheckboxGroup v-model="orderForm.data.radiationType">
                                  <Checkbox label="α射线">
                                    <span>α射线</span>
                                  </Checkbox>
                                  <Checkbox label="β射线">
                                    <span>β射线</span>
                                  </Checkbox>
                                  <Checkbox label="中子射线">
                                    <span>中子射线</span>
                                  </Checkbox>
                                  <Checkbox label="质子射线">
                                    <span>质子射线</span>
                                  </Checkbox>
                                  <Checkbox label="电子射线">
                                    <span>电子射线</span>
                                  </Checkbox>
                                </CheckboxGroup>
                              </FormItem>
                            </li>
                            <li class="second">
                              <FormItem label="每日工作时数或工作量:"
                                        prop="dailyWorkLoad"
                                        class="front-form-row">
                                <Input type="text"
                                       v-model.trim="orderForm.data.dailyWorkLoad"></Input>
                              </FormItem>
                              <FormItem label="过量照射史:"
                                        prop="overexposureHistory"
                                        class="front-form-row">
                                <RadioGroup v-model="orderForm.data.overexposureHistory">
                                  <Radio label="是">
                                    <span>是</span>
                                  </Radio>
                                  <Radio label="否">
                                    <span>否</span>
                                  </Radio>
                                </RadioGroup>
                              </FormItem>
                              <FormItem label="佩戴个人剂量:"
                                        prop="personalDose"
                                        class="front-form-row">
                                <RadioGroup v-model="orderForm.data.personalDose">
                                  <Radio label="是">
                                    <span>是</span>
                                  </Radio>
                                  <Radio label="否">
                                    <span>否</span>
                                  </Radio>
                                </RadioGroup>
                              </FormItem>
                            </li>
                            <li class="third">
                              <FormItem label="职业健康检查种类:"
                                        prop="healthyCheckType"
                                        class="front-form-row">
                                <Select v-model="orderForm.data.healthyCheckType"
                                        filterable>
                                  <Option v-for="item in occupHealthExaminationTypes"
                                          :value="item.id"
                                          :key="item.id">{{ item.name }}</Option>
                                </Select>
                              </FormItem>
                              <FormItem label="累计受照剂量:"
                                        prop="totalExposureDose"
                                        class="front-form-row">
                                <Input type="text"
                                       v-model.trim="orderForm.data.totalExposureDose"></Input>
                              </FormItem>
                            </li>
                            <li class="four">
                              <FormItem label="特殊情况:"
                                        prop="specialSituation"
                                        class="front-form-row">
                                <CheckboxGroup v-model="orderForm.data.specialSituation"
                                               @on-change="specialSituation">
                                  <Checkbox label="穿戴呼吸防护罩">
                                    <span>穿戴呼吸防护罩</span>
                                  </Checkbox>
                                  <Checkbox label="非密封源">
                                    <span>非密封源</span>
                                  </Checkbox>
                                  <Checkbox label="心理障碍">
                                    <span>心理障碍</span>
                                  </Checkbox>
                                  <Checkbox label="无">
                                    <span>无</span>
                                  </Checkbox>
                                </CheckboxGroup>
                              </FormItem>
                            </li>
                            <li class="five">
                              <Checkbox v-model="isPrintCard"
                                        class="print-card">打证</Checkbox>
                              <FormItem label="申请类型:"
                                        prop="applicationType"
                                        class="front-form-row">
                                <Select v-model="orderForm.data.applicationType"
                                        filterable>
                                  <Option v-for="item in selectOptions.applicationType"
                                          :value="item.value"
                                          :key="item.value">{{ item.label }}</Option>
                                </Select>
                              </FormItem>
                            </li>
                          </ul>
                        </template>
                      </li>
                      <li class="seven-row">
                        <FormItem label="已选"
                                  prop="selectedCombo"
                                  class="front-form-row">
                          <Input type="text"
                                 v-model.trim="orderForm.data.selectedCombo"
                                 :disabled="orderForm.data.sex === null"
                                 @on-focus="selectedBlur"
                                 @click.native="editOrderItems"></Input>
                          <i class="icon-pen"
                             @click.stop="editOrderItems"></i>
                        </FormItem>
                      </li>
                      <li class="appointment-time-row">
                        <FormItem label="预约日期"
                                  prop="selectedCombo"
                                  class="front-form-row">
                          <DatePicker style="width: 380px;"></DatePicker>
                        </FormItem>
                      </li>
                      <li class="five-row">
                        <FormItem label="备注"
                                  prop="remark"
                                  class="front-form-row">
                          <Input type="text"
                                 v-model.trim="orderForm.data.remark"></Input>
                        </FormItem>
                      </li>
                    </ul>
                    <!-- ============================================================================= -->
                  </Form>
                </div>
                <!-- 表单部分 -->

                <!-- 各种费用显示 -->
                <div class="amount">
                  <div>
                    <div class="row">
                      <span>附加费：{{surchargeText}}</span>
                    </div>
                    <div class="row">
                      <span class="marginR20">项目合计金额：
                        <b class="enlarge">999.00</b>元
                      </span>
                      <span>订单金额：
                        <b class="enlarge">999.00</b>元
                      </span>
                    </div>
                    <div class="row">
                      <div>
                        <span class="marginR20">
                          已收金额：
                          <b class="enlarge">999.00</b>元
                        </span>
                        <span>
                          待收金额：
                          <b class="enlarge">999.00</b>元
                        </span>
                      </div>
                      <span class="discount">
                        <span class="marginR10">折扣</span>
                        <Input type="text"
                               class="marginR20"
                               style="width: 70px;"></Input>
                        <span class="marginR10">减免金额</span>
                        <Input type="text"
                               class="yuan"
                               style="width: 120px;"></Input>
                      </span>
                    </div>
                  </div>
                </div>
                <!-- 各种费用显示 -->

                <!-- 提交清空按钮 -->
                <div class="final-btn">
                  <span class="ysje">应收金额：
                    <b>999.9999</b>元</span>
                    <!--frontAppointmentEmpty -->
                  <Button type="ghost"
                          @click="openQKTip">清 空</Button>
                  <Button type="primary"
                          @click="frontAppointmentSubmit">完 成</Button>
                  <Checkbox v-model="orderForm.data.isPrint">打印缴费凭条</Checkbox>
                </div>
                <!-- 提交清空按钮 -->
              </div>

            </div>
            <!-- 表单列 -->
          </div>
          <!-- left -->
          <!-- right -->
          <div class="content-right">
            <div class="content-right-table">
              <group-items-and-surcharge ref="groupItemsAndSurcharge"></group-items-and-surcharge>
              <div class="content-right-table-icon">
                <!-- 这个地方的v-show当复检时才为true -->
                <icon class="addItemRecheck"
                      v-if="true"
                      @click="addRecheckItem"></icon>
                <!-- 这个地方的v-show当选择了职业危害因素时才为true -->
                <icon class="addItemMustExam"
                      v-if="true"
                      @click="addMustExamItem"></icon>
              </div>
            </div>
            <!-- <div class="content-right-text">
              <p>
                <icon name="addNewItemT"
                      class="handler"></icon>加入复检项目</p>
              <p>
                <icon name="addNewItemT"
                      class="handler"></icon>添加危害因素对应必检、选检项目</p>
            </div> -->
          </div>
          <!-- right -->
        </div>
      </div>
    </div>
    <!-- 主页面 -->

    <!-- 选择套餐及项目弹窗 -->
    <div class="chooseItemsModal">
      <choose-items-modal v-if="chooseItemsModal"
                          :ifShowModal.sync="chooseItemsModal"
                          :sex="customerSex"
                          @on-submit="commitChooseMealProject"></choose-items-modal>
    </div>
    <!-- 选择套餐及项目弹窗 -->

    <!-- 修改职业病危害因素 -->
    <occupHarmFactorModal :controlModal="occupHarmFactor"
                          :factorTypes="factorTypes"
                          @add-affirm-factor="addAffirmFactor"
                          @cancel-add-factor="cancelAddFactor"></occupHarmFactorModal>
    <!-- 修改职业病危害因素 -->

    <!-- 提示2 -->
    <tip-modal :controlModal="tipModalControl"
               :mainContent="tipModalContent"
               @tip-modal-affirm="tipModalAffirm"
               @tip-modal-cancel="tipModalCancel"></tip-modal>
    <!-- 提示2 -->

    <!-- 编辑头像 -->
    <photo-modal :photoModal='photoModal'
                 @take-photo='takePhotoOne'
                 @close-photo='closePhotoOne'>
    </photo-modal>
    <add-photo-modal :addPhotoModal.sync='addPhotoModal'
                     @take-photo='takePhoto'
                     @save-photo='savePhoto'></add-photo-modal>
    <!-- 编辑头像 -->

    <!-- 选择预约订单弹窗 -->
    <choose-order-modal :show.sync="showOrderModal"
                        @on-select-order="selectOrder"></choose-order-modal>
    <!-- 选择预约订单弹窗 -->

    <!-- 清空提示 -->
    <tip-modal :controlModal="qxTipModalControl"
               :mainContent="qkTipModalContent"
               @tip-modal-affirm="qkTipModalAffirm"
               @tip-modal-cancel="qkTipModalCancel"></tip-modal>
    <!-- 清空提示 -->

  </div>
</template>

<script>
// 依赖文件
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import * as types from '@/store/modules/prepare/appointmentCheckup/frontAppointment/frontAppointmentTypes'
import axios from 'axios'
import * as _ from 'lodash'
import config from '@/service/config'
import helper from '@/utils/helper'
import validators from '@/validators'

// 公共组件
import addPhotoModal from '@/views/main/prepare/components/modal/addPhotoModal'
import photoModal from '@/views/main/prepare/components/modal/photoModal'
// import tipModal from '@/views/main/prepare/components/modal/tipModal'
// import dataComponent from '@/components/calendar/dateComponent'

// 私有组件
import chooseItemsModal from './components/modal/chooseItemsModal'
import chooseOrderModal from './components/modal/chooseOrderModal'
import groupItemsAndSurcharge from './components/groupItemsAndSurcharge'
import occupHarmFactorModal from './components/modal/occupHarmFactorModal'
import harmFactorBox from '@/views/main/prepare/appointmentCheckup/frontAppointment/components/harmFactorBox'

export default {
  name: 'frontAppointment',
  components: {
    addPhotoModal, // 添加头像弹窗
    chooseItemsModal, // 选择项目弹窗（选择套餐、项目和附加费）
    chooseOrderModal, // 选择订单弹窗
    groupItemsAndSurcharge, // 项目列表（右侧）
    occupHarmFactorModal, // 新增或编辑职业危害因素弹窗
    photoModal, // 头像弹窗
    // tipModal, // 提示弹窗
    // dataComponent, // 预约日期组件
    harmFactorBox, // 职业病危害因素组件
  },
  computed: {
    ...mapGetters('frontAppointmentModule', [
      'packages', // 当前套餐
      'industrys', // 从业行业列表
      'occupTypes', // 工种列表
      'occupHealthExaminationTypes', // 职业健康检查种类
      'occupHarmFactors', // 职业病危害因素列表
    ]),
    ...mapState('frontAppointmentModule', [
      'examComboList', // 所有套餐列表
      'allExamProList', // 全部项目列表
      'proOfExamComboList', // 套餐内项目列表
      'selectOptions', // 下拉选项
      'curOrder', // 当前订单
    ]),
    ...mapState('configModule', ['defaultAvatarPath']),
    userAvatar() {
      if (this.orderForm.img) {
        return config.serverUrl + '/' + this.orderForm.img
      }
      return this.defaultAvatarPath
    },
    customerSex() {
      return ['0', (this.orderForm.data.sex || 1) + '']
    },
    surchargeText() {
      return '检查费-早餐费：40.00元；耗材费-一次性注册费：40.00元；'
    },
  },
  data() {
    return {
      addPhotoModal: false,
      photoModal: false,
      chooseItemsModal: false, // 选择套餐及项目
      frontTsModal: false, // 提示弹窗1
      occupHarmFactor: false, // 职业危害因素modal
      isSelected: true, // 自动跳转下一个
      showOrderModal: false, // 预约订单弹窗
      isFromUnit: true, // 来源是否是单位
      qxTipModalControl: false, // 清空前提示弹窗
      affirmFactorArr: [], // 职业病危害因素对象数组
      factorTypes: [],
      harmFactorListClone: [],
      tipModalContent: '确认修改已选项目吗?',
      qkTipModalContent: '确认清空所有已录入信息吗?',
      tipModalControl: false,
      examComboListClone: null,
      allExamProListClone: null,
      examComboListFilter: null, // 经过filter男女后的可选套餐
      allExamProListFilter: null, // 经过filter男女后的所有项目
      department: [
        {
          label: '技术部',
          value: 1,
        },
      ], //  部门临时数据
      orderForm: {
        data: {
          id: null, // 用户ID
          ha_id: null, // 档案号
          // vip_id: null, // vip号
          is_recheck: 0, // 是否复检
          name: null, // 姓名
          age: null, // 年龄
          identity_type: 1, // 证件类型
          identity_num: '510333199911110252', // 证件号
          mobile: null, // 手机号
          sex: null, // 性别
          unit_name: null, // 单位
          department: 1, // 部门
          pe_type: 1, // 体检类别
          img: null, // 头像地址
          remark: null, // 备注
          selectedCombo: null, // 已选套餐
          // ================================
          overexposureHistory: '否', // 过量照射史
          personalDose: '是', // 个人剂量
          specialSituation: [], // 特殊情况
        },
        rules: {
          // vip_id: [
          //   { required: true, message: 'vip号不能为空', trigger: 'blur' },
          // ],
          name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
          age: [
            {
              required: true,
              type: 'number',
              message: '年龄不能为空',
              trigger: 'blur',
            },
            {
              validator: (rule, value, callback) => {
                if (
                  typeof value === 'number' &&
                  value >= 0 &&
                  value === ~~value
                ) {
                  callback()
                } else {
                  callback(new Error('年龄必须是正整数'))
                }
              },
              trigger: 'blur',
            },
          ],
          identity_type: [
            {
              validator: (rule, value, callback) => {
                if (value !== 1) {
                  callback(new Error('暂时只支持身份证证件'))
                } else {
                  callback()
                }
              },
              trigger: 'change',
            },
          ],
          identity_num: [
            {
              required: true,
              trigger: 'blur',
              message: '证件号不能为空',
            },
            {
              trigger: 'blur',
              validator: (rule, value, callback) => {
                if (this.orderForm.data.identity_type === 1) {
                  validators.ifIdNum(rule, value, errors => {
                    if (
                      errors.length === 0 &&
                      typeof this.orderForm.data.age !== 'number'
                    ) {
                      let id = value
                      if (value.length === 15) {
                        id = value.slice(0, 6) + '19' + value.slice(6)
                      }
                      let birthday = [
                        id.slice(6, 10),
                        id.slice(10, 12),
                        id.slice(12, 14),
                      ].join('-')
                      this.orderForm.data.age = helper.getAge(birthday)
                    }
                    callback(errors)
                  })
                } else {
                  callback()
                }
              },
            },
          ],
          mobile: [
            {
              required: true,
              message: '手机号码不能为空',
              trigger: 'blur',
            },
            {
              trigger: 'blur',
              validator: validators.ifPhoneNum,
            },
          ],
          sex: [
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('性别不能为空'))
                } else {
                  callback()
                }
              },
              trigger: 'change',
            },
          ],
          // unit_name: [
          //   { required: true, message: '单位名称不能为空', trigger: 'blur' },
          // ],
          pe_type: [
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('体检类别不能为空'))
                } else {
                  callback()
                }
              },
              trigger: 'change',
            },
          ],
        },
      },
      tableColumns: [
        {
          title: '职业病危害因素名称',
          key: 'name',
          align: 'center',
          // render: ()
        },
        {
          title: '职业健康检查种类',
          key: 'kind',
          align: 'center',
        },
      ],
      tableData: [],
    }
  },
  methods: {
    selectedBlur($event) {
      $event.target.blur()
    },
    ...mapActions('frontAppointmentModule', [
      'getExamComboList',
      'getAllExamPro',
      'getProOfExamComboList',
      'getHistoricalOrders',
      'getIndustrys',
      'getOccupTypes',
      'getOccupHealthExaminationTypes',
      'getOccupHarmFactors',
    ]),
    ...mapActions('categoriesAndFactorsModule', [
      'getHarmCategory', // 危害类别
      'getHarmFactor', // 危害因素
    ]),
    ...mapMutations('frontAppointmentModule', {
      // 设置当前订单
      setCurOrder: types.SET_CUR_ORDER,
      // 设置当前选择项目
      setCurSelectGroupItems: types.SET_CUR_SELECT_GROUP_ITEMS,
      // 设置当前选择附加费
      setCurSelectSurcharges: types.SET_CUR_SELECT_SURCHARGES,
    }),
    // 为空验证
    isEmpty(data) {
      if (data === '' || data === undefined || data === null) {
        return true
      } else {
        return false
      }
    },
    openQKTip () {
      this.qxTipModalControl = true
    },
    specialSituation(data) {
      console.log(data)
      // 特殊情况checkbox发生变化时触发
      if (data[data.length - 1] === '无') {
        this.orderForm.data.specialSituation.splice(0, data.length - 1)
      }
      if (data[data.length - 1] !== '无' && data[0] === '无') {
        this.orderForm.data.specialSituation.splice(0, 1)
      }
    },
    // 设置当前选择数据
    setCurSelectData() {
      // 获取当前组合项目
      this.setCurSelectGroupItems(this.curOrder.item_charges)

      // 获取当前附加费
      this.setCurSelectSurcharges(this.curOrder.surcharge)
    },
    // 选中订单 by zero
    selectOrder(data) {
      // 设置当前选中订单
      this.setCurOrder(data)
      this.orderForm.data.remark = data.remark
      this.orderForm.data.pe_type = data.pe_detail.pe_type
      this.orderForm.data.selectedCombo = data.pe_detail.pe_package

      this.setCurSelectData()
    },
    // 获取顾客预约信息 by zero
    getAppointmentInfo() {
      this.$refs.orderForm.validateField('identity_num', async result => {
        if (!result) {
          let result = await this.getHistoricalOrders({
            identity_type: this.orderForm.data.identity_type,
            identifier: this.orderForm.data.identity_num,
            source: 0,
          })
          let customer = result.customer
          let customerFromData = this.orderForm.data

          // 将后台数据存储到本地变量中
          if (customer) {
            // 自动填充当前用户信息
            for (let field in customer) {
              if (field in customerFromData) {
                customerFromData[field] = customer[field]
              }
            }

            // 判断是否有历史订单
            if (result.history && result.history.length) {
              this.showOrderModal = true
            }
          } else {
            // 清空上一位用户信息
            let {
              identity_num: identityNum,
              identity_type: identityType,
            } = customerFromData

            // 证件类型和证件号保持不变
            this.frontAppointmentEmpty()
            customerFromData.identity_num = identityNum
            customerFromData.identity_type = identityType
          }
        }
      })
    },
    editOrderItems() {
      // 修改订单内项目套餐,先弹出确认修改项目弹窗
      // if (!this.orderForm.data.sex) {
      //   return
      // }
      // this.tipModalControl = true
      this.chooseItemsModal = true
    },
    gotoHealthyRecord() {
      // 进入健康档案
    },
    editAvatar() {
      // 编辑头像
      console.log('编辑头像')
    },
    cancelChooseMealProject() {
      console.log('取消选择套餐及项目')
      this.chooseItemsModal = false
    },
    commitChooseMealProject() {
      console.log('完成选择项目套餐及项目')
      this.chooseItemsModal = false
    },
    frontAppointmentSubmit() {
      this.$refs.orderForm.validate(result => {
        console.log(result)
      })
    },
    // 清空表单 by zero
    frontAppointmentEmpty() {
      // 清空
      this.$refs.orderForm.resetFields()
      // 清空 select 查询 不然存在查询的文字 虽然数据已经被重置
      this.$refs.orderForm.$children.forEach(children => {
        if (Array.isArray(children.$children)) {
          children.$children.forEach(item => {
            if (
              item.$options._componentTag === 'Select' &&
              !this.orderForm.data[children.prop]
            ) {
              item.query = ''
            }
          })
        }
      })
    },
    addAffirmFactor(data) {
      // 点击危害因素弹出确认触发
      this.affirmFactorArr = []
      this.affirmFactorArr = data
      console.log(data)
    },
    cancelAddFactor() {
      // 点击危害因素弹出取消触发
      this.occupHarmFactor = false
    },
    clickWrapper(event) {
      // 鼠标点击进度条触发
      console.log(event)
      if (this.$refs.waitingStaffWrapper.style.display === 'none') {
        this.$refs.waitingStaffWrapper.style.left = event.clientX - 325 + 'px'
        this.$refs.waitingStaffWrapper.style.display = 'block'
      } else {
        this.$refs.waitingStaffWrapper.style.display = 'none'
      }
    },
    async tipModalAffirm(data) {
      this.tipModalControl = data
      this.chooseItemsModal = true
    },
    tipModalCancel(data) {
      this.tipModalControl = data
    },
    qkTipModalAffirm (data) {
      this.qxTipModalControl = false
      this.frontAppointmentEmpty()
    },
    qkTipModalCancel (data) {
      this.qxTipModalControl = false
    },
    savePhoto(clipUrlData) {
      this.imga = clipUrlData
      // console.log('savePhoto')
      // console.log('savePhoto', clipUrlData)
      let $Blob = this.getBlobBydataURI(clipUrlData, 'image/png')
      let formData = new FormData()
      formData.append(
        'images[]',
        $Blob,
        'file_' + Date.parse(new Date()) + '.png',
      )
      formData.append('realname', '张学友')
      formData.append('sex', 1)
      console.log(formData.get('images[]'))
      axios.post(`api/baseinfo/staffs`, formData, { authorize: true })
    },
    takePhotoOne(urldata) {
      this.addPhotoModal = true
      this.photoModal = false
    },
    closePhotoOne () { // 关闭
      this.photoModal = false
    },
    takePhoto() {
      this.photoModal = true
      this.addPhotoModal = false
    },
    // 添加头像
    addPhoto() {
      // this.addPhotoModal = true
      this.photoModal = true
    },
    addRecheckItem() {
      // 加入复检项目
    },
    addMustExamItem() {
      // 加入必检项目
    },
    // async openAffirmFactor() {
    //   // 点击添加危害因素打开弹窗
    //   // await this.getHarmCategory({ size: 0, status: 1 })
    //   this.factorTypes = this.harmCategoryList
    //   this.occupHarmFactor = true
    // },
    async openAffirmFactor() {
      // 点击添加危害因素打开弹窗
      console.log('222222222')
      await Promise.all([
        this.getHarmCategory({ size: 0, status: 1 }),
        this.getHarmFactor({ size: 0, status: 1 }),
      ])
      this.factorTypes = _.cloneDeep(this.harmCategoryList)
      this.harmFactorListClone = _.cloneDeep(this.HarmFactorList)
      // this.factorTypes = this.harmCategoryList
      this.occupHarmFactor = true
    },
  },
  async created() {
    await Promise.all([
      // 获取工种展示数据
      this.getIndustrys({
        fields: 'id,name',
        per_page: 10000,
        filters: 'status:1',
      }),
      // 获取从业行业展示数据
      this.getOccupTypes({
        fields: 'id,name',
        per_page: 10000,
        filters: 'status:1',
      }),
      // 获取职业病危害因素
      this.getOccupHealthExaminationTypes({
        fields: 'id,name',
        per_page: 10000,
        filters: 'status:1',
      }),
      // 获取职业健康检查种类
      this.getOccupHarmFactors({
        fields: 'id,name',
        per_page: 10000,
        filters: 'status:1',
      }),
    ])
  },
}
</script>

<style lang="less">
@import (reference) '~assets/less/variable.less';
.frontAppointment-wrapper {
  position: relative;
  margin: 0 auto;
  height: 100%;
  .frontAppointment-main {
    padding: @num10;
    width: 100%;
    height: 100%;
    position: relative;
    .frontAppointment-main-content {
      height: 100%;
      overflow-y: auto;
      .frontAppointment-main-content-wrapper {
        position: relative;
        display: flex;
        height: 100%;
        width: 1190px;
        margin: 0 auto;
        .content-left {
          height: 100%;
          flex: 1;
          padding: @num30 @num10 @num30 @num30;
          display: flex;
          // background: pink;
          position: relative;
          max-width: 861px;
          .avatar-col {
            width: 118px;
            padding-right: @num20;
            text-align: center;
            // background: powderblue;
            .avatar {
              height: 120px;
              width: 98px;
              border: 1px solid #008cee;
              background-repeat: no-repeat;
              background-size: 100%;
              // background: lightgreen;
              margin-bottom: @num20;
              // cursor: pointer;
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
                // display: none;
              }
            }
            // .avatar:hover {
            //   .editAvatar {
            //     display: block;
            //   }
            // }
            Button {
              margin-bottom: @num10;
            }
            .recheckIcon {
              color: #5cad00;
            }
            .icon-success {
              display: inline-block;
              width: 15px;
              height: 15px;
              font-size: @font12;
              background: url('/static/icons/public/enabledState.svg') no-repeat;
              position: relative;
              top: 3px;
            }
          }
          .form-col {
            flex: 1;
            // width: 100%;
            // background:peachpuff;
            font-size: 0;
            display: flex;
            flex-direction: column;
            .form-col-one {
              // overflow-x: scroll;
              flex: 1;
              .form-content {
                .front-form {
                  // padding-top: @num20;
                  font-size: 0;
                  .front-form-row {
                    padding: 0 @num20;
                    height: 30px;
                    & > .ivu-form-item-label {
                      padding: @num10 @num10 0 0;
                      text-align: justify;
                      &::after {
                        content: '';
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
                }
                .first-row {
                  .front-form-row {
                    display: inline-block;
                    .ivu-input-wrapper {
                      width: 148px;
                    }
                    .ivu-select-single {
                      width: 148px;
                    }
                    .ivu-form-item-content {
                      position: relative;
                      left: -3px;
                    }
                  }
                  .front-form-row:nth-of-type(1) {
                    padding-left: 0;
                    padding-right: 25px;
                    .ivu-form-item-label {
                      // position: relative;
                      // left: -20px;
                      width: 82px !important;
                    }
                    .ivu-form-item-content {
                      height: @num30;
                      margin-left: 82px !important;
                    }
                  }
                  .front-form-row:nth-of-type(2) {
                    padding-left: 0;
                    padding-right: 25px;
                  }
                  .front-form-row:nth-of-type(3) {
                    padding-left: 0;
                    padding-right: 0;
                  }
                }
                .second-row {
                  .front-form-row {
                    display: inline-block;
                    .ivu-input-wrapper {
                      width: 148px;
                    }
                    .ivu-select-single {
                      width: 148px;
                    }
                  }
                  .front-form-row:nth-of-type(1) {
                    padding-right: 25px;
                  }
                  .front-form-row:nth-of-type(2) {
                    padding-left: 0;
                    padding-right: 25px;
                  }
                  .front-form-row:nth-of-type(3) {
                    padding-left: 0;
                    padding-right: 0;
                  }
                }
                .third-row {
                  .front-form-row {
                    display: inline-block;
                    .ivu-select-single {
                      width: 148px;
                    }
                    .ivu-input-wrapper {
                      width: 148px;
                    }
                  }
                  .front-form-row:nth-of-type(1) {
                    padding-right: 25px;
                  }
                  .front-form-row:nth-of-type(2) {
                    padding-left: 0;
                    padding-right: 25px;
                  }
                  .front-form-row:nth-of-type(3) {
                    padding-left: 0;
                    padding-right: 0;
                  }
                }
                .four-row {
                  border-bottom: 1px solid #cccccc;
                  .front-form-row {
                    display: inline-block;
                    .ivu-input-wrapper {
                      width: 380px;
                    }
                    .ivu-select-single {
                      width: 148px;
                    }
                  }
                  .front-form-row:nth-of-type(1) {
                    padding-right: 25px;
                  }
                  .front-form-row:nth-of-type(2) {
                    padding: 0;
                  }
                  p {
                    padding: 0 0 @num10 @num20;
                    // margin-bottom: @num20;
                    box-sizing: border-box;
                    color: #4a4a4a;
                    span {
                      display: inline-block;
                      font-size: @font12;
                      margin-right: 25px;
                    }
                    span:nth-of-type(3) {
                      padding-right: 25px;
                      box-sizing: border-box;
                      border-right: 1px solid #979797;
                    }
                    b {
                      color: #000000;
                    }
                  }
                }
                .five-row {
                  .front-form-row {
                    display: inline-block;
                    .ivu-input-wrapper {
                      width: 380px;
                    }
                    .ivu-select-single {
                      width: 380px;
                    }
                  }
                }
                .six-row {
                  margin-top: @num20;
                  .front-form-row {
                    display: inline-block;
                    .ivu-select-single {
                      width: 380px;
                    }
                  }
                }
                .seven-row {
                  .front-form-row {
                    .ivu-input-wrapper {
                      width: 380px;
                      // position: relative;
                    }
                  }
                  .icon-pen {
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    font-size: @font12;
                    background: url('/static/icons/public/editPen.svg')
                      no-repeat;
                    position: relative;
                    right: 26px;
                    top: 6px;
                    cursor: pointer;
                  }
                }
                // .eight-row {
                //   .front-form-row {
                //     .ivu-input-wrapper {
                //       width: 380px;
                //     }
                //   }
                // }
                // .nine-row {
                //   .front-form-row {
                //     .ivu-select-single {
                //       width: 380px;
                //     }
                //   }
                // }
                // .ten-row {
                //   .front-form-row {
                //     .ivu-input-wrapper {
                //       width: 220px;
                //       // position: relative;
                //     }
                //   }
                //   .icon-pen {
                //     display: inline-block;
                //     width: 15px;
                //     height: 15px;
                //     font-size: @font12;
                //     background: url('/static/icons/public/editPen.svg')
                //       no-repeat;
                //     position: relative;
                //     right: 26px;
                //     top: 6px;
                //     cursor: pointer;
                //   }
                // }
                .other-row {
                  .healthyCardExam-box {
                    width: 680px;
                    height: 70px;
                    background: #f2f7ff;
                    margin-bottom: @num20;
                    .front-form-row {
                      display: inline-block;
                      margin-top: @num20;
                      .ivu-select-single {
                        width: 148px;
                      }
                    }
                  }
                  .radiateExam-box {
                    width: 680px;
                    height: 270px;
                    background: #f2f7ff;
                    padding: @num20 15px 0 15px;
                    margin-bottom: @num20;
                    .front-form-row {
                      padding-left: 0;
                      padding-right: 0;
                    }
                    .first {
                      .front-form-row {
                        .ivu-form-item-label {
                          width: 82px !important;
                        }
                        .ivu-form-item-content {
                          margin-left: 82px !important;
                          .ivu-checkbox-group {
                            height: @num30;
                            line-height: @num30;
                          }
                        }
                      }
                    }
                    .second {
                      .front-form-row {
                        display: inline-block;
                        .ivu-input-wrapper {
                          width: 100px;
                        }
                      }
                      .front-form-row:nth-of-type(1) {
                        padding-left: 0;
                        padding-right: 20px !important;
                        .ivu-form-item-label {
                          width: 142px !important;
                        }
                        .ivu-form-item-content {
                          height: @num30;
                          margin-left: 142px !important;
                        }
                      }
                      .front-form-row:nth-of-type(2) {
                        padding-left: 0;
                        padding-right: 20px !important;
                        .ivu-form-item-label {
                          width: 82px !important;
                        }
                        .ivu-form-item-content {
                          height: @num30;
                          margin-left: 82px !important;
                        }
                      }
                      .front-form-row:nth-of-type(3) {
                        padding-left: 0;
                        padding-right: 0;
                        .ivu-form-item-label {
                          width: 96px !important;
                        }
                        .ivu-form-item-content {
                          height: @num30;
                          margin-left: 96px !important;
                        }
                      }
                      .ivu-radio-group {
                        height: @num30;
                        line-height: @num30;
                      }
                    }
                    .third {
                      .front-form-row {
                        display: inline-block;
                        .ivu-input-wrapper {
                          width: 100px;
                        }
                        .ivu-select-single {
                          width: 95px;
                        }
                      }
                      // .front-form-row:nth-of-type(1) {
                      //   padding-left: 0;
                      //   padding-right: 20px !important;
                      //   .ivu-form-item-label {
                      //     width: 68px !important;
                      //   }
                      //   .ivu-form-item-content {
                      //     height: @num30;
                      //     margin-left: 68px !important;
                      //   }
                      // }
                      .front-form-row:nth-of-type(1) {
                        padding-left: 0;
                        padding-right: 20px !important;
                        .ivu-form-item-label {
                          width: 116px !important;
                        }
                        .ivu-form-item-content {
                          height: @num30;
                          margin-left: 116px !important;
                        }
                      }
                      .front-form-row:nth-of-type(2) {
                        padding-left: 0;
                        padding-right: 0;
                        .ivu-form-item-label {
                          width: 92px !important;
                        }
                        .ivu-form-item-content {
                          height: @num30;
                          margin-left: 92px !important;
                        }
                      }
                    }
                    .four {
                      height: 30px;
                      border-bottom: 1px dashed #d9d9d9;
                      .front-form-row {
                        // margin-bottom: 0;
                        .ivu-form-item-label {
                          width: 70px !important;
                        }
                        .ivu-form-item-content {
                          margin-left: 70px !important;
                          .ivu-checkbox-group {
                            height: @num30;
                            line-height: @num30;
                          }
                        }
                      }
                    }
                    .five {
                      display: inline-block;
                      width: 100%;
                      height: 50px;
                      line-height: 50px;
                      .print-card {
                        display: inline-block;
                        margin-right: @num20;
                        color: #737373;
                      }
                      .front-form-row {
                        display: inline-block;
                        position: relative;
                        top: 8.5px;
                        .ivu-form-item-label {
                          width: 78px !important;
                        }
                        .ivu-form-item-content {
                          margin-left: 78px !important;
                        }
                      }
                    }
                  }
                  .harmFactorBox {
                    width: 680px;
                    height: 170px;
                    margin-bottom: @num20;
                    overflow: hidden;
                    .title-form {
                      .front-form-row {
                        display: inline-block;
                        .ivu-input-wrapper {
                          width: 60px;
                        }
                      }
                      .front-form-row:nth-of-type(1) {
                        padding-right: @num20;
                        .ivu-select-single {
                          width: 120px;
                        }
                      }
                      .front-form-row:nth-of-type(2) {
                        padding-right: @num20;
                        padding-left: 0;
                      }
                      .front-form-row:nth-of-type(3) {
                        padding-right: @num20;
                        padding-left: 0;
                      }
                    }
                  }
                }
              }
              .amount {
                font-size: @font12;
                border-top: 1px solid #d9d9d9;
                .row {
                  display: flex;
                  align-items: center;
                  height: 40px;
                  border-bottom: 1px dashed #d9d9d9;
                  &:last-child {
                    border-bottom: none;
                    display: flex;
                    justify-content: space-between;
                  }
                  &:first-child {
                    padding: 10px 0;
                    height: auto;
                  }
                  .enlarge {
                    font-size: 16px;
                  }
                }
              }
            }
            .final-btn {
              padding-top: @num20;
              margin-bottom: @num20;
              border-top: 1px solid #d9d9d9;
              height: 50px;
              .ysje {
                font-size: @font12;
                b {
                  font-size: 24px;
                  color: #ff6262;
                }
              }
              .ivu-checkbox-wrapper {
                display: inline-block;
                height: @num30;
                line-height: @num30;
                margin-right: @num30;
                float: right;
              }
              Button {
                vertical-align: top;
                margin: 0 @num20 0 0;
                float: right;
              }
              Button {
                margin-right: 25px;
              }
            }
          }
        }
        .content-right {
          position: absolute;
          height: 100%;
          width: 329px;
          display: flex;
          flex-direction: column;
          // background: lightgreen;
          padding: @num30 @num10 60px @num10;
          .content-right-table {
            width: 100%;
            height: 100%;
            // background: lightblue;
            flex: 1;
          }
          .content-right-text {
            height: 40px;
            margin-top: 10px;
            color: #008cee;
            cursor: pointer;
            p:nth-of-type(1) {
              margin-bottom: 5px;
            }
            .handler {
              width: 15px;
              height: 15px;
              font-size: @font12;
              margin-right: 5px;
              position: relative;
              top: 3px;
              cursor: pointer;
            }
          }
          .content-right-table-icon {
            display: inline-block;
            position: absolute;
            top: 45px;
            right: 20px;
            .addItemMustExam {
              // position: absolute;
              width: 17px;
              height: 17px;
              font-size: @font12;
              margin-right: 5px;
              position: relative;
              top: 3px;
              background: url('/static/icons/public/mustExam.svg') no-repeat;
              cursor: pointer;
            }
            .addItemRecheck {
              width: 17px;
              height: 17px;
              font-size: @font12;
              margin-right: 5px;
              position: relative;
              top: 3px;
              background: url('/static/icons/public/recheck.svg') no-repeat;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .waiting-staff-wrapper {
    position: absolute;
    top: 25px;
    display: none;
  }
  // .year {
  //   padding-right: @25px!important;
  // }
  .year::after {
    content: '年';
    position: absolute;
    display: inline-block;
    color: @gradeAshThree;
    font-size: 12px;
    top: 7px;
    right: 10px;
    .ivu-input {
      padding-right: 24px;
    }
  }
  .likenessTable {
    width: 100%;
    height: 120px;
    box-sizing: border-box;
    font-size: @font12;
    overflow: scroll;
    .likenessTable-th {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      display: flex;
      background: #d7e9ff;
      .likenessTable-th-l {
        flex: 1;
        border-right: 1px solid #d9d9d9;
      }
      .likenessTable-th-r {
        // flex: 1;
        width: 200px;
      }
    }
    .likenessTable-tr {
      width: 100%;
      height: 100%;
      line-height: 40px;
      text-align: center;
      background: #ffffff;
      ul {
        .lis {
          border-bottom: 1px solid #d9d9d9;
          display: flex;
          .likenessTable-tr-l {
            flex: 1;
            border-right: 1px solid #d9d9d9;
          }
          .likenessTable-tr-r {
            // flex: 1;
            width: 200px;
          }
        }
        .lis:nth-of-type(even) {
          background: #f2f7ff;
        }
      }
    }
  }
  .yuan {
    .ivu-input {
      padding-right: 25px;
    }
  }
  .percent {
    .ivu-input {
      padding-right: 25px;
    }
  }
  .yuan::after {
    content: '元';
    position: absolute;
    display: inline-block;
    color: @gradeAshThree;
    font-size: 12px;
    top: 7px;
    right: 10px;
  }
  .percent::after {
    content: '%';
    position: absolute;
    display: inline-block;
    color: @gradeAshThree;
    font-size: 12px;
    top: 7px;
    right: 10px;
  }
}
</style>
