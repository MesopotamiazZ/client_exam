import path from 'path'
import childProcess from 'child_process'

let gui = require('nw.gui')

let shortcutMap = {
  // 截图
  screenshot: {
    name: 'screenshot',
    key: '',
    oldKey: '',
    active: function() {
      console.log(1212222)
      childProcess.exec(path.join(process.cwd(), 'static', 'tools', 'screenshot', 'Snipaste.exe --snip'), function () {
        console.log(arguments)
      })
    },
    failed: function() {
      return
    },
  },
}

export function registerShortcut(name, key) {
  if (name === '' || key === '') {
    return
  }
  let shortcut = new gui.Shortcut({
    key: key,
    active: shortcutMap[name].active,
    failed: shortcutMap[name].failed,
  })
  gui.App.registerGlobalHotKey(shortcut)
  console.log(`注册${name}快捷键${key}`)
}

export function unregisterShortcut(name, key) {
  console.log('key', key)
  if (name === '' || key === '') {
    return
  }
  let shortcut = new gui.Shortcut({
    key: key,
    active: shortcutMap[name].active,
    failed: shortcutMap[name].failed,
  })
  gui.App.unregisterGlobalHotKey(shortcut)
  console.log(`解绑${name}快捷键${key}`)
}

export default {
  registerShortcut,
  unregisterShortcut,
}

