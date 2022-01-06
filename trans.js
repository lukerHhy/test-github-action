const translate = require("google-translate-open-api").default;
const texts = require("./web.js");
const fs = require("fs");

async function func() {
  const zhs = Object.keys(texts).map((i) => i);
  const res_map = {};
  for (let i = 0; i < zhs.length; i++) {
    const result = await translate(zhs[i], {
      client: "dict-chrome-ex",
      to: "en",
    });
    const trans_result = result.data.sentences;
    let transStr = "";
    for (let j = 0; j < trans_result.length - 1; j++) {
      transStr += trans_result[j].trans;
    }
    res_map[zhs[i]] = transStr;
  }
  const str = JSON.stringify(res_map);
  fs.writeFileSync("en.json", str);
}
func();
