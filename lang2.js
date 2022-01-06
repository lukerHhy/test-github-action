var fs = require("fs");
var path = require("path");

//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve("./src/views");
var filePath2 = path.resolve("./src/components");

let allWords = [];

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath, callback) {
  //根据文件路径读取文件，返回文件列表
  const files = fs.readdirSync(filePath);
  files.forEach(function(filename) {
    //获取当前文件的绝对路径
    var filedir = path.join(filePath, filename);
    //根据文件路径获取文件信息，返回一个fs.Stats对象
    const stats = fs.statSync(filedir);
    var isFile = stats.isFile(); //是文件
    var isDir = stats.isDirectory(); //是文件夹
    if (isFile && filename.indexOf(".vue") >= 0) {
      callback(filedir);
    }
    if (isDir) {
      fileDisplay(filedir, callback); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  });
}


function replaceWords(file) {
  const content = fs
    .readFileSync(file)
    .toString()
    .split("\n");
    content.forEach(text => {
        let res = text.match(/\$t\('([^']*)'\)/);
        if(res){
            allWords.push(res[1])
        }
        res = text.match(/\$t\("([^"]*)"\)/);
        if(res){
            allWords.push(res[1])
        }

    })
}

fileDisplay(filePath, replaceWords);
fileDisplay(filePath2, replaceWords);

let allwordsMap = {};
allWords.forEach((word) => (allwordsMap[word] = word));

const templateStr = `
module.exports = ${JSON.stringify(allwordsMap, 4)}
`;

fs.writeFileSync("temp2.js", templateStr);
console.log(allWords);