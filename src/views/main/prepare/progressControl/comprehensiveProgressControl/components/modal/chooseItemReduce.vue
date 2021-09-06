/*
*选择项目
*@author ljl
*@date 2018/3/10
*/
<template>
<div v-if="modelBatchChoose">
  <div v-if="chooseProject">
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
          <!-- <Table :columns="columns" @on-row-click="clickRow" :data="datas" stripe ellipsis class="table-in"></Table> -->
          <div class="error-list-content">
            <ul class="error-list-title error-list-content-public flex">
              <li v-for="itemTitle in columns" :key="itemTitle.key">
                <div>{{ itemTitle.title }}</div>
              </li>
            </ul>
            <ul class="error-list-content-data">
              <li class="curPointer" :class='{active: index===indexData}' v-for="(item,index) in datas" :key="index" @click='clickLine(index,datas[index])'>
                <ul class="error-list-content-public flex">
                  <li class='overflowEllipsis' :title='item[item2.key]' v-for="(item2,index) in columns">
                    <div>{{ item[item2.key] }}</div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div class="bottom">
          <div class="bottom-right">
            <Checkbox class="chekBox" v-model="chekBoxValue" true-value=1 false-value=0 style="margin-right: 25px;line-height:center;">
              打印缴费凭证
            </Checkbox>
            <Button type="primary"
                    class="button"
                    :disabled="saveDisabled"
                    @click="sureChooseItem">保 存</Button>
            <Button type="ghost"
                    class="button"
                    @click="cancelChooseItem">取 消</Button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
  <iframe id='iframePrint' src="/static/jianqian/缴费凭条.html" frameborder="0" style="display:none;"></iframe>
  <tip-modal :controlModal="!chooseProject" :mainContent="'确认给'+tipContent+'人减去'+addProject+'吗？'" @tip-modal-affirm="sure" @tip-modal-cancel="cancel"></tip-modal>  
</div>
  

</template>

<script>
// import tipModal from '../../../../components/modal/tipModal'
export default {
  name: 'choose-item',
  components: {
    // tipModal,
  },
  data() {
    return {
      saveDisabled: true,
      addProject: '',
      indexData: null,
      modelChooseItem: '',
      chekBoxValue: '1',
      keyword: '',
      chooseProject: true,
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
    // editData: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       data_code: '',
    //       count: 1, // 总条数
    //       filename: '文件1', // 所属文件名称
    //       _error: [
    //         {
    //           row: 1, // 行
    //           line: 2, // 列
    //           info: '错误详情', // 详情
    //         },
    //       ],
    //     }
    //   },
    // },
    modelBatchChoose: {
      type: Boolean,
      default: false,
    },
    tipContent: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    clickLine (index, data) {
      this.saveDisabled = false
      this.indexData = index
      this.addProject = data.name
      // console.log('aas')
      // this.$emit('error-choose-data')
    },
    sureChooseItem() {
      this.chooseProject = false
    },
    cancelChooseItem() {
      this.chooseProject = true
      this.$emit('cancel')
      this.indexData = null
      this.addProject = null
      this.chekBoxValue = '1'
      this.keyword = ''
      this.saveDisabled = true
    },
    cancel() {
      this.chooseProject = true
    },
    async sure() {
      this.chooseProject = true
      this.indexData = null
      this.addProject = null
      this.chekBoxValue = '1'
      this.keyword = ''
      this.saveDisabled = true
      let a = document.getElementById('iframePrint')
      a.contentWindow.print()
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
      position: relative;
      &::after{
        content:"";
        position: absolute;
        height:100%;
        border-right: 1px solid @gradeAshFive;
        top:0px;
        right:106px;
      }
      .error-list-content-public {
        // width: 100%;
        text-align: center;
        border: 2px solid transparent;
        &>li {
          height: 36px;
          line-height: 36px;
          border-right: 1px solid @gradeAshFive;
          padding-left: @num10;
          padding-right: @num10;
        }
        &>li:nth-of-type(1) {
          width: 292px;
        }
        &>li:nth-last-of-type(1) {
          border-right: none;
          flex: 1;
        }
      }
      .active {
        .error-list-content-public {
          border-color: @gradeBlueOne;
        }
      }
      .error-list-content {
        height: calc(~'100% - 50px');
        width: 100%;
        // overflow-x: auto;
        .error-list-title {
          width: 100%;
          height: 40px;
          line-height: 40px;
          background-color: @tableTh;
          color: @gradeAshOne;
          // li {
          //   border-right: @gradeAshFive;
          // }
        }
        .error-list-content-data {
          max-height:360px;
          overflow-y: auto;
          width: 100%;
          // &>li {
          //   width: 100%;
          //   // outline: 1px solid red;
          // }
          &>li:nth-of-type(2n) {
            background-color: @tableTr;
          }
        }
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

