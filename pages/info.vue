<!--
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-15 17:42:57
 * @lastTime : 2023-08-17 15:34:01
 * @LastAuthor : Do not edit
 * @文件路径 : /pages/info.vue
-->
<script setup lang="ts">
import { ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
definePageMeta({
    middleware: ['auth']
})
import NavBar from '../components/navBar/NavBar.vue'
const currentPage1 = ref(5)
const currentPage2 = ref(5)
const currentPage3 = ref(5)
const currentPage4 = ref(4)
const pageSize2 = ref(100)
const pageSize3 = ref(100)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
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
                <div class="overflow-x-auto border shadow-xl rounded-box">
                    <table class="table">
                        <!-- head -->
                        <thead>
                            <tr>
                                <th>报价编号</th>
                                <th>询价公司</th>
                                <th>产品名称</th>
                                <th>报价时间</th>
                                <th>报价类别</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="hover">
                                <td>20230601620123122</td>
                                <td>上海市政院三院</td>
                                <td>Geared speed single-stage centrifugal blower 单级离心式鼓风机</td>
                                <td>2021-12-14</td>
                                <td>产品类</td>
                                <td>
                                    下载
                                </td>
                            </tr>
                            <tr class="hover">
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                            </tr>
                            <tr class="hover">
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                            </tr>
                            <tr class="hover">
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                            </tr>
                            <tr class="hover">
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                            </tr>
                            <tr class="hover">
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                            </tr>
                            <tr class="hover">
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                            </tr>
                            <tr class="hover">
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                            </tr>
                            <tr class="hover">
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                            </tr>
                            <tr class="hover">
                                <td>Hart Hagerty</td>
                                <td>Desktop Support Technician</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                                <td>Purple</td>
                            </tr>
                        </tbody>
                    </table>
                    <el-config-provider :locale="zhCn">
                        <el-pagination
                            v-model:current-page="currentPage3"
                            v-model:page-size="pageSize3"
                            class="quotation--list--content--pagination border shadow-xl rounded-box"
                            :small="small"
                            :disabled="disabled"
                            layout="prev, pager, next, jumper"
                            :total="1000"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                        />
                    </el-config-provider>
                </div>
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

  .quotation--list--content {
    top: 30px;
    width: 80vw;

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