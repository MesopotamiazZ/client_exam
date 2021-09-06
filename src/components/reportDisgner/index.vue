<template>
  <div class="outer_container">
    <ue :config="config" ref="ue" @insertVal="insertVal"></ue>
    <varPicker :show="true"></varPicker>
  </div>
</template>
<script>
import ue from '@/components/ue'
import varPicker from './varPicker'
export default {
  components: {
    ue,
    varPicker,
  },
  data() {
    return {
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 450,
      },
    }
  },
  methods: {
    insertVal(editor) {
    //
    },
  },
  mounted() {
  //
  },
}
</script>
<style scoped>

</style>
