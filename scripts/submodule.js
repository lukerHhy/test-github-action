const spawn = require('./spawn') // note-1 导入封装好的 spawn
const path = require('path')
const fs = require('fs')

const args = process.argv.slice(2)
const templateName = args[0]

const baseDir = path.join(__dirname, '../')

const targetCodeDir = path.resolve(baseDir, './src/current_project')

const templateConfig = {
  10001: 'wanqu',
  10002: 'chashao',
  10003: 'chobet',
  10004: 'takchun',
  10005: 'mgm8' 
}

async function setupENV(){
  const envFile = fs.readFileSync(baseDir + './.env');
  const content = envFile.toString().split('\n');
  const reg = /(#?)VUE_APP_PROJECT_NAME=(.+)$/;
  let res = content.map(item => {
    const text = item.replace(/\s/g, '');
    const regRes = text.match(reg);
    if(regRes){
      if( regRes[1] === '#'){
        if(regRes[2] === templateConfig[templateName] || regRes[2] === templateName){
          return `VUE_APP_PROJECT_NAME = ${templateConfig[templateName] || templateName}`;
        }
        return item;
      }else{
        if (regRes[2] === templateConfig[templateName] || regRes[2] === templateName) {
          return item;
        }else{
          return '#' + item;
        }
      }
    }
    return item;
  })
  res = res.join('\n');
  fs.writeFileSync(baseDir + './.env', res);
}

async function git(...args) {
  return spawn('git', args, {
    cwd: targetCodeDir,
    stdio: 'inherit'
  })
}

async function checkout() {
  setupENV()
  await git(`remote`,'set-branches','origin',templateName);
  await git(`fetch`,'--depth','1','origin',templateName);
  await git(`checkout`,templateName)
}

checkout()
