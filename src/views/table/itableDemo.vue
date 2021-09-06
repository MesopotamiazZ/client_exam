<template>
  <div style="margin: 100px; height: 80%;" >
    <itable :columns="columns" :data="data" ref="itable" :selectedIndex="2" :headerHeight="30" @on-row-edit="row_edit" @on-row-del="row_edit"></itable>
    <hr/>
  </div>
</template>
<script>
import itable from '@/components/itable'
// import t from '@/components/itable/t'
export default {
  name: 'tiable_demo',
  components: {
    itable,
  },
  data() {
    return {
      columns: [
        {
          name: 'Sequence Number',
          type: 'sn',
          fixed: 'left',
          width: 50,
          rowResize: true,
          colResize: true,
          checking: 1,
        },
        {
          name: 'spread',
          type: 'expand',
          fixed: 'left',
          width: 30,
          spreadSlot: 'spreadBlock',
          spreadRender: (h, param, ctx) => {
            return h('div', {
              style: {
                'padding-left': '50px',
              },
            }, [h('itable', {
              props: {
                columns: [
                  {
                    name: 'aaa',
                    key: 'a',
                    width: 200,
                    colResize: true,
                  },
                  {
                    name: 'bbb',
                    key: 'b',
                    renderHeader: (h) => {
                      return h('div', 'bbb')
                    },
                  },
                ],
                data: ctx.parent.data,
              },
            })])
          },
        },
        {
          name: '操作',
          type: 'operation',
          fixed: 'right',
          width: 70,
        },
        {
          name: 'aaa',
          key: 'a',
          width: 200,
          colResize: true,
        },
        {
          name: 'bbb',
          key: 'b',
          renderHeader: (h) => {
            return h('div', 'bbb')
          },
        },
        {
          name: 'ccc',
          key: 'c',
          render: (h, param) => {
            return h('div', {
              props: {
                data: param.content,
              },
              style: {
                border: '1px solid red',
              },
            }, 'cc-cc')
          },
        },
      ],
      data: [
        { a: 111, b: 222, c: 333 },
        { a: 111, b: 222, c: 333 },
        { a: 111, b: 222, c: 333 },
        { a: 111, b: 222, c: 333 },
        { a: 111, b: '好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good好 good', c: 333 },
        { a: 111, b: 222, c: 333 },
      ],
    }
  },
  mounted() {
//    window.document.body.onclick = function () {
//      window.print()
//    }
//     this.cret()
  },
  methods: {
    row_edit(row, index) {
      console.log(row, index)
    },
    cret() {
      let arr = []
      for (let key = 0; key < 200; key++) {
        arr.push({a: key, b: key, c: key})
      }
      this.data = arr
    },
  },
}
</script>
<style lang="less" scoped>
</style>
