<template>
  <div class="r-table-head">
    <table>
      <colgroup>
        <col v-for="column in columns" :key="column.key" :width="setColWidth(column, index, columns, isHead)">
      </colgroup>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key"> {{column.title}}</th>
        </tr>
      </thead>
    </table>
  </div>
</template>
<script>
import mixin from './mixin'
export default {
  props: {
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    rowHeight: {
      type: Number,
    },
    tableWidth: {
      type: Number,
    },
    isHead: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [mixin],
}
</script>
