<template>
  <div class="card-modal-wrapper" v-if="showModal">
    <Modal v-model="showModal"
           width="600"
           @on-visible-change="visibleChange"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="true">

      <div slot="header"></div>
      <div slot="close"
           class="close-btn"></div>
      <div class="card-content-wrapper">
        <div class="ccw-header">
          <!-- FIXME: 热区 -->
          <div @click="tabClick(1)"
               :class="{active:styleChange(1)}">单个项目</div>
          <div @click="tabClick(2)"
               :class="{active:styleChange(2)}">组合项目</div>
          <div @click="tabClick(3)"
               :class="{active:styleChange(3)}">病史或小结</div>
          <div @click="tabClick(4)"
               :class="{active:styleChange(4)}">表达式</div>
        </div>
        <div class="ccw-body"
             ref="">
          <div v-if="bodyChange(1)"
               class="normal" ref="tableWrap">
            <!-- <modal-table></modal-table> -->
            <z-table :height="tableHeight"
                   :columns="tableColumns"
                   :data="tableData" @on-row-click="tableClickRow" :pop="false" :isShowSelectOrIndex="false"></z-table>
            <!-- <q-table :height="tableHeight"
                     :width="600"
                     :initReq="false"
                     :ifShowPagination="false"
                     :requestDataApi="getItems"
                     :columns="tableColumns"
                     :data="tableData"
                     :params="tableParams"
                     :pageInfo="tableInfo"
                     :showOperateColumn="false"
                     :isShowSelectOrIndex="false"
                     @on-row-click="tableClickRow">
            </q-table> -->
          </div>
          <div v-else-if="bodyChange(2)"
               class="normal">
               <z-table :height="tableHeight"
                   :columns="groupColumns"
                   :data="groupData" @on-row-click="tableClickRow" :pop="false" :isShowSelectOrIndex="false"></z-table>
<!--                    
            <q-table :height="tableHeight"
                     :width="600"
                     :initReq="false"
                     :ifShowPagination="false"
                     :requestDataApi="getGroupItems"
                     :columns="groupColumns"
                     :data="groupData"
                     :params="groupParams"
                     :pageInfo="groupData"
                     :showOperateColumn="false"
                     :isShowSelectOrIndex="false"
                     @on-row-click="tableClickRow"> -->
            </q-table>
          </div>
          <div v-else-if="bodyChange(3)"
               class="normal">没有接口</div>
          <div v-else-if="bodyChange(4)">
            <div class="ccw-exp-title">
              <div>表达式内容：</div>
              <span>{{expression}}</span>
              <div>
                <Button @click="saveExpress"
                          type="primary"
                          class="marginR20">确 认</Button>
              </div>
            </div>
            <formula :selectData="tableData"
                     :selectColumns="expColumns"
                     @onChange="expressionChange"></formula>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

// import modalTable from './modalTable'
import zTable from '@/components/table/zTable'
export default {
  name: 'cardModal',
  props: {
    show: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  components: {
    zTable,
    // modalTable,
  },
  data() {
    return {
      // showModal: false,
      shwoIndex: 1,
      expression: '',
      express: '',
      // table
      tableHeight: 400,
      tableColumns: [
        {
          title: '单项编号',
          key: 'code',
          width: 140,
        },
        {
          title: '单项名称',
          key: 'name',
          width: 400,
        },
      ],
      tableParams: {},
      groupColumns: [
        {
          title: '组合项目名称',
          key: 'name',
          width: 440,
        },
      ],
      groupParams: {},
      expColumns: [
        {
          title: '单项编号',
          key: 'code',
          width: '40%',
        },
        {
          title: '项目名称',
          key: 'name',
          width: '60%',
        },
        // {
        //   title: '单项编号',
        //   key: 'code',
        //   width: '80px',
        // },
        // {
        //   title: '项目名称',
        //   key: 'name',
        //   width: '120px',
        // },
      ],
    }
  },
  watch: {
    show: function(val) {
      // console.log('watch', val)
      // this.showModal = val
    },
  },
  computed: {
    ...mapState('diagnosticRuleManagementModule', ['items', 'groupItems']),
    tableData() {
      return this.items.items
    },
    tableInfo() {
      return this.items.meta
    },
    groupData() {
      return this.groupItems.items
    },
    groupInfo() {
      return this.groupItems.meta
    },
    showModal() {
      // if (!this.showModal) {s
      //   return false
      // } else {
      // console.log('jisuan ', this.show)
      return this.show
      // }
    },
  },
  async mounted() {
    // await this.getItems({ per_page: 100000 })
    // await this.getGroupItems({ per_page: 100000 })
    await Promise.all([
      this.getItems({ per_page: 100000 }),
      this.getGroupItems({ per_page: 100000 }),
    ])
    // this.tableHeight = this.$refs.tableWrap.offsetHeightoffsetHeight
    // console.log('这里0', this.items)
  },
  methods: {
    ...mapActions('diagnosticRuleManagementModule', [
      'getItems',
      'getGroupItems',
    ]),
    init() {
      this.tabClick(1)
    },
    expressionChange(data, val, pass) {
      this.express = val
      this.expression = data
        .map(function(item) {
          return item.value
        })
        .join('')
    },
    saveExpress() {
      //
      this.onChange(this.express, 3, this.expression)
    },
    onChange(val, type, label) {
      // 销毁状态

      this.$emit('on-change', val, type, label)
      this.$nextTick(function() {
        this.tabClick(1)
        this.express = ''
      })
    },
    // table
    tableClickRow(data, val, i) {
      // TODO: 等待和后台确认字段
      // console.log(data)
      // console.log(val)
      // console.log(i)

      this.onChange(val.id, 1, val.name)
    },
    visibleChange(val) {
      // console.log('change', val)
      // this.showModal = val
      this.$emit('visibleChange', val)
      this.expression = ''
      // this.$nextTick(function() {
      //   // this.tabClick(1)
      //   // this.shwoIndex = 1
      //   this.express = ''
      // })
    },
    change(data) {
      // console.log(data)
      this.showModal = data
    },
    // header
    styleChange(index) {
      if (index === this.shwoIndex) {
        return true
      }
    },
    tabClick(val) {
      this.shwoIndex = val
    },
    // body
    bodyChange(val) {
      if (val === this.shwoIndex) {
        return true
      }
    },
  },
}
</script>

<style lang="less" scoped>

</style>

<style lang="less">
.card-modal-wrapper {
  .close-btn {
    width: 20px;
    height: 20px;
    background: url(/static/icons/public/closeGroupItem.svg) no-repeat;
    background-size: 100%;
    margin-top: 2px;
  }
  .card-content-wrapper {
    .ccw-header {
      display: flex;
      align-items: center;
      height: 40px;
      color: #737373;
      > div {
        height: 100%;
        line-height: 40px;
        margin: 0 20px;
        cursor: pointer;
      }

      .active {
        position: relative;
        color: #008cee;
        font-weight: bold;
      }
      .active:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: #008cee;
      }
    }
    .ccw-exp-title {
      display: flex;
      align-items: center;
      padding-left: 20px;
      min-height: 50px;
      line-height: 1.5;
      border-top: 1px solid #d8d8d8;
      > span {
        flex: 1;
        color: #4a4a4a;
        font-weight: bold;
        word-break: break-all;
        padding-right: 5px;
      }
    }
    .ccw-body {
      width: 100%;
      .normal {
        height: 400px;
        // width:600px;
        // overflow-y: hidden;
      }
    }
  }
}
</style>
