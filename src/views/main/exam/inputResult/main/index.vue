<template>
  <div style="width: 100%; height: 100%; overflow: auto; display: flex; flex-direction: column;">
    <!-- style="position: relative; overflow: auto;" -->
    <div style="flex:1; overflow: auto"
         @scroll="inputResultWrapperScroll">
      <div class="input-result-wrapper"
           @click="otherClick">
        <crossBand :carouselData="connectInstrument"
                   :isShowBox="isShowExamBox"
                   :willCheckup="willCheckup"
                   :isLastCheckup="false"
                   seperateCheckupTitle="科室候检人数"
                   :curOfficeNames="curOfficeSelection"
                   :isShowInstrumentConnection="true"
                   @open-check-up-modal="openCheckupModal"
                   @open-dept-choices-modal="openDeptChoicesModal"
                   @cross-band-mouse-pos="crossBandMousePos"></crossBand>
        <!-- 已检/待检查询 -->
        <HealthExamPersonSearch :columns="examColumns"
                                :willExamData="willExamLists"
                                :beExamedData="[]"
                                :isShowBox="isShowExamBox"
                                @on-row-click="handleRowClick"
                                :clickIndex="clickIndex"
                                @exam-person-search-pos="examPersonSearchPos"></HealthExamPersonSearch>
        <!-- 当前科室 -->
        <current-dept ref="currentDept"
                      :curDeptChoices="curOfficeSelection"
                      :deptData="deptData"
                      @current-dept-selection="currentDeptSelection"
                      @get-mouse-position="getMousePosition"></current-dept>
        <div class="right-above">
          <div class="right-above-left">
            <basicInfo :pe_sn="pe_sn"
                       :info="infoData"
                       :waitingProject="waitingProject"
                       ref='fff'
                       @on-enter="matchInspectNo"
                       @healthDoc="healthDoc"></basicInfo>
          </div>
          <div class="right-above-right">
            <div class="waitingProject">
              <titletHasSlot>
                <span slot="titletHasSlotLeftTitle">
                  <span>待检项目</span>
                  <span style="color: #038DEE; font-size: 14px">({{waitingProject.length}})</span>
                </span>
              </titletHasSlot>
              <div class="tableBox">
                <table>
                  <colgroup>
                    <col width="50" />
                    <col/>
                  </colgroup>
                  <tbody>
                    <tr v-for="(item, index) in waitingProject"
                        :class="{oddLine: !(index % 2)}">
                      <td>{{index + 1}}</td>
                      <td>{{item.group_item_name?item.group_item_name:''}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div style="clear: both;"></div>
        <!-- 填写的内容 -->
        <div class="input-result-container">
          <!-- 检查结果呈现 -->
          <div class="group-items-wrapper">
            <tab class="application-title"
                 :tab="tabdata"
                 @tab-change="tabChange">
              <div style="height: 50px; line-height: 50px;"
                   v-if="tabTitle === '问诊症状/自觉症状'"></div>
              <div style="height: 50px; line-height: 50px;"
                   v-if="tabTitle === '检查小结'">
                <span class="text-button"
                      @click="openOtherOfficeResult">其他科室检查结果</span>
                <span class="text-button"
                      @click="openOtherOfficeDialog">其他科室诊断上报</span>
                <span class="text-button seperate-bar"> | </span>
                <span class="text-button">全部自动小结</span>
                <span class="text-button danger">全部清空小结</span>
              </div>
              <div style="height: 50px; line-height: 50px;"
                   v-if="tabTitle === '检查所见'">
                <span class="text-button danger"
                      @click="allGiveUp">全部弃检</span>
                <span class="text-button seperate-small"
                      @click="spreadAlll">
                  全部展开
                  <div class="arrow-up-down fr">
                    <icon name='allUnfold'></icon>
                  </div>
                </span>
                <span class="text-button seperate-small"
                      @click="closeAll">
                  全部收起
                  <div class="arrow-up-down fr">
                    <icon name='allretract'></icon>
                  </div>
                </span>
              </div>
            </tab>
            <!-- 切换tab所呈现的内容 -->
            <!-- 问诊症状/自觉症状 -->
            <div class="group-items-container"
                 v-show="tabTitle === '问诊症状/自觉症状'">
              <group-items-symptom @self-feeling-delete="selfFeelingDelete"></group-items-symptom>
            </div>

            <!-- tab - 检查所见 -->
            <div class="group-items-container"
                 v-show="tabTitle === '检查所见'">

              <div class="normal"
                   v-for="(item, index) in groupItems">
                <group-items-saw :ref="`item-saw-${index}`"
                                 :groupItemInfo="item"
                                 :columns="groupItemColumns"
                                 :data="item.pe_items"
                                 @current-group-item-info="groupItemExamSaw"
                                 @give-up-change="giveUpChange(item, index)"
                                 @single-relation="singleRelation"
                                 @image-import="imageImport"
                                 @give-up-status="giveUpStatus"></group-items-saw>
              </div>

              <div class="special"
                   v-for="(item, index) in specialGroupItems">
                <!-- 胸片 -->
                <group-items-saw ref="chestRadiography"
                                 :groupItemInfo="item"
                                 v-if="item && item.group_item_name === '后前位X射线高千伏胸片'"
                                 type='chestRadiography'
                                 @give-up-change="giveUpChange(item, index, 'chestRadiography')"
                                 groupItemsName="后前位X射线高千伏胸片"></group-items-saw>

                <!-- 电测听 -->
                <group-items-saw ref="listenTest"
                                 :groupItemInfo="item"
                                 v-if="item && item.group_item_name === '电测听'"
                                 type="listenTest"
                                 :sex="customerInfo.sex"
                                 :age="customerInfo.age"
                                 @give-up-change="giveUpChange(item, index, 'listenTest')"
                                 groupItemsName="电测听"></group-items-saw>
              </div>

            </div>

            <!-- tab -检查小结 -->
            <div class="group-items-container except"
                 v-show="tabTitle === '检查小结'">
              <!-- 组合项目的检查小结 -->
              <div class="group-items-result-content">
                <group-items-result v-for="(item, index) in groupItems"
                                    :groupItemsName="item.group_item_name"
                                    :groupItemInfo="item"
                                    @open-modal="openAddClinicalModal(item, index)"
                                    :ref="`groupItemSaw${index}`"
                                    :key="index"></group-items-result>
                <!-- 特殊项的小结  -->
                <group-items-result v-for="(item, index) in specialGroupItems"
                                    :groupItemsName="item.group_item_name"
                                    :groupItemInfo="item"
                                    @open-modal="openSpecialAddClinicalModal(item, index)"
                                    :ref="`specialGroupSaw${index}`"
                                    :key="index"></group-items-result>
              </div>
            </div>
          </div>

          <!-- 新增临床诊断 -->
          <!-- <addClinical ref="addClinicalModal"
                    @checkValue="checkValue"></addClinical> -->

        </div>
      </div>
      <!-- 可拖动模态框 - 检查所见 - 参考结果 -->
      <can-move-modal ref="canMoveModal"
                      :width="320"
                      :height="400"
                      title="参考结果">
        <div class="result-search">
          <!-- <local-search-input @on-enter="referenceResultSearch"></local-search-input> -->
          <Input v-model="referenceResultSearchValue"
                 icon="ios-search"
                 placeholder="请输入"
                 @on-keyup="referenceResultSearch"></Input>
        </div>
        <div>
          <Table border
                 stripe
                 :height="280"
                 :columns="examResultColumns"
                 :data="examResultData"
                 @on-row-click="resultSawModalRowClick"></Table>
        </div>

      </can-move-modal>

      <!-- 可拖动模态框 - 检查小结 - 其他科室检查结果 -->
      <can-move-modal ref="otherOfficeResult"
                      :width="941"
                      :height="300"
                      title="其他科室检查结果">
        <!-- <div @click="openGroupItemDetailModal">其他科室检查结果</div> -->
        <div>
          <Table border
                 stripe
                 :columns="otherDeptResultColumns"
                 :data="otherDeptResultData"></Table>
        </div>
      </can-move-modal>
      <!-- 可拖动模态框 - 检查小结 - 其他科室检查结果 -> 组合项目详情 -->
      <can-move-modal ref="groupItemDetail"
                      :width="910"
                      :height="250"
                      title="一般检查(所属科室:内科)">
        <div>
          <Table border
                 stripe
                 :columns="commonExamColumns"
                 :data="commonExamData"></Table>
        </div>
      </can-move-modal>

      <!-- 可拖动模态框 - 检查小结 - 其他科室诊断上报 -->
      <can-move-modal ref="otherOfficeDialog"
                      :width="670"
                      :height="270"
                      title="其他科室诊断上报">
        <div>
          <Table border
                 stripe
                 :columns="otherDeptDiagnoseColumns"
                 :height="220"
                 :data="otherDeptDiagnoseData"></Table>
        </div>
      </can-move-modal>
    </div>

    <div style="background: #fff;"
         class="footer">
      <div>
        <!-- 诊断上报 -->
        <div class="diaglose-submit"
             v-if="tabTitle==='检查小结' && (groupItems.length || specialGroupItems.length)">
          <div class="diaglose-submit-title">
            <titletHasSlot style="border-radius:8px 8px 0 0;">
              <span slot='titletHasSlotLeftTitle'>诊断上报</span>
              <div slot="titletHasSlotRightContent"
                   style="font-size: 16px;">
                <div class="icon-show marginR20"
                     @click="submitStatus = !submitStatus">
                  <Icon :type="submitStatus ? 'arrow-up-b' : 'arrow-down-b'"
                        size="8"
                        color="white"
                        class="arr-icon"></Icon>
                </div>
              </div>
            </titletHasSlot>
          </div>
          <transition name="fold">
            <div v-if="submitStatus">
              <zTable border
                      :height="200"
                      :isShowSelectOrIndex="false"
                      :isDependent="true"
                      :columns="result_advice"
                      :data="resultAdviceData">
              </zTable>
            </div>
          </transition>
        </div>
      </div>
      <!-- 底部检查医生,处方,保存,清空 -->
      <div class="input-result-footer">
        <div class="fl">
          <span class="footer-item">检查医生：</span>
          <span class="footer-item doctor-sign"
                :style="{'background-image': `url(${doctorSignature})`}"></span>
          <span class="footer-item">检查时间：{{currentTime}}</span>
        </div>
        <div class="fr footer-right">
          <Button v-if="false"
                  type="primary">处方</Button>
          <Button type="primary">保存</Button>
          <Button type="ghost">清空</Button>
        </div>
      </div>
    </div>
    <!-- 模态框 -->
    <!-- 弹出模态框 - 关联单项 -->
    <single-relation :groupItem="singleRelationGroupItem"
                     ref="singleRelation"
                     @checkValue="relationToSingleItem"></single-relation>
    <!-- 删除临床诊断 -->
    <affirmDelModal :delet="'删 除'"
                    :content="resultAdviceModalContent"
                    :rests="false"
                    :controlModal="affirmResultAdviceModal"
                    @affirmDel="affirmResultAdvice"
                    @delCancel="delCancelResultAdvice"></affirmDelModal>

    <!-- 确认弃检弹框 -->
    <default-modal :opendefaultModal="beforeGiveUpModal"
                   @abolish="modalAbolishGiveUp"
                   @affirm="modalAffirmGiveUp"
                   :content="`【${giveUpItem.group_item_name}】已有数据,确认弃检?`"
                   ref="clearGiveUpData"></default-modal>
    <!-- 删除自觉症状 -->
    <default-modal :opendefaultModal="delSelfFeelingModal"
                   @abolish="abolishSelfFeeling"
                   @affirm="affirmSelfFeeling"
                   content="是否删除该条自觉症状?"
                   ref="delSelfFeelingModal"></default-modal>
    <!-- 全部弃检 -->
    <give-up-modal ref="allGiveUp"
                   :give-up-modal="allGiveUpModal"
                   @give-up-modal-cancel="allGiveUpModalCancel"
                   @give-up-confirm="allGiveUpConfirm"></give-up-modal>
    <!-- 单个弃检 -->
    <give-up-modal ref="giveUp"
                   :isAbandon="giveUpItem.is_abandon"
                   :give-up-modal="giveUpModal"
                   :reasonIn="giveUpItem.give_up_reason"
                   @give-up-modal-cancel="giveUpModalCancel"
                   @give-up-cancel="giveUpCancel"
                   @give-up-confirm="giveUpConfirm"
                   @modify-confirm="modifyConfirm"></give-up-modal>
    <!-- 匹配失败模态框 -->
    <hold-moment-modal :warningModal="matchFail"
                       content="匹配失败,请核对后重新匹配"
                       @hold="handleMatchFail"></hold-moment-modal>
    <!-- 影像导入模态框 -->
    <importingPicturesModel ref="importingPicturesModel"></importingPicturesModel>
    <!-- 新增临床诊断 - 普通 -->
    <add-clinical ref="addClinicalModal"
                  :choosenDiagnose="choosenDiagnose"
                  @checkValue="checkValue"></add-clinical>
    <!-- 新增临床诊断 - 特殊 -->
    <add-clinical ref="addSpecialClinicalModal"
                  :choosenDiagnose="choosenDiagnose"
                  @checkValue="specialCheckValue"></add-clinical>
  </div>

</template>
<script>
import ZButton from '@/components/button/ZButton'
import ZButtonHasBg from '@/components/button/ZButtonHasBg'
import affirmDelModal from '@/components/modal/affirmDelModal'
import crossBand from '@/components/crossBand'
import zTable from '@/components/table/zTable'
import addClinical from './components/addClinical/addClinical'
import reviewModal from './components/reviewModal'
import titletHasSlot from '@/components/titleHasSlot'
import RTable from './components/table'
// import basicInfo from './components/basicInfo'
import basicInfo from '../../mainExamWorkBench/components/basicInformation.vue'
import HealthExamPersonSearch from './components/healthExamPersonSearch/index.vue'
import { mapActions, mapState, mapMutations } from 'vuex'
import giveUpModal from './components/giveUpModal'
import GroupItemsSaw from './components/groupItemsSaw'
import GroupItemsResult from './components/groupItemsResult'
import GroupItemsSymptom from './components/groupItemsSymptom'
import Tab from './components/tabs'
import CanMoveModal from '@/components/modal/canMoveModal'
import LocalSearchInput from '@/components/localSearchInput'
import SingleRelation from './components/singleRelation' // 关联单项弹框
// import ImagePlayer from '@/componetns/imagePlayer'  // 图片展示
import currentDept from './components/currentDept' // 当前科室弹框
import holdMomentModal from '@/components/modal/holdMomentModal' // 自动消失模态框
import { copy, isEqual } from '@/utils/helper'
import DefaultModal from '@/components/modal/defaultModal'
import importingPicturesModel from './components/groupItemsSaw/importingPicturesModel'
import QTable from '@/components/qtable'
import * as types from '@/store/types'
export default {
  name: 'inputResult-main',
  components: {
    ZButton,
    crossBand,
    zTable,
    titletHasSlot,
    RTable,
    addClinical,
    affirmDelModal,
    reviewModal,
    basicInfo,
    HealthExamPersonSearch,
    ZButtonHasBg,
    giveUpModal,
    GroupItemsSaw,
    GroupItemsResult,
    GroupItemsSymptom,
    Tab,
    CanMoveModal,
    LocalSearchInput,
    SingleRelation,
    // ImagePlayer,
    currentDept,
    holdMomentModal,
    DefaultModal,
    importingPicturesModel,
    QTable,
  },
  data() {
    let that = this
    return {
      applicationTitle: null, // 基本信息下框的tab头
      singleRelationGroupItem: {}, // 组合项数据
      oldstatus: null,
      thisIndex: null,
      clickIndex: -1,
      pe_sn: '180603064',
      matchFail: false, // 体检号匹配失败
      isHealthRecord: false, // 健康档案健康档案
      // 弃检前判断
      beforeGiveUpModal: false,
      // 单个弃检字段
      giveUpModal: false, // 打开模态框
      giveUpReason: '',
      giveUpItem: {}, // 记录每次点击弃检的组合项目信息
      giveUpItemIsAbandon: -1, // 用来记录是当前组合项目弃检状态
      // 显示全部弃检模态框
      allGiveUpModal: false,
      schema: '',
      examinationNumber: '123',
      // currentPatient: {},
      patientName: '',
      gender: '',
      age: 11,
      company: '',
      examCategory: '',
      workCategory: '',
      // 仪器连接写store里面
      // carouselData: [
      //   {
      //     instrument: '科力飞电子伽马刀',
      //     status: 1,
      //   },
      // ],
      pros_columns: [
        {
          title: '好转',
          width: 50,
          type: 'd',
        },
        {
          title: '疾病(或异常)',
          key: '',
        },
        {
          title: '确证日期',
          key: '',
          width: 100,
        },
      ],
      result_advice: [
        {
          title: '临床诊断',
          key: 'name',
          width: 308,
        },
        {
          title: '建议',
          key: 'advice',
          render(h, params) {
            return h('input', {
              class: {
                'advice-input': true,
              },
              domProps: {
                value: params.row.advice,
                placeholder: '请输入建议...',
              },
              on: {
                change: e => {
                  // that.resultAdviceDataCopy[params.index].advice =
                  //   e.target.value
                  that.$set(
                    that.resultAdviceDataCopy[params.index],
                    'advice',
                    e.target.value,
                  )
                },
              },
            })
          },
        },
        {
          title: '来源组合项目',
          key: 'groupOrigin',
          width: 308,
        },
        {
          title: '操作',
          fixed: 'right',
          width: 70,
          render(h, params) {
            return h(
              'div',
              {
                on: {
                  click: event => {
                    event.stopPropagation()
                    that.affirmResultAdviceModal = true
                    that.decideToDelResultAdviceIndex = params.index
                    that.decideToDelResultAdvice = params.row
                    that.resultAdviceModalContent = `确定要删除【${
                      params.row.name
                    }】吗`
                  },
                },
              },
              [
                h('i', {
                  style: {
                    display: 'inline-block',
                    width: '12px',
                    height: '13px',
                    background:
                      'url(/static/icons/public/table-hover-del.svg) no-repeat',
                  },
                }),
              ],
            )
          },
        },
      ],
      resultAdviceData: [],
      // 用来保存修改后的结论及建议
      resultAdviceDataCopy: [],
      addClinicalArr: [],
      controlModal: false,
      // 科室小结
      inputTextArea: '',
      // 临时存放输入建议 - 为对象
      tempInputTextAreaObj: {},
      suggestModal: false,
      adviceModalArea: '',
      adviceModal: false,
      tableData: [],
      timer: null, // 定时器, 用于tableData数据绑定
      isShowExamBox: false,
      willExamLists: [], // 待检列表
      officeId: '1,2', // 科室id, 目前测试用
      infoData: {
        // 待检人员基本信息
        customer: {},
        created_at: '',
        appt_time: '',
        customer_id: '',
        id: '',
        is_lock: '',
        is_outside_check: '',
        is_print_health_card: '',
        is_print_report: '',
        is_recheck: '',
        lock_staff_id: '',
        lock_time: '',
        operate_staff_id: '',
        package_id: '',
        package_name: '',
        pe_dept: {},
        pe_group_item: {},
        pe_sn: '',
        pe_type: '',
        print_guide_list_time: '',
        settlement_type: '',
        status: '',
        subscription: '',
        unit_id: '',
        updated_at: '',
      },
      waitingProject: [], // 待检项目组合
      willCheckup: 0,
      rowData: {}, // 组合项目下每个单项的单行数据
      groupRowData: {}, // 组合项目整行数据
      affirmCleanUpModal: false, // 清空小结模态框显示隐藏字段
      affirmResultAdviceModal: false, // 删除建议及结论模态框显示隐藏字段
      decideToDelResultAdviceIndex: -1, // 将要删除的结论及建议的index
      resultAdviceModalContent: '', // 删除结论及建议模态框内容
      // 有关tabs的
      tabdata: [
        { title: '问诊症状/自觉症状' },
        { title: '检查所见' },
        { title: '检查小结' },
      ],
      tabTitle: '问诊症状/自觉症状', // 切换table
      // 组合项目-检查所见-有关(测试)
      testColumns: [
        {
          title: '单项名称',
          key: 'groupItemName',
          minWidth: 300,
          width: 300,
        },
        {
          title: '检查所见',
          key: 'saw',
          minWidth: 708,
          render: (h, params) => {
            let that = this
            return h('input', {
              domProps: {
                value: params.row.saw,
              },
              style: {
                display: 'inline-block',
                background: 'transparent',
                height: '100%',
                width: '100%',
                border: 'none',
                'text-align': 'center',
                margin: '0',
              },
              on: {
                click: function() {
                  that.$refs.canMoveModal.open()
                },
              },
            })
          },
        },
        {
          title: '单位',
          key: 'units',
          minWidth: 130,
          width: 130,
        },
        {
          title: '参考范围',
          key: 'range',
          minWidth: 110,
          width: 110,
        },
        {
          title: '加入小结',
          key: 'addIntoResult',
          minWidth: 70,
          width: 70,
          render: (h, params) => {
            return h('div', [
              h('Checkbox', {
                props: {
                  value: params.row.addIntoResult,
                },
              }),
            ])
          },
        },
      ],
      testData: [
        {
          groupItemName: 'John Brown',
          saw: 18,
          units: 'New York No. 1 Lake Park',
          range: '2016-10-03',
          addIntoResult: false,
        },
        {
          groupItemName: 'John Brown',
          saw: 18,
          units: 'New York No. 1 Lake Park',
          range: '2016-10-03',
          addIntoResult: true,
        },
        {
          groupItemName: 'John Brown',
          saw: 18,
          units: 'New York No. 1 Lake Park',
          range: '2016-10-03',
          addIntoResult: false,
        },
        {
          groupItemName: 'John Brown',
          saw: 18,
          units: 'New York No. 1 Lake Park',
          range: '2016-10-03',
          addIntoResult: true,
        },
      ],
      // 组合项目 - 检查所见
      groupItemColumns: [
        {
          title: '单项名称',
          key: 'item_name',
          minWidth: 300,
          width: 300,
        },
        {
          title: '检查所见',
          key: 'examine_saw',
          minWidth: 708,
          render: (h, params) => {
            let that = this
            return h('input', {
              domProps: {
                value: params.row.examine_saw,
              },
              style: {
                display: 'inline-block',
                background: 'transparent',
                height: '100%',
                width: '100%',
                border: 'none',
                'text-align': 'center',
                margin: '0',
              },
              on: {
                async click() {
                  // 调用获取参考结果api
                  let result = await that.getReferenceResultBySingleId({
                    item_id: params.row.item_id,
                    sex: `0,${that.infoData.sex}`,
                    pe_categories: that.infoData.pe_detail.pe_type,
                  })
                  console.log(result)
                  that.$refs.canMoveModal.open()
                },
                change(e) {
                  that.$nextTick(() => {
                    that.$set(
                      that.currentSingleItemExamSaw,
                      'examine_saw',
                      e.target.value,
                    )
                  })
                },
              },
            })
          },
        },
        {
          title: '单位',
          key: 'measure_unit',
          minWidth: 130,
          width: 130,
          render(h, params) {
            return h(
              'span',
              params.row.measure_unit ? params.row.measure_unit : '/',
            )
          },
        },
        {
          title: '参考范围',
          key: 'range',
          minWidth: 110,
          width: 110,
          render(h, params) {
            let range = ''
            let row = params.row
            if (row.sex === 1) {
              // 男
              if (!row.low_limit_man && !row.upper_limit_man) {
                range = '/'
              } else {
                range = `${row.low_limit_man} - ${row.upper_limit_man}`
              }
            } else {
              // 女
              if (!row.low_limit_woman && !row.upper_limit_woman) {
                range = '/'
              } else {
                range = `${row.low_limit_woman} - ${row.upper_limit_woman}`
              }
            }
            return h('div', range)
          },
        },
        {
          title: '加入小结',
          key: 'addIntoResult',
          minWidth: 70,
          width: 70,
          render: (h, params) => {
            return h('div', [
              h('Checkbox', {
                props: {
                  value: params.row.addIntoResult,
                },
                on: {
                  'on-change': (status) => {
                    console.log(status)
                    params.row.addIntoResult = status
                  },
                },
              }),
            ])
          },
        },
      ],

      currentSingleItemExamSaw: {}, // 当前检查所见项 - 单项

      // 检查结果可拖动框
      examResultColumns: [
        {
          title: '检查所见',
          key: 'examine_saw',
          width: 140,
          ellipsis: true,
        },
        {
          title: '检查结果',
          key: 'exam_result',
          ellipsis: true,
        },
      ],
      examResultData: [
        {
          examine_saw: '表面光滑',
          exam_result: '痢疾',
        },
        {
          examine_saw: '表面光滑',
          exam_result: '痢疾',
        },
        {
          examine_saw: '双肺呼吸音清双肺呼吸音清',
          exam_result: '痢疾',
        },
        {
          examine_saw: '表面光滑',
          exam_result: '痢疾',
        },
        {
          examine_saw: '双肺呼吸音清双肺呼吸音清',
          exam_result: '痢疾',
        },
        {
          examine_saw: '表面光滑',
          exam_result: '痢疾',
        },
        {
          examine_saw: '双肺呼吸音清双肺呼吸音清',
          exam_result: '痢疾',
        },
        {
          examine_saw: '表面光滑',
          exam_result: '痢疾',
        },
      ],
      examResultDataCopy: [
        {
          examine_saw: '表面光滑',
          exam_result: '痢疾',
        },
        {
          examine_saw: '表面光滑',
          exam_result: '痢疾',
        },
        {
          examine_saw: '双肺呼吸音清双肺呼吸音清',
          exam_result: '痢疾',
        },
        {
          examine_saw: '表面光滑',
          exam_result: '痢疾',
        },
        {
          examine_saw: '双肺呼吸音清双肺呼吸音清',
          exam_result: '痢疾',
        },
        {
          examine_saw: '表面光滑',
          exam_result: '痢疾',
        },
        {
          examine_saw: '双肺呼吸音清双肺呼吸音清',
          exam_result: '痢疾',
        },
        {
          examine_saw: '表面光滑',
          exam_result: '痢疾',
        },
      ],
      referenceResultSearchValue: '', // 检查结果搜索字段
      // 当前的科室(多个) - 数组, 存放选中的
      curOfficeSelection: [],
      // 科室列表
      deptData: [],
      // 鼠标是否在科室选择弹框中
      isMouseInDeptBox: false,
      // 鼠标在crossband中的位置
      isMouseInCrossBandLeft: false,
      // 鼠标在候选人框
      isMouseInExamPersonSearch: false,
      // 检查所见
      groupItems: [], // 普通组合项目
      specialGroupItems: [], // 特殊组合项目
      groupItemsCopy: [], // 普通组合项目 - 原始数据
      specialGroupItemsCopy: [], // 特殊组合项目 - 原始数据
      // 病人信息
      customerInfo: {},
      // 检查小结 - 诊断上报
      groupItemsDiagnoseReport: [],
      specialGroupItemsDiagnoseReport: [],
      // 自觉症状
      selfFeelingIndex: -1,
      selfFeelingData: [],
      delSelfFeelingModal: false, // 模态框显隐字段
      currentTimer: null, // 当前时间计时器
      currentTime: '', // 当前时间字段
      doctorSignature: '', // 医生签名

      // 其他科室检查结果
      otherDeptResultColumns: [
        {
          title: '科室名称',
          key: 'dept_name',
          width: 149,
          render(h, params) {
            return h(
              'div',
              {
                on: {
                  click: () => {
                    that.openGroupItemDetailModal()
                  },
                },
              },
              params.row.dept_name,
            )
          },
        },
        {
          title: '组合项目名称',
          key: 'group_item_name',
          ellipsis: true,
          render(h, params) {
            return h(
              'div',
              {
                style: {
                  position: 'relative',
                  display: 'inline-block',
                },
              },
              [
                h('span', params.row.group_item_name),
                h('i', {
                  style: {
                    display: 'inline-block',
                    position: 'absolute',
                    width: '17px',
                    height: '11px',
                    background:
                      'url(/static/icons/public/table-hover-preview.svg)',
                    right: '-20px',
                    top: '4px',
                  },
                }),
              ],
            )
          },
        },
        {
          title: '图像',
          key: 'image',
          width: 50,
          render(h, params) {
            return h(
              'div',
              {
                style: {
                  display: 'flex',
                  'align-items': 'center',
                  'justify-content': 'space-around',
                },
              },
              params.row.image
                ? [
                  h('img', {
                    attrs: {
                      src: '/static/icons/public/camerablue.svg',
                    },
                  }),
                ]
                : '',
            )
          },
        },
        {
          title: '检查小结',
          key: 'exam_result',
          ellipsis: true,
        },
        {
          title: '检查医生',
          key: 'exam_doctor',
          width: 100,
        },
        {
          title: '检查时间',
          key: 'exam_time',
          width: 122,
        },
      ],
      otherDeptResultData: [
        {
          dept_name: 'C14呼气试验诊断室',
          group_item_name: 'C14呼气实验室(幽门螺杆菌)',
          image: true,
          exam_result: '感染了幽门螺杆菌,需进一步检查',
          exam_doctor: '李浩方',
          exam_time: '2017-12-12  12:00',
        },
        {
          dept_name: 'C14呼气试验诊断室',
          group_item_name: 'C14呼气实验室(幽门螺杆菌)',
          image: true,
          exam_result: '感染了幽门螺杆菌,需进一步检查',
          exam_doctor: '李浩方',
          exam_time: '2017-12-12  12:00',
        },
        {
          dept_name: 'C14呼气试验诊断室',
          group_item_name: 'C14呼气实验室(幽门螺杆菌)',
          image: false,
          exam_result: '感染了幽门螺杆菌,需进一步检查',
          exam_doctor: '李浩方',
          exam_time: '2017-12-12  12:00',
        },
      ],
      // 一般检查
      commonExamColumns: [
        {
          title: '单项名称',
          key: 'single_name',
          width: 190,
        },
        {
          title: '影像',
          key: 'images',
          width: 55,
          render(h, params) {
            return h(
              'div',
              {
                style: {
                  display: 'flex',
                  'align-items': 'center',
                  'justify-content': 'space-around',
                },
              },
              params.row.images
                ? [
                  h('img', {
                    attrs: {
                      src: '/static/icons/public/camerablue.svg',
                    },
                  }),
                ]
                : '',
            )
          },
        },
        {
          title: '检查所见',
          key: 'exam_result',
        },
        {
          title: '单位',
          key: 'unit',
          width: 128,
        },
        {
          title: '参考范围',
          key: 'range',
          width: 108,
        },
      ],
      commonExamData: [
        {
          single_name: '心电图',
          images: true,
          exam_result: '',
          unit: '',
          range: '',
        },
        {
          single_name: '体格检查',
          images: false,
          exam_result: '未见明显异常',
          unit: '',
          range: '',
        },
        {
          single_name: '肾功能检查',
          images: true,
          exam_result: '蛋白尿+, 肌酥450mmhg/l',
          unit: 'mmhg/l',
          range: '90-390',
        },
      ],
      // 其他科室诊断上报
      otherDeptDiagnoseColumns: [
        {
          title: '临床诊断',
          key: 'diagnose',
        },
        {
          title: '建议',
          key: 'advice',
        },
        {
          title: '来源组合项目',
          key: 'group_item',
        },
        {
          title: '科室',
          key: 'dept',
        },
      ],
      otherDeptDiagnoseData: [
        {
          diagnose: '感冒',
          advice: '严格限制糖果酒类',
          group_item: '一般科室',
          dept: '一般科室',
        },
        {
          diagnose: '感冒',
          advice: '严格限制糖果酒类',
          group_item: '一般科室',
          dept: '一般科室',
        },
        {
          diagnose: '感冒',
          advice: '严格限制糖果酒类',
          group_item: '一般科室',
          dept: '一般科室',
        },
        {
          diagnose: '感冒',
          advice: '严格限制糖果酒类',
          group_item: '一般科室',
          dept: '一般科室',
        },
        {
          diagnose: '感冒',
          advice: '严格限制糖果酒类',
          group_item: '一般科室',
          dept: '一般科室',
        },
        {
          diagnose: '感冒',
          advice: '严格限制糖果酒类',
          group_item: '一般科室',
          dept: '一般科室',
        },
        {
          diagnose: '感冒',
          advice: '严格限制糖果酒类',
          group_item: '一般科室',
          dept: '一般科室',
        },
        {
          diagnose: '感冒',
          advice: '严格限制糖果酒类',
          group_item: '一般科室',
          dept: '一般科室',
        },
        {
          diagnose: '感冒',
          advice: '严格限制糖果酒类',
          group_item: '一般科室',
          dept: '一般科室',
        },
        {
          diagnose: '感冒',
          advice: '严格限制糖果酒类',
          group_item: '一般科室',
          dept: '一般科室',
        },
        {
          diagnose: '感冒',
          advice: '严格限制糖果酒类',
          group_item: '一般科室',
          dept: '一般科室',
        },
        {
          diagnose: '感冒',
          advice: '严格限制糖果酒类',
          group_item: '一般科室',
          dept: '一般科室',
        },
        {
          diagnose: '糖尿病',
          advice: '严格限制糖果酒类',
          group_item: '一般科室',
          dept: '一般科室',
        },
        {
          diagnose: '感冒',
          advice: '严格限制糖果酒类',
          group_item: '一般科室',
          dept: '一般科室',
        },
      ],
      submitStatus: false,
      // 当前检查小结item
      examResultItem: {},
      choosenDiagnose: [], // 从组件实例中获取的临床诊断选中
      examResultItemVNode: null,
    }
  },
  deactivated() {
    clearTimeout(this.currentTimer)
    this.currentTimer = null
  },
  activated() {
    this.currentTime = this.getCurrentTime()
    this.interval()
  },
  beforeDestroy() {
    clearTimeout(this.currentTimer)
    this.currentTimer = null
  },
  async mounted() {
    this.applicationTitle = this.$el.querySelector('.application-title')

    let willExamLists = await this.currentOfficeWillExamGet(this.officeId)
    // 把customer对象放到外层
    let newWillExamLists = willExamLists.map(item => {
      return { ...item, ...item.customer }
    })
    this.willExamLists = newWillExamLists // willExamPerson.items
    this.willCheckup = this.willExamLists.length
    // 科室列表
    let deptInfo = await this.getDeptInfo(1)
    this.deptData = deptInfo.depts
    this.curOfficeSelection = this.deptData

    // 获取当前时间
    this.currentTime = this.getCurrentTime()
    this.interval()
    this.doctorSignature = this.userInfo.signature
  },
  computed: {
    examColumns() {
      // let that = this
      let userInfo = this.userInfo.id
      return [
        {
          title: '序号',
          key: 'index',
          width: 50,
          is_lock: false,
          userInfoId: userInfo,
        },
        {
          title: '体检号',
          key: 'pe_sn',
          width: 120,
        },
        {
          title: '姓名',
          key: 'name',
        },
      ]
    },
    ...mapState(['userInfo']),
    ...mapState('inputResultModule', ['connectInstrument']),
  },
  watch: {
    // 特殊
    specialGroupItemsDiagnoseReport: {
      handler(val) {
        this.resultAdviceData = this.groupItemsDiagnoseReport.concat(val)
      },
      deep: true,
    },
    // 普通
    groupItemsDiagnoseReport: {
      handler(val) {
        this.resultAdviceData = val.concat(this.specialGroupItemsDiagnoseReport)
      },
      deep: true,
    },
    // 弃检原因
    reasonIn(val, oldval) {
      this.reason = this.reasonIn
    },
  },
  methods: {
    ...mapActions('inputResultModule', [
      'forOtherOfficeToSeeGet',
      'getSilkCurrentOfficeResultGet',
      'getUserBasicInfoByCheckupNumber',
      'currentOfficeWillExamGet',
      'addOfficeExamRecordsPost',
      'modifyOfficeExamRecords',
      'getDeptInfo',
      // 2018.3.7
      'getPatientGroupItemsInfoById',
      'getPatientBasicInfoById',
      // 2018.3.20
      'getPatientWaitingGroupItemsInfoById',
      'getReferenceResultBySingleId',
    ]),
    ...mapMutations({
      openPage: types.OPEN_PAGE,
      setCurPage: types.SET_CURRENT_PAGE_NAME,
    }),
    // 计算时间
    getCurrentTime() {
      let dateTime = new Date()
      let year = dateTime.getFullYear()
      let month =
        dateTime.getMonth() + 1 < 10
          ? `0${dateTime.getMonth() + 1}`
          : dateTime.getMonth() + 1
      let day =
        dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : dateTime.getDate()
      let hours = dateTime.getHours()
      let minites =
        dateTime.getMinutes() < 10
          ? `0${dateTime.getMinutes()}`
          : dateTime.getMinutes()
      let seconds =
        dateTime.getSeconds() < 10
          ? `0${dateTime.getSeconds()}`
          : dateTime.getSeconds()
      return `${year}-${month}-${day}  ${hours}:${minites}:${seconds}`
    },
    interval() {
      clearTimeout(this.currentTimer)
      this.currentTimer = null
      this.currentTimer = setTimeout(() => {
        clearTimeout(this.currentTimer)
        this.currentTimer = null
        this.currentTime = this.getCurrentTime()
        this.interval()
      }, 1000)
    },
    handleMatchFail() {
      this.matchFail = false
    },
    // 匹配体检号
    matchInspectNo(number) {
      for (let obj of this.willExamLists) {
        if (obj.pe_sn === number) {
          this.handleRowClick(obj)
          return
        }
      }
      this.matchFail = true
    },
    // 展开关闭所有
    spreadAlll() {
      let length = this.groupItems.length // 组合项目的条数
      for (let i = 0; i < length; i++) {
        this.$refs[`item-saw-${i}`][0].show = true
      }
      this.$refs.chestRadiography &&
        (this.$refs.chestRadiography[0].show = true)
      this.$refs.listenTest && (this.$refs.listenTest[0].show = true)
    },
    closeAll() {
      let length = this.groupItems.length // 组合项目的条数
      for (let i = 0; i < length; i++) {
        this.$refs[`item-saw-${i}`][0].show = false
      }
      this.$refs.chestRadiography &&
        (this.$refs.chestRadiography[0].show = false)
      this.$refs.listenTest && (this.$refs.listenTest[0].show = false)
    },
    healthDoc() {
      this.$router.push({ name: 'healthRecord' })
      let temp = {}
      temp.name = 'healthRecord'
      temp.title = 'healthRecord'
      this.openPage(temp)
      this.setCurPage(temp.name)
      this.isHealthRecord = true
    },
    // 临床诊断
    openAddClinicalModal(item, index) {
      // 清空"新增临床诊断"模态框数据
      this.$refs.addClinicalModal.deseaseTypes = []
      this.$refs.addClinicalModal.checkItemLists = []
      this.$refs.addClinicalModal.diagnoseType = ''
      this.$refs.addClinicalModal.deseaseType = ''
      this.$refs.addClinicalModal.checkItemLists = []

      this.examResultItem = item
      this.examResultItemVNode = this.$refs[`groupItemSaw${index}`]
      this.choosenDiagnose = this.examResultItemVNode.choosenDiagnose
      // 打开"新增临床诊断"模态框
      this.$refs.addClinicalModal.open()
    },
    openSpecialAddClinicalModal(item, index) {
      // 清空"新增临床诊断"模态框数据
      this.$refs.addSpecialClinicalModal.deseaseTypes = []
      this.$refs.addSpecialClinicalModal.checkItemLists = []
      this.$refs.addSpecialClinicalModal.diagnoseType = ''
      this.$refs.addSpecialClinicalModal.deseaseType = ''
      this.$refs.addSpecialClinicalModal.checkItemLists = []

      this.examResultItem = item
      this.examResultItemVNode = this.$refs[`specialGroupSaw${index}`]
      this.choosenDiagnose = this.examResultItemVNode.choosenDiagnose
      // 打开"新增临床诊断"模态框
      this.$refs.addSpecialClinicalModal.open()
    },
    checkValue(data) {
      console.log('普通')
      for (let obj of data) {
        this.$set(obj, 'groupOrigin', this.examResultItem.group_item_name)
      }
      this.groupItemsDiagnoseReport = data
      this.examResultItemVNode.choosenDiagnose = data
    },
    specialCheckValue(data) {
      console.log('special')
      for (let obj of data) {
        this.$set(obj, 'groupOrigin', this.examResultItem.group_item_name)
      }
      this.specialGroupItemsDiagnoseReport = data
      this.examResultItemVNode.choosenDiagnose = data
    },
    //  清空诊断
    cleanClinical() {
      this.controlModal = true
    },
    delCancel() {
      this.controlModal = false
    },
    // 确认清空
    affirmDel() {
      this.addClinicalArr = []
      this.controlModal = false
    },
    //  清空诊断
    cleanSuggest() {
      this.suggestModal = true
    },
    suggestDelCancel() {
      this.suggestModal = false
    },
    // 确认清空
    suggestAffirmDel() {
      this.inputTextArea = ''
      this.suggestModal = false
    },
    //  清空诊断
    cleanAdvice() {
      this.adviceModal = true
    },
    adviceDelCancel() {
      this.adviceModal = false
    },
    // 确认清空
    adviceAffirmDel() {
      this.adviceModalArea = ''
      this.adviceModal = false
    },
    // 复查项目
    openReviewModal() {
      this.$refs.reviewModal.openM()
    },
    // 打开候选人员模态框
    openCheckupModal() {
      this.isShowExamBox = !this.isShowExamBox
    },
    // 打开科室选择模态框
    openDeptChoicesModal() {
      this.$refs.currentDept.isShowDeptBox = !this.$refs.currentDept
        .isShowDeptBox
    },
    // 候检人员列表行点击
    async handleRowClick(row, index) {
      this.clickIndex = index
      this.isShowExamBox = false
      // this.currentPatient = row
      this.inputTextArea = ''
      this.tempInputTextAreaObj = {}
      this.pe_sn = row.pe_sn
      // 清空结论及建议中的数据
      this.resultAdviceData = []
      this.resultAdviceDataCopy = []
      // 清空检查小结的诊断上报
      this.groupItemsDiagnoseReport = []
      this.specialGroupItemsDiagnoseReport = []

      // 获取病人基本信息
      let patientInfo = await this.getPatientBasicInfoById(this.pe_sn)
      this.infoData = patientInfo
      // 获取病人待检项目
      this.waitingProject = await this.getPatientWaitingGroupItemsInfoById(
        this.pe_sn,
      )
      // 获取当前科室组合项目
      let patientGroupItems = await this.getPatientGroupItemsInfoById({
        pe_sn: this.pe_sn,
        dept_id: this.officeId,
      })

      console.log(patientGroupItems)

      // waitingProject

      // patientGroupItems

      // // 清空分组
      this.specialGroupItems = []
      this.groupItems = []
      for (let obj of patientGroupItems) {
        if (obj.is_special) {
          this.specialGroupItems.push(obj)
        } else {
          this.groupItems.push(obj)
        }
      }
      this.groupItemsCopy = copy(this.groupItems, true)
      this.specialGroupItemsCopy = copy(this.specialGroupItems, true)
    },

    // ------------------- written after ------------------------
    // 删除结论与建议模态框 - 确定
    affirmResultAdvice() {
      let data = this.resultAdviceData.splice(
        this.decideToDelResultAdviceIndex,
        1,
      )
      this.resultAdviceDataCopy.splice(this.decideToDelResultAdviceIndex, 1)
      // 用名称判定是特殊还是普通
      if (
        data[0].groupOrigin !== '电测听' &&
        data[0].groupOrigin !== '后前位X射线高千伏胸片'
      ) {
        for (let i = 0; i < this.groupItemsDiagnoseReport.length; i++) {
          if (this.groupItemsDiagnoseReport[i].name === data[0].name) {
            this.groupItemsDiagnoseReport.splice(i, 1)
            break
          }
        }
      } else {
        for (let i = 0; i < this.specialDiagnoseReport.length; i++) {
          if (this.specialGroupItemsDiagnoseReport[i].name === data[0].name) {
            this.specialGroupItemsDiagnoseReport.splice(i, 1)
            break
          }
        }
      }

      this.affirmResultAdviceModal = false
      this.resultAdviceModalContent = ''
      this.decideToDelResultAdviceIndex = -1
    },
    // 删除结论与建议模态框 - 取消
    delCancelResultAdvice() {
      this.affirmResultAdviceModal = false
      this.resultAdviceModalContent = ''
      this.decideToDelResultAdviceIndex = -1
    },
    // tabs切换传递
    tabChange(data, index) {
      this.tabTitle = data.title
    },
    // 其他科室检查结果模态框
    openOtherOfficeResult() {
      this.$refs.otherOfficeResult.open()
    },
    // 其他科室结果模态框操作弹出组合项目详情
    openGroupItemDetailModal() {
      this.$refs.groupItemDetail.open()
    },
    // 其他科室诊断上报模态框
    openOtherOfficeDialog() {
      this.$refs.otherOfficeDialog.open()
    },
    // 影像导入
    imageImport() {
      this.$refs.importingPicturesModel.openM()
    },

    // 当前选择的科室
    currentDeptSelection(selection) {
      // let deptNames = []
      // for (let obj of selection) {
      //   // 目前初始化的时候是字符串
      //   deptNames.push(obj.name)
      // }
      console.log(selection)
      this.curOfficeSelection = selection
    },

    // 获得鼠标时候在科室选择弹框之内
    getMousePosition(isIn) {
      this.isMouseInDeptBox = isIn
    },

    // 鼠标是否在
    examPersonSearchPos(isIn) {
      this.isMouseInExamPersonSearch = isIn
    },

    // 鼠标在crossband中的位置
    crossBandMousePos(isIn) {
      this.isMouseInCrossBandLeft = isIn
    },

    // 点击科室选择/侯检人弹框以外的处理
    otherClick(e) {
      if (!this.isMouseInDeptBox && !this.isMouseInCrossBandLeft) {
        // 关闭科室选择框
        this.$refs.currentDept.isShowDeptBox = false
      }

      if (!this.isMouseInExamPersonSearch && !this.isMouseInCrossBandLeft) {
        // 关闭侯检框
        this.isShowExamBox = false
      }
    },

    // 检查小结 - 临床诊断 - 普通
    normalDiagnoseReport(data) {
      this.submitStatus = true
      this.groupItemsDiagnoseReport = data
    },
    // 检查小结 - 临床诊断 - 特殊
    specialDiagnoseReport(data) {
      this.submitStatus = true
      this.specialGroupItemsDiagnoseReport = data
    },
    // 全部弃检
    allGiveUp() {
      this.allGiveUpModal = true
    },
    allGiveUpModalCancel() {
      this.allGiveUpModal = false
    },
    allGiveUpConfirm(reason) {
      this.$nextTick(() => {
        this.allGiveUpModal = false
        for (let index in this.groupItems) {
          this.$set(this.groupItems[index], 'is_abandon', 1)
          this.$set(this.groupItems[index], 'give_up_reason', reason)
          this.$refs[`item-saw-${index}`][0].setstatus(
            Boolean(this.groupItems[index].is_abandon),
          )
        }
        for (let obj of this.specialGroupItems) {
          this.$set(obj, 'is_abandon', 1)
          this.$set(obj, 'give_up_reason', reason)
          if (obj.group_item_name === '后前位X射线高千伏胸片') {
            this.$refs[`chestRadiography`][0].setstatus(Boolean(obj.is_abandon))
          } else if (obj.group_item_name === '电测听') {
            this.$refs[`listenTest`][0].setstatus(Boolean(obj.is_abandon))
          }
        }
      })
    },
    // 单个弃检操作
    modalAffirmGiveUp() {
      this.giveUpModal = true
      this.beforeGiveUpModal = false // 关闭自身
    },
    modalAbolishGiveUp() {
      this.beforeGiveUpModal = false
      this.$nextTick(() => {
        this.$refs[this.thisIndex][0].setstatus(
          Boolean(this.giveUpItem.is_abandon),
        )
      })
    },
    giveUpStatus(val) {
      this.oldstatus = !val
    },
    // 点击弃检CheckBox
    giveUpChange(item, index, type) {
      this.thisIndex = type || `item-saw-${index}`
      let origin = null
      for (let obj of this.groupItemsCopy) {
        if (item.id === obj.id) {
          origin = obj
          break
        }
      }
      this.giveUpItem = item
      this.giveUpItemIsAbandon = item.is_abandon // 当前是否弃检
      // this.giveUpModal = true
      // 检查所见是否更改  iseque - true: 未改变, false: 改变
      if (isEqual(origin, item)) {
        this.giveUpModal = true
      } else {
        this.beforeGiveUpModal = true
        // if (item.is_abandon) {
        //   this.giveUpModal = true
        // } else {
        //   this.beforeGiveUpModal = true
        // }
      }
    },
    // 确认弃检
    giveUpConfirm(reason) {
      this.giveUpModal = false
      this.$set(this.giveUpItem, 'is_abandon', 1)
      this.$refs[this.thisIndex][0].setstatus(
        Boolean(this.giveUpItem.is_abandon),
      )
      this.$set(this.giveUpItem, 'give_up_reason', reason)

      // this.$set(this.giveUpItem, 'giveUpReason', reason)
    },
    // 取消
    giveUpModalCancel() {
      this.giveUpModal = false
      this.$refs[this.thisIndex][0].setstatus(
        Boolean(this.giveUpItem.is_abandon),
      )
    },
    // 确定 (确认修改)
    modifyConfirm(reason) {
      this.giveUpModal = false
      this.$set(this.giveUpItem, 'is_abandon', 1)
      this.$refs[this.thisIndex][0].setstatus(
        Boolean(this.giveUpItem.is_abandon),
      )
      this.$set(this.giveUpItem, 'give_up_reason', reason)
    },
    // 取消弃检
    giveUpCancel() {
      this.giveUpModal = false
      this.$delete(this.giveUpItem, 'give_up_reason')
      this.$set(this.giveUpItem, 'is_abandon', 0)
      this.$refs[this.thisIndex][0].setstatus(
        Boolean(this.giveUpItem.is_abandon),
      )
    },

    // 获取当前的组合项目信息
    groupItemExamSaw(item) {
      this.currentSingleItemExamSaw = item
    },

    // 参考结果可拖动框
    resultSawModalRowClick(row, index) {
      console.log(row.examine_saw)
      this.$set(this.currentSingleItemExamSaw, 'examine_saw', row.examine_saw)
    },
    // 参考结果搜索
    referenceResultSearch() {
      if (this.referenceResultSearchValue !== '') {
        this.examResultData = this.examResultDataCopy.filter(item => {
          return (
            ~item.examine_saw.indexOf(this.referenceResultSearchValue) ||
            ~item.exam_result.indexOf(this.referenceResultSearchValue)
          )
        })
      } else {
        this.examResultData = this.examResultDataCopy
      }
    },

    // 关联单项
    singleRelation(data) {
      this.singleRelationGroupItem = data
      this.$refs.singleRelation.open()
    },

    // 关联单项的输出
    relationToSingleItem(data) {
      this.$refs.singleRelation.closed()
      console.log(data, '拿到勾选的单项')
    },
    // 自觉症状
    selfFeelingDelete(item, index, items) {
      this.selfFeelingIndex = index
      this.selfFeelingData = items
      this.delSelfFeelingModal = true
    },
    // 自觉症状删除弹框
    abolishSelfFeeling() {
      this.delSelfFeelingModal = false
      this.selfFeelingData = []
      this.selfFeelingIndex = -1
    },
    affirmSelfFeeling() {
      this.selfFeelingData.splice(this.selfFeelingIndex, 1)
      this.delSelfFeelingModal = false
    },

    // 页面滚动
    inputResultWrapperScroll(event) {
      let applicationTitle = document.querySelector('.application-title')
      if (event.target.scrollTop > 280) {
        applicationTitle.style.top = `${event.target.scrollTop - 280}px`
      } else {
        applicationTitle.style.top = 0
      }
    },
  },
}
</script>
<style  lang="less" >
@import (reference) '~assets/less/variable.less';
.fixd {
  // height:50px;
  // width: calc(~'100% - 50px') !important;
  background: #fff;
  position: fixed !important;
  top: 110px;
  left: 65px;
  z-index: 20;
}
.input-result-wrapper {
  padding: 10px;
  width: 100%;
  // height: calc(~'100% - 10px');
  min-width: 1285px;
  .input-result-container {
    // min-width: 1300px; // 取消真个页面横向滚动条
    position: relative;
    border: 1px solid @gradeAshFive;
    border-radius: 8px;
    box-shadow: -2px -2px 2px #f2f7ff;
    overflow: hidden;
  }
  // 文字图标
  .text-button {
    margin: 0 15px;
    color: @gradeBlueTwo;
    display: inline-block;
    position: relative;
    &:hover {
      cursor: pointer;
    }
    &.danger {
      color: @winCloseHoverBg;
    }
    &.seperate-bar {
      cursor: default;
    }
    &.seperate-small {
      margin: 0 5px;
    }
  }
  // 展开收起箭头
  .arrow-up-down {
    margin-top: 6px;
    margin-left: 5px;
  }
  .group-items-wrapper {
    padding-bottom: 50px;
    .application-title {
      position: absolute;
      width: 100%;
      background: #fff;
      top: 0;
      z-index: 100;
    }
    // height: 650px;
    .group-items-container {
      padding: 10px;
      // height: 570px;
      overflow-y: auto;
      position: relative;
      top: 50px;
      &.except {
        height: auto;
      }
      .ivu-table-cell {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .group-items-result-content {
        // max-height: 630px;
        overflow-y: auto;
      }
    }
  }

  .result-search {
    margin: 10px;
  }

  .right-above {
    height: 220px;
    margin-top: 15px;
    min-width: 1255px;
    .right-above-left {
      width: calc(~'100% - 320px');
      // min-width: 937px;
      display: inline-block;
      .schema {
        img {
          width: 100%;
        }
      }
    }
    .right-above-right {
      float: right;
      // display: inline-block;
      .waitingProject {
        // float: right;
        // flex-grow: 1;
        border-radius: 8px;
        align-items: flex-start;
        height: 205px;
        width: 310px;
        position: relative;
        // border: 1px solid #d9d9d9;
        overflow: auto;
        box-shadow: 0 0 3px 2px #f0f0f0;
        .tableBox {
          position: absolute;
          width: 100%;
          top: 50px;
          bottom: 0;
          overflow-x: hidden;
          overflow-y: auto;
          table {
            text-align: center;
            line-height: 50px;
            width: 100%;
            border-collapse: collapse;
            td:first-child {
              border-right: 1px solid #dbdcdd;
            }
            tr.oddLine {
              background-color: #f2f7ff;
            }
          }
        }
      }
    }
  }

  // 去掉下固定列的下边框
  .ivu-table-fixed-body:before {
    height: none;
  }
}

// 底部的检查医生,保存
.input-result-footer {
  // min-width: 1335px;
  position: relative;
  padding-left: 20px;
  display: flex;
  align-items: flex-end;
  height: 50px;
  &::after {
    content: '';
    display: block;
    clear: both;
  }
  .footer-item {
    display: inline-block;
  }
  .doctor-sign {
    width: 150px;
    height: 50px;
    background-size: 100% 100%;
    vertical-align: middle;
  }
  .footer-right {
    vertical-align: middle;
    height: 50px;
    position: absolute;
    // top: 10px;
    right: 0px;
    display: flex;
    align-items: center;
    .ivu-btn {
      display: inline-block;
      margin: 0 10px;
    }
  }
}

.footer {
  .diaglose-submit {
    // height: 252px;
    border: 1px solid #ccc;
    overflow: hidden;
    margin-bottom: 2px;

    .diaglose-submit-title {
      .icon-show {
        width: 20px;
        height: 20px;
        background: #008cee;
        display: inline-block;
        text-align: center;
        border-radius: 4px;
        margin-top: -2px;
        vertical-align: middle;
        position: relative;
        cursor: pointer;
        .arr-icon {
          position: absolute;
          top: 4px;
          right: 6px;
        }
      }
    }

    .fold-enter-active,
    .fold-leave-active {
      transition: all linear 0.2s;
    }
    .fold-enter,
    .fold-leave {
      transform: translate3d(0, 0, 0);
    }
    .fold-enter,
    .fold-leave-active {
      transform: translate3d(0, 100%, 0);
    }

    .ivu-table-cell {
      padding: 0;
    }
    .advice-input {
      border: none;
      text-align: center;
      width: 100%;
      padding: 0 5px;
      height: 40px;
      background-color: transparent;
    }
  }
}
</style>
