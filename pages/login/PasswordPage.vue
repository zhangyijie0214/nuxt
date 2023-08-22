<!--
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-17 11:41:12
 * @lastTime : 2023-08-22 13:46:18
 * @LastAuthor : Do not edit
 * @文件路径 : /pages/login/PasswordPage.vue
-->
<script setup lang="ts">
import LoginLeft from '../../components/login/LoginLeft.vue'
import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { PASS_STRENGTH } from '../../configs/regularValidation'
import { useUserStore } from '../../store/useUserStore'
const { getUpdatePassword } = useUserStore()
const route = useRoute()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const passwordRight:any = ref(null)
definePageMeta({
    middleware: ['auth']
})

const validatePass = (rule: any, value: any, callback: any) => {

    if (value === '') {

        callback(new Error('密码不能为空'))

    }else if (!PASS_STRENGTH.test(value)) {

        callback(new Error('密码强度太弱，大于八位必须有数字和字母组合'))

    } else {

        if (ruleForm.checkPass !== '') {

            if (!ruleFormRef.value) {

                return

            }
            ruleFormRef.value.validateField('checkPass', () => null)

        }
        callback()

    }

}
const validatePass2 = (rule: any, value: any, callback: any) => {

    if (value === '') {

        callback(new Error('确认密码不能为空'))

    } else if (value !== ruleForm.pass) {

        callback(new Error('密码不一致'))

    } else {

        callback()

    }

}
const ruleForm = reactive({
    pass: '',
    checkPass: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {

    if (!formEl) {

        return

    }
    formEl.validate((valid) => {


        if (valid) {

            getUpdatePasswordEvent()

        } else {

            console.log('error submit!')
            return false

        }

    })

}

async function getUpdatePasswordEvent() {

    const _res = await getUpdatePassword({
        dealer_name: route.query.dealerName ?? '',
        contact_name: route.query.contactName ?? '',
        email: route.query.dealerEmail ?? '',
        code: route.query.validateCode ?? '',
        isRegistration: route.query.isRegistration,
        password: ruleForm.pass,
        confirm_password: ruleForm.checkPass,
    })

    if(_res.success) {

        router.replace({ path: '/' })

    }else{

        ElMessage({
            appendTo: passwordRight.value,
            message: _res.msg,
            type: 'error'
        })

    }

}

</script>

<template>
    <LoginLeft>
        <div ref="passwordRight" class="right card flex-shrink-0 w-full shadow-2xl bg-base-100">

            <!-- <button class="btn btn-ghost back">
                <el-icon><ArrowLeftBold /></el-icon>
                返回
            </button> -->
            <div class="right--title">
                创建密码
            </div>
            <div class="right--tips">
                您的身份已被验证！设置您的密码。
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
                <el-form-item prop="checkPass">
                    <label slots="label" class="label">
                        <span class="label-text text-lg">确认密码</span>
                    </label>
                    <el-input
                        v-model="ruleForm.checkPass"
                        style="height:3rem;font-size:16px;border-radius: 0.5rem;"
                        placeholder="请输入确认密码"
                        type="password"
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