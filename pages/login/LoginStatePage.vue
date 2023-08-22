<script setup lang="ts">
import LoginLeft from '../../components/login/LoginLeft.vue'
import { ArrowLeftBold,CircleCheckFilled,InfoFilled } from '@element-plus/icons-vue'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
// 后期走常量
const LOGIN_STATE = [
    {
        key: 'changePasswordSuccess',
        icon: CircleCheckFilled,
        title: '密码已更新',
        tips: '您的密码已更新！',
        buttonText: '登录',
        ok: () => {

            router.push({ path: '/' })

        }
    },
    {
        key: 'underReview',
        title: '审核中',
        icon: InfoFilled,
        tips: '您的账号在审核中，\n我们会在第一时间邮件告知审核进度！',
        buttonText: '',
    },
    {
        key: 'auditFailure',
        title: '审核失败',
        tips: '您的账号审核失败，\n请重新填写您的注册信息！',
        buttonText: '前往',
        ok: () => {

            console.log('ok')

        }
    },
    {
        key: 'emailSuccess',
        icon: CircleCheckFilled,
        title: '邮件发送成功',
        tips: '请前往您的邮箱，验证是不是本人操作',
        buttonText: '',
    },
]


const info = LOGIN_STATE.find(item => item.key === route.query.state)

onMounted(() => {

    console.log(route)

})
function back() {

    router.back()

}
</script>

<template>
    <LoginLeft>
        <div class="right card flex-shrink-0 w-full shadow-2xl bg-base-100">

            <button class="btn btn-ghost back" @click="back">
                <el-icon><ArrowLeftBold /></el-icon>
                返回
            </button>
            <el-icon style="margin: 30px auto;" size="70" color="#50B042"><CircleCheckFilled /></el-icon>
            <div class="right--title">
                {{ info?.title }}
            </div>
            <div class="right--tips">
                {{ info?.tips }}
            </div>
            <button v-if="info?.buttonText" class="btn btn-block right--btn" @click="info?.ok">  {{ info?.buttonText }}</button>
        </div>
    </LoginLeft>
</template>
<style lang="less" scoped>
.right {
  position: relative;
  margin: 0 auto;
  padding: 50px 100px;
  width: 500px;

  .right--title {
    margin: 0 auto 20px;
    font-size: 23.49px;
    font-weight: 500;
    text-align: center;
    color: #0b132a;
    line-height: 32.89px;
    letter-spacing: 0;


  }

  .right--tips {
    margin: 0 auto 20px;
    font-size: 16px;
    font-weight: normal;
    text-align: center;
    white-space: pre-line;
    color: #0b132a;
    line-height: 32.89px;
    letter-spacing: 0;
  }

  .right--input__box {
    width: 403px;
  }

  .right--btn {
    margin-top: 30px;
    width:320px;
    font-size: 18px;
    font-weight: 500;
    color:#ffffff;
    background:#ffc219;
  }

  .back {
    position: absolute;
    top:10px;
    left:10px;
    display: flex;
    align-items: center;
    color: #8692a6;
  }
}
</style>