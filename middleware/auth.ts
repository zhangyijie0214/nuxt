/*
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-17 14:07:34
 * @lastTime : 2023-09-01 16:51:41
 * @LastAuthor : Do not edit
 * @文件路径 : /middleware/auth.ts
 */
export default defineNuxtRouteMiddleware((to, { nuxt }) => {

    const _querys = to.query

    if(!_querys.isRegistration) {

        return navigateTo('/index.html')

    }

})