<template>
  <div style="position: relative; width: 100%; height: 100%;">
    <keep-alive>
      <component :is="view"></component>
    </keep-alive>
  </div>
</template>
<script>
import SamplingUnits from './SamplingUnits'

export default {
  name: 'sampleManagement',
  components: {
    SamplingUnits,
  },
  data () {
    return {
      view: 'SamplingUnits',
    }
  },
  methods: {
//
  },
}
</script>
<style>
</style>