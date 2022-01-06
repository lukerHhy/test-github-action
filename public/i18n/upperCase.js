const fs = require('fs')

const file = fs.readFileSync('./en.js', 'utf8')

let content = file.toString()

content = content.replace(/:(\s|[\r\n])+('|")\s?([a-z]{1})/ig, ($1) => `${$1.toLocaleUpperCase()}`)

fs.writeFileSync('./en.js', content)
