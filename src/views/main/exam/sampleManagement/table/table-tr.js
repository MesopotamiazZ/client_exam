export default {
  props: ['trData', 'isFirstRow', 'index'],
  data() {
    return {
      giveUpStatus: false,
    }
  },
  render(h) {
    console.log(this.trData, 'gggggggggggggggggggggggggggggggggggggg')
    let children
    if (this.trData.samples.length > 0) {
      children = this.trData.samples.map((item, dataIndex) => {
        console.log(item, dataIndex, 'tttttttttttttt')
        return h('div', {
          class: {
            'r-table-cell-ellipsis': true,
          },
          style: {
            'height': '40px',
            'line-heigt': '40px',
          },
        }, item.pe_group_item_name)
      })
    }
    if (this.isFirstRow) {
      // 组合项目 - 合并
      console.log(this.trData.samples.length)
      return h('tr', [
        h('td', {
          style: {
            height: (40 * this.trData.samples.length > 0 ? 40 * this.trData.samples.length : 40) + 'px',
          },
        }, [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.index + 1),
        ]),
        h('td', {
          style: {
            height: (40 * this.trData.samples.length > 0 ? 40 * this.trData.samples.length : 40) + 'px',
          },
        }, [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.sample_sn),
        ]),
        h('td', {
          style: {
            height: (40 * this.trData.samples.length > 0 ? 40 * this.trData.samples.length : 40) + 'px',
          },
        }, [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.container_name),
        ]),
        h('td', {
          style: {
            height: (40 * this.trData.samples.length > 0 ? 40 * this.trData.samples.length : 40) + 'px',
          },
        }, [children]),
        h('td', {
          style: {
            height: (40 * this.trData.samples.length > 0 ? 40 * this.trData.samples.length : 40) + 'px',
          },
        }, [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.container_name),
        ]),
      ])
    } /* else {
      return h('tr', [
        h('td', {
          attrs: {
            rowspan: this.trData.samples.length,
          },
        }, [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.index + 1),
        ]),
      ]) */
/*       return h('tr', [
        // 检测项目名称
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.item_name),
        ]),
        // 检查所见
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.examine_saw),
        ]),
        // 单位
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.item.unit),
        ]),
        // 检查结果
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.examine_result),
        ]),
        // 参考范围
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, `${(this.trData.item.low_limit_man || this.trData.item.low_limit_woman) ? (this.trData.item.low_limit_man || this.trData.item.low_limit_woman) : ''}
              - ${(this.trData.item.upper_limit_man || this.trData.item.low_limit_woman) ? (this.trData.item.upper_limit_man || this.trData.item.low_limit_woman) : ''}`),
        ]),
        // 阳性
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, [
            this.trData.is_positive ? '是' : '否',
          ]),
        ]),
        // 加入小结
        h('td', [
          h('div', [
            h('checkbox', {
              on: {
                'on-change': (status) => {
                  this.$emit('fill-in-summary', status, this.trData)
                },
              },
            }),
          ]),
        ]),
      ]) */
   /*  } */
  },
  methods: {
    getstatus() {
      return status
    },
  },
}
