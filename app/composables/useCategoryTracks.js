const API_URL = "https://webdev-music-003b5b991590.herokuapp.com";

export const useCategoryTracks = () => {
  const categoryName = ref("");
  const trackIds = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchCategoryData = async (id) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch(`${API_URL}/catalog/selection/${id}/`);
      categoryName.value = response.data?.name || "Подборка";
      trackIds.value = response.data?.items || [];
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  return {
    categoryName,
    trackIds,
    loading,
    error,
    fetchCategoryData,
  };
};
