import request from '@/utils/request'
// 所有游戏分类接口
export const liveIndex = params => {
    return request({
        url: 'https://interface.bodan.tv/api/live/index',
        params
    })
}
export const leagueIndex = data => {
    return request({
        url: 'https://interface.bodan.tv/api/league/index',
        method: 'POST',
        data
    })
}
export const leagueType = data => {
    return request({
        url: 'https://interface.bodan.tv/api/league/type',
        method: 'POST',
        data
    })
}
export const basketball = data => {
    return request({
        url: 'https://interface.bodan.tv/api/basketball/odd',
        method: 'POST',
        data
    })
}
export const football = data => {
    return request({
        url: 'https://interface.bodan.tv/api/football/odd',
        method: 'POST',
        data
    })
}