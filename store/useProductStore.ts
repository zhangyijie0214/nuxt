/*
 * @description : 新建产品
 * @author : zhangyijie
 * @date : 2023-08-23 14:13:28
 * @lastTime : 2023-10-25 16:23:31
 * @LastAuthor : Do not edit
 * @文件路径 : /store/useProductStore.ts
 */
import { defineStore } from 'pinia'
import { reactive } from 'vue'

interface IProductStoreState {
  snapSelectProduct:any
}

const PRODUCT_STORE_STATE: IProductStoreState = {
    // 临时选择产品保存数据
    snapSelectProduct: {
        // 进度
        stepNum: 0,
        // 折线图数据
        chartData: {},
        // 订单Id
        quoteId: '',
        // 公司名称
        company: '',
        // 公司英文名
        companyEnglishname: '',
        // 项目名称
        projectName: '',
        // 联系人姓名
        contactName: '',
        // 联系人手机号
        contactPhone: '',
        // 进气温度
        intakeTemperature: '',
        // 进气压力
        intakePressure: '',
        // 进气流量
        intakeFlow: '',
        // 排气压力
        exhaustPressure: '',
        // 折线图路径列表
        chartImgList: [],
        // 折线图路径
        chartPdfUrl: '',
        // 产品列表
        productList: [],
        // 产品id
        productItem: {},
        // 产品数量
        productNum: 1,
        // 标准数据
        standardScopeData: [],
        // 可选数据
        optionalConfigData: [],
        // 相对湿度
        relativeHumidityNumber: 0

    }
}

export const useProductStore = defineStore('ProductState', () => {

    // 创建 Store state
    const state: IProductStoreState = reactive(PRODUCT_STORE_STATE)
    // 获取API
    const { $api } = useNuxtApp()

    /**
     * @description : 产品列表
     * @author : zhangyijie
     * @date : 2023-08-24 11:14:23
     * @param {any} date
     */
    const getDealerQuote = async(date:any) => {

        const _res = await $api.getDealerQuote(date)

        return _res

    }
    /**
   * @description : 获取产品列表
   * @author : zhangyijie
   * @date : 2023-08-22 09:20:26
   * @param {any} date
   */
    const getProduct = async(date:any) => {

        const _res = await $api.getProduct(date)

        return _res

    }
    /**
     * @description : 根据产品获取服务项及对应价格
     * @author : zhangyijie
     * @date : 2023-08-23 15:37:58
     * @param {any} date
     */
    const getServiceByProduct = async(date:any) => {

        const _res = await $api.getServiceByProduct(date)

        return _res

    }

    /**
     * @description : 服务类确认报价
     * @author : zhangyijie
     * @date : 2023-08-23 15:37:58
     * @param {any} date
     */
    const serviceQuotation = async(date:any) => {

        const _res = await $api.serviceQuotation(date)

        return _res

    }

    /**
     * @description : 获取性能曲线数据
     * @author : zhangyijie
     * @date : 2023-08-24 17:56:40
     * @param {any} date
     */
    const getChartData = async(date:any) => {

        const _res = await $api.getChartData(date)

        return _res

    }

    /**
     * @description : 获取标准配置项
     * @author : zhangyijie
     * @date : 2023-08-24 17:56:40
     * @param {any} date
     */
    const getStandardScope = async(date:any) => {

        const _res = await $api.getStandardScope(date)

        return _res

    }

    /**
     * @description : 获取可选配置项
     * @author : zhangyijie
     * @date : 2023-08-24 17:56:40
     * @param {any} date
     */
    const getOptionalConfig = async(date:any) => {

        const _res = await $api.getOptionalConfig(date)

        return _res

    }

    /**
     * @description : 提交
     * @author : zhangyijie
     * @date : 2023-08-24 17:56:40
     * @param {any} date
     */
    const productQuotation = async() => {

        const _configOptionList = []

        state.snapSelectProduct.optionalConfigData.forEach((item:any) => {

            if(item.selectSub?.item_id) {

                _configOptionList.push({
                    config_option_id: item.selectSub.item_id,
                    num: item.selectSub.inputValue
                })

            }


        })
        const _date = {
            quote_id: state.snapSelectProduct.quoteId,
            product_id: state.snapSelectProduct.productItem.product_id,
            product_num: state.snapSelectProduct.productNum,
            chart_image_path_list: state.snapSelectProduct.chartImgList,
            config_option_list: _configOptionList
        }
        const _res = await $api.productQuotation(_date)
        if(_res.success) {

            state.snapSelectProduct = {}
            state.snapSelectProduct.productNum = 1

        }
        return _res

    }


    /**
     * @description : 获取性能曲线pdf
     * @author : zhangyijie
     * @date : 2023-08-24 17:56:40
     * @param {any} date
     */
    const getChartPath = async() => {

        const _res = await $api.getChartPath({
            quote_id: state.snapSelectProduct.quoteId,
            chart_image_path_list: JSON.stringify(state.snapSelectProduct.chartImgList)
        })
        if(_res.success) {

            state.snapSelectProduct.chartPdfUrl = _res.pdf_path

        }
        return _res

    }

    const upLoadImg = async(base64:string) => {

        const _postData = {
            InputName: 'img',
            LimitSize: '50',
            SavePath: '/Upload',
            IsAutoCreateFolder: '1',
            IsSaveRealFileName: '0',
            LimitFileSiffix: '*',
            img: base64
        }
        const _res = await $api.send(
            `${location.origin}/Cg/Itf/Java/CmnMisItf.jsp?method=Upload`,
            _postData,
            {}
        )
        return _res

    }

    return {
        state,
        getDealerQuote,
        getProduct,
        getServiceByProduct,
        serviceQuotation,
        getChartData,
        upLoadImg,
        getChartPath,
        getStandardScope,
        getOptionalConfig,
        productQuotation
    }

})

export type UseProductStoreReturn = ReturnType<typeof useProductStore>