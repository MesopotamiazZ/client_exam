export default {
  indexRenderer, // 行序号渲染器
  aRenderer, // 无用
}

  /**
   * 行序号渲染器
   * @author zero
   * @date 2017/11/27
   */
function indexRenderer () {
  return function (instance, td, row, col, prop, value, cellProperties) {
    td.className += ' htCenter htMiddle'
    td.innerHTML = row + 1
  }
}

export function aRenderer (instance, td, row, col, prop, value, cellProperties) {
 //
}
