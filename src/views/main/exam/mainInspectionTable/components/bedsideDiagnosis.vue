<template>
  <div class="bedsideDiagnosisContainer">
    <titletHasSlot>
      <span slot="titletHasSlotLeftTitle">临床诊断</span>
      <div slot="titletHasSlotRightContent">
        <ZButton @click="labels.length = 0">清空诊断</ZButton>
      </div>
    </titletHasSlot>

  </div>
</template>
<script>
import titletHasSlot from '@/components/titleHasSlot'
import ZButton from '@/components/button/ZButton'

export default {
  name: 'bedsideDiagnosis',
  props: {
    labels: {
        type: Array  // {name, detail}
    },
  },
  components: {
    titletHasSlot
  },
}
</script>
<style>

</style>
