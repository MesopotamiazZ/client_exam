<template>
  <div class="loginLog-wrapper height100P">
    <div class="loginLog height100P" ref="contentTable">
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
  name: 'loginLog',
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
          minWidth: 145,
        },
        {
          title: '姓名',
          key: 'name',
          ellipsis: true,
          minWidth: 145,
        },
        {
          title: '登陆IP',
          key: 'ip',
          ellipsis: true,
          minWidth: 253,
        },
        {
          title: '登录MAC地址',
          key: 'mac',
          ellipsis: true,
          minWidth: 253,
        },
        {
          title: '时间',
          key: 'time',
          ellipsis: true,
          minWidth: 187,
        },
      ],
      data: [
        {
          username: 'gust',
          name: '易丹丹',
          ip: '112.81.12.14',
          mac: 'B0-6E-BF-37-57-D4',
          time: '2018-01-01 12:00',
        },
        {
          username: 'apple',
          name: '王思佳',
          ip: '112.81.12.14',
          mac: 'B0-6E-BF-37-57-D4',
          time: '2018-01-01 12:00',
        },
        {
          username: 'gust',
          name: '易丹丹',
          ip: '112.81.12.14',
          mac: 'B0-6E-BF-37-57-D4',
          time: '2018-01-01 12:00',
        },
        {
          username: 'apple',
          name: '王思佳',
          ip: '112.81.12.14',
          mac: 'B0-6E-BF-37-57-D4',
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
<style lang="less">
  .loginLog-wrapper{

  }
</style>