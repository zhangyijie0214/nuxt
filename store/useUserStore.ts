/*
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-17 17:16:59
 * @lastTime : 2023-08-28 10:13:45
 * @LastAuthor : Do not edit
 * @文件路径 : /store/useUserStore.ts
 */
import { defineStore } from 'pinia'
import { reactive } from 'vue'


interface IUserStoreState {

}

const USER_STORE_STATE: IUserStoreState = {

}

export const useUserStore = defineStore('userState', () => {

    // 创建 Store state
    const state: IUserStoreState = reactive(USER_STORE_STATE)
    const { $api } = useNuxtApp()

    /**
     * @description : 登录
     * @author : zhangyijie
     * @date : 2023-08-22 09:20:26
     * @param {any} date
     */
    const login = async(date:any) => {

        const _res = await $api.login(date)

        return _res

    }
    /**
     * @description : 退出登录
     * @author : zhangyijie
     * @date : 2023-08-22 09:20:26
     * @param {any} date
     */
    const logout = async(date:any) => {

        const _res = await $api.logout(date)

        return _res

    }
    /**
     * @description : 账号注册
     * @author : zhangyijie
     * @date : 2023-08-22 09:20:26
     * @param {any} date
     */
    const getAccountRegister = async(date:any) => {

        const _res = await $api.accountRegister(date)

        return _res

    }

    /**
     * @description : 更新密码
     * @author : zhangyijie
     * @date : 2023-08-22 09:20:26
     * @param {any} date
     */
    const getUpdatePassword = async(date:any) => {

        const _res = await $api.updatePassword(date)

        return _res

    }


    /**
     * @description : 忘记密码
     * @author : zhangyijie
     * @date : 2023-08-22 09:20:26
     * @param {any} date
     */
    const getForgotPassword = async(date:any) => {

        const _res = await $api.forgotPassword(date)

        return _res

    }


    /**
     * @description : 是否登录
     * @author : zhangyijie
     * @date : 2023-08-22 09:20:26
     * @param {any} date
     */
    const getIsLogin = async(date:any) => {

        const _res = await $api.isLogin(date)

        return _res

    }
    return {
        state,
        login,
        getAccountRegister,
        getUpdatePassword,
        getForgotPassword,
        getIsLogin,
        logout
    }

})

export type UseUserStoreReturn = ReturnType<typeof useUserStore>