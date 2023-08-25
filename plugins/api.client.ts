import { net } from 'ces-mini-h5'
net.setInterfaceUrl('/Cg/Itf/Java/CmnMisItf.jsp?method=GetSqlData')
net.setGlobalDebug(true)

Cgl.Net.Request.GlobalInterceptor.On('AFTER_REQUEST',(res) => {

    if(res.ErrKey === 'UserNotLoggedIn') {

        navigateTo('/')

    }

})
export default defineNuxtPlugin((nuxtApp) => {

    const _API = {
        // 用户相关接口
        login: (data) => net.callEasyItf('login', data),
        accountRegister: (data) => net.callEasyItf('accountRegister', data),
        updatePassword: (data) => net.callEasyItf('updatePassword', data),
        forgotPassword: (data) => net.callEasyItf('forgotPassword', data),
        isLogin: (data) => net.callEasyItf('isLogin', data),
        //产品服务
        getProduct: (data) => net.callEasyItf('getProduct', data),
        getServiceByProduct: (data) => net.callEasyItf('getServiceByProduct', data),
        serviceQuotation: (data) => net.callEasyItf('serviceQuotation', data),
        getChartData: (data) => net.callEasyItf('getChartData', data),
        getChartPath: (data) => net.callEasyItf('getChartPath', data),
        getProduct: (data) => net.callEasyItf('getProduct', data),
        getStandardScope: (data) => net.callEasyItf('getStandardScope', data),
        getOptionalConfig: (data) => net.callEasyItf('getOptionalConfig', data),
        productQuotation: (data) => net.callEasyItf('productQuotation', data),

        // 列表
        getDealerQuote: (data) => net.callEasyItf('getDealerQuote', data),

        send: (url,data) => net.send(url, data),

    }

    nuxtApp.provide('api2', _API)

})

