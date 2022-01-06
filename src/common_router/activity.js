import proComUrlObj from "@/utils/file"
const proComUrl = proComUrlObj

export default [
    // 聚宝盆
    {
        meta: {
            index: "interestRate"
        },
        path: "/activity/interestRate",
        name: "interestRate",
        component: () =>
            import( /* webpackChunkName: 'interestRate' */ "@/views/activity/interestRate")
    },
    // 娱乐无限
    {
        meta: {
            index: "fishHappyUnlimited"
        },
        path: "/activity/fishHappyUnlimited",
        name: "fishHappyUnlimited",
        component: () =>
            import("@/views/activity/fishHappyUnlimited")
    },
    // 对冲
    {
        meta: {
            index: "fund"
        },
        path: "/activity/fund",
        name: "fund",
        component: () =>
            import( /* webpackChunkName: 'fund' */ "@/views/activity/fund")
    },

    // 借贷宝
    {
        meta: {
            index: "loanTreasure"
        },
        path: "/activity/loanTreasure",
        name: "loanTreasure",
        component: () => {
            if (['chashao'].includes(process.env.VUE_APP_PROJECT_NAME) && proComUrl['loanTreasure']) {
                return import( /* webpackChunkName: 'loanTreasure' */ `@assets/views/${proComUrl['loanTreasure']}`)
            } else {
                return import( /* webpackChunkName: 'loanTreasure' */ "@/views/activity/loanTreasure")
            }
        }
    },

    // 推荐好友
    {
        meta: {
            index: "invitation"
        },
        path: "/activity/invitation",
        name: "invitation",
        component: () =>
            import( /* webpackChunkName: 'invitation' */ "@/views/activity/invitation")
    },

    // 签到
    {
        meta: {
            index: "sign"
        },
        path: "/activity/sign",
        name: "sign",
        component: () =>
            import( /* webpackChunkName: 'sign' */ "@/views/activity/sign")
    },

    // 美女派送
    {
        meta: {
            index: "welfare"
        },
        path: "/activity/welfare",
        name: "welfare",
        component: () =>
            import( /* webpackChunkName: 'welfare' */ "@/views/activity/welfare")
    },

    // 新手注册
    {
        meta: {
            index: "seminar"
        },
        path: "/activity/seminar",
        name: "seminar",
        component: () =>
            import( /* webpackChunkName: 'seminar' */ "@/views/activity/seminar")
    },

    // 六重礼
    {
        meta: {
            index: "sixGift"
        },
        path: "/activity/sixGift",
        name: "sixGift",
        component: () => {
            // if (['chashao'].includes(process.env.VUE_APP_PROJECT_NAME) && proComUrl['sixGift']) {
            //     return import( /* webpackChunkName: 'loanTreasure' */ `@assets/views/${proComUrl['sixGift']}`)
            // } else {
            //     return import( /* webpackChunkName: 'loanTreasure' */ "@/views/activity/sixGift")
            // }
            import(/* webpackChunkName: 'sixGift' */ "@/views/activity/sixGift")
        }
        // import(/* webpackChunkName: 'sixGift' */ "@/views/activity/sixGift")
    },

    // 红包雨活动
    {
        meta: {
            index: "redEnvelopeRain"
        },
        path: "/activity/redEnvelopeRain",
        name: "redEnvelopeRain",
        component: () =>
            import( /* webpackChunkName: 'redEnvelopeRain' */ "@/views/activity/redEnvelopeRain")
    },
    // USDT40让利
    {
        meta: {
            index: "usdt"
        },
        path: "/activity/usdt",
        name: "usdt",
        component: () =>
            import( /* webpackChunkName: 'redEnvelopeRain' */ "@/views/activity/USDT")
    },
    // 新时代新支付
    {
        meta: {
            index: "usdtInfo"
        },
        path: "/activity/usdtInfo",
        name: "usdtInfo",
        component: () =>
            import( /* webpackChunkName: 'redEnvelopeRain' */ "@/views/activity/usdtInfo")
    },
    // /activity/redEnvelopeRain
    // 鼠年活动
    // {
    //   meta: {
    //     index: "mouse"
    //   },
    //   path: "/activity/newyear",
    //   name: "mouse",
    //   component: () =>
    //     import(/* webpackChunkName: 'mouse' */ "@/views/activity/mouse")
    // }

    // 端午活动
    {
        meta: {
            index: "dragonBoat"
        },
        path: "/activity/dragonBoat",
        name: "dragonBoat",
        component: () =>
            import( /* webpackChunkName: 'dragonBoat' */ "@/views/activity/dragonBoat")
    },
    // 新手累存
    {
        meta: {
            index: "newerTotalDeposit"
        },
        path: "/activity/newerTotalDeposit",
        name: "newerTotalDeposit",
        component: () =>
            import( /* webpackChunkName: 'dragonBoat' */ "@/views/activity/newerTotalDeposit")
    },
    // 一对一
    {
        meta: {
            index: "past_appointments"
        },
        path: "/activity/past_appointments",
        name: "past_appointments",
        component: () =>
            import("@/views/activity/past_appointments")
    },
    // 一对一
    {
        meta: {
            index: "spreadinfo"
        },
        path: "/activity/spreadinfo",
        name: "spreadinfo",
        component: () =>
            import("@/views/activity/spreadinfo")
    },
    // 签到
    {
        meta: {
            index: "downAppInfo"
        },
        path: "/activity/downAppInfo",
        name: "downAppInfo",
        component: () =>
            import("@/views/activity/downAppInfo")
    },
    // {
    //     meta: {
    //         index: "moneyball"
    //     },
    //     path: "/activity/moneyball",
    //     name: "moneyball",
    //     component: () =>
    //         import ("@/views/activity/moneyball")
    // },
    // 点球成金
    {
        meta: {
            index: "dailySport"
        },
        path: "/activity/dailySport",
        name: "dailySport",
        component: () =>
            import("@/views/activity/dailySport")
    },
    // 周末福利赛
    {
        meta: {
            index: "weekSports"
        },
        path: "/activity/weekSports",
        name: "weekSports",
        component: () =>
            import("@/views/activity/weekSports")
    },
    // 周周存
    {
        meta: {
            index: "weeklySave"
        },
        path: "/activity/weeklySave",
        name: "weeklySave",
        component: () =>
            import("@/views/activity/weeklySave")
    },
    // 连赢爆单
    {
        meta: {
            index: "streakWins"
        },
        path: "/activity/streakWins",
        name: "streakWins",
        component: () =>
            import("@/views/activity/streakWins")
    },
    // 大转盘
    {
        meta: {
            index: "wheelSurf"
        },
        path: "/activity/wheelSurf",
        name: "wheelSurf",
        component: () =>
            import("@/views/activity/wheelSurf")
    },

];