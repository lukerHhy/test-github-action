
const requireImg = require.context(`@assets/img3_0/other`, true, /\.(jpg|png|gif|svg)$/)
let resultImgs = {}
requireImg.keys().forEach((fileName) => {
    const name = fileName.substring(fileName.lastIndexOf('/')+1,fileName.length-4)
    const comp = requireImg(fileName)
    resultImgs[name] = comp
})
export default resultImgs
