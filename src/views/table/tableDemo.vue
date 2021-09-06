<template>
  <div>
    <input type="file" @change="change">
    <input type="file" nwsaveas ref="saveFile">
    <button @click="handle">切换编辑模式</button>
    <Button @click="handleSelectAll">全选</Button>
    <Button @click="handleCancelAll">全取消</Button>
    <Button @click="handleSelectSecond">选择第二行</Button>
    <Button @click="handleExpand">展开/关闭第二行</Button>
    <router-link to="/">返回</router-link>
    <div style="height: 400px;">
      <q-table
      :data = "data"
      :columns = "columns"
      :pageInfo = "pageInfo"
      :selectMode = "selectMode"
      ref="qtable"
      :accordion ="true"
      :rowClickRelation="false"
      @edit-row = "editRow"
      :isShowSelectOrIndex = "true"
      :isBorder="true"
    ></q-table>
    </div>
    
  </div>
</template>
<script>
/** @augments
 *  行点击事件on-row-click四个参数:
 *    selection - 选中的项
 *    row - 当前行
 *    index - 行索引
 *    column - 当前列
 */
  import QTable from '@/components/qtable'
  import expandRow from './expandRow'
  // import operate from './operate'
  export default {
    name: 'demo',
    components: {QTable},
    data() {
      // let that = this
      return {
        selectMode: false,
        data: [
          {
            name: 'zero' + ~~((Math.random() * 10) % 10),
            money: ~~((Math.random() * 10000) % 10000),
            enable: Math.random() > 0.5 ? '是' : '否',
            _checked: Math.random() > 0.5,
          },
          {
            name: 'zero' + ~~((Math.random() * 10) % 10),
            money: ~~((Math.random() * 10000) % 10000),
            enable: Math.random() > 0.5 ? '是' : '否',
            _checked: Math.random() > 0.5,
          },
          {
            name: 'zero' + ~~((Math.random() * 10) % 10),
            money: ~~((Math.random() * 10000) % 10000),
            enable: Math.random() > 0.5 ? '是' : '否',
            _checked: Math.random() > 0.5,
          },
          {
            name: 'zero' + ~~((Math.random() * 10) % 10),
            money: ~~((Math.random() * 10000) % 10000),
            enable: Math.random() > 0.5 ? '是' : '否',
            _checked: Math.random() > 0.5,
          },
          {
            name: 'zero' + ~~((Math.random() * 10) % 10),
            money: ~~((Math.random() * 10000) % 10000),
            enable: Math.random() > 0.5 ? '是' : '否',
            _checked: Math.random() > 0.5,
          },
          {
            name: 'zero' + ~~((Math.random() * 10) % 10),
            money: ~~((Math.random() * 10000) % 10000),
            enable: Math.random() > 0.5 ? '是' : '否',
            _checked: Math.random() > 0.5,
          },
          {
            name: 'zero' + ~~((Math.random() * 10) % 10),
            money: ~~((Math.random() * 10000) % 10000),
            enable: Math.random() > 0.5 ? '是' : '否',
            _checked: Math.random() > 0.5,
          },
          {
            name: 'zero' + ~~((Math.random() * 10) % 10),
            money: ~~((Math.random() * 10000) % 10000),
            enable: Math.random() > 0.5 ? '是' : '否',
            _checked: Math.random() > 0.5,
          },
          {
            name: 'zero' + ~~((Math.random() * 10) % 10),
            money: ~~((Math.random() * 10000) % 10000),
            enable: Math.random() > 0.5 ? '是' : '否',
            _checked: Math.random() > 0.5,
          },
          {
            name: 'zero' + ~~((Math.random() * 10) % 10),
            money: ~~((Math.random() * 10000) % 10000),
            enable: Math.random() > 0.5 ? '是' : '否',
            _checked: Math.random() > 0.5,
          },
          {
            name: 'zero' + ~~((Math.random() * 10) % 10),
            money: ~~((Math.random() * 10000) % 10000),
            enable: Math.random() > 0.5 ? '是' : '否',
            _checked: Math.random() > 0.5,
          },
        ],
        columns: [
          /* {
            width: 50,
            key: 'my-render-key',
            type: 'render',
            renderHeader(h, params) {
              if (that.selectMode) {
                let data = Object.values(that.$refs.qtable.$refs.table.objData)
                let selectNumber = data.filter((data) => { return data._isChecked }).length
                return h('Checkbox', {
                  on: {
                    'on-change'(status) {
                      that.$refs.qtable.$refs.table.selectAll(status)
                    },
                  },
                  props: {
                    value: !data.some((data) => data._isChecked !== true),
                    indeterminate: selectNumber !== 0 && selectNumber < data.length,
                  },
                })
              }
              return h('div', '序号')
            },
            render(h, params) {
              if (that.selectMode) {
                return h('Checkbox', {
                  props: {
                    value: that.$refs.qtable.$refs.table.objData[params.index]._isChecked,
                  },
                  nativeOn: {
                    click () {
                      console.log(params.column)
                      // if (!params.column.key === 'my-render-key') {
                      that.$refs.qtable.$refs.table.toggleSelect(params.index)
                      // }
                    },
                  },
                })
              }
              return h('div', (that.$refs.qtable.currentPage - 1) * 20 + params.index + 1)
            },
          }, */
          {
            type: 'expand',
            width: 30,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  row: params.row,
                },
              })
            },
          },
          {
            title: '名称',
            key: 'name',
            minWidth: 100,
            render(h, params) {
              return h('div', params.row.name)
            },
          },
          { title: '金额', key: 'money', minWidth: 500 },
          { title: '启用', key: 'enable', minWidth: 110 },
          /* {
            title: '操作',
            key: 'opearte',
            width: 150,
            fixed: 'right',
            render(h, params) {
              return h('div', [
                h(operate, {
                  props: {
                    row: params.row,
                  },
                  on: {
                    edit(data) {
                      that.edit(data)
                    },
                    del(data) {
                      that.del(data)
                    },
                  },
                }),
              ])
            },
          }, */
        ],
        // 分页的
        pageInfo: {
          total: 100,
          page: 1,
          page_size: 3,
        },
      }
    },
    methods: {
      change (e) {
        let file = e.target.files[0]
        this.$refs.saveFile.files.append(file)
      },
      // 按钮切换编辑模式
      handle() {
        this.selectMode = !this.selectMode
      },
      editRow(rclickData, rEvent) {
        console.log('编辑', rclickData, rEvent)
      },
      handleSelectAll() {
        this.$refs.qtable.$refs.table.selectAll(true)
      },
      handleCancelAll() {
        this.$refs.qtable.$refs.table.selectAll(false)
      },
      onSelect(selection, row, index) {
        console.log('勾选事件')
      },
      onRowClick(selection, row, index, column) {
        if (column.key !== 'my-render-key' && column.key !== 'operate' && column.key !== 'expand-row') {
          this.$refs.qtable.$refs.table.toggleSelect(index)
        }
      },
      handleSelectSecond() {
        this.$refs.qtable.$refs.table.toggleSelect(1)
      },
      handleExpand() {
        this.$refs.qtable.$refs.table.toggleExpand(1)
      },
    },
  }
</script>
