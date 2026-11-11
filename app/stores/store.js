import { defineStore } from "pinia";

export const userData = defineStore("user", {
  state: () => ({
    username: "",
    accessToken: "",
    refreshToken: "",
  }),

  actions: {
    // сохранение данных входа
    saveUserData(user, tokens) {
      this.username = user.username;
      this.accessToken = tokens.access;
      this.refreshToken = tokens.refresh;

      localStorage.setItem("username", this.username);
      localStorage.setItem("accessToken", this.accessToken);
      localStorage.setItem("refreshToken", this.refreshToken);
    },

    // удаление данных при выходе
    clearUserData() {
      this.username = "";
      this.accessToken = "";
      this.refreshToken = "";

      localStorage.removeItem("username");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },

    // перезагрузка + сохр данных
    getUserData() {
      this.username = localStorage.getItem("username") || "";
      this.accessToken = localStorage.getItem("accessToken") || "";
      this.refreshToken = localStorage.getItem("refreshToken") || "";
    },
  },
});