<template>
  <div class="error-page">
    <div class="error-page_box">
    <h1>Ошибка {{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
        <NuxtLink class="error-page__NuxtLink" to="/">Вернуться на главную</NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  background-color: #181818;
}

.error-page_box {
  width: 366px;
  height: 210px;
  background-color: #3f007d;;
  border-radius: 12px;
  padding: 43px 47px 47px 40px;
  position: absolute;
  z-index: 1;
  left: calc(50% - (366px / 2));
  top: calc(50% - (439px / 2));
  opacity: 1;
  gap: 14px;
  display: flex;
  flex-direction: column;
}

.error-page__NuxtLink {
  color: #ff4d4f;
}
</style>
