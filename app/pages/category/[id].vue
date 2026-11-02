<script setup>
const route = useRoute();
const origin = useRequestURL().origin;

const { categoryName, trackIds, fetchCategoryData, notFound } = useCategoryTracks();

await fetchCategoryData(route.params.id);

const head = useHead({
  title: "Skypro.Music"
});

watch(
  [categoryName, () => route.params.id],
  ([name]) => {
    const newName = name;
    head.patch({
      title: `${newName} | Skypro.Music`,
      meta: [
        { name: "description", content: `Подборка «${newName}» на Skypro.Music` },
        { property: "og:title", content: `${newName} | Skypro.Music` },
        { property: "og:description", content: `Подборка «${newName}» на Skypro.Music` },
        { property: "og:url", content: origin + route.fullPath },
        { name: "twitter:title", content: `${newName} | Skypro.Music` },
      ],
    });
  },
  { immediate: true }
);

// Загрузка данных при изменении ID категории
watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      await fetchCategoryData(newId);
    }
  }
);

if (notFound.value) {
  throw createError({ statusCode: 404, message: "Подборка не найдена" });
}
</script>

<template>
  <div>
    <h2 class="centerblock__h2">{{ categoryName }}</h2>
    <FilterControls />
    <Playlist :track-ids="trackIds" />
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
