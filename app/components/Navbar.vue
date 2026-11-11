<script setup>
import { userData } from '~/stores/store';

const userStore = userData();
const menuOpen = ref(false);

function toggleMenu() {
  if (menuOpen.value === true) {
    menuOpen.value = false;
  } else {
    menuOpen.value = true;
  }
}
</script>

<template>
  <nav
    class="main__nav nav"
    :class="{ open: menuOpen }"
  >
    <NuxtLink to="/" class="nav__logo logo">
      <div class="logo__image">
        <NuxtImg
          src="/img/logo.png" alt="Лого"
          :placeholder="[5]"
          loading="eager"
          quality="90"
          format="webp"
          preload
        />
      </div>
    </NuxtLink>
    <div
      class="nav__burger burger"
      @click="toggleMenu"
    >
      <span class="burger__line"></span>
      <span class="burger__line"></span>
      <span class="burger__line"></span>
    </div>
    <div
      class="nav__menu menu"
      :class="{ open: menuOpen }"
    >
      <ul class="menu__list">
        <li class="menu__item">
          <NuxtLink to="/" class="menu__link">Главное</NuxtLink>
        </li>
        <li class="menu__item">
          <NuxtLink to="/favorites" class="menu__link">Мой плейлист</NuxtLink>
        </li>
        <li class="menu__item">
          <NuxtLink
            v-if="userStore.refreshToken"
            to="/sign"
            class="menu__link"
          >Выйти
          </NuxtLink>
          <NuxtLink v-else to="/sign" class="menu__link">Войти</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.main__nav {
  width: 244px;
  background-color: transparent;
  padding: 20px 0 20px 36px;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.main__nav.open {
  background-color: #1C1C1C;
}

.nav__logo {
  width: 113.33px;
  height: 43px;
  padding: 13px 0 13px 0;
  background-color: transparent;
  margin-bottom: 20px;
  cursor: pointer;
  display: block;
}

.nav__burger {
  width: 20px;
  height: 36px;
  padding: 13px 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  cursor: pointer;
}

.nav__menu {
  opacity: 0;
  visibility: hidden;
  transform: translateX(-20px);
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
}

.nav__menu.open {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.logo__image {
  width: 113.33px;
  height: 17px;
  color: #181818;
}

.burger__line {
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: #d3d3d3;
}

.menu__list {
  padding: 18px 0 10px 0;
}

.menu__item {
  padding: 5px 0;
  margin-bottom: 16px;
}

.menu__link {
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
</style>
