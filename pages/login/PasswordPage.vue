<!--
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-17 11:41:12
 * @lastTime : 2023-08-17 11:41:13
 * @LastAuthor : Do not edit
 * @文件路径 : /pages/login/PasswordPage.vue
-->
<script setup lang="ts">
import LoginLeft from '../../components/login/LoginLeft.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
</script>

<template>
    <LoginLeft>
        <div class="right card flex-shrink-0 w-full shadow-2xl bg-base-100">

            <button class="btn btn-ghost back">
                <el-icon><ArrowLeftBold /></el-icon>
                返回
            </button>
            <div class="right--title">
                更新密码
            </div>
            <div class="right--tips">
                您的身份已被验证！设置您的密码。
            </div>
            <div class="form-control w-full max-w-xs right--input__box">
                <label class="label">
                    <span class="label-text text-lg">密码</span>
                    <span class="label-text-alt error-color">密码不能为空！</span>
                </label>
                <input type="text" placeholder="请输入密码" class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="form-control w-full max-w-xs right--input__box">
                <label class="label">
                    <span class="label-text text-lg">确认密码</span>
                    <span class="label-text-alt error-color">确认密码不能为空！</span>

                </label>
                <input type="text" placeholder="请输入确认密码" class="input input-bordered w-full max-w-xs" />
            </div>
            <button class="btn btn-block right--btn">提交</button>
        </div>
    </LoginLeft>
</template>
<style lang="less" scoped>
.right {
  position: relative;
  margin: 0 auto;
  padding: 50px 100px;
  width: 500px;

  .right--title {
    margin: 0 0 20px;
    font-size: 23.49px;
    font-weight: 500;
    line-height: 32.89px;
    letter-spacing: 0;
    color: #0b132a;

  }

  .right--tips {
    font-size: 16px;
    font-weight: normal;
    line-height: 32.89px;
    letter-spacing: 0;
    color: #0b132a;
  }

  .right--input__box {
    width: 403px;
  }

  .right--btn {
    margin-top: 30px;
    width:320px;
    font-size: 18px;
    font-weight: 500;
    color:#ffffff;
    background:#ffc219;
  }

  .back {
    position: absolute;
    top:10px;
    left:10px;
    display: flex;
    align-items: center;
    color: #8692a6;
  }
}
</style>