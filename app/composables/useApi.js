import axios from "axios";

const API_URL = "https://webdev-music-003b5b991590.herokuapp.com";

// Вход POST
export async function signIn({ login, password }) {
  try {
    const data = await axios.post(
      API_URL + "/user/login/",
      {
        email: login,
        password: password,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Сервер не отвечает");
  }
}

// Регистрация POST
export async function signUp({ login, password }) {
  try {
    const data = await axios.post(
      API_URL + "/user/signup/",
      {
        email: login,
        password: password,
        username: login, // ! такого поля нет в дизайне, но + в документации
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Сервер не отвечает");
  }
}