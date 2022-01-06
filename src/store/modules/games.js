import * as api from '@/api/games'
import * as types from '../types'

const state = {
  allPlatforms: {},
  allCates: {},
  gameCatesPlatforms: [],
  platformGameIds: [],
  platformGameIdsv2: []
}

const actions = {
  getAllPlatforms ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.getAllPlatforms(params)
        .then(res => {
          const { code, data, msg } = res.data
          if (code === 0) {
            resolve(data)
            commit(types.SET_ALL_PLATFORMS, data)
          } else {
            reject(msg)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getAllCates({commit},params) {
    return new Promise((resolve, reject) => {
      api.getAllGameCates(params)
        .then(res => {
          const { code, data, msg } = res.data
          if (code === 0) {
            resolve(data)
            commit(types.SET_ALL_CATES, data)
          } else {
            reject(msg)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getAllGameCatesPlatforms ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.getAllGameCatesPlatforms(params)
        .then(res => {
          const { code, data, msg } = res.data
          if (code === 0) {
            data.map(item => {
              item.game_cate_name = item.name
              item.platform_list = item.list_data
              let platform = []
              item.platform_list.map((m, index) => {
                m.game_platform_name = m.name
                m.game_platform_id = m.id
                if (m.status !== 2) {
                  platform.push(m)
                }
              })
              item.platform_list = platform
            })
            resolve(data)
            commit(types.SET_GAMECATES_PLATFORMS, data)
          } else {
            reject(msg)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getPlatformGameIds ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.getPlatformGameIds(params)
        .then(res => {
          const { code, data, msg } = res.data
          if (code === 0) {
            resolve(data)
            commit(types.SET_ALL_GAME_IDS, data)
          } else {
            reject(msg)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getPlatformGameIdsv2 ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.getplatformgameidsv2(params)
        .then(res => {
          const { code, data, msg } = res.data
          if (code === 0) {
            resolve(data)
            console.log(222, data)
            commit(types.SET_ALL_GAME_IDS_V2, data)
          } else {
            reject(msg)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  gameOnlineCheck ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.onlinecheck(params)
        .then(res => {
          const { code, data, msg } = res.data
          if (code === 0) {
            resolve(data)
          } else {
            reject(msg)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  gameBacktrans ({ commit }, params) {
    return new Promise((resolve, reject) => {
      api.backtrans(params)
        .then(res => {
          const { code, data, msg } = res.data
          if (code === 0) {
            resolve(data)
          } else {
            reject(msg)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

const getters = {
  gameCatesPlatforms: state => state.gameCatesPlatforms,
  allPlatforms: state => state.allPlatforms,
  allCates: state => state.allCates,
  platformGameIds: state => state.platformGameIds
}

const mutations = {
  [types.SET_ALL_PLATFORMS] (state, data) {
    if (data) {
      state.allPlatforms = data
    } else {
      state.allPlatforms = {}
    }
  },
  [types.SET_GAMECATES_PLATFORMS] (state, data) {
    if (data) {
      state.gameCatesPlatforms = data
    } else {
      state.gameCatesPlatforms = []
    }
  },
  [types.SET_ALL_CATES] (state, data) {
    if (data) {
      state.allCates = data
    } else {
      state.allCates = []
    }
  },
  [types.SET_ALL_GAME_IDS] (state, data) {
    if (data) {
      state.platformGameIds = data
    } else {
      state.platformGameIds = []
    }
  },
  [types.SET_ALL_GAME_IDS_V2] (state, data) {
    if (data) {
      console.log(333, data)
      state.platformGameIdsv2 = data
    } else {
      state.platformGameIdsv2 = []
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
