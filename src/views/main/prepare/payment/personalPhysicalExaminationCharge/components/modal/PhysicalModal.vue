/**
* author      : yhy
* cteate      : 2018/02/26 
* description : 体检费用清单
*/
<template>
  <Modal v-model="PhysicalModal"
         class="account-modal"
         :width='578'
         :transfer='false'
         :mask-closable="false"
         :transition-names="['']"
         :closable="false">
    <div slot="header">
      <alert-header :showInput='false'
                    :headerText="'结算费用清单'">
      </alert-header>
    </div>
    <div class="content">
      <div>
        <div class="leftName">体检号</div>
        <Input v-model="editData.unitName"
               class="rightInput"
               style="width: 212px"
               disabled/>
        <div class="rightName">姓名</div>
        <Input v-model="editData.name"
               class="rightInput"
               style="width: 216px"
               disabled/>
      </div>
      <div>
        <div class="leftName">总金额</div>
        <Input v-model="unitName"
               class="rightInput value-price "
               style="width: 105px"
               disabled/>
        <div class="rightName"
             style="width:48px">应收金额</div>
        <Input v-model="unitName"
               class="rightInput value-price "
               style="width: 105px"
               disabled/>
        <div class="rightName"
             style="width:48px">应退金额</div>
        <Input v-model="unitName"
               class="rightInput value-price "
               style="width: 108px"
               disabled/>
      </div>
      <div class="normal-list contentBg">
        <div class="normal-table"
             ref="normalTable">
          <Table stripe
                 :columns="columns1"
                 :data="data1"
                 :height='tableHeightOne'
                 script='true'></Table>
        </div>
      </div>
      <div class="complete-list contentBg"
           v-if="isComplete">
        <div class="complete-header">
          <alert-header-com :titleName="'处方费费用明细'"
                            @closeModal='closeComplete'></alert-header-com>
        </div>
        <div class="complete-table"
             ref="completeTable">
          <Table stripe
                 :columns="columns2"
                 :data="data1"
                 :height='tableHeightTwo'
                 script='true'></Table>
        </div>
      </div>
      <div class="compound-project contentBg"
           v-if="isCompound">
        <div class="compound-header">
          <alert-header-com :titleName="'体检费费用明细'"
                            @closeModal='closeCompound'></alert-header-com>
        </div>
        <div class="compound-table">
          <Table stripe
                 :columns="columns3"
                 :data="data1"
                 :height='tableHeightTwo'
                 script='true'></Table>
        </div>
      </div>
      <div class="unnit-charge contentBg"
           v-if="isUnnit">
        <div class="unnit-header">
          <alert-header-com :titleName="'附加费费用明细'"
                            @closeModal='closeUnnit'></alert-header-com>
        </div>
        <div class="unnit-table">
           <Table stripe
                 :columns="columns4"
                 :data="data1"
                 :height='tableHeightOne'
                 script='true'></Table>
        </div>
      </div>
    </div>
    <div slot="footer">
      <div class="bottom">
        <div class="bottom-right">
          <Button type="primary"
                  class="button"
                  @click="printSure">打印</Button>
          <Button type="ghost"
                  class="button"
                  @click="cancel">取 消</Button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { mapState } from 'vuex'
import AlertHeaderCom from '@/views/main/prepare/components/AlertHeaderCom.vue'
export default {
  name: 'PhysicalModalPerson',
  components: {
    AlertHeaderCom,
  },
  data() {
    return {
      tableHeightOne: 0,
      tableHeightTwo: 0,
      editData: {
        unitName: 'BA201709',
        name: '贾思明',
      },
      isComplete: true,
      isCompound: true,
      isUnnit: true,
      columns1: [
        {
          title: '费用类型',
          key: 'name',
        },
        {
          title: '体检编号',
          key: 'age',
        },
        {
          title: '姓名',
          key: 'age',
        },
        {
          title: '性别',
          key: 'age',
        },
        {
          title: '登记日期',
          key: 'age',
        },
        {
          title: '应收金额',
          key: 'age',
        },
        {
          title: '实收金额',
          key: 'name',
        },
      ],
      columns2: [
        {
          title: '药品名称',
          key: 'name',
        },
        {
          title: '数量',
          key: 'age',
        },
        {
          title: '应收单价（元）',
          key: 'age',
        },
        {
          title: '实收单价（元）',
          key: 'age',
        },
        {
          title: '实收比列（%）',
          key: 'age',
        },
        {
          title: '应收金额（元）',
          key: 'age',
        },
        {
          title: '优惠金额（元）',
          key: 'age',
        },
        {
          title: '实收金额（元）',
          key: 'age',
        },
      ],
      columns3: [
        {
          title: '项目类型',
          key: 'name',
        },
        {
          title: '项目名称',
          key: 'age',
        },
        {
          title: '应收单价（元）',
          key: 'age',
        },
        {
          title: '实收单价（元）',
          key: 'age',
        },
        {
          title: '实收比列（%）',
          key: 'age',
        },
        {
          title: '应收金额（元）',
          key: 'age',
        },
        {
          title: '状态',
          key: 'age',
        },
      ],
      columns4: [
        {
          title: '费用类别',
          key: 'name',
        },
        {
          title: '费用名称',
          key: 'age',
        },
        {
          title: '应收单价（元）',
          key: 'age',
        },
        {
          title: '实收单价（元）',
          key: 'age',
        },
        {
          title: '实收比列（%）',
          key: 'age',
        },
        {
          title: '应收金额（元）',
          key: 'age',
        },
        {
          title: '优惠金额（元）',
          key: 'age',
        },
        {
          title: '实收金额（元）',
          key: 'age',
        },
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
      ],
    }
  },
  props: {
    PhysicalModal: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['windowHeight']),
  },
  methods: {
    printSure() {
      this.$emit('PhysicalModal')
    },
    cancel() {
      this.$emit('update:PhysicalModal', false)
    },
    closeComplete() {
      this.isComplete = false
    },

    closeCompound() {
      this.isCompound = false
    },

    closeUnnit() {
      this.isUnnit = false
    },
    async resetClose() {
      await this.$nextTick()
      this.isComplete = true
      this.isCompound = true
      this.isUnnit = true
      this.tableHeightOne = this.$refs.normalTable.offsetHeight
      console.log('resetClose', this.tableHeightOne)
      this.tableHeightTwo = this.$refs.completeTable.offsetHeight
    },
  },
  watch: {
    windowHeight(val) {
      this.tableHeightOne = this.$refs.normalTable.offsetHeight
      console.log('watch', this.tableHeightOne)
      this.tableHeightTwo = this.$refs.completeTable.offsetHeight
    },
  },
}
</script>

<style lang="less">
.account-modal {
  .ivu-modal {
    height: calc(~'100% - 40px');
    .ivu-modal-content {
      height: 100%;
      .ivu-modal-body {
        height: calc(~'100% - 120px');
        .content {
          // 弹窗中间内容部分
          overflow: auto;
          height: 100%;
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
li {
  height: 50px;
  background: blue;
}
.account-modal {
  .content {
    .leftName {
      vertical-align: top;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      margin: 20px 10px 0 20px;
      display: inline-block;
      text-align: justify;
      width: 36px;
      &::after {
        content: '';
        padding-left: 100%;
        display: inline-block;
      }
    }
    .rightName {
      vertical-align: top;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      margin: 20px 10px 0 20px;
      display: inline-block;
      text-align: justify;
      width: 24px;
      &::after {
        content: '';
        padding-left: 100%;
        display: inline-block;
      }
    }
    .rightInput {
      display: inline-block;
      vertical-align: top;
      margin-top: 20px;
    }
    .value-price {
      position: relative;
      &::after {
        position: absolute;
        content: '元';
        display: inline-block;
        top: 7px;
        right: 10px;
        font-size: 12px;
        color: #737373;
      }
    }
    .normal-list {
      margin-top: 20px;
      overflow: hidden;
      margin-left: 20px;
      margin-right: 20px;
      .normal-table {
        max-height: 160px;
      }
    }
    .complete-list {
      margin-top: 20px;
      overflow: hidden;
      margin-left: 20px;
      margin-right: 20px;
      .complete-table {
        max-height: 200px;
      }
    }
    .compound-project {
      margin-top: 20px;
      overflow: hidden;
      margin-left: 20px;
      margin-right: 20px;
      .compound-table {
        max-height: 200px;
      }
    }
    .unnit-charge {
      margin-top: 20px;
      overflow: hidden;
      margin-left: 20px;
      margin-right: 20px;
      .unnit-table {
        max-height: 160px;
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
