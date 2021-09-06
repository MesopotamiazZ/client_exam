// jyling
<template>
<div class="ManagementSalesmen">
  <div class="ManagementSalesmen-content">
      <div class="ManagementSalesmen-content-left">
        <titletHasSlot>
        <span slot='titletHasSlotLeftTitle'>业务员列表</span>
       </titletHasSlot>
   <div class="table" style="width:100%">
            <handsontable  :columns="columns1" :colHeaders="colHeaders1"  style="text-align:center;height:100%;"></handsontable>
    </div>
  </div>
  <div class="ManagementSalesmen-content-right">
      <titletHasSlot>
        <span slot='titletHasSlotLeftTitle'>人员列表</span>
         <div slot='titletHasSlotRightContent' class="functZone">
          <div class="item">
            <i-input icon="ios-search"  v-model="searchText" @on-enter="enterSearch" @on-click="enterSearch" placeholder="请输入"  style="width: 174px" ></i-input>
          </div>
    <Button type="ghost" class="item" @click="showSaveModal=true">保 存</Button>
    <Button type="ghost" class="item"  @click="showDelModal = true" > 删 除</Button>
    </div>
      </titletHasSlot>
         <div class="table" style="width:100%">
            <handsontable  :columns="columns2" :colHeaders="colHeaders2"  style="text-align:center;height:100%;"></handsontable>
      </div>
  </div>
  </div>
      <div class="saveModal" v-if="showSaveModal">
        <Modal
        v-model="showSaveModal"
        width="296"
        :transition-names="[]"
        :mask-closable="false"
        :transfer="false"
        :closable="false"
        >
        <div slot="header">
            <alert-header headerText="确认提示"  ></alert-header>
        </div>
        <div class="content-only-content">
            <p>确认保存这次修改吗？</p>
        </div>
        <div class="footer">
            <Button type="primary">确 认</Button>
            <Button type="ghost" @click="showSaveModal = false">取 消</Button>
        </div>
      </Modal>
    </div> 
         <div class="delmodal" v-if="showDelModal">
        <Modal
        v-model="showDelModal"
        width="296"
        :transition-names="[]"
        :mask-closable="false"
        :transfer="false"
        :closable="false"
        >
        <div slot="header">
            <alert-header headerText="删除提示"  ></alert-header>
        </div>
        <div class="content-only-content">
            <p>确定删除该人员吗？</p>
        </div>
        <div class="footer">
            <Button type="primary">删 除</Button>
            <Button type="ghost" @click="showDelModal = false" >取 消</Button>
        </div>
      </Modal>
    </div> 
</div>

</template>
<script>
import titletHasSlot from '@/components/titleHasSlot'
import handsontable from '@/components/table/handsontable'
import renderer from '@/service/renderer'
import alertHeader from '@/components/alert/alertHeader'
export default {
  name: 'defineStatistics',
  data () {
    return {
      colHeaders1: ['', '级别', '人数'],
      columns1: [
            {data: '', renderer: renderer.indexRenderer(), width: 2.9, className: 'htCenter htMiddle', readOnly: true},
            {data: 'code', renderer: 'html', width: 8.2, className: 'htCenter htMiddle', readOnly: true},
            { data: 'name', renderer: 'html', width: 3.7, className: 'htCenter htMiddle', readOnly: true },
      ],
      colHeaders2: ['', '人员编号', '级别', '所在部门', '姓名', '性别'],
      columns2: [
            {data: '', renderer: renderer.indexRenderer(), width: 2.7, className: 'htCenter htMiddle', readOnly: true},
            {data: 'code', renderer: 'html', width: 6, className: 'htCenter htMiddle', readOnly: true},
            { data: 'name', renderer: 'html', width: 19.3, className: 'htCenter htMiddle', readOnly: true },
            {data: 'w', renderer: renderer.indexRenderer(), width: 20.3, className: 'htCenter htMiddle', readOnly: true},
            {data: 'q', renderer: 'html', width: 8.3, className: 'htCenter htMiddle', readOnly: true},
            { data: '2', renderer: 'html', width: 8.3, className: 'htCenter htMiddle', readOnly: true },
      ],
      showSaveModal: false,
      showDelModal: false,
    }
  },
  components: {
    titletHasSlot,
    handsontable,
    renderer,
    alertHeader,
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.ManagementSalesmen {
  padding: 10px;
  font-family: 'MicrosoftYaHei';
  background: #f6f7f9;
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 0px;
  .ManagementSalesmen-content {
    height: 100%;
    width: 100%;
     .ManagementSalesmen-content-left {
    display: inline-block;
    height: 100%;
    width: 17.8%;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0 2px 15px 0 rgba(206,213,242,0.70);
    border-radius: 8px;
  }
  .ManagementSalesmen-content-right{
    display: inline-block;
    height: 100%;
    width: 81.1%;
    margin-left: 1.1%;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-shadow: 0 2px 15px 0 rgba(206,213,242,0.70);
    border-radius: 8px;
    .functZone {
      .item {
        display: inline-block;
        margin-left: 10px;
      }
    }
  }
  }
    .saveModal {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      .content-only-content {
          height: 81px;
          position: relative;
          p {
              position: absolute;
              top: 30px;
              font-size: 16px;
              width: 100%;
              text-align: center;
              color: #4A4A4A;
              letter-spacing: 0.07px;
          }
      }
      .ivu-modal-footer {
          display: none;
      }
      .footer {
          position: relative;
          left: 108px;
          width: 188px;
          height: 50px;
          .ivu-btn {
                  width: 72px;
                  margin-right:20.1px; 
              }
          .ivu-btn:last-child {
                  margin-right:0px; 
          }
          .ivu-btn:first-child {
                  background:  #008CEE;
                  color:  #FFFFFF;
          }
      }
  }
    .delmodal {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      .content-only-content {
          height: 81px;
          position: relative;
          p {
              position: absolute;
              top: 30px;
              font-size: 16px;
              width: 100%;
              text-align: center;
              color: #4A4A4A;
              letter-spacing: 0.07px;
          }
      }
      .ivu-modal-footer {
          display: none;
      }
      .footer {
          position: relative;
          left: 108px;
          width: 188px;
          height: 50px;
          .ivu-btn {
                  width: 72px;
                  margin-right:20.1px; 
              }
          .ivu-btn:last-child {
                  margin-right:0px; 
          }
          .ivu-btn:first-child {
                  background:  #008CEE;
                  color:  #FFFFFF;
          }
      }
  }
 
}
</style>