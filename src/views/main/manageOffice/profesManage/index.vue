/**
* Created wzd
* Date: 2017/12/05
* Time: 10:54
* content:职务管理
*/
<template>
<div class="officeManagement-wrapper">
  <div class="officeManagement contentBg">
    <div class="officeManagement-inner">
      <div class="officeManagementHeader">
        <div class="officeManagementHeaderTab">
          <ul class="tabs">
            <li class="tab1 marginL20" @click="selectTab1" :class="{active: isTabSelect}">职务列表</li><li class="tab2" @click="selectTab2" :class="{active: !isTabSelect}">党内列表</li>
          </ul>
        </div>
        <div class="Operation fr marginT10">
          <ul class="headerOperation">
            <li><Button type="ghost" class="operationDel marginR10 font12">保&nbsp;存</Button></li>
            <li>
              <Button type="ghost" class="operationAdd marginR20 font12" :disabled="isDel" @click="openDelModal">删&nbsp;除</Button>
            </li>
          </ul>
        </div>
      </div>
      <div class="officeManagementTables">
        <!-- <div class="officeManagementTables-inner"> -->
          <handsontable 
          :data="data1" 
          :colHeaders="colHeaders1" 
          :columns="columns1" 
          @selectRow="selectOneRow1" 
          @editRow="editRow1"
          @deleteRow="deleteRow1"
          @deSelect ="deSelect1"
          :width='1012'
          style="text-align:center" 
          v-show="isTabSelect"
          :height="$store.state.windowHeight-197"></handsontable>
          <handsontable 
          :data="data2" 
          :colHeaders="colHeaders2" 
          @selectRow="selectOneRow2" 
          @editRow="editRow2"
          @deSelect ="deSelect2"
          :columns="columns2" 
          :width='1012'
          style="text-align:center" 
          v-show="!isTabSelect"
          :height="$store.state.windowHeight-197"></handsontable>
        <!-- </div> -->
      </div>
    </div>
  </div>
  <div class="affirmDelModal">
    <Modal v-model="affirmDelModal" :styles='{width:296+"px"}'
    :transition-names='[]'
    :mask-closable="false"
    :transfer='false'
    :closable="false">
      <div slot="header">
        <alert-header :headerText='tipHeaderText'></alert-header>
      </div>
      <p class="pmain">确认删除本条消息吗？</p>
      <div slot="footer">
        <div class="modelFooter marginT20 marginR20">
          <Button type="primary" class="affirmDelBtn marginR20" @click="delOneRow">删&nbsp;除</Button><Button type="ghost" class="cancelDelBtn" @click="delCancel">取&nbsp;消</Button>
        </div>
      </div>
    </Modal>
  </div>
</div>
</template>
<script>
import alertHeader from '@/components/alert/alertHeader'
import handsontable from '@/components/table/handsontable'
export default {
  name: 'defineStatistics',
  components: {
    alertHeader,
    handsontable,
  },
  data () {
    return {
      isTabSelect: true,
      isDel: true,
      tipHeaderText: '提示',
      affirmDelModal: false,
      data1: [
        {code: '1111', name: '健康体检'},
        {code: '3333', name: '健康体检'},
        {code: '222', name: '健康体检'},
        {code: '555', name: '健康体检'},
        {code: '1111', name: '健康体检'},
        {code: '3333', name: '健康体检'},
        {code: '222', name: '健康体检'},
        {code: '555', name: '健康体检'},
        {code: '1111', name: '健康体检'},
        {code: '3333', name: '健康体检'},
        {code: '222', name: '健康体检'},
        {code: '555', name: '健康体检'},
        {code: '1111', name: '健康体检'},
        {code: '3333', name: '健康体检'},
        {code: '222', name: '健康体检'},
        {code: '555', name: '健康体检'},
        {code: '1111', name: '健康体检'},
        {code: '3333', name: '健康体检'},
        {code: '222', name: '健康体检'},
        {code: '555', name: '健康体检'},
        {code: '1111', name: '健康体检'},
        {code: '3333', name: '健康体检'},
        {code: '222', name: '健康体检'},
        {code: '555', name: '健康体检'},
      ],
      colHeaders1: ['', '职务', '人数'],
      columns1: [
        // {data: 'id', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 64},
        {
          data: 'index',
          renderer: function (instance, td, row, col, prop, value, cellProperties) {
            td.innerHTML = row + 1
            td.className += ' htCenter htMiddle'
          },
          className: 'htCenter htMiddle',
          readOnly: true,
          width: 6.8,
        },
        {data: 'code', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 37.2},
        {data: 'name', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 35.2},
      ],
      data2: [
        {code: '老师', name: '健康体检'},
        {code: '13151', name: '健康体检'},
        {code: '13151', name: '健康体检'},
        {code: '13151', name: '健康体检'},
      ],
      colHeaders2: ['', '职务', '人数'],
      columns2: [
        // {data: 'id', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 64},
        {
          data: 'index',
          renderer: function (instance, td, row, col, prop, value, cellProperties) {
            td.innerHTML = row + 1
            td.className += ' htCenter htMiddle'
          },
          className: 'htCenter htMiddle',
          readOnly: true,
          width: 6.8,
        },
        {data: 'code', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 37.2},
        {data: 'name', renderer: 'html', className: 'htCenter htMiddle', readOnly: true, width: 35.2},
      ],
    }
  },
  methods: {
    selectTab1 () {
      this.isDel = true
      this.isTabSelect = true
    },
    selectTab2 () {
      this.isDel = true
      this.isTabSelect = false
    },
    selectOneRow1 (row, data) {
      // 选中一行
      this.isDel = false
    },
    selectOneRow2 (row, data) {
      // 选中一行
      this.isDel = false
    },
    editRow1 () {
      // 右键编辑
    },
    editRow2 () {
      // 右键编辑
    },
    deleteRow1 () {
      // 右键删除
      this.affirmDelModal = true
    },
    deleteRow2 () {
      // 右键删除
      this.affirmDelModal = true
    },
    deSelect1 () {
      // 取消选中
      this.isDel = true
    },
    deSelect2 () {
      // 取消选中
      this.isDel = true
    },
    delCancel () {
      // modal取消删除
      this.affirmDelModal = false
    },
    openDelModal () {
      // 显示确认删除模态框
      this.affirmDelModal = true
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.officeManagement-wrapper {
  padding: 10px;
  // width: 100%;
  position: relative;
  width: 100%;
  height: 100%;
  .officeManagement {
   overflow: hidden;
   height: 100%;
   width: 100%;
  //  margin: 0 auto;
   .officeManagement-inner {
     height: 100%;
     overflow: hidden;
     .officeManagementHeader {
       .officeManagementHeaderTab {
         .tabs {
           li {
             display: inline-block;
             box-sizing: border-box;
             color: #737373;
             cursor: pointer;
             width: 60px;
             height: 50px;
             line-height: 50px;
           }
           .tab1 {
             margin-right: 25px;
             font-size: 14px;
           }
           .tab2 {
             font-size: 14px;
           }
           .active {
             color: #008CEE;
             border-bottom: 3px solid #008CEE;
             font-weight: bold;
           }
         }
       }
       .Operation {
         position: relative;
         top: -50px;
         .headerOperation {
           li {
             display: inline-block;
           }
         }
       }
     }
     .officeManagementTables {
       width: 1015px;
       margin: 0 auto;
       border: 1px solid #D9D9D9;
       border-radius: 8px;
       overflow: hidden;
       position: relative;
       top: -39px;
       .ihandsontable {
         .handsontable {
          //  position: relative;
          //  top: -39px;
          //  border-radius: 7px;
         }
      }
     }
   }
  }
  .affirmDelModal {
    .modelFooter {
      height: 50px;
      Button {
        width: 74px;
        height: 30px;
      }
    }
    .pmain {
      text-align: center;
      font-size: 16px;
      color: #4A4A4A;
      letter-spacing: 0;
      margin-top: 30px;
      margin-Bottom: 20px;
    }
  }
}
</style>
