<template>
  <div class="mainInquire">
    <div class="mainInquire-top">
      <crossBand></crossBand>
    </div>
    <div class="mainInquire-table">
      <titletHasSlot style="border-bottom: 1px solid #cccccc;">
        <span slot='titletHasSlotLeftTitle'>主检查询</span>
        <div slot='titletHasSlotRightContent'
             style="margin-right:-20px;">
          <searchInput icon="android-search"
                       :searText="'请输入体检号/姓名/单位名称/主检医生/审核医生'"
                       :searchWidth="351"
                       @on-enter='searchFunc'
                       @on-Icon='searchFunc'
                       @on-cancel="searchCancel()"
                       ref="searchInput">
          </searchInput>
        </div>
      </titletHasSlot>
      <div ref="checkAssignmentcontently"
           class="checkAssignmentcontently">
        <q-table :columns="columns"
                 :data="data"
                 :height="500"
                 :ifEdit="true"
                 :customOperationLine="customOperationLine">
        </q-table>
      </div>
      <!-- 弹出框 -->
      <transition name="fold">
        <div class="mainInquire-table-transfrom"
             v-if="fold">
                <!-- 左边数据 -->
                <div class="mainInquire-table-transfrom-left">
                  <titletHasSlot style="border-bottom: 1px solid #cccccc;">
                    <span slot='titletHasSlotLeftTitle'>临床诊断</span>
                    <div slot='titletHasSlotRightContent'
                        style="margin-right:-20px;">
                    </div>
                  </titletHasSlot>
                  <div class="mainInquire-table-transfrom-left-div">
                    <ZTable :columns="clinicalColumns"
                            :data="clinicalData"
                            :isShowSelectOrIndex="false"
                            :isFixedOperateColumn="false"
                            border
                            stripe
                            :isDependent="true">
                    </ZTable>
                    <ZTable :columns="clinicalColumns"
                            :data="clinicalData"
                            :isShowSelectOrIndex="false"
                            :isFixedOperateColumn="false"
                            border
                            stripe
                            :isDependent="true">
                    </ZTable>
                  </div>
                </div>
                <div class="mainInquire-table-transfrom-right">
                  <titletHasSlot style="border-bottom: 1px solid #cccccc;">
                    <span slot='titletHasSlotLeftTitle'>主检内容</span>
                    <div slot='titletHasSlotRightContent'
                        style="margin-right:-20px;">
                      <ZButton :ZBtype='"ghost"' style="margin-right:56px;"
                        class="fl marginR20"
                        @click="choose()" >查看详情</ZButton>
                        <div class="mainInquire-table-transfrom-right-rightClassTransitionFlex" @click="cancel">
                            <icon class="icon_close" name="modal_close_default"></icon>
                        </div>
                    </div>
                  </titletHasSlot>
                  <div class="mainInquire-table-transfrom-right-div">
                    <ZTable :columns="diagnoseColumns"
                            :data="diagnoseData"
                            :isShowSelectOrIndex="false"
                            border
                            stripe
                            :isDependent="true">
                    </ZTable>
                  </div>
                </div>
                <!-- 右边数据 -->
        </div>
      </transition>

    </div>
  </div>
</template>
<script>
import titletHasSlot from '@/components/titleHasSlot'
import crossBand from '@/components/crossBand'
import searchInput from '@/components/searchInput'
import { mapState } from 'vuex'
import ZTable from '@/components/table/zTable'
import ZButton from '@/components/button/ZButton'
export default {
  name: 'mainInquire',
  components: {
    titletHasSlot,
    crossBand,
    searchInput,
    ZTable,
    ZButton,
  },
  beforeDestroy: function() {
    //
  },
  data() {
    return {
      fold: false,
      data: [
        {
          pe_sn: '171011111',
          name: '张龙',
          sex: '男',
          age: 25,
          exam_type: '已主检',
          first_exam: '初检',
          origin: '',
          exam_status: '已主检',
          company: '四川建设银行',
          register_date: '2017-10-19',
          main_exam_date: '2017-10-19',
          audit_date: '2017-10-19',
        },
        {
          pe_sn: '171011144',
          name: '杨敬华',
          sex: '男',
          age: 32,
          exam_type: '未主检',
          first_exam: '初检',
          origin: '',
          exam_status: '已主检',
          company: '中铁十局',
          register_date: '2017-10-19',
          main_exam_date: '2017-10-19',
          audit_date: '2017-10-19',
        },
        {
          pe_sn: '171011112',
          name: '刘芳',
          sex: '女',
          age: 29,
          exam_type: '已主检',
          first_exam: '初检',
          origin: '',
          exam_status: '已主检',
          company: '四川建设银行',
          register_date: '2017-10-19',
          main_exam_date: '2017-10-19',
          audit_date: '2017-10-19',
        },
      ],
      diagnoseData: [
        {
          main_exam_group: '(主检模块)',
          main_exam_content: '(组件内容)',
        },
      ],
      clinicalData: [
        {
          disease_abnormality: '窦性心律不齐',
          advice: '不用太紧张, 放松身心',
          origin: '',
        },
      ],
      tableHeight: 500,
      showIcon: '/static/icons/public/show.png', // show
      customOperationLine: {
        title: '操作',
        key: 'operate',
        width: 70,
        fixed: 'right',
        render: (h, params) => {
          return h('div', [
            h('span', {
              style: {
                display: 'inline-block',
                width: '18px',
                height: '18px',
                'margin-left': '7px',
                'margin-top': '5px',
                background: 'url(' + this.showIcon + ') no-repeat',
              },
              on: {
                click: event => {
                  console.log('查看', params.row)
                  this.fold = true
                  this.$emit('show', params.row, params.index, params.column)
                },
              },
            }),
          ])
        },
      },
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '体检号',
          key: 'pe_sn',
          ellipsis: true,
          minWidth: 100,
        },
        {
          title: '姓名',
          key: 'name',
          ellipsis: true,
          minWidth: 100,
        },
        {
          title: '性别',
          key: 'sex',
          ellipsis: true,
          minWidth: 44,
        },
        {
          title: '年龄',
          key: 'age',
          ellipsis: true,

          minWidth: 44,
        },
        {
          title: '体检类别',
          key: 'exam_type',
          ellipsis: true,
          minWidth: 164,
        },
        {
          title: '初 / 复检 ',
          key: 'first_exam',
          ellipsis: true,
          minWidth: 68,
        },
        {
          title: '来源',
          key: 'origin',
          ellipsis: true,

          minWidth: 44,
        },
        {
          title: '检查状态',
          key: 'exam_status',
          ellipsis: true,

          minWidth: 100,
        },
        {
          title: '单位名称',
          key: 'company',
          ellipsis: true,

          minWidth: 200,
        },
        {
          title: '登记日期',
          key: 'register_date',
          ellipsis: true,

          minWidth: 92,
        },
        {
          title: '主检日期',
          key: 'main_exam_date',
          ellipsis: true,

          minWidth: 92,
        },
        {
          title: '审核日期',
          key: 'audit_date',
          ellipsis: true,
          minWidth: 92,
        },
      ]
    },
    clinicalColumns() {
      return [
        {
          title: '疾病（或异常）',
          key: 'disease_abnormality',
          width: 180,
        },
        {
          title: '建议',
          key: 'advice',
        },
        {
          title: '来源',
          key: 'origin',
          width: 240,
        },
      ]
    },
    diseaseColumns() {
      return [
        {
          title: '职业禁忌症',
          key: 'occupational_contraindication',
          width: 180,
        },
        {
          title: '建议',
          key: 'advice',
        },
        {
          title: '来源',
          key: 'origin',
          width: 240,
        },
      ]
    },
    diagnoseColumns() {
      return [
        {
          title: '主检模块',
          key: 'main_exam_group',
          width: 133,
        },
        {
          title: '主检内容',
          key: 'main_exam_content',
        },
      ]
    },
  },
  windowHeight(val) {
    this.tableHeight = this.$refs.checkAssignmentcontently.offsetHeight
  },
  methods: {
    //
    ...mapState(['windowHeight']),
    cancel() {
      this.fold = false
    },
  },
}
</script>

<style lang="less">
@import (reference) '~assets/less/variable.less';
.mainInquire {
  padding: 10px;
  height: 100%;
  .mainInquire-top {
    width: 100%;
    height: 30px;
  }
  .mainInquire-table {
    position: relative;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    box-shadow: 0 1px 15px 0 rgba(206, 213, 242, 0.8);
    border-radius: 8px;
    margin-top: 20px;
    height: calc(~'100% - 50px');
    .checkAssignmentcontently {
      height: calc(~'100% - 50px');
    }
    .mainInquire-table-transfrom {
      position: absolute;
      width: 100%;
      height: 255px;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      z-index: 3;
      background: #FFFFFF;
      box-shadow: 0 2px 15px 0 rgba(206, 213, 242, 0.7);
      bottom: 0;
      .mainInquire-table-transfrom-left {
        float: left;
        width: 58.5%;
        height: 100%;
        border-right: 1px solid #d9d9d9;
        .mainInquire-table-transfrom-left-div{
                height: calc(~'100% - 56px');
                           overflow: auto;

        }
      }
      .mainInquire-table-transfrom-right {
        float: left;
        width: 40%;
        height: 100%;
        border-left: 1px solid #d9d9d9;
        margin-left: 1.5%;
        .mainInquire-table-transfrom-right-div{
           height: calc(~'100% - 50px');
           overflow: auto;
        }
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
    .mainInquire-table-transfrom-right-rightClassTransitionFlex{
   cursor: pointer;
   position: absolute;
   width: 16px;
   height:16px;
   background: #b3b3b3;
   border-radius: 16px;
   line-height: 24px;
   text-align: center;
   top:18px;
   right:20px;
   >svg{
     width: 8px;
     height: 8px;
     color:  @tableTr
   }
 }
 .mainInquire-table-transfrom-right-rightClassTransitionFlex:hover{
   cursor: pointer;
   position: absolute;
   background: @tsIconHover;
 }
 .mainInquire-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
 .mainInquire-input {
    margin-left: 10px;
    display: inline-block;
    flex: 1;

  }
}
</style>