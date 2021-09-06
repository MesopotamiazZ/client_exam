<template>
  <div>
    <cascade :data="data">
      <div v-for="box in data" :slot="box.slot" style="height: 100px; background: red;"></div>
    </cascade>
  </div>
</template>
<script>
import cascade from '@/components/cascade'
export default {
  name: 'common-demo',
  components: {
    cascade,
  },
  data() {
    return {
      data: [
        {
          title: '11111',
          slot: 's',
          spread: false,
        },
        {
          title: '2222',
          slot: 's',
          spread: false,
        },
        {
          title: '3333',
          slot: 's',
          spread: false,
        },
        {
          title: '4444',
          slot: 's',
          spread: false,
        },
      ],
    }
  },
}
</script>
<style scoped>
</style>
