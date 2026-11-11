<script setup>
import { userData } from '~/stores/store';

const userStore = userData();

useHead({
  title: "Мои треки | Skypro.Music",
  meta: [
    { name: "description", content: "Ваши избранные треки на Skypro.Music" },
    { property: "og:title", content: "Мои треки | Skypro.Music" },
    { property: "og:description", content: "Ваши избранные треки на Skypro.Music" },
    { name: "twitter:title", content: "Мои треки | Skypro.Music" },
  ],
});

onMounted(function() {
  userStore.getUserData();

  if (!userStore.refreshToken) {
    navigateTo({
    path: "/sign",
    query: { redirect: "/favorites" },
  });
}
});

</script>

<template>
  <div>
    <h2 class="centerblock__h2">Мои треки</h2>
    <FilterControls />
    <Playlist :only-liked="true" />
  </div>
</template>

<style scoped>
.centerblock__h2 {
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: -0.8px;
  margin-bottom: 45px;
}
</style>
