<template>
  <div class="radiologicalExamConMaintenance-all">
    <div class="radiologicalExamConMaintenance-all-content">
      <!-- 页面头部 -->
      <titlet-hasSlot>
        <span slot="titletHasSlotLeftTitle">职业健康检查种类列表</span>
        <div slot="titletHasSlotRightContent"
             class="content">
          <!-- @on-enter="enterSearch"
                        @on-Icon="enterSearch"
                        @on-cancel="enterSearch" -->
          <search-input class="input"
                        searText="请输入搜索内容"
                        @on-enter="enterSearch"
                        @on-Icon="enterSearch"
                        @on-cancel="enterSearch"
                        :searchWidth='220'></search-input>
          <div v-if='showGroupOut'
               class="group-out">
            <Button type="ghost"
                      class="fl marginR10"
                      @click="addButton">新 增</Button>
            <Button type="ghost"
                      class="fl marginR10"
                      @click="selectButton">选 择</Button>
          </div>
          <div v-else
               class="group-in">
            <Button type="success"
                      :disabled="showDelButton"
                      class="fl marginR10"
                      @click="deleCheckBoxItem">删 除</Button>
            <Button type="ghost"
                      class="fl marginR10">打 印</Button>
            <Button type="primary"
                      class="fl marginR10"
                      @click="cancelButton">取 消</Button>
          </div>
        </div>
      </titlet-hasSlot>
       <!-- 表格 -->
      <div class="table"
           ref="content">
            <q-table ref="baseInfoTable"
                 :selectMode="isSelectMode"
                 :columns="columns"
                 :data="occupHealthExaminationTypesList"
                 :pageInfo="pageInfo"
                 :height="tableHeight"
                 :params="params"
                 :requestDataApi="getManagementList"
                 :ifEdit="true"
                 @edit="editRow"
                 @edit-row='editRow'
                 @delete="delOneRow"
                 @delete-row='delOneRow'
                 @on-selection-change='checkboxSelect'
                 @all-selection="allSelection">
        </q-table>
      </div>
    </div>
  </div>
</template>
<script>
import titletHasSlot from '@/components/titleHasSlot'
export default {
  name: 'radiologicalExamConMaintenance',
  components: {
    titletHasSlot,
  },
  data() {
    return {
      showDelButton: true,
      showGroupOut: true,
      isSelectMode: false,
    }
  },
  methods: {
    async addButton() {
      /* if (!this.itemNameList.length) {
        await this.getNameList({ with: 'itemType:name', per_page: 100000 })
      }
      this.totalsort = this.pageInfo.total + 1 */
      /* this.addModalDiv = true */
      /* this.addModal.data.name = ''
      this.addModal.data.remark = '' */
    },
    async enterSearch(val) {
     /*  if (!val && !this.searchText) {
        return
      }
      this.params.search = val
      await this.$refs.baseInfoTable.request()
      this.checkboxId = []
      this.searchText = val */
    },
    selectButton() {
      this.showGroupOut = !this.showGroupOut
      /* this.isSelectMode = !this.isSelectMode */
    },
    cancelButton() {
      this.showGroupOut = !this.showGroupOut
      /* this.isSelectMode = !this.isSelectMode
      this.$refs.baseInfoTable.allSelection = []
      this.checkboxId = [] */
    },
    deleCheckBoxItem() {
      /* this.controlModal = true
      this.deletItemLength = this.checkboxId.length
      this.clickId = null */
    },
  },
}
</script>
<style lang="less" >
@import (reference) '~assets/less/variable.less';
.radiologicalExamConMaintenance-all {
  padding: 10px;
  background: #fff;
  position: relative;
  width: 100%;
  height: 100%;
  .radiologicalExamConMaintenance-all-content {
    border: 1px solid #d9d9d9;
    box-shadow: 0 2px 15px 0 rgba(206, 213, 242, 0.7);
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
    height: 100%;
    .titlet-has-slot {
      overflow: visible;
      .paddingT10 {
        height: 50px;
        .content {
          height: 30px;
          display: flex;
          .title {
            display: inline-block;
            line-height: 30px;
            font-size: 12px;
            margin-right: 10px;
          }
          .select {
            vertical-align: top;
            margin-right: 20px;
          }
          .input {
            vertical-align: top;
            margin-right: 20px;
          }
          .group-out {
            height: 30px;
            button:last-child {
              margin-right: 0px;
            }
          }
          .group-in {
            button:last-child {
              margin-right: 0px;
            }
          }
        }
      }
    }
  }
}
</style>