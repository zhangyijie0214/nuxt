/*
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-18 15:41:20
 * @lastTime : 2023-08-18 17:39:01
 * @LastAuthor : Do not edit
 * @文件路径 : /middleware/redirect.ts
 */
// middleware/redirect.js

export default defineNuxtRouteMiddleware((to, from) => {

    console.log('to',to)
    console.log('from',from)
    // return navigateTo('/')

})