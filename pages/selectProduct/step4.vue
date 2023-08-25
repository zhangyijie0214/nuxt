<!--
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-25 13:06:50
 * @lastTime : 2023-08-25 20:58:01
 * @LastAuthor : Do not edit
 * @文件路径 : /pages/selectProduct/step4.vue
-->


<script setup lang="ts">
import NavBar from '../../components/navBar/NavBar.vue'
import SelectBar from '../../components/selectBar/SelectBar.vue'
import type { FormInstance } from 'element-plus'
import { useProductStore } from '../../store/useProductStore'

const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const { getProduct,getStandardScope,getOptionalConfig,productQuotation,state } = useProductStore()
const isLoading = ref(false)
const activeName = ref('0')
const isProductItem = ref(false)
//
const lumpSum = ref('0.00')
onMounted(async() => {

    state.snapSelectProduct.stepNum = 4
    if(!state.snapSelectProduct.quoteId) {

        router.push({ path: '/selectProduct/step1' })

    }
    isLoading.value = true
    const _res = await getProduct({ exhaust_pressure: state.snapSelectProduct.exhaustPressure })
    if(_res.success) {

        formInline.productList = _res.data

        if(formInline.productList.length === 1) {

            formInline.productItem = formInline.productList[0]
            await getStandardScopeResult()
            await getOptionalConfigResult()
            isProductItem.value = true

        }

    }else{

        ElMessageBox.alert(_res.msg, '获取产品列表失败', {
            confirmButtonText: '确认',
        })

    }
    isLoading.value = false

})


let standardScope:any = []
async function getStandardScopeResult() {

    formInline.standardScopeData = []
    const _res = await getStandardScope({ product_id: formInline.productItem.product_id })

    if(_res.success) {

        standardScope = _res.data.item
        _res.data.item.forEach((item:any) => {

            const parentRow = {
                isParent: true,
                item_name: item.item_name,
                item_num: item.item_num,
                sub_item_name: '',
            }
            formInline.standardScopeData.push(parentRow)
            if (item.sub_item && item.sub_item.length) {

                item.sub_item.forEach((subItem:any) => {

                    const childRow = {
                        isParent: false,
                        item_name: '',
                        item_num: subItem.item_num,
                        sub_item_name: subItem.item_name,
                    }
                    formInline.standardScopeData.push(childRow)

                })

            }

        })
        lumpSumComponent()

    }else{

        ElMessageBox.alert(_res.msg, '获取标准配置项失败', {
            confirmButtonText: '确认',
        })

    }

}

async function getOptionalConfigResult() {

    const _res = await getOptionalConfig({ product_id: formInline.productItem.product_id })

    if(_res.success) {

        _res.data.item.forEach((element:any) => {

            element.inputValue = element.item_num
            element.selectSub = element.sub_item.find((item:any) => ~~item.is_default === 1 && ~~element.is_required === 1) || {}
            element.sub_item.forEach((subItem:any) => {

                subItem.inputValue = ~~subItem.item_num

            })

        })
        formInline.optionalConfigData = _res.data.item
        lumpSumComponent()

    }else{

        ElMessageBox.alert(_res.msg, '获取可选配置项失败', {
            confirmButtonText: '确认',
        })

    }

}
/**
 * @description : 表单相关信息
 * @author : zhangyijie
 * @date : 2023-08-23 14:33:54
 */
const formInline:any = state.snapSelectProduct

function back() {

    router.back()

}


function spanMethodStandardScope({ row, columnIndex }:any) {

    if (columnIndex === 0 && row.isParent) {

        const subItemCount = standardScope.find((dataItem:any) => dataItem.item_name === row.item_name).sub_item.length

        if(!subItemCount) {

            return [1,2]

        }
        return [subItemCount + 1, 1]

    }
    if (columnIndex === 0 && !row.isParent) {

        return [0,0]

    }
    if (columnIndex === 1 && !row.sub_item_name && row.isParent) {

        return [0, 0]

    }
    if (columnIndex === 2 && !row.sub_item_name && row.isParent) {

        return [0, 0]

    }
    return [1, 1]

}

function lumpSumComponent() {

    let sum = 0
    formInline.optionalConfigData && formInline.optionalConfigData.forEach((element:any) => {

        if(element.selectSub?.unit_price) {

            sum = sum + element.selectSub?.inputValue * Number(element.selectSub?.unit_price)

        }

    })

    lumpSum.value = (sum * formInline.productNum).toFixed(2)

}


async function submitForm() {

    isLoading.value = true
    const _res = await productQuotation()
    isLoading.value = false
    if(_res.success) {

        router.push({ path: '/info' })

    }else{

        ElMessageBox.alert(_res.msg, '提交失败', {
            confirmButtonText: '确认',
        })

    }

}
</script>
<template>
    <div v-loading.body="isLoading" class="product">
        <NavBar show-key="1" />
        <div class="service--box">
            <SelectBar :show-index="1" />
            <div class="service--box--title">
                第四步：选择产品配置生成报价单
            </div>
            <div style="width:100%">
                <img style="width:100%" src="../../public/images/stepBar/step4.png" alt="" />
            </div>
            <el-form
                ref="ruleFormRef"
                :inline="true"
                :model="formInline"
                label-position="top"
                class="form-inline"
                size="large"
            >
                <el-form-item prop="productList" label="选择服务" class="formItem">
                    <el-select
                        v-model="formInline.productItem"
                        clearable
                        style="width: 100%;"
                        placeholder="请选择您需要的产品"
                        value-key="product_id"
                        :disabled="isProductItem"
                    >
                        <el-option v-for="(item) in formInline.productList" :key="item.product_id" :label="item.product_name" :value="item" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="projectNum" label="产品数量" style="margin-right:0;">
                    <el-input-number v-model="formInline.productNum" step-strictly :min="1" @change="lumpSumComponent">

                        <template #append>台
                        </template>
                    </el-input-number>

                </el-form-item>
            </el-form>
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="全部" name="0" />
                <el-tab-pane label="可选性配置" name="1" />
                <el-tab-pane label="标准配置" name="2" />
            </el-tabs>
            <div v-show="activeName === '0' || activeName === '1'" class="service--box--configure">
                <div class="service--box--configure__title">可选性配置</div>
                <el-table :data="formInline.optionalConfigData" border style="width: 100%">
                    <el-table-column label="Option" align="center">
                        <template #default="{ row }">
                            <span>{{ ~~row.is_required === 1? '*' + row.item_name : row.item_name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="项名称" align="center">
                        <template #default="{ row }">
                            <div>
                                <span v-if="row.sub_item.length <= 0">无此配置 请联系相关管理员</span>
                                <el-select
                                    v-else
                                    v-model="row.selectSub"
                                    style="width: 100%;"
                                    placeholder="可选"
                                    value-key="item_name"
                                    :clearable="!(~~row.is_required === 1)"
                                    @change="lumpSumComponent"
                                >
                                    <el-option v-for="(subItem) in row.sub_item" :key="subItem.item_id" :label="subItem.item_name" :value="subItem" />
                                </el-select>
                            </div>

                        </template>
                    </el-table-column>
                    <el-table-column label="金额" align="center" width="200">
                        <template #default="{ row }">
                            <span>¥{{ row.selectSub?.unit_price ? (Number(row.selectSub?.unit_price) * row.selectSub.inputValue).toFixed(2) : 0 }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" align="center" width="200">
                        <template #default="{ row }">
                            <el-input-number
                                v-model="row.selectSub.inputValue"
                                :disabled="!row.selectSub?.item_id"
                                :step="~~row.selectSub.item_num"
                                step-strictly
                                :min="~~row.selectSub.item_num"
                                @change="lumpSumComponent"
                            />
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="activeName === '0' || activeName === '2'" class="service--box--configure">
                <div class="service--box--configure__title">标准配置</div>
                <el-table :data="formInline.standardScopeData" border style="width: 100%" :span-method="spanMethodStandardScope">
                    <el-table-column label="Standard Scope" align="center">
                        <template #default="{ row }">
                            <span v-if="row.isParent || !row.sub_item_name">{{ row.item_name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="项名称" align="center">
                        <template #default="{ row }">
                            <span>{{ row.sub_item_name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" align="center">
                        <template #default="{ row }">
                            <span>{{ ~~row.item_num }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div style="height: 100px;"></div>
            <div class="service--box--button border shadow-md">

                <div
                    class="service--box--button-prize"
                    style="margin-right:20px;color: #000000"
                >
                    <div class="service--box--button-prize--num">
                        <span class="service--box--button-prize--num--left">预估费用:</span>
                        <span class="service--box--button-prize--num--left" style="color:#ff8a00;">¥</span>
                        <span style=" vertical-align:bottom;line-height: 30px;">{{ lumpSum }}</span>
                    </div>
                    <div class="service--box--button-prize--tips">*配置单价 * 配置数量 * 产品数量 = 总金额</div>
                </div>
                <div>

                    <el-button
                        class="btn btn-block service__button"
                        color="#ffc219"
                        @click="submitForm"
                    >确认报价</el-button>

                    <el-button
                        class="btn btn-block service__button"
                        style="margin-right:20px;color: #000000"
                        @click="back"
                    >上一步</el-button>
                </div>

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
        width: 80%;

        :deep(.el-form-item__label) {
          font-size: 18px;
          color: #000000;
        }

      }
    }

    .service--box--button {
      position: fixed;
      bottom: 0;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0 20px 20px;
      width: 1200px;
      background: #ffffff;

      .service__button {
        float: right;
        width: 200px;
        height: 40px;
        font-size: 18px;
        font-weight: 500;
        border-radius: 8px;
        color:#ffffff;

      }

      .service--box--button-prize {
        width: 500px;

        .service--box--button-prize--num {
          display: flex;
          display: block;
          margin-left: 2px;
          font-size: 30px;
          font-weight: 500;
          color: #ff8a00;
          vertical-align:bottom;

          .service--box--button-prize--num--left {
            font-size: 16px;
            color: #333333;
            list-style: none;
            font-variant: tabular-nums;
            line-height: 1.5;
            vertical-align:bottom;

          }
        }

        .service--box--button-prize--tips {
          font-size: 12px;
          color: #333333;
          list-style: none;
          font-variant: tabular-nums;
          line-height: 1.5;
        }
      }


    }
  }
}
</style>