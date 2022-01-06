import { profitRank } from '@/api'
import { siteinfo } from '@/api/home'
import { canwithdraw, rechargeflow, memberlevellist } from '@/api/memberCenter'
import router from '../../router'
import { Toast } from 'vant'
import * as types from '../types'
import store from '../index'

const getInitGameSearch = () => {
    return {
        visible: false,
        keyword: '',
        category: ''
    }
}
const getInitStatus = () => {
    return {
        status: false,
        telDisplay: false,
        tipsDisplay: {
            show: false
        },
        emailDisplay: false,
        passDisplay: false,
        loginDisplay: false,
        proDisplay: false,
        idDisplay: false,
        isShowSave: false,
        hideFooter: false,
    }
}

const storage = sessionStorage
const siteInfo = storage.getItem('siteInfo')?JSON.parse(storage.getItem('siteInfo')):''

const state = {
    // 游戏搜索
    gameSearch: getInitGameSearch(),
    dataProfitsRankOriginal: [],
    // 盈利排行榜数据（所有平台汇总数据(concat所有的list数据)
    dataProfitsRank: [],
    // 站点配置
    siteInfo,
    popupShow: getInitStatus(),
    noLogin: false,
    isRegister: false,
    // 显示流水数据
    showFlow: false,
    // 游戏模式转账弹窗
    showTransfer: {},
    rechargeData: [],
    memberLevel: [],
    showRedBag: false,
    redMsg: {},
    liveType: '',
    LoginModal: false,
    // app下载条
    appDownloadBar: !window.sessionStorage.getItem('downAppHidden')
}

const actions = {
    setGameSearch({ commit }, data) {
        commit(types.SET_GAME_SEARCH, data)
    },
    setNoLogin({ commit }, data) {
        commit(types.SET_NO_LOGIN, data)
    },
    setPopShow({ commit }, data) {
        commit(types.SET_POPUP_SHOW, data)
    },
    setLoginPopShow({ commit }, data) {
        commit(types.SET_LOGINPOPUP_SHOW, data)
    },
    setGuide({ commit }, data) {
        commit(types.SET_GUIDE_REGISTER, data)
    },
    setRedBag({ commit }, data) {
        commit(types.SET_RED_BAG, data)
    },
    setFlow({ commit, dispatch }, data) {
        // commit(types.SET_SHOW_FLOW, data)
        if (data) {
            commit(types.SET_FLOW_DATA, [])
            dispatch('getFlowData', data)
        } else {
            commit(types.SET_SHOW_FLOW, data)
        }
    },
    setTransfer({commit},data) {
        commit(types.SET_SHOW_TRANSFER, data) 
    },
    getFlowData({ commit }, params) {
        // state.rechargeData = []
        console.log('state',store.state.users.wallet.all_platform_money, store.state.users.wallet.is_auto_trans)
        const wallet = store.state.users.wallet

        return new Promise((resolve, reject) => {

            canwithdraw().then(res => {
                if (wallet.all_platform_money > 10 && wallet.is_auto_trans !== 1) {
                    commit(types.SET_SHOW_FLOW, true)
                }
                const { code, data } = res.data
                if (code == 0 || !data.length) {
                    // Toast('流水达标')
                    setTimeout(() => {
                        if (wallet.all_platform_money > 10 && wallet.is_auto_trans !== 1) {
                            commit(types.SET_SHOW_FLOW, true)
                            commit(types.SET_FLOW_DATA, [])
                            resolve([])
                        } else {
                            router.push({ path: "/withdraw" })
                            commit(types.SET_SHOW_FLOW, false)
                        }
                    }, 800)
                }
            }, err => {
                // commit(types.SET_SHOW_FLOW, true)
                setTimeout(() => {
                    rechargeflow().then(res => {
                        const { code, data, msg } = res.data
                        if (code == 0) {
                            commit(types.SET_SHOW_FLOW, true)
                            commit(types.SET_FLOW_DATA, data.data)
                            resolve(data.data)
                        } else {
                            reject(msg)
                        }
                    })
                    if (wallet.all_platform_money > 10 && wallet.is_auto_trans !== 1) {
                        commit(types.SET_SHOW_FLOW, true)
                    }
                }, 800)
            })
        })
    },
    getProfitsRank({ commit }, params) {
        return new Promise((resolve, reject) => {
            profitRank(params)
                .then(res => {
                    const { code, data, msg } = res.data
                    if (code === 0) {
                        resolve(data)
                        commit(types.SET_PROFITS_RANK_DATA, data)
                    } else {
                        reject(msg)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    getSiteInfo({ commit }, params) {
        return new Promise((resolve, reject) => {
            siteinfo(params)
                .then(res => {
                    const { code, data, msg } = res.data
                    if (code === 0) {
                        resolve(data)
                        commit(types.SET_SITE_INFO, data)
                    } else {
                        reject(msg)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    getMemberLevel({ commit, state }) {
        return new Promise((resolve, reject) => {
            memberlevellist()
                .then(res => {
                    const { code, data, msg } = res.data
                    if (code === 0) {
                        resolve(data)
                        commit(types.SET_MEMBER_ALL_LEVEL, data)
                    } else {
                        reject(msg)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    setappDownloadBar ({commit}, data) {
      commit(types.SET_APP_DOWNLOAD_BAR, data)
      window.sessionStorage.setItem('downAppHidden', 1)
    },
}

const getters = {
    gameSearch: state => state.gameSearch,
    siteInfo: state => state.siteInfo,
    liveType: state => state.liveType,
    appDownloadBar: state => state.appDownloadBar
}

const mutations = {
    [types.SET_LIVETYPE](state, data) {
        state.liveType = data
    },
    [types.SET_GAME_SEARCH](state, data) {
        if (!data) {
            state.gameSearch = getInitGameSearch()
        } else {
            const { visible, keyword, category, nav, payforline, platform } = data
            Object.assign(state.gameSearch, {
                visible,
                keyword,
                category,
                nav,
                payforline,
                platform
            })
        }
    },
    [types.SET_PROFITS_RANK_DATA](state, datas) {
        state.dataProfitsRankOriginal = datas || []
        let lists = []
        datas.forEach(data => {
            lists = lists.concat(data.list || [])
        })
        state.dataProfitsRank = lists
    },
    [types.SET_SITE_INFO](state, data) {
        state.siteInfo = data
        storage.setItem('siteInfo', JSON.stringify(data))
    },
    [types.SET_POPUP_SHOW](state, data) {
        state.popupShow = getInitStatus()
        for (let key in data) {
            state.popupShow[key] = data[key]
        }
    },
    [types.SET_LOGINPOPUP_SHOW](state, LoginModal) {
        state.LoginModal = LoginModal || false
    },
    [types.SET_NO_LOGIN](state, noLogin) {
        state.noLogin = noLogin || false
    },
    [types.SET_GUIDE_REGISTER](state, isRegister) {
        state.isRegister = isRegister || false
    },
    [types.SET_RED_BAG](state, showRedBag) {
        state.showRedBag = showRedBag[0] || false
        state.redMsg = { data: showRedBag[1], money: showRedBag[2] } || {}
    },
    [types.SET_SHOW_FLOW](state, showFlow) {
        state.showFlow = showFlow || false
    },
    [types.SET_SHOW_TRANSFER](state, data) {
        console.log('data', data)
        state.showTransfer = data
    },
    [types.SET_FLOW_DATA](state, rechargeData) {
        console.log('re', rechargeData)
        state.rechargeData = rechargeData || []
    },
    [types.SET_MEMBER_ALL_LEVEL](state, level) {
        state.memberLevel = level
    },
    [types.SET_APP_DOWNLOAD_BAR] (state, show) {
      state.appDownloadBar = show
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}