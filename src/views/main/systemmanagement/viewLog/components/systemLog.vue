<template>
  <div class="systemLog-wrapper height100P">
    <div class="systemLog height100P" ref="contentTable">
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
  name: 'systemLog',
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
          title: '日志文件',
          key: 'file',
          ellipsis: true,
        },
        {
          title: '文件大小',
          key: 'size',
          ellipsis: true,
        },
        {
          title: '操作',
          width: 70,
          fixed: 'right',
          render: (h, params) => {
            return h(
              'div',
              {},
              [
                h(
                  'span',
                  {
                    style: {
                      display: 'inline-block',
                      width: '17px',
                      height: '12px',
                      marginRight: '7px',
                      marginLight: '3px',
                      background: `url(${this.viewIcon}) no-repeat`,
                    },
                  },
                ),
                h(
                  'span',
                  {
                    style: {
                      display: 'inline-block',
                      width: '15px',
                      height: '15px',
                      marginLight: '5px',
                      background: `url(${this.downloadIcon}) no-repeat`,
                    },
                  },
                ),
              ]
            )
          },
        },
      ],
      data: [
        {
          file: 'log20180311.txt',
          size: '2M',
        },
        {
          file: 'log20180312.txt',
          size: '2M',
        },
        {
          file: 'log20180313.txt',
          size: '2M',
        },
        {
          file: 'log20180313.txt',
          size: '256K',
        },
      ],
      viewIcon: '/static/icons/public/table-hover-preview.svg', // 查看
      downloadIcon: '/static/icons/public/download.png', // 下载
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
  .systemLog-wrapper{
  }
</style>