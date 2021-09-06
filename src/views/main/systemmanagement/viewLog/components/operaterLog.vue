<template>
  <div class="operaterLog-wrapper height100P">
    <div class="operaterLog height100P" ref="contentTable">
      <q-table
        ref="zBaseInfoTable"
        :params="paraming"
        :ifEdit="true"
        :columns="columns"
        :data="data"
        :height="tableHeight"
        :pageInfo="pageInfo"
        :showOperateColumn="false"
        @getRequestParams="getRequestParams"
        @all-selection="selectChange">
      </q-table>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'operaterLog',
  data() {
    return {
      tableHeight: 400,
      pageInfo: {
        total: 0,
        current_page: 1,
        per_page: 20,
      },
      paraming: {},
      columns: [
        {
          title: '用户名',
          key: 'username',
          ellipsis: true,
          minWidth: 107,
        },
        {
          title: '姓名',
          key: 'name',
          ellipsis: true,
          minWidth: 107,
        },
        {
          title: '位置',
          key: 'path',
          ellipsis: true,
          minWidth: 280,
        },
        {
          title: '对象',
          key: 'object',
          ellipsis: true,
          minWidth: 163,
        },
        {
          title: '类型',
          key: 'type',
          ellipsis: true,
          minWidth: 126,
        },
        {
          title: '时间',
          key: 'time',
          ellipsis: true,
          minWidth: 163,
        },
      ],
      data: [
        {
          username: 'gust',
          name: '易丹丹',
          path: 'apl/mms/send',
          object: '体检套餐',
          type: '新增',
          time: '2018-01-01 12:00',
        },
        {
          username: 'white',
          name: '王思佳',
          path: 'apl/mms/src',
          object: '疾病类别',
          type: '修改',
          time: '2018-01-01 12:00',
        },
        {
          username: 'gust',
          name: '易丹丹',
          path: 'apl/mms/send',
          object: '体检套餐',
          type: '删除',
          time: '2018-01-01 12:00',
        },
        {
          username: 'white',
          name: '王思佳',
          path: 'apl/mms/src',
          object: '疾病类别',
          type: '删除',
          time: '2018-01-01 12:00',
        },
      ],
    }
  },
  computed: {
    ...mapState(['windowHeight']),
  },
  watch: {
    windowHeight() {
      this.tableHeight = this.$refs.contentTable.offsetHeight
    },
    mounted() {
      this.tableHeight = this.$refs.contentTable.offsetHeight
    },
    activated() {
      this.tableHeight = this.$refs.contentTable.offsetHeight
    },
  },
  methods: {
    getRequestParams(params) {
      //
    },
    selectChange(data) {
      //
    },
  },
}
</script>
<style>
</style>