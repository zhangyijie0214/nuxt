<!--
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-24 15:46:46
 * @lastTime : 2023-10-25 17:06:29
 * @LastAuthor : Do not edit
 * @文件路径 : /pages/selectProduct/step2.vue
-->


<script setup lang="ts">
import NavBar from '../../components/navBar/NavBar.vue'
import SelectBar from '../../components/selectBar/SelectBar.vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useProductStore } from '../../store/useProductStore'

const intakeTemperatureRef = ref()
const intakePressureRef = ref()
const exhaustPressureRef = ref()

const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const { getChartData,state } = useProductStore()
const isLoading = ref(false)

onMounted(() => {

    if(!state.snapSelectProduct.company) {

        navigateTo('/selectProduct/step1/index.html')
        return

    }

    state.snapSelectProduct.stepNum = 2


})
/**
 * @description : 表单相关信息
 * @author : zhangyijie
 * @date : 2023-08-23 14:33:54
 */
const formInline:any = state.snapSelectProduct

const validateIntakeTemperature = (rule: any, value: any, callback: any) => {

    const _item:any = data.intakeTemperatureUnitList.find((item:any) => item.id === data.intakeTemperatureUnitType)
    if (value <= _item.scopeTop && value >= _item.scopeBottom) {

        callback()


    } else {

        callback(new Error(`您所填参数已超出常规范围${_item.scope}，如需定制，请邮箱联系vb3hxrhohsc@163.com`))


    }

}
const validateIntakePressure = (rule: any, value: any, callback: any) => {

    const _item:any = data.intakePressureUnitTypeList.find((item:any) => item.id === data.intakePressureUnitType)
    if (value <= _item.scopeTop && value >= _item.scopeBottom) {

        callback()


    } else {

        callback(new Error(`您所填参数已超出常规范围${_item.scope}，如需定制，请邮箱联系vb3hxrhohsc@163.com`))


    }

}
const validateIntakeFlow = (rule: any, value: any, callback: any) => {

    if (value > 600 || value < 60) {

        callback(new Error('您所填参数已超出常规范围60~600，如需定制，请邮箱联系vb3hxrhohsc@163.com'))

    } else {

        callback()

    }

}
const validateRelativeHumidity = (rule: any, value: any, callback: any) => {

    if (value > 100 || value < 0) {

        callback(new Error('您所填参数已超出常规范围0~100，如需定制，请邮箱联系vb3hxrhohsc@163.com'))

    } else {

        callback()

    }

}
const validateExhaustPressure = (rule: any, value: any, callback: any) => {

    const _item:any = data.exhaustPressureUnitTypeList.find((item:any) => item.id === data.exhaustPressureUnitType)
    if (value <= _item.scopeTop && value >= _item.scopeBottom) {

        callback()


    } else {

        callback(new Error(`您所填参数已超出常规范围${_item.scope}，如需定制，请邮箱联系vb3hxrhohsc@163.com`))


    }

}
const data:any = reactive({
    intakeTemperatureUnitType: '1',
    intakeTemperatureUnitList: [
        {
            id: '1',
            name: '°C',
            scope: '0 ~ 45',
            scopeTop: 45, // 最高温度
            scopeBottom: 0, // 最低温度
        },
        {
            id: '2',
            name: '°F',
            scope: '32 ~ 113',
            scopeTop: 113,
            scopeBottom: 32,
        },
        {
            id: '3',
            name: 'K',
            scope: '273.15 ~ 318.15',
            scopeTop: 318.15,
            scopeBottom: 273.15,
        }
    ],
    exhaustPressureUnitType: '1',
    exhaustPressureUnitTypeList: [
        {
            id: '1',
            name: 'Kpa(A)',
            scope: '50 ~ 1250',
            scopeTop: 1250,
            scopeBottom: 50
        },
        {
            id: '2',
            name: 'Bar(a)',
            scope: '0.5 ~ 12.5',
            scopeTop: 12.5,
            scopeBottom: 0.5
        },
        {
            id: '3',
            name: 'PSI(A)',
            scope: '7.25 ~ 181.29',
            scopeTop: 181.29,
            scopeBottom: 7.25
        },
        {
            id: '4',
            name: 'Kpa(G)',
            scope: '-10 ~ 1148.7',
            scopeTop: 1148.7,
            scopeBottom: -10
        },
        {
            id: '5',
            name: 'Bar(g)',
            scope: '-0.1 ~ 11.487',
            scopeTop: 11.487,
            scopeBottom: -0.1
        },
        {
            id: '6',
            name: 'PSI(G)',
            scope: '-1.45 ~ 166.6',
            scopeTop: 166.6,
            scopeBottom: -1.45
        }
    ],
    intakePressureUnitType: '1',
    intakePressureUnitTypeList: [
        {
            id: '1',
            name: 'Kpa(A)',
            scope: '60 ~ 101.3',
            scopeTop: 101.3,
            scopeBottom: 60
        },
        {
            id: '2',
            name: 'Bar(a)',
            scope: '0.6 ~ 1.013',
            scopeTop: 1.013,
            scopeBottom: 0.6
        },
        {
            id: '3',
            name: 'PSI(A)',
            scope: '8.7 ~ 14.69',
            scopeTop: 14.69,
            scopeBottom: 8.7
        }
    ]
})

const rules = reactive<FormRules<typeof formInline>>({
    intakeTemperature: [{ validator: validateIntakeTemperature, trigger: 'blur' }],
    intakePressure: [{ validator: validateIntakePressure, trigger: 'blur' }],
    intakeFlow: [{ validator: validateIntakeFlow, trigger: 'blur' }],
    exhaustPressure: [{ validator: validateExhaustPressure, trigger: 'blur' }],
    relativeHumidity: [{ validator: validateRelativeHumidity, trigger: 'blur' }],
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
        relative_humidity: formInline.relativeHumidity,
        intake_pressure_unit_type: data.intakePressureUnitType,
        exhaust_pressure_unit_type: data.exhaustPressureUnitType,
        intake_temperature_unit_type: data.intakeTemperatureUnitType,

    }
    isLoading.value = true
    const _res = await getChartData(_data)
    isLoading.value = false
    if(_res.success) {

        formInline.quoteId = _res.data.quote_id
        formInline.chartData = _res.data.chartData
        state.snapSelectProduct.relativeHumidityNumber = formInline.relativeHumidity
        navigateTo({ path: '/selectProduct/step3/index.html' })

    }else{

        ElMessageBox.alert(_res.msg, '失败', {
            confirmButtonText: '返回',
        })

    }

}

function back() {

    router.back()

}

function getTipsPlaceholder(id:string,list:any) {

    const _item = list.find((item:any) => item.id === id)
    return _item.scope

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
                <el-form-item ref="intakeTemperatureRef" prop="intakeTemperature" label="进气温度" class="formItem">
                    <el-input v-model="formInline.intakeTemperature" type="number" autocomplete="off" :placeholder="getTipsPlaceholder(data.intakeTemperatureUnitType,data.intakeTemperatureUnitList)" clearable>
                        <template #append>
                            <el-select v-model="data.intakeTemperatureUnitType" style="width:100px" @change="intakeTemperatureRef.resetField()">
                                <el-option v-for="item in data.intakeTemperatureUnitList" :key="~~item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item ref="intakePressureRef" prop="intakePressure" label="进气压力" class="formItem">
                    <el-input v-model="formInline.intakePressure" type="number" :placeholder="getTipsPlaceholder(data.intakePressureUnitType,data.intakePressureUnitTypeList)" clearable>
                        <template #append>
                            <el-select v-model="data.intakePressureUnitType" style="width: 100px" @change="intakePressureRef.resetField()">
                                <el-option v-for="item in data.intakePressureUnitTypeList" :key="~~item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="intakeFlow" label="进气流量" class="formItem">

                    <el-input v-model="formInline.intakeFlow" type="number" placeholder="60 ~ 600" clearable>
                        <template #append><div style="width:60px;">m³/min</div></template>
                    </el-input>
                </el-form-item>
                <el-form-item ref="exhaustPressureRef" prop="exhaustPressure" label="排气压力" class="formItem">

                    <el-input v-model="formInline.exhaustPressure" type="number" :placeholder="getTipsPlaceholder(data.exhaustPressureUnitType,data.exhaustPressureUnitTypeList)" clearable>
                        <template #append>
                            <el-select v-model="data.exhaustPressureUnitType" style="width: 100px" @change="exhaustPressureRef.resetField()">
                                <el-option v-for="item in data.exhaustPressureUnitTypeList" :key="~~item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="relativeHumidity" label="相对湿度" class="formItem">
                    <el-input v-model="formInline.relativeHumidity" type="number" placeholder="0 ~ 100" clearable>
                        <template #append><div style="width:60px;">RH（%）</div></template>
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