<script setup>
import { useFiltersStore } from '~/stores/filters';
import { usePlayerStore } from '~/stores/player';
import { getFavorites, updateToken } from "~/composables/useApi";

const { loading, error, tracks, formatDuration } = await useTracks("tracks-playlist");
const { playTrack, toggleLike } = useAudioPlayer();

const filtersStore = useFiltersStore();
const playerStore = usePlayerStore();
const accessToken = useCookie("access");
const refreshToken = useCookie("refresh");
const likedIds = toRef(playerStore, "likedIds");

const props = defineProps({
  trackIds: { type: Array, default: null },
  withFilters: { type: Boolean, default: false },// клик фильтруем !!
  onlyLiked: { type: Boolean, default: false },
});

onMounted(async function () {
  if (refreshToken.value) {
    try {
      const tokens = await updateToken(refreshToken.value);
      accessToken.value = tokens.access;

      const response = await getFavorites(accessToken.value);
      likedIds.value = response.data.map(
        function (track) {
        return track._id;
      });
    } catch (error) {
      likedIds.value = [];
    }
  }
});

const shownTracks = computed(() => {
  let list = tracks.value;

  if (props.trackIds) {
    list = list.filter((track) => props.trackIds.includes(track._id));
  }

  if (props.onlyLiked) {
    list = list.filter(
      function (track) {
      return likedIds.value.includes(track._id);
    });
  }

  if (props.withFilters) {
    if (filtersStore.selectedAuthors.length) {
      list = list.filter((track) => filtersStore.selectedAuthors.includes(track.author));
    }
    if (filtersStore.selectedGenres.length) {
      list = list.filter(function(track) {
        return track.genre.some(
          function(g) {
          return filtersStore.selectedGenres.includes(g.toLowerCase().trim());
        });
      });
    }
    if (filtersStore.selectedYear === 'Сначала новые') {
      list = list.slice().sort(
        function(a, b) {
        return (b.release_date || '0000').localeCompare(a.release_date || '0000');
      });
    }
    if (filtersStore.selectedYear === 'Сначала старые') {
      list = list.slice().sort(
        function(a, b) {
        return (a.release_date || '9999').localeCompare(b.release_date || '9999');
      });
    }
  }

  return list;
});

const selectTrack = (track) => {
  playerStore.setPlaylist(shownTracks.value);
  playTrack(track);
};
</script>

<template>
  <div class="centerblock__content playlist-content">
    <div class="content__title playlist-title">
      <div class="playlist-title__col col01">Трек</div>
      <div class="playlist-title__col col02">Исполнитель</div>
      <div class="playlist-title__col col03">Альбом</div>
      <div class="playlist-title__col col04">
        <svg class="playlist-title__svg">
          <use xlink:href="/img/icon/sprite.svg#icon-watch"></use>
        </svg>
      </div>
    </div>
    <div v-if="loading" class="content__playlist playlist">
      <div class="loading">Загрузка треков...</div>
    </div>
    <div v-else-if="error" class="content__playlist playlist">
      <div class="error">Ошибка загрузки: {{ error.message }}</div>
    </div>
    <div v-else class="content__playlist playlist">
      <div class="playlist__item" v-for="track in shownTracks" :key="track._id">
        <div class="playlist__track track">
          <div class="track__title">
            <div class="track__title-image">
              <span
                v-if="playerStore.currentTrack?._id === track._id"
                class="playing-dot"
                :class="{ playing: playerStore.isPlaying }"
              ></span>
              <svg v-else class="track__title-svg">
                <use xlink:href="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            </div>
            <div class="track__title-text">
              <a class="track__title-link" href="#" @click="selectTrack(track)">{{ track.name }}</a>
            </div>
          </div>
          <div class="track__author">
            <a class="track__author-link" href="#">{{ track.author }}</a>
          </div>
          <div class="track__album">
            <a class="track__album-link" href="#">{{ track.album }}</a>
          </div>
          <div class="track__time">
            <svg
              class="track__time-svg"
              :class="{ liked: likedIds.includes(track._id) }"
              @click="toggleLike(track)"
            >
              <use xlink:href="/img/icon/sprite.svg#icon-like"></use>
            </svg>
            <span class="track__time-text">{{ formatDuration(track.duration_in_seconds) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.centerblock__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.content__title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 24px;
}

.content__playlist {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow-y: auto;
}

.playlist-title__col {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 2px;
  color: #696969;
  text-transform: uppercase;
}

.playlist-title__svg {
  width: 12px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
}

.col01 {
  width: 447px;
}

.col02 {
  width: 321px;
}

.col03 {
  width: 245px;
}

.col04 {
  width: 60px;
  text-align: end;
}

.playlist__item {
  width: 100%;
  display: block;
  margin-bottom: 12px;
}

.playlist__track {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.track__title {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  width: 447px;
}

.track__title-image {
  width: 51px;
  height: 51px;
  padding: 16px;
  background: #313131;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-right: 17px;
}

.track__title-svg {
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
}

.track__title-link {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
}

.track__author {
  width: 321px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}

.track__author-link {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-align: left;
}

.track__album {
  width: 245px;
}

.track__album-link {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #696969;
}

.track__time {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60px;
}

.track__time-svg {
  width: 14px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
  cursor: pointer;
}

.track__time-svg.liked {
  fill: #b672ff;
  stroke: #b672ff;
}

.track__time-text {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #696969;
}

.playing-dot {
  width: 16px;
  height: 16px;
  background-color: #b672ff;
  border-radius: 8px;
}

.playing-dot.playing {
  animation: bubble_out 0.6s ease-in-out infinite both;
}

@keyframes bubble_out {
  0%,
  to {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
}
</style>
