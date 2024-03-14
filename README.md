根据您的要求，我会更新【8041 毕森机械在线报价系统】的项目文档，使其格式与之前的请求相符合。

# 【8041】毕森机械在线报价系统

## 项目相关介绍

本项目使用 Nuxt 来开发。

## 项目相关信息

- [nuxt官网链接](https://nuxt.com.cn/)

#### 测试站FTP信息

- **IP:** `10.10.1.238`
- **用户:** `root`
- **路径:** `/home/wwwroot/bison.test.tt.cagoe.com`

- **设计稿**  
  [查看设计稿](https://mastergo.com/file/96985888685927?page_id=207%3A63330)

- **接口文档**  
  [查看接口文档](https://cagoe.yuque.com/wtm65r/sn9bl2/rev1e83iqxvi6n6p)

- **后台地址**  
  [进入后台管理](http://bison.test.tt.cagoe.com/Cg/VueManage/Default.html?SysName=javaframework)

## 目录 & 结构

| 目录        | 作用1               | 作用2                                              |
| ----------- | ------------------- | -------------------------------------------------- |
| [assets](./assets/README.md)      | 静态资源目录        | 存放项目业务静态资源文件                           |
| [components](./components/README.md)  | 组件目录            | 方便复用和管理的组件库                             |
| [configs](./configs/README.md)    | 常量                | 项目中使用的常量配置                               |
| [dist](./dist)                    | 编译后的代码         | 构建后的静态资源存放目录                           |
| [middleware](./middleware/README.md) | 路由中间件框架    | 处理页面或组件访问权限，路由跳转前的逻辑            |
| [pages](./pages/README.md)        | 页面                | 包含所有页面文件，支持自动路由配置                 |
| [plugins](./plugins/README.md)    | 插件                | 引入和配置Vue插件或其他依赖                         |
| [public](./public)                | 资源                | 静态资源目录，如图片、字体等                        |
| [store](./store/README.md)        | 全局数据            | Vuex状态管理相关文件                               |
| [app.vue](./app.vue)              | 入口VUE页面         | 定义应用布局和全局样式的主组件                      |
| [nuxt.config.ts](./nuxt.config.ts)| Nuxt的相关配置页面  | Nuxt.js项目的配置文件，包括插件、模块等             |

## 编译方式

- **打包方式:**  
  运行 `yarn generate` 来打包项目。

- **本地调试:**  
  运行 `yarn dev` 来在开发模式下启动项目。
