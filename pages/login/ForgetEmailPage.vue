<!--
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-17 11:43:55
 * @lastTime : 2023-09-01 16:53:32
 * @LastAuthor : Do not edit
 * @文件路径 : /pages/login/ForgetEmailPage.vue
-->
<script setup lang="ts">
import LoginLeft from '../../components/login/LoginLeft.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { EMAIL_REGULAR } from '../../configs/regularValidation'
import { useUserStore } from '../../store/useUserStore'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'

const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const forgetEmailRight:any = ref(null)

const { getForgotPassword } = useUserStore()

function back() {

    router.back()

}

const validateEmail = (rule: any, value: any, callback: any) => {

    if (value === '') {

        callback(new Error('邮箱不能为空'))


    }else if (!EMAIL_REGULAR.test(value)) {

        callback(new Error('邮箱格式错误'))

    }else {

        callback()

    }


}

const ruleForm = reactive({
    email: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    email: [{ validator: validateEmail, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {

    if (!formEl) {

        return

    }
    formEl.validate((valid) => {


        if (valid) {

            emailVerificationButton()

        } else {

            console.log('error submit!')
            return false

        }

    })

}

async function emailVerificationButton() {


    const _res = await getForgotPassword({
        email: ruleForm.email,
    })

    if(_res.success) {

        navigateTo({ path: '/login/LoginStatePage/index.html',query: { state: 'emailSuccess' } })

    }else{

        ElMessage({
            appendTo: forgetEmailRight.value,
            message: _res.msg,
            type: 'error'
        })

    }

}
</script>

<template>
    <LoginLeft>
        <div ref="forgetEmailRight" class="right card flex-shrink-0 w-full shadow-2xl bg-base-100">

            <button class="btn btn-ghost back" @click="back">
                <el-icon><ArrowLeftBold /></el-icon>
                返回
            </button>
            <div class="right--title">
                忘记密码
            </div>
            <div class="right--tips">
                输入您用于注册的电子邮箱。
            </div>
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                status-icon
                :rules="rules"
                label-width="auto"
                label-position="top"
                class="right--input__box demo-ruleForm"
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
                <el-form-item>
                    <el-button
                        class="btn btn-block right--btn"
                        color="#ffc219"
                        @click="submitForm(ruleFormRef)"
                    >提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </LoginLeft>
</template>
<style lang="less" scoped>
.right {
  position: relative;
  margin: 0 auto;
  padding: 50px 100px;
  width: 500px;
  transform: scale(1);

  .right--title {
    margin: 20px 0 10px;
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
    width: 320px;
  }

  .right--btn {
    margin-top: 10px;
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

  :deep(.label) {
    padding-top:0
  }
}
</style>