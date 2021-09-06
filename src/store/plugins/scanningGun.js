/**
 * 扫描枪插件
 * @author zero
 * @date 2018/03/13
 */
// const event =
// 监听键盘输入事件

let lastTime = null // 最后一次输入时间
let content = '' // 内容
let endCode = 13 // 终止符号
let timer = null
let delayedTime = 100 // 延迟时间
const events = [] // 事件集

window.addEventListener('keypress', function($event) {
  let time = new Date()
  // 判断两次打印是否小于延迟事件 且是初始化状态
  if (
    time - lastTime < delayedTime ||
    (lastTime === null && $event.keyCode !== endCode)
  ) {
    clearTimeout(timer)
    lastTime = time

    timer = setTimeout(() => {
      content = ''
      lastTime = null
    }, delayedTime)

    // 如果是终止符 则输出扫描数据 (数据长度固定必须不少于8个字符) 否则拼接数据
    if ($event.keyCode === endCode && content.length >= 8) {
      events.forEach(event => {
        if (typeof event === 'function') {
          event(content)
          content = ''
          lastTime = null
        }
      })
    } else {
      content += String.fromCharCode($event.keyCode)
    }
  }
})

function scanningGunPlugin(store) {
  store.subscribeAction((action) => {
    if (action.type === 'subscribeScanGun') {
      if (typeof action.payload === 'function') {
        let index = events.findIndex(event => event === action.payload)
        if (index === -1) {
          events.push(action.payload)
        }
      }
    } else if (action.type === 'desubscribeScanGun') {
      let index = events.findIndex(event => event === action.payload)
      if (index !== -1) {
        events.splice(index, 1)
      }
    }
  })
}

export default scanningGunPlugin
