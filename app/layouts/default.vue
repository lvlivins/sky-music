<script setup>
const route = useRoute();
const origin = useRequestURL().origin;

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
  <div class="wrapper">
    <div class="container">
      <main class="main">
        <Navbar />
        <div class="main__centerblock centerblock">
          <slot></slot>
        </div>

        <div class="main__sidebar sidebar">
          <div class="sidebar__personal">
            <p class="sidebar__personal-name">Sergey.Ivanov</p>
            <NuxtLink to="/signin">
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
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.main__centerblock {
  width: auto;
  -webkit-box-flex: 3;
  -ms-flex-positive: 3;
  flex-grow: 3;
  padding: 20px 40px 20px 111px;
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
</style>
