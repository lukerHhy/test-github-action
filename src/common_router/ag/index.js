export default[
    {
        path: "/",
        name: "Home",
        component: () => {
            return import ('@/views/ag-series/home')
        }
    },
    {
        path: "/gameSearch",
        name: "GameSearch",
        // component: ()=> import("@/views/home/gameSearch")
        component: () => {
            return import ('@/views/home/gameSearch')
        }
    }, 
    {
        path: "/slots",
        name: "slots",
        component: () => {
            return import ('@/views/ag-series/home/slots')
        }
    },
    {
        path: "/profitsRank",
        name: "ProfitsRank",
        component: () => {
            return import ('@/views/ag-series/rank/index')
        }
    },
    {
        path: "/withdrawRank",
        name: "WithdrawRank",
        component: () => {
            return import ('@/views/withdrawRank/index')
        }
    },
    {
        path: "/login",
        name: "login",
        // component: ()=> import("@/views/login/login")
        component: () => {
            return import ('@/views/ag-series/login/login')
        }
    },
    {
        path: "/register",
        name: "register",
        // component: ()=> import("@/views/login/register")
        component: () => {
            return import ('@/views/ag-series/login/register')
        }
    },
    {
        path: "/registerSuccess",
        name: "registerSuccess",
        component: () => {
            return import ('@/views/ag-series/login/registerSuccess')
        }
    },
    {
        path: "/forgetPassword",
        name: "forgetPassword",
        component: () => {
            return import ('@/views/login/forgetPassword')
        }
    },
    {
        path: "/downApp",
        name: "downApp",
        component: () => {
            return import ('@/views/ag-series/downApp')
        }
    },
    {
        path: "/downDetail",
        name: "downDetail",
        component: () => {
            return import ('@/views/ag-series/downApp/downDetail')
        }
    },
    // {
    //   path: "/lineCheck",
    //   name: "lineCheck",
    //   component: ()=> import("@/views/lineCheck")
    // },
    {
        path: "/vip",
        name: "vip",
        component: () => {
            return import ('@/views/ag-series/vip')
        }
    }, 
    {
        path: "/luckyway",
        name: "luckyway",
        component: () =>
            import ("@/views/luckyway")
    },
    {
        path: "/vip/analysis",
        name: "analysis",
        component: () =>
            import ("@/views/vip/analysis")
    },
    {
        path: '/activities',
        name: 'activities',
        // component: ()=> import('@/views/activities')
        component: () => {
            return import ('@/views/ag-series/activities')
        }
    },
    {
        path: '/activeDetail',
        name: 'activitiesDetails',
        // component: ()=> import('@/views/activities/details')
        component: () => {
            return import ('@/views/activities/details')
        }
    },
    {
        path: '/activities/:id',
        name: 'activitiesDetailsId',
        // component: ()=> import('@/views/activities/details')
        component: () => {
            return import ('@/views/activities/details')
        }
      },
    {
        path: "/brand",
        name: "brand",
        component: () => {
            return import ('@/views/ag-series/brand/index')
        }
    },
    {
        path: "/brand/:id",
        name: "brandDetails",
        // component: ()=> import("@/views/brand/details")
        component: () => {
            return import ('@/views/ag-series/brand/brandDetail')
        }
    },
    {
        path: "/news",
        name: "news",
        // component: ()=> import("@/views/news/index")
        component: () => {
            return import ('@/views/news/index')
        }
    },
    {
        path: "/newsDetail",
        name: "newsDetail",
        // component: ()=> import("@/views/news/newsDetail")
        component: () => {
            return import ('@/views/news/newsDetail')
        }
    },
    {
        path: "/kefu",
        name: "Kefu",
        component: () =>
            import ("@/views/news/kefu")
    },
    {
        path: "/more", //更多
        name: "more",
        component: () =>
            import ("@/views/personalData/more")
    },
    {
        path: "/memberCenter",
        name: "memberCenter",
        // component: ()=> import("@/views/memberCenter")
        component: () => {
            return import ('@/views/ag-series/memberCenter')
        }
    },
    {
        path: "/wallet",
        name: "wallet",
        // component: ()=> import("@/views/memberCenter/wallet")
        component: () => {
            return import ('@/views/ag-series/memberCenter/wallet')
        }
    },
    {
        path: "/walletTransfer",
        name: "walletTransfer",
        component: () =>
            import ("@/views/memberCenter/walletTransfer")
    },
    {
        path: "/deposit",
        name: "deposit",
        component: () => {
            return import ('@/views/ag-series/memberCenter/deposit')
        }
    },
    {
        path: "/washcode",
        name: "washcode",
        component: () =>
            import ("@/views/memberCenter/washcode")
    },
    {
        path: "/historyRecord",
        name: "historyRecord",
        component: () =>
            import ("@/views/memberCenter/historyRecord")
    },
    {
        path: "/quotaTransfer",
        name: "quotaTransfer",
        component: () => {
            return import ('@/views/ag-series/memberCenter/quotaTransfer')
        }
    },
    {
        path: "/allGamesPlantform",
        name: "allGamesPlantform",
        component: () =>
            import ("@/views/memberCenter/allGamesPlantform")
    },
    {
        path: "/discountCore",
        name: "discountCore",
        component: () =>
            import ("@/views/memberCenter/discountCore")
    },
    {
        path: "/withdraw",
        name: "withdraw",
        component: () => {
            return import ('@/views/memberCenter/withdraw')
        }
    },
    {
        path: "/businessRecord",
        name: "businessRecord",
        component: () => {
            return import ('@/views/ag-series/memberCenter/businessRecord')
        }
    },
    {
        path: "/shopMall",
        name: "shopMall",
        component: () => {
            return import ('@/views/esport-series/shop-mall/index')
        }
    },
    {
        path: "/productsExchange",
        name: "productsExchange",
        meta: {
            title: '商品兑换'
        },
        component: () =>
            import ('@/views/esport-series/shop-mall/productsExchange'),
    },
    {
        path: "/goodsRecord",
        name: "goodsRecord",
        meta: {
            title: '商品记录'
        },
        component: () =>
            import ('@/views/esport-series/shop-mall/goodsRecord'),
    },
    {
        path: "/esportVip",
        name: "esportVip",
        meta: {
            title: 'VIP'
        },
        component: () =>
            import ('@/views/esport-series/memberCenter/esportVip'),
    },
    {
        path: "/bankcard",
        name: "bankcard",
        // component: ()=> import("@/views/memberCenter/bankcard")
        component: () => {
            return import ('@/views/memberCenter/bankcard')
        }
    },
    {
        path: "/addBankCard",
        name: "addBankCard",
        component: () =>
            import ("@/views/memberCenter/addBankCard")

    },
    {
        path: "/serviceSubscription",
        name: "serviceSubscription",
        component: () => {
            return import ('@/views/memberCenter/serviceSubscription')
        },
    },
    {
        path: "/scroll",
        name: "scroll",
        component: () => {
            return import ('@/views/yabo-series/home/scroll')
        }
    },
    {
        path: "/help",
        // component: ()=> import("@/views/help"),
        component: () => {
            return import ('@/views/help')
        },
        children: [{
                path: "main",
                name: "main",
                meta: {
                    title: '新手教程'
                },
                component: () =>
                    import ('@/views/yabo-series/help/main'),
            },
            {
                path: "tutorial",
                name: "tutorial",
                meta: {
                    title: '常见问题'
                },
                component: () => {
                    return import ('@/views/help/tutorial')
                }
            },
            {
                path: "introduction",
                name: "introduction",
                meta: {
                    title: '品牌实力'
                },
                component: () => {
                    return import ('@/views/help/introduction')
                }
            },
            {
                path: "manual",
                name: "manual",
                meta: {
                    title: '游戏手册'
                },
                component: () =>
                    import ("@/views/help/manual")
            },
            {
                path: "protection",
                name: "protection",
                meta: {
                    title: '安全保障'
                },
                component: () => {
                    return import ('@/views/help/protection')
                }
            },
            // 配置根路由
            { path: "/", redirect: "main" }
        ],
    },
    {
        path: "/helpDetail",
        name: "helpDetail",
        component: () =>
            import ("@/views/help/detail")
    },
    {
        path: "*",
        name: "404",
        component: () => {
            return import ('@/views/ag-series/error/404')
        }
    },
    {
        path: "/403",
        name: "403",
        // component: ()=> import("@/views/error/403")
        component: () => {
            return import ('@/views/ag-series/error/403')
        }
    },
    {
        path: "/500",
        name: "500",
        // component: ()=> import("@/views/error/500")
        component: () => {
            return import ('@/views/ag-series/error/500')
        }
    },
    {
        path: "/empty",
        name: "empty",
        component: () => {
            return import ('@/views/ag-series/error/empty')
        }
    },
    {
        path: "/personalData",
        name: "personalData",
        // component: ()=> import("@/views/personalData")
        component: () => {
            return import ('@/views/ag-series/personalData')
        }
    },
    {
        path: "/email",
        name: "email",
        component: () =>
            import ("@/views/personalData/email")
    },
    {
        path: "/feedback",
        name: "feedback",
        component: () =>
            import ("@/views/personalData/feedback")
    },
    {
        path: "/doubtful",
        name: "doubtful",
        component: () =>
            import ("@/views/error/doubtful")
    },
    {
        path: "/paySuccess",
        name: "paySuccess",
        component: () =>
            import ("@/views/memberCenter/paySuccess")
    },
    {
        path: "/commonProblem",
        name: "commonProblem",
        component: () =>
            import ("@/views/personalData/commonProblem")
    },
    {
        path: "/callWe",
        name: "callWe",
        component: () =>
            import ("@/views/personalData/callWe")
    },
    {
        path: "/aboutWe",
        name: "aboutWe",
        component: () => {
            return import ("@/views/personalData/aboutWe")
        }
    },
    {
        path: "/telephoneBetting",
        name: "telephoneBetting",
        component: () =>
            import ("@/views/home/telephoneBetting")
    },
    {
        path: "/game",
        name: "game",
        component: () =>
            import ("@/views/entertainment/game")
    },
    {
        path: "/legalLicence",
        name: "legalLicence",
        component: () =>
            import ("@/views/personalData/legalLicence")
    },
    {
        path: "/duty",
        name: "duty",
        component: () =>
            import ("@/views/personalData/duty")
    },
    {
        path: "/secrets",
        name: "secrets",
        component: () =>
            import ("@/views/personalData/secrets")
    },
    {
        path: "/relief",
        name: "relief",
        component: () =>
            import ("@/views/personalData/relief")
    },
    {
        path: "*",
        name: "404",
        component: () =>
            import ("@/views/error/404")
    },
    {
        path: "/ytAuth", //油条授权
        name: "ytAuth",
        component: () =>
            import ("@/views/login/ytAuth")
    },
    {
        path: "/promote", //推广页
        name: "promote",
        component: () =>
            import ("@/views/promote")
    },
    {
        meta: {
            index: "baccarat"
        },
        path: '/baccarat',
        name: 'baccarat',
        component: () =>
            import ( /* webpackChunkName: 'baccarat' */ "@/views/baccarat/index.vue")
    }
]