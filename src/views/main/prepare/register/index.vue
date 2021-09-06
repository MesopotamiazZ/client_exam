/** 
* @author wzd
* @date 2018/02/28
* @content 前台登记主页面
*/ 
<template>
  <div class="prepareRegister-wrapper">
    <!-- 主页面 -->
    <div class="prepareRegister-main"
         :class="{padTop30: isBatchReg}">
      <div class="prepareRegister-main-content contentBg">
        <div class="prepareRegister-main-content-wrapper">
          <!-- left -->
          <div class="content-left">
            <!-- 头像列 -->
            <div class="avatar-col">
              <div class="avatar">
                <div class="editAvatar"
                     @click="addPhoto">
                  <span>编辑头像</span>
                </div>
              </div>
              <!-- :disabled="!registerForm.data.ha_id" -->
              <Button type="ghost"
                      @click="gotoHealthyRecord">健康档案</Button>
              <div class="recheckIcon">
                <!-- <i class="icon-success"></i> -->
                <!-- <span class="recheck">复检</span> -->
              </div>
            </div>
            <!-- 头像列 -->
            <!-- 表单列 -->
            <div class="form-col">
              <div class="form-col-one">
                <!-- 表单部分 -->
                <div class="form-content">
                  <Form ref="registerForm"
                        :model="registerForm.data"
                        :rules="registerForm.rules"
                        :label-width="48 + 10"
                        class="register-form">
                    <ul>
                      <li class="first-row">
                        <FormItem label="个人档案编号"
                                  prop="ha_id"
                                  class="register-form-row">
                          <Input type="text"
                                 v-model.trim="registerForm.data.ha_id"
                                 disabled></Input>
                        </FormItem>
                        <!-- <FormItem label="VIP号"
                                  prop="vip_id"
                                  class="register-form-row"
                                  :label-width="48 + 11.5">
                          <Input type="text"
                                 :class='{inputVerificationTs: isEmpty(registerForm.data.vip_id)}'
                                 v-model.trim="registerForm.data.vip_id"></Input>
                        </FormItem> -->
                        <FormItem label="初/复检"
                                  prop="is_recheck"
                                  class="register-form-row">
                          <Select v-model="registerForm.data.is_recheck"
                                  :class='{selectVerificationTs: isEmpty(registerForm.data.is_recheck)}'
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
                                  class="register-form-row">
                          <Input type="text"
                                 :class='{inputVerificationTs: isEmpty(registerForm.data.name)}'
                                 v-model.trim="registerForm.data.name"></Input>
                        </FormItem>
                        <FormItem label="证件类型"
                                  prop="identity_type"
                                  class="register-form-row">
                          <Select v-model="registerForm.data.identity_type"
                                  filterable>
                            <Option v-for="item in selectOptions.identity_type"
                                    :value="item.value"
                                    :key="item.value">{{ item.label }}</Option>
                          </Select>
                        </FormItem>
                        <FormItem label="证件号"
                                  prop="identity_num"
                                  class="register-form-row"
                                  :label-width="55 + 10">
                          <Input type="text"
                                 :class='{inputVerificationTs: isEmpty(registerForm.data.identity_num)}'
                                 v-model.trim="registerForm.data.identity_num"
                                 @on-enter="getRegisterInfo"></Input>
                        </FormItem>
                      </li>
                      <li class="third-row">
                        <FormItem label="年龄"
                                  prop="age"
                                  class="register-form-row">
                          <z-input type="number"
                                   number
                                   :class='{inputVerificationTs: isEmpty(registerForm.data.age)}'
                                   v-model="registerForm.data.age"></z-input>
                          <!-- <Input type="text"
                                 :class='{inputVerificationTs: isEmpty(registerForm.data.age)}'
                                 v-model.trim="registerForm.data.age"></Input> -->
                        </FormItem>
                        <FormItem label="性别"
                                  prop="sex"
                                  class="register-form-row">
                          <Select placeholder=""  v-model="registerForm.data.sex"
                                  :class='{selectVerificationTs: isEmpty(registerForm.data.sex)}'
                                  filterable>
                            <Option v-for="item in selectOptions.sex"
                                    :value="item.value"
                                    :key="item.value">{{ item.label }}</Option>
                          </Select>
                        </FormItem>
                        <FormItem label="手机号码"
                                  prop="mobile"
                                  class="register-form-row"
                                  :label-width="55 + 10">
                          <Input type="text"
                                 :class='{inputVerificationTs: isEmpty(registerForm.data.mobile)}'
                                 v-model.trim="registerForm.data.mobile"></Input>
                        </FormItem>
                      </li>
                      <li class="four-row">
                        <FormItem label="单位名称"
                                  prop="unit_name"
                                  class="register-form-row">
                          <!-- :class='{inputVerificationTs: isEmpty(registerForm.data.unit_name)}' -->
                          <Input type="text"
                                 v-model.trim="registerForm.data.unit_name"></Input>
                        </FormItem>
                        <FormItem label="车间/部门"
                                  prop="department"
                                  class="register-form-row"
                                  :label-width="55 + 10">
                          <Select placeholder=""  v-model="registerForm.data.department"
                                  :class='{selectVerificationTs: isEmpty(registerForm.data.department)}'
                                  filterable>
                            <Option v-for="item in selectOptions.department"
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
                                  class="register-form-row">
                          <Select v-model="registerForm.data.pe_type"
                                  filterable>
                            <Option v-for="item in selectOptions.pe_type"
                                    :value="item.value"
                                    :key="item.value">{{ item.label }}</Option>
                          </Select>
                        </FormItem>
                      </li>
                      <li class="other-row">
                        <template v-if="registerForm.data.pe_type === 1"></template>
                        <template v-else-if="registerForm.data.pe_type === 3">
                          <div class="healthyCardExam-box">
                            <FormItem label="从业行业"
                                      prop="industry"
                                      class="register-form-row">
                              <Select v-model="registerForm.data.industry"
                                      filterable>
                                <Option v-for="item in selectOptions.industry"
                                        :value="item.value"
                                        :key="item.value">{{ item.label }}</Option>
                              </Select>
                            </FormItem>
                            <FormItem label="工种"
                                      prop="typeOfWork"
                                      class="register-form-row">
                              <Select v-model="registerForm.data.typeOfWork"
                                      filterable>
                                <Option v-for="item in selectOptions.typeOfWork"
                                        :value="item.value"
                                        :key="item.value">{{ item.label }}</Option>
                              </Select>
                            </FormItem>
                          </div>
                        </template>
                        <template v-if="registerForm.data.pe_type === 2">
                          <!-- :data="affirmFactorArr"-->
                          <harmFactorBox @edit-harm-factor="openAffirmFactor">
                            <div slot="title-form-slot">
                              <FormItem label="工种"
                                        prop="typeOfWork"
                                        class="register-form-row">
                                <Select v-model="registerForm.data.typeOfWork"
                                        filterable>
                                  <Option v-for="item in selectOptions.typeOfWork"
                                          :value="item.value"
                                          :key="item.value">{{ item.label }}</Option>
                                </Select>
                              </FormItem>
                              <FormItem label="接害工龄"
                                        prop="touchHarmTime"
                                        class="register-form-row">
                                <Input type="text"
                                       v-model.trim="registerForm.data.touchHarmTime"
                                       class="year"></Input>
                              </FormItem>
                              <FormItem label="总工龄"
                                        prop="totalTime"
                                        class="register-form-row">
                                <Input type="text"
                                       v-model.trim="registerForm.data.totalTime"
                                       class="year"></Input>
                              </FormItem>
                            </div>
                          </harmFactorBox>
                        </template>
                        <!-- 职业体检 -->
                        <template v-if="registerForm.data.pe_type === 4">
                          <ul class="radiateExam-box">
                            <li class="first">
                              <FormItem label="放射线种类:"
                                        prop="radiationType"
                                        class="register-form-row">
                                <CheckboxGroup v-model="registerForm.data.radiationType">
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
                                        class="register-form-row">
                                <Input type="text"
                                       v-model.trim="registerForm.data.dailyWorkLoad"></Input>
                              </FormItem>
                              <FormItem label="过量照射史:"
                                        prop="overexposureHistory"
                                        class="register-form-row">
                                <RadioGroup v-model="registerForm.data.overexposureHistory">
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
                                        class="register-form-row">
                                <RadioGroup v-model="registerForm.data.personalDose">
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
                              <!-- <FormItem label="申请类型:"
                                        prop="applicationType"
                                        class="register-form-row">
                                <Select v-model="registerForm.data.applicationType"
                                        filterable>
                                  <Option v-for="item in selectOptions.applicationType"
                                          :value="item.value"
                                          :key="item.value">{{ item.label }}</Option>
                                </Select>
                              </FormItem> -->
                              <FormItem label="职业健康检查种类:"
                                        prop="healthyCheckType"
                                        class="register-form-row">
                                <Select v-model="registerForm.data.healthyCheckType"
                                        filterable>
                                  <Option v-for="item in selectOptions.healthyCheckType"
                                          :value="item.value"
                                          :key="item.value">{{ item.label }}</Option>
                                </Select>
                              </FormItem>
                              <FormItem label="累计受照剂量:"
                                        prop="totalExposureDose"
                                        class="register-form-row">
                                <Input type="text"
                                       v-model.trim="registerForm.data.totalExposureDose"></Input>
                              </FormItem>
                            </li>
                            <li class="four">
                              <FormItem label="特殊情况:"
                                        prop="specialSituation"
                                        class="register-form-row">
                                <CheckboxGroup v-model="registerForm.data.specialSituation"
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
                                        class="register-form-row">
                                <Select v-model="registerForm.data.applicationType"
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
                        <!-- chooseMealProjectModal -->
                        <FormItem label="已选"
                                  prop="selectedCombo"
                                  class="register-form-row">
                          <!-- :disabled="!registerForm.data.sex" -->
                          <Input type="text"
                                 disabled
                                 v-model.trim="registerForm.data.selectedCombo"
                                 @on-focus="editCombo"></Input>
                          <i class="icon-pen"
                             @click.stop="editCombo"></i>
                        </FormItem>
                      </li>
                      <!-- <li class="appointment-time-row">
                        <FormItem label="预约日期"
                                  prop="selectedCombo"
                                  class="register-form-row">
                          <dataComponent placeholder="" style="width: 380px;"></dataComponent>
                        </FormItem>
                      </li> -->
                      <li class="five-row">
                        <FormItem label="备注"
                                  prop="remark"
                                  class="register-form-row">
                          <Input type="text"
                                 v-model.trim="registerForm.data.remark"></Input>
                        </FormItem>
                      </li>
                    </ul>
                  </Form>
                </div>
                <!-- 表单部分 -->

                <!-- 各种费用显示 -->
                <!-- <div class="amount">
                  <ul>
                    <li class="li1">
                      <span>附加费：检查费-早餐费：40.00元；耗材费-一次性注册费：40.00元；检查费-早餐费：40.00元</span>
                    </li>
                    <li class="li2">
                      <span style="margin-right: 20px;">项目合计金额：
                        <b>999.00元</b>
                      </span>
                      <span>订单金额：
                        <b>99.00元</b>
                      </span>
                    </li>
                    <li class="li3">
                      <span style="margin-right: 20px;">已收金额：
                        <b>99.00</b>元</span>
                      <span>代收金额：
                        <b>99.00元</b>
                      </span>
                      <div class="discount">
                        <span class="marginR10">折扣</span>
                        <Input type="text"
                               class="percent marginR20"
                               style="width: 70px;"></Input>
                        <span class="marginR10">减免金额</span>
                        <Input type="text"
                               class="yuan"
                               style="width: 120px;"></Input>
                      </div>
                    </li>
                  </ul>
                </div> -->
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
              </div>
              <!-- 金额计算部分 -->
              <!-- <div class="amount">
                <ul>
                  <li>总计金额：
                    <span>999.00元</span>
                  </li>
                  <li>优惠金额：
                    <span>99.00元</span>
                  </li>
                  <li>应收金额：
                    <span>
                      <b>900.00</b>元</span>
                  </li>
                </ul>
              </div> -->
              <!-- 金额计算部分 -->

              <!-- 提交清空按钮 -->
              <div class="final-btn">
                <span class="ysje">应收金额：
                  <b>999.99</b>元</span>
                <div class="checkboxs">
                  <Checkbox v-model="registerForm.data.isPrint">打印缴费凭条</Checkbox>
                  <Checkbox v-model="registerForm.data.isCreateCode">生成提取码</Checkbox>
                  <Checkbox v-model="registerForm.data.isPrintBarCode">打印样本条码</Checkbox>
                  <Checkbox v-model="registerForm.data.isPrintGuide">打印指引单</Checkbox>
                </div>
                <div class="btns">
                  <Button type="ghost"
                          @click="openQKTip">清 空</Button>
                  <Button type="primary"
                          @click="registerSubmit">完 成</Button>
                </div>
              </div>
              <!-- 提交清空按钮 -->
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
              <icon name="addNewItemT"
                      class="addNewItemT"
                      @click="addRecheckItem"></icon>
              <icon name="addNewItemT"
                      class="addNewItemT"
                      @click="addMustExamItem"></icon> -->
            <!-- <p>
                <icon name="addNewItemT"
                      class="addNewItemT"
                      @click="addRecheckItem"></icon>加入复检项目</p>
              <p>
                <icon name="addNewItemT"
                      class="addNewItemT"
                      @click="addMustExamItem"></icon>添加危害因素对应必检、选检项目</p> -->
            <!-- </div> -->
          </div>
          <!-- right -->
        </div>
      </div>
    </div>
    <!-- 主页面 -->

    <!-- 选择套餐及项目弹窗 cancel-data, commit-data-->
    <div class="chooseMealProjectModal">
      <chooseMealProject :ifShowModal="chooseMealProjectModal"
                         @cancel-data="cancelChooseMealProject"
                         @commit-data="commitChooseMealProject"></chooseMealProject>
    </div>
    <!-- 选择套餐及项目弹窗 -->

    <!-- 修改职业病危害因素 -->
    <addOrModifyOccupHarmFactor :controlModal="occupHarmFactor"
                                :factorTypes="factorTypes"
                                :factorList="harmFactorListClone"
                                @add-affirm-factor="addAffirmFactor"
                                @cancel-add-factor="cancelAddFactor"></addOrModifyOccupHarmFactor>
    <!-- 修改职业病危害因素 -->

    <!-- 提示1 -->
    <div class="frontTsModal">
      <frontTs :modelts="frontTsModal"
               @sure="surefrontTs"
               @cancel="cancelfrontTs"></frontTs>
    </div>
    <!-- 提示1 -->

    <!-- 提示2 -->
    <tip-modal :controlModal="tipModalControl"
               :mainContent="tipModalContent"
               :isMask="false"
               @tip-modal-affirm="tipModalAffirm"
               @tip-modal-cancel="tipModalCancel"></tip-modal>
    <!-- 提示2 -->

    <!-- 编辑头像 -->
    <photo-modal :photoModal.sync='photoModal'
                 @take-photo='takePhotoOne'></photo-modal>
    <add-photo-modal :addPhotoModal.sync='addPhotoModal'
                     @take-photo='takePhoto'
                     @save-photo='savePhoto'></add-photo-modal>
    <!-- 编辑头像 -->

    <!-- 当前队列进度条 -->
    <div class="current-queue"
         v-show="isBatchReg">
      <span>当前登记队列：6/25</span>
      <div class="progress-wrapper"
           v-on:mouseenter="enterWrapper"
           v-on:mouseleave="leaveWrapper">
        <Progress :percent="24"></Progress>
      </div>
      <Checkbox v-model="isSelected"
                class="checkboxAuto">自动跳转下一个</Checkbox>
    </div>
    <!-- 当前队列进度条 -->

    <!-- 候检人员 -->
    <div class="waiting-staff-wrapper"
         v-on:mouseenter="enterWaitingStaff"
         v-on:mouseleave="leaveWaitingStaff"
         ref="waitingStaffWrapper"
         v-show="isStaffWrapper">
      <waiting-staff :data="waitingStaffData"></waiting-staff>
    </div>
    <!-- 候检人员 -->

    <!-- 预约订单 -->
    <!-- <appointment-single-modal :appointmentSingleModal.sync='appointmentSingleModal'></appointment-single-modal> -->

    <!-- 报告领取码 -->
    <getReportCode :controlModal="isShowGetReportCode"
                   @report-code-cancel="reportCodeCancel"
                   @report-code-affirm="reportCodeAffirm"></getReportCode>
    <!-- 报告领取码 -->

    <!-- 清空提示 -->
    <tip-modal :controlModal="qxTipModalControl"
               :mainContent="qkTipModalContent"
               @tip-modal-affirm="qkTipModalAffirm"
               @tip-modal-cancel="qkTipModalCancel"></tip-modal>
    <!-- 清空提示 -->
  </div>
</template>

<script>
// 依赖
import { mapGetters, mapActions, mapMutations } from 'vuex'
import axios from 'axios'
import * as _ from 'lodash'
import helper from '@/utils/helper'
import validators from '@/validators'
import * as types from '@/store/types'

// 公有组件
// import dataComponent from '@/components/calendar/dataComponent'
// import tipModal from '@/views/main/prepare/components/modal/tipModal'
import photoModal from '@/views/main/prepare/components/modal/photoModal'
import addPhotoModal from '@/views/main/prepare/components/modal/addPhotoModal'
import dataComponent from '@/components/calendar/dateComponent'
// import appointmentSingleModal from './components/modal/appointmentSingleModal'

// 私有组件
import groupItemsAndSurcharge from '@/views/main/prepare/register/components/groupItemsAndSurcharge'
import getReportCode from './components/modal/getReportCode'
import chooseMealProject from '@/views/main/prepare/register/components/modal/chooseMealProject'
import frontTs from '@/views/main/prepare/register/components/modal/frontTs'
import addOrModifyOccupHarmFactor from '@/views/main/prepare/register/components/modal/addOrModifyOccupHarmFactor'
import waitingStaff from '@/views/main/prepare/components/waitingStaff'
import harmFactorBox from '@/views/main/prepare/register/components/harmFactorBox'

export default {
  name: 'register',
  components: {
    // appointmentSingleModal,
    groupItemsAndSurcharge,
    // dataComponent,
    chooseMealProject,
    frontTs,
    addOrModifyOccupHarmFactor,
    waitingStaff,
    // tipModal,
    photoModal,
    addPhotoModal,
    getReportCode,
    harmFactorBox,
    dataComponent,
  },
  data() {
    return {
      isBatchReg: true, // 是否是批量登记(批量登记会显示当前队列)
      // appointmentSingleModal: false, // 预约订单弹窗
      // 弹窗
      addPhotoModal: false,
      photoModal: false,
      isStaffWrapper: false, // 是否显示waiting-staff-wrapper
      chooseMealProjectModal: false, // 选择套餐及项目
      frontTsModal: false, // 提示弹窗1
      occupHarmFactor: false, // 职业危害因素modal
      isSelected: true, // 自动跳转下一个
      isShowGetReportCode: false, // 报告领取码
      qxTipModalControl: false, // 清空前提示弹窗
      isPrintCard: false, // 是否打证
      affirmFactorArr: [], // 职业病危害因素对象数组
      factorTypes: [],
      harmFactorListClone: [],
      waitingStaffData: [
        {
          examId: '0000001',
          name: '应号雨',
          isVip: true,
        },
        {
          examId: '0000002',
          name: '林可',
          isVip: false,
        },
        {
          examId: '0000001',
          name: '应号雨',
          isVip: true,
        },
        {
          examId: '0000002',
          name: '林可',
          isVip: false,
        },
        {
          examId: '0000001',
          name: '应号雨',
          isVip: true,
        },
        {
          examId: '0000002',
          name: '林可',
          isVip: false,
        },
        {
          examId: '0000001',
          name: '应号雨',
          isVip: true,
        },
        {
          examId: '0000002',
          name: '林可',
          isVip: false,
        },
        {
          examId: '0000001',
          name: '应号雨',
          isVip: true,
        },
        {
          examId: '0000002',
          name: '林可',
          isVip: false,
        },
        {
          examId: '0000002',
          name: '林可',
          isVip: false,
        },
        {
          examId: '0000001',
          name: '应号雨',
          isVip: true,
        },
        {
          examId: '0000002',
          name: '林可',
          isVip: false,
        },
        {
          examId: '0000002',
          name: '林可',
          isVip: false,
        },
        {
          examId: '0000001',
          name: '应号雨',
          isVip: true,
        },
        {
          examId: '0000002',
          name: '林可',
          isVip: false,
        },
      ], // 当前登记队列表格数据
      tipModalContent: '确认修改已选项目吗?',
      qkTipModalContent: '确认清空所有已录入信息吗?',
      tipModalControl: false,
      tempTimeout: null,
      isFromUnit: true,
      registerForm: {
        data: {
          id: null, // 用户ID
          ha_id: null, // 档案号
          // vip_id: null, // vip号
          is_recheck: 0, // 是否复检
          name: null, // 姓名
          age: null, // 年龄
          identity_type: 1, // 证件类型
          identity_num: null, // 证件号
          mobile: null, // 手机号
          sex: null, // 性别
          // source: 1, // 来源
          unit_name: null, // 单位
          department: null, // 部门
          personalPercent: '', // 个人支付比例
          additionalExpensePayers: '', // 新增费用支付方式(个人/单位)
          settlementModes: '', // 结算方式(以预约人数计/以实检人数计)
          amountAdvanced: '', // 预付金额
          appointmentDate: '', // 预约日期
          pe_type: 1, // 体检类别
          img: null, // 头像地址
          selectedCombo: null, // 已选套餐
          // =================
          industry: '', // 从业行业
          typeOfWork: '', // 工种
          radiationType: [], // 放射线种类
          dailyWorkLoad: '', // 每日工作量
          overexposureHistory: '否', // 过量照射史
          personalDose: '是', // 个人剂量
          applicationType: '', // 申请类型
          healthyCheckType: '', // 健康检查呢种类
          totalExposureDose: '', // 累计受照剂量
          specialSituation: [], // 特殊情况
          touchHarmTime: '', // 接害工龄
          totalTime: '', // 总工龄
          isPrint: true, // 是否打印缴费凭证
          isCreateCode: true, // 是否生成提取码
          isPrintGuide: true, // 是否打印指引
          isPrintBarCode: true, // 打印样本条码
        },
        rules: {
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
      selectOptions: {
        source: [
          {
            label: '个人',
            value: 1,
          },
          {
            label: '单位',
            value: 2,
          },
        ],
        pe_type: [
          {
            label: '健康体检',
            value: 1,
          },
          {
            label: '职业体检',
            value: 2,
          },
          {
            label: '健康证体检',
            value: 3,
          },
          {
            label: '放射工作人员职业健康检查',
            value: 4,
          },
          // {
          //   label: '放射工作人员职业健康检查-打证',
          //   value: 5,
          // },
        ],
        identity_type: [
          // 证件类型
          {
            label: '身份证号',
            value: 1,
          },
          {
            label: '具名户口簿',
            value: 2,
          },
          {
            label: '护照',
            value: 3,
          },
          {
            label: '军官证',
            value: 4,
          },
          {
            label: '驾驶证',
            value: 5,
          },
          {
            label: '港澳居民来往内地通行证',
            value: 6,
          },
          {
            label: '台湾居民来往内地通行证',
            value: 7,
          },
          {
            label: '其他法定有效证件',
            value: 8,
          },
        ],
        sex: [
          // 性别
          {
            label: '男',
            value: 1,
          },
          {
            label: '女',
            value: 2,
          },
        ],
        additionalExpensePayers: [
          {
            label: '个人',
            value: 1,
          },
          {
            label: '单位',
            value: 2,
          },
        ],
        settlementModes: [
          {
            label: '以预约人数计',
            value: 1,
          },
          {
            label: '以实检人数计',
            value: 2,
          },
        ],
        industry: [], // 从业行业
        typeOfWork: [], // 工种
        applicationType: [
          // 申请类型
          {
            label: '初次申请',
            value: 1,
          },
          {
            label: '变更',
            value: 2,
          },
          {
            label: '遗失补办',
            value: 3,
          },
          {
            label: '换发',
            value: 4,
          },
        ],
        healthyCheckType: [
          // 职业将康检查种类
          {
            label: '上岗前',
            value: 1,
          },
          {
            label: '在岗期间',
            value: 2,
          },
          {
            label: '离岗时',
            value: 3,
          },
          {
            label: '应急检查',
            value: 4,
          },
          {
            label: '医学随访',
            value: 5,
          },
        ],
        is_recheck: [
          {
            value: 0,
            label: '初检',
          },
          {
            value: 1,
            label: '复检',
          },
        ],
        department: [
          {
            value: 1,
            label: '技术部',
          },
        ],
      },
    }
  },
  methods: {
    isEmpty(data) {
      if (data === '' || data === undefined || data === null) {
        return true
      } else {
        return false
      }
    },
    specialSituation(data) {
      // 特殊情况checkbox发生变化时触发
      if (data[data.length - 1] === '无') {
        this.registerForm.data.specialSituation.splice(0, data.length - 1)
      }
      if (data[data.length - 1] !== '无' && data[0] === '无') {
        this.registerForm.data.specialSituation.splice(0, 1)
      }
    },
    openQKTip() {
      this.qxTipModalControl = true
    },
    getRegisterInfo() {
      // this.
    },
    // 预约订单
    buttonAA() {
      // this.appointmentSingleModal = true
    },
    modifyCombo() {
      // 修改套餐,先弹出确认修改项目弹窗
      this.tipModalControl = true
      // this.chooseMealProjectModal = true
    },
    gotoHealthyRecord() {
      // 进入健康档案
      this.$router.push({ name: 'healthRecord' })
      let temp = {}
      temp.name = 'healthRecord'
      temp.title = 'healthRecord'
      this.openPage(temp)
      this.setCurPage(temp.name)
    },
    // editAvatar() {
    //   // 编辑头像
    //   console.log('编辑头像')
    // },
    cancelChooseMealProject() {
      console.log('取消选择套餐及项目')
      this.chooseMealProjectModal = false
    },
    commitChooseMealProject() {
      console.log('完成选择项目套餐及项目')
      this.chooseMealProjectModal = false
    },
    surefrontTs() {
      this.frontTsModal = false
    },
    cancelfrontTs() {
      // 重新生成
      this.frontTsModal = false
    },
    addAffirmFactor(data) {
      // 点击危害因素弹出确认触发
      this.affirmFactorArr = []
      this.affirmFactorArr = data
      this.occupHarmFactor = false
      console.log('rtyui', this.affirmFactorArr)
    },
    cancelAddFactor() {
      // 点击危害因素弹出取消触发
      this.occupHarmFactor = false
    },
    enterWrapper(event) {
      // 鼠标移入进度条触发
      console.log(event)
      // this.$refs.waitingStaffWrapper.style.display = 'block'
      this.$refs.waitingStaffWrapper.style.left = event.clientX - 325 + 'px'
      this.isStaffWrapper = true
    },
    enterWaitingStaff() {
      clearTimeout(this.tempTimeout)
    },
    leaveWaitingStaff() {
      this.isStaffWrapper = false
    },
    leaveWrapper(event) {
      let self = this
      this.tempTimeout = setTimeout(function() {
        // self.$refs.waitingStaffWrapper.style.display = 'none'
        self.isStaffWrapper = false
      }, 100)
    },
    tipModalAffirm(data) {
      this.tipModalControl = data
      this.chooseMealProjectModal = true
    },
    tipModalCancel(data) {
      this.tipModalControl = data
    },
    qkTipModalAffirm(data) {
      this.qxTipModalControl = false
      this.frontAppointmentEmpty()
    },
    qkTipModalCancel(data) {
      this.qxTipModalControl = false
    },
    reportCodeCancel() {
      // 报告领取码取消
      this.isShowGetReportCode = false
    },
    reportCodeAffirm() {
      // 报告领取码确认
      this.isShowGetReportCode = false
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
    editCombo() {
      // 修改套餐
      // if (!this.registerForm.data.sex) {
      //   return
      // }
      // this.tipModalControl = true
      // this.chooseItemsModal = true
      this.chooseMealProjectModal = true
    },
    registerSubmit() {
      // 页面完成
      this.$refs.registerForm.validate(result => {
        console.log(result)
        this.isShowGetReportCode = true
      })
      // this.isShowGetReportCode = true
    },
    registerEmpty() {
      // 清空页面
      this.$refs.registerForm.resetFields()
      // 清空 select 查询 不然存在查询的文字 虽然数据已经被重置
      // this.$refs.registerForm.$children.forEach(children => {
      //   if (Array.isArray(children.$children)) {
      //     children.$children.forEach(item => {
      //       if (
      //         item.$options._componentTag === 'Select' &&
      //         !this.orderForm.data[children.prop]
      //       ) {
      //         item.query = ''
      //       }
      //     })
      //   }
      // })
    },
    async openAffirmFactor() {
      // 点击添加危害因素打开弹窗
      await Promise.all([
        this.getHarmCategory({ size: 0, status: 1 }),
        this.getHarmFactor({ size: 0, status: 1 }),
      ])
      this.factorTypes = _.cloneDeep(this.harmCategoryList)
      this.harmFactorListClone = _.cloneDeep(this.HarmFactorList)
      // this.factorTypes = this.harmCategoryList
      this.occupHarmFactor = true
    },
    ...mapMutations({
      openPage: types.OPEN_PAGE,
      setCurPage: types.SET_CURRENT_PAGE_NAME,
    }),
    ...mapActions('categoriesAndFactorsModule', [
      'getHarmCategory', // 危害类别
      'getHarmFactor', // 危害因素
    ]),
  },
  computed: {
    ...mapGetters('categoriesAndFactorsModule', [
      'harmCategoryList', // 危害类别
      'HarmFactorList', // 危害因素
    ]),
    surchargeText() {
      return '检查费-早餐费：40.00元；耗材费-一次性注册费：40.00元；'
    },
  },
  mounted() {
    console.log(this.$route.params.pe_sn)
  },
  watch: {
    // 12
  },
}
</script>

<style lang="less">
@import (reference) '~assets/less/variable.less';
.prepareRegister-wrapper {
  position: relative;
  margin: 0 auto;
  height: 100%;
  .prepareRegister-main {
    padding: @num10;
    width: 100%;
    height: 100%;
    position: relative;
    .prepareRegister-main-content {
      height: 100%;
      overflow-y: auto;
      .prepareRegister-main-content-wrapper {
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
              background: url('/static/images/public/default_avatar.svg')
                no-repeat;
              background-size: 100% 100%;
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
            // display: flex;
            flex-direction: column;
            // overflow-x: scroll;
            .form-col-one {
              // overflow-x: scroll;
              // flex: 1;
              .form-content {
                .register-form {
                  // padding-top: @num20;
                  font-size: 0;
                  .register-form-row {
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
                  .register-form-row {
                    display: inline-block;
                    .ivu-select-single {
                      width: 148px;
                    }
                    .ivu-input-wrapper {
                      width: 148px;
                    }
                    .ivu-form-item-content {
                      position: relative;
                      left: -3px;
                    }
                  }
                  .register-form-row:nth-of-type(1) {
                    padding-left: 0;
                    // padding-right: 25px!important;
                    .ivu-form-item-label {
                      width: 82px !important;
                    }
                    .ivu-form-item-content {
                      height: @num30;
                      margin-left: 82px !important;
                    }
                  }
                  .register-form-row:nth-of-type(2) {
                    padding-left: 0;
                    padding-right: 25px;
                  }
                  .register-form-row:nth-of-type(3) {
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    .ivu-form-item-content {
                      width: 149px;
                    }
                  }
                }
                .second-row {
                  .register-form-row {
                    display: inline-block;
                    .ivu-input-wrapper {
                      width: 148px;
                    }
                    .ivu-select-single {
                      width: 148px;
                    }
                  }
                  .register-form-row:nth-of-type(1) {
                    padding-right: 25px;
                  }
                  .register-form-row:nth-of-type(2) {
                    padding-left: 0;
                    padding-right: 25px;
                  }
                  .register-form-row:nth-of-type(3) {
                    padding-left: 0;
                    padding-right: 0;
                  }
                }
                .third-row {
                  .register-form-row {
                    display: inline-block;
                    .ivu-select-single {
                      width: 148px;
                    }
                    .ivu-input-wrapper {
                      width: 148px;
                    }
                  }
                  .register-form-row:nth-of-type(1) {
                    padding-right: 25px;
                  }
                  .register-form-row:nth-of-type(2) {
                    padding-left: 0;
                    padding-right: 25px;
                  }
                  .register-form-row:nth-of-type(3) {
                    padding-left: 0;
                    padding-right: 0;
                  }
                }
                .four-row {
                  border-bottom: 1px solid #cccccc;
                  .register-form-row {
                    display: inline-block;
                  }
                  .register-form-row:nth-of-type(1) {
                    padding-right: 25px;
                    .ivu-form-item-content {
                      width: 380px;
                    }
                  }
                  .register-form-row:nth-of-type(2) {
                    padding-right: 0;
                    padding-left: 0;
                    .ivu-form-item-content {
                      width: 146px;
                    }
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
                  .register-form-row {
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
                  .register-form-row {
                    display: inline-block;
                    .ivu-select-single {
                      width: 380px;
                    }
                  }
                  .register-form-row:nth-of-type(1) {
                    padding-right: 25px;
                  }
                  .register-form-row:nth-of-type(2) {
                    padding-left: 0;
                    padding-right: 25px;
                  }
                }
                .seven-row {
                  .register-form-row {
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
                //   .register-form-row {
                //     .ivu-input-wrapper {
                //       width: 380px;
                //     }
                //   }
                // }
                // .nine-row {
                //   .register-form-row {
                //     .ivu-select-single {
                //       width: 380px;
                //     }
                //   }
                // }
                // .ten-row {
                //   .register-form-row {
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
                //     background: url('/static/icons/public/editPen.svg') no-repeat;
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
                    .register-form-row {
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
                    .register-form-row {
                      padding-left: 0;
                      padding-right: 0;
                    }
                    .first {
                      .register-form-row {
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
                      .register-form-row {
                        display: inline-block;
                        .ivu-input-wrapper {
                          width: 100px;
                        }
                      }
                      .register-form-row:nth-of-type(1) {
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
                      .register-form-row:nth-of-type(2) {
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
                      .register-form-row:nth-of-type(3) {
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
                      .register-form-row {
                        display: inline-block;
                        .ivu-input-wrapper {
                          width: 100px;
                        }
                        .ivu-select-single {
                          width: 95px;
                        }
                      }
                      // .register-form-row:nth-of-type(1) {
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
                      .register-form-row:nth-of-type(1) {
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
                      .register-form-row:nth-of-type(2) {
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
                      .register-form-row {
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
                      .register-form-row {
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
                      .register-form-row {
                        display: inline-block;
                        .ivu-input-wrapper {
                          width: 60px;
                        }
                      }
                      .register-form-row:nth-of-type(1) {
                        padding-right: @num20;
                        .ivu-select-single {
                          width: 120px;
                        }
                      }
                      .register-form-row:nth-of-type(2) {
                        padding-right: @num20;
                        padding-left: 0;
                      }
                      .register-form-row:nth-of-type(3) {
                        padding-right: @num20;
                        padding-left: 0;
                      }
                    }
                  }
                }
              }
              // .amount {
              //   font-size: @font12;
              //   border-top: 1px solid #d9d9d9;
              //   ul {
              //     // li {
              //     //   height: 40px;
              //     //   line-height: 40px;
              //     // }
              //     li:nth-of-type(1) {
              //       min-height: 40px;
              //       line-height: 40px;
              //       border-bottom: 1px dashed #d9d9d9;
              //       span {
              //         height: 100%;
              //       }
              //     }
              //     li:nth-of-type(2) {
              //       min-height: 40px;
              //       line-height: 40px;
              //       border-bottom: 1px dashed #d9d9d9;
              //     }
              //     .li3 {
              //       min-height: 40px;
              //       line-height: 40px;
              //       .discount {
              //         float: right;
              //         margin-left: @num20;
              //         display: inline-block;
              //       }
              //     }
              //   }
              // }
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
              margin-bottom: @num30;
              border-top: 1px solid #d9d9d9;
              height: 100px;
              position: relative;
              .checkboxs {
                display: inline-block;
                float: right;
                margin-bottom: @num20;
              }
              .btns {
                position: absolute;
                right: 0;
                bottom: 0;
                Button {
                  vertical-align: top;
                  margin: 0 @num20 0 0;
                  float: right;
                }
                Button {
                  margin-right: 25px;
                }
              }
              .ysje {
                font-size: @font12;
                vertical-align: middle;
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
              .ivu-checkbox-wrapper {
                margin-right: 10px;
              }
              .ivu-checkbox-wrapper:nth-of-type(1) {
                margin-right: @num30;
              }
            }
            // .final-btn {
            //   height: 30px;
            //   .ivu-checkbox-wrapper {
            //     display: inline-block;
            //     height: @num30;
            //     line-height: @num30;
            //     margin-right: @num30;
            //     float: right;
            //   }
            //   Button {
            //     vertical-align: top;
            //     margin: 0 @num20 0 0;
            //     float: right;
            //   }
            //   Button {
            //     margin-right: 25px;
            //     float: right;
            //   }
            // }
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
  .current-queue {
    width: 100%;
    height: 15px;
    line-height: 15px;
    position: absolute;
    top: 7px;
    left: 10px;
    display: flex;
    span {
      display: inline-block;
      margin-right: 5px;
    }
    .progress-wrapper {
      display: inline-block;
      flex: 1;
      cursor: pointer;
      .ivu-progress-bg {
        background: #83cb54;
        height: 15px !important;
      }
      .ivu-progress-inner {
        background: #d9d9d9;
        height: 15px;
      }
    }
    .checkboxAuto {
      display: inline-block;
      padding-right: 15px;
    }
  }
  .waiting-staff-wrapper {
    position: absolute;
    top: 25px;
    // display: none;
    z-index: 100;
  }
  // .year {
  //   padding-right: 25px!important;
  // }
  .year::after {
    content: '年';
    position: absolute;
    display: inline-block;
    color: @gradeAshThree;
    font-size: 12px;
    top: 7px;
    right: 10px;
  }
  // .likenessTable {
  //   width: 100%;
  //   height: 120px;
  //   box-sizing: border-box;
  //   font-size: @font12;
  //   overflow: scroll;
  //   .likenessTable-th {
  //     width: 100%;
  //     height: 40px;
  //     line-height: 40px;
  //     text-align: center;
  //     display: flex;
  //     background: #d7e9ff;
  //     .likenessTable-th-l {
  //       flex: 1;
  //       border-right: 1px solid #d9d9d9;
  //     }
  //     .likenessTable-th-r {
  //       flex: 1;
  //     }
  //   }
  //   .likenessTable-tr {
  //     width: 100%;
  //     height: 100%;
  //     line-height: 40px;
  //     text-align: center;
  //     background: #f2f7ff;
  //     ul {
  //       .lis {
  //         border-bottom: 1px solid #d9d9d9;
  //         display: flex;
  //         .likenessTable-tr-l {
  //           flex: 1;
  //           border-right: 1px solid #d9d9d9;
  //         }
  //         .likenessTable-tr-r {
  //           flex: 1;
  //         }
  //       }
  //       .lis:nth-of-type(2n + 1) {
  //         background: #ffffff;
  //       }
  //     }
  //   }
  // }
  .yuan {
    .ivu-input {
      padding-right: 25px;
    }
  }
  // .percent {
  //   .ivu-input {
  //     padding-right: 25px;
  //   }
  // }
  .yuan::after {
    content: '元';
    position: absolute;
    display: inline-block;
    color: @gradeAshThree;
    font-size: 12px;
    top: 7px;
    right: 10px;
  }
  // .percent::after {
  //   content: '%';
  //   position: absolute;
  //   display: inline-block;
  //   color: @gradeAshThree;
  //   font-size: 12px;
  //   top: 7px;
  //   right: 10px;
  // }
  .padTop30 {
    padding: @num30 @num10 @num10 @num10;
  }
  .ivu-select-dropdown {
    position: fixed !important;
  }
}
</style>
