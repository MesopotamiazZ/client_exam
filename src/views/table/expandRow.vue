<template>
  <div>
    {{row}} <br>
    {{row}} <br>
    {{row}}
  </div>
</template>
<script>
export default {
  name: 'expandRow',
  props: {
    row: Object,
  },
}
</script>