export default {
  name: 'filter-render',
  functional: true,
  props: {
    render: Function,
  },
  render: (h, ctx) => {
    return ctx.props.render(h)
  },
}
