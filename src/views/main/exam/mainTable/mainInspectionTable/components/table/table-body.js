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
    isEdit: {
      type: Boolean,
    },
  },
  render(h) {
    console.log('table-body - isEdit ***********************', this.isEdit)
    let children = this.data.map((item) => {
      if (item.children.length === 1) {
        return h('RTr', {
          attrs: {
            'trData': item,
            'isFirstRow': true,
            'isEdit': this.isEdit,
          },
          on: {
            'tr-spread': (data) => {
              this.$emit('tr-spread', item.officeName, data)
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
                'isEdit': this.isEdit,
              },
              on: {
                'tr-spread': (data) => {
                  this.$emit('tr-spread', item.officeName, data)
                },
              },
            })
          } else {
            let kk = h('RTr', {
              attrs: {
                'trData': inneritem,
                'isFirstRow': false,
                'isEdit': this.isEdit,
              },
              on: {
                'tr-spread': (data) => {
                  this.$emit('tr-spread', item.officeName, data)
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
