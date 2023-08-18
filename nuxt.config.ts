// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    target: 'static',
    devtools: {
        enabled: true,

        timeline: {
            enabled: true
        }
    },
    router: {
        middleware: ['redirect'],
        extendRoutes(routes, resolve) {

            // 查找首页路由
            const indexRoute = routes.find(route => route.name === 'index')

            // 为首页路由添加别名
            if (indexRoute) {

                indexRoute.alias = '/index.html'

            }

        }
    },
    postcss: {
        plugins: {
            tailwindcss: {},
        },
    },
    typescript: {
        strict: true
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@element-plus/nuxt',
    ],
    css: [
    ],
    vite: {
        css: {
            preprocessorOptions: {
            },
        },
    },
    elementPlus: {
        icon: 'ElIcon',
        importStyle: 'less',
    },
    nitro: {
        devProxy: {
            '/Cg': {
                target: 'http://bison.test.tt.cagoe.com/Cg', // 这里是接口地址
                changeOrigin: true,
                prependPath: true,
            },
        },
    },
    ssr: false,
    server: {
        host: '192.168.10.135', // 默认是 'localhost'
        port: 8081 // 默认是 3000
    },
})