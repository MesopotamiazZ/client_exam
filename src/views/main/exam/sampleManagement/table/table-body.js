import RTr from './table-tr.js'
import mixin from './mixin'
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    bodyHeight: {
      type: Number,
    },
    idHead: {
      type: Boolean,
      default: false,
    },
  },
  render(h) {
    console.log(this.data, 'trtewrewr')
    let children = this.data.map((item, dataIndex) => {
      console.log(item, dataIndex, 'tttttttttttttt')
      return h('RTr', {
        attrs: {
          'trData': item,
          'isFirstRow': true,
          'index': dataIndex,
        },
        on: {
          'fill-in-summary': (status, row) => {
            this.$emit('fill-in-summary', status, row, item)
          },
          'give-up-checkup': (status, row) => {
            this.$emit('give-up-checkup', status, row, item)
          },
          'suggest-reexame': (status, row) => {
            this.$emit('suggest-reexame', status, row, item)
          },
        },
      })
    })
    console.log(children, 'childrenchildrenchildrenchildrenchildrenchildrenchildrenchildrenchildren')
    return h('div', {
      class: {
        'r-table-body': true,
      },
      style: {
        'height': `${this.bodyHeight}px`,
      },
    }, [
      h('table', [
        h('colgroup', [
          ...this.columns.map((item, index) => {
            return h('col', {
              attrs: {
                'width': this.setColWidth(item, index, this.columns, this.isHead),
              },
            })
          }),
        ]),
        h('tbody', [children])]),
    ])
  },
  components: {
    RTr,
  },
  mixins: [mixin],
}
