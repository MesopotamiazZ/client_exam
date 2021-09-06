/* jiangyiling */
/* 单位附加费弹窗 */
<template>
  <div class="additionalCharge"
       v-if="controlModal">
    <Modal v-model="controlModal"
           width="690"
           :transition-names="[]"
           :mask-closable="false"
           :transfer="false"
           :closable="false">
      <div slot="header">
        <alert-header headerText="单位附加费"
                      :showInput="false"></alert-header>
      </div>
      <div class="paddingL20 paddingR20">
        <surcharges></surcharges>
      </div>
      <div class="modal-footer" slot="footer">
        <Button type="primary"
                        class="marginR20"
                        @click="commit">保 存</Button>
                <Button type="ghost"
                      @click="cancelModal">取 消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import surcharges from './surcharges' // 附加费
export default {
  components: {
    surcharges,
  },
  name: 'additionalCharge',
  props: {
    controlModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    cancelModal() {
      this.$parent.$data.isShowAdditionalCharge = false
    },
    commit () {
      this.$emit('commit-data')
    },
  },
  /* mounted() {
    console.log(this.controlModal)
  }, */
}
</script>
<style lang="less">
.additionalCharge {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .modal-footer {
    margin-top: 20px;
    margin-right: 20px;
    padding-bottom: 20px;
  }
}
</style>
