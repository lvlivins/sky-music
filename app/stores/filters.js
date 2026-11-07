import { defineStore } from "pinia";

export const useFiltersStore = defineStore("filters", {
  state: () => ({
    activeFilter: null,
    selectedAuthors: [],
    selectedGenres: [],
    selectedYear: null, // По умолчанию
  }),

  actions: {
    closeFilter() { // клик в сторону на закрытие
      this.activeFilter = null;
    },

    toggleFilter(filter) {
      if (this.activeFilter === filter) {
        this.activeFilter = null;
      } else {
        this.activeFilter = filter;
      }
    },

    toggleAuthor(author) {
      if (this.selectedAuthors.includes(author)) {
        this.selectedAuthors = this.selectedAuthors.filter(
          function (e) {
          return e !== author;
        });
      } else {
        this.selectedAuthors.push(author);
      }
    },

    toggleGenre(genre) {
      if (this.selectedGenres.includes(genre)) {
        this.selectedGenres = this.selectedGenres.filter(function (g) {
          return g !== genre;
        });
      } else {
        this.selectedGenres.push(genre);
      }
    },

    selectYear(year) {
      this.selectedYear = year;
    },
  },
});
