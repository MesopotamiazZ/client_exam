/**
* author      : 覃凤
* cteate      : 2018/03/12 
* description : 编辑车间/部门
*/
<template>
<div v-if="ifShowModal">
  <Modal v-model="ifShowModal"
         class="edit-department-modal"
         :width='810'
         :transfer='false'
         :mask-closable="false"
         :transition-names="['']"
         :closable="false">
    <div slot="header">
      <alert-header :showInput='false' headerText="编辑车间/部门">
      </alert-header>
    </div>
    <div class="content">
      <div class="title">中国石油化工股份有限公司</div>
      <div class="wrapper contentBg">
        <div class="tree marginR10">
          <s-tree ref="tree" :data='treeData' @on-adds="treeAdd" @on-deletes="treeDelete"></s-tree>
        </div>
        <div class="table">
          <title-has-slot class="title-has-slot">
            <span slot="titletHasSlotLeftTitle">车间/部门管理</span>
            <div slot='titletHasSlotRightContent'
                 class="titlet-has-slot-right-content">
              <template v-if="isChoose">
                <Button type="ghost" class="marginR10" @click='buttonAdd'>新 增</Button>
                <Button type="ghost" class="marginR10" @click='buttonPrint'>导 出</Button>
                <Button type="ghost" @click='buttonChoose'>选 择</Button>
              </template>
              <template v-else>
                <Button type="success" class="marginR10 " @click='buttonDetele' :disabled='delBtnDisabled'>删 除</Button>
                <Button type="primary" @click='buttonCancel'>取 消</Button>
              </template>
            </div>
          </title-has-slot>
          <q-table ref="zBaseInfoTable"
                    key="editDepartmentModal"
                   :ifShowPagination='false'
                   :showOperateColumn="true"
                   :requestDataApi="getDepartmentListTable"
                   :selectMode='isSelecMode'
                   :columns="columns1"
                   :data="departmentListItem"
                   :pageInfo="departmentListPageInfo"
                   @all-selection='tableAllSelect'
                   @delete-row='buttonDetele'
                   @delete='buttonDetele'
                   @edit='editIcon'
                   @edit-row='editIcon'>
          </q-table>
        </div>
      </div>

    </div>
    <div slot="footer">
      <div class="bottom">
        <div class="bottom-right">
          <Button type="primary" class="button" @click="sure">保 存</Button>
          <Button type="ghost" class="button" @click="cancel">取 消</Button>
        </div>
      </div>
    </div>
  </Modal>

  <!-- 删除提示 -->
    <affirm-del-modal 
      :modalWidth="355"
      :showFooter="false"
      :closable="true"
      :controlModal="delModal.show"
      @delCancel="delModal.show=false"
      @affirmDel="tipModalAffirmIcon"
      :rests="false"
      :content="delModal.text"
      @on-visible-change="tipModalCancelIcon">
    </affirm-del-modal>
  <!-- <tip-modal :controlModal="delModal.show"
              :mainContent="delModal.text"
              @tip-modal-affirm="tipModalAffirmIcon"
              @tip-modal-cancel="tipModalCancelIcon"></tip-modal> -->
  <!-- 表格删除 -->
    <affirm-del-modal
        :controlModal='delModalTable.show'
        :delCounts='delModalTable.delCounts'
        @delCancel='delModatTabelCancel'
        @affirmDel='delModatTabelCommit'>
      </affirm-del-modal>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import tipModal from '@/views/main/prepare/components/modal/tipModal'
export default {
  name: 'edit-department-modal',
  components: {
    // tipModal,
  },
  props: {
    ifShowModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSelecMode: false, // 表格是否处于多选状态
      isChoose: true,
      // alertTreeDepartmentModa: false,
      controlModal: false,
      delBtnDisabled: true, // 删除按钮
      delModalTable: { // 表格的删除
        show: false,
        delCounts: 0,
      },
      delModal: {
        show: false,
        text: '该区域包含有部门，无法删除。',
      },
      treeData: [
        {
          title: '全部',
          expand: true,
          children: [
            {
              title: '行政部',
              expand: true,
              children: [
                {
                  title: '考勤部',
                },
                {
                  title: '后勤部',
                },
              ],
            },
          ],
        },
      ],
      columns1: [
        {
          title: '车间/部门',
          key: 'department',
          // width: 362,
          align: 'center',
          ellipsis: true,
        },
        {
          title: '显示顺序',
          key: 'number',
          width: 70,
          align: 'center',
          ellipsis: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters('teamPhysicalExaminationModule', [
      'departmentListItem',
      'departmentListPageInfo',
    ]),
  },
  methods: {
    /* ================================================表格上部操作 */
    buttonAdd() { // 新增
      console.log(111)
      this.$emit('tree-add')
    },
    buttonPrint() { // 打印
      console.log()
    },
    buttonChoose() { // 选择
      this.isChoose = false
      this.isSelecMode = true
    },
    buttonCancel() { // 取消
      this.isChoose = true
      this.isSelecMode = false
    },
    /* =================================================表格操作 */
    tableAllSelect (data) {
      if (data.length > 0) {
        this.delBtnDisabled = false
      } else {
        this.delBtnDisabled = true
      }
      this.delModalTable.delCounts = data.length
    },
    buttonDetele() { // 删除
      this.delModalTable.show = true
    },
    delModatTabelCancel () {
      this.delModalTable.show = false
    },
    delModatTabelCommit () {
      this.delModalTable.show = false
    },
    editIcon (data) { // 编辑
      this.$emit('tree-edit', data)
    },
    /* =========================================================树状图 */
    treeSure() {
      this.$emit('tree-sure')
    },
    // 树状图添加
    treeAdd() {
      this.$emit('tree-add')
    },
    // 树状图删除
    treeDelete() {
      console.log('删除')
      this.delModal.show = true
    },
    tipModalAffirmIcon () { // 树状删除弹窗确认
      this.delModal.show = false
    },
    tipModalCancelIcon(val) { // 树状弹窗取消
      this.delModal.show = val
    },
    /* ========================================================弹窗操作 */
    sure() {
      this.$emit('edit-department-save')
    },
    cancel() {
      this.$emit('update:ifShowModal', false)
    },
    ...mapActions('teamPhysicalExaminationModule', ['getDepartmentListTable']),
  },
}
</script>

<style lang="less">
.edit-department-modal {
  .ivu-modal {
    height: calc(~'100% - 40px');
    max-height: 599px;
    .ivu-modal-content {
      height: 100%;
      .ivu-modal-body {
        height: calc(~'100% - 120px');
        .content {
          // 弹窗中间内容部分
          overflow: auto;
          height: 100%;
          .wrapper {
            height: calc(~'100% - 60px');
          }
          .table {
            height: 100%;
            .custom-defined-table {
              height: calc(~'100% - 50px');
            }
          }
          .ivu-table-fixed-body {
            height: 100%!important;
          }
        }
      }
    }
  }
  .ivu-table-fixed-right {
    width: 70px !important;
  }
  .ivu-table-fixed-body table colgroup col {
    width: 70px !important;
  }
  // .ivu-table {
  //   .ivu-table-fixed-right {
  //     .ivu-table-fixed-header {
  //       th {
  //         .ivu-table-cell {
  //           margin-left: -50px;
  //         }
  //       }
  //     }
  //     .ivu-table-fixed-body {
  //       .ivu-table-row {
  //         &>td{
  //           &>div {
  //             width: 70px;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>

<style lang="less" scoped>
@import (reference) '~assets/less/variable.less';
.edit-department-modal {
  .content {
    .title {
      height: 60px;
      font-size: 14px;
      color: #4a4a4a;
      line-height: 60px;
      font-weight: bold;
      margin-left: 20px;
    }
    .wrapper {
      display: flex;
      overflow: hidden;
      margin-left: 20px;
      margin-right: 20px;
      .tree {
        width: 207px;
        border-right: 1px solid @gradeAshFive;
        background-color: #F2F7FF;
      }
      .table {
        width: 550px;
        border-left: 1px solid @gradeAshFive;
        // background: black;
      }
    }
  }
  .bottom {
    height: 70px;
    .bottom-right {
      .button {
        margin-top: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>
