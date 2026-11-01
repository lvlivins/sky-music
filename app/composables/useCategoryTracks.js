const API_URL = "https://webdev-music-003b5b991590.herokuapp.com";

export const useCategoryTracks = () => {
  const categoryName = ref("");
  const trackIds = ref([]);
  const notFound = ref(false);

  const fetchCategoryData = async (id) => {
    notFound.value = false;
    try {
      const response = await $fetch(`${API_URL}/catalog/selection/${id}/`);
      if (!response.data) {
        notFound.value = true;
      }
      categoryName.value = response.data?.name || "Подборка";
      trackIds.value = response.data?.items || [];
    } catch (e) {
      notFound.value = true;
    }
  };

  return {
    categoryName,
    trackIds,
    fetchCategoryData,
    notFound,
  };
};
