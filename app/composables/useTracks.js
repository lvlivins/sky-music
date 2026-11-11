const API_URL = "https://webdev-music-003b5b991590.herokuapp.com";

export const useTracks = async (key = "tracks") => {
  const {
    data: response,
    pending: loading,
    error,
  } = await useFetch(`${API_URL}/catalog/track/all/`, {
    key,
    transform: (response) => response.data,
  });

  const tracks = computed(() => response.value || []);

  return {
    tracks,
    loading,
    error,
  };
};

export function formatDuration(seconds) {
  if (typeof seconds !== "number" || isNaN(seconds) || seconds < 0) {
    return "";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}