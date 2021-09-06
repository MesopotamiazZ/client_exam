<template>
  <div class="mainExamWorkBenchContainer" style="position: relative;">
    <div class="topBar">
      <table class="basicStatistics">
        <tr>
          <td>
            <basicStatistics
              :department="true"
              :waiting="true"
              :processing="true"
              :forConfirm="true"
              :afterConfirm="true"
              :afterCheckup="true"
              @expand-change="statistics_expand"
            ></basicStatistics>
          </td>
        </tr>
      </table>
      <div class="btns">
        <Button class="ibtn normal" @click="inEdition && !(void saveChange()) || intoEdition()">{{inEdition ? '解锁' : '编辑'}}</Button>
        <Button type="primary" @click="complete">完成主检</Button>
        <Button class="ibtn normal" @click="sendBack">退回修改</Button>
        <Button class="ibtn normal" @click="test">预览报告</Button>
      </div>
    </div>
    <div class="mainBody" @scroll="mainBodyScroll" ref="mainBody">
      <div class="mainBodyLeft">
        <div class="basicInfo">
          <basicInformation :pe_sn="pe_sn" @data-change="changeCustomer" @healthDoc="healthDoc"></basicInformation>
        </div>
        <div class="cutLab" ref="cutLab" :class="{top: cutadtop}">
          <label v-for="(lab, index) in resultData" :class="{selected: index === selectedResultIndex}" @click="selectedResultIndex = index">{{lab.name}}</label>
        </div>
        <div class="resultArea">
          <div class="departmentImpression resultItem">
            <titletHasSlot>
              <span slot="titletHasSlotLeftTitle"><span>科室印象</span><span style="color: #038DEE; font-size: 14px" v-if="impressionData.latestUpdateProjectInfo">({{impressionData.latestUpdateProjectInfo}})</span></span>
            </titletHasSlot>
            <div class="tableBox">
              <itable
                :sizeMode="1"
                :columns="impressionData.cols"
                :data="impressionData.data"
                :rowSelectable="false"
              ></itable>
            </div>
          </div>
          <div class="clinicDiagnose resultItem">
            <titletHasSlot>
              <span slot="titletHasSlotLeftTitle"><span>临床诊断</span></span>
              <span slot="titletHasSlotRightContent">
                <Button class="ibtn normal" @click="showModal('reportFromDept')">参考分科上报</Button>
                <Button class="ibtn normal" v-show="inEdition" @click="showModal('editDiagnoses')">新增</Button>
              </span>
            </titletHasSlot>
            <div class="tableBox">
              <itable
                v-for="(tableData, index) in diagnoseData.tables"
                v-if="tableData.data.length"
                :key="index"
                :sizeMode="1"
                :columns="tableData.cols"
                :data="tableData.data"
                :rowSelectable="false"
                @on-row-del="diagnose_row_del(index, $event)"
                @on-row-edit="diagnose_row_edit(index, $event)"
              ></itable>
            </div>
          </div>
          <div class="prescribe resultItem">
            <titletHasSlot style="overflow: visible; border-bottom: 1px solid #DDDDDD">
              <span slot="titletHasSlotLeftTitle"><span>医嘱</span></span>
              <span slot="titletHasSlotRightContent">
                <span v-if="prescribeData.reviewGroups.length" class="datePicker"><label class="titleLabel">复查日期</label><DatePicker type="date" style="width: 136px" :disabled="!inEdition"></DatePicker></span>
                <Button class="ibtn normal" v-show="inEdition" @click="showModal('editReview')">复查预约</Button>
                <!--<Button class="ibtn normal" @click="showModal('custom', '功能正在开发中')">处方</Button>-->
                <Button class="ibtn normal" v-show="inEdition" @click="clearPrescribe">清空医嘱</Button>
              </span>
            </titletHasSlot>
            <div class="contentBox">
              <div class="review" v-if="prescribeData.reviewGroups.length" >
                <label class="reviewItem" v-for="(item, index) in prescribeData.reviewGroups">
                  <span class="text">{{item.name}}</span>
                  <span class="closeBtn" @click="prescribeData.reviewGroups.splice(index, 1)"></span>
                </label>
              </div>
              <div class="doctorAdvice" :style="{width: prescribeData.reviewGroups.length ? '50%' : '100%'}">
                <textarea class="editor" :disabled="!inEdition" v-show="prescribeData.inEdition" v-model="prescribeData.adviceContent" ref="doctorAdviceTextarea" :style="{ 'padding-left': prescribeData.reviewGroups.length ? '12' : '17px'}" @blur="completeDoctorAdviceEdition" placeholder="请输入医嘱..."></textarea>
                <div class="display" v-show="!prescribeData.inEdition" v-html="prescribeData.adviceHtml || '请输入医嘱...'" :style="{ 'padding-left': prescribeData.reviewGroups.length ? '12' : '17px'}" @click="intoDoctorAdviceEdition"></div>
              </div>
            </div>
          </div>
          <div class="conclusion resultItem">
            <titletHasSlot style="border-bottom: 1px solid #DDDDDD">
              <span slot="titletHasSlotLeftTitle"><span>体检结论</span></span>
              <span slot="titletHasSlotRightContent">
                <Button class="ibtn normal" v-show="inEdition" @click="showModal('addResult')">新增医学主检结论</Button>
                <Button class="ibtn normal" v-show="inEdition">自动生成</Button>
                <Button class="ibtn normal" v-show="inEdition" @click="clearConclusion">清空结论</Button>
              </span>
            </titletHasSlot>
            <div class="contentBox health" v-if="examType === 1">
              <textarea placeholder="请输入体检结论..." :disabled="!inEdition" v-model="conclusionData.contentText"></textarea>
            </div>
            <table class="contentBox other" v-else ><tr>
              <td class="leftTitle">{{conclusionData.leftTitle}}</td>
              <td class="items">
                <Select v-model="conclusionData.selectedItems" :disabled="!inEdition" multiple style="width:281px" placeholder="">
                  <Option v-for="item in conclusionData.items" :value="item.value" :key="item.value">{{ item.name }}</Option>
                </Select>
              </td>
              <td class="text" @click="intoConclusionEdition">
                <textarea class="editor" :disable="!inEdition" v-model="conclusionData.contentText" v-show="conclusionData.inEdition && inEdition" ref="conclusionEditor" @click.stop="" @blur="conclusionData.inEdition = false"></textarea>
                <div class="display" v-html="conclusionData.contentText" v-show="!conclusionData.inEdition || !inEdition"></div>
              </td>
            </tr></table>
          </div>
          <div class="advice resultItem">
            <titletHasSlot style="border-bottom: 1px solid #DDDDDD">
              <span slot="titletHasSlotLeftTitle"><span>建议</span></span>
              <span slot="titletHasSlotRightContent">
                <Button class="ibtn normal" v-show="inEdition">自动生成</Button>
                <Button class="ibtn normal" v-show="inEdition" @click="clearAdvice">清空建议</Button>
              </span>
            </titletHasSlot>
            <div class="contentBox">
              <textarea v-model="adviceData.contentText" :disabled="!inEdition" placeholder="请输入建议..."></textarea>
            </div>
          </div>
          <div class="signature">
            <span class="sig"><label>主检医生：</label><img src="" /></span><span class="date"><label>检查日期：</label><span></span></span>
          </div>
        </div>
      </div>
      <!--<div class="mainBodyRight" v-if="appendixInfo.history.data && appendixInfo.history.data.length || appendixInfo.inquiry.data && appendixInfo.inquiry.data.length || appendixInfo.selfFeelings.data && appendixInfo.selfFeelings.data.length">-->
      <div class="mainBodyRight">
        <!--<div class="item history" v-if="appendixInfo.history.data && appendixInfo.history.data.length">-->
        <div class="item history" v-if="appendixInfo.history.data && appendixInfo.history.data.length">
          <titletHasSlot slot="header" class="header">
            <span slot="titletHasSlotLeftTitle"><span>既往史</span></span>
          </titletHasSlot>
          <div class="tableBox">
            <itable
              class="table"
              :columns="appendixInfo.history.cols"
              :data="appendixInfo.history.data"
              :rowSelectable="false"
            ></itable>
          </div>
        </div>
        <div class="item inquiry" v-if="appendixInfo.inquiry.data && appendixInfo.inquiry.data.length">
          <titletHasSlot slot="header" class="header">
            <span slot="titletHasSlotLeftTitle"><span>问诊症状</span></span>
          </titletHasSlot>
          <div class="tableBox">
            <itable
              class="table"
              :columns="appendixInfo.inquiry.cols"
              :data="appendixInfo.inquiry.data"
              :rowSelectable="false"
            ></itable>
          </div>
        </div>
        <div class="item selfFeelings" v-if="appendixInfo.selfFeelings.data && appendixInfo.selfFeelings.data.length">
          <titletHasSlot slot="header" class="header">
            <span slot="titletHasSlotLeftTitle"><span>自觉症状</span></span>
          </titletHasSlot>
          <div class="tableBox">
            <itable
              class="table"
              :columns="appendixInfo.selfFeelings.cols"
              :data="appendixInfo.selfFeelings.data"
              :rowSelectable="false"
            ></itable>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-model="modalData.show"
      :closable="false"
      :width="modalData.width"
      :transfer="false"
    >
      <div class="modalContentItem editReview" v-if="modalData.content === 'editReview'">
        <titletHasSlot slot="header" class="header">
          <span slot="titletHasSlotLeftTitle"><span>复查项目</span></span>
        </titletHasSlot>
        <div class="content">
          <custom-transfer
            v-model="modalData.contentData.editReview.value"
            :moveAll="true"
            :columns="modalData.contentData.editReview.col"
            :sourceData="modalData.contentData.editReview.data"
            listWidth="254px"
            listHeight="372px"
          ></custom-transfer>
        </div>
      </div>
      <div class="modalContentItem addResult" v-if="modalData.content === 'addResult'">
        <titletHasSlot slot="header" class="header">
          <span slot="titletHasSlotLeftTitle"><span>新增医学体检结论</span></span>
        </titletHasSlot>
        <div class="content">
          <itable
            ref="addResultTable"
            :sizeMode="1"
            :columns="modalData.contentData.addResult.tableData.cols"
            :data="modalData.contentData.addResult.tableData.data"
            :maxHeight="320"
          ></itable>
        </div>
      </div>
      <div class="modalContentItem editDiagnoses" v-if="modalData.content === 'editDiagnoses'">
        <titletHasSlot slot="header" class="header">
          <span slot="titletHasSlotLeftTitle"><span>新增临床诊断</span></span>
        </titletHasSlot>
        <div class="content">
          <div class="step1 step" v-show="modalData.contentData.editDiagnoses.step === 1">
            <div class="item">
              <label>诊断类别</label>
              <Select v-model="modalData.contentData.editDiagnoses.step1.category" class="select">
                <!--<Option :value="1">疾病（或异常）</Option>-->
                <!--<Option :value="2">职业病</Option>-->
                <!--<Option :value="3">职业禁忌证</Option>-->
                <Option v-for="(item, key, index) in constant.diagnoseCategory" :value="key" :key="key">{{item}}</Option>
              </Select>
            </div>
            <div class="item">
              <label>疾病类型</label>
              <Select v-model="modalData.contentData.editDiagnoses.step1.diseaseCat" @on-change="modalDataDisease_change" class="select">
                <Option :value="'__all__'">全部</Option>
                <Option v-for="item in diseaseTypes" :value="item.id" :key="item.id">{{item.name}}</Option>
              </Select>
            </div>
            <div class="item fitlerableTable">
              <div class="header">
                <Input class="input" v-model="modalData.contentData.editDiagnoses.step1.filterText" @on-change="modalData_editDiagnose_filterText_change" :placeholder="modalData.contentData.editDiagnoses.step1.holderText"/>
                <i class="icon"></i>
              </div>
              <div class="tableBox">
                <itable
                  ref="modal_editDiagnoses_table"
                  :columns="modalData.contentData.editDiagnoses.step1.tableData.cols"
                  :data="modalData.contentData.editDiagnoses.step1.tableData.data"
                  @on-select="modalData_editDiagnose_disease_select"
                ></itable>
              </div>
            </div>
          </div>
          <div class="step2 step" v-show="modalData.contentData.editDiagnoses.step === 2">
            <div class="diseaseInfo">{{modalData.contentData.editDiagnoses.step1.disease.name}}</div>
            <div class="cutBox">
              <ul class="labs">
                <li @click="modalData.contentData.editDiagnoses.step2.labIndex = 0" :class="{selected: modalData.contentData.editDiagnoses.step2.labIndex === 0}">来源组项</li>
                <li @click="modalData.contentData.editDiagnoses.step2.labIndex = 1" :class="{selected: modalData.contentData.editDiagnoses.step2.labIndex === 1}">来源疾病</li>
              </ul>
              <div class="transfers">
                <div class="group" :class="{current: modalData.contentData.editDiagnoses.step2.labIndex === 0}">
                  <custom-transfer
                    v-model="modalData.contentData.editDiagnoses.step2.groupTransferData.value"
                    width="200"
                    height="329"
                    :moveAll="true"
                    :columns="modalData.contentData.editDiagnoses.step2.groupTransferData.cols"
                    :sourceData="modalData.contentData.editDiagnoses.step2.groupTransferData.data"
                  ></custom-transfer>
                </div>
                <div class="disease" :class="{current: modalData.contentData.editDiagnoses.step2.labIndex === 1}">
                  <custom-transfer
                    v-model="modalData.contentData.editDiagnoses.step2.diseaseTransferData.value"
                    width="200"
                    height="329"
                    :moveAll="true"
                    :columns="modalData.contentData.editDiagnoses.step2.diseaseTransferData.cols"
                    :sourceData="modalData.contentData.editDiagnoses.step2.diseaseTransferData.data"
                  ></custom-transfer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modalContentItem reportFromDept" v-if="modalData.content === 'reportFromDept'">
        <titletHasSlot slot="header" class="header">
          <span slot="titletHasSlotLeftTitle"><span>分科上报</span></span>
        </titletHasSlot>
        <div class="content">
          <itable
            :columns="modalData.contentData.reportFromDept.cols"
            :data="modalData.contentData.reportFromDept.data"
            :rowSelectable="false"
            :maxHeight="320"
          ></itable>
        </div>
      </div>
      <!--<div class="modalContentItem groupDetail" v-if="modalData.content === 'groupDetail'">groupDetail</div>-->
      <div class="modalContentItem custom" v-if="modalData.content === 'custom'" style="display: flex; align-items: center; justify-content: center">{{modalData.contentText}}</div>
      <div slot="footer" class="modelFooter">
        <template v-if="modalData.content === 'editReview'">
          <Button class="ibtn primary" type="primary" @click="editReview_save">保存</Button>
        </template>
        <template v-if="modalData.content === 'addResult'">
          <Button class="ibtn primary" type="primary" @click="addResult_save">选择</Button>
        </template>
        <template v-if="modalData.content === 'editDiagnoses' && modalData.contentData.editDiagnoses.step === 1">
          <Button class="ibtn primary" type="primary" @click="modalData.contentData.editDiagnoses.step = 2" :disabled="!modalData.contentData.editDiagnoses.step1.disease.id">下一步</Button>
        </template>
        <template v-if="modalData.content === 'editDiagnoses' && modalData.contentData.editDiagnoses.step === 2">
          <Button class="ibtn primary" type="primary" @click="modalData.contentData.editDiagnoses.step = 1">上一步</Button>
          <Button class="ibtn primary" type="primary" @click="addDiagnose_save()">确认</Button>
        </template>
        <template v-if="modalData.content === 'reportFromDept'">
          <Button class="ibtn primary" v-if="inEdition" type="primary" @click="">参考</Button>
        </template>
        <Button class="ibtn normal" @click="modalData.show = false">取消</Button>
      </div>
    </Modal>
    <Modal
      ref="groupDetailModal"
      class="groupDetailModal"
      :closable="false"
      width="1008"
      v-model="impressionData.detailModal.show"
      :transfer="false"
    >
      <div class="groupDetailModalContent">
        <titletHasSlot slot="header" class="header" style="background-color: #F2F5FA">
          <span slot="titletHasSlotLeftTitle"><span>{{impressionData.detailModal.groupName}}（所属科室：{{impressionData.detailModal.deptName}}）</span></span>
          <span slot="titletHasSlotRightContent"><span class="closeBtn" @click="impressionData.detailModal.show = false">1121223</span></span>
        </titletHasSlot>
        <div class="tableBox" style="padding: 20px;">
          <itable
            ref="groupDetailTable"
            :columns="impressionData.detailModal.cols"
            :data="impressionData.detailModal.data"
            :maxHeight="320"
            :rowSelectable="false"
          ></itable>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
    <Modal
      class="confirmDialog"
      :closable="false"
      :width="dialogModal.width"
      :height="dialogModal.height"
      v-model="dialogModal.show"
      :transfer="false"
    >
      <titletHasSlot slot="header" class="header" style="background-color: #F2F5FA">
        <span slot="titletHasSlotLeftTitle"><span>提示</span></span>
      </titletHasSlot>
      <div class="content">{{dialogModal.message}}</div>
      <div slot="footer" class="footer" :style="{height: dialogModal.confirmHandler || dialogModal.cancelButton || '0'}">
        <template v-if="dialogModal.confirmHandler">
          <Button class="ibtn danger" v-if="dialogModal.confirmButton === 2" @click="dialogModal.confirmHandler && dialogModal.confirmHandler(); dialogModal.show = false">删除</Button>
          <Button class="ibtn danger" v-else-if="dialogModal.confirmButton === 3" @click="dialogModal.confirmHandler && dialogModal.confirmHandler(); dialogModal.show = false">清空</Button>
          <Button class="ibtn primary" type="primary" v-else @click="dialogModal.confirmHandler && dialogModal.confirmHandler(); dialogModal.show = false">确认</Button>
        </template>
        <template v-if="dialogModal.cancelButton">
          <Button class="ibtn normal" @click="dialogModal.show = false; dialogModal.cancelHandler && dialogModal.cancelHandler()">取消</Button>
        </template>
      </div>
    </Modal>
    <div class="quantityInfo" v-show="quantityInfoData.show" :style="{left: quantityInfoData.mousex - 140 + 'px'}" ref="quantityInfo" >
      <quantityInfo @on-select="pe_sn = $event" :show="quantityInfoData.show" :maxLineNum="quantityInfoData.maxLineNum"></quantityInfo>
    </div>
    <imagePlayer
      ref="imagePlayer"
      scaleOrigin="left"
      :images="imagePlayerData.data"
    ></imagePlayer>
  </div>
</template>
<script>
import basicStatistics from '@/components/exam/basicStatistics'
import basicInformation from './components/basicInformation'
import quantityInfo from './components/quantityInfo'
import itable from '@/components/itable'
import titletHasSlot from '@/components/titleHasSlot'
import local from './local'
import imagePlayer from '@/components/imagePlayer'
import { mapState, mapMutations } from 'vuex'
import * as types from '@/store/types'
// import deepCopy from 'iview/src/utils/assist'
export default {
  name: 'mainExamWorkBench',
  components: {
    basicStatistics,
    basicInformation,
    itable,
    titletHasSlot,
    quantityInfo,
    imagePlayer,
  },
  props: {
  //
  },
  data() {
    return {
      testData: [],
      serverData: {
//        resultInfo: {},
//        basicInfo: {},
//        impression: {},
//        healthDco: {},
      },
      pe_sn: '',
      pe_id: '',
      inEdition: false,
      examType: 2,    // 1 健康  2 职业  3 放射
      showWaiting: false,
      cutadtop: false,
      quantityInfoData: {
        show: false,
        mouseX: 0,
        maxLineNum: 0,
      },
      modalData: {
        show: false,
        content: null,
        width: 0,
        contentText: '',
        contentData: {
          editReview: {
            value: [],
            col: [
              {
                title: '体检项目名称',
                key: 'name',
              },
              {
                title: '价格（元）',
                key: 'price',
              },
            ],
            data: [
              { id: '1', name: '血常规', price: 12 },
              { id: '2', name: '肝功', price: 123 },
              { id: '3', name: '血常规2', price: 124 },
              { id: '4', name: '肝功2', price: 124 },
            ],
          },
          addResult: {
            // value: '',
            tableData: {
              cols: [
                {
                  name: '结论名称',
                  key: 'conclusionName',
                  width: 160,
                },
                {
                  name: '结论内容',
                  key: 'conclusionContent',
                  minWidth: 426,
                },
              ],
              data: [
                { conclusionName: '离岗', conclusionContent: '111111111' },
                { conclusionName: '一级传染病', conclusionContent: '2222222' },
                { conclusionName: '离岗', conclusionContent: '111111111' },
                { conclusionName: '一级传染病', conclusionContent: '2222222' },
                { conclusionName: '离岗', conclusionContent: '111111111' },
                { conclusionName: '一级传染病', conclusionContent: '2222222' },
                { conclusionName: '离岗', conclusionContent: '111111111' },
                { conclusionName: '一级传染病', conclusionContent: '2222222' },
                { conclusionName: '离岗', conclusionContent: '111111111' },
                { conclusionName: '一级传染病', conclusionContent: '2222222' },
                { conclusionName: '离岗', conclusionContent: '111111111' },
                { conclusionName: '一级传染病', conclusionContent: '2222222' },
                { conclusionName: '离岗', conclusionContent: '111111111' },
                { conclusionName: '一级传染病', conclusionContent: '2222222' },
              ],
            },
          },
          editDiagnoses: {
            id: '',
            step: 1,
            step1: {
              category: '',
              disease: {},
              diseaseCat: null,
              filterText: null,
              holderText: '请输入疾病（或异常）',
              fromDiseases: [],
              fromGroups: [],
              diseaseData: [],
              tableData: {
                cols: [
                  {
                    name: '疾病（或异常）',
                    key: 'name',
                    width: 488,
                  },
                ],
                data: [],
              },
            },
            step2: {
              labIndex: 0,
              groupTransferData: {
                value: [],
                cols: [
                  {
                    title: '体检组合项目',
                    key: 'name',
                  },
                ],
                data: [],
              },
              diseaseTransferData: {
                value: [],
                cols: [
                  {
                    title: '既往史',
                    key: 'name',
                  },
                ],
                data: [],
              },
            },
          },
          reportFromDept: {
            cols: [
              {
                name: '',
                checking: 1,
                width: 50,
                type: 'empty',
              },
              {
                name: '临床诊断',
                key: 'diagnose',
                width: 194,
              },
              {
                name: '建议',
                key: 'advice',
                width: 377,
              },
              {
                name: '来源组合项目',
                key: 'from',
                width: 210,
              },
              {
                name: '科室',
                key: 'deptName',
                width: 136,
              },
            ],
            data: [
              {
                diagnose: '111',
                advice: '222',
                from: '333',
                deptName: '444',
              },
              {
                diagnose: '111',
                advice: '222',
                from: '333',
                deptName: '444',
              },
            ],
          },
        },
      },
      displayResultData: null,
      resultData: [
        {
          name: '初检',
        },
        {
          name: '第一次复检',
        },
      ],
      selectedResultIndex: 0,
      impressionData: {
        detailModal: {
          show: false,
          deptName: '',
          groupName: '',
          cols: [
            {
              name: '单项名称',
              key: 'projectName',
              width: 190,
              rowResize: true,
              render: (h, param, ctx) => {
                return h('span', {
                  style: param.row.abnormal && {
                    color: '#FF6262',
                  } || undefined,
                }, param.value)
              },
            },
            {
              name: '影像',
              key: 'photos',
              width: 55,
              render: (h, param, ctx) => {
                if (param.value && param.value.length) {
                  return h('img', {
                    attrs: {
                      src: '/static/icons/public/image.svg',
                    },
                    style: {
                      cursor: 'pointer',
                    },
                    on: {
                      click: () => {
                        this.imagePlayerData.data = param.value.map((pic) => {
                          return {
                            src: pic,
                          }
                        })
                        this.$refs.imagePlayer.opened = true
                      },
                    },
                  })
                }
              },
            },
            {
              name: '检查所见',
              key: 'appearance',
              width: 211,
              rowResize: true,
              render: (h, param, ctx) => {
                return h('span', {
                  style: param.row.abnormal && {
                    color: '#FF6262',
                  } || undefined,
                }, param.value)
              },
            },
            {
              name: '检查结果',
              key: 'result',
              rowResize: true,
              grow: true,
              render: (h, param, ctx) => {
                return h('span', {
                  style: param.row.abnormal && {
                    color: '#FF6262',
                  } || undefined,
                }, param.value)
              },
            },
            {
              name: '单位',
              key: 'unit',
              width: 128,
              render: (h, param, ctx) => {
                return h('span', {
                  style: param.row.abnormal && {
                    color: '#FF6262',
                  } || undefined,
                }, param.value)
              },
            },
            {
              name: '参考范围',
              key: 'referenceRange',
              width: 108,
              render: (h, param, ctx) => {
                return h('span', {
                  style: param.row.abnormal && {
                    color: '#FF6262',
                  } || undefined,
                }, param.value)
              },
            },
//            {
//              name: '阳性',
//              key: 'abnormal',
//              width: 60,
//              render: (h, param, ctx) => {
//                if (param.value) {
//                  return h('div', {
//                    style: {
//                      margin: 'auto',
//                      width: '12px',
//                      height: '12px',
//                      'border-radius': '50%',
//                      'background-color': '#FF6262',
//                    },
//                  })
//                }
//              },
//            },
          ],
          data: [],
        },
        latestUpdateProjectInfo: '',
        cols: [
          {
            name: '科室名称',
            key: 'deptName',
            width: 149,
            merge: true,
          },
          {
            name: '组合项目名称',
            key: 'groupName',
            width: 270,
            render: (h, param, ctx) => {
              return h('div', [
                h('span', {
                  style: {
                    'white-space': 'nowrap',
                    overflow: 'hidden',
                    'text-overflow': 'ellipsis',
                    display: 'inline-block',
                    'vertical-align': 'middle',
                    'max-width': 'calc(100% - 25px)',
                  },
                }, param.value),
                param.row.photos && param.row.photos.length && h('span', {
                  style: {
                    width: '17px',
                    height: '11px',
                    background: 'url(/static/icons/public/show.png) no-repeat center',
                    display: 'inline-block',
                    'vertical-align': 'middle',
                    cursor: 'pointer',
                    'margin-left': '2px',
                  },
                  on: {
                    click() {
//                      ctx.parent.expandLine(param.index, param.row._spread && param.row)
                      ctx.parent.$parent.showGroupDetail(param.row)
                      window.setTimeout(() => {
                        let posters = ctx.parent.$parent.$refs.groupDetailTable.posters
                        Object.keys(posters).forEach((key) => {
                          posters[key]++
                        })
                      })
                    },
                  },
                }) || '',
              ])
            },
          },
          {
            name: '影像',
            key: 'photos',
            width: 45,
            render: (h, param, ctx) => {
              if (param.value && param.value.length) {
                return h('img', {
                  attrs: {
                    src: '/static/icons/public/image.svg',
                  },
                  style: {
                    cursor: 'pointer',
                  },
                  on: {
                    click: () => {
                      this.imagePlayerData.data = param.value.map((pic) => {
                        return {
                          src: pic,
                        }
                      })
                      this.$refs.imagePlayer.opened = true
                    },
                  },
                })
              }
            },
          },
          {
            name: '组合项目小结',
            key: 'groupResult',
            width: 300,
            grow: true,
          },
          {
            name: '分科医生',
            key: 'doctor',
            width: 100,
          },
          {
            name: '弃检',
            key: 'downMark',
            width: 50,
            render: (h, param, ctx) => {
              if (param.row.downMark) {
                return h('span', {
                  style: {
                    width: '16px',
                    height: '16px',
                    background: 'url(/static/icons/public/use.png) no-repeat center',
                    display: 'inline-block',
                  },
                })
              }
            },
          },
        ],
        data: [
          {
            deptName: 'deptName2',
            groupName: 'groupName1',
            photos: ['/static/alsdfkjl'],
            groupResult: 'groupResult1',
            doctor: 'doctor1',
            downMark: true,
          },
          {
            deptName: 'deptName1',
            groupName: 'groupName2',
            photos: ['/static/alsdfkjl'],
            groupResult: 'groupResult2',
            downMark: false,
            doctor: 'doctor2',
          },
          {
            deptName: 'deptName1',
            groupName: 'groupName2',
            photos: ['/static/alsdfkjl'],
            groupResult: 'groupResult2',
            downMark: false,
            doctor: 'doctor2',
          },
          {
            deptName: 'deptName3',
            groupName: 'groupName2',
            photos: ['/static/alsdfkjl'],
            groupResult: 'groupResult2',
            downMark: false,
            doctor: 'doctor2',
          },
        ],
      },
      diagnoseData: {
        tables: [
          {
            cols: [
              {
                name: '疾病（或异常）',
                key: 'disease',
                minWidth: 299,
                grow: true,
              },
              {
                name: '建议',
                key: 'advice',
                minWidth: 303,
                grow: true,
                render: (h, param, ctx) => {
                  return h('div', {
                    style: {
                      display: 'flex',
                      'align-items': 'center',
                      width: '100%',
                      height: '100%',
                    },
                  }, [h('textarea', {
                    style: {
                      width: '100%',
                      height: '100%',
                      overflow: 'auto',
                      background: 'transparent',
                      border: 'none',
                      resize: 'none',
                      'text-align': 'center',
                    },
                    attrs: {
                      contenteditable: true,
                    },
                    on: {
                      input: (e) => {
                        param.row[param.column.key] = e.target.value
                      },
                    },
                  }, param.value)])
                },
              },
              {
                name: '来源',
                key: 'source',
                minWidth: 242,
                grow: true,
                render: (h, param, ctx) => {
                  let items = []
//                  console.log(param.value)
                  if (param.value && param.value.length) {
                    param.value.forEach((item, index) => {
                      items.push(h('span', [
                        param.value.length > 1 && h('span', {
                          style: {
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            'border-radius': '50%',
                            border: '1px solid #727272',
                            'line-height': '12px',
                            'text-align': 'center',
                            'vertical-align': 'middle',
                          },
                        }, [h('div', {
                          style: {
                            transform: 'translateY(-1px) scale(0.75)',
                          },
                        }, String(index + 1))]),
                        h('span', {
                          style: {
                            'vertical-align': 'middle',
                          },
                        }, item.name + (param.value.length !== index + 1 && '；' || '')),
                      ]))
                    })
                  }
                  return h('span', items)
                },
              },
              {
                name: '操作',
                type: 'operation',
                operationBtns: null,
                width: 70,
              },
            ],
            data: [],
          },
          {
            cols: [
              {
                name: '职业病',
                key: 'disease',
                minWidth: 299,
                grow: true,
              },
              {
                name: '建议',
                key: 'advice',
                minWidth: 303,
                grow: true,
                render: (h, param, ctx) => {
                  return h('div', {
                    style: {
                      display: 'flex',
                      'align-items': 'center',
                      width: '100%',
                      height: '100%',
                    },
                  }, [h('textarea', {
                    style: {
                      width: '100%',
                      height: '100%',
                      overflow: 'auto',
                      background: 'transparent',
                      border: 'none',
                      resize: 'none',
                      'text-align': 'center',
                    },
                    attrs: {
                      contenteditable: true,
                    },
                    on: {
                      input: (e) => {
                        param.row[param.column.key] = e.target.value
                      },
                    },
                  }, param.value)])
                },
              },
              {
                name: '来源',
                key: 'source',
                minWidth: 242,
                grow: true,
                render: (h, param, ctx) => {
                  let items = []
                  if (param.value && param.value.length) {
                    param.value.forEach((item, index) => {
                      items.push(h('span', [
                        param.value.length > 1 && h('span', {
                          style: {
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            'border-radius': '50%',
                            border: '1px solid #727272',
                            'line-height': '12px',
                            'text-align': 'center',
                            'vertical-align': 'middle',
                          },
                        }, [h('div', {
                          style: {
                            transform: 'translateY(-1px) scale(0.75)',
                          },
                        }, String(index + 1))]),
                        h('span', {
                          style: {
                            'vertical-align': 'middle',
                          },
                        }, item.name + (param.value.length !== index + 1 && '；' || '')),
                      ]))
                    })
                  }
                  return h('span', items)
                },
              },
              {
                name: '操作',
                type: 'operation',
                operationBtns: null,
                width: 70,
              },
            ],
            data: [],
          },
          {
            cols: [
              {
                name: '职业禁忌证',
                key: 'disease',
                minWidth: 299,
                grow: true,
              },
              {
                name: '建议',
                key: 'advice',
                minWidth: 303,
                grow: true,
                render: (h, param, ctx) => {
                  return h('div', {
                    style: {
                      display: 'flex',
                      'align-items': 'center',
                      width: '100%',
                      height: '100%',
                    },
                  }, [h('textarea', {
                    style: {
                      width: '100%',
                      height: '100%',
                      overflow: 'auto',
                      background: 'transparent',
                      border: 'none',
                      resize: 'none',
                      'text-align': 'center',
                    },
                    attrs: {
                      contenteditable: true,
                    },
                    on: {
                      input: (e) => {
                        param.row[param.column.key] = e.target.value
                      },
                    },
                  }, param.value)])
                },
              },
              {
                name: '来源',
                key: 'source',
                minWidth: 242,
                grow: true,
                render: (h, param, ctx) => {
                  let items = []
                  if (param.value && param.value.length) {
                    param.value.forEach((item, index) => {
                      items.push(h('span', [
                        param.value.length > 1 && h('span', {
                          style: {
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            'border-radius': '50%',
                            border: '1px solid #727272',
                            'line-height': '12px',
                            'text-align': 'center',
                            'vertical-align': 'middle',
                          },
                        }, [h('div', {
                          style: {
                            transform: 'translateY(-1px) scale(0.75)',
                          },
                        }, String(index + 1))]),
                        h('span', {
                          style: {
                            'vertical-align': 'middle',
                          },
                        }, item.name + (param.value.length !== index + 1 && '；' || '')),
                      ]))
                    })
                  }
                  return h('span', items)
                },
              },
              {
                name: '操作',
                type: 'operation',
                operationBtns: null,
                width: 70,
              },
            ],
            data: [],
          },
        ],
      },
      prescribeData: {
        reviewGroups: [],
        reviewDate: new Date(),
        adviceContent: 'advicealdfkjladsf',
        adviceHtml: 'advicealdfkjladsf',
        inEdition: false,
      },
      conclusionData: {
        leftTitle: '个体体检结论',
        items: [
          {value: '111', name: '111'},
          {value: '222', name: '222'},
          {value: '333', name: '333'},
        ],
        selectedItems: [],
        inEdition: false,
        contentText: '',
        // contentHtml: '',
      },
      adviceData: {
        contentText: '',
      },
      appendixInfo: {
        history: {
          cols: [
            { name: '既往史', key: 'history', width: 100 },
            { name: '内容', key: 'content', width: 279, grow: true },
          ],
          data: [],
        },
        inquiry: {
          cols: [
            { name: '症状名称', key: 'symptomName', width: 154 },
            { name: '程度', key: 'degree', width: 47 },
            { name: '出现日期', key: 'date', width: 128, grow: true },
            {
              name: '备注',
              key: 'remark',
              width: 50,
              render: (h, param, ctx) => {
                return h('div', {
                  style: {
                    height: '16px',
                    background: 'url(/static/icons/public/remarkInCell.svg) no-repeat center',
                    'background-size': '16px',
                  },
                  attrs: {
                    title: param.value,
                  },
                })
              },
            },
          ],
          data: [
            {
              symptomName: '头晕',
              degree: '+++',
              date: '2017年2月',
              remark: '非常头晕',
            },
          ],
        },
        selfFeelings: {
          cols: [
            { name: '症状名称', key: 'symptomName', width: 154 },
            { name: '程度', key: 'degree', width: 47 },
            { name: '出现日期', key: 'date', width: 128, grow: true },
            {
              name: '备注',
              key: 'remark',
              width: 50,
              render: (h, param, ctx) => {
                return h('div', {
                  style: {
                    height: '16px',
                    background: 'url(/static/icons/public/remarkInCell.svg) no-repeat center',
                    'background-size': '16px',
                  },
                  attrs: {
                    title: param.value,
                  },
                })
              },
            },
          ],
          data: [
            {
              symptomName: 'asldkfjaflsd',
              degree: 'asldkfjaflsd',
              date: 'asldkfjaflsd',
              remark: 'asldkfjaflsd',
            },
          ],
        },
      },
      dialogModal: {
        show: false,
        width: null,
        height: null,
        confirmHandler: null,
        confirmButton: 1,
        cancelButton: 1,    // 0：不显示
        message: '',
      },
      imagePlayerData: {
        show: false,
        data: [],
      },
      cache: {
        groupDetailData: {
          groupId: [
            { projectName: '1', photos: [], appearance: '11', result: '111', unit: '1111', referenceRange: '11111', abnormal: true },
            { projectName: '2', photos: [1, 2], appearance: '22', result: '222', unit: '2222', referenceRange: '22222', abnormal: false },
            { projectName: '3', photos: [1], appearance: '33', result: '333', unit: '3333', referenceRange: '33333', abnormal: true },
            { projectName: '4', photos: [], appearance: '44', result: '444', unit: '4444', referenceRange: '44444', abnormal: false },
            { projectName: '5', photos: [], appearance: '55', result: '555', unit: '5555', referenceRange: '55555', abnormal: false },
            { projectName: '5', photos: [], appearance: '55', result: '555', unit: '5555', referenceRange: '55555', abnormal: false },
            { projectName: '5', photos: [], appearance: '55', result: '555', unit: '5555', referenceRange: '55555', abnormal: false },
            { projectName: '5', photos: [], appearance: '55', result: '555', unit: '5555', referenceRange: '55555', abnormal: false },
            { projectName: '5', photos: [], appearance: '55', result: '555', unit: '5555', referenceRange: '55555', abnormal: false },
            { projectName: '5', photos: [], appearance: '55', result: '555', unit: '5555', referenceRange: '55555', abnormal: false },
            { projectName: '5', photos: [], appearance: '55', result: '555', unit: '5555', referenceRange: '55555', abnormal: false },
            { projectName: '5', photos: [], appearance: '55', result: '555', unit: '5555', referenceRange: '55555', abnormal: false },
            { projectName: '5', photos: [], appearance: '55', result: '555', unit: '5555', referenceRange: '55555', abnormal: false },
          ],
        },
        groupData: [
          { id: '1', name: '血常规', price: 12 },
          { id: '2', name: '肝功', price: 123 },
          { id: '3', name: '血常规2', price: 124 },
          { id: '4', name: '肝功2', price: 124 },
        ],
        diseaseData: [],
//        diseaseCategoryData: [
//          { id: '1', name: '11' },
//          { id: '2', name: '22' },
//          { id: '3', name: '33' },
//        ],
      },
      constant: {
        diagnoseCategory: {
          1: '疾病（或异常）',
          2: '职业病',
          3: '职业禁忌证',
        },
      },
      diseaseTypes: [],
      diseases: {
        items: [],
      },
      activated: false,
    }
  },
  computed: {
    ...mapState(['userInfo']),
//    ...mapState('diseaseTypesModule', ['diseaseTypesList']),
//    ...mapState('diseaseOrExpManagementModule', [
//      'diseaseTypes',
//      'diseases',
//    ]),
    // diseaseData() {
    //   if (this.cache.diseaseData.length) return this.cache.diseaseData
    //   // get data
    //   let data = [
    //     { id: '1', name: '111', catId: '1' },
    //     { id: '2', name: '222', catId: '2' },
    //     { id: '3', name: '333', catId: '3' },
    //   ]
    //   this.cache.diseaseData = data
    //   return data
    // },
    diseaseCategoryData() {
      if (this.cache.diseaseCategoryData.length) return this.cache.diseaseCategoryData
      // get data
      let data = [
        { id: '1', name: '11' },
        { id: '2', name: '22' },
        { id: '3', name: '33' },
      ]
      this.cache.diseaseCategoryData = data
      return data
    },
  },
  created() {
    // get diseaseData
    this.cache.diseaseData = [
      { id: '1', name: '1-1-111', catId: '1' },
      { id: '2', name: '1-2-111', catId: '1' },
      { id: '3', name: '1-3-111', catId: '1' },
      { id: '4', name: '2-4-222', catId: '2' },
      { id: '5', name: '2-5-222', catId: '2' },
      { id: '6', name: '2-6-222', catId: '2' },
      { id: '7', name: '3-7-333', catId: '3' },
      { id: '8', name: '3-8-333', catId: '3' },
      { id: '9', name: '3-9-333', catId: '3' },
    ]

    // get disease data
//    if (!this.diseaseTypesList.items.length) {
//      this.getDiseaseTypesFunc()
//    }
    if (!this.diseaseTypes.length) {
      local.getDiseaseTypes().then((data) => {
        this.diseaseTypes = data.items
      })
    }
    if (!this.diseases.items.length) {
      local.getDiseases().then((data) => {
        this.diseases = data
      })
    }
  },
  watch: {
//    pe_sn(val) {
//
//    },
    pe_id(val) {
      local.deptsGet(val).then((data) => {
        data = data || {}
        this.impressionData.data.length = 0
        data.pe_group_item && data.pe_group_item && data.pe_group_item.length && data.pe_group_item.forEach((item) => {
          this.impressionData.data.push({
            deptName: this.getter(item, 'pedept.dept_name'),
            groupName: this.getter(item, 'group_item.name'),
            photos: (() => {
              let items = this.getter(item, 'pe_item')
              let result = []
              if (items && items.length) {
                items.forEach((item) => {
                  if (item.image_pic && item.image_pic.length) {
                    item.image_pic.forEach((pic) => {
                      result.push(pic)
                    })
                  }
                })
              }
              return result
            })(),
            groupResult: this.getter(item, 'desc'),
            doctor: this.getter(item, 'operater'),
            downMark: !this.getter(item, 'status'),
          })
        })
        this.serverData.impression = data
        // 更新相关体检组合项目数据
        data.pe_group_item && data.pe_group_item.length && (this.modalData.contentData.editDiagnoses.step2.groupTransferData.data = data.pe_group_item.map((item) => {
          if (item.group_item) {
            return {
              id: item.group_item.id,
              name: item.group_item.name,
            }
          } else {
            return []
          }
        }))
      })
//      this.diagnoseInfo(val).then((data) => {
//        this.diagnoseData.tables[0].data.length = 0
//        this.diagnoseData.tables[1].data.length = 0
//        this.diagnoseData.tables[2].data.length = 0
//        data && data.clinical_diagnosi && data.clinical_diagnosi.length && data.clinical_diagnosi.forEach((item) => {
//          let type = this.getter(item, 'diagnosi_type')
//          if (type) {
//            this.diagnoseData.tables[type - 1].data.push({
//              disease: this.getter(item, 'disease_name'),
//              advice: this.getter(item, 'advice'),
//              origin: this.getter(item, ''),
//            })
//          }
//        })
//        this.serverData.resultInfo = data
//      })

      1 && (new Promise((resolve) => {
        let out = {source: {}}
        local.diagnoseInfo(val).then((data) => {
          out.diagnose = data
          if (out.diagnose && out.source) resolve(out)
        })
//        this.sourceInfo(val).then((data) => {
//          out.source = data
//          if (out.diagnose && out.source) resolve(out)
//        })
      })).then((data) => {
        this.serverData.resultInfo = data.diagnose
        this.dataRefresher_diagnose()
      })

      // 更新健康档案数据
      // TODO
      local.basicInformationGet({id: 10 || this.getter(this.serverData, 'basicInfo.customer.ha_id'), key: 'medicalHist'}).then((data) => {
        data = data || {}
        if (data.medical_hist && data.medical_hist.length) {
          let d = []
          let histData = [[], [], [], [], []]
          data.medical_hist.forEach((item) => {
            if (item.type <= 2) {
              item.value && item.value.length && item.value.forEach((v) => {
                d.push({
                  ...(v || {}),
                  type: item.type,
                  id: v.name,
                })
              })
            }
          })
          data.medical_hist.forEach((item) => {
            try {
              item.value && item.value.forEach((v) => {
                histData[item.type - 1].push({
                  name: v.name,
                  date: v.date,
                })
              })
            } catch (e) { /* */ }
          })
          let histPageData = [
            { history: '疾病史' },
            { history: '职业病史' },
            { history: '手术史' },
            { history: '外伤史' },
            { history: '输血史' },
          ]
          console.log('12121', histData)
          histPageData.forEach((item, index) => {
            item.content = histData[index].map((item) => {
              if (item.date) {
                let date = new Date(item.date)
                return item.name + '：' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月'
              } else {
                return item.name
              }
            }).join('、')
          })
          console.log(histPageData, '===')
          this.appendixInfo.history.data = histPageData
          this.modalData.contentData.editDiagnoses.step2.diseaseTransferData.data = d
        }
//        this.appendixInfo.history.data = data
        this.serverData.healthDoc = data
      })
    },
  },
  methods: {
    ...mapMutations({
      openPage: types.OPEN_PAGE,
      setCurPage: types.SET_CURRENT_PAGE_NAME,
    }),
    getter: new window['Function']('obj', 'propName', 'defaultValue', `
      try{
        with(obj){
          return eval(propName)
        }
      }catch(e){
        return defaultValue || ''
      }
    `),
    /*
    ...mapActions('mainInspectionTableModule', [
//      'projectGet',
//      'projectPost',
//      'changAddPut',
      'projectGetBasic',
//      'projectHasChosen',
//      'projectHasChecked',
      'deptsGet',
//      'waitingAndComplete',
      'diagnoseInfo',
      'sourceInfo',
    ]),
//    ...mapActions('diseaseTypesModule', [
//      'getDiseaseTypesFunc',
//    ]),
    ...mapActions('diseaseOrExpManagementModule', [
      'getDiseaseTypes',
      'getDiseases',
      'getProjectCategoryList',
    ]),
    ...mapActions('healthRecordModule', [
      'basicInformationGet',
    ]),
    */
    // refresher
    dataRefresher_diagnose() {
      let data = this.serverData.resultInfo
      this.conclusionData.contentText = this.getter(data, 'main_examine[0].cnclsn')
      this.adviceData.contentText = this.getter(data, 'main_examine[0].advice')

      this.diagnoseData.tables[0].data.length = 0
      this.diagnoseData.tables[1].data.length = 0
      this.diagnoseData.tables[2].data.length = 0
      data && data.clinical_diagnosi && data.clinical_diagnosi.length && data.clinical_diagnosi.forEach((item) => {
//        console.log(item, '-=-=')
        let type = this.getter(item, 'diagnosi_type')
        if (type) {
          this.diagnoseData.tables[type - 1].data.push({
            id: this.getter(item, 'id'),
            diagnosi_type: this.getter(item, 'diagnosi_type'),
            disease_id: this.getter(item, 'disease_id'),
            disease: this.getter(item, 'disease_name'),
            advice: this.getter(item, 'advice'),
            source: this.getter(item, 'disease_source'),
          })
        }
      })
    },
    // ///////////////////
    statistics_expand(show, mouseX) {
      this.quantityInfoData.show = show
      this.quantityInfoData.mousex = mouseX
      if (show) {
        setTimeout(this.refreshQuantityInfoMaxLineNum)
      }
    },
    changeCustomer(data) {
      this.serverData.basicInfo = data
      this.pe_id = data.id
    },
    showGroupDetail(groupInfo) {
      // TODO
      let data = this.cache.groupDetailData[groupInfo.id || 'groupId']
      if (!data) {
        // get data
      }
      this.impressionData.detailModal.deptName = groupInfo.deptName
      this.impressionData.detailModal.groupName = groupInfo.groupName
      this.impressionData.detailModal.data = data.slice()
      this.impressionData.detailModal.show = true
    },
    updateDiseaseData(catid) {
      //
      return []
    },
    modalData_editDiagnose_disease_select(row) {
//      console.log(row, '-=-=')
      this.modalData.contentData.editDiagnoses.step1.disease = { id: row.id, name: row.name }
    },
    modalData_editDiagnose_filterText_change() {
      let ft = this.modalData.contentData.editDiagnoses.step1.filterText
      this.modalData.contentData.editDiagnoses.step1.tableData.data = this.modalData.contentData.editDiagnoses.step1.diseaseData.filter((d) => !ft || d.name && d.name.indexOf(ft) >= 0).map((d) => { return {name: d.name, id: d.id} })
    },
    modalDataDisease_change() {
      let selectedId = this.modalData.contentData.editDiagnoses.step1.diseaseCat
      let data
      // TODO
      if (selectedId && selectedId !== '__all__') {
        data = this.diseases.items.filter((item) => item.disease_type_id === selectedId)
      } else {
        data = this.diseases.items.slice()
      }
      this.modalData.contentData.editDiagnoses.step1.diseaseData = data
      let col = this.modalData.contentData.editDiagnoses.step1.tableData.cols[0]
      let catText = this.constant.diagnoseCategory[this.modalData.contentData.editDiagnoses.step1.category]
      this.modalData.contentData.editDiagnoses.step1.tableData.cols[0] = {
        width: col.width,
        name: catText,
        key: col.key,
      }
      this.modalData.contentData.editDiagnoses.step1.holderText = '请输入' + (catText || this.constant.diagnoseCategory[1])
      this.modalData_editDiagnose_filterText_change()
    },
    showModal(contentName, contentText) {
      switch (contentName) {
      case 'editReview':
        this.modalData.contentData.editReview.value = []
        this.modalData.width = 638
        break
      case 'addResult':
        this.modalData.width = 627
        break
      case 'editDiagnoses':
        this.modalData.contentData.editDiagnoses.id = ''
        this.modalData.contentData.editDiagnoses.step = 1
        this.modalData.contentData.editDiagnoses.step1.disease = {}
        this.modalData.contentData.editDiagnoses.step1.category = '1'
        this.modalData.contentData.editDiagnoses.step1.diseaseCat = '__all__'
        window.setTimeout(() => {
          this.modalDataDisease_change()
        })
        this.modalData.width = 530
        break
      case 'reportFromDept':
        this.modalData.width = 1008
        break
//      case 'groupDetail':
//        break
      case 'custom':
        this.modalData.contentText = contentText
        break
      default:
        return
      }
      this.modalData.content = contentName
      this.modalData.show = !!contentName
    },
    // modalSave(value) {
    //   switch (this.modalData.content) {
    //   case 'editReview':
    //     this.modalData.contentData.editReview.value.forEach((groupItem) => {
    //       if (!this.prescribeData.reviewGroups.some((g) => g.id === groupItem.id)) {
    //         this.prescribeData.reviewGroups.push(groupItem)
    //       }
    //     })
    //     break
    //   case 'addResult':
    //     break
    //   case 'editDiagnoses':
    //     break
    //   case 'reportFromDept':
    //     break
    //   case 'groupDetail':
    //     break
    //   default:
    //     return
    //   }
    //   this.modalData.show = false
    //   // console.log('modal savel -=-=', this.modalData.content)
    // },
    diagnoses_row_edit(tableIndex, rowIndex) {
      this.modalData.content = 'editDiagnoses'
    },
    editReview_save() {
      this.modalData.contentData.editReview.value.forEach((groupItem) => {
        if (!this.prescribeData.reviewGroups.some((g) => g.id === groupItem.id)) {
          this.prescribeData.reviewGroups.push(groupItem)
        }
      })
      this.modalData.show = false
    },
    addResult_save() {
      let val = this.conclusionData.contentText.trim()
      if (val) {
        let lastCharacter = val.substr(val.length - 1)
        if (!['，', '。', '；', '？', '、', '…', '：', ',', '.', ':', '?'].some((sign) => lastCharacter === sign)) {
          val += '；'
        }
      }
      val += (this.modalData.contentData.addResult.tableData.data[this.$refs.addResultTable.sIndex]['conclusionContent'] || '').trim()
      this.conclusionData.contentText = val
      this.modalData.show = false
    },
    addDiagnose_save() {
      let data = this.modalData.contentData.editDiagnoses
      let disease = this.diseases && this.diseases.items && this.diseases.items.length && this.diseases.items.filter((item) => item.id === data.step1.disease.id)[0] || data.disease
      let result = {
        'pe_id': this.pe_id,
        'diagnosi_type': data.step1.category,
        'disease_id': data.step1.disease.id,
        'disease_name': data.step1.disease.name,
        'disease_source': (() => {
          let result = []
          data.step2.groupTransferData.value.forEach((item) => {
            result.push({
              type: '1',  // 1：来源组合项目 2：来源既往史
              id: item.id,
              name: item.name,
            })
          })
          data.step2.diseaseTransferData.value.forEach((item) => {
            result.push({
              type: '2',
              id: item.id,
              name: item.name,
            })
          })
          return result
        })(),
        'advice': disease.advice,
        'operater': this.userInfo.id,
//        'status': 1,
      }
      // TODO 新增诊断数据
      let id = this.modalData.contentData.editDiagnoses.id
      if (id) {
        let colec = this.serverData.resultInfo && this.serverData.resultInfo.clinical_diagnosi && this.serverData.resultInfo.clinical_diagnosi
        colec.forEach((ditem, i) => {
          if (ditem.id === id) {
            colec[i] = result
          }
        })
      } else {
        this.serverData.resultInfo && this.serverData.resultInfo.clinical_diagnosi && this.serverData.resultInfo.clinical_diagnosi.push(result)
      }
      this.dataRefresher_diagnose()
      this.modalData.show = false
//      result
//      console.log(
//          '----===--',
//        this.modalData.contentData.editDiagnoses.step2.groupTransferData.value,
//        this.modalData.contentData.editDiagnoses.step2.diseaseTransferData.value,
//        this.modalData.contentData.editDiagnoses,
//        this.userInfo
//      )
    },
    diagnose_row_del(tableIndex, rowIndex) {
      this.confirmDialog({
        width: 298,
        confirmHandler: () => {
          this.diagnoseData.tables[tableIndex].data.splice(rowIndex, 1)
        },
        cancelButton: 1,
        confirmButton: 2,
        message: '确认删除该诊断吗？',
      })
    },
    diagnose_row_edit(tableIndex, rowIndex) {
//      console.log('-=-=', this.diagnoseData.tables[tableIndex].data[rowIndex], this.serverData)
      this.showModal('editDiagnoses')
      let cdata = this.diagnoseData.tables[tableIndex].data[rowIndex]
      this.modalData.contentData.editDiagnoses.id = cdata.id
      console.log(cdata)
      let diseaseInfo = this.diseases.items.filter((di) => di.id === cdata.disease_id)[0]
      let diseaseTypeInfo
      if (diseaseInfo) {
        diseaseTypeInfo = this.diseaseTypes.filter((dt) => dt.id === diseaseInfo.disease_type_id)[0]
        if (diseaseTypeInfo) {
          this.modalData.contentData.editDiagnoses.step1.diseaseCat = diseaseTypeInfo.id
          let dindex = null
          window.setTimeout(() => {
            this.modalData.contentData.editDiagnoses.step1.tableData.data.forEach((dr, index) => {
              if (dr.id === diseaseInfo.id) {
                dindex = index
              }
            })
            this.$refs.modal_editDiagnoses_table.selectRow(dindex, false, true)
          })
        }
      }
      // todo
      if (cdata.source && cdata.source.length) {
        let idSet = cdata.source.map((s) => s.id)
        this.modalData.contentData.editDiagnoses.step2.groupTransferData.value = this.modalData.contentData.editDiagnoses.step2.groupTransferData.data.filter((d) => idSet.indexOf(d.id) >= 0 && d.type === 1)
        this.modalData.contentData.editDiagnoses.step2.diseaseTransferData.value = this.modalData.contentData.editDiagnoses.step2.diseaseTransferData.data.filter((d) => idSet.indexOf(d.id) >= 0 && d.type === 2)
      } else {
        console.log('-=-= no source')
        this.modalData.contentData.editDiagnoses.step2.groupTransferData.value = []
        this.modalData.contentData.editDiagnoses.step2.diseaseTransferData.value = []
      }
    },
    //
    clearPrescribe() {
      this.confirmDialog({
        width: 298,
        confirmHandler: () => {
          this.prescribeData.reviewGroups.length = 0
          this.prescribeData.reviewDate = new Date()
          this.prescribeData.adviceContent = ''
          this.prescribeData.adviceHtml = ''
        },
        confirmButton: 3,
        cancelButton: 1,
        message: '确认清空医嘱吗？',
      })
    },
    clearConclusion() {
      this.confirmDialog({
        width: 298,
        confirmHandler: () => {
          this.conclusionData.selectedItems = []
          this.conclusionData.contentText = ''
        },
        confirmButton: 3,
        cancelButton: 1,
        message: '确认清空结论吗？',
      })
    },
    clearAdvice() {
      this.confirmDialog({
        width: 298,
        confirmHandler: () => {
          this.adviceData.contentText = ''
        },
        confirmButton: 3,
        cancelButton: 1,
        message: '确认清空建议吗？',
      })
    },
    intoDoctorAdviceEdition() {
      if (this.inEdition) {
        this.prescribeData.inEdition = true
        setTimeout(() => {
          this.$refs.doctorAdviceTextarea.focus()
        })
      }
    },
    completeDoctorAdviceEdition() {
      this.prescribeData.adviceHtml = this.prescribeData.adviceContent.replace(/(?:[\n][\t]?[\u4e00-\u9fa5\w]+[:：]{1})|(^[\u4e00-\u9fa5\w]+[:：]{1})/mg, (match, noBreak) => {
        return (noBreak ? '' : '<br/>') + '<b>' + match.trim().replace(':', '：') + '</b>'
      })
      this.prescribeData.inEdition = false
    },
    intoConclusionEdition() {
      if (!this.inEdition) return
      this.conclusionData.inEdition = true
      setTimeout(() => {
        this.$refs.conclusionEditor.focus()
      })
    },
    refreshQuantityInfoMaxLineNum() {
      let outer = this.$refs.quantityInfo && this.$refs.quantityInfo.offsetParent
      if (outer) {
        this.quantityInfoData.maxLineNum = Math.floor((outer.offsetHeight - 230) / 40)
      }
    },
    windowResize() {
      this.refreshQuantityInfoMaxLineNum()
//      let imagePlayer = this.$refs.imagePlayer
//      if (imagePlayer) {
//        console.log(imagePlayer.$el.offsetParent.offsetWidth, imagePlayer.$el.offsetParent.scrollWidth)
//      }
    },
    confirmDialog(option = {}) {
      this.dialogModal.width = option.width
      this.dialogModal.height = option.height
      this.dialogModal.confirmHandler = option.confirmHandler
      this.dialogModal.confirmButton = option.confirmButton
      this.dialogModal.cancelHandler = option.cancelHandler
      if (option.cancelButton) this.dialogModal.cancelButton = option.cancelButton
      else this.dialogModal.cancelButton = 0
      this.dialogModal.message = option.message
      this.dialogModal.show = true
    },
    complete() {
      this.confirmDialog({
        width: 345,
        confirmHandler: () => { /* */ },
        cancelButton: 1,
        message: '确认完成主检？',
      })
    },
    sendBack() {
      this.confirmDialog({
        width: 345,
        confirmHandler: () => { /**/ },
        cancelButton: 1,
        message: '确认退回给分科医生进行修改？',
      })
    },
    intoEdition() {
      if (this.serverData.basicInfo.lock_staff_id === this.userInfo.id) {
        this.confirmDialog({
          width: 378,
          message: '当前正在主检，请稍后再进行编辑！',
        })
      } else {
        this.inEdition = true
      }
    },
    saveChange() {
      this.confirmDialog({
        width: 296,
        confirmHandler: () => {
          this.inEdition = false
        },
        cancelHandler: () => {
          this.inEdition = false
        },
        cancelButton: 1,
        message: '确认保存本次编辑？',
      })
    },
    healthDoc() {
      this.$router.push({ name: 'healthRecord' })
      let temp = {}
      temp.name = 'healthRecord'
      temp.title = 'healthRecord'
      this.openPage(temp)
      this.setCurPage(temp.name)
    },
    mainBodyScroll() {
//      console.log('enter', this.$refs.mainBody.scrollTop, this.$refs.cutLab.offsetTop)
      this.cutadtop = this.$refs.mainBody.scrollTop > this.$refs.cutLab.offsetTop
      if (this.cutadtop) {
        this.$refs.cutLab.style.transform = 'translateY(' + (this.$refs.mainBody.scrollTop - this.$refs.cutLab.offsetTop) + 'px)'
      } else {
        this.$refs.cutLab.style.transform = 'none'
      }
    },
    test() {
//      console.log('-=--=')
//      this.$refs.datePicker.$el.click()
      this.testData = []
      console.log('testData: ', this.testData)
    },
    test2() {
      console.log('testData: ', this.testData)
    },
  },
  mounted() {
//    window.addEventListener('click', () => {
//      console.log('---', this.modalData.contentData.editDiagnoses.step2.groupTransferData.value)
//      console.log('-=-=', this.modalData.contentData.editDiagnoses.step2.diseaseTransferData.value)
//
//      window.setTimeout(() => {
//        this.modalData.contentData.editDiagnoses.step2.diseaseTransferData.value = []
//        this.modalData.contentData.editDiagnoses.step2.groupTransferData.value = []
//      }, 1000)
//    })
    window.addEventListener('resize', this.windowResize)
    this.activated = true
  },
  activated() {
    if (!this.activated) {
      window.addEventListener('resize', this.windowResize)
    }
    this.activated = false
  },
  deactivated() {
    window.removeEventListener('resize', this.windowResize)
  },
}
</script>
<style lang="less" scoped>
.ibtn.normal{
  border-color: #1B98EF;
  background-color: white;
  color: #57B3F3;
  padding-left: 10px;
  padding-right: 10px;
  min-width: 74px;
  &:hover{
    background-color: #E0F2FF;
  }
}
.ibtn.danger{
  background-color: #FF6262;
  border-color: #FF6A6A;
  color: white;
  min-width: 74px;
  padding-left: 10px;
  padding-right: 10px;
  &:hover{
    background-color: #ff837d;
  }
}
.mainExamWorkBenchContainer{
  padding-right: 5px;
  height: 100%;
  .topBar{
    height: 50px;
    .basicStatistics{
      border-radius: 15px;
      box-shadow: 0 0 3px 2px #f0f0f0;
      /*min-width: 640px;*/
      position: absolute;
      left: 10px;
      top: 10px;
      width: calc(~'100% - 440px');
      td{
        padding-right: 15px;
      }
    }
    .btns{
      top: 10px;
      position: absolute;
      right: 5px;
      white-space: nowrap;
      font-size: 0;
      & > *{
        margin-right: 10px;
        width: 74px;
      }
    }
  }
  .mainBody{
    height: calc(~'100% - 56px');
    /*overflow-y: hidden;*/
    /*overflow-x: auto;*/
    overflow: auto;
    display: flex;
    padding-bottom: 15px;
    position: relative;
    .mainBodyLeft{
      /*width: calc(~'100% - 430px');*/
      /*height: 100%;*/
      /*width: 810px;*/
      min-width: 937px;
      flex-grow: 1;
      margin-right: 10px;
      .basicInfo{
        padding: 10px 2px 10px 15px;
        /*overflow: hidden;*/
        height: 225px;
      }
      .cutLab{
        border-bottom: 1px solid #ddd;
        white-space: nowrap;
        font-size: 0;
        padding-left: 30px;
        background-color: white;
        label{
          font-size: 14px;
          display: inline-block;
          margin-right: 30px;
          height: 47px;
          line-height: 47px;
          &.selected{
            border-bottom: 3px solid #0089EE;
            color: #008BED;
            font-weight: bold;
          }
        }
        &.top{
          position: relative;
          z-index: 999;
        }
      }
      .resultArea{
        padding-left: 15px;
        margin-top: 10px;
        /*height: calc(~'100% - 272px');*/
        /*overflow: auto;*/
        .resultItem{
          overflow: hidden;
          border-radius: 9px;
          border: 1px solid #DCDCDD;
          margin-top: 10px;
          .ibtn.normal{
            margin-left: 10px;
          }
          &.departmentImpression{
            .tableBox{
              width: calc(~'100% + 2px');
              margin-left: -1px;
            }
          }
          &.clinicDiagnose{
            .tableBox{
              width: calc(~'100% + 2px');
              margin-left: -1px;
            }
          }
          &.prescribe{
            overflow: visible;
            height: 222px;
            .contentBox{
              margin: 10px;
              background-color: #F2F7FF;
              height: 150PX;
              border-radius: 5px;
              & > div{
                float: left;
                height: 100%;
              }
              .review{
                width: 50%;
                height: calc(~'100% - 20px');
                margin: 10px 0;
                border-right: 1px solid #D0D0D1;
                padding-left: 10px;
                .reviewItem{
                  min-width: 75px;
                  padding: 0 8px;
                  line-height: 28px;
                  height: 30px;
                  border: 1px solid #D9D9D9;
                  display: inline-block;
                  position: relative;
                  margin-right: 10px;
                  text-align: center;
                  background-color: white;
                  &:hover .closeBtn{
                    visibility: visible;
                  }
                  .closeBtn{
                    visibility: hidden;
                    width: 14px;
                    height: 14px;
                    background-color: #B3B3B3;
                    cursor: pointer;
                    position: absolute;
                    right: -7px;
                    top: -7px;
                    border-radius: 50%;
                    &:hover{
                      background-color: #FF8181;
                    }
                    &:before{
                      content: "";
                      position: absolute;
                      width: 8px;
                      height: 1px;
                      background-color: white;
                      cursor: pointer;
                      left: 0;
                      right: 0;
                      top: 0;
                      bottom: 0;
                      margin: auto;
                      transform: rotate(45deg);
                      z-index: 1;
                    }
                    &:after{
                      content: "";
                      position: absolute;
                      width: 8px;
                      height: 1px;
                      background-color: white;
                      cursor: pointer;
                      left: 0;
                      right: 0;
                      top: 0;
                      bottom: 0;
                      margin: auto;
                      transform: rotate(-45deg);
                      z-index: 1;
                    }
                  }
                }
              }
              .doctorAdvice{
                /*padding: 10px 15px;*/
                /*padding-right: 5px;*/
                font-size: 13px;
                & > *{
                  width: 100%;
                  height: 100%;
                }
                .editor{
                  padding: 10px 12px;
                  padding-right: 17px;
                  background-color: transparent;
                  border: none;
                  resize: none;
                }
                .display{
                  padding: 10px 12px;
                  padding-right: 17px;
                  white-space: pre-wrap;
                  overflow-y: auto;
                }
              }
            }
          }
          &.conclusion{
            overflow: visible;
            .contentBox.health{
              height: 150px;
              padding: 10px;
              textarea{
                resize: none;
                width: 100%;
                height: 100%;
                padding: 8px;
                border: none;
                background-color: #F2F7FF;
                border-radius: 5px;
              }
            }
            .contentBox.other{
              width: 100%;
              border-collapse: collapse;
              height: 90px;
              text-align: center;
              td{
                border-right: 1px solid #DDDDDD;
              }
              .leftTitle{
                width: 132px;
              }
              .items{
                width: 311px;
                position: relative;
                & > *{
                  text-align: left;
                }
              }
              .text{
                border-right: none;
                .editor{
                  resize: none;
                  min-height: 90px;
                  border: none;
                  display: block;
                  padding: 10px 15px;
                  width: 100%;
                }
                .display{
                  padding: 0 15px;
                  text-align: left;
                }
              }
            }
          }
          &.advice{
            .contentBox{
              padding: 10px;
              height: 150px;
              textarea{
                resize: none;
                width: 100%;
                height: 100%;
                padding: 8px 15px;
                border: none;
                background-color: #F2F7FF;
                border-radius: 5px;
              }
            }
          }
        }
        .signature{
          float: right;
          & *{
            vertical-align: middle;
          }
          & > span{
            display: inline-block;
            margin-right: 20px;
          }
        }
      }
    }
    .mainBodyRight{
      width: 354px;
      /*height: 100%;*/
      min-width: 354px;
      flex-grow: 0;
      margin-top: 10px;
      /*overflow: auto;*/
      .item{
        width: 348px;
        border: 1px solid #ddd;
        border-radius: 9px;
        overflow: hidden;
        margin-bottom: 20px;
        .tableBox{
          width: calc(~'100% + 2px');
          /* margin: 0 -1px -1px -1px; */
          .table{
            margin: 0 -1px;
          }
        }
      }
    }
  }
  .quantityInfo{
    position: absolute;
    top: 66px;
    /*left: 460px;*/
    border: 1px solid #DBDBDC;
    border-radius: 9px;
    box-shadow: 0 0 3px #ECEDF8;
    overflow: hidden;
  }
}

.confirmDialog{
  .content{
    font-size: 15px;
    padding: 30px 0;
    text-align: center;
  }
  .footer{
    height: 50px;
    .ibtn{
      margin-right: 20px;
    }
  }
}
.modalContentItem{
  min-height: 100px;
  overflow: hidden;
  & > .header{
    background-color: #F2F5FA;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  .content{
    padding: 20px 20px 0 20px;
  }
}
.groupDetailModalContent .header{
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.modalContentItem{
  &.addResult{
    .content{
    }
  }
  &.editDiagnoses{
    .content{
      padding: 20px 0;
      .step{
        padding: 0 20px;
      }
      .step1{
        .item:not(.fitlerableTable){
          font-size: 0;
          margin-bottom: 20px;
          & > *{
            display: inline-block;
            vertical-align: middle;
            width: 48px;
            margin-right: 10px;
            font-size: 12px;
          }
          .select{
            width: calc(~'100% - 60px');
            margin-right: 0;
          }
        }
        .item.fitlerableTable{
          .header{
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border: 1px solid #DCDCDD;
            border-bottom: none;
            padding: 10px 20px;
            position: relative;
            background-color: white;
            z-index: 0;
            .icon{
              position: absolute;
              right: 30px;
              width: 14px;
              height: 14px;
              top: 0;
              bottom: 0;
              margin: auto;
              z-index: -1;
              background: url(/static/icons/public/search.png) no-repeat;
            }
          }
          .tableBox{
            height: 280px;
          }
        }
      }
      .step2{
        .diseaseInfo{
          height: 40px;
          border-radius: 20px;
          background-color: #FAFAFA;
          border: 1px solid #DCDCDC;
          line-height: 40px;
          padding: 0 15px;
          font-weight: bold;
          &:before{
            content: '临床诊断：';
            color: #686868;
            font-weight: normal;
          }
        }
        .cutBox{
          margin-top: 10px;
          .labs{
            height: 45px;
            line-height: 42px;
            border-bottom: 1px solid #ddd;
            li{
              float: left;
              font-size: 15px;
              color: #777;
              margin-right: 30px;
              cursor: pointer;
              &.selected{
                color: #018AED;
                border-bottom: 3px solid #0089EE;
              }
            }
          }
          .transfers{
            margin-top: 20px;
            width: 200%;
            .group{
              width: 50%;
              float: left;
              transition: 0.2s ease;
              transition-property: margin-left, opacity;
              margin-left: -50%;
              opacity: 0;
              &.current{
                margin-left: 0;
                opacity: 1;
              }
            }
            .disease{
              width: 50%;
              float: left;
              transition: 0.2s ease;
              transition-property: opacity;
              opacity: 0;
              &.current{
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
}
.modelFooter{
  padding: 20px 0;
  text-align: right;
  .ibtn.normal{
    margin-right: 20px;
    width: 74px;
  }
  .ibtn.primary{
    margin-right: 18px;
  }
}
/*.imagePlayerBox{*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*background-color: rgba(0, 0, 0, 0.5);*/
  /*position: absolute;*/
  /*left: 0;*/
  /*bottom: 0;*/
  /*z-index: 9;*/
/*}*/
</style>
<style lang="less">
.mainExamWorkBenchContainer{
  .datePicker{
    display: inline-block;
    position: relative;
    z-index: 0;
    font-size: 12px;
    top: 2px;
    height: 30px;
    .titleLabel{
      display: inline-block;
      margin-right: 9px;
      height: 30px;
      line-height: 30px;
      vertical-align: top;
    }
    .ivu-icon.ivu-input-icon{
      display: none;
    }
    *{
      background-color: transparent;
    }
    .ivu-select-dropdown{
      background-color: white;
    }
  }
  .datePicker:after{
    content: "";
    background:white url('/static/images/public/dateIcon.svg') no-repeat center;
    background-size: contain;
    position: absolute;
    width: 16px;
    height: 16px;
    top: 7px;
    right: 9px;
    z-index: -1;
  }
}
.groupDetailModal{
  .groupDetailModalContent{
    .closeBtn{
      display: inline-block;
      width: 16px;
      height: 16px;
      background-color: #AEAEAE;
      cursor: pointer;
      position: relative;
      top: 8px;
      border-radius: 50%;
      &:before{
        content: "";
        position: absolute;
        height: 1px;
        width: 11px;
        background-color: white;
        transform: rotate(45deg);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
      &:after{
        content: "";
        position: absolute;
        width: 11px;
        height: 1px;
        background-color: white;
        transform: rotate(-45deg);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
  }
}
// fix
.modalContentItem{
  &.editDiagnoses{
    .content{
      .step1 .item.fitlerableTable{
        .input, .input *{
          background-color: transparent;
        }
      }
      .step2 .transfers{
        .group .customTransfer > .customTransfer-list:first-child .title.rowUl .table-cell span{
          font-size: 0;
          &:before{
            font-size: 12px;
            content: '来源组合项目';
          }
        }
        .disease .customTransfer > .customTransfer-list:first-child .title.rowUl .table-cell span{
          font-size: 0;
          &:before{
            font-size: 12px;
            content: '来源疾病（或异常）';
          }
        }
      }
    }
  }
}
.confirmDialog{
  .ivu-modal-header{
    padding: 0;
    overflow: hidden;
  }
}
</style>
