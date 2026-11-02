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


// Получить токен POST
export async function getToken({ login, password }) {
  try {
    const data = await axios.post(
      API_URL + '/user/token/',
      {
        email: login,
        password: password,
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    return data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Сервер не отвечает');
  }
}

// Обновить токен POST
export async function updateToken(refresh) {
  try {
    const data = await axios.post(
      API_URL + '/user/token/refresh/',
      {
        refresh: refresh,
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    return data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Сервер не отвечает');
  }
}

// Избранное + токен доступа
export async function getFavorites(access) {
  try {
    const data = await axios.get(API_URL + '/catalog/track/favorite/all/', {
      headers: {
        Authorization: 'Bearer ' + access,
      },
    });
    return data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Сервер не отвечает');
  }
}

// Добавить трек в избранное POST
export async function addFavorite(id, access) {
  try {
    const data = await axios.post(
      API_URL + '/catalog/track/' + id + '/favorite/',
      {},
      {
        headers: {
          Authorization: 'Bearer ' + access,
        },
      },
    );
    return data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Сервер не отвечает');
  }
}

// Удалить трек из избранного DELETE
export async function removeFavorite(id, access) {
  try {
    const data = await axios.delete(
      API_URL + '/catalog/track/' + id + '/favorite/',
      {
        headers: {
          Authorization: 'Bearer ' + access,
        },
      },
    );
    return data.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Сервер не отвечает');
  }
}