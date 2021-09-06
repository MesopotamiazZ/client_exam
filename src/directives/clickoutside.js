/**
 * 从外部关闭下拉弹窗
 * @author yhy
 * @date 2018/01/11
 */
export default {
  bind: (el, binding, vnode) => {
    function documentHanler(e) {
      // console.log('1111')
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }
    document.addEventListener('click', documentHanler)
    el._vueClick = documentHanler
  },
  unbind: (el, binding) => {
    document.removeEventListener('click', el._vueClick)
    delete el._vueClick
  },
}
