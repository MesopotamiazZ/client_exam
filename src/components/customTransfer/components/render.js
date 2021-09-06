 /**
* 穿梭框单元格的函数式组件
* @author 张祥
* @date 2018/01/09
*/
export default {
  name: 'render',
  functional: true,
  props: {
    row: Number,
    col: Number,
    data: {},
    render: Function,
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      col: ctx.props.col,
      data: ctx.props.data,
    }
    return ctx.props.render(h, params)
  },
}
