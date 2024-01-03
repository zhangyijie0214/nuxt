<script setup lang="ts">
import LoginLeft from '../../components/login/LoginLeft.vue'
import { ArrowLeftBold } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
const registerRight:any = ref(null)
const ruleFormRef = ref<FormInstance>()
const router = useRouter()

import { useUserStore } from '../../store/useUserStore'
const { getAccountRegister } = useUserStore()


const validateEmail = (rule: any, value: any, callback: any) => {

    if (value === '') {

        callback(new Error('邮箱不能为空'))

    }else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)) {

        callback(new Error('邮箱格式错误'))

    }else {

        callback()

    }


}
const validateUserName = (rule: any, value: any, callback: any) => {

    if (value === '') {

        callback(new Error('联系人姓名不能为空'))

    } else {

        callback()

    }

}

const validateUserCompany = (rule: any, value: any, callback: any) => {

    if (value === '') {

        callback(new Error('公司名称不能为空'))

    } else {

        callback()

    }

}

const ruleForm = reactive({
    email: '',
    userName: '',
    userCompany: '',

})

const rules = reactive<FormRules<typeof ruleForm>>({
    email: [{ validator: validateEmail, trigger: 'blur' }],
    userName: [{ validator: validateUserName, trigger: 'blur' }],
    userCompany: [{ validator: validateUserCompany, trigger: 'blur' }],

})

const submitForm = (formEl: FormInstance | undefined) => {

    if (!formEl) {

        return

    }
    formEl.validate((valid) => {


        if (valid) {

            registerButton()

        } else {

            console.log('error submit!')
            return false

        }

    })

}

function back() {

    router.back()

}

async function registerButton() {


    const _res = await getAccountRegister({
        dealer_name: ruleForm.userCompany,
        contact_name: ruleForm.userName,
        email: ruleForm.email,
    })

    if(_res.success) {

        navigateTo({ path: '/login/LoginStatePage/index.html',query: { state: 'emailSuccess' } })

    }else{

        ElMessage({
            appendTo: registerRight.value,
            message: _res.msg,
            type: 'error'
        })

    }


}
</script>

<template>
    <LoginLeft>
        <div ref="registerRight" class="register--right card flex-shrink-0 w-full shadow-2xl bg-base-100">

            <button class="btn btn-ghost back" @click="back">
                <el-icon><ArrowLeftBold /></el-icon>
                返回
            </button>
            <div class="register--right--title">
                注册账号
            </div>
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                status-icon
                :rules="rules"
                label-width="auto"
                label-position="top"
                class="register--right--input__box demo-ruleForm"
            >
                <el-form-item prop="userCompany">
                    <label slots="label" class="label">
                        <span class="label-text text-lg">公司名称</span>
                    </label>
                    <el-input
                        v-model="ruleForm.userCompany"
                        style="height:3rem;font-size:16px;border-radius: 0.5rem;"
                        placeholder="请输入公司名称"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item prop="userName">
                    <label slots="label" class="label">
                        <span class="label-text text-lg">联系人姓名</span>
                    </label>
                    <el-input
                        v-model="ruleForm.userName"
                        style="height:3rem;font-size:16px;border-radius: 0.5rem;"
                        placeholder="请输入联系人姓名"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item prop="email">
                    <label slots="label" class="label">
                        <span class="label-text text-lg">邮箱地址</span>
                    </label>
                    <el-input
                        v-model="ruleForm.email"
                        style="height:3rem;font-size:16px;border-radius: 0.5rem;"
                        placeholder="请输入邮箱地址"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button
                        class="btn btn-block register--right--btn"
                        color="#ffc219"
                        @click="submitForm(ruleFormRef)"
                    >注册</el-button>
                </el-form-item>
            </el-form>
            <label class="label">
                <span class="label-text" style="color:#696f79">
                    已经有帐号？
                    <a class="link" style="color:#ffc219" @click="back">点击此处登录</a>
                </span>
            </label>
        </div>
    </LoginLeft>
</template>
<style lang="less" scoped>
.register--right {
  position: relative;
  margin: 0 auto;
  padding: 50px 100px;
  width: 500px;
  transform: scale(1);

  .register--right--title {
    margin: 0 0 20px;
    font-size: 23.49px;
    font-weight: 500;
    line-height: 32.89px;
    letter-spacing: 0;
    color: #0b132a;
  }

  .register--right--input__box {
    width: 320px;
  }

  .register--right--btn {
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