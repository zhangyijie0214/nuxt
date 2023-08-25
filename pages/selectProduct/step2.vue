<!--
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-24 15:46:46
 * @lastTime : 2023-08-25 20:40:34
 * @LastAuthor : Do not edit
 * @文件路径 : /pages/selectProduct/step2.vue
-->


<script setup lang="ts">
import NavBar from '../../components/navBar/NavBar.vue'
import SelectBar from '../../components/selectBar/SelectBar.vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useProductStore } from '../../store/useProductStore'

const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const { getChartData,state } = useProductStore()
const isLoading = ref(false)

onMounted(() => {


    state.snapSelectProduct.stepNum = 2


})
/**
 * @description : 表单相关信息
 * @author : zhangyijie
 * @date : 2023-08-23 14:33:54
 */
const formInline:any = state.snapSelectProduct

const validateIntakeTemperature = (rule: any, value: any, callback: any) => {

    if (~~value > 45 || ~~value < 0) {

        callback(new Error('您所填参数已超出常规范围0~45，如需定制，请邮箱联系vb3hxrhohsc@163.com'))

    } else if(Number.isInteger(value)) {

        callback(new Error('请输入整数'))

    } else {

        callback()

    }

}
const validateIntakePressure = (rule: any, value: any, callback: any) => {

    if (~~value > 101.3 || ~~value < 60) {

        callback(new Error('您所填参数已超出常规范围60~101.3，如需定制，请邮箱联系vb3hxrhohsc@163.com'))

    }else if(Number.isInteger(value)) {

        callback(new Error('请输入整数'))

    } else {

        callback()

    }

}
const validateIntakeFlow = (rule: any, value: any, callback: any) => {

    if (~~value > 600 || ~~value < 60) {

        callback(new Error('您所填参数已超出常规范围60~600，如需定制，请邮箱联系vb3hxrhohsc@163.com'))

    }else if(Number.isInteger(value)) {

        callback(new Error('请输入整数'))

    }else {

        callback()

    }

}
const validateExhaustPressure = (rule: any, value: any, callback: any) => {

    if (~~value > 1250 || ~~value < 50) {

        callback(new Error('您所填参数已超出常规范围50~1250，如需定制，请邮箱联系vb3hxrhohsc@163.com'))

    }else if(Number.isInteger(value)) {

        callback(new Error('请输入整数'))

    } else {

        callback()

    }

}

const rules = reactive<FormRules<typeof formInline>>({
    intakeTemperature: [{ validator: validateIntakeTemperature, trigger: 'blur' }],
    intakePressure: [{ validator: validateIntakePressure, trigger: 'blur' }],
    intakeFlow: [{ validator: validateIntakeFlow, trigger: 'blur' }],
    exhaustPressure: [{ validator: validateExhaustPressure, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {

    if (!formEl) {

        return

    }
    formEl.validate((valid) => {


        if (valid) {

            getChartDataResult()

        } else {

            console.log('error submit!')
            return false

        }

    })

}


async function getChartDataResult() {

    const _data = {
        company: formInline.company,
        company_englishname: formInline.companyEnglishname,
        project_name: formInline.projectName,
        contact_name: formInline.contactName,
        contact_phone: formInline.contactPhone,
        intake_temperature: formInline.intakeTemperature,
        intake_pressure: formInline.intakePressure,
        intake_flow: formInline.intakeFlow,
        exhaust_pressure: formInline.exhaustPressure,


    }
    isLoading.value = true
    const _res = await getChartData(_data)
    isLoading.value = false
    if(_res.success) {

        formInline.quoteId = _res.data.quote_id
        formInline.chartData = _res.data.chartData

        router.push({ path: '/selectProduct/step3' })

    }else{

        ElMessageBox.alert(_res.msg, '失败', {
            confirmButtonText: '返回',
        })

    }

}

function back() {

    router.back()

}
</script>
<template>
    <div v-loading.body="isLoading" class="product">
        <NavBar show-key="1" />
        <div class="service--box">
            <SelectBar :show-index="1" />
            <div class="service--box--title">
                第二步：选择性能参数
            </div>
            <div style="width:100%">
                <img style="width:100%" src="../../public/images/stepBar/step2.png" alt="" />
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
                <el-form-item prop="intakeTemperature" label="进气温度" class="formItem">
                    <el-input v-model="formInline.intakeTemperature" type="number" autocomplete="off" placeholder="0~45" clearable>
                        <template #append>°C</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="intakePressure" label="进气压力" class="formItem">
                    <template #append>.com</template>
                    <el-input v-model="formInline.intakePressure" type="number" placeholder="60~101.3" clearable>
                        <template #append>Kpa
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="intakeFlow" label="进气流量" class="formItem">

                    <el-input v-model="formInline.intakeFlow" type="number" placeholder="60~600" clearable>
                        <template #append>m³/min</template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="exhaustPressure" label="排气压力" class="formItem">

                    <el-input v-model="formInline.exhaustPressure" type="number" placeholder="50-1250" clearable>
                        <template #append>Kpa
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="service--box--button">

                <el-button
                    class="btn btn-block service__button"
                    color="#ffc219"
                    @click="submitForm(ruleFormRef)"
                >下一步</el-button>

                <el-button
                    class="btn btn-block service__button"
                    style="margin-right:20px;color: #000000"
                    @click="back"
                >上一步</el-button>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.product {
  overflow: hidden;
  overflow: auto;
  height: 100vh;
  min-height: 1200px;

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