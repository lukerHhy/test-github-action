import proComUrlObj from "@/utils/file"

const proComUrl = proComUrlObj

var yaboUi = ['10024', '10022', '10023', '10025', '10060', '10026', '10027', '10028', '10029','10064', '10059', '10033', '10063', '10042', '10043']
var agUi = ['10030', '10061']
var aoMenUi = ['chobet', 'takchun', '10007', '10006', '10013', '10008', 'mgm8', '10009', '10010', '10011', '10012', '10014', '10015', '10018', '10019', '10020', '10034', '10021', '10057'];


var esportUi = ['10050']

export default [{
    path: "/",
    name: "Home",
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (['10042'].includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/10042/home')
        }
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/home')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/home')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/home')
        }
        return import('@/views/home')
    }
},
{
    path: "/newKf",
    name: "newKf",
    component: () => {
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/newKf')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/newKf')
        }
    }
},
{
    path: "/gameSearch",
    name: "GameSearch",
    // component: ()=> import("@/views/home/gameSearch")
    component: () => {
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/home/gameSearch')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/home/gameSearch')
        }
        return import('@/views/home/gameSearch')
    }
}, {
    path: "/slotsSearch",
    name: "slotsSearch",
    component: () => {
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/home/slotsSearch')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/home/slotsSearch')
        }
    }
},
{
    path: "/slots",
    name: "slots",
    component: () => {
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/home/slots')
        }
    }
},
{
    path: "/profitsRank",
    name: "ProfitsRank",
    component: () => {
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/rank/index')
        }
        return import("@/views/profitsRank/index")
    }
},
{
    path: "/withdrawRank",
    name: "WithdrawRank",
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/withdrawRank/index')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/withdrawRank/index')
        }
        return import('@/views/withdrawRank/index')
    }
},
{
    path: "/login",
    name: "login",
    // component: ()=> import("@/views/login/login")
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (['10042'].includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/10042/login/login')
        }
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/login/login')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/login/login')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/login/login')
        }
        return import('@/views/login/login')
    }
},
{
    path: "/register",
    name: "register",
    // component: ()=> import("@/views/login/register")
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (['10042'].includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/10042/login/register')
        }
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/login/register')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/login/register')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/login/register')
        }
        return import('@/views/login/register')
    }
},
{
    path: "/registerSuccess",
    name: "registerSuccess",
    component: () => {
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/login/registerSuccess')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/login/registerSuccess')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/login/registerSuccess')
        }
        return import('@/views/login/registerSuccess')
    }
},
{
    path: "/forgetPassword",
    name: "forgetPassword",
    component: () => {
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/login/forgetPassword')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/login/forgetPassword')
        }
        return import('@/views/login/forgetPassword')
    }
},
{
    path: "/downApp",
    name: "downApp",
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/downApp')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/downApp')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/downApp')
        }
        return import('@/views/downApp')
    }
},
{
    path: "/downDetail",
    name: "downDetail",
    component: () => {
        return import('@/views/ag-series/downApp/downDetail')
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
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/vip')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/vip')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/vip')
        }
        return import('@/views/vip')
    }
}, {
    path: "/vipDet",
    name: "vipDet",
    component: () => {
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/vip/events')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/vip/events')
        }
    }
},
{
    path: "/luckyway",
    name: "luckyway",
    component: () =>
        import("@/views/luckyway")
},
{
    path: "/vip/analysis",
    name: "analysis",
    component: () =>
        import("@/views/vip/analysis")
},
{
    path: '/activities',
    name: 'activities',
    // component: ()=> import('@/views/activities')
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/activities')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/activities')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/activities')
        }
        return import('@/views/activities')
    }
},
{
    path: '/activeDetail',
    name: 'activitiesDetails',
    // component: ()=> import('@/views/activities/details')
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/activities/details')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/activities/details')
        }
        return import('@/views/activities/details')
    }
},
{
    path: '/activities/:id',
    name: 'activitiesDetailsId',
    // component: ()=> import('@/views/activities/details')
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/activities/details')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/activities/details')
        }
        return import('@/views/activities/details')
    }
},
{
    path: "/brand",
    name: "brand",
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/brand')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/brand/index')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/brand')
        }
        if (['chashao'].includes(process.env.VUE_APP_PROJECT_NAME) && proComUrl['brand']) {
            return import(`@assets/views/${proComUrl['brand']}`)
        }
        /*if(['10057'].includes(process.env.VUE_APP_PROJECT_NAME)) {
          return import('@/views/brand/smhBrand')
        }*/
        // import("@/views/brand")
        if (aoMenUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import(`@assets/views`)
        }
        return import('@/views/brand')
    }
},
{
    path: "/brand/:id",
    name: "brandDetails",
    // component: ()=> import("@/views/brand/details")
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/brand/brandDetail')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/brand/brandDetail')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/brand/brandDetail')
        }
        return import('@/views/brand/details')
    }
},
{
    path: "/news",
    name: "news",
    // component: ()=> import("@/views/news/index")
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/news/index')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/news/index')
        }
        return import('@/views/news/index')
    }
},
{
    path: "/newsDetail",
    name: "newsDetail",
    // component: ()=> import("@/views/news/newsDetail")
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/news/newsDetail')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/news/newsDetail')
        }
        return import('@/views/news/newsDetail')
    }
},
{
    path: "/kefu",
    name: "Kefu",
    component: () =>
        import("@/views/news/kefu")
},
{
    path: "/more", //更多
    name: "more",
    component: () =>
        import("@/views/personalData/more")
},
{
    path: "/memberCenter",
    name: "memberCenter",
    // component: ()=> import("@/views/memberCenter")
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/memberCenter')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/memberCenter')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/memberCenter')
        }
        return import('@/views/memberCenter')
    }
},
{
    path: "/wallet",
    name: "wallet",
    // component: ()=> import("@/views/memberCenter/wallet")
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/memberCenter/wallet')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/memberCenter/wallet')
        }
        return import('@/views/memberCenter/wallet')
    }
},
{
    path: "/walletTransfer",
    name: "walletTransfer",
    component: () =>
        import("@/views/memberCenter/walletTransfer")
},
{
    path: "/deposit",
    name: "deposit",
    component: () => {
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/memberCenter/deposit')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/memberCenter/deposit')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/memberCenter/deposit')
        }
        return import('@/views/memberCenter/deposit')
    }
},
{
    path: "/washcode",
    name: "washcode",
    component: () =>
        import("@/views/memberCenter/washcode")
},
{
    path: "/historyRecord",
    name: "historyRecord",
    component: () =>
        import("@/views/memberCenter/historyRecord")
},
{
    path: "/quotaTransfer",
    name: "quotaTransfer",
    component: () => {
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/memberCenter/quotaTransfer')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/memberCenter/quotaTransfer')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/memberCenter/quotaTransfer')
        }
        return import('@/views/memberCenter/quotaTransfer')
    }
},
{
    path: "/allGamesPlantform",
    name: "allGamesPlantform",
    component: () =>
        import("@/views/memberCenter/allGamesPlantform")
},
{
    path: "/discountCore",
    name: "discountCore",
    component: () =>
        import("@/views/memberCenter/discountCore")
},
{
    path: "/withdraw",
    name: "withdraw",
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/memberCenter/withdraw')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/memberCenter/withdraw')
        }
        return import('@/views/memberCenter/withdraw')
    }
},
{
    path: "/digAddress",
    name: "digAddress",
    component: () => {
        return import('@/views/memberCenter/digAddress')
    }
},
{
    path: "/addDigAddress",
    name: "addDigAddress",
    component: () => {
        return import('@/views/memberCenter/addDigAddress')
    }
},
{
    path: "/businessRecord",
    name: "businessRecord",
    component: () => {
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/memberCenter/businessRecord')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/memberCenter/businessRecord')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/memberCenter/businessRecord')
        }
        return import('@/views/memberCenter/businessRecord')
    }
},
{
    path: "/shopMall",
    name: "shopMall",
    component: () => {
        return import('@/views/esport-series/shop-mall/index')
    }
},
{
    path: "/productsExchange",
    name: "productsExchange",
    meta: {
        title: '商品兑换'
    },
    component: () =>
        import('@/views/esport-series/shop-mall/productsExchange'),
},
{
    path: "/goodsRecord",
    name: "goodsRecord",
    meta: {
        title: '商品记录'
    },
    component: () =>
        import('@/views/esport-series/shop-mall/goodsRecord'),
},
{
    path: "/esportVip",
    name: "esportVip",
    meta: {
        title: 'VIP'
    },
    component: () =>
        import('@/views/esport-series/memberCenter/esportVip'),
},
{
    path: "/bankcard",
    name: "bankcard",
    // component: ()=> import("@/views/memberCenter/bankcard")
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/memberCenter/bankcard')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/memberCenter/bankcard')
        }
        return import('@/views/memberCenter/bankcard')
    }
},
{
    path: "/addBankCard",
    name: "addBankCard",
    component: () =>
        import("@/views/memberCenter/addBankCard")

},
{
    path: "/serviceSubscription",
    name: "serviceSubscription",
    component: () => {
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/memberCenter/serviceSubscription')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/memberCenter/serviceSubscription')
        }
        return import('@/views/memberCenter/serviceSubscription')
    },
},
{
    path: "/scroll",
    name: "scroll",
    component: () => {
        return import('@/views/yabo-series/home/scroll')
    }
},
{
    path: "/help",
    // component: ()=> import("@/views/help"),
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/help')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/help')
        }
        return import('@/views/help')
    },
    children: [{
        path: "main",
        name: "main",
        meta: {
            title: '新手教程'
        },
        component: () =>
            import('@/views/yabo-series/help/main'),
    },
    {
        path: "tutorial",
        name: "tutorial",
        meta: {
            title: '常见问题'
        },
        component: () => {
            if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                return import('@/views/yabo-series/help/tutorial')
            }
            if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                return import('@/views/esport-series/help/tutorial')
            }
            return import('@/views/help/tutorial')
        }
    },
    {
        path: "introduction",
        name: "introduction",
        meta: {
            title: '品牌实力'
        },
        component: () => {
            if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                return import('@/views/yabo-series/help/introduction')
            }
            if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                return import('@/views/esport-series/help/introduction')
            }
            return import('@/views/help/introduction')
        }
    },
    {
        path: "manual",
        name: "manual",
        meta: {
            title: '游戏手册'
        },
        component: () =>
            import("@/views/help/manual")
    },
    {
        path: "protection",
        name: "protection",
        meta: {
            title: '安全保障'
        },
        component: () => {
            if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                return import('@/views/yabo-series/help/protection')
            }
            if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                return import('@/views/esport-series/help/protection')
            }
            return import('@/views/help/protection')
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
        import("@/views/help/detail")
},
{
    path: "*",
    name: "404",
    component: () => {
        if (process.env.VUE_APP_PROJECT_NAME === "chashao" || process.env.VUE_APP_PROJECT_NAME === "wanqu") {
            return import("@/views/error/404")
        } else {
            if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                return import('@/views/yabo-series/error/404_new')
            }
            if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                return import('@/views/esport-series/error/404_new')
            }
            if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                return import('@/views/ag-series/error/404')
            }
            return import('@/views/error/404_new')
            // return import ('@/views/error/404_new')
        }
    }
},
{
    path: "/403",
    name: "403",
    // component: ()=> import("@/views/error/403")
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/error/403')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/error/403')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/error/403')
        }
        return import('@/views/error/403')
    }
},
{
    path: "/500",
    name: "500",
    // component: ()=> import("@/views/error/500")
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/error/500')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/error/500')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/error/500')
        }
        return import('@/views/error/500')
    }
},
{
    path: "/empty",
    name: "empty",
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/error/empty')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/error/empty')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/error/empty')
        }
        return import('@/views/error/empty')
    }
},
{
    path: "/personalData",
    name: "personalData",
    // component: ()=> import("@/views/personalData")
    component: () => {
        console.log(yaboUi, process.env.VUE_APP_PROJECT_NAME)
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/personalData')
        }
        if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/ag-series/personalData')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/personalData')
        }
        return import('@/views/personalData')
    }
},
{
    path: "/verifyIdentity",
    name: "verifyIdentity",
    component: () => {
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/personalData/verifyIdentity')
        }
        if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/esport-series/personalData/verifyIdentity')
        }
        // return import('@/views/personalData')
    }
},
{
    path: "/email",
    name: "email",
    component: () =>
        import("@/views/personalData/email")
},
{
    path: "/feedback",
    name: "feedback",
    component: () =>
        import("@/views/personalData/feedback")
},
{
    path: "/doubtful",
    name: "doubtful",
    component: () =>
        import("@/views/error/doubtful")
},
{
    path: "/paySuccess",
    name: "paySuccess",
    component: () =>
        import("@/views/memberCenter/paySuccess")
},
{
    path: "/commonProblem",
    name: "commonProblem",
    component: () =>
        import("@/views/personalData/commonProblem")
},
{
    path: "/callWe",
    name: "callWe",
    component: () =>
        import("@/views/personalData/callWe")
},
{
    path: "/aboutWe",
    name: "aboutWe",
    component: () => {
        if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
            return import('@/views/yabo-series/personalData/aboutWe')
        }
        return import("@/views/personalData/aboutWe")
    }
},
{
    path: "/telephoneBetting",
    name: "telephoneBetting",
    component: () =>
        import("@/views/home/telephoneBetting")
},
{
    path: "/game",
    name: "game",
    component: () =>
        import("@/views/entertainment/game")
},
{
    path: "/legalLicence",
    name: "legalLicence",
    component: () =>
        import("@/views/personalData/legalLicence")
},
{
    path: "/duty",
    name: "duty",
    component: () =>
        import("@/views/personalData/duty")
},
{
    path: "/secrets",
    name: "secrets",
    component: () =>
        import("@/views/personalData/secrets")
},
{
    path: "/relief",
    name: "relief",
    component: () =>
        import("@/views/personalData/relief")
},
{
    path: "*",
    name: "404",
    component: () =>
        import("@/views/error/404")
},
{
    path: "/ytAuth", //油条授权
    name: "ytAuth",
    component: () =>
        import("@/views/login/ytAuth")
},
{
    path: "/promote", //推广页
    name: "promote",
    component: () =>
        import("@/views/promote")
},
{
    meta: {
        index: "baccarat"
    },
    path: '/baccarat',
    name: 'baccarat',
    component: () =>
        import( /* webpackChunkName: 'baccarat' */ "../views/baccarat/index.vue")
}
];
