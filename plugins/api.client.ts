import { net } from 'ces-mini-h5'
net.setInterfaceUrl('/Cg/Itf/Java/CmnMisItf.jsp?method=GetSqlData')
net.setGlobalDebug(true)

// export default (ctx, inject) => {

//     const _API = {
//         login: (data) => net.callEasyItf('login', data),
//     }

//     inject('api', _API)

// }


export default defineNuxtPlugin((nuxtApp) => {

    const _API = {
        login: (data) => net.callEasyItf('login', data),
        accountRegister: (data) => net.callEasyItf('accountRegister', data),
        updatePassword: (data) => net.callEasyItf('updatePassword', data),
        forgotPassword: (data) => net.callEasyItf('forgotPassword', data),
        isLogin: (data) => net.callEasyItf('isLogin', data),

    }

    nuxtApp.provide('api', _API)

})