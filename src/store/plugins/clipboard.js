/**
 * 剪贴板插件
 * @author zero
 * @date 2017/12/10
 */
const clipboard = new nw.Clipboard()

function clipboardPlugin (store) {
  store.subscribeAction((action, state) => {
    try {
      if (action.type === 'setClipboard') {
        let payload = action.payload
        if (payload.dataType === undefined || payload.dataType === 'text') {
          clipboard.set(payload.data.toString(), payload.type)
        } else {
          console.error('暂时只支持文本类型数据')
        }
      }
    } catch (error) {
      console.log('剪贴板操作失败', error)
    }
  })
}

export default clipboardPlugin
