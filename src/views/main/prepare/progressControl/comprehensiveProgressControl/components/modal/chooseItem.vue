/*
*选择项目
*@author ljl
*@date 2018/3/10
*/
<template>
  <div v-if="modelChooseItem">
    <Modal v-model="modelChooseItem"
           class="model-choose-item"
           :width='400'
           :transfer='false'
           :mask-closable="false"
           :transition-names="['']"
           :closable="false">
      <div slot="header">
        <alert-header :showInput='false'
                      :headerText="'选择项目'">
        </alert-header>
      </div>
      <div class="content">
        <div class="content-top">
          <Input class="search" v-model="keyword" icon="ios-search" placeholder="请输入搜索内容"></Input>
        </div>
        <div class="content-table">
          <Table :columns="columns" :data="datas" stripe ellipsis class="table-in"></Table>
        </div>
      </div>
      <div slot="footer">
        <div class="bottom">
          <div class="bottom-right">
            <Checkbox class="chekBox" v-model="chekBoxValue" style="margin-right: 25px;line-height:center;">
            打印缴费凭证
          </Checkbox>
            <Button type="primary"
                    class="button"
                    @click="sure">保 存</Button>
            <Button type="ghost"
                    class="button"
                    @click="cancel">取 消</Button>
          </div>
        </div>
      </div>
    </Modal>
  </div>

</template>

<script>
export default {
  name: 'choose-item',
  data() {
    return {
      selectedData: '',
      columns: [
        {
          key: 'name',
          title: '项目名称',
          width: 292,
        },
        {
          key: 'price',
          title: '价格（元）',
        },
      ],
      datas: [
        {name: '内科检查', price: '600.00'},
        {name: '血常规', price: '1200.00'},
        {name: '内科检查', price: '600.00'},
        {name: '血常规', price: '1200.00'},
        {name: '内科检查', price: '600.00'},
        {name: '血常规', price: '1200.00'},
        {name: '内科检查', price: '600.00'},
        {name: '血常规', price: '1200.00'},
        {name: '内科检查', price: '600.00'},
        {name: '血常规', price: '1200.00'},
        {name: '内科检查', price: '600.00'},
        {name: '血常规', price: '1200.00'},
      ],
    }
  },
  props: {
    modelChooseItem: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    sure() {
      this.$emit('sure')
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.model-choose-item {
  .content {
    margin-bottom:20px;
    .content-top{
      height:50px;
      .search{
        width:294px;
        margin:10px 53px;
        .ivu-input-icon{
          color:#008CEE;
        }
      }
    }
    .content-table{
      .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
        background-color: #f2f7ff;
      }
      .ivu-table-wrapper .ivu-table-body{
        max-height:360px;
        overflow-y: auto;
        overflow-x: hidden!important;
      }
    }
    .left-name {
      vertical-align: top;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      margin: 20px 10px 0 20px;
      display: inline-block;
      text-align: justify;
      width: 48px;
      color: @gradeAshThree;
      &::after {
        content: '';
        padding-left: 100%;
        display: inline-block;
      }
    }
    textarea.ivu-input {
      height: 90px !important;
    }
    .right-input {
      display: inline-block;
      vertical-align: top;
      margin-top: 20px;
    }
  }
  .bottom {
    height: 50px;
    .bottom-right {
      .button {
        // margin-top: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>

