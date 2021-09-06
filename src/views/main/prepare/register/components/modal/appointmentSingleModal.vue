/**
* author      : yhy
* cteate      : 2018/03/01
* description : 预约订单弹窗
*/
<template>
  <Modal v-model="appointmentSingleModal"
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
        点击选择下列的预约信息
      </div>
      <!-- <div class="table"> -->
      <Table :columns="columns1"
             :data="data1"
             class="table"
             :height='240'></Table>
      <!-- </div> -->
    </div>
    </div>
    <div slot="footer">

    </div>
  </Modal>
</template>

<script>
export default {
  name: 'appointmentSingleModal',
  data() {
    return {
      columns1: [
        {
          width: 88,
          ellipsis: true,
          title: '姓名',
          key: 'name',
        },
        {
          ellipsis: true,
          title: '体检类别',
          key: 'physicalType',
        },
        {
          width: 252,
          ellipsis: true,
          title: '体检套餐',
          key: 'combo',
        },
        {
          width: 90,
          ellipsis: true,
          title: '预约时间',
          key: 'time',
        },
        {
          width: 70,
          ellipsis: true,
          title: '来源',
          key: 'from',
        },
        {
          ellipsis: true,
          title: '预付',
          width: 70,
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  marginTop: '8px',
                },
              },
              [
                h('img', {
                  attrs: {
                    src: '/static/icons/public/success.png',
                  },
                }),
              ],
            )
          },
        },
      ],
      data1: [
        {
          name: '周莉莉',
          physicalType: '健康体检',
          combo: '血常规，胸片',
          time: '2017-12-09',
          from: '个人',
        },
        {
          name: '周莉莉',
          physicalType: '健康体检',
          combo: '血常规，胸片',
          time: '2017-12-09',
          from: '个人',
        },
        {
          name: '周莉莉',
          physicalType: '健康体检',
          combo: '血常规，胸片',
          time: '2017-12-09',
          from: '个人',
        },
        {
          name: '周莉莉',
          physicalType: '健康体检',
          combo: '血常规，胸片',
          time: '2017-12-09',
          from: '个人',
        },
        {
          name: '周莉莉',
          physicalType: '健康体检',
          combo: '血常规，胸片',
          time: '2017-12-09',
          from: '个人',
        },
        {
          name: '周莉莉',
          physicalType: '健康体检',
          combo: '血常规，胸片',
          time: '2017-12-09',
          from: '个人',
        },
        {
          name: '周莉莉',
          physicalType: '健康体检',
          combo: '血常规，胸片',
          time: '2017-12-09',
          from: '个人',
        },
        {
          name: '周莉莉',
          physicalType: '健康体检',
          combo: '血常规，胸片',
          time: '2017-12-09',
          from: '个人',
        },
        {
          name: '周莉莉',
          physicalType: '健康体检',
          combo: '血常规，胸片',
          time: '2017-12-09',
          from: '个人',
        },
      ],
    }
  },
  props: {
    appointmentSingleModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('update:appointmentSingleModal', false)
    },
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
