<script setup>
// меню слева, сайдбар справа, плеер внизу
import { userData } from "~/stores/store";
import { useFiltersStore } from "~/stores/filters";

const route = useRoute();
const origin = useRequestURL().origin;
const userStore = userData();
const filtersStore = useFiltersStore();

onMounted(
  function() {
    userStore.getUserData();
  });

const authPage = computed(
  function() {
    if (route.path === '/sign') {
      return true;
    } else {
      return false;
    }
  });

useHead(() => ({
  title: "Skypro.Music",
  meta: [
    { name: "description", content: "Skypro.Music - слушайте любимые треки онлайн" },
    { property: "og:title", content: "Skypro.Music" },
    { property: "og:description", content: "Skypro.Music - слушайте любимые треки онлайн" },
    { property: "og:site_name", content: "Skypro.Music" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: origin + route.fullPath },
    { property: "og:image", content: origin + "/img/logo.png" },
    { name: "twitter:title", content: "Skypro.Music" },
  ],
}));
</script>

<template>
  <slot
    v-if="authPage"
  />
  <div
    v-else
    class="wrapper"
  >
    <div class="container">
      <main class="main">
        <Navbar />
        <div class="main__centerblock centerblock">
          <div class="centerblock__search search">
            <svg class="search__svg">
              <use xlink:href="/img/icon/sprite.svg#icon-search"></use>
            </svg>
            <input
              class="search__text"
              type="search"
              placeholder="Поиск"
              name="search"
              v-model="filtersStore.textSearch"
            />
          </div>
          <slot></slot>
        </div>

        <div class="main__sidebar sidebar">
          <div class="sidebar__personal">
            <p class="sidebar__personal-name">{{ userStore.username }}</p>
            <NuxtLink to="/sign">
              <div class="sidebar__icon">
                <svg>
                  <use xlink:href="/img/icon/sprite.svg#logout"></use>
                </svg>
              </div>
            </NuxtLink>
          </div>
          <div class="sidebar__block">
            <div class="sidebar__list">
              <div class="sidebar__item">
                <NuxtLink class="sidebar__link" to="/category/2">
                    <NuxtImg
                      class="sidebar__img"
                      src="/img/playlist01.png"
                      alt="Плейлист дня"
                      :placeholder="[5]"
                      loading="eager"
                      quality="90"
                      preload
                    />
                </NuxtLink>
              </div>
              <div class="sidebar__item">
                <NuxtLink class="sidebar__link" to="/category/3">
                  <NuxtImg
                    class="sidebar__img"
                    src="/img/playlist02.png"
                    alt="100 танцевальных хитов"
                    :placeholder="[5]"
                    loading="eager"
                    quality="90"
                    preload
                  />
                </NuxtLink>
              </div>
              <div class="sidebar__item">
                <NuxtLink class="sidebar__link" to="/category/4">
                  <NuxtImg
                    class="sidebar__img"
                    src="/img/playlist03.png"
                    alt="Инди-заряд"
                    :placeholder="[5]"
                    loading="eager"
                    quality="90"
                    preload
                  />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PlayerBar />
      <footer class="footer"></footer>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #383838;
}

.container {
  max-width: 1920px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: #181818;
}

.main {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  height: 100vh;
}

.main__centerblock {
  width: auto;
  -webkit-box-flex: 3;
  -ms-flex-positive: 3;
  flex-grow: 3;
  padding: 20px 40px 98px 111px;
  overflow-y: auto;
}

.main__centerblock::-webkit-scrollbar {
  display: none;
}

.main__sidebar {
  max-width: 418px;
  padding: 20px 90px 20px 78px;
}

.sidebar__personal {
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
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 12px 0 15px 0;
}

.sidebar__personal-name {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-right: 16px;
}

.sidebar__icon {
  width: 43px;
  height: 43px;
  background-color: #313131;
  border-radius: 50%;
  cursor: pointer;
}

.sidebar__block {
  height: 100%;
  padding: 240px 0 0 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}

.sidebar__list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.sidebar__item {
  width: 250px;
  height: 150px;
}

.sidebar__item:not(:last-child) {
  margin-bottom: 30px;
}

.sidebar__link {
  width: 100%;
  height: 100%;
}

.sidebar__img {
  width: 100%;
  height: auto;
}

.centerblock__search {
  width: 100%;
  border-bottom: 1px solid #4e4e4e;
  margin-bottom: 51px;
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
}

.search__svg {
  width: 17px;
  height: 17px;
  margin-right: 5px;
  stroke: #ffffff;
  fill: transparent;
}

.search__text {
  -webkit-box-flex: 100;
  -ms-flex-positive: 100;
  flex-grow: 100;
  background-color: transparent;
  border: none;
  padding: 13px 10px 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  outline: none;
}

.search__text::-webkit-input-placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.search__text:-ms-input-placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.search__text::-ms-input-placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}

.search__text::placeholder {
  background-color: transparent;
  color: #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
</style>
