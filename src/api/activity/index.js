import request from '@/utils/request'

// 存款top排行榜数据
export const withdrawtopinfo = (params) => {
    return request({
      url: '/withdrawtopinfo',
      params
    })
  }
  // 存款排行榜列表数据
export const withdrawlistinfo = (params) => {
  return request({
    url: '/withdrawlistinfo',
    params
  })
}

// 获取游戏分类
export function allgamecate(params) {
  return request({
    url: '/allgamecate',
    params
  })
}

// 商户游戏列表接口
export function activitylist(params) {
  return request({
    url: '/activitylist',
    params
  })
}

// 商户游戏列表接口
export function activityallstatus(params) {
  return request({
    url: '/activityallstatus',
    params
  })
}

// 优惠活动详情接口
export function activitydetail(params) {
  return request({
    url: '/activitydetail',
    params
  })
}

// 专题活动列表接口
export function speciallist(params) {
  return request({
    url: '/speciallist',
    params
  })
}

// 专题活动详情接口
export function specialdetail(params) {
  return request({
    url: '/specialdetail',
    params
  })
}

// 借款申请接口
export function joinborrow(params) {
  return request({
    url: '/joinborrow',
    method: 'post',
    params
  })
}

// 借贷宝破产申请
export function brokeapply(params) {
  return request({
    url: '/brokeapply',
    method: 'post',
    params
  })
}

// 借款申请记录接口
export function borrowjoinrecord(params) {
  return request({
    url: '/borrowjoinrecord',
    params
  })
}

// 优惠活动详情接口
export function hedgetoplist(params) {
  return request({
    url: '/hedgetoplist',
    params
  })
}

// 对冲基金申请记录接口
export function hedgejoinrecord(params) {
  return request({
    url: '/hedgejoinrecord',
    params
  })
}

// 对冲基金购买接口
export function joinhedge(params) {
  return request({
    url: '/joinhedge',
    method: 'post',
    params
  })
}

// 优惠活动详情接口
export function spreadinfo(params) {
  return request({
    url: '/spreadinfo',
    params
  })
}

// 优惠活动详情接口
export function spreadrecord(params) {
  return request({
    url: '/spreadrecord',
    params
  })
}

// 优惠活动详情接口
export function getspreadmoney(data) {
  return request({
    url: '/getspreadmoney',
    method: 'post',
    data
  })
}

// 优惠活动详情接口
export function signinfo(params) {
  return request({
    url: '/signinfo',
    params
  })
}

// 优惠活动详情接口
export function signrecord(params) {
  return request({
    url: '/signrecord',
    params
  })
}

// 优惠活动详情接口
export function joinsign(params) {
  return request({
    url: '/joinsign',
    method: 'post',
    params
  })
}

// 存款六重礼信息接口
export function sixinfo(params) {
  return request({
    url: '/sixinfo',
    method: 'get',
    params
  })
}

// 存款六重礼领取记录接口
export function sixinforecord(params) {
  return request({
    url: '/sixinforecord',
    method: 'get',
    params
  })
}

// 领取新手六重礼
export function getsixinfoReward(params) {
  return request({
    url: '/getsixinfoReward',
    method: 'get',
    params
  })
}

// 全部优惠活动接口
export function allbenefit(params) {
  return request({
    url: '/allbenefit',
    method: 'get',
    params
  })
}

// 往期约会名单
export function past_appointments(params) {
  return request({
    url: '/past_appointments',
    method: 'get',
    params
  })
}

// 获取已获得礼品奖励名单
export function getWinGiftList(params) {
  return request({
    url: '/getWinGiftList',
    method: 'get',
    params
  })
}

// 获取已获得现金奖励名单
export function getWinMoneyList(params) {
  return request({
    url: '/getWinMoneyList',
    method: 'get',
    params
  })
}

// 获取可使用和已使用数量
export function getAvailableNum(params) {
  return request({
    url: '/getAvailableNum',
    method: 'get',
    params
  })
}

// 获取各称号是否可领取状态
export function getLevelStatus(params) {
  return request({
    url: '/getLevelStatus',
    method: 'get',
    params
  })
}

// 领取奖励和称号
export function getAward(params) {
  return request({
    url: '/getAward',
    method: 'get',
    params
  })
}

// 换取线下活动
export function joinNewYearActivity(data) {
  return request({
    url: '/joinNewYearActivity',
    method: 'post',
    data
  })
}

// 换取线下活动
export function getMyGifts(data) {
  return request({
    url: '/getMyGifts',
    method: 'get',
    data
  })
}

// 红包雨活动
// 获取红包雨详情
export function getRedRainInfo() {
  return request({
    url: '/getredMoneyRain',
    method: 'get'
  })
}

// 领取红包雨活动奖金
export function claimRedRain() {
  return request({
    url: '/takeRedRain',
    method: 'get'
  })
}

// 记录用户参与场次
export function redMoneyRound() {
  return request({
    url: '/red_money_round',
    method: 'get'
  })
}

// 红包雨活动奖金列表
export function getRedRainWinList(params) {
  return request({
    url: '/get_redMoneyRainWinList',
    method: 'get',
    params
  })
}
// 红包雨活动个人中奖详情列表
export function getRedRainOwnWinList(params) {
  return request({
    url: '/red_money_useraward',
    method: 'get',
    params
  })
}

// 端午活动获取当前排名
export function getDragonBoatRank(params) {
  return request({
    url: '/rank',
    method: 'get',
    params
  })
}

// 端午活动获取排名列表
export function getDragonBoatRankList(params) {
  return request({
    url: '/ranklist',
    method: 'get',
    params
  })
}

// 端午活动-我的记录
export function getDragonBoatRankRecord(params) {
  return request({
    url: '/rankrecord',
    method: 'get',
    params
  })
}

// 鱼乐无限
export function fishHappyUnlimited(params) {
  return request({
    url: '/fishHappyUnlimited',
    method: 'get',
    params
  })
}
export function fishHappyPlay(params) {
  return request({
    url: '/fishHappyPlay',
    method: 'get',
    params
  })
}
// 新人累存
export function newerTotalDeposit(params) {
  return request({
    url: '/newerTotalDeposit',
    method: 'get',
    params
  })
}
// 新人累存
export function newerRegSent(params) {
  return request({
    url: '/newerRegSent',
    method: 'get',
    params
  })
}
// 新人累存
export function downAppInfo(params) {
  return request({
    url: '/downAppInfo',
    method: 'get',
    params
  })
}
// 新人累存
export function downAppSign(params) {
  return request({
    url: '/downAppSign',
    method: 'get',
    params
  })
}
export function downAppExchange(params) {
  return request({
    url: '/downAppExchange',
    method: 'get',
    params
  })
}
export function dailySport(params) {
  return request({
    url: '/dailySport',
    method: 'get',
    params
  })
}
export function weekSports(params) {
  return request({
    url: '/weekSports',
    method: 'get',
    params
  })
}
export function moneyball(params) {
  return request({
    url: '/moneyball',
    method: 'get',
    params
  })
} //获取我的礼品
export function getRouletteRecord(params) {
  return request({
    url: '/rouletteRecord',
    method: 'get',
    params
  })
}
//获取我的礼品
export function getRouletteMyGift(params) {
  return request({
    url: '/rouletteMyGift',
    method: 'get',
    params
  })
}
// 获取抽奖次数
export function getRouletteTimes(params) {
  return request({
    url: '/rouletteTimes',
    method: 'get',
    params
  })
}
// 获取抽奖结果

export function getRouletteResult(params) {
  return request({
    url: '/rouletteResult',
    method: 'get',
    params
  })
}

// 欧洲杯活动-活动记录
export function getEuroCupRecord(params) {
  return request({
    url: '/euro_quiz_records',
    method: 'get',
    params
  })
}

// 欧洲杯活动-参与竞猜
export function joinGuessEuroCup(data) {
  return request({
    url: '/euro_quiz_answer',
    method: 'post',
    data
  })
}

// 欧洲杯活动-活动详情
export function  getEuroCupInfo(params){
  return request({
    url: '/specialdetail',
    method: 'get',
    params
  })
}

// 欧洲杯活动-轮次列表
export function getEuroCupTurns(params){
  return request({
    url: '/euro_quiz_turns',
    method: 'get',
    params
  })
}

