// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    target: 'static',
    devtools: {
        enabled: true,

        timeline: {
            enabled: true
        }
    },

    hooks: {
        'pages:extend'(routes) {

            console.log('routes1',routes)
            const resolve = require('path').resolve

            // 扩展路由，让 nuxt 支持静态页面请求，如 https://www.xxx.cn/index.html
            const indexRoutes = []
            routes.forEach(element => {

                let newPath = ''
                if (element.path.endsWith('/')) {

                    newPath += 'index.html'

                } else {

                    newPath += '/index.html'

                }
                indexRoutes.push({
                    name: element.name + '/index.html',
                    path: element.path + newPath,
                    file: element.file,
                })

            })

            indexRoutes.forEach(element => {

                routes.push(element)

            })

            console.log('routes',routes)

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
    server: {
        host: '192.168.10.135', // 默认是 'localhost'
        port: 8081 // 默认是 3000
    },
    ssr: false
    // hooks: {
    //     'prerender:routes'({ routes }) {

    //         routes.clear()
    //         routes.add('/')

    //     }
    // }
})