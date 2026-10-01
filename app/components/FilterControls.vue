<script setup>
const { tracks } = await useTracks("tracks-filters")

const activeFilter = ref(null)

const toggleFilter = (filter) => {
  activeFilter.value = activeFilter.value === filter ? null : filter
}

const authorItems = computed(() => {
  if (!tracks.value) return []
  const items = new Set()
  tracks.value.forEach((track) => {
    if (track.author) {
      items.add(track.author)
    }
  })
  return Array.from(items).sort((a, b) => {
    if (a === "Неизвестно") return 1
    if (b === "Неизвестно") return -1
    return a.localeCompare(b)
  })
})

const yearItems = computed(() => {
  if (!tracks.value) return []
  const items = new Set()
  tracks.value.forEach((track) => {
    const year = track.release_date?.split("-")[0] || "Неизвестно"
    items.add(year)
  })
  return Array.from(items).sort((a, b) => {
    if (a === "Неизвестно") return 1
    if (b === "Неизвестно") return -1
    return b.localeCompare(a)
  })
})

const genreItems = computed(() => {
  if (!tracks.value) return []
  const items = new Set()
  tracks.value.forEach((track) => {
    if (Array.isArray(track.genre)) {
      track.genre.forEach((g) => g && items.add(g.toLowerCase().trim()))
    } else if (track.genre) {
      items.add(track.genre.toLowerCase().trim())
    }
  })
  return Array.from(items).sort((a, b) => {
    if (a === "неизвестно") return 1
    if (b === "неизвестно") return -1
    return a.localeCompare(b)
  })
})

</script>

<template>
  <div class="centerblock__filter filter">
    <div class="filter__title">Искать по:</div>
    <div class="filter__wrapper">
      <div class="filter__button button-author _btn-text"
           :class="{ active: activeFilter === 'author' }"
           @click="toggleFilter('author')">исполнителю</div>
      <div v-show="activeFilter === 'author'" class="filter__dropdown">
        <ul class="filter__list">
          <li
            v-for="item in authorItems"
            :key="item"
            class="filter__item"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div class="filter__wrapper">
      <div class="filter__button button-year _btn-text"
           :class="{ active: activeFilter === 'year' }"
           @click="toggleFilter('year')">году выпуска</div>
      <div v-show="activeFilter === 'year'" class="filter__dropdown">
        <ul class="filter__list">
          <li
            v-for="item in yearItems"
            :key="item"
            class="filter__item"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div class="filter__wrapper">
      <div class="filter__button button-genre _btn-text"
           :class="{ active: activeFilter === 'genre' }"
           @click="toggleFilter('genre')">жанру</div>
      <div v-show="activeFilter === 'genre'" class="filter__dropdown">
        <ul class="filter__list">
          <li
            v-for="item in genreItems"
            :key="item"
            class="filter__item"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.centerblock__filter {
  position: relative;
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
  margin-bottom: 51px;
}

.filter__wrapper {
  position: relative;
}

.filter__wrapper:not(:last-child) {
  margin-right: 10px;
}
.filter__dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 2;
  width: 248px;
  height: 305px;
  border-radius: 12px;
  background-color: #313131;
  color: #ffffff;
  padding: 16px;
  overflow-y: auto;
}

.filter__item {
  padding: 6px 0;
  cursor: pointer;
}

.filter__title {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-right: 15px;
}

.filter__button {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid #ffffff;
  border-radius: 60px;
  padding: 6px 20px;
}
</style>
