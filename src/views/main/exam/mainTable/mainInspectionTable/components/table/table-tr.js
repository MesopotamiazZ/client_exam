export default {
  props: ['trData', 'isFirstRow', 'isEdit'],
  render(h) {
    if (this.isFirstRow) {
      // 科室名称 - 合并
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
          }, this.trData.officeName),
        ]),
        // 组合项目名称列
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.children[0].isExpand ? [
            h('span', {
              style: {
                'display': 'inline-block',
                'text-align': 'right',
              },
            }, this.trData.children[0].proj_group),
            h('i', {
              style: {
                'display': 'inline-block',
                'width': '17px',
                'height': '11px',
                'margin-left': '5px',
                'background': 'url(/static/icons/public/show.png)',
              },
              on: {
                'click': () => {
                  this.$emit('tr-spread', this.trData.children[0])
                },
              },
            }),
          ] : this.trData.children[0].proj_group),
        ]),
        // 图像
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.children[0].image ? [
            h('i', {
              style: {
                'display': 'inline-block',
                'width': '16px',
                'height': '16px',
                'background': 'url(/static/icons/public/image.png)',
              },
              on: {
                'click': () => {
                  alert('影像信息')
                },
              },
            }),
          ] : ''),
        ]),
        // 科室小结 - 合并
        h('td', {
          attrs: {
            rowspan: this.trData.children.length,
          },
        }, [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.children[0].conslusion),
        ]),
        // 分科医生 -合并
        h('td', {
          attrs: {
            rowspan: this.trData.children.length,
          },
        }, [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.children[0].doctor),
        ]),
        // 结论及建议 - 合并
        h('td', {
          attrs: {
            rowspan: this.trData.children.length,
          },
        }, [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.children[0].result_suggest),
        ]),
        // 弃检
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, [
            this.trData.children[0].give_up ? (
              this.isEdit ? h('Checkbox') : h('img', {
                attrs: {
                  'src': '/static/icons/public/use.png',
                },
              })
          ) : (this.isEdit ? h('Checkbox') : ''),
          ]),
        ]),
        // 建议复查
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, [
            this.trData.children[0].checkup_again ? h('img', {
              attrs: {
                'src': '/static/icons/public/use.png',
              },
            }) : '',
          ]),
        ]),
      ])
    } else {
      return h('tr', [
        // 组合项目名称列
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.isExpand ? [
            h('span', this.trData.proj_group),
            h('i', {
              style: {
                'display': 'inline-block',
                'width': '17px',
                'height': '11px',
                'margin-left': '5px',
                'background': 'url(/static/icons/public/show.png)',
              },
              on: {
                'click': () => {
                  console.log(123454)
                  this.$emit('tr-spread', this.trData)
                },
              },
            }),
          ] : this.trData.proj_group),
        ]),
        // 图像
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, this.trData.image ? [
            h('i', {
              style: {
                'display': 'inline-block',
                'width': '16px',
                'height': '16px',
                'background': 'url(/static/icons/public/image.png)',
              },
              on: {
                'click': () => {
                  alert('影像信息')
                },
              },
            }),
          ] : ''),
        ]),
        // 弃检
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, [
            this.trData.give_up ? (
              this.isEdit ? h('Checkbox') : h('img', {
                attrs: {
                  'src': '/static/icons/public/use.png',
                },
              })
          ) : (this.isEdit ? h('Checkbox') : ''),
          ]),
        ]),
        // 建议复查
        h('td', [
          h('div', {
            class: {
              'r-table-cell-ellipsis': true,
            },
          }, [
            this.trData.checkup_again ? h('img', {
              attrs: {
                'src': '/static/icons/public/use.png',
              },
            }) : '',
          ]),
        ]),
      ])
    }
  },
}
