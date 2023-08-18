/*
 * @description :
 * @author : zhangyijie
 * @date : 2023-08-18 15:41:20
 * @lastTime : 2023-08-18 15:41:21
 * @LastAuthor : Do not edit
 * @文件路径 : /middleware/redirect.ts
 */
// middleware/redirect.js
export default function({ route, redirect }) {

    if (route.fullPath === '/index.html') {

        redirect(301, '/')

    }

}