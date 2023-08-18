<!--
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-17 10:30:40
 * @lastTime : 2023-08-17 10:37:10
 * @LastAuthor : Do not edit
 * @文件路径 : /components/login/LoginLeft.vue
-->

<template>
    <div class="login">
        <div style="height: 100%;">
            <img style="height: 100%; object-fit: cover;" src="../../public/images/index/left.png" alt="" />
        </div>
        <div class="login--card">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="less">
.login {
  display: flex;
  align-items: center;
  width: 100vw;
  min-width: 1280px;
  height: 100vh;
  min-height: 720px;

  .login--card {
    margin: 0 auto;padding: 0 100px;
    box-sizing: border-box;
  }
}


</style>