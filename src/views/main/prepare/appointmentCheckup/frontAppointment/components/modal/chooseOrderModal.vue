/**
* author      : yhy zero
* cteate      : 2018/03/01
* description : 预约订单弹窗
*/
<template>
  <Modal v-model="show"
         class="appointment-single-modal "
         :width='708'
         :transfer='false'
         :mask-closable="false"
         :transition-names="['']"
         :closable="false">
    <div slot="header">
      <alert-header :showInput='false'
                    :headerText="'预约订单'">
      </alert-header>
      <div class="close-camera"
           @click='close'></div>
    </div>
    <div class="content">
      <div class="title">
        双击选择下列的预约信息
      </div>
      <Table :columns="columns"
             :data="orders"
             class="table"
             :height='240'
             @on-row-dblclick="handleRowClick"></Table>
    </div>
    </div>
    <div slot="footer">

    </div>
  </Modal>
</template>

<script>
// 依赖文件
import { mapState, mapGetters } from 'vuex'
import { timeFilter } from '@/utils/fifters'

export default {
  name: 'chooseOrderModal',
  data() {
    return {
      columns: [
        {
          width: 88,
          ellipsis: true,
          title: '姓名',
          key: 'name',
          render: (h, params) => {
            return h('div', this.customer.name)
          },
        },
        {
          ellipsis: true,
          title: '体检类别',
          key: 'pe_type',
          render: (h, params) => {
            let value
            if (
              params.row.pe_detail &&
              typeof params.row.pe_detail.pe_type === 'number'
            ) {
              value = params.row.pe_detail.pe_type
            }
            return h('div', this.selectOptionDict.pe_type[value])
          },
        },
        {
          width: 252,
          ellipsis: true,
          title: '体检套餐',
          key: 'pe_package',
          render: (h, params) => {
            let value
            if (params.row.pe_detail && params.row.pe_detail.pe_package) {
              value = params.row.pe_detail.pe_package
            }
            return h('div', value)
          },
        },
        {
          width: 90,
          ellipsis: true,
          title: '预约时间',
          key: 'created_at',
          render: (h, params) => {
            let value
            if (params.row.appointment && params.row.appointment.appt_time) {
              value = params.row.appointment.appt_time
            }
            return h('div', timeFilter(value, 'YYYY-MM-DD'))
          },
        },
        {
          width: 70,
          ellipsis: true,
          title: '来源',
          key: 'order_source',
          render: (h, params) => {
            return h(
              'div',
              this.selectOptionDict.order_source[params.row.order_source],
            )
          },
        },
        {
          ellipsis: true,
          title: '待收金额',
          width: 70,
          key: 'collect_amount',
          render: (h, params) => {
            return h('div', params.row.collect_amount)
          },
        },
      ],
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('update:show', false)
    },
    handleRowClick(row, index) {
      this.$emit('on-select-order', row)
      this.close()
    },
  },
  computed: {
    ...mapState('frontAppointmentModule', ['orders', 'customer']),
    ...mapGetters('frontAppointmentModule', ['selectOptionDict']),
  },
}
</script>

<style lang="less" scoped>
li {
  height: 50px;
  background: blue;
}
.appointment-single-modal {
  .close-camera {
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 16px;
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url(/static/icons/public/closeNormal.svg) no-repeat;
    background-size: 20px;
    &:hover {
      width: 20px;
      height: 20px;
      background: url(/static/icons/public/closeRed.svg) no-repeat;
      background-size: 20px;
    }
  }
  .content {
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    overflow: hidden;
    .title {
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      color: #737373;
      margin-left: 20px;
    }
  }
}
</style>
