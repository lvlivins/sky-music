import { computed, watchEffect } from "vue";
import { usePlayerStore } from "~/stores/player";
import { updateToken, addFavorite, removeFavorite } from "~/composables/useApi";

export function useAudioPlayer() {
  // Получаем store, чтобы менять данные в хранилище
  const playerStore = usePlayerStore();
  const accessToken = useCookie("access");
  const refreshToken = useCookie("refresh");

  async function toggleLike(track) {
    if (!refreshToken.value) {
      return;
    }

    try {
      const tokens = await updateToken(refreshToken.value);
      accessToken.value = tokens.access;

      if (playerStore.likedIds.includes(track._id)) {
        await removeFavorite(track._id, accessToken.value);
        playerStore.likedIds = playerStore.likedIds.filter(function (id) {
          return id !== track._id;
        });
      } else {
        await addFavorite(track._id, accessToken.value);
        playerStore.likedIds.push(track._id);
      }
    } catch (error) {
      accessToken.value = null;
      refreshToken.value = null;
      playerStore.likedIds = [];
    }
  }

  // Инициализируем плеер в самом начале
  const initPlayer = (element) => {
    if (!element) {
      return;
    }
    playerStore.setAudioRef(element);
  };

  // Воспроизводим трек
  const playTrack = async (track) => {
    if (!playerStore.audioRef) {
      return;
    }

    try {
      playerStore.setCurrentTrack(track);
      playerStore.setProgress(0); // таймлайн на 0
      playerStore.audioRef.src = track.track_file;
      await playerStore.audioRef.play();
      playerStore.setPlaying(true);
    } catch (error) {
      playerStore.setPlaying(false);
    }
  };

  // Обновляем прогресс трека
  const handleTimeUpdate = () => {
    if (!playerStore.audioRef) return;
    const currentTime = playerStore.audioRef.currentTime;
    const duration = playerStore.audioRef.duration;
    if (duration) {
      const progress = (currentTime / duration) * 100;
      playerStore.setProgress(progress);
    }
  };

  const handleTrackEnd = () => {
    playerStore.setPlaying(false);
    playNext();
  };

  // Перематываем
  const seekTo = (percentage) => {
    if (!playerStore.audioRef) return;
    const newTime = (percentage / 100) * playerStore.audioRef.duration;
    playerStore.audioRef.currentTime = newTime;
    playerStore.setProgress(percentage);
  };

  // Меняем громкость
  const updateVolume = () => {
    if (!playerStore.audioRef) return;
    playerStore.audioRef.volume = playerStore.volume / 100;
  };

  // Переключение треков
  const currentIndex = computed(
    function () {
    const current = playerStore.currentTrack;

    if (!current) {
      return -1;
    }

    return playerStore.playlist.findIndex(
      function (track) {
      return track._id === current._id;
    });
  });


  const isFirstTrack = computed(
    function () {
    return currentIndex.value <= 0;
  });

  const isLastTrack = computed(
    function () {
    if (playerStore.isShuffle) {
      return false;
    }

    const lastIndex = playerStore.playlist.length - 1;
    return currentIndex.value === lastIndex;
  });

  function playNext() {
    if (isLastTrack.value) {
      return;
    }

    if (playerStore.isShuffle) {
      const otherTracks = playerStore.playlist.filter(
        function (track) {
        return track._id !== playerStore.currentTrack._id;
      });

      const randomIndex = Math.floor(Math.random() * otherTracks.length);
      playTrack(otherTracks[randomIndex]);

    } else {
      const nextTrack = playerStore.playlist[currentIndex.value + 1];
      playTrack(nextTrack);
    }
  }

  function playPrev() {
    if (isFirstTrack.value) {
      return;
    }

    const prevTrack = playerStore.playlist[currentIndex.value - 1];
    playTrack(prevTrack);
  }

  // Закончился ли трек?
  watchEffect(() => {
    if (playerStore.progress >= 100 && playerStore.isPlaying) {
      playerStore.setPlaying(false);
    }
  });

  return {
    initPlayer,
    playTrack,
    handleTimeUpdate,
    handleTrackEnd,
    seekTo,
    updateVolume,
    playNext,
    playPrev,
    isFirstTrack,
    isLastTrack,
    toggleLike,
  };
}
