import path from 'path'
import fs from 'fs'

let files = fs.readdirSync(path.join('./', 'static', 'lang'))

let langPack = {}

for (let file of files) {
  if (file !== 'index.js') {
    langPack[file.replace(/.js/, '')] = require(`./${file}`)
  }
}

export default langPack
