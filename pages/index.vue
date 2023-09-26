<script setup lang="ts">
import LoginLeft from '../components/login/LoginLeft.vue'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
const loginRight:any = ref(null)
const ruleFormRef = ref<FormInstance>()
import { useUserStore } from '../store/useUserStore'
import { EMAIL_REGULAR } from '../configs/regularValidation'
definePageMeta({
    middleware: ['is-login']
})
const { login } = useUserStore()
const validateEmail = (rule: any, value: any, callback: any) => {

    if (value === '') {

        callback(new Error('邮箱不能为空'))


    }else if (!EMAIL_REGULAR.test(value)) {

        callback(new Error('邮箱格式错误'))

    }else {

        callback()

    }


}
const validatePass = (rule: any, value: any, callback: any) => {

    if (value === '') {

        callback(new Error('密码不能为空'))

    } else {

        callback()

    }

}

const ruleForm = reactive({
    email: '',
    pass: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    email: [{ validator: validateEmail, trigger: 'blur' }],
    pass: [{ validator: validatePass, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {

    if (!formEl) {

        return

    }
    formEl.validate((valid) => {


        if (valid) {

            loginEvent()

        } else {

            console.log('error submit!')
            return false

        }

    })

}

const loginEvent = async() => {

    const _res = await login({
        email: ruleForm.email,
        password: ruleForm.pass
    })

    if(_res.success) {

        navigateTo({ path: '/info/index.html' })

    }else{

        if(~~_res.ErrKey === 4) {

            navigateTo({ path: '/login/LoginStatePage/index.html',query: { state: 'auditFailure' } })

            return

        }
        if(~~_res.ErrKey === 1) {

            navigateTo({ path: '/login/LoginStatePage/index.html',query: { state: 'underReview' } })

            return

        }

        ElMessage({
            appendTo: loginRight.value,
            message: _res.msg,
            type: 'error'
        })

    }

}


</script>

<template>
    <LoginLeft>
        <div ref="loginRight" class="login--right card flex-shrink-0 w-full shadow-2xl bg-base-100">
            <div>
                <img style="height: 50px; object-fit: cover;" src="../public/images/logo.png" alt="" />
            </div>
            <div class="login--right--title">
                欢迎登录毕森
            </div>

            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                status-icon
                :rules="rules"
                label-width="auto"
                label-position="top"
                class="login--right--input__box demo-ruleForm"
            >
                <el-form-item prop="email">
                    <label slots="label" class="label">
                        <span class="label-text text-lg">邮箱地址</span>
                    </label>
                    <el-input
                        v-model="ruleForm.email"
                        style="height:3rem;font-size:16px;border-radius: 0.5rem;"
                        placeholder="请输入邮箱"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item prop="pass">
                    <label slots="label" class="label">
                        <span class="label-text text-lg">密码</span>
                    </label>
                    <el-input
                        v-model="ruleForm.pass"
                        style="height:3rem;font-size:16px;border-radius: 0.5rem;"
                        placeholder="请输入密码"
                        type="password"
                        autocomplete="off"
                    />
                </el-form-item>
                <label class="label">
                    <span class="label-text"></span>
                    <span class="label-text-alt text-sm">
                        <a class="link"><nuxt-link to="/login/ForgetEmailPage/index.html">忘记密码？</nuxt-link></a>
                    </span>
                </label>
                <el-form-item>
                    <el-button
                        class="btn btn-block login--right--btn "
                        color="#ffc219"
                        @click="submitForm(ruleFormRef)"
                    >登录</el-button>
                </el-form-item>
            </el-form>
            <label class="label">
                <span class="label-text" style="color:#696f79">
                    没有账号？
                    <a class="link" style="color:#ffc219"><nuxt-link to="/login/RegisterPage">点击此处注册</nuxt-link></a>
                </span>
            </label>
        </div>
    </LoginLeft>
</template>
<style lang="less" scoped>
.login--right {
  padding: 50px 100px;
  width: 500px;
  transform: scale(1);

  .login--right--title {
    margin: 20px 0 10px;
    font-size: 23.49px;
    font-weight: 500;
    line-height: 32.89px;
    letter-spacing: 0;
    color: #0b132a;
  }

  .login--right--input__box {
    width: 320px;
  }

  .login--right--btn {
    width:320px;
    font-size: 18px;
    font-weight: 500;
    color:#ffffff;
  }


  :deep(.label) {
    padding-top:0
  }
}
</style>