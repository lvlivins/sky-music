<script setup>
useHead({
  title: "Треки | Skypro.Music",
  meta: [
    { name: "description", content: "Все треки Skypro.Music: фильтры по исполнителю, году выпуска и жанру" },
    { property: "og:title", content: "Треки | Skypro.Music" },
    { property: "og:description", content: "Все треки Skypro.Music: фильтры по исполнителю, году выпуска и жанру" },
    { name: "twitter:title", content: "Треки | Skypro.Music" },
  ],
});
</script>

<template>
  <div>
    <h2 class="centerblock__h2">Треки</h2>
    <FilterControls />
    <Playlist with-filters />
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
