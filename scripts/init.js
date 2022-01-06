const spawn = require('./spawn');  // note-1 导入封装好的 spawn
const path = require('path');
const fs = require('fs');

const baseDir = path.join(__dirname, '../');

async function git(...args) {
    return spawn('git', args, {
        cwd: baseDir,
        stdio: 'inherit'
    });
}

async function fetchTemplate() {
    await git(`submodule`, 'init');
    await git(`submodule`, 'update', '--depth', '1');
}

fetchTemplate().then(() => console.log('init success!'))