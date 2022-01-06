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
    envFile = fs.readFileSync(baseDir + './.env.production')
    content = envFile.toString().split('\n')
  } catch (e) {
    console.log('This is dev env')
  }
  if (!envFile) {
    await spawn('npm', ['run', 'build-cli'], {
      cwd: baseDir,
      stdio: 'inherit'
    })
    return
  }
  let templateName
  content.map(item => {
    const text = item.replace(/\s/g, '')
    const regRes = text.match(reg)
    if (regRes) {
      templateName = regRes[1]
    }
  })

  if (!templateName) throw new Error('检查商户号失败')

  // if (['10001', '10029', '10060', '10062'].includes(templateName)) {
  //   throw new Error('跳过指定商户构建')
  // }

  await spawn(
    'curl',
    [
      '-u',
      'tnvh:8fjnb',
      `https://commonsource.awgroup.dev/h5/${templateName}.zip`,
      '-o',
      'a.zip',
      '-s'
    ],
    {
      cwd: baseDir,
      stdio: 'inherit'
    }
  )

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

  const templateConfig = {
    10001: 'wanqu',
    10002: 'chashao',
    10003: 'chobet',
    10004: 'takchun',
    10005: 'mgm8' 
  }
  
  if (templateConfig[templateName]) {
    fs.writeFileSync(baseDir + './.env.production', envFile.toString().replace(`VUE_APP_PROJECT_NAME=${templateName}`, `VUE_APP_PROJECT_NAME=${templateConfig[templateName]}`));
  }
  console.log('====================================');
  console.log(templateName, fs.readFileSync(baseDir + './.env.production').toString());
  console.log('====================================');

  await spawn('npm', ['run', 'build-cli'], {
    cwd: baseDir,
    stdio: 'inherit'
  })
}

main()
