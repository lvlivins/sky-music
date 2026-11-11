<script setup>
import { usePlayerStore } from '~/stores/player';

const playerStore = usePlayerStore();
const { toggleLike } = useAudioPlayer();
</script>

<template>
  <div class="player__track-play track-play">
    <div class="track-play__contain">
      <div class="track-play__image">
        <svg class="track-play__svg">
          <use xlink:href="/img/icon/sprite.svg#icon-note"></use>
        </svg>
      </div>
      <div class="track-play__author">
        <a class="track-play__author-link" href="#">{{
          playerStore.currentTrack?.author
        }}</a>
      </div>
      <div class="track-play__album">
        <a class="track-play__album-link" href="#">{{
            playerStore.currentTrack?.album
          }}</a>
      </div>
    </div>
    <div class="track-play__like-dis">
      <div class="track-play__like _btn-icon">
        <svg
          class="track-play__like-svg"
          :class="{
          liked: playerStore.likedIds.includes(playerStore.currentTrack?._id)
        }"
          @click="toggleLike(playerStore.currentTrack)"
        >
          <use xlink:href="/img/icon/sprite.svg#icon-like"></use>
        </svg>
      </div>
      <div class="track-play__dislike _btn-icon">
        <svg class="track-play__dislike-svg">
          <use
            xlink:href="/img/icon/sprite.svg#icon-dislike"
          ></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.player__track-play {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
}

.track-play__contain {
  width: auto;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas: "image author" "image album";
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.track-play__image {
  width: 51px;
  height: 51px;
  background-color: #313131;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-right: 12px;
  grid-row: 1;
  -ms-grid-row-span: 2;
  grid-column: 1;
  grid-area: image;
}

.track-play__svg {
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
}

.track-play__author {
  grid-row: 1;
  grid-column: 2;
  grid-area: author;
  min-width: 49px;
}

.track-play__author-link {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  white-space: nowrap;
}

.track-play__album {
  grid-row: 2;
  grid-column: 2;
  grid-area: album;
  min-width: 49px;
}

.track-play__album-link {
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: #ffffff;
}

.track-play__like-dis {
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
  margin-left: 26%;
}

.track-play__like,
.track-play__dislike {
  padding: 5px;
}

.track-play__like-svg {
  width: 14px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
}

.track-play__like-svg.liked {
  fill: #b672ff;
  stroke: #b672ff;
}

.track-play__dislike {
  margin-left: 28.5px;
}

.track-play__dislike-svg {
  width: 14.34px;
  height: 13px;
  fill: transparent;
  stroke: #696969;
}
</style>
