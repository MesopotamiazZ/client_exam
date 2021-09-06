export default {
  name: 'cell',
  functional: true,
  props: {
    render: Function,
    row: Object,
    index: Number,
    column: Object,
    content: {
      default: '',
    },
    maxHeight: Number,
    cssObj: Object,
    lineHeight: {
      type: Number,
      default: 18,
    },
    // autoRowHeight: Boolean,
    // maxInitialRowHeight: Number,
  },
  render: (h, ctx) => {
    let col = ctx.props.column
    // console.log('-=-=', {
    //   'max-height': ctx.props.row._height + 'px',
    //   ...(ctx.props.cssObj || {}),
    // })
    // let rowHeight = ctx.props.maxInitialRowHeight > ctx.props.row._height ? ctx.props.maxInitialRowHeight : ctx.props.row._height
    return ctx.props.render && h('div', {
      style: !ctx.props.column.grow && {
        width: ctx.props.column.width - 1 + 'px',
        'max-height': (ctx.props.maxHeight || ctx.props.row._height) + 'px',
        'line-height': ctx.props.lineHeight + 'px',
        ...(ctx.props.cssObj || {}),
      } || {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        'line-height': ctx.props.lineHeight + 'px',
        ...(ctx.props.cssObj || {}),
      },
    }, [ctx.props.render(h, {
      value: ctx.props.row[col.key || col.index || col._index],
      row: ctx.props.row,
      index: ctx.props.index,
      column: ctx.props.column,
      content: ctx.props.content,
      type: ctx.props.type,
    }, ctx)]) || !ctx.props.column.grow && h('div', {
      style: {
        width: ctx.props.column.width - 1 + 'px',
        'max-height': (ctx.props.maxHeight || ctx.props.row._height) + 'px',
        'line-height': ctx.props.lineHeight + 'px',
        display: (!ctx.props.autoRowHeight || ctx.props.maxInitialRowHeight) && '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': ctx.props.row._height && String(Math.floor((ctx.props.maxHeight || ctx.props.row._height) / ctx.props.lineHeight) || ''),
        overflow: 'hidden',
        ...(ctx.props.cssObj || {}),
      },
      attrs: {
        ...(ctx.props.column.tip && {title: ctx.props.content || ctx.props.row[col.key || col.index || col._index]} || {}),
      },
    }, ctx.props.content || ctx.props.row[col.key || col.index || col._index]) || h('div', {
      style: {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        'line-height': ctx.props.lineHeight + 'px',
        ...(ctx.props.cssObj || {}),
      },
    }, [h('table', {
      style: {
        width: '100%',
        height: '100%',
        'border-collapse': 'collapse',
      },
    }, [h('tr', { style: { 'background-color': 'transparent' } }, [h('td', {
      style: {
        border: 'none',
        'background-color': 'transparent',
      },
    }, [h('div', {
      style: {
        display: (!ctx.props.autoRowHeight || ctx.props.maxInitialRowHeight) && '-webkit-box',
        '-webkit-box-orient': 'vertical',
        '-webkit-line-clamp': String(Math.floor((ctx.props.maxHeight || ctx.props.row._height) / ctx.props.lineHeight) || ''),
        overflow: 'hidden',
      },
      attrs: {
        ...(ctx.props.column.tip && {title: ctx.props.content || ctx.props.row[col.key || col.index || col._index]} || {}),
      },
    }, ctx.props.content || ctx.props.row[col.key || col.index || col._index])])])])])
  },
}
