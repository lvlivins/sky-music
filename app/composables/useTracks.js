const API_URL = "https://webdev-music-003b5b991590.herokuapp.com";

export const useTracks = async (key = "tracks") => {
  const {
    data: response,
    pending: loading,
    error,
    refresh: fetchTracks,
  } = await useFetch(`${API_URL}/catalog/track/all/`, {
    key,
    transform: (response) => response.data,
  });

  const tracks = computed(() => response.value || []);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

  return {
    tracks,
    loading,
    error,
    fetchTracks,
    formatDuration,
  };
};