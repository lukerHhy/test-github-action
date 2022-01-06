const origin = require('./src/i18n/en.js');
// const target = require('./en.js');
const fs = require('fs')
const keys = Array.from(new Set(Object.keys(origin)));

const maps = {};

keys.forEach(i => {
        maps[i] = i
});

fs.writeFileSync('tras.json', JSON.stringify(maps))