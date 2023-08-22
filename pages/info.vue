<!--
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-15 17:42:57
 * @lastTime : 2023-08-22 19:02:33
 * @LastAuthor : Do not edit
 * @文件路径 : /pages/info.vue
-->
<script setup lang="ts">
import { ref,onMounted } from 'vue'
import type { TableColumnCtx, TableInstance } from 'element-plus'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import NavBar from '../components/navBar/NavBar.vue'

const currentPage3 = ref(1)
const pageSize3 = ref(100)
const small = ref(false)
const num = ref(0)
onMounted(() => {

    const _wrapperHeight = tableRef.value?.$el.getElementsByClassName('el-table__inner-wrapper')[0].offsetHeight
    const _rowHeight = tableRef.value?.$el.getElementsByClassName('el-table__row')[0].offsetHeight
    console.log('_wrapperHeight',_wrapperHeight)
    console.log('tableRef.value?.$el.clientHeight',_wrapperHeight / 44 ,_wrapperHeight,_rowHeight)


})
const tableRef = ref<TableInstance>()
const tableRef2 = ref<TableInstance>()

const tableData = [
    {
        quote_id: '20230601620123122',
        quote_time: '2016-05-03',
        quote_type: '产品类',
        product_name: 'Compressor 3stage',
        company: '上海市政院三院'
    },{
        quote_id: '20230601620123122',
        quote_time: '2016-05-03',
        quote_type: '产品类',
        product_name: 'Compressor 3stage',
        company: '上海市政院三院'
    },{
        quote_id: '20230601620123122',
        quote_time: '2016-05-03',
        quote_type: '产品类',
        product_name: 'Compressor 3stage',
        company: '上海市政院三院'
    },{
        quote_id: '20230601620123122',
        quote_time: '2016-05-03',
        quote_type: '产品类',
        product_name: 'Compressor 3stage',
        company: '上海市政院三院'
    },{
        quote_id: '20230601620123122',
        quote_time: '2016-05-03',
        quote_type: '产品类',
        product_name: 'Compressor 3stage',
        company: '上海市政院三院'
    },{
        quote_id: '20230601620123122',
        quote_time: '2016-05-03',
        quote_type: '产品类',
        product_name: 'Compressor 3stage',
        company: '上海市政院三院'
    },{
        quote_id: '20230601620123122',
        quote_time: '2016-05-03',
        quote_type: '产品类',
        product_name: 'Compressor 3stage',
        company: '上海市政院三院'
    },{
        quote_id: '20230601620123122',
        quote_time: '2016-05-03',
        quote_type: '产品类',
        product_name: 'Compressor 3stage',
        company: '上海市政院三院'
    },{
        quote_id: '20230601620123122',
        quote_time: '2016-05-03',
        quote_type: '产品类',
        product_name: 'Compressor 3stage',
        company: '上海市政院三院'
    },{
        quote_id: '20230601620123122',
        quote_time: '2016-05-03',
        quote_type: '产品类',
        product_name: 'Compressor 3stage',
        company: '上海市政院三院'
    },
]

const handleSizeChange = (val: number) => {

    console.log(`${val} items per page`)

}
const handleCurrentChange = (val: number) => {

    console.log(`current page: ${val}`)

}
</script>

<template>
    <div class="quotation--list">
        <NavBar />
        <div v-if="false" class="quotation--list--content">
            <div class="text-3xl" style="font-weight: 500;text-align: center;">我的报价单</div>
            <el-empty description="暂无数据" />
        </div>
        <div v-else class="quotation--list--content">
            <div class="text-xl" style="margin-bottom: 20px;font-weight: 500;">我的报价单</div>
            <div class="quotation--list--content__box">
                <el-table
                    ref="tableRef"
                    v-loading="false"
                    class="overflow-x-auto border shadow-md rounded-box"
                    row-key="date"
                    :data="tableData"
                    style="width: 100%;min-height:70vh;"
                >
                    <el-table-column prop="quote_id" label="报价编号" min-width="140" />
                    <el-table-column prop="company" label="询价公司" min-width="180" />
                    <el-table-column prop="product_name" label="产品名称" min-width="220" />

                    <el-table-column
                        prop="quote_time"
                        label="报价时间"
                        min-width="160"
                        column-key="date"
                    />
                    <el-table-column
                        prop="tag"
                        label="报价类别"
                        min-width="160"
                    >
                        <template #default="scope">
                            <el-tag
                                :type="scope.row.tag === 'Home' ? '' : 'success'"
                                disable-transitions
                            >产品类</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="tag"
                        label="下载"
                        min-width="120"
                    >
                        <template #default>
                            <div style="display: flex;height:100%">
                                <a href="#"><img style="height: 26px;" src="../public/images/info/down_pdf.png" alt="" /></a>
                                <a href="#" style="margin-left: 20px;"><img style="height: 26px;" src="../public/images/info/down_word.png" alt="" /></a>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-config-provider :locale="zhCn">
                    <el-pagination
                        v-model:current-page="currentPage3"
                        v-model:page-size="pageSize3"
                        class="quotation--list--content--pagination border shadow-md rounded-box"
                        :small="small"
                        layout="prev, pager, next, jumper"
                        :total="1000"
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
  min-height: 740px;

  .quotation--list--content {
    top: 30px;
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