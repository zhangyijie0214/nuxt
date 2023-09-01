/*
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-25 19:43:10
 * @lastTime : 2023-09-01 16:44:32
 * @LastAuthor : Do not edit
 * @文件路径 : /plugins/api2.client.ts
 */
import { callEasyItf ,setInterfaceUrl,sendRequest,Request,ERequestEvent } from 'cgl'
setInterfaceUrl('/Cg/Itf/Java/CmnMisItf.jsp')

Request.globalInterceptor.On(ERequestEvent.AFTER_REQUEST,(res) => {

    if(res.ErrKey === 'UserNotLoggedIn') {

        navigateTo({ path: '/index.html',query: { isLogin: 0 },replace: true })

    }

})
export default defineNuxtPlugin((nuxtApp) => {

    const _API = {
        // 用户相关接口
        login: (data) => callEasyItf('login', data),
        accountRegister: (data) => callEasyItf('accountRegister', data),
        updatePassword: (data) => callEasyItf('updatePassword', data),
        forgotPassword: (data) => callEasyItf('forgotPassword', data),
        isLogin: (data) => callEasyItf('isLogin', data),
        logout: (data) => callEasyItf('logout', data),

        //产品服务
        getProduct: (data) => callEasyItf('getProduct', data),
        getServiceByProduct: (data) => callEasyItf('getServiceByProduct', data),
        serviceQuotation: (data) => callEasyItf('serviceQuotation', data),
        getChartData: (data) => callEasyItf('getChartData', data),
        getChartPath: (data) => callEasyItf('getChartPath', data),
        getProduct: (data) => callEasyItf('getProduct', data),
        getStandardScope: (data) => callEasyItf('getStandardScope', data),
        getOptionalConfig: (data) => callEasyItf('getOptionalConfig', data),
        productQuotation: (data) => callEasyItf('productQuotation', data),

        // 列表
        getDealerQuote: (data) => callEasyItf('getDealerQuote', data),
        // 公共请求
        send: (url,data) => sendRequest(url, data),
    }

    nuxtApp.provide('api', _API)

})

