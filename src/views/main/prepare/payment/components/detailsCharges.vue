/**
 * Created 覃凤
 * Date: 2018/3/3/
 * content: 个人结算-个人收费-费用明细
 * ifShowModal：显示弹窗，titleName：弹窗，columns：表头，data：表格数据，height：表格高度
 */
<template>
  <div class="details-charges" v-if='ifShowModal'>
     <Modal v-model="ifShowModal"
           :styles="{width: width}"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <alert-header-com @close-modal='closeModal' :titleName='titleName'></alert-header-com>
      </div>
      <div class="details-charges-content">
        <Table stripe :height='height' :columns='columns' :data='data'></Table>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import AlertHeaderCom from '@/views/main/prepare/components/AlertHeaderCom.vue'
export default {
  name: 'details-charges',
  props: {
    ifShowModal: {
      type: Boolean,
      defalut: () => {
        return []
      },
    },
    width: {
      type: String,
      default: '578px',
    },
    titleName: {
      type: String,
      default: '费用明细',
    },
    columns: {
      type: Array,
      default: () => {
        return []
      },
    },
    data: {
      type: Array,
      default: () => {
        return []
      },
    },
    height: {
      type: Number,
      default: 200,
    },
  },
  components: {
    AlertHeaderCom,
  },
  data () {
    return {
      msg: '费用明细',
    }
  },
  methods: {
    closeModal () {
      this.$emit('close-modal')
    },
  },
}
</script>
<style lang="less">
@import (reference) '~assets/less/variable.less';
.details-charges {
  height: 500px;
  .ivu-modal {
    max-height: 400px!important;
  }
  .ivu-modal-mask {
    background-color:rgba(0,0,0,0);
  }
  .ivu-modal {
    box-shadow: 0 2px 15px 0 rgba(206,213,242,0.70);
  }
  .details-charges-content {
    border-bottom-left-radius: @borderRadiuBig;
    border-bottom-right-radius: @borderRadiuBig;
    overflow: hidden;
  }
}
</style>
