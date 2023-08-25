<!--
 * @description :选择板块Bar
 * @author : zhangyijie
 * @date : 2023-08-23 10:23:24
 * @lastTime : 2023-08-23 14:52:35
 * @LastAuthor : Do not edit
 * @文件路径 : /components/selectBar/SelectBar.vue
-->
<script lang="ts" setup>

const props = defineProps({ showIndex: Number })
</script>
<template>
    <div class="select--bar">
        <div class="select--bar--text text-xl" :class="props.showIndex === 1 ? 'sel' : ''">挑选产品</div>
        <div class="select--bar--text text-xl" :class="props.showIndex === 2 ? 'sel' : ''">挑选服务</div>
    </div>
</template>
<style lang="less" scoped>
.select--bar {
  display: flex;
  margin-bottom: 20px;

  .select--bar--text {
    width: 130px;
    font-weight: bold;
    color: #000000;
    line-height: 22px;

    &.sel {
      position: relative;
      color: #ffc219;

      &::before {
        position: absolute;
        bottom: -16px;
        width: 110px;
        height: 6px;
        border-radius: 175px;
        background: #ffc219;
        opacity: 1;
        content:'';
      }
    }
  }
}
</style>