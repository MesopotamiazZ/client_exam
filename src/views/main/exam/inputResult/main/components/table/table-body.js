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
    let children = this.data.map((item) => {
      if (item.children.length === 1) {
        return h('RTr', {
          attrs: {
            'trData': item,
            'isFirstRow': true,
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
      } else {
        return item.children.map((inneritem, index) => {
          if (!index) {
            return h('RTr', {
              attrs: {
                'trData': item,
                'isFirstRow': true,
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
          } else {
            let kk = h('RTr', {
              attrs: {
                'trData': inneritem,
                'isFirstRow': false,
              },
              on: {
                'fill-in-summary': (status, row) => {
                  this.$emit('fill-in-summary', status, row, item)
                },
              },
            })
            return kk
          }
        })
      }
    })
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
