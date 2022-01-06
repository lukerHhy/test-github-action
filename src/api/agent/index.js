import agentAjax from '@/utils/agentAjax'
import request from "@/utils/request";

// 首页banner接口
export function indexbanner(data, params) {
    return agentAjax({
        url: '/indexbanner?merchant_no=' + data,
        params
    })
}

// 获取图形验证地址接口
export function getcaptcha() {
    return agentAjax({
        url: '/getcaptcha'
    })
}

// 代理注册接口
export function register(data) {
    return agentAjax({
        method: 'post',
        url: '/register',
        data
    })
}

// 更新代理资料接口
export function updatedetail(data) {
    return agentAjax({
        method: 'post',
        url: '/updatedetail',
        data
    })
}

// 更新代理资料接口
export function login(data) {
    return agentAjax({
        method: 'post',
        url: '/login',
        data
    })
}

// 代理详细资料接口
export function userinfo(params) {
    return agentAjax({
        url: '/userinfo',
        params
    })
}

// 代理详细资料接口
export function addmember(data) {
    return agentAjax({
        url: '/addmember',
        method: 'post',
        data
    })
}

// 用户所有银行卡接口
export function bankcardlist(params) {
    return agentAjax({
        url: '/bankcardlist',
        params
    })
}

// 代理提现接口
export function withdraw(data) {
    return agentAjax({
        url: '/withdraw',
        method: 'post',
        data
    })
}

// 新增绑定银行卡接口
export function addbankcard(data) {
    return agentAjax({
        url: '/addbankcard',
        method: 'post',
        data
    })
}

// 代理修改密码接口
export function setpass(data) {
    return agentAjax({
        url: '/setpass',
        method: 'post',
        data
    })
}

// 代理修改密码接口
export function agStaticpagebycode(params) {
    return agentAjax({
        url: '/staticpagebycode',
        params
    })
}

// 代理报表接口
export function agentsheet(params) {
    return agentAjax({
        url: '/agentsheet',
        params
    })
}

// 佣金报表接口
export function commisionsheet(params) {
    return agentAjax({
        url: '/commisionsheet',
        params
    })
}

// 佣金记录接口
export function agentcommissionlog(params) {
    return agentAjax({
        url: '/agentcommissionlog',
        params
    })
}

// 佣金结算状态
export function agentcommissionstatus(params) {
    return agentAjax({
        url: '/agentcommissionstatus',
        params
    })
}

// 所有佣金领取状态接口
export function allcommissionstatus(params) {
    return agentAjax({
        url: '/allcommissionstatus',
        params
    })
}

// 代理佣金提取接口
export function getcommission(data) {
    return agentAjax({
        url: '/getcommission',
        method: 'post',
        data
    })
}

// 所有银行
export function allbanklist(params) {
    return agentAjax({
        url: '/allbanklist',
        params
    })
}

// 优秀代理列表(目前在user环境)
export function excellentagent(params) {
    return agentAjax({
        url: '/excellentagent?merchant_no=' + params.merchant_no,
        method: 'get'
    })
}

// 会员等级列表
export function memberlevellist(params) {
    return agentAjax({
        url: '/memberlevellist',
        method: 'get',
        params
    })
}

// 会员列表
export function memberlist(params) {
    return agentAjax({
        url: '/memberlist',
        method: 'get',
        params
    })
}

//佣金概览
export function commissionOverview(data) {
    return agentAjax({
        url: '/commission_overview',
        method: 'get',
        data
    })
}

// 代理首页统计接口
export function usercount(params) {
    return agentAjax({
        url: '/usercount',
        method: 'get',
        params
    })
}

// 帐变类型
export function agentaccountchangetype(params) {
    return agentAjax({
        url: '/agentaccountchangetype',
        method: 'get',
        params
    })
}

// 帐变记录
export function agentaccountchangelog(params) {
    return agentAjax({
        url: '/agentaccountchangelog',
        method: 'get',
        params
    })
}

// 代理下级转账获取验证码
export function membertranssmscode(data) {
    return agentAjax({
        method: 'post',
        url: '/sms_code',
        data
    })
}

// 佣金转钱包余额
export function commissiontrans(data) {
    return agentAjax({
        method: 'post',
        url: '/commissiontrans',
        data
    })
}

// 代理下级转账
export function membertrans(data) {
    return agentAjax({
        method: 'post',
        url: '/membertrans',
        data
    })
}


export function agentrelation(params) {
    return agentAjax({
        method: 'get',
        url: '/relation_data',
        params
    })
}

export function memberOverview(params) {
    return agentAjax({
        method: 'get',
        url: '/member_overview',
        params
    })
}

export function getSmscode(data) {
    return agentAjax({
        method: 'post',
        url: '/sms_code',
        data
    })
}

export function agentdeposite(data) {
    return agentAjax({
        method: 'post',
        url: '/agentdeposite',
        data
    })
}

export function omitadduser(data) {
    return agentAjax({
        method: 'post',
        url: '/omit_add_user',
        data
    })
}

export function omitlist(params) {

    return agentAjax({
        method: 'get',
        url: '/omit_list',
        params
    })
}

export function devtypeist(params) {

    return agentAjax({
        method: 'get',
        url: '/dev_type_list',
        params
    })
}

export function ask_omit(data) {
    return agentAjax({
        method: 'post',
        url: '/ask_omit',
        data
    })
}

export function omit_detail(params) {
    return agentAjax({
        method: 'get',
        url: '/omit_detail',
        params
    })
}

//绑定联系方式qq,wechat,skype
export function bindContact(params) {
    return agentAjax({
        method: 'post',
        url: '/bind_contact',
        params
    })
}

//绑定类型
export function bindType(data) {
    return agentAjax({
        method: 'post',
        url: '/advertise_contact_switch',
        data
    })
}

export function addagent(data) {
    return agentAjax({
        method: 'post',
        url: '/addagent',
        data
    })
}

export function promotion_source(params) {
    return agentAjax({
        method: 'get',
        url: '/promotion_source',
        params
    })
}


//绑定邮箱
export function getEmailcode(params) {
    return agentAjax({
        method: 'post',
        url: '/bindemailcode',
        params
    })
}

export function bindemail(params) {
    return agentAjax({
        method: 'post',
        url: '/bindemail',
        params
    })
}


export function agentlist_v2(params) {
    return agentAjax({
        method: 'get',
        url: '/agentlist_v2',
        params
    })
}

export function update_commission(data) {
    return agentAjax({
        method: 'post',
        url: '/update_commission',
        data
    })
}

//推广页展示类型
export function contactTypeList(data) {
    return agentAjax({
        method: 'get',
        url: '/contact_type_list',
        data
    })
}

//修改绑定资金密码
export function setpaypass(data) {
    return agentAjax({
        method: 'post',
        url: '/setpaypass',
        data
    })
}

//代理支付类型
export function paytype(data) {
    return agentAjax({
        method: 'get',
        url: '/pay_type',
        data
    })
}

//代理创建订单
export function order(data) {
    return agentAjax({
        method: 'post',
        url: '/agent_order',
        data
    })
}

// 最大金额最小金额
export function depositinfo(data) {
    return agentAjax({
        method: 'get',
        url: `/pay_method_info?pay_method_id=${data.pay_method_id}`,
        data
    })
}

// 订单支付状态检测接口
export function checkorder(data) {
    return agentAjax({
        method: 'get',
        url: `/agent_checkorder?trade_no=${data.trade_no}`,
        data
    })
}

// 渠道银行
export function banklist(data) {
    return agentAjax({
        method: 'get',
        url: `/banklist?pay_type=${data.pay_type}&pay_method_id=${data.pay_method_id}`,
        data
    })
}

// 商户银行
export function merchantbank(data) {
    return agentAjax({
        method: 'get',
        url: `/agent_checkorder?pay_method_id=${data.pay_method_id}`,
        data
    })
}

// 代理默认配置
export function agentSetting(data) {
    return agentAjax({
        method: 'get',
        url: '/agent_settingdetail',
        data
    })
}

export function setchildrate(data) {
    return agentAjax({
        method: 'post',
        url: '/setchildrate',
        data
    })
}

// 换绑手机验证码接口
export function bindsmscode(data) {
    return agentAjax({
        method: 'post',
        url: '/bindsmscode',
        data
    })
}

// 换绑手机号接口
export function agbindmobile(data) {
    return agentAjax({
        method: 'post',
        url: '/bindmobile',
        data
    })
}

// 代理在线状态
export function agentonlinecheck(data) {
    return agentAjax({
        method: 'post',
        url: '/agent_online_check',
        data
    })
}

// 数字货币协议
export function getprotocol(data) {
    return agentAjax({
        url: '/getprotocol',
        params: data
    })
}

// 数字货币汇率
export function getticker(data) {
    return agentAjax({
        url: '/getticker',
        params: data
    })
}


// export function sms_code(data){
//   return agentAjax({
//     method:'get',
//     url:'/sms_code',
//     params
//   })
// }

// const agentrelation = params => {
//   return Vue.httpAgent({
//     method: 'get',
//     url: '/relation_data',
//     params
//   })
// }
