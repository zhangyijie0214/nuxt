<!--
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-24 20:24:59
 * @lastTime : 2023-09-01 17:25:03
 * @LastAuthor : Do not edit
 * @文件路径 : /pages/selectProduct/step3.vue
-->


<script setup lang="ts">
import NavBar from '../../components/navBar/NavBar.vue'
import SelectBar from '../../components/selectBar/SelectBar.vue'
import { useProductStore } from '../../store/useProductStore'

import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { ref } from 'vue'
const router = useRouter()

use([
    CanvasRenderer,
    LineChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent
])
const { getChartPath,upLoadImg,state } = useProductStore()

const chartRefs:any = ref({})
const isLoading = ref(false)


onMounted(() => {

    if(!state.snapSelectProduct.quoteId) {

        navigateTo({ path: '/selectProduct/step1/index.html' })

    }

    state.snapSelectProduct.stepNum = 3
    state.snapSelectProduct.chartImgList = []
    state.snapSelectProduct.chartPdfUrl = ''

})
function back() {

    router.back()

}
/**
 * @description : 表格参数处理
 * @author : zhangyijie
 * @date : 2023-08-25 09:44:13
 * @param {*} chart
 */
function generateOptions(chart:any) {

    // 提取所有的子图表数据并转化为ECharts的系列格式
    const series = Object.values(chart).filter((subChart:any) => subChart.data && typeof subChart === 'object').map((subChart:any) => {

        return {
            name: subChart.desc,
            type: 'line',
            data: subChart.data,
            smooth: true,
        }

    })
    // 计算所有数据的最小值
    // const allDataPoints = [].concat(...series.map(s => s.data))
    // const allXValues = allDataPoints.map(point => point[0])
    // const allYValues = allDataPoints.map(point => point[1])
    // const minXValue = Math.min(...allXValues)
    // const minYValue = Math.min(...allYValues)
    // 动态生成图例数据
    const legendData = series.map(s => s.name)
    return {
        title: {
            text: chart.desc
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: legendData,
            bottom: 10
        },
        xAxis: {
            type: 'value',
        },
        yAxis: {
            type: 'value',
        },
        series: series,
        grid: {
            borderWidth: 0, // 边框宽度
            borderColor: '#333', // 边框颜色
            show: true // 显示网格边框
        },
    }

}

async function uploadCharts(isJump:boolean = true) {

    const _chartImgList = state.snapSelectProduct.chartImgList
    if(state.snapSelectProduct.chartImgList.length > 0 && state.snapSelectProduct.chartPdfUrl && isJump) {

        // 使用函数进行跳转
        triggerLink(state.snapSelectProduct.chartPdfUrl)
        return

    }
    isLoading.value = true

    for (let index = 0; index < Object.keys(state.snapSelectProduct.chartData).length; index++) {

        // 获取ECharts实例
        const imageURL = await chartRefs.value[`chart-${index}`].getDataURL({
            type: 'png',
            pixelRatio: 1,
            backgroundColor: '#fff',
        })
        const _res = await upLoadImg(imageURL)

        if(_res.success) {

            _chartImgList.push(_res.Path)

        }

    }
    const _res = await getChartPath()

    isLoading.value = false
    if(_res.success) {

        if(isJump) {

            // 使用函数进行跳转
            triggerLink(state.snapSelectProduct.chartPdfUrl)

        }


    }else{

        ElMessageBox.alert(_res.msg, '失败', {
            confirmButtonText: '确认',
        })

    }

}

function triggerLink(url:string) {

    // 创建一个新的a元素
    const link = document.createElement('a')

    // 设置a元素的href属性
    link.href = '/Cg' + url

    // 设置a元素的target属性，使其在新窗口或标签页中打开
    link.target = '_blank'

    // 将a元素添加到文档中
    document.body.appendChild(link)

    // 模拟用户点击a元素
    link.click()

    // 将a元素从文档中移除
    document.body.removeChild(link)

}

async function goStep4() {

    await uploadCharts(false)
    navigateTo({ path: '/selectProduct/step4/index.html' })

}

</script>
<template>
    <div v-loading.body="isLoading" class="product">
        <NavBar show-key="1" />
        <div class="service--box">
            <SelectBar :show-index="1" />
            <div class="service--box--title">
                第三步：预览性能曲线
            </div>
            <div style="width:100%">
                <img style="width:100%" src="../../public/images/stepBar/step3.png" alt="" />
            </div>
            <!-- 循环遍历chartData中的每个图表数据 -->
            <div v-for="(chart, chartKey,index) in state.snapSelectProduct.chartData" :key="chartKey">
                <v-chart :option="generateOptions(chart)" class="chart" />
            </div>
            <div class="service--box--button">

                <el-button
                    class="btn btn-block service__button"
                    color="#ffc219"
                    @click="goStep4"
                >下一步</el-button>
                <el-button
                    class="btn btn-block service__button"
                    color="#8181ff"
                    style="margin-right:20px;"
                    @click="uploadCharts()"
                >导出曲线</el-button>
                <el-button
                    class="btn btn-block service__button"
                    style="margin-right:20px;color: #000000"
                    @click="back"
                >上一步</el-button>
            </div>
            <div style="height: 100px;"></div>

            <div v-for="(chart, chartKey,index) in state.snapSelectProduct.chartData" :key="chartKey">
                <v-chart :ref="el => { chartRefs[`chart-${index}`] = el; }" :option="generateOptions(chart)" class="chart2" />
            </div>
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
      margin: 50px 0;
      width: 100%;

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

.chart {
  margin:20px auto;
  padding: 10px;  /* 内边距，使边框与图表之间有一些间距 */
  height: 800px;
  border: 1px solid #333333;  /* 边框宽度、样式和颜色 */
  box-sizing: border-box;
}

.chart2 {
  position: fixed;
  right: 100000px;
  width: 600px;
  height: 390px;
}
</style>