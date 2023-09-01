<!--
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-16 14:26:18
 * @lastTime : 2023-09-01 16:49:36
 * @LastAuthor : Do not edit
 * @文件路径 : /components/navBar/NavBar.vue
-->
<script setup lang="ts">
import { SwitchButton } from '@element-plus/icons-vue'
import { NAV_LIST } from '../../configs/navBarList'
import { useUserStore } from '../../store/useUserStore'

const { logout } = useUserStore()
const props = defineProps({ showKey: String })
function jumpPath(path:string) {

    navigateTo(path)

}

async function logoutEvent() {

    const _res = await logout({})
    if(_res.success) {

        navigateTo('/index.html')

    }else{

        ElMessageBox.alert(_res.msg, '失败', {
            confirmButtonText: '确认',
        })

    }

}
</script>

<template>
    <div class="navbar bg-base-100 shadow-md rounded-box">
        <div class="navbar-start">
            <img style="padding-left:36px;height: 40px; object-fit: cover;" src="../../public/images/logo.png" alt="" />
        </div>

        <div class="navbar-end  lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li v-for="(item,index) in NAV_LIST" :key="index" :class=" props.showKey === item.key ? 'bar--select' : ''" @click="jumpPath(item.path)">
                    <a>{{ item.name }}</a>
                </li>
            </ul>
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
                <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-32">
                    <li>
                        <a class="justify-between">
                            <el-icon><SwitchButton /></el-icon>
                            <span @click="logoutEvent">退出登录</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background: #ffffff;

  .bar--select {
    color: #ffc219;

    &::before {
      position: absolute;
      bottom: -16px;
      width: 100%;
      height: 6px;
      border-radius: 175px;
      background: #ffc219;
      opacity: 1;
      content:'';
    }
  }
}
</style>