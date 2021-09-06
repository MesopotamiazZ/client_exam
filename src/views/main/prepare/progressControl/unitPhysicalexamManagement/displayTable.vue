/* 
*页头展示表格
**jiangyiling */
<template>
<div class="display-table-inside contentBg">
 <!-- <q-table
 :columns="columns"
 :isShowSelectOrIndex="false"
 :data = "tableData" 
 :width="591"
 > -->
 <Table
 :columns="columns"
 :data="unitAllOrder" 
 :height="200"
 stripe
 >

 </Table>
<!--  </q-table> -->
</div>
</template>
<script>
import moment from 'moment'
export default {
  name: 'displayTable',
  props: {
    unitAllOrder: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      // tableData: [
      //   {
      //     unit_name: '和融企业',
      //     appt_time: '1520414681',
      //     created_at: '1520414681',
      //     formula_mode: '支付宝',
      //     number: '100',
      //     remark: '哈哈哈哈哈',
      //     unit_pe_status: 1,
      //   },
      //   {
      //     unit_name: '和融企业',
      //     appt_time: '1520414681',
      //     created_at: '1520414681',
      //     formula_mode: '支付宝',
      //     number: '100',
      //     remark: '哈哈哈哈哈',
      //     unit_pe_status: 1,
      //   },
      // ],
      unitPeStatus: [
        {
          label: '已预约',
          unit_pe_status: 0,
        },
        {
          label: '体检中',
          unit_pe_status: 1,
        },
        {
          label: '已完成',
          unit_pe_status: 2,
        },
        {
          label: '未定义',
          unit_pe_status: 3,
        },
      ],
    }
  },
  computed: {
    columns() {
      return [
        {
          title: '单位名称',
          width: 220,
          key: 'unit_name',
          render: (h, params) => {
            console.log(params)
            return h('span', params.row.unit.name)
          },
        },
        {
          title: '预约日期',
          width: 90,
          key: 'appt_time',
          render: (h, params) => {
            return h(
              'span',
              moment(parseInt(params.row.appt_time) * 1000).format(
                'YYYY-MM-DD',
              ),
              params.row.appt_time
            )
          },
        },
        {
          title: '登记日期',
          width: 90,
          key: 'created_at',
          render: (h, params) => {
            return h(
              'span',
              moment(parseInt(params.row.created_at) * 1000).format(
                'YYYY-MM-DD',
              ),
              params.row.register_time
            )
          },
        },
        {
          title: '结算方式',
          width: 91,
          key: 'formula_mode',
        },
        {
          title: '预约人数（人）',
          width: 100,
          key: 'number',
        },
        {
          title: '状态',
          width: 50,
          key: 'unit_pe_status',
          render: (h, params) => {
            return h('span', this.unitPeStatus[params.row.unit_pe_status].label)
          },
        },
        {
          title: '备注',
          width: 50,
          key: 'remark',
          render: (h, params) => {
            let val = params.row.remarks
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
      ]
    },
  },
  watch: {
    unitAllOrder: {
      handler(newData) {
        console.log('1212', newData)
      },
      deep: true,
    },
  },
  mounted() {
    console.log(moment(parseInt(this.tableData[1].created_at * 1000)).format(
                'YYYY-MM-DD',
              ))
  },
}
</script>
<style lang="less">
.display-table-inside {
    width: 100%;
  .ivu-table-body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
    .ivu-table-fixed-right {
        display: none;
    }
    .z-table-page-box {
      display: none;
    }
}
</style>