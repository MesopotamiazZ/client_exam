<template>
  <div class="checkWrapper">
    <div class="beforeWrapper">
      <div class="multiExam">
        <div class="left contentBg">
          <title-has-slot>
            <span slot="titletHasSlotLeftTitle">检验员列表</span>
          </title-has-slot>
          <div class="tableWrapper">
            <handsontable style="text-align:center" @selectRow="selectOneDept" :colHeaders="check_Header" :columns="check_columns" :data="allDepts"></handsontable>
          </div>
        </div>
        <div class="right contentBg">
          <title-has-slot>
            <span slot="titletHasSlotLeftTitle">人员列表</span>
            <div slot="titletHasSlotRightContent">
              <Input icon="ios-search-strong" v-model="keyword" @on-enter="search" @on-click="search" placeholder="姓名" style="width: 174px"></Input>
              <ZButton :ZBtype='"ghost"' class="marginL10" @click="addPeGroup()">保 存</ZButton>
              <ZButton :ZBtype='"ghost"' class="marginL10" :disabled="curZuhe===undefined" @click="editZuhe()">删 除</ZButton>
              <ZButton :ZBtype='"ghost"' class="marginL10" :disabled="curZuhe===undefined" @click="editZuhe()">更改签名</ZButton>
            </div>
          </title-has-slot>
          <div class="tableWrapper">
            <handsontable style="text-align:center" @deSelect="deSelectOneZuhe" @selectRow="selectOneZuhe" :columns="proInDept_columns" :colHeaders="proInDept_Header" :data="prosInDept"></handsontable>
          </div>
        </div>
        <div class="frBox contentBg" v-if="showFrBox&&curZuhe!==undefined">
          <Icon type="ios-close" class="close" @click.native="showFrBox=false"></Icon>
          <title-has-slot>
            <span slot="titletHasSlotLeftTitle">所包含单项列表</span>
            <div slot="titletHasSlotRightContent">
              <ZButton :ZBtype='"ghost"' @click="modifyZuheItems()">修 改</ZButton>
            </div>
          </title-has-slot>
          <div class="tableWrapper">
            <handsontable style="text-align:center" :columns="itemInPro_columns" :colHeaders="itemInPro_Header" :data="itemInPro"></handsontable>
          </div>
        </div>
      </div>
    </div>
    <div class="amodifyZuheItemsModal mask modal" v-if="amodifyZuheItemsModal">
      <Modal :styles="{width:590+'px'}" v-model="amodifyZuheItemsModal" class-name="vertical-center-modal" :transition-names='[]' :mask-closable="false" :transfer='false' :closable="false">
        <div slot="header">
          <alertHeader headerText="修改项目"></alertHeader>
        </div>
        <div class="body">
          <custom-transfer :targetData="selectPeItems" :columns="proSelectColumns" :sourceData="allExamProList"></custom-transfer>
        </div>
        <div slot="footer">
          <ZButton :ZBtype='"ghost"' class="fr marginR20 marginB20" @click="amodifyZuheItemsModal=false">取 消</ZButton>
          <ZButtonHasBg class="fr marginR15 marginB20" @click="proSelect_save()">保 存</ZButtonHasBg>
          <div class="clearBoth"></div>
        </div>
      </Modal>
    </div>
    <div class="addZuheModal ZuheModal mask modal" v-if="addZuheModal">
      <Modal :styles="{width:580+'px'}" v-model="addZuheModal" class-name="vertical-center-modal" :transition-names='[]' :mask-closable="false" :transfer='false' :closable="false">
        <div slot="header">
          <alertHeader headerText="新增组合项目"></alertHeader>
        </div>
        <div class="body">
          <span class="title">基本信息</span>
          <div class="row clearfix">
            <div class="item fl">
              <span class="lable paddingR10">科室名称</span>
              <Select v-model="addFormData.dept_id" style="width:198px" placeholder="">
                <Option v-for="item in depts_options" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div class="item fr">
              <span class="lable paddingR10">项目名称</span>
              <Input v-model="addFormData.name" style="width: 201px"></Input>
            </div>
          </div>
          <div class="row clearfix">
            <div class="item fl paddingR15">
              <span class="lable paddingR10">适用性别</span>
              <Select v-model="addFormData.sex" style="width:100px" placeholder="">
                <Option v-for="item in sex_options" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div class="item fl paddingR15">
              <span class="lable paddingR10">检查用时</span>
              <Input v-model="addFormData.minute" style="width: 100px"></Input>
            </div>
            <div class="item fr">
              <span class="lable paddingR10">样本类型</span>
              <Select v-model="addFormData.specimen_type_id" style="width:125px" placeholder="">
                <Option v-for="item in sample_type_options" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="row clearfix">
            <div class="item fl">
              <span class="lable paddingR10">异常标志：</span>
              <RadioGroup v-model="addFormData.is_abn">
                <Radio label=0>
                  <span>无</span>
                </Radio>
                <Radio label=1>
                  <Icon type="arrow-up-a" :style="{color:'#ff8422'}"></Icon>
                </Radio>
                <Radio label=2>
                  <Icon type="arrow-down-a" :style="{color:'#ff8422'}"></Icon>
                </Radio>
              </RadioGroup>
            </div>
            <div class="item fr" style="width:293px;">
              <div class="fl">
                <span class="lable">指引单：</span>
                <RadioGroup v-model="addFormData.is_guide">
                  <Radio label=1>
                    <span>需要</span>
                  </Radio>
                  <Radio label=0>
                    <span>不需要</span>
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
          <div class="row clearfix">
            <div class="item fl">
              <span class="lable paddingR10">样本条码：</span>
              <RadioGroup v-model="addFormData.is_sample_code">
                <Radio label=1>
                  <span>需要</span>
                </Radio>
                <Radio label=0>
                  <span>不需要</span>
                </Radio>
              </RadioGroup>
            </div>
            <div class="item fr" style="width:293px;">
              <div class="fl">
                <span class="lable">抽&nbsp;&nbsp;&nbsp;&nbsp;血：</span>
                <RadioGroup v-model="addFormData.is_blood">
                  <Radio label=1>
                    <span>需要</span>
                  </Radio>
                  <Radio label=0>
                    <span>不需要</span>
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
          <div class="row clearfix">
            <div class="item">
              <span class="lable paddingR10">默认小结内容</span>
              <Input v-model="addFormData.default_content" class="fr" style="width: 450px"></Input>
            </div>
          </div>
          <div class="row clearfix">
            <div class="item fl">
              <span class="lable paddingR10 textJustify" style="width: 83px;marginRight:7px;">指引单提示</span>
              <Input v-model="addFormData.guide_tip" style="width: 321px"></Input>
            </div>
            <div class="item fr time">
              <span class="lable">&nbsp;</span>
              <RadioGroup v-model="addFormData.is_eat">
                <Radio label=0>
                  <span>餐前</span>
                </Radio>
                <Radio label=1>
                  <span>餐后</span>
                </Radio>
              </RadioGroup>
            </div>
          </div>
          <span class="title marginT5">费用信息</span>
          <div class="row clearfix">
            <div class="item fl marginR20">
              <span class="lable paddingR10">标准价格</span>
              <Input v-model="addFormData.price" style="width: 100px"></Input>
            </div>
            <div class="item fl marginR20">
              <span class="lable paddingR10 textJustify" style="width: 82px;marginRight:3px;">收费类型</span>
              <Select v-model="addFormData.charge_type_id" style="width:90px" placement="top" placeholder="">
                <Option v-for="item in charge_type_options" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div class="item fr">
              <span class="lable paddingR10">单位价格</span>
              <Input v-model="addFormData.unit_price" style="width: 100px"></Input>
            </div>
          </div>
          <div class="row clearfix">
            <div class="item fl marginR20" style="margin-bottom:0;">
              <span class="lable paddingR10">附加费用</span>
              <Input v-model="addFormData.surcharge_price" style="width: 100px"></Input>
            </div>
            <div class="item fl" style="margin-bottom:0;">
              <span class="lable paddingR10">附加收费类型</span>
              <Select v-model="addFormData.surcharge_type_id" style="width:90px" placement="top" placeholder="">
                <Option v-for="item in charge_type_options" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
          </div>
        </div>
        <div slot="footer">
          <ZButton :ZBtype='"ghost"' class="fr marginR20 marginB20" @click="addZuheModal=false">取 消</ZButton>
          <ZButtonHasBg class="fr marginR15 marginB20" @click="addZuhe()">保 存</ZButtonHasBg>
          <div class="clearBoth"></div>
        </div>
      </Modal>
    </div>
    <div class="modifyZuheModal ZuheModal mask modal" v-if="modifyZuheModal">
      <Modal :styles="{width:580+'px'}" v-model="modifyZuheModal" class-name="vertical-center-modal" :transition-names='[]' :mask-closable="false" :transfer='false' :closable="false">
        <div slot="header">
          <alertHeader headerText="修改组合项目"></alertHeader>
        </div>
        <div class="body">
          <span class="title">基本信息</span>
          <div class="row clearfix">
            <div class="item fl">
              <span class="lable paddingR10">科室名称</span>
              <Select v-model="addFormData.dept_id" style="width:198px" placeholder="">
                <Option v-for="item in depts_options" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div class="item fr">
              <span class="lable paddingR10">项目名称</span>
              <Input v-model="addFormData.name" style="width: 201px"></Input>
            </div>
          </div>
          <div class="row clearfix">
            <div class="item fl paddingR15">
              <span class="lable paddingR10">适用性别</span>
              <Select v-model="addFormData.sex" style="width:100px" placeholder="">
                <Option v-for="item in sex_options" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div class="item fl paddingR15">
              <span class="lable paddingR10">检查用时</span>
              <Input v-model="addFormData.minute" style="width: 100px"></Input>
            </div>
            <div class="item fr">
              <span class="lable paddingR10">样本类型</span>
              <Select v-model="addFormData.specimen_type_id" style="width:125px" placeholder="">
                <Option v-for="item in sample_type_options" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="row clearfix">
            <div class="item fl">
              <span class="lable paddingR10">异常标志：</span>
              <RadioGroup v-model="addFormData.is_abn">
                <Radio label=0>
                  <span>无</span>
                </Radio>
                <Radio label=1>
                  <Icon type="arrow-up-a" :style="{color:'#ff8422'}"></Icon>
                </Radio>
                <Radio label=2>
                  <Icon type="arrow-down-a" :style="{color:'#ff8422'}"></Icon>
                </Radio>
              </RadioGroup>
            </div>
            <div class="item fr" style="width:293px;">
              <div class="fl">
                <span class="lable">指引单：</span>
                <RadioGroup v-model="addFormData.is_guide">
                  <Radio label=1>
                    <span>需要</span>
                  </Radio>
                  <Radio label=0>
                    <span>不需要</span>
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
          <div class="row clearfix">
            <div class="item fl">
              <span class="lable paddingR10">样本条码：</span>
              <RadioGroup v-model="addFormData.is_sample_code">
                <Radio label=1>
                  <span>需要</span>
                </Radio>
                <Radio label=0>
                  <span>不需要</span>
                </Radio>
              </RadioGroup>
            </div>
            <div class="item fr" style="width:293px;">
              <div class="fl">
                <span class="lable">抽&nbsp;&nbsp;&nbsp;&nbsp;血：</span>
                <RadioGroup v-model="addFormData.is_blood">
                  <Radio label=1>
                    <span>需要</span>
                  </Radio>
                  <Radio label=0>
                    <span>不需要</span>
                  </Radio>
                </RadioGroup>
              </div>
            </div>
          </div>
          <div class="row clearfix">
            <div class="item">
              <span class="lable paddingR10">默认小结内容</span>
              <Input v-model="addFormData.default_content" class="fr" style="width: 450px"></Input>
            </div>
          </div>
          <div class="row clearfix">
            <div class="item fl">
              <span class="lable paddingR10 textJustify" style="width: 83px;marginRight:7px;">指引单提示</span>
              <Input v-model="addFormData.guide_tip" style="width: 321px"></Input>
            </div>
            <div class="item fr time">
              <span class="lable">&nbsp;</span>
              <RadioGroup v-model="addFormData.is_eat">
                <Radio label=0>
                  <span>餐前</span>
                </Radio>
                <Radio label=1>
                  <span>餐后</span>
                </Radio>
              </RadioGroup>
            </div>
          </div>
          <span class="title marginT5">费用信息</span>
          <div class="row clearfix">
            <div class="item fl marginR20">
              <span class="lable paddingR10">标准价格</span>
              <Input v-model="addFormData.price" style="width: 100px"></Input>
            </div>
            <div class="item fl marginR20">
              <span class="lable paddingR10 textJustify" style="width: 82px;marginRight:3px;">收费类型</span>
              <Select v-model="addFormData.charge_type_id" style="width:90px" placement="top" placeholder="">
                <Option v-for="item in charge_type_options" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div class="item fr">
              <span class="lable paddingR10">单位价格</span>
              <Input v-model="addFormData.unit_price" style="width: 100px"></Input>
            </div>
          </div>
          <div class="row clearfix">
            <div class="item fl marginR20" style="margin-bottom:0;">
              <span class="lable paddingR10">附加费用</span>
              <Input v-model="addFormData.surcharge_price" style="width: 100px"></Input>
            </div>
            <div class="item fl" style="margin-bottom:0;">
              <span class="lable paddingR10">附加收费类型</span>
              <Select v-model="addFormData.surcharge_type_id" style="width:90px" placement="top" placeholder="">
                <Option v-for="item in charge_type_options" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
          </div>
        </div>
        <div slot="footer">
          <ZButton :ZBtype='"ghost"' class="fr marginR20 marginB20" @click="modifyZuheModal=false">取 消</ZButton>
          <ZButtonHasBg class="fr marginR15 marginB20" @click="modifyZuhe()">保 存</ZButtonHasBg>
          <div class="clearBoth"></div>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import AlertHeader from '@/components/alert/alertHeader'
  import CustomTransfer from '@/components/customTransfer/customTransfer'
  import ZButton from '@/components/button/ZButton'
  import ZButtonHasBg from '@/components/button/ZButtonHasBg'
  import Handsontable from '@/components/table/handsontable'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import renderer from '@/service/renderer'
  import TitleHasSlot from '@/components/titleHasSlot'
  import * as types from '@/store/modules/information/examManagement/multiExam/multiExamTypes'
  import * as lodash from 'lodash'
  export default {
    name: 'multiExam',
    components: {
      Handsontable,
      CustomTransfer,
      AlertHeader,
      ZButton,
      ZButtonHasBg,
      TitleHasSlot,
    },
    data() {
      return {
        keyword: '',
        addFormData: {
          dept_id: '', // 科室id
          name: '', // 项目名字
          sex: '', // 适用性别
          minute: '', // 检查用时
          default_content: '', // 默认小结（必填）
          guide_tip: '', // 指引单提示
          is_eat: 0, // 0餐前, 1餐后（必填）
          price: '', // 标准价格（必填）
          charge_type_id: '', // 收费类型（必填）
          is_abn: 0, // 是否异常（0否，1高，2低） （非必填）
          is_guide: 1, // 是否需要指引单（0不需要，1需要） （非必填）
          is_sample_code: 1, // 是否需要样本条码（0不需要，1需要） （非必填）
          is_blood: 1, // 是否需要抽血（0否，1是） （非必填）
          specimen_type_id: '', // 采样类型 （非必填）
          unit_price: '', // 单位价格 （非必填）
          exclude_group_item_ids: [], // 排除的组合项目id（JSON类型） 例：[1,2,3] （非必填）
          surcharge_price: '',
          surcharge_type_id: '',
        },
        sex_options: [
          {
            value: 0,
            label: '通用',
          },
          {
            value: 1,
            label: '男',
          },
          {
            value: 2,
            label: '女',
          },
        ],
        modifyZuheModal: false,
        addZuheModal: false,
        amodifyZuheItemsModal: false,
        selectPeItems: [],
        proSelectColumns: [
          {
            title: '项目编号',
            key: 'code',
          },
          {
            title: '项目名称',
            key: 'name',
          },
        ],
        showFrBox: false, // 是否显示所包含单项列表
        curDept: {}, // 当前选中的科室
        curZuhe: undefined, // 当前选中的组合
        check_Header: ['', '职称', '人数'],
        check_columns: [
          {
            data: '',
            readOnly: true,
            width: 2.9,
            className: 'htCenter htMiddle',
            renderer: renderer.indexRenderer(),
          },
          {
            data: 'name',
            readOnly: true,
            width: 8.2,
            className: 'htCenter htMiddle',
          },
          {
            data: 'dept_type',
            readOnly: true,
            width: 3.7,
            renderer: (h, TD, r, c, p, value, cp) => {
              if (value) {
                TD.innerHTML = value.name
              } else {
                TD.innerHTML = ''
              }
              TD.className += TD.className + ' htCenter htMiddle'
            },
          },
        ],
        proInDept_Header: [
          '',
          '人员编号',
          '职称',
          '所在科室',
          '姓名',
          '性别',
          '签名图片',
        ],
        proInDept_columns: [
          {
            data: '',
            readOnly: true,
            width: 2.7,
            className: 'htCenter htMiddle',
            renderer: renderer.indexRenderer(),
          },
          {
            data: 'code',
            readOnly: true,
            width: 6,
            className: 'htCenter htMiddle',
          },
          {
            data: 'name',
            readOnly: true,
            width: 13.8,
            className: 'htCenter htMiddle',
          },
          {
            data: 'sex',
            readOnly: true,
            width: 14.4,
            className: 'htCenter htMiddle',
          },
          {
            data: 'price',
            readOnly: true,
            width: 8.3,
            className: 'htCenter htMiddle',
          },
          {
            data: 'charge_type',
            readOnly: true,
            width: 8.3,
            className: 'htCenter htMiddle',
          },
          {
            data: 'status',
            readOnly: true,
            width: 11.6,
            className: 'htCenter htMiddle',
          },
        ],
        itemInPro_Header: ['单项编号', '单项名称', '结果类型'],
        itemInPro_columns: [
          {
            data: 'code',
            readOnly: true,
            width: 8.6,
            className: 'htCenter htMiddle',
          },
          {
            data: 'name',
            readOnly: true,
            width: 8.6,
            className: 'htCenter htMiddle',
          },
          {
            data: 'res_type',
            readOnly: true,
            width: 8.6,
            renderer: (h, TD, r, c, p, value, cp) => {
              if (value === 1) {
                TD.innerHTML = '表达式型'
              }
              if (value === 2) {
                TD.innerHTML = '描述型'
              }
              if (value === 3) {
                TD.innerHTML = '数值型'
              }
              TD.className += TD.className + ' htCenter htMiddle'
            },
          },
        ],
      }
    },
    computed: {
      ...mapState('multiExamModule', [
        'allDepts',
        'itemInPro',
        'zuheInfo',
        'allExamProList',
        'sampleTypes',
        'chargeTypes',
        'prosInDept',
        'curDeptId',
      ]),
      depts_options() {
        let arr = []
        for (var i = 0; i < this.allDepts.length; i++) {
          const dept = this.allDepts[i]
          arr.push({
            value: dept.id,
            label: dept.name,
          })
        }
        return arr
      },
      sample_type_options() {
        let arr = []
        for (var i = 0; i < this.sampleTypes.length; i++) {
          const type = this.sampleTypes[i]
          arr.push({
            value: type.id,
            label: type.name,
          })
        }
        return arr
      },
      charge_type_options() {
        let arr = []
        for (var i = 0; i < this.chargeTypes.length; i++) {
          const type = this.chargeTypes[i]
          arr.push({
            value: type.id,
            label: type.name,
          })
        }
        return arr
      },
    },
    methods: {
      ...mapMutations('multiExamModule', {
        setDeptId: types.SET_DEPT_ID,
      }),
      ...mapActions('multiExamModule', {
        getDepts: types.GET_DEPTS,
        getItemInPro: types.GET_ITEM_IN_PRO,
        getZuheInfo: types.GET_ZUHE_INFO,
        getAllExamPro: types.GET_ALL_EXAMPRO,
        modifyZuhe: types.MODIFY_ZUHE,
        getSampleTypes: types.GET_SAMPLE_TYPES,
        getChargeTypes: types.GET_CHARGE_TYPES,
        addPeGroupItem: types.ADD_PE_GROUP_ITEM,
        editPeGroupItem: types.EDIT_PE_GROUP_ITEM,
        getProsInDept: types.GET_PROS_IN_DEPT,
      }),
      addPeGroup() {
        this.addFormData = {
          dept_id: '', // 科室id
          name: '', // 项目名字
          sex: '', // 适用性别
          minute: '', // 检查用时
          default_content: '', // 默认小结（必填）
          guide_tip: '', // 指引单提示
          is_eat: 0, // 0餐前, 1餐后（必填）
          price: '', // 标准价格（必填）
          charge_type_id: '', // 收费类型（必填）
          is_abn: 0, // 是否异常（0否，1高，2低） （非必填）
          is_guide: 1, // 是否需要指引单（0不需要，1需要） （非必填）
          is_sample_code: 1, // 是否需要样本条码（0不需要，1需要） （非必填）
          is_blood: 1, // 是否需要抽血（0否，1是） （非必填）
          specimen_type_id: '', // 采样类型 （非必填）
          unit_price: '', // 单位价格 （非必填）
          exclude_group_item_ids: [], // 排除的组合项目id（JSON类型） 例：[1,2,3] （非必填）
          surcharge_price: '',
          surcharge_type_id: '',
        }
        this.addZuheModal = true
      },
      editZuhe() {
        this.addFormData = lodash.clone(this.curZuhe)
        this.modifyZuheModal = true
      },
      selectOneDept(row, data) {
        this.curDept = data
        this.curZuhe = undefined
        this.getProsInDept({dept_id: data.id})
        this.setDeptId(data.id)
      },
      selectOneZuhe(row, data) {
        this.curZuhe = data
        this.getItemInPro(data.id)
        this.showFrBox = true
      },
      deSelectOneZuhe() {
        this.curZuhe = undefined
      },
      modifyZuheItems() {
        this.amodifyZuheItemsModal = true
        this.getZuheInfo(this.curZuhe.id)
        this.getAllExamPro()
      },
      proSelect_save() {
        console.log(this.selectPeItems)
        let ids = []
        for (let i = 0; i < this.selectPeItems.length; i++) {
          const pro = this.selectPeItems[i]
          ids.push(pro.id)
        }
        this.modifyZuhe({ id: this.curZuhe.id, data: { pe_item_ids: ids } })
        this.amodifyZuheItemsModal = false
      },
      modifyZuhe() {
        this.addFormData.is_abn = Number.parseInt(this.addFormData.is_abn)
        this.addFormData.is_blood = Number.parseInt(this.addFormData.is_blood)
        this.addFormData.is_eat = Number.parseInt(this.addFormData.is_eat)
        this.addFormData.is_guide = Number.parseInt(this.addFormData.is_guide)
        this.addFormData.is_sample_code = Number.parseInt(this.addFormData.is_sample_code)
        console.log(this.addFormData)
        this.editPeGroupItem({id: this.curZuhe.id, data: this.addFormData})
      },
      addZuhe() {
        this.addFormData.is_abn = Number.parseInt(this.addFormData.is_abn)
        this.addFormData.is_blood = Number.parseInt(this.addFormData.is_blood)
        this.addFormData.is_eat = Number.parseInt(this.addFormData.is_eat)
        this.addFormData.is_guide = Number.parseInt(this.addFormData.is_guide)
        this.addFormData.is_sample_code = Number.parseInt(this.addFormData.is_sample_code)
        console.log(this.addFormData)
        this.addPeGroupItem(this.addFormData)
      },
      search() {
        if (this.keyword !== '') {
          this.getProsInDept({dept_id: this.curDept.id, key: this.keyword})
        } else {
          this.getProsInDept({dept_id: this.curDept.id})
        }
      },
    },
    created() {
      this.getDepts()
      this.getSampleTypes()
      this.getChargeTypes()
    },
    watch: {
      zuheInfo(cur) {
        if (cur) {
          this.selectPeItems = cur.slice()
        }
      },
    },
  }
</script>
<style lang="less">
  @import (reference) '~assets/less/variable.less';
  .checkWrapper {
    width: 1055px;
    height: 100%;
    margin: 0 auto;

    .clearfix {
      clear: both;
      overflow: hidden;
    }

    .modal {
      .solidBtn {
        cursor: pointer;
        width: 74px;
        height: 30px;
        outline: 0;
        background-color: #008cee;
        color: #fff;
        border: none;
        border-radius: @borderRadiuSmall;
      }

      .solidBtn:hover {
        background-color: #3d96ff;
      }

      .solidBtn:active {
        background-color: #3d96ff;
      }

      .btn {
        width: 74px;
        height: 30px;
        outline: 0;
        margin-left: 5px;
        background-color: #fff;
        color: #008cee;
        border: 1px solid #008cee;
        border-radius: @borderRadiuSmall;
        cursor: pointer;
      }

      .btn:hover {
        background-color: #ebf4ff;
      }

      .btn:active {
        background-color: #b8d8ff;
      }
    }

    .modal {
      .body {
        padding: 20px;
      }

      .item {
        margin-bottom: 15px;
      }

      .textJustify {
        float: left;
        height: 30px;
        overflow: hidden;
        line-height: 30px;
        font-size: 12px;
        color: #737373;
        margin-right: 10px;
      }
    }

    .ZuheModal {
      .title {
        display: block;
        font-size: 12px;
        margin-bottom: 15px;
        color: #4a4a4a;
        font-weight: bold;
      }
      .lable {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        color: #737373;
      }

      .time {
        .ivu-radio-wrapper {
          margin-right: 0 !important;
          margin-left: 8px;
        }
      }
    }
  }

  .beforeWrapper {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px;
  }

  .multiExam {
    position: relative;
    height: 100%;

    .left {
      float: left;
      width: 188.8px;
      height: 100%;
      background-color: #fff;
      overflow: hidden;
    }
    .right {
      float: right;
      width: 834px;
      height: 100%;
      background-color: #fff;
      overflow: hidden;
    }
    .header {
      height: 50px;
      padding: 0 20px;

      .ico {
        float: left;
        width: 3px;
        height: 17px;
        margin-top: 17px;
        background-color: #008cee;
      }

      .title {
        float: left;
        margin-left: 5px;
        line-height: 50px;
        font-size: 14px;
        color: #111111;
      }

      .frW {
        float: right;
        margin-top: 10px;
      }

      .btn {
        width: 74px;
        height: 30px;
        outline: 0;
        margin-left: 5px;
        background-color: #fff;
        color: #008cee;
        border: 1px solid #008cee;
        border-radius: @borderRadiuSmall;
        cursor: pointer;
      }

      .btn:hover {
        background-color: #ebf4ff;
      }

      .btn:active {
        background-color: #b8d8ff;
      }
    }

    .tableWrapper {
      height: calc(~'100% - 50px');

      .ihandsontable,
      .ihandsontable > .handsontable,
      .ihandsontable > .handsontable .ht_master,
      .ihandsontable > .handsontable .wtHolder {
        height: 100% !important;
      }
    }

    .checkMark {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      font-size: 14px;
      color: #b1e871;
    }

    .frBox {
      position: absolute;
      right: 0;
      width: 32%;
      height: 100%;
      z-index: 102;

      .ivu-icon-ios-close {
        position: absolute;
        top: -7px;
        right: -7px;
        font-size: 18px;
        color: #cccccc;
        cursor: pointer;
      }
    }
  }
</style>