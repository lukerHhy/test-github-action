const spawn = require('./spawn') // note-1 导入封装好的 spawn
const path = require('path')
const fs = require('fs')

const baseDir = path.join(__dirname, '../')

function removeDir(dir) {
  let files = fs.readdirSync(dir)
  for (var i = 0; i < files.length; i++) {
    let newPath = path.join(dir, files[i])
    let stat = fs.statSync(newPath)
    if (stat.isDirectory()) {
      //如果是文件夹就递归下去
      removeDir(newPath)
    } else {
      //删除文件
      fs.unlinkSync(newPath)
    }
  }
  fs.rmdirSync(dir) //如果文件夹是空的，就将自己删除掉
}

async function main() {
  let envFile
  let content
  const reg = /^VUE_APP_PROJECT_NAME=(.+)$/
  try {
    // envFile = fs.readFileSync(baseDir + './.env.production')
    // content = envFile.toString().split('\n')
    content = `VUE_APP_MERCHANT_NO = 10051
    VUE_APP_PROJECT_NAME = 10051
    VUE_APP_WEB_API_URL = https://userapi.ylapi.one/
    VUE_APP_H5_API_URL = https://userapi.ylapi.one/
    VUE_APP_AGENT_API_URL = https://agentapi.ylapi.one/
    VUE_APP_ADMIN_API_URL = https://operationapi.ylapi.one/
    VUE_APP_WS_URL = wss://ws.ylapi.one/
    VUE_APP_ASSET_PATH = https://acebet-assets.cdn.bcebos.com/a17479231dc298309a3fda7d7d00111a/web/
    USERNAME = xxxx
    PASSWORD = abcd
    VUE_APP_GAME_DOMAIN = www.ylzt.one
    `.split('\n')
  } catch (e) {
    console.log('This is dev env')
  }
  // if (!envFile) {
  //   await spawn('npm', ['run', 'build-cli'], {
  //     cwd: baseDir,
  //     stdio: 'inherit'
  //   })
  //   return
  // }
  let templateName
  content.map(item => {
    const text = item.replace(/\s/g, '')
    const regRes = text.match(reg)
    if (regRes) {
      templateName = regRes[1]
    }
  })

  console.log(templateName);

  if (!templateName) throw new Error('检查商户号失败')

  await spawn(
    'curl',
    [
      '-u',
      'tnvh:8fjnb',
      `https://commonsource.awgroup.dev/web/${templateName}.zip`,
      '-o',
      'a.zip',
      '-s'
    ],
    {
      cwd: baseDir,
      stdio: 'inherit'
    }
  )

  return

  try {
    let files = fs.readdirSync(baseDir + 'src/current_project')
    if (files && files.length >= 0) {
      removeDir(baseDir + 'src/current_project')
    }
  } catch (e) {
    console.log('remove fold error')
  }

  await spawn('unzip', ['-o', '-d', 'src/current_project', 'a.zip'], {
    cwd: baseDir,
    stdio: 'inherit'
  })

  await spawn('npm', ['run', 'build-cli'], {
    cwd: baseDir,
    stdio: 'inherit'
  })
}

main()
