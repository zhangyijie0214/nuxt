<!--
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-15 17:42:57
 * @lastTime : 2023-09-01 17:08:08
 * @LastAuthor : Do not edit
 * @文件路径 : /pages/info.vue
-->
<script setup lang="ts">
import type { TableInstance } from 'element-plus'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import NavBar from '../components/navBar/NavBar.vue'
import { useProductStore } from '../store/useProductStore'
const { getDealerQuote } = useProductStore()

const isLoading = ref(false)
const clientSize = ref({
    height: 0,
    width: 0
})
const tableInfo = reactive({
    // 显示的数据
    tableData: [],
    // 每页数量
    pageSize: 10,
    // 当前页数
    currentPage: 1,
    // 总页数
    recCount: 0,
})
onMounted(async() => {

    const _wrapperHeight = tableRef.value?.$el.offsetHeight
    tableInfo.pageSize = Math.ceil(_wrapperHeight / 44)
    await getList()
    clientSize.value.width = document.body.clientWidth
    clientSize.value.height = document.body.clientHeight

})

async function getList() {

    const { currentPage,pageSize } = tableInfo
    isLoading.value = true
    const _res = await getDealerQuote({ CurPage: currentPage,PageSize: pageSize })
    isLoading.value = false
    if(_res.success) {

        tableInfo.tableData = _res.data
        tableInfo.recCount = ~~_res.RecCount
        console.log('tableInfo.recCount',tableInfo.recCount)

    }else{

        ElMessageBox.alert(_res.msg, '失败', {
            confirmButtonText: '确认',
        })

    }

}
const tableRef = ref<TableInstance>()


const handleSizeChange = (val: number) => {

    console.log(`${val} items per page`)

}
const handleCurrentChange = () => {

    getList()

}

</script>

<template>
    <div class="quotation--list">
        <NavBar show-key="3" />
        <div v-if="false" class="quotation--list--content">
            <div class="text-3xl" style="font-weight: 500;text-align: center;">我的报价单</div>
            <el-empty description="暂无数据" />
        </div>
        <div v-else class="quotation--list--content">
            <div class="text-xl" style="margin-bottom: 20px;font-weight: 500;">我的报价单</div>
            <div class="quotation--list--content__box">
                <el-table
                    ref="tableRef"
                    v-loading="isLoading"
                    class="overflow-x-auto border shadow-md rounded-box"
                    row-key="date"
                    :data="tableInfo.tableData"
                    style="overflow:auto;width: 100%; min-height:calc(100vh - 4rem - 12rem - 80px);"
                >
                    <el-table-column prop="quote_number" label="报价编号" min-width="140" />
                    <el-table-column prop="company" label="询价公司" min-width="180" />
                    <el-table-column prop="product_name" label="产品名称" min-width="220" />

                    <el-table-column
                        prop="quote_time"
                        label="报价时间"
                        min-width="160"
                        column-key="date"
                    />
                    <el-table-column
                        prop="quote_type"
                        label="报价类别"
                        min-width="160"
                    >
                        <template #default="scope">
                            <el-tag
                                :type="~~scope.row.quote_type === 1 ? '' : 'success'"
                                disable-transitions
                            >{{ ~~scope.row.quote_type === 1 ? "产品类" : ~~scope.row.quote_type === 2 ? "服务类" : '' }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="下载"
                        min-width="120"
                    >
                        <template #default="scope">
                            <div style="display: flex;height:100%">
                                <a v-if="scope.row.quote_pdf_path" :href="scope.row.quote_pdf_path"><img style="height: 26px;" src="../public/images/info/down_pdf.png" alt="" /></a>
                                <a v-if="scope.row.agreement_word_path" :href="scope.row.agreement_word_path" style="margin-left: 20px;"><img style="height: 26px;" src="../public/images/info/down_word.png" alt="" /></a>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-config-provider v-if="tableInfo.recCount > 1" :locale="zhCn">
                    <el-pagination
                        v-model:current-page="tableInfo.currentPage"
                        :default-page-size="tableInfo.pageSize"
                        class="quotation--list--content--pagination border shadow-md rounded-box"
                        layout="prev, pager, next, jumper"
                        :total="tableInfo.recCount"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                    />
                </el-config-provider>
            </div>


        </div>
    </div>
</template>
<style lang="less">
.quotation--list {
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  min-height: 800px;


  .quotation--list--content {
    width: 90vw;

    .quotation--list--content__box {
      position: relative;

      .quotation--list--content--pagination {
        position: absolute;
        bottom: -80px;
        left: 50%;
        padding: 10px 10px 10px 0;
        transform: translateX(-50%);
      }
    }

  }
}


</style>