var fs = require("fs");
var path = require("path");

//解析需要遍历的文件夹，我这以E盘根目录为例
var filePath = path.resolve("./src/views");

let allWords = [];
function getWords(file) {
  const content = fs.readFileSync(file).toString();
  const matched = content.match(/\>([\u4e00-\u9fa5+\(\)\-\/？\?，。%！]+)\</g);
  const matched2 = content.match(/\"([\u4e00-\u9fa5+\(\)\-\/？\?，。%！]+)\"/g);
  const matched3 = content.match(/\'([\u4e00-\u9fa5+\(\)\-\/？\?，。%！]+)\'/g);
  if (matched) {
    allWords = allWords.concat(
      matched.map((item) => item.substr(1, item.length - 2))
    );
  }
  if (matched2) {
    allWords = allWords.concat(
      matched2.map((item) => item.substr(1, item.length - 2))
    );
  }
  if (matched3) {
    allWords = allWords.concat(
      matched3.map((item) => item.substr(1, item.length - 2))
    );
  }
}

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
    if (isFile && filename.indexOf('.vue') >= 0) {
      callback(filedir);
    }
    if (isDir) {
      fileDisplay(filedir, callback); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  });
}

fileDisplay(filePath, getWords);
allWords = Array.from(new Set(allWords));

let allwordsMap = {};
allWords.forEach((word) => (allwordsMap[word] = word));

const templateStr = `
module.exports = ${JSON.stringify(allwordsMap, 4)}
`;

fs.writeFileSync("temp2.js", templateStr);
console.log(allWords);

function replaceWords(file) {
  const content = fs
    .readFileSync(file)
    .toString()
    .split("\n");
  let currentMode = "";
  let contentResult = [];

  function execute(text) {
    if (currentMode === "template") {
      let tempText = text.replace(
        /(:[\w\-]+)\="'([A-Za-z]*[\u4e00-\u9fa5]+[A-Za-z]*)'"/g,
        function(word, $1, $2, $3) {
          return ` ${$1.trim()}="$t('${$2}')"`;
        }
      );
      tempText = tempText.replace(
        /\{\{\s?'([A-Za-z]*[\u4e00-\u9fa5]+[A-Za-z]*)[^}]*'\s?\}\}/g,
        function(word, $1, $2, $3) {
          return `{{$t('${$1}')}}`;
        }
      );
      tempText = tempText.replace(
        /([^\:][\w\-]+)\=\"([A-Za-z]*[\u4e00-\u9fa5]+[A-Za-z]*[^"]*)\"/g,
        function(word, $1, $2, $3) {
          return ` :${$1.trim()}="$t('${$2}')"`;
        }
      );
      tempText = tempText.replace(
        /([^\:][\w\-]+)\=\'([A-Za-z]*[\u4e00-\u9fa5]+[A-Za-z]*)[^']*\'/g,
        function(word, $1, $2, $3) {
          return ` :${$1.trim()}="$t('${$2}')"`;
        }
      );
      tempText = tempText.replace(/\>([A-Za-z]*[\u4e00-\u9fa5]+[A-Za-z]*[^}<]*)\</g, function(
        word,
        $1
      ) {
        return ">{{$t('" + $1 + "')}}<";
      });
      tempText = tempText.replace(/^[\s\t]*([A-Za-z]*[\u4e00-\u9fa5]+[A-Za-z]*)[\s\t]*$/g, function(
        word,
        $1
      ) {
        return "{{$t('" + $1 + "')}}";
      });
      return tempText;
    } else if (currentMode === "script") {
      let tempText = text;
      if (!text.match(/\$t\(/)) {
        tempText = text.replace(
          /(?!\$t\()\'([A-Za-z]*[\u4e00-\u9fa5]+[A-Za-z]*[^']*)\'/g,
          function(word, $1, $2) {
            return `this.$t('${$1}')`;
          }
        );
        tempText = tempText.replace(
          /(?!\$t\()\"([A-Za-z]*[\u4e00-\u9fa5]+[A-Za-z]*[^"]*)\"/g,
          function(word, $1, $2) {
            return `this.$t('${$1}')`;
          }
        );
      }
      return tempText;
    } else {
      return text;
    }
  }

  content.forEach((item) => {
    if (item.indexOf("<template") >= 0) {
      currentMode = "template";
    } else if (item.indexOf("<script") >= 0) {
      currentMode = "script";
    } else {
      item = execute(item);
    }
    contentResult.push(item);
  });
  fs.writeFileSync(file, contentResult.join('\n'));
}

fileDisplay(filePath, replaceWords);
