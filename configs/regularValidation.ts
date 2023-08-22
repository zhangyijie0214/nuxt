/*
 * @description :正则验证方法论
 * @author : zhangyijie
 * @date : 2023-08-17 15:18:22
 * @lastTime : 2023-08-22 09:54:47
 * @LastAuthor : Do not edit
 * @文件路径 : /configs/regularValidation.ts
 */
export const EMAIL_REGULAR = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/


export const PASS_STRENGTH = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/