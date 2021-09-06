export default {
  name: 'just-render',
  functional: true,
  props: {
    param: {},
    render: Function,
  },
  render: (h, ctx) => {
    if (ctx.props.render) {
      return ctx.props.render(h, ctx.props.param, ctx)
    }
  },
}
