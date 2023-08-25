/*
 * @description :是否登录
 * @author : zhangyijie
 * @date : 2023-08-22 14:01:59
 * @lastTime : 2023-08-24 10:14:25
 * @LastAuthor : Do not edit
 * @文件路径 : /middleware/isLogin.ts
 */
import { useUserStore } from '../store/useUserStore'
const { getIsLogin } = useUserStore()

export default defineNuxtRouteMiddleware(async() => {

    const _res = await getIsLogin()
    if(_res.success) {

        return navigateTo('/info')

    }

})