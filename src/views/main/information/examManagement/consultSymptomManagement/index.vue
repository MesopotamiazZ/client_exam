
<template>
  <div>
    问诊症状管理
    <q-table
      ref="zBaseInfoTable"
      :params="paraming"
      :ifEdit="true"
      :columns="columns"
      :data="data"
      :height="tableHeight"
      :pageInfo="pageInfo">
    </q-table>
  </div>
</template>
<script>
import qTable from '@/components/qtable'
import header from './header.vue'

export default {
  name: 'consultSymptomManagement',
  components: {
    qTable,
  },
  data() {
    return {
      paraming: {},
      columns: [
        {
          type: 'selection',
          width: 60,
        },
        { title: '序号', key: 'id', type: 'index', width: 80 },
        {
          title: '名称',
          key: 'name',
          renderHeader(h, params) {
            return h(header, {
              props: {
                column: params.column,
                option: ['通用', '男', '女'],
              },
              on: {
                fieldSort (direction) {
                  console.log(`name字段排序${direction}`)
                },
                fieldSearch (option) {
                  console.log(`name字段筛选${option}`)
                },
              },
            })
          },
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  on: {
                    click(e) {
                      console.log(params.index + 1)
                    },
                  },
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small',
                  },
                  style: {
                    marginLeft: '5px',
                  },
                  on: {
                    click(e) {
                      console.log(params.index + 1)
                    },
                  },
                },
                '删除'
              ),
            ])
          },
          fixed: 'right',
          width: 160,
        },
      ],
      data: [
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
        { id: 1, name: 'javascript' },
      ],
      tableHeight: 0,
      pageInfo: {
        total: 10,
        current_page: 1,
      },
    }
  },
}
</script>
<style lang="less" >

</style>
