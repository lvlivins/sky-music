import { defineStore } from "pinia";

export const useFiltersStore = defineStore("filters", {
  state: () => ({
    activeFilter: null,
    selectedAuthors: [],
    selectedGenres: [],
    selectedYear: null,
  }),

  actions: {
    toggleFilter(filter) {
      this.activeFilter = this.activeFilter === filter ? null : filter;
    },

    closeFilter() {
      this.activeFilter = null;
    },

    toggleAuthor(author) {
      if (this.selectedAuthors.includes(author)) {
        this.selectedAuthors = this.selectedAuthors.filter((a) => a !== author);
      } else {
        this.selectedAuthors.push(author);
      }
    },

    toggleGenre(genre) {
      if (this.selectedGenres.includes(genre)) {
        this.selectedGenres = this.selectedGenres.filter((g) => g !== genre);
      } else {
        this.selectedGenres.push(genre);
      }
    },

    selectYear(year) {
      this.selectedYear = year;
      this.activeFilter = null;
    },
  },
});
