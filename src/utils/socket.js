let Socket = ''
let ReconnectCount = 0
let ConnectUrl = ''

/**
 * 建立websocket连接
 * @param {string} url ws地址
 */
export const createSocket = url => {
  ConnectUrl = url
  Socket && Socket.close()
  if (!Socket) {
    console.log('建立websocket连接')
    Socket = new WebSocket(url)
    Socket.onopen = onopenWS
    Socket.onmessage = onmessageWS
    Socket.onerror = onerrorWS
    Socket.onclose = oncloseWS
  } else {
    console.log('websocket已连接')
  }
}

/** 打开WS */
const onopenWS = (e) => {
  console.log('socket已连接')
  console.log(e)
}

/** 连接失败重连 */
const onerrorWS = () => {
  if (ReconnectCount <= 3) {
    ReconnectCount++
    Socket.close()
    console.log('连接失败重连中')
    Socket = null
    createSocket(ConnectUrl)
  } else {
    oncloseWS()
    console.log('连接错误')
  }
}

/** WS数据接收统一处理 */
const onmessageWS = e => {
  console.log('正常接收信息', e)
}

/** 断开重连 */
export const oncloseWS = () => {
  console.log('websocket已断开....')
  Socket.close()
  Socket = null
  ReconnectCount = 0
}
