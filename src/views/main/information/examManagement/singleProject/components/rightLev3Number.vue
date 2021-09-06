<template>
  <div class="right-lev3-number" v-if='showLev3Number'>
    <!-- 头部 -->
    <div class="lev3-right-title">
      <div class="title-left fl marginL20">
        <span class="title-text fl marginR20">{{lev3PublicData.name}}</span>
        <span class="title-statu fl">
          <img :src="ifQyIcon" alt="#">
          <!-- <img :src="wqyIcon" v-show="!lev3Status" alt="#"> -->
          <span v-if="lev3Status">已启用</span>
          <span v-if="!lev3Status">未启用</span>
        </span>
      </div>
      <div class="title-right fr marginT10 marginR20">
        <Button type="ghost" class="fl marginR10" @click='editSinglePro'>编 辑</Button>
        <Button type="success" class="fl" @click='delSinglePro'>删 除</Button>
      </div>
    </div>
    <!-- 头部结束 -->
    <!-- 结果数据 -->
    <div class="lev3-right-content">
      <div class="lev3-right-top paddingT20 paddingL20 paddingR20">
        <ul class="lev3-right-top-ul">
          <li class="fl">
            <span class="fl marginR10">单项编号</span>
            <div class="fl marginB20" style="width: 142px;">
              <Input v-model="lev3PublicData.code" disabled></Input>
            </div>
          </li>
          <li class="fl">
            <span class="fl marginR10 bgxs">报告显示名称</span>
            <div class="fl marginB20" style="width: 142px;">
              <Input v-model="lev3PublicData.report_name" disabled></Input>
            </div>
          </li>
          <li class="fl">
            <span class="fl marginR10">项目类别</span>
            <div class="fl marginB20" style="width: 142px;">
              <Input v-model="lev3PublicData.typeId" disabled></Input>
            </div>
          </li>
          <li class="fl">
            <span class="fl marginR10">结果类型</span>
            <div class="fl marginB20" style="width: 142px;">
              <Input v-model="lev3PublicData.resType" disabled></Input>
            </div>
          </li>
          <li class="clearBoth"></li>
        </ul>
        <ul class="lev3-right-top-ul">
          <li class="fl">
            <span class="fl marginR10">英文简称</span>
            <div class="fl marginB20" style="width: 142px;">
              <Input v-model="lev3PublicData.en_abbr" disabled></Input>
            </div>
          </li>
          <li class="fl">
            <span class="fl marginR10 bgxs">适用性别</span>
            <div class="fl marginB20" style="width: 142px;">
              <Input v-model="lev3PublicData.newSex" disabled></Input>
            </div>
          </li>
          <li class="fl">
            <span class="fl marginR10">显示顺序</span>
            <div class="fl" style="width: 142px;">
              <Input v-model="lev3PublicData.sort" disabled></Input>
            </div>
          </li>
          <li class="fl">
            <span class="fl marginR10">显示行数</span>
            <div class="fl marginB20" style="width: 142px;">
              <Input v-model="lev3PublicData.displayed_rows" disabled></Input>
            </div>
          </li>
          <li class="clearBoth"></li>
        </ul>
      </div>
      <div class="lev3-right-table paddingL20 paddingR20 paddingB15">
        <ul class="paddingT15">
          <li class="fl">
            <span class="fl marginR10">小结汇总规则</span>
            <div class="fl marginB15" style="width: 142px;">
              <Input v-model="lev3PublicData.briefSummary" disabled></Input>
            </div>
          </li>
          <li class="fl">
            <span class="fl marginR10">参考规则</span>
            <div class="fl marginB15" style="width: 185px;">
              <Input v-model="lev3PublicData.referenceRule" disabled></Input>
            </div>
          </li>
          <li class="fl">
            <div>
              <img :src="ifXjxm" alt="#">
              <span>小结显示项目名称</span>
            </div>
          </li>
           <li class="fl">
            <div>
              <img :src="ifXj" alt="#">
              <span>是否小结</span>
            </div>
          </li>
          <li class="clearBoth"></li>
        </ul>
        <div class="numberTab">
          <div class="number-tab-out" ref="numberTabOut">
            <ul class="tab-title-ul flex">
              <li v-for="(item,index) in numberType.columns">{{ item.title }}</li>
            </ul>
            <ul v-if='!ifNoNumberData' class="tab-title-ul flex">
              <li v-for='(itemVal,index) in numberType.data'>
                <span>{{ itemVal.val }}</span>
              </li>
            </ul>
            <div v-if='ifNoNumberData' style="height: 40px;line-height: 40px;text-align:center;">暂无数据</div>
            <!-- <q-table
              ref='numberTable'
              :key="'level3-table-number'"
              :isShowSelectOrIndex='false'
              :showOperateColumn='false'
              :ifEdit='true'
              :initReq='false'
              :ifShowPagination='false'
              :isSelectMode='numberType.isSelectMode'
              :columns="numberType.columns"
              :data="numberType.data"
              :pageInfo="pageInfo"
              :height="numberType.height"
              :requestDataApi="getRightSingle">
            </q-table> -->
          </div>
        </div>
      </div>
      <div class="right-table-des-con paddingL20 paddingR20">
        <div class="table-des-con-out paddingT15">
          <div class="discribTab">
            <title-has-slot>
              <span slot='titletHasSlotLeftTitle'>项目结果列表</span>
              <div slot='titletHasSlotRightContent'>
                <div class="fl" v-show="!describeType.show">
                  <Button type="ghost" class="fl marginR10" @click='discribTabAdd'>新 增</Button>
                  <Button type="ghost" :disabled='discribCanChangeBtn' class="fl" @click="discribTabChouseBtn">选 择</Button>
                </div>
                <div class="fl"  v-show="describeType.show">
                  <Button type="success" :disabled='describeType.ifDelBtnDisabled' class="fl marginR10" @click="delDiscribBtn">删 除</Button>
                  <Button type="ghost" class="fl marginR10">导 出</Button>
                  <Button type="primary" class="fl" @click='discribTabCancleBtn'>取 消</Button>
                </div>
              </div>
            </title-has-slot>
            <div class="discribTableTab">
              <q-table
                ref='numberDescribeTable'
                :key="'level3-table-number-des'"
                :width='940'
                :ifEdit='true'
                :initReq='false'
                :ifShowPagination='false'
                :params='params'
                :selectMode='describeType.isSelectMode'
                :columns="describeTypeColumns"
                :data="singleRightDataDes"
                :pageInfo="pageInfo"
                :height="describeType.height"
                :requestDataApi="getRightSingleDes"
                @all-selection='singleTabRowClick'
                @delete-row='delDiscribRow'
                @edit-row="editDiscribRow"
                @delete='delDiscribRow'
                @edit='editDiscribRow'
                @on-row-dbClick='editDiscribRow'>
              </q-table>
            </div>
          </div>
        </div>
        <div class="right-table-des-last flex paddingT15 paddingB20">
          <p class="marginR20">最后修改人：<span>{{lev3PublicData.realname}}</span></p>
          <p class="flx1">最后修改时间：<span>{{lev3PublicData.updatedAt}}</span></p>
        </div>
      </div>
    </div>
    <!-- 结果数据结束 -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import * as _ from 'lodash'
import timeFilter from '@/fifters/timeFilter.js'
export default {
  name: 'right-lev3-number',
  props: {
    showLev3Number: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data () {
    // let that = this
    return {
      msg: '三级菜单右侧对应的数值型',
      qyIcon: '/static/icons/public/enabledState.svg', // 启用图标
      statusIcon: '/static/icons/public/enabledState.svg',
      wqyIcon: '/static/icons/public/unUse.svg', // 未启用图标
      lev3Status: false, // 是否显示启用图标
      ifQyIcon: '', // 是否启用显示
      ifXjxm: '', // 小结显示项目名称
      ifXj: '', // 是否小结
      ids: [],
      ifNoNumberData: false, // 数值型是否有数据，false表示有数据不显示
      lev3PublicData: {
        name: '',
        code: '', // 单项编号
        report_name: '', // 报告显示名称
        typeId: '', // 项目类别传入
        type_id: '', // 项目类别
        resType: '', // 结果类型显示
        res_type: '', // 结果类型传入
        en_abbr: '', // 英文简称
        sex: '', // 适用性别
        sort: 0, // 显示顺序
        displayed_rows: 0, // 显示行数
        briefSummary: '', // 小结汇总规则
        is_show_name: 0, // 小结显示项目名称
        is_has_summary: 0, // 是否小结
        reference_rule: 0, // 传入参考规则
        referenceRule: '', // 显示参考规则
        updated_at: '', // 最后修改时间传入
        updatedAt: '', // 最后修改时间显示
        // pe_category_ids: '', // 适用类别（后台暂无字段，自己命名）
      },
      ruleLeft: '', // 参考规则左侧显示
      ruleRight: '', // 参考规则右侧显示
      // tableDataNumber: [], // 结果数据
      numberType: {
        height: 80,
        data: [],
        // showText: false, // 没有数据的时候显示新增
        // numberTabHasData: false, // 有数据不显示新增按钮
        columns: [ // 点击左侧树状三级子菜单显示表格
          {
            title: '参考下限(男)',
            key: 'low_limit_man',
            minWidth: 110,
            ellipsis: true,
          },
          {
            title: '参考上限(男)',
            key: 'upper_limit_man',
            minWidth: 120,
            ellipsis: true,
          },
          {
            title: '参考下限(女)',
            key: 'low_limit_woman',
            minWidth: 120,
            ellipsis: true,
          },
          {
            title: '参考上限(女)',
            key: 'upper_limit_woman',
            minWidth: 120,
            ellipsis: true,
          },
          {
            title: '检测所见最大值',
            key: 'max_val',
            minWidth: 83,
            ellipsis: true,
          },
          {
            title: '检查所见最小值',
            key: 'min_val',
            minWidth: 83,
            ellipsis: true,
          },
          {
            title: '单位',
            key: 'unit',
            minWidth: 75,
            ellipsis: true,
          },
        ],
        isSelectMode: false,
        numberQtable: 80,
        ifDelBtnDisabled: true, // 描述型删除按钮
      },
      is_default_res: 0,
      parentId: 0,
      discribCanChangeBtn: true, // 选择按钮能否点击
      describeType: {
        sort: 0,
        show: false, // 显示选择状态还是现实删除按钮状态
        ifDelBtnDisabled: true, // 描述型删除按钮能否使用
        data: [],
        dataIds: [],
        // columns: [
        //   {
        //     title: '检查所见',
        //     key: 'see',
        //     minWidth: 163,
        //     ellipsis: true,
        //   },
        //   {
        //     title: '检查结果',
        //     key: 'result',
        //     minWidth: 155,
        //   },
        //   {
        //     title: '适用体检类别',
        //     key: 'pe_categories',
        //     minWidth: 152,
        //     ellipsis: true,
        //     render: (h, params) => {
        //       let data = []
        //       for (let i in params.row.pe_categories) {
        //         data.push(params.row.pe_categories[i].name + ',')
        //       }
        //       return data
        //     },
        //   },
        //   {
        //     title: '是否默认', // 需要处理成单选按钮
        //     key: 'is_default_res',
        //     minWidth: 70,
        //     render: (h, params) => {
        //       // console.log(that.data.default_res_id)
        //       // console.log(params.row.id)
        //       params.row.isChouse = false
        //       // console.log(params.row.isChouse)
        //       // console.log(that.data.default_res_id)
        //       // console.log(params.row.id)
        //       if (params.row.id === that.data.default_res_id) {
        //         // console.log(11111)
        //         params.row.isChouse = true
        //         that.is_default_res = 1
        //       } else {
        //         // that.is_default_res.push(0)
        //         params.row.isChouse = false
        //       }
        //       // console.log(that.is_default_res)
        //       return h('Radio', {
        //         props: {
        //           value: params.row.isChouse,
        //         },
        //         style: {
        //           margin: '0 auto',
        //         },
        //         on: {
        //           input: function(event) {
        //             that.$emit('init-req-only-resule', that.data.id, params.row.id)
        //           },
        //         },
        //       })
        //     },
        //   },
        //   {
        //     title: '启用',
        //     key: 'status',
        //     width: 60,
        //     ellipsis: true,
        //     render: (h, params) => {
        //       if (params.row.status === 1) {
        //         return h('div', [
        //           h('div', {
        //             style: {
        //               margin: '0 auto',
        //               background: 'url(' + this.statusIcon + ') no-repeat',
        //               width: '16px',
        //               height: '16px',
        //             },
        //           }),
        //         ])
        //       }
        //     },
        //   },
        //   {
        //     title: '是否正常',
        //     key: 'is_abn',
        //     minWidth: 70,
        //     ellipsis: true,
        //     render: (h, params) => {
        //       if (params.row.is_abn !== 0) { // 不为异常
        //         return h('div', [
        //           h('div', {
        //             style: {
        //               margin: '0 auto',
        //               background: 'url(' + this.statusIcon + ') no-repeat',
        //               width: '16px',
        //               height: '16px',
        //             },
        //           }),
        //         ])
        //       }
        //     },
        //   },
        //   {
        //     title: '加入小结',
        //     key: 'in_brief_summary',
        //     ellipsis: true,
        //     minWidth: 70,
        //     render: (h, params) => {
        //       if (params.row.in_brief_summary !== 0) { // 不为异常
        //         return h('div', [
        //           h('div', {
        //             style: {
        //               margin: '0 auto',
        //               background: 'url(' + this.statusIcon + ') no-repeat',
        //               width: '16px',
        //               height: '16px',
        //             },
        //           }),
        //         ])
        //       }
        //     },
        //   },
        //   {
        //     title: '显示顺序',
        //     ellipsis: true,
        //     key: 'sort',
        //     width: 70,
        //   },
        // ],
        isSelectMode: false,
        height: 400,
      },
      delData: [], // 批量删除的数据
    }
  },
  watch: {
    // delData (val) {
    //   if (val.length === 0 && this.describeType.isSelectMode) {
    // //     this.$refs.numberTable.allSelection = []
    //   }
    // },
    'describeType.dataIds' (val) {
      val.forEach((val) => {
        this.ids.push({
          label: val.see,
          value: val.id,
        })
      })
    },
    data: {
      async handler(val) {
        // console.log(val)
        this.initDelData() // 重置删除的数据
        this.numberType.data = []

        this.lev3PublicData = val
        // if (this.parentId) {
        await this.reqLev3Des()
        // }
        this.parentId = this.lev3PublicData.id
        // console.log(this.lev3PublicData.name)
         // 项目类别
        this.lev3PublicData.typeId = val.type.name
        this.lev3PublicData.newSex = val.newSex
        this.lev3PublicData.sex = val.sex
        this.lev3PublicData.resType = val.newRes_type
        this.describeType.data = _.clone(val.pe_res_items)
        let newNumType = {
          low_limit_man: val.low_limit_man === null ? '' : parseFloat(val.low_limit_man),
          upper_limit_man: val.upper_limit_man === null ? '' : parseFloat(val.upper_limit_man),
          low_limit_woman: val.low_limit_woman === null ? '' : parseFloat(val.low_limit_woman),
          upper_limit_woman: val.upper_limit_woman === null ? '' : parseFloat(val.upper_limit_woman),
          max_val: val.max_val === null ? '' : parseFloat(val.max_val),
          min_val: val.min_val === null ? '' : parseFloat(val.min_val),
          unit: val.unit,
        }
        for (let i in newNumType) {
          this.numberType.data.push({title: i, val: newNumType[i]})
        }
        if (newNumType['low_limit_man'] === null && newNumType['upper_limit_man'] && newNumType['low_limit_woman'] && newNumType['upper_limit_woman'] && newNumType['max_val'] && newNumType['min_val']) {
          this.ifNoNumberData = true
        } else {
          this.ifNoNumberData = false
        }
        this.lev3PublicData.updatedAt = timeFilter(val.updated_at)
        this.lev3PublicData.realname = val.operater ? val.operater : ''
        if (val.status === 1) { // 页面中显示的启用未启用
          this.lev3Status = true
          this.ifQyIcon = this.qyIcon
        } else {
          this.lev3Status = false
          this.ifQyIcon = this.wqyIcon
        }
        // 小结汇总显示
        switch (val.brief_summary) {
        case 1:
          this.lev3PublicData.briefSummary = '检查所见+单位'
          break
        case 2:
          this.lev3PublicData.briefSummary = '检查所见+异常'
          break
        case 3:
          this.lev3PublicData.briefSummary = '检查所见'
          break
        case 4:
          this.lev3PublicData.briefSummary = '检查结果'
          break
        case 5:
          this.lev3PublicData.briefSummary = '检查所见+单位+异常标志'
          break
        default:
          this.lev3PublicData.briefSummary = ''
        }
        // 参考规则显示
        // console.log(val.reference_rule)
        if (val.reference_rule && val.reference_rule !== null && val.reference_rule.left !== null && val.reference_rule.right !== null) {
          switch (val.reference_rule.left) {
          case 1:
            this.ruleLeft = '<'
            break
          case 2:
            this.ruleLeft = '<='
            break
          case 3:
            this.ruleLeft = '='
            break
          default:
            this.ruleLeft = ''
            break
          }
          switch (val.reference_rule.right) {
          case 1:
            this.ruleRight = '<'
            break
          case 2:
            this.ruleRight = '<='
            break
          case 3:
            this.ruleRight = '='
            break
          default:
            this.ruleLeft = ''
            break
          }
          this.lev3PublicData.referenceRule = `下限${this.ruleLeft}检查所见${this.ruleRight}上限`
        } else {
          this.lev3PublicData.referenceRule = ''
        }

        // 小结显示项目名称
        if (val.is_show_name === 0) { // 不显示
          this.ifXjxm = this.wqyIcon
        } else {
          this.ifXjxm = this.qyIcon
        }
        // 是否小结
        // console.log(val.is_has_summary)
        if (val.is_has_summary === 0) { // 不小结
          // console.log('不小结')
          this.ifXj = this.wqyIcon
        } else {
          // console.log('小结')
          this.ifXj = this.qyIcon
        }
        // console.log(this.ifXj)
        if (this.numberType.data.length > 0) { // 是否显示新增按钮
          this.numberType.numberTabHasData = false
        } else {
          this.numberType.numberTabHasData = true
        }
        // if (this.describeType.data.length > 0) { // 描述型选择按钮是否能点击
        //   console.log(111111111)
        //   this.discribCanChangeBtn = false
        // } else {
        //   console.log(22222222)
        //   this.discribCanChangeBtn = true
        // }
      },
      deep: true,
    },
    singleRightDataDes: {
      handler() {
        if (this.singleRightDataDes.length > 0) { // 描述型选择按钮是否能点击
          this.discribCanChangeBtn = false
        } else {
          this.discribCanChangeBtn = true
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters('singleProjectModule', [
      'pageInfo',
      'singleRightDataDes',
    ]),
    describeTypeColumns () {
      let that = this
      return [
        {
          title: '检查所见',
          key: 'see',
          width: 163,
          ellipsis: true,
        },
        {
          title: '检查结果',
          key: 'result',
          // minWidth: 155,
        },
        {
          title: '适用体检类别',
          key: 'pe_categories',
          width: 152,
          ellipsis: true,
          filterType: 'type',
          filterOptions: this.ids,
          render: (h, params) => {
            let data = []
            // console.log(params.row.pe_categories)
            for (let i in params.row.pe_categories) {
              data.push(params.row.pe_categories[i].name + ',')
            }
            return data
          },
        },
        {
          title: '是否默认', // 需要处理成单选按钮
          key: 'is_default_res',
          width: 70,
          filterType: 'type',
          filterOptions: [
            {
              label: '默认',
              value: 1,
            }, {
              label: '不默认',
              value: 0,
            },
          ],
          render: (h, params) => {
            params.row.isChouse = false
            if (params.row.id === this.data.default_res_id) {
              params.row.isChouse = true
              this.is_default_res = 1
            } else {
              this.is_default_res = 0
              params.row.isChouse = false
            }
            return h('Radio', {
              props: {
                value: params.row.isChouse,
              },
              style: {
                margin: '0 auto',
              },
              on: {
                input: function(event) {
                  that.$emit('init-req-only-resule', that.data.id, params.row.id)
                  that.reqLev3Des()
                },
              },
            })
          },
        },
        {
          title: '启用',
          key: 'status',
          width: 60,
          filterType: 'type',
          filterOptions: [
            {
              label: '启用',
              value: 1,
            }, {
              label: '未启用',
              value: 0,
            },
          ],
          ellipsis: true,
          render: (h, params) => {
            if (params.row.status === 1) {
              return h('div', [
                h('div', {
                  style: {
                    margin: '0 auto',
                    background: 'url(' + this.statusIcon + ') no-repeat',
                    width: '16px',
                    height: '16px',
                  },
                }),
              ])
            }
          },
        },
        {
          title: '是否正常',
          key: 'is_abn',
          width: 70,
          ellipsis: true,
          filterType: 'type',
          filterOptions: [
            {
              label: '异常',
              value: 1,
            }, {
              label: '不为异常',
              value: 0,
            },
          ],
          render: (h, params) => {
            if (params.row.is_abn !== 0) {
              return h('div', [
                h('div', {
                  style: {
                    margin: '0 auto',
                    background: 'url(' + this.statusIcon + ') no-repeat',
                    width: '16px',
                    height: '16px',
                  },
                }),
              ])
            }
          },
        },
        {
          title: '加入小结',
          key: 'in_brief_summary',
          ellipsis: true,
          width: 70,
          filterType: 'type',
          filterOptions: [
            {
              label: '加入小结',
              value: 1,
            }, {
              label: '不加入小结',
              value: 0,
            },
          ],
          render: (h, params) => {
            if (params.row.in_brief_summary !== 0) {
              return h('div', [
                h('div', {
                  style: {
                    margin: '0 auto',
                    background: 'url(' + this.statusIcon + ') no-repeat',
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
          ellipsis: true,
          key: 'sort',
          width: 70,
        },
      ]
    },
    params () {
      // console.log(this.parentId)
      return {filters: `item_id:${this.parentId}`}
    },
  },
  methods: {
    ...mapActions('singleProjectModule', [
      'getRightSingleDes', // 左侧三级菜单选择右侧对应数据
    ]),
    reqLev3Des () { // 表格请求
      this.$nextTick(async () => {
        await this.$refs.numberDescribeTable.request()
        this.describeType.dataIds = _.clone(this.singleRightDataDes)
        if (this.singleRightDataDes.length > 0) { // 描述型选择按钮是否能点击
          this.discribCanChangeBtn = false
        } else {
          this.discribCanChangeBtn = true
        }
        // console.log('请求到的数据条数', this.singleRightDataDes.length)
        this.describeType.sort = this.singleRightDataDes.length // 总的sort。主要在新增使用
        // console.log(this.describeType.sort)
      })
    },
    initDelData () { // 处理删除后的显示
      this.delData = []
      this.describeType.ifDelBtnDisabled = true
    },
    editSinglePro () { // 头部编辑单个按钮
      // console.log('编辑单个项目')
      this.$emit('edit-single-pro', this.lev3PublicData)
    },
    delSinglePro () { // 头部删除单个按钮
      // console.log('删除单个项目')
      this.$emit('del-single-pro')
    },
    discribTabChouseBtn () { // 描述型选择按钮
      // console.log('描述型选择按钮')
      // 切换到取消、删除状态
      this.describeType.show = true
      this.describeType.ifDelBtnDisabled = true
      this.describeType.isSelectMode = true
    },
    discribTabCancleBtn() { // 描述型取消按钮
      // console.log('描述型取消按钮')
      this.describeType.show = false
      this.describeType.ifDelBtnDisabled = true
      this.describeType.isSelectMode = false
    },
    delDiscribBtn (data) { // 描述型删除按钮
      // console.log('描述型删除按钮')
      this.$emit('del-number', this.delData)
    },
    singleTabRowClick (data, row, index, column) { // 表格多选
      if (data.length === 0) {
        this.describeType.ifDelBtnDisabled = true
      } else {
        this.describeType.ifDelBtnDisabled = false
        this.delData = data
      }
    },
    discribTabAdd () { // 新增描述
      // console.log('新增描述')
      this.$emit('add-describ')
    },
    delDiscribRow (data) { // 删除描述型
      // console.log('删除数值型')
      this.$emit('del-number', data)
    },
    editDiscribRow (data, index) { // 编辑描述型
      // console.log('编辑数值型')
      // data.is_default_res = this.is_default_res
      // console.log(this.is_default_res)
      data.default_res_id = this.data.default_res_id
      data.is_default_res = 0
      this.$emit('edit-number', data)
    },
  },
}
</script>
<style lang="less" scoped>
  @import (reference) '~assets/less/variable.less';
  .lev3-right-content {
    width: 100%;
    height: calc(~'100% - 50px');
    color: @gradeAshThree;
    .lev3-right-top {
      width: 100%;
      height: 127px;
      // height: 115px;
      overflow: auto;
      // overflow: hidden;
      color: @gradeAshThree;
      &>ul {
        min-width: 937px;
        // padding-bottom: 20px;
        &>li {
          margin-right: 25px;
          letter-spacing: 0;
           .bgxs {
          width: 72px;
          text-align: right;
          display: inline-block;
        }
          &>span {
            line-height: 30px;
            height: 30px;
          }
        }
      }
      // &>ul:nth-of-type(2){
      //   border-bottom: 1px solid @gradeAshFive;
      // }
    }
    .sylb-class { // 适用类别
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      background-color: #F2F5FA;
      border-radius: 3px;
    }
    .discribTab {
      height: calc(~'100% - 10px');
      .discribTableTab { // 描述型表格高度
        height: 100%;
        width: 100%;
      }
    }
    .lev3-right-table {
      width: 100%;
      height: 155px;
      // background-color: aqua;
      // height: calc(~'100% - 127px');
      // height: calc(~'100% - 115px');
      &>ul {
        border-top: 1px solid @gradeAshFive;
        li {
          margin-right: 20px;
          &>span {
            line-height: 30px;
          }
          &>div {
            color: @gradeAshThree;
            img {
              vertical-align: middle;
              margin-top: -4px;
            }
            &>span {
              line-height: 30px;
            }
          }
        }
      }
      .numberTab {
        height: 80px;
        border-radius: @borderRadiuSmall;
        border: 1px solid @gradeAshFive;
        .number-tab-out {
          height: 80px;
          // 三级页面数值型
          .tab-title-ul {
            width: 100%;
            font-size: 12px;
            height: 40px;
            line-height: 40px;
            &>li {
              // float: left;
              text-align: center;
              height: 40px;
              line-height: 40px;
              // min-width: 15.5%;
              border-right: 1px solid @gradeAshFive;
            }
            &>li:nth-of-type(1) {
              min-width: 15.5%;
            }
            &>li:nth-of-type(2) {
              min-width: 15.5%;
            }
            &>li:nth-of-type(3) {
              min-width: 15.5%;
            }
            &>li:nth-of-type(4) {
              min-width: 15.5%;
            }
            &>li:nth-of-type(5) {
              min-width: 13%;
            }
            &>li:nth-of-type(6) {
              min-width: 13%;
            }
            &>li:nth-of-type(7) {
              flex: 1;
              border-right: none;
            }
          }
          &>ul:nth-of-type(1) {
            background-color: @tableTh;
            color: @gradeAshOne;
          }
        }
      }
    }
    .right-table-des-con {
      height: 100%;
      height: calc(~'100% - 322px');
      .table-des-con-out {
        // height: 100%;
        height: calc(~'100% - 10px');
        border-top: 1px solid @gradeAshFive;
        .discribTab {
          height: 100%;
          border: 1px solid @gradeAshFive;
          border-radius: @borderRadiuBig;
        }
        .discribTableTab {
          height: 100%;
        }
      }
    }
  }
.right-lev3-number {
  height: 100%;
  .lev3-right-title {
    height: 50px;
    width: 100%;
    border-bottom: 1px solid @gradeAshFive;
    .title-left {
      .title-text {
        font-size: 16px;
        line-height: 50px;
        font-weight: bold;
        color: @gradeAshTwo;
        letter-spacing: 1px;
      }
      .title-statu {
        line-height: 50px;
        font-size: 12px;
        color: @gradeAshThree;
        &>img {
          vertical-align: middle;
          margin-right: 3px;
          margin-top: -4px;
        }
      }
    }
  }
}
</style>
