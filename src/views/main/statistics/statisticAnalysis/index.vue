<template>
  <div>
      统计分析
      <Input type="text" style="width: 200px;; height: 30px" v-model="examinationNumber" ></Input>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: 'nanan',
  data() {
    return {
      examinationNumber: '',
    }
  },
  methods: {
    ...mapActions(['subscribeScanGun', 'desubscribeScanGun']),
    aaa(str) {
      this.examinationNumber = str
    },
  },
  mounted() {
    this.subscribeScanGun(this.aaa)
  },
  beforeDestroy() {
    console.log('beforeDestroy')
    this.desubscribeScanGun(this.aaa)
  },
}
</script>
<style lang="less">

</style>
