<script setup>
useHead({
    title: '测试',
    link: [
        {
            rel: 'icon', type: 'image/png', href: '/nuxt.png',
        },
    ],
})


</script>
<template>
    <NuxtPage />
</template>
<style>
.error-color {
  color: red;
}

.error-border {
  border-color: red;
}
</style>