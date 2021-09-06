/**
 * 定义通用render函数
 */
export default {
  empty() { /* */ },
  operation(h, param, ctx) {
    return h('div', [
      h('span', {
        style: {
          display: 'inline-block',
          background: 'url(/static/icons/public/table-hover-edit.svg) no-repeat center',
          width: '13px',
          height: '13px',
          'margin-right': '10px',
          cursor: 'pointer',
        },
        on: {
          click: () => {
            ctx.parent.$emit('on-row-edit', param.index)
          },
        },
      }),
      h('span', {
        style: {
          display: 'inline-block',
          background: 'url(/static/icons/public/table-hover-del.svg) no-repeat center',
          width: '13px',
          height: '13px',
          cursor: 'pointer',
        },
        on: {
          click: () => {
            ctx.parent.$emit('on-row-del', param.index)
          },
        },
      }),
    ])
  },
  sn(h, param) {
    return h('div', {
      style: {
        display: 'inline-block',
        'text-align': 'center',
      },
    }, param.index + 1 + '')
  },
  expand(h, param, ctx) {
    return h('span', {
      style: {
        display: 'inline-block',
        width: '8px',
        height: '8px',
        'border-right': '1px solid #3C9CF2',
        'border-bottom': '1px solid #3C9CF2',
        transform: 'rotate(-45deg)',
        'margin-left': '-2px',
        cursor: 'pointer',
      },
      on: {
        click() {
          event.cancelBubble = true
          let expanded = param.row._spread = !param.row._spread
          window.setTimeout(() => {
            ctx.parent.posters.scrollBar++
            // ctx.parent.posters.spread++
            if (expanded) ctx.parent.syncExpandHeight(param.index)
            ctx.parent.selectRow(ctx.parent.sIndex, true)
          })
          let srcElement = event.srcElement
          if (expanded) {
            srcElement.style.transform = 'rotate(45deg)'
            srcElement.style['margin-left'] = '0'
            param.row._spreadRender = param.column.spreadRender
            param.row._spreadSlot = param.column.spreadSlot
          } else {
            delete param.row._spreadRender
            delete param.row._spreadSlot
            srcElement.style.transform = 'rotate(-45deg)'
            srcElement.style['margin-left'] = '-2px'
          }
        },
      },
    })
  },
}
