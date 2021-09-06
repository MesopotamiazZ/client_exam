/**
 * 验证指令
 * @author zero
 * @date 2017/11/15
 */
export default {
  inserted: (el, binding) => {
    console.log(binding)
  },
  update: (el, binding) => {
    if (binding.value % 2) {
      el.style.visibility = 'hidden'
    } else {
      el.style.visibility = 'visible'
    }
  },
}
