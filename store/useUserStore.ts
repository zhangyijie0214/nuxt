/*
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-17 17:16:59
 * @lastTime : 2023-08-17 20:37:32
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

    const login = async(date:any) => {

        const _res = await $api.login(date)

        return _res

    }
    return {
        state,
        login
    }

})

export type UseUserStoreReturn = ReturnType<typeof useUserStore>