/**
* author      : yhy
* cteate      : 2018/03/02
* description : 单位管理
*/
<template>
  <div class="unit-manage-home">
    <div class="wrapper contentBg">
      <title-has-slot>
        <span slot="titletHasSlotLeftTitle">单位管理</span>
        <div slot='titletHasSlotRightContent'
             class="titlet-has-slot-right-content">
          <search-input :searchWidth='350' @on-enter='onEnter' @on-cancel='onEnter' @on-Icon='onEnter'></search-input>
          <template v-if="isChoose">
            <Button type="ghost" class="marginR10" @click='buttonAdd'>新 增</Button>
            <Button type="ghost" @click='buttonChoose'>选 择</Button>
          </template>
          <template v-else>
            <Button type="success" class="marginR10" @click='buttonDetele' :disabled='delBtnDisabled'>删 除</Button>
            <Button type="primary" @click='buttonCancel'>取 消</Button>
          </template>
        </div>
      </title-has-slot>
      <div class="table">
        <q-table ref="zBaseInfoTable"
                 :showOperateColumn="false"
                 :width='1305'
                 :requestDataApi="getUnitListTable"
                 :selectMode='isSelecMode'
                 :columns="columns"
                 :data="unitListuItem"
                 :params="urlParams"
                 :pageInfo="unitListPageInfo"
                 @scroll="scrollIn"
                 @on-row-dbClick='onRowDbClick'
                 @all-selection='tableAllSelect'
                 @edit-row='tableEdit'
                 @delete-row='buttonDetele'>
        </q-table>
      </div>
    </div>

    <!-- 升级vip弹窗 -->
    <!-- <updata-vip-modal :modelRechargeVip.sync='modelRechargeVip'
                      @rechargeVipSure='rechargeVipSure'></updata-vip-modal> -->

    <!-- 删除 -->
    <affirm-del-modal
        :controlModal='deletingUnit.show'
        :delCounts='deletingUnit.delCounts'
        @delCancel='tipModalAffirmIcon'
        @affirmDel='tipModalCancelIcon'>
      </affirm-del-modal>
    <!-- <tip-modal :controlModal="deletingUnit.show"
               :mainContent="tipModalContentIcon"
               @tip-modal-affirm="tipModalAffirmIcon"
               @tip-modal-cancel="tipModalCancelIcon"></tip-modal> -->

    <!-- 新增单位 -->
    <add-unit-modal :addUnitModal='addUnitModal'
                    @add-unit-save='addUnitSave'
                    @add-unit-cancel='addUnitCancel'
                    @add-unit-save-and-edit='addUnitSaveAndEdit'></add-unit-modal>

    <!-- 编辑单位 -->
    <edit-unit-modal :ifShowModal='ifShowModal'
                    @edit-unit-save='editUnitSave'
                    @edit-unit-cancel='editUnitCancel'
                    @edit-unit-save-and-edit='editUnitSaveAndEdit'></edit-unit-modal>
    <!-- 新增部门 -->
    <add-department-modal :addDepartmentModal.sync='addDepartmentModal'
                          @add-department-save='addDepartmentSave'
                          @tree-add='treeAdd'
                          @tree-edit='treeEdit'></add-department-modal>
    <!-- 编辑部门 -->
    <edit-department-modal :ifShowModal.sync='editDepartmentModal'
                          @edit-department-save='editDepartmentSave'
                          @tree-add='treeAdd'
                          @tree-edit='treeEdit'></edit-department-modal>
    <!-- 点击新增车间/部门 -->
    <alertTreeDepartmentModa :alertTreeDepartmentModa.sync='alertTreeDepartmentModa'
                             @tree-sure='treeSure'></alertTreeDepartmentModa>
    <!-- 编辑车间/部门 -->
    <alertEditTreeDepartmentModa :alertEditTreeDepartmentModa.sync='alertEditTreeDepartmentModa'
    :data='editTreeDepartmentModaData'
    @tree-sure='treeEditSure'></alertEditTreeDepartmentModa>

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import updataVipModal from './components/modal/updataVipModal'
// import tipModal from '@/views/main/prepare/components/modal/tipModal'
import addUnitModal from './components/modal/addUnitModal'
import editUnitModal from './components/modal/editUnitModal'
import addDepartmentModal from './components/modal/addDepartmentModal'
import editDepartmentModal from './components/modal/editDepartmentModal'
import alertTreeDepartmentModa from './components/modal/alertTreeDepartmentModa'
import alertEditTreeDepartmentModa from './components/modal/alertEditTreeDepartmentModa'
export default {
  name: 'unitManageHome',
  components: {
    updataVipModal,
    // tipModal,
    addUnitModal,
    editUnitModal,
    addDepartmentModal,
    editDepartmentModal,
    alertTreeDepartmentModa,
    alertEditTreeDepartmentModa,
  },
  data() {
    return {
      /* ================================================删除 */
      deletingUnit: { // 删除单位弹窗
        show: false,
        delCounts: 0, // 删除条数
      },
      delBtnDisabled: true, // 删除按钮
      alertTreeDepartmentModa: false, // 新增树状图
      /* ================================================编辑车间/部门 */
      editTreeDepartmentModaData: {},
      alertEditTreeDepartmentModa: false, // 编辑
      /* ================================================新增部门 */
      addDepartmentModal: false, // 新增部门
      /* ================================================编辑部门 */
      editDepartmentModal: false, // 编辑部门
      /* ================================================新增单位 */
      addUnitModal: false, // 新增单位,
      /* ================================================编辑单位 */
      ifShowModal: false, // 编辑单位
      serachValue: '',
      /* ================================================主页面 */
      isChoose: true, // 是否选择
      isSelecMode: false, // 是否开启编辑模式
      // modelRechargeVip: false, // 升级vip
      // tipModalContentIcon: '确认删除吗',
      place: 'bottom-end',
      morebtn: null, // 控制操作弹窗是否显示
      columns: [
        {
          title: '单位名称',
          key: 'name',
          width: 220,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '经济行业',
          key: 'econ_industry',
          // width: 170,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '经济类型',
          key: 'economic_type_name',
          // width: 125,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '电话号码',
          key: 'mobile',
          width: 99,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '电子邮箱',
          key: 'email',
          width: 172,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '传真号码',
          key: 'fax',
          width: 125,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '单位地址',
          key: 'address',
          width: 200,
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
        {
          title: '操作',
          fixed: 'right',
          width: 94,
          _pop: false,
          render: (h, params) => {
            let self = this
            return h('div', [
              h('img', {
                style: {
                  width: '12px',
                  height: '13px',
                  lineHeight: '13px',
                },
                attrs: {
                  src: self.isSelecMode ? '/static/icons/public/table-edit.svg' : '/static/icons/public/table-hover-edit.svg',
                },
                on: {
                  click() {
                    if (self.isSelecMode) {
                      return false
                    }
                    // console.log('编辑')
                    self.tableEdit()
                  },
                },
              }),
              h('img', {
                style: {
                  width: '12px',
                  height: '13px',
                  lineHeight: '13px',
                  marginLeft: '15px',
                },
                attrs: {
                  src: self.isSelecMode ? '/static/icons/public/table-del.svg' : '/static/icons/public/table-hover-del.svg',
                },
                on: {
                  click() {
                    if (self.isSelecMode) {
                      return false
                    }
                    self.buttonDetele()
                  },
                },
              }),
              h(
                'Poptip',
                {
                  ref: 'PoptipTest',
                  props: {
                    value: this.morebtn === params.index,
                    placement: this.place,
                  },
                  class: self.isSelecMode ? 'stopPop' : 'hasPop',
                  style: {
                    display: 'inline-block',
                    width: '15px',
                    color: '#008cee',
                    marginLeft: '15px',
                  },
                  nativeOn: {
                    click: (e) => {
                      this.morebtn = params.index
                    },
                    mouseenter: e => {
                      // console.log(document.body.clientHeight - e.clientY)
                      if (document.body.clientHeight - e.clientY >= 120) {
                        this.place = 'bottom-end'
                      } else {
                        this.place = 'top-end'
                      }
                    },
                  },
                },
                [
                  h('div', {
                    style: {
                      width: '25px',
                      height: '15px',
                      color: '#008cee',
                      'z-index': '999',
                      background:
                        `url('/static/icons/public/${this.isSelecMode ? 'threePoints.svg' : 'more.svg'}') no-repeat center 10px`,
                    },
                  }),
                  h(
                    'div',
                    {
                      style: {
                        'line-height': '30px',
                      },
                      slot: 'content',
                    },
                    [
                      h(
                        'div',
                        {
                          class: 'slh',
                          on: {
                            click() {
                              self.setSwitchComponent('accountDetailHome')
                            },
                          },
                        },
                        '单位账户详情',
                      ),
                      h(
                        'div',
                        {
                          class: 'slh',
                          on: {
                            click() {
                              self.setSwitchComponent('staffListHome')
                            },
                          },
                        },
                        '查看员工',
                      ),
                    ],
                  ),
                ],
              ),
            ])
          },
        },
      ],
    }
  },
  computed: {
    urlParams() {
      return {
        search: this.serachValue,
      }
    },
    ...mapState(['windowHeight']),
    ...mapGetters('teamPhysicalExaminationModule', [
      'unitListuItem',
      'unitListPageInfo',
    ]),
  },
  methods: {
    treeSure() {
      this.alertTreeDepartmentModa = false
    },
    treeAdd() {
      this.alertTreeDepartmentModa = true
    },
    treeEdit (data) {
        // 显示编辑车间/部门弹窗
        // 将返回的数据赋值给编辑车间/部门弹窗
      console.log(111)
      this.alertEditTreeDepartmentModa = true
      this.editTreeDepartmentModaData = data
    },
    treeEditSure (data) {
      this.alertEditTreeDepartmentModa = false
    },
    /* ==============================================================单位管理表格操作 */
    buttonAdd() { // 新增
      this.addUnitModal = true
    },
    buttonChoose() { // 选择
      this.isChoose = false
      this.isSelecMode = true
    },
    buttonCancel() { // 取消
      this.isChoose = true
      this.isSelecMode = false
    },
    scrollIn() {
      this.morebtn = null
    },
    onRowDbClick() { // 双击表格
      this.setSwitchComponent('staffListHome')
    },
    tableAllSelect (data) { // 选择行
      if (data.length > 0) {
        this.delBtnDisabled = false
      } else {
        this.delBtnDisabled = true
      }
      this.deletingUnit.delCounts = data.length
    },
    tableEdit () { // 编辑
      this.ifShowModal = true
    },
    /* ==================================删除单位弹窗 */
    buttonDetele() { // 删除
      console.log(111)
      this.deletingUnit.show = true
    },
    // 图标删除确认
    tipModalAffirmIcon() {
      this.deletingUnit.show = false
    },
    // 图标删除取消
    tipModalCancelIcon() {
      this.deletingUnit.show = false
    },
    // -------------------------------新增单位-----------------
    addUnitSave() {
      this.addUnitModal = false
    },
    addUnitCancel() {
      this.addUnitModal = false
    },
    // 保存并新增车间/部门
    addUnitSaveAndEdit() {
      this.addDepartmentModal = true
    },
    // -------------------------------编辑单位-----------------
    editUnitSave() {
      this.ifShowModal = false
    },
    editUnitCancel() {
      this.ifShowModal = false
    },
    // 保存并新增车间/部门
    editUnitSaveAndEdit() {
      this.editDepartmentModal = true
    },
    // ----------------------------------新增车间/部门------------
    addDepartmentSave() {
      this.addDepartmentModal = false
    },
    /* ===================================编辑车间/部门 */
    editDepartmentSave() {
      this.editDepartmentModal = false
    },
    // editDepartmentCancel () {
    //   this.editDepartmentModal = false
    // },
    // ---------------------------------模糊搜索----------------
    onEnter(value) {
      this.serachValue = value
    },
    ...mapMutations('teamPhysicalExaminationModule', ['setSwitchComponent']),
    ...mapActions('teamPhysicalExaminationModule', ['getUnitListTable']),
  },
}
</script>

<style lang='less'>
.unit-manage-home {
  .ivu-table-fixed-right {
    width: 94px !important;
  }
  .ivu-table-fixed-body table colgroup col {
    width: 94px !important;
  }
  .handle {
    .ivu-poptip {
      .ivu-poptip-popper {
        right: 10px !important;
        width: 98px;
        .ivu-poptip-body {
          padding: 0;
          width: 100%;
          overflow: hidden;
          text-align: center;
        }
      }
    }
  }
  .stopPop{
    .ivu-poptip-popper{
      display: none;
    }
  }
  .ivu-table-fixed-body {
    position: static !important;
  }
}
</style>
<style lang='less' scoped>
@import (reference) '~assets/less/variable.less';
.unit-manage-home {
  height: 100%;
  // padding: 0 10px 10px 10px;
  padding: 10px;
  .wrapper {
    overflow: hidden;
    height: 100%;
  }
  .table {
    height: calc(~'100% - 50px');
  }
  .slh {
    width: 100%;
    height: 36px;
    line-height: 36px;
    color: #4a4a4a;
  }
  .slh:hover {
    color: #008cee;
    background: @gradeBlueFive;
  }
}
</style>
