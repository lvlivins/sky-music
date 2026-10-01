import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    // Текущий трек
    currentTrack: null,
    // Список треков
    playlist: [],
    // Играет ли сейчас
    isPlaying: false,
    // Прогресс воспроизведения (0-100)
    progress: 0,
    // Громкость (0-100)
    volume: 50,
    // Ссылка на аудиотег
    audioRef: null,
  }),

  actions: {
    // Установить текущий трек
    setCurrentTrack(track) {
      this.currentTrack = track;
    },

    // Установить плейлист
    setPlaylist(tracks) {
      this.playlist = tracks;
    },

    // Установить прогресс
    setProgress(progress) {
      this.progress = progress;
    },

    // Установить громкость
    setVolume(volume) {
      this.volume = volume;
    },

    // Установить состояние воспроизведения
    setPlaying(isPlaying) {
      this.isPlaying = isPlaying;
    },

    // Установить ссылку на аудиоэлемент
    setAudioRef(element) {
      this.audioRef = element;
      if (this.audioRef) {
        this.audioRef.volume = this.volume / 100;
      }
    },

    async playTrack(track) {
      if (!this.audioRef) return;

      this.currentTrack = track;
      this.audioRef.src = track.track_file;
      try {
        await this.audioRef.play();
        this.isPlaying = true;
      } catch (error) {
        console.error("Ошибка воспроизведения:", error);
        this.isPlaying = false;
      }
    },

    togglePlay() {
      if (!this.audioRef || !this.currentTrack) return;

      if (this.isPlaying) {
        this.audioRef.pause();
        this.isPlaying = false;
      } else {
        this.audioRef.play();
        this.isPlaying = true;
      }
    },

    updateProgress() {
      if (!this.audioRef) return;

      const currentTime = this.audioRef.currentTime;
      const duration = this.audioRef.duration;
      if (duration) {
        this.progress = (currentTime / duration) * 100;
      }
    },

    updateVolume(volume) {
      this.volume = volume;
      if (this.audioRef) {
        this.audioRef.volume = volume / 100;
      }
    },
  },
});
