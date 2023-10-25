<!--
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-24 14:31:57
 * @lastTime : 2023-10-25 14:31:49
 * @LastAuthor : Do not edit
 * @文件路径 : /pages/selectProduct/step1.vue
-->

<script setup lang="ts">
import NavBar from '../../components/navBar/NavBar.vue'
import SelectBar from '../../components/selectBar/SelectBar.vue'
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
import { useProductStore } from '../../store/useProductStore'
const { state } = useProductStore()

/**
 * @description : 表单相关信息
 * @author : zhangyijie
 * @date : 2023-08-23 14:33:54
 */
const formInline:any = state.snapSelectProduct

onMounted(() => {

    state.snapSelectProduct.stepNum = 1

})
const validateCompany = (rule: any, value: any, callback: any) => {

    if (value === '') {

        callback(new Error('公司名称不能为空'))

    } else {

        callback()

    }

}
const validateCompanyEnglishname = (rule: any, value: any, callback: any) => {

    if (value === '') {

        callback(new Error('公司英文名称不能为空'))

    } else {

        callback()

    }

}
const validateProjectName = (rule: any, value: any, callback: any) => {

    if (value === '') {

        callback(new Error('项目名称不能为空'))

    } else {

        callback()

    }

}
const validateContactName = (rule: any, value: any, callback: any) => {

    if (value === '') {

        callback(new Error('联系人不能为空'))

    } else {

        callback()

    }

}
const validateContactPhone = (rule: any, value: any, callback: any) => {

    if (value === '') {

        callback(new Error('联系电话不能为空'))

    }else if (!/^1[3456789]\d{9}$/.test(value)) {

        callback(new Error('联系电话格式错误'))

    } else {

        callback()

    }

}
const rules = reactive<FormRules<typeof formInline>>({
    company: [{ validator: validateCompany, trigger: 'blur' }],
    companyEnglishname: [{ validator: validateCompanyEnglishname, trigger: 'blur' }],
    projectName: [{ validator: validateProjectName, trigger: 'blur' }],
    contactName: [{ validator: validateContactName, trigger: 'blur' }],
    contactPhone: [{ validator: validateContactPhone, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {

    if (!formEl) {

        return

    }
    formEl.validate((valid) => {


        if (valid) {

            navigateTo('/selectProduct/step2/index.html')

        } else {

            console.log('error submit!')
            return false

        }

    })

}
</script>
<template>
    <div class="product">
        <NavBar show-key="1" />
        <div class="service--box">
            <SelectBar :show-index="1" />
            <div class="service--box--title">
                第一步：填写项目信息
            </div>
            <div style="width:100%">
                <img style="width:100%" src="../../public/images/stepBar/step1.png" alt="" />
            </div>
            <el-form
                ref="ruleFormRef"
                :inline="true"
                :model="formInline"
                label-position="top"
                class="form-inline"
                size="large"
                :rules="rules"
            >
                <el-form-item prop="company" label="询价公司(中文名)" class="formItem">
                    <el-input v-model="formInline.company" autocomplete="off" placeholder="请输入您的询价公司" clearable />
                </el-form-item>
                <el-form-item prop="companyEnglishname" label="询价公司(英文名)" class="formItem">
                    <el-input v-model="formInline.companyEnglishname" placeholder="请输入您的询价公司英文名" clearable />
                </el-form-item>
                <el-form-item prop="contactName" label="联系人" class="formItem">
                    <el-input v-model="formInline.contactName" placeholder="请输入您的联系人" clearable />
                </el-form-item>
                <el-form-item prop="contactPhone" label="联系电话" class="formItem">
                    <el-input v-model="formInline.contactPhone" maxlength="11" placeholder="请输入您的联系电话" clearable />
                </el-form-item>
                <el-form-item prop="projectName" label="项目名称" class="formItem">
                    <el-input v-model="formInline.projectName" placeholder="请输入您的项目名称" clearable />
                </el-form-item>

            </el-form>
            <div class="service--box--button">
                <el-button
                    class="btn btn-block service__button"
                    color="#ffc219"
                    @click="submitForm(ruleFormRef)"
                >下一步</el-button>
            </div>
            <div style="height: 100px;"></div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.product {
  overflow: hidden;
  overflow: auto;
  height: 100vh;

  .service--box {
    margin: 100px auto 0;
    width: 1200px;

    .service--box--title {
      margin: 46px 0 57px;
      font-size: 23.49px;
      font-weight: 500;
      color: #0b132a;
      line-height: 32.89px;
      letter-spacing: 0;
    }

    .form-inline {
      display: flex;
      justify-content: space-between;
      margin: 70px auto 0;

      .formItem {
        margin-right:0;
        margin-bottom: 50px;
        width: 48%;

        :deep(.el-form-item__label) {
          font-size: 18px;
          color: #000000;
        }

      }
    }

    .service--box--button {
      position: relative;
      bottom: 0;
      left: 0;
      width: 100%;
      background: #ffffff;
      box-shadow: -10px -4px 10px 0 rgb(0 0 0 / 15%);

      .service__button {
        float: right;
        width: 200px;
        height: 40px;
        font-size: 18px;
        font-weight: 500;
        border-radius: 8px;
        color:#ffffff;
      }
    }
  }
}
</style>