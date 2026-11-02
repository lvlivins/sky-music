import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    currentTrack: null,
    playlist: [],
    isPlaying: false,
    progress: 0,
    volume: 50,
    audioRef: null,
    // случайный порядок треков - shuffle
    isShuffle: false,
    // повтор текущего трека - loop
    isLoop: false,
    likedIds: [],
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

    // // Установить громкость
    // setVolume(volume) {
    //   this.volume = volume;
    // },

    // Установить состояние воспроизведения
    setPlaying(isPlaying) {
      this.isPlaying = isPlaying;
    },

    // audio = 0-1, надо поменять на 0-100
    setAudioRef(element) {
      this.audioRef = element;
      if (this.audioRef) {
        this.audioRef.volume = this.volume / 100;
      }
    },

    togglePlay() {
      if (!this.audioRef) return;

      if (this.isPlaying) {
        this.audioRef.pause();
        this.isPlaying = false;
      } else {
        this.audioRef.play();
        this.isPlaying = true;
      }
    },

    toggleShuffle() {
      this.isShuffle = !this.isShuffle;
    },

    //  повтор
    toggleLoop() {
      this.isLoop = !this.isLoop;
      if (this.audioRef) {
        this.audioRef.loop = this.isLoop;
      }
    },
  },
});
