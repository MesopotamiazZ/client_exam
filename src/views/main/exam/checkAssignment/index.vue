<template>
  <div class="checkAssignment">
    <div class="checkAssignment-top">
      <crossBand></crossBand>
    </div>
    <div class="checkAssignment-table">
      <titletHasSlot style="border-bottom: 1px solid #cccccc;">
        <span slot='titletHasSlotLeftTitle'>检查查询</span>
        <div slot='titletHasSlotRightContent'
             style="margin-right:-20px;">
       <ZButton :ZBtype='"ghost"'
                 class="fr"
                 style="margin-right:20px;"
                 @click="goRouter()"
               >选 中</ZButton>
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
        <div class="checkAssignment-table-transfrom"
             v-if="fold">
                <!-- 左边数据 -->
                <div class="checkAssignment-table-transfrom-left">
                  <titletHasSlot style="border-bottom: 1px solid #cccccc;">
                    <span slot='titletHasSlotLeftTitle'>临床诊断</span>
                    <div slot='titletHasSlotRightContent'
                        style="margin-right:-20px;">
                    </div>
                  </titletHasSlot>
                  <div>
                    <ZTable :columns="diagnoseColumns"
                            :data="diagnose"
                            :height="280"
                            :isShowSelectOrIndex="false"
                            border
                            stripe
                            :isDependent="true">
                    </ZTable>
                  </div>
                </div>
                <div class="checkAssignment-table-transfrom-right">
                  <titletHasSlot style="border-bottom: 1px solid #cccccc;">
                    <span slot='titletHasSlotLeftTitle'>科室印象</span>
                    <div slot='titletHasSlotRightContent'
                        style="margin-right:-20px;">
                      
                        <div class="checkAssignment-table-transfrom-right-rightClassTransitionFlex" @click="cancel">
                            <icon class="icon_close" name="modal_close_default"></icon>
                        </div>
                    </div>
                  </titletHasSlot>
                  <div>
                    <ZTable :columns="officeColumns"
                            :data="office"
                            :height="280"
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
  name: 'checkAssignment',
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
          exam_type: '职业体检',
          first_exam: '初检',
          origin: '',
          exam_status: '',
          company: '四川建设银行',
          register_date: '2017-10-19',
        },
        {
          pe_sn: '171011112',
          name: '李大华',
          sex: '男',
          age: 32,
          exam_type: '职业体检',
          first_exam: '初检',
          origin: '',
          exam_status: '',
          company: '四川建设银行',
          register_date: '2017-10-19',
        },
        {
          pe_sn: '171011112',
          name: '刘芳',
          sex: '女',
          age: 29,
          exam_type: '职业体检',
          first_exam: '初检',
          origin: '',
          exam_status: '',
          company: '四川建设银行',
          register_date: '2017-10-19',
        },
      ],
      diagnose: [
        {
          dept_name: '外科',
          group_item_name: '甲状腺检查',
          pics: '',
          exam_result: '无异常',
          doctor: '杨华',
          exam_time: '2017-10-18',
        },
        {
          dept_name: '外科',
          group_item_name: '一般情况',
          pics: '',
          exam_result: '身高: 180(cm), 体重: 68(kg)',
          doctor: '杨华',
          exam_time: '2017-10-18',
        },
        {
          dept_name: '外科',
          group_item_name: '脊柱检查',
          pics: '',
          exam_result: '无异常',
          doctor: '杨华',
          exam_time: '2017-10-18',
        },
      ],
      office: [
        {
          dept_name: '外科',
          group_item_name: '甲状腺检查',
          pics: '',
          exam_result: '无异常',
          doctor: '杨华',
          exam_time: '2017-10-18',
          exam_rdoc: '周医生',
        },
        {
          dept_name: '外科',
          group_item_name: '一般情况',
          pics: '',
          exam_result: '身高: 180(cm), 体重: 68(kg)',
          doctor: '杨华',
          exam_time: '2017-10-18',
          exam_rdoc: '周医生',

        },
        {
          dept_name: '外科',
          group_item_name: '脊柱检查',
          pics: '',
          exam_result: '无异常',
          doctor: '杨华',
          exam_time: '2017-10-18',
          exam_rdoc: '周医生',

        },
      ],
      tableHeight: 500,
      showIcon: '/static/icons/public/show.png', // show
      customOperationLine: {
        title: '操作',
        key: 'operate',
        minWidth: 70,
        fixed: 'right',
        render: (h, params) => {
          return h('div', [
            h('span', {
              style: {
                display: 'inline-block',
                minWidth: '18px',
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
          minWidth: 143,
        },
        {
          title: '姓名',
          key: 'name',
          minWidth: 143,
        },
        {
          title: '性别',
          key: 'sex',
          minWidth: 63,
        },
        {
          title: '年龄',
          key: 'age',
          minWidth: 63,
        },
        {
          title: '体检类别',
          key: 'exam_type',
          minWidth: 235,
        },
        {
          title: '初 / 复检 ',
          key: 'first_exam',
          minWidth: 98,
        },
        {
          title: '来源',
          key: 'origin',
          minWidth: 63,
        },
        {
          title: '检查状态',
          key: 'exam_status',
          minWidth: 143,
        },
        {
          title: '单位名称',
          key: 'company',
          minWidth: 286,
        },
        {
          title: '登记日期',
          key: 'register_date',
          minWidth: 132,
        },
      ]
    },
    diagnoseColumns() {
      return [
        {
          title: '临床诊断',
          key: 'dept_name',
          minWidth: 240,
        },
        {
          title: '建议',
          key: 'group_item_name',
          minWidth: 100,
        },
        {
          title: '来源组合项目',
          key: 'pics',
          minWidth: 200,
        },
        {
          title: '科室',
          key: 'exam_result',
          minWidth: 100,
        },
      ]
    },
    officeColumns() {
      return [
        {
          title: '科室名称',
          key: 'dept_name',
          minWidth: 240,
        },
        {
          title: '组合项目名称',
          key: 'group_item_name',
          minWidth: 100,
        },
        {
          title: '影像',
          key: 'pics',
          minWidth: 80,
        },
        {
          title: '检查小结',
          key: 'exam_result',
          minWidth: 100,
        },
        {
          title: '检查医生',
          key: 'exam_rdoc',
          minWidth: 100,
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
.checkAssignment {
  padding: 10px;
  height: 100%;
  .checkAssignment-top {
    width: 100%;
    height: 30px;
  }
  .checkAssignment-table {
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
    .checkAssignment-table-transfrom {
      position: absolute;
      width: 100%;
      height: 332px;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      z-index: 3;
      background: #FFFFFF;
      box-shadow: 0 2px 15px 0 rgba(206, 213, 242, 0.7);
      bottom: 0;
      .checkAssignment-table-transfrom-left {
        float: left;
        width: 38%;
        height: 100%;
        border-right: 1px solid #d9d9d9;
      }
      .checkAssignment-table-transfrom-right {
        float: left;
        width: 60%;
        height: 100%;
        border-left: 1px solid #d9d9d9;
        margin-left: 2%;
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
    .checkAssignment-table-transfrom-right-rightClassTransitionFlex{
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
 .checkAssignment-table-transfrom-right-rightClassTransitionFlex:hover{
   cursor: pointer;
   position: absolute;
   background: @tsIconHover;
 }
 .checkAssignment-text {
    line-height: 30px;
    font-size: 12px;
    color: #737373;
    letter-spacing: 0;
  }
 .checkAssignment-input {
    margin-left: 10px;
    display: inline-block;
    flex: 1;

  }
}
</style>