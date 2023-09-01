<!--
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-23 10:00:26
 * @lastTime : 2023-08-25 11:02:26
 * @LastAuthor : Do not edit
 * @文件路径 : /pages/selectService.vue
-->
<script setup lang="ts">
import NavBar from '../components/navBar/NavBar.vue'
import SelectBar from '../components/selectBar/SelectBar.vue'
import { useProductStore } from '../store/useProductStore'
import { ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

// 获取接口
const { getProduct,getServiceByProduct,serviceQuotation } = useProductStore()
const ruleFormRef = ref<FormInstance>()
const isLoading = ref(false)
/**
 * @description : 表单相关信息
 * @author : zhangyijie
 * @date : 2023-08-23 14:33:54
 */
const formInline:any = reactive({
    company: '',
    companyEnglishname: '',
    projectName: '',
    contactName: '',
    contactPhone: '',
    productId: {},
    serviceItemList: []
})
/**
 * @description : 产品列表
 * @author : zhangyijie
 * @date : 2023-08-23 14:33:43
 */
const productList:any = ref([])

/**
 * @description : 产品列表
 * @author : zhangyijie
 * @date : 2023-08-23 15:50:21
 */
const serviceList:any = ref([])

onMounted(() => {

    init()

})


async function init() {

    const _res = await getProduct({})
    if(_res.success) {

        productList.value = _res.data

    }else{

        ElMessageBox.alert(_res.msg, '失败', {
            confirmButtonText: '返回',
        })

    }

}

function onSelectProductEvent(val:any) {

    getServiceByProductResult(val)

}

async function getServiceByProductResult(val:any) {

    const _res = await getServiceByProduct({ product_id: val.product_id })
    if(_res.success) {

        _res.data.forEach((element:any) => {

            element.num = 1
            element.total_price = element.unit_price

        })
        serviceList.value = _res.data

    }else{

        ElMessageBox.alert(_res.msg, '失败', {
            confirmButtonText: '返回',
        })

    }

}
/**
 * @description : 删除某一项索引
 * @author : zhangyijie
 * @date : 2023-08-23 16:45:10
 * @param {*} index
 */
async function handleDelete(index:number) {

    formInline.serviceItemList.splice(index,1)

}

/**
 * @description : 创建钱
 * @author : zhangyijie
 * @date : 2023-08-23 19:21:35
 * @param {*} _row
 * @param {*} _column
 * @param {*} cellValue
 */
function monyFormatter(_row: any, _column: any, cellValue: any) {

    return `¥${cellValue}`

}
/**
 * @description : 数字改变
 * @author : zhangyijie
 * @date : 2023-08-23 19:49:06
 * @param {*} opts
 */
function onInputNumber(opts:any) {

    const _item:any = formInline.serviceItemList[opts.$index]
    _item.num = opts.column.level
    _item.total_price = (Number(_item.unit_price) * _item.num).toFixed(2)

}
/**.serviceItemList
 * @description : 计算合计金额
 * @author : zhangyijie
 * @date : 2023-08-23 16:59:31
 * @param {*} param
 */
const getSummaries = (param: any) => {

    console.log('param',param)
    const { columns, data } = param
    const sums: string[] = []
    columns.forEach((column: { property: string | number }, index: number) => {

        if (index === 0) {

            sums[index] = '服务总价'
            return

        }

        if (index === 3) {

            const values = data.map((item: { [x: string]: any }) => Number(item[column.property]))
            if (!values.every((value: unknown) => Number.isNaN(value))) {

                sums[index] = `¥ ${values.reduce((prev: any, curr: any) => {

                    const value = Number(curr)
                    if (!Number.isNaN(value)) {

                        return prev + curr

                    }
                    return prev

                }, 0).toFixed(2)}`

            } else {

                sums[index] = 'N/A'

            }

        }


    })

    return sums

}

/*******************/
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
const validateProductId = (rule: any, value: any, callback: any) => {

    if (formInline.productId === '') {

        callback(new Error('产品必须选择'))

    }else {

        callback()

    }

}
const validateServiceItemList = (rule: any, value: any, callback: any) => {

    if (formInline.serviceItemList.length <= 0) {

        callback(new Error('服务必须选择'))

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
    productId: [{ validator: validateProductId, trigger: 'blur' }],
    serviceItemList: [{ validator: validateServiceItemList, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {

    if (!formEl) {

        return

    }
    formEl.validate((valid) => {


        if (valid) {

            serviceQuotationResult()

        } else {

            console.log('error submit!')
            return false

        }

    })

}

async function serviceQuotationResult() {

    const _post:any = {
        company: formInline.company,
        company_englishname: formInline.companyEnglishname,
        project_name: formInline.projectName,
        contact_name: formInline.contactName,
        contact_phone: formInline.contactPhone,
        product_id: formInline.productId.product_id,
        service_item_list: []
    }

    formInline.serviceItemList.forEach((item:any) => {

        _post.service_item_list.push({ num: item.num,product_service_item_rel_id: item.product_service_item_rel_id })

    })
    _post.service_item_list = JSON.stringify(_post.service_item_list)
    isLoading.value = true
    const _res = await serviceQuotation(_post)
    isLoading.value = false
    if(_res.success) {

        navigateTo('/info/index.html')

    }else{

        ElMessageBox.alert(_res.msg, '失败', {
            confirmButtonText: '确认',
        })

    }

}

</script>
<template>
    <div v-loading.body="isLoading" class="service">
        <div class="service--box">
            <SelectBar :show-index="2" />
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
                <el-form-item prop="projectName" label="项目名称" class="formItem">
                    <el-input v-model="formInline.projectName" placeholder="请输入您的项目名称" clearable />
                </el-form-item>
                <el-form-item prop="contactName" label="联系人" class="formItem">
                    <el-input v-model="formInline.contactName" placeholder="请输入联系人" clearable />
                </el-form-item>
                <el-form-item prop="contactPhone" label="联系电话" class="formItem">
                    <el-input v-model="formInline.contactPhone" maxlength="11" placeholder="请输入联系电话" clearable />
                </el-form-item>
                <el-form-item prop="productId" label="选择产品" class="formItem">
                    <el-select
                        v-model="formInline.productId"
                        style="width: 100%;"
                        placeholder="请选择您需要的产品"
                        clearable
                        value-key="product_id"
                        @change="onSelectProductEvent"
                    >
                        <el-option v-for="(item) in productList" :key="item.product_id" :label="item.product_name" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="serviceItemList" label="选择服务" class="formItem" style="width: 100%;">
                    <el-select
                        v-model="formInline.serviceItemList"
                        multiple
                        style="width: 100%;"
                        placeholder="请选择您需要的服务(可多选)"
                        value-key="product_service_item_rel_id"
                    >
                        <el-option v-for="(item) in serviceList" :key="item.product_service_item_rel_id" :label="item.service_item_dfn_name" :value="item" />
                    </el-select>
                </el-form-item>
                <div v-if="formInline.serviceItemList.length > 0" class="service--box--configure">
                    <div class="service--box--configure__title">产品配置</div>
                    <el-table
                        :data="formInline.serviceItemList"
                        border
                        :stripe="true"
                        :show-summary="true"
                        :summary-method="getSummaries"
                    >
                        <el-table-column prop="service_item_dfn_name" label="服务项名称" align="center" />
                        <el-table-column prop="unit_price" label="单价" align="center" :formatter="monyFormatter" />
                        <el-table-column prop="num" label="数量" align="center">
                            <template #default="scope">
                                <el-input-number
                                    v-model="scope.column.level"
                                    :min="1"
                                    size="small"
                                    :step="1"
                                    step-strictly
                                    @change="onInputNumber(scope)"
                                />
                            </template>
                        </el-table-column>
                        <el-table-column prop="total_price" label="总价" align="center" :formatter="monyFormatter" />
                        <el-table-column label="操作" align="center">
                            <template #default="scope">
                                <el-button
                                    size="small"
                                    type="danger"
                                    @click="handleDelete(scope.$index)"
                                >删除</el-button>

                            </template>
                        </el-table-column>

                    </el-table>
                </div>
                <el-form-item style="margin:50px 0 0; width: 100%">
                    <el-button
                        class="btn btn-block service__button"
                        color="#ffc219"
                        @click="submitForm(ruleFormRef)"
                    >确认</el-button>
                </el-form-item>

            </el-form>
        </div>
        <NavBar show-key="2" />

    </div>
</template>
<style lang="less">
.service {
  --el-border-radius-base:0px;

  overflow: auto;
  height: 100vh;

  .service--box {
    margin: 100px auto 0;
    width: 1200px;

    .form-inline {
      display: flex;
      justify-content: space-between;
      margin: 70px auto 0;

      .formItem {
        margin-right:0;
        width: 49%;

        .el-form-item__label {
          font-size: 18px;
          color: #000000;
        }

      }

      .service__button {
        margin-left: auto;
        width: 232px;
        height: 40px;
        font-size: 18px;
        font-weight: 500;
        border-radius: 8px;
        color:#ffffff;
      }
    }

    .service--box--configure {
      width: 100%
    }

    .service--box--configure__title {
      margin:32px 0 29px;
      font-size: 24px;
      font-weight: bold;
      line-height: 22px;
      color: #3d3d3d;
    }

  }

}
</style>