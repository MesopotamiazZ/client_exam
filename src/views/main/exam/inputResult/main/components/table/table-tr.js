export default {
  props: ['trData', 'isFirstRow'],
  data() {
    return {
      giveUpStatus: false,
    }
  },
  render(h) {
    if (this.isFirstRow) {
      // 组合项目 - 合并
      return h('tr', [
        h('td', {
          attrs: {
            rowspan: this.trData.children.length,
          },
        }, [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.children[0].group_item_name),
        ]),
        // 检测项目名称
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.children[0].item_name),
        ]),
        // 检查所见
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.children[0].examine_saw),
        ]),
        // 单位
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.children[0].item.unit),
        ]),
        // 检查结果
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.children[0].examine_result),
        ]),
        // 参考范围
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, `${(this.trData.children[0].item.upper_limit_man || this.trData.children[0].item.upper_limit_woman) ? (this.trData.children[0].item.upper_limit_man || this.trData.children[0].item.upper_limit_woman) : ''}
              - ${(this.trData.children[0].item.low_limit_man || this.trData.children[0].item.low_limit_woman) ? (this.trData.children[0].item.low_limit_man || this.trData.children[0].item.low_limit_woman) : ''}`),
        ]),
        // 阳性
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, [
            this.trData.children[0].is_positive ? '是' : '否',
          ]),
        ]),
        // 加入小结
        h('td', [
          h('div', [
            h('checkbox', {
              on: {
                'on-change': (status) => {
                  this.$emit('fill-in-summary', status, this.trData.children[0])
                },
              },
            }),
          ]),
        ]),
        // 弃检
        h('td', {
          attrs: {
            rowspan: this.trData.children.length,
          },
        }, [
          h('div', [
            this.trData.children[0].newstaus,
            h('checkbox', {
              props: {
                'value': this.trData.children[0].newstaus,
              },
              on: {
                'on-change': (status) => {
                  this.$emit('give-up-checkup', status, this.trData.children[0])
                },
              },
            }),
          ]),
        ]),
        // 建议复查
        h('td', {
          attrs: {
            rowspan: this.trData.children.length,
          },
        }, [
          h('div', [
            h('checkbox', {
              on: {
                'on-change': (status) => {
                  this.$emit('suggest-reexame', status, this.trData.children[0])
                },
              },
            }),
          ]),
        ]),
      ])
    } else {
      return h('tr', [
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
      ])
    }
  },
  methods: {
    getstatus() {
      return status
    },
  },
}
