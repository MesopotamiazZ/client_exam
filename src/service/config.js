const fs = require('fs')
const path = require('path')

let config = {
  serverUrl: 'http://192.168.1.193',
  version: 'v1.0.0',
}

try {
  config = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'static', 'config.json'))
  )
} catch (err) {
  console.error(err)
}

export default config
