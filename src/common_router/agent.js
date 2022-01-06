var yaboUi = ['10024', '10022', '10023', '10025', '10060', '10026', '10027', '10028', '10029', '10064', '10059', '10033', '10063', '10042', '10043']

var esportUi = ['10050']
var agUi = ['10030', '10061']
export default [
    // -------代理中心路由-------
    {
        path: "/agent", // 代理我的
        name: "agent", //
        component: () =>
            import("@/views/new_agent"),
        children: [{
            path: "/", // 代理我的
            name: "agent", //
            meta: { index: 0 },
            component: () =>
                import("@/views/new_agent/agentMine"),
        },
        {
            path: "/agent/agentHomepage", // 代理首页
            name: "agent", //
            meta: { index: 1 },
            component: () =>
                import("@/views/new_agent/agentHomepage"),
        },
        {
            path: "/agent/agentMember", // 代理成员
            name: "agentMember", //
            meta: { index: 2 },
            component: () =>
                import("@/views/new_agent/agentMember"),
        }, {
            path: "/agent/agentExtension", // 代理推广
            name: "agentExtension", //
            meta: { index: 3 },
            component: () =>
                import("@/views/new_agent/agentExtension"),
        }, {
            path: "/agent/agentCommission", // 代理佣金
            name: "agentCommission", //
            meta: { index: 4 },
            component: () =>
                import("@/views/new_agent/agentCommission"),
        }
        ]
    },
    {
        path: "/Generationcharge", // 下级代充
        name: "Generationcharge", //
        component: () =>
            import("@/views/new_agent/Generationcharge"),
    },
    {
        path: "/omit", // 遗漏申请
        name: "omit",
        component: () =>
            import("@/views/new_agent/omit"),
    },
    {
        path: "/moneyWithdraw", // 佣金提款
        name: "moneyWithdraw",
        component: () =>
            import("@/views/new_agent/moneyWithdraw"),
    },
    {
        path: "/agentmanagement", // 代理管理
        name: "agentmanagement",
        component: () =>
            import("@/views/new_agent/agentmanagement"),
    },
    {
        path: '/agent/landing', // 代理首页
        name: 'agentHomepage',
        component: () => {
            if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                return import('@/views/yabo-series/agent/agentHomepage')
            }
            if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                return import('@/views/ag-series/agent/agentHomepage')
            }
            if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                return import('@/views/esport-series/agent/agentHomepage')
            }
            return import('@/views/agent/agentHomepage')
        }
    },

    {
        path: '/agentHomepage', // 代理首页
        redirect: {
            name: 'agentHomepage'
        }
    },
    // {
    //   path: "/reportForm", // 佣金列表
    //   name: "reportForm",
    //   component: () => {
    //     return import("@/views/new_agent/reportForm");
    //   },
    // },
    {
        path: "/reportFormDetail", // 佣金详情
        name: "reportFormDetail",
        component: () =>
            import("@/views/new_agent/reportFormDetail"),
    },
    {
        path: "/moneyExchange", // 帐变记录
        name: "moneyExchange",
        component: () =>
            import("@/views/new_agent/moneyExchange"),
    },
    {
        path: "/agentDeposit", // 充值
        name: "agentDeposit",
        component: () =>
            import("@/views/new_agent/agentDeposit"),
    },
    {
        path: "/vipOpen", //会员开户
        name: "vipOpen",
        component: () =>
            import("@/views/new_agent/vipOpen"),
    },
    {
        path: "/creatAccount", //代理开户
        name: "creatAccount",
        component: () =>
            import("@/views/new_agent/creatagentAccount"),
    },
    {
        path: "/material", //推广素材
        name: "material",
        component: () =>
            import("@/views/new_agent/material"),
    },
    {
        path: '/agentAuth',
        component: () => {
            if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                return import('@/views/yabo-series/agent/auth/index')
            }
            if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                return import('@/views/ag-series/agent/auth/index')
            }
            if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                return import('@/views/esport-series/agent/auth/index')
            }
            return import('@/views/agent/auth/index')
        },
        children: [{
            path: 'login',
            name: 'agentLogin',
            component: () => {
                if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                    return import('@/views/yabo-series/agent/auth/agentLogin')
                }
                if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                    return import('@/views/ag-series/agent/auth/agentLogin')
                }
                if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                    return import('@/views/esport-series/agent/auth/agentLogin')
                }
                return import('@/views/agent/auth/agentLogin')
            }
        },
        {
            path: 'register',
            name: 'agentRegister',
            component: () => {
                if (yaboUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                    return import('@/views/yabo-series/agent/auth/agentRegister')
                }
                if (agUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                    return import('@/views/ag-series/agent/auth/agentRegister')
                }
                if (esportUi.includes(process.env.VUE_APP_PROJECT_NAME)) {
                    return import('@/views/esport-series/agent/auth/agentRegister')
                }
                return import('@/views/agent/auth/agentRegister')
            }
        },
            // // 配置根路由
            // { path: '/', redirect: { name: 'agentLogin'} },
            // { path: '/agentLogin', redirect: { name: 'agentLogin'} },
            // { path: '/agentRegister', redirect: { name: 'agentRegister'} },
        ],
    },
    {
        path: '/agent/login',
        redirect: { name: 'agentLogin' }
    },
    {
        path: '/agent/register',
        redirect: { name: 'agentRegister' }
    },
    {
        path: '/agentLogin',
        redirect: { name: 'agentLogin' }
    },
    {
        path: '/agentRegister',
        redirect: { name: 'agentRegister' }
    },
    // {
    //   path: "/agentLogin", //代理登录
    //   name: "agentLogin",
    //   component: () => {
    //     return import("@/views/new_agent/auth/agentLogin");
    //   },
    // },
    {
        path: "/agBankBind", //银行卡绑定
        name: "agBankBind",
        component: () =>
            import("@/views/new_agent/agBankBind"),
    },
    {
        path: "/agAddBankBind", //新增银行卡
        name: "agAddBankBind",
        component: () => {
            return import("@/views/new_agent/agAddBankBind");
        },
    },
    // {
    //   path: "/agRevisePassword", //密码修改
    //   name: "agRevisePassword",
    //   component: () => {
    //     return import("@/views/new_agent/agRevisePassword");
    //   },
    // },
    // {
    //   path: "/carryCash", //提现
    //   name: "carryCash",
    //   component: () => import("@/views/new_agent/carryCash"),
    // },
    // {
    //   path: "/agentFrom", //代理列表
    //   name: "agentFrom",
    //   component: () => import("@/views/new_agent/agentFrom"),
    // },
    // {
    //   path: "/agTermsEngagement", //合作代理条款
    //   name: "agTermsEngagement",
    //   component: () => import("@/views/new_agent/agTermsEngagement"),
    // },
    // {
    //   path: "/agMemberList", //会员列表
    //   name: "agMemberList",
    //   component: () => {
    //     return import("@/views/new_agent/agMemberList");
    //   },
    // },
    {
        path: "/agMemberDetail", //会员详情
        name: "agMemberDetail",
        component: () =>
            import("@/views/agent/agMemberDetail"),
    },
    {
        path: "/agMemberWithdraw", //会员转账
        name: "agMemberWithdraw",
        component: () =>
            import("@/views/agent/agMemberWithdraw"),
    },
];
