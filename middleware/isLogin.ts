/*
 * @description :是否登录
 * @author : zhangyijie
 * @date : 2023-08-22 14:01:59
 * @lastTime : 2023-09-01 16:51:51
 * @LastAuthor : Do not edit
 * @文件路径 : /middleware/isLogin.ts
 */
import { useUserStore } from '../store/useUserStore'
const { getIsLogin } = useUserStore()

export default defineNuxtRouteMiddleware(async(opts) => {

    console.log(opts)
    if(~~opts.query.isLogin === 0) {

        return

    }
    const _res = await getIsLogin()
    if(_res.success) {

        return navigateTo('/info/index.html')

    }

})