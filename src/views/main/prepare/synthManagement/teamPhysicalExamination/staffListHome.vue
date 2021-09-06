/**
* author      : yhy
* cteate      : 2018/03/02
* description : 员工列表
*/
<template>
  <div class="staff-list-home">
    <div class="wrapper ">
      <bread @button-first='buttonFirstBread' :secondTitle="'员工列表'"></bread>
      <div class="staff-list-home-content contentBg">
        <div class="info">
          <div class="unit-name">中国石油化工股份有限公司</div>
          <div class="unit-first">
            <div class='com' style="width:210px">经济行业：国有企业</div>
            <div class='com' style="width:210px">经济类型：国有企业</div>
            <div class='com' style="width:60px">电话号码：</div>
            <div class='com' style="width:123px;font-weight:bold;">13338255535</div>
            <div class='com'>传真号码：8652452642565</div>
          </div>
          <div class="unit-second">
            <div class='com' style="width:210px">电子邮箱：553277091@163.com</div>
            <div class='com' style="width:400px">单位地址：成都市武侯区武科东路西部智谷A区1-1</div>
            <div class='com'>备注：三位员工离职未体检</div>
          </div>
        </div>
        <div class="border"></div>
        
        <title-has-slot class="title-has-slot">
          <span slot="titletHasSlotLeftTitle">员工列表</span>
          <div slot='titletHasSlotRightContent' class="titlet-has-slot-right-content">
            <search-input :searchWidth='350'></search-input>
            <template v-if="isChoose">
              <Button type="ghost" class="marginR10" @click='buttonExcel'>表格导入备单</Button>
              <Button type="ghost" class="marginR10" @click='buttonImportStaff'>导入员工</Button>
              <Button type="ghost" class="marginR10" @click='buttonAdd'>新 增</Button>
              <Button type="ghost" @click='buttonChoose'>选 择</Button>
            </template>
            <template v-else>
              <div class="readey-wrapper" v-clickoutside="handlerClick">
                <div class="ready" @click='isMask = !isMask'>
                  <Button class="ready-image" type="ghost" :disabled='delBtnDisabled'>备 单</Button>
                  <icon name='angle-down' class="angle-down" :class="{enableIcon:delBtnDisabled}"></icon>
                </div>
                <div class="mask-wrapper" v-show="isMask">
                  <div @click="buttonHealth">健康体检备单</div>
                  <div @click="buttonProfession">职业体检备单</div>
                  <div @click="buttonRadiate">放射工作人员职业健康检查备单</div>
                </div>
              </div>
              <Button type="success" class="marginR10" :disabled='delBtnDisabled' @click='buttonDetele'>删 除</Button>
              <Button type="primary" @click='buttonCancel'>取 消</Button>
            </template>
          </div>
        </title-has-slot>
        <div class="table">
          <q-table ref="zBaseInfoTable"
                    :width='1201'
                   :showOperateColumn="true"
                   :requestDataApi="getStaffListTable"
                   :selectMode='isSelecMode'
                   :columns="columns"
                   :data="staffListItem"
                   :pageInfo="staffListPageInfo"
                   :params='params'
                   @all-selection='tableAllSelect'
                   @edit='editTable'
                   @edit-row='editTable'
                   @delete='deleteTable'
                   @delete-row='deleteTable'>
          </q-table>
        </div>
      </div>

    </div>
    <!-- 新增员工 -->
    <addEmployees :ifShowModal='addEmployessModal' @cancel-data='buttonEmployessAddCancel'></addEmployees>

    <!-- 修改员工 -->
    <editEmployees :ifShowModal='editEmployessModal' @cancel-data='buttonEmployessEditCancel'></editEmployees>

    <!-- 删除 -->
    <!-- <tip-modal :controlModal="tipModalControlIcon"
               :mainContent="tipModalContentIcon"
               @tip-modal-affirm="tipModalAffirmIcon"
               @tip-modal-cancel="tipModalCancelIcon"></tip-modal> -->
    <affirm-del-modal
        :controlModal='delModalTable.show'
        :delCounts='delModalTable.delCounts'
        @delCancel='tipModalAffirmIcon'
        @affirmDel='tipModalCancelIcon'>
      </affirm-del-modal>
    <!-- 健康体检备单 -->
    <healthyExamRemarkInvoices :controlModal='healthyExamRemarkInvoices' @cancel="healthyExamRemarkInvoices=false" @send="healthyExamRemarkInvoices=false"></healthyExamRemarkInvoices>
    <!-- 放射体检备单 -->
    <radiationExamRemarkInvoices :controlModal='radiationExamRemarkInvoices' @cancel="radiationExamRemarkInvoices=false" @send="radiationExamRemarkInvoices=false"></radiationExamRemarkInvoices>
    <!-- 职业体检备单 -->
    <proExamRemarkInvoices :controlModal='proExamRemarkInvoices' @cancel="proExamRemarkInvoices=false" @send="proExamRemarkInvoices=false"></proExamRemarkInvoices>
  </div>
</template>

<script>
import bread from '@/views/main/prepare/components/bread'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import addEmployees from './components/modal/addEmployees'
import editEmployees from './components/modal/editEmployees'
// import tipModal from '@/views/main/prepare/components/modal/tipModal'
import healthyExamRemarkInvoices from './components/modal/healthyExamRemarkInvoices'
import radiationExamRemarkInvoices from './components/modal/radiationExamRemarkInvoices'
import proExamRemarkInvoices from './components/modal/proExamRemarkInvoices'
export default {
  name: 'staffListHome',
  components: {
    // tipModal,
    bread,
    addEmployees,
    editEmployees,
    healthyExamRemarkInvoices,
    radiationExamRemarkInvoices,
    proExamRemarkInvoices,
  },
  data() {
    return {
      proExamRemarkInvoices: false,
      radiationExamRemarkInvoices: false,
      healthyExamRemarkInvoices: false,
      // tipModalControlIcon: false, // 删除
      // tipModalContentIcon: '确认删除吗',
      delBtnDisabled: true, // 删除按钮
      delModalTable: { // 表格的删除
        show: false,
        delCounts: 0,
      },
      isSelecMode: false,
      addEmployessModal: false, // 新增员工
      editEmployessModal: false, // 编辑员工
      isChoose: true,
      isMask: false,
      columns: [
        {
          title: '姓名',
          key: 'realname',
          // width: 100,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '性别',
          key: 'sex',
          width: 44,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '年龄',
          key: 'age',
          width: 44,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '车间/部门',
          key: 'dept_id',
          width: 126,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '职务',
          key: 'job',
          // width: 126,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '联系电话',
          key: 'mobile',
          width: 94,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '工种',
          key: 'occup_type_name',
          width: 126,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '总工龄（年）',
          key: 'total_work_age',
          width: 88,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '接害工龄（年）',
          key: 'injury_age',
          // width: 106,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '危害因素',
          key: 'factor_name',
          width: 220,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '备注',
          key: 'remark',
          width: 50,
          align: 'center',
          ellipsis: true,
          render: (h, params) => {
            let val = params.row.remark
            if (val) {
              return h('remark-in-table', {
                props: {
                  text: val,
                },
              })
            }
            return ''
          },
        },
      ],
    }
  },
  methods: {
    // -------------------------主界面按钮----------------------
    buttonExcel() { // 表格导入备单
      this.setSwitchComponent('formImportSheet')
    },
    buttonImportStaff() { //  导入员工
      this.setSwitchComponent('tableStaffIntroduction')
    },
    buttonAdd() { // 新增
      this.addEmployessModal = true
    },
    buttonChoose() { // 选择
      this.isChoose = false
      this.isSelecMode = true
    },
    buttonCancel() { // 取消
      console.log()
      this.isChoose = true
      this.isSelecMode = false
    },
    buttonHealth() { // 健康体检备单
      this.healthyExamRemarkInvoices = true
    },
    buttonDetele() { // 删除
      this.delModalTable.show = true
    },
    deleteTable() { // 列删除
      this.delModalTable.show = true
    },
      // 图标删除确认
    tipModalAffirmIcon() {
      this.delModalTable.show = false
    },
    // 职业体检备单
    buttonProfession() {
      this.proExamRemarkInvoices = true
    },
    // 图标删除取消
    tipModalCancelIcon() {
      this.delModalTable.show = false
    },
    //  放射体检备单
    buttonRadiate() {
      this.radiationExamRemarkInvoices = true
    },
    //  ------------------------表格操作-------------------
    tableAllSelect (data) {
      if (data.length > 0) {
        this.delBtnDisabled = false
      } else {
        this.delBtnDisabled = true
      }
      this.delModalTable.delCounts = data.length
    },
    // 列编辑
    editTable() {
      this.editEmployessModal = true
    },
    // -------------------新增员工取消--------------------
    buttonEmployessAddCancel() {
      this.addEmployessModal = false
    },
    // -------------------编辑员工取消--------------------
    buttonEmployessEditCancel() {
      this.editEmployessModal = false
    },

    // 导航按钮
    buttonFirstBread() {
      this.setSwitchComponent('unitManageHome')
    },
    handlerClick() {
      this.isMask = false
    },
    ...mapMutations('teamPhysicalExaminationModule', ['setSwitchComponent']),
    ...mapActions('teamPhysicalExaminationModule', ['getStaffListTable']),
  },
  computed: {
    ...mapGetters('teamPhysicalExaminationModule', [
      'staffListItem',
      'staffListPageInfo',
    ]),
    params() {
      return {}
    },
  },
}
</script>

<style lang='less'>
@import (reference) '~assets/less/variable.less';
.staff-list-home {
  height: 100%;
  padding: 0 10px 10px 10px;
  .wrapper {
    height: 100%;
    .staff-list-home-content {
      overflow: hidden;
      height: calc(~'100% - 50px');
      // background-color: lightpink;
      .info {
        height: 125px;
        padding-top: 20px;
        .unit-name {
          font-size: 18px;
          color: #4a4a4a;
          font-weight: bold;
          margin-left: 20px;
        }
        .unit-first {
          margin-left: 20px;
          margin-top: 10px;
          font-size: 12px;
          color: #737373;
        }
        .unit-second {
          margin-left: 20px;
          margin-top: 15px;
          font-size: 12px;
          color: #737373;
        }
        .com {
          display: inline-block;
        }
      }
      .border{
        height: 1px;
        background-color:#D9D9D9;
      }
      .title-has-slot {
        overflow: visible;
        .readey-wrapper {
          display: inline-block;
          position: relative;
          vertical-align: top;
          .ready {
            cursor: pointer;
            vertical-align: top;
            margin-right: 10px;
            position: relative;
            display: inline-block;
            .ready-image {
              &>span {
                margin-left: -12px;
              }
            //   font-size: 12px;
            //   display: inline-block;
            //   width: 74px;
            //   height: 30px;
            //   border: 1px solid #008cee;
            //   border-radius: 4px;
            //   color: #008cee;
            //   line-height: 30px;
            //   padding-left: 15px;
            }
            .angle-down {
              position: absolute;
              top: 9px;
              right: 7px;
              width: 20px;
              color: @gradeBlueOne;
            }
            .enableIcon {
              color: #bbbec4;
            }
          }
          .mask-wrapper {
            z-index: 999;
            background: white;
            position: absolute;
            top: 33px;
            right: -50px;
            display: inline-block;
            width: 197px;
            height: 108px;
            border: 1px solid @gradeAshFive;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.12), 0 0 6px 0 rgba(0,0,0,0.04);
            border-radius: 2px;
            div {
              text-align: center;
              font-size: 12px;
              color: #4a4a4a;
              height: 36px;
              line-height: 36px;
              &:hover {
                cursor: pointer;
                background: #dff0ff;
              }
            }
            div:nth-of-type(2n) {
              background-color: @tableTr;
            }
          }
        }
      }
      .table {
        height: calc(~'100% - 175px');
        // background: lightpink;
      }
    }
  }
}
</style>

