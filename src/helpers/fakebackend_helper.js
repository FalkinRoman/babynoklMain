import { APIClient } from "./api_helper";
import * as url from "./url_helper";

//файл после url_helper файл содержит все функции вызова API.

// Создание экземпляра клиента API
const api = new APIClient();

// Получение данных о вошедшем пользователе из локального хранилища
const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// Проверка, аутентифицирован ли пользователь
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Метод регистрации
const postFakeRegister = (data) => {
  return api.create(url.POST_FAKE_REGISTER, data).catch((err) => {
    let message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Извините, страница, которую вы ищете, не найдена";
          break;
        case 500:
          message =
            "Извините, что-то пошло не так, обратитесь в службу поддержки";
          break;
        case 401:
          message = "Неверные учетные данные";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

// Метод входа
const postFakeLogin = (data) => api.create(url.POST_FAKE_LOGIN, data);

// Метод сброса пароля
const postFakeForgetPwd = (data) =>
  api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Метод изменения профиля
const postJwtProfile = (data) => api.create(url.POST_EDIT_JWT_PROFILE, data);

// Метод создания профиля
const postFakeProfile = (data) => api.create(url.POST_EDIT_PROFILE, data);

// Метод регистрации с использованием JWT
const postJwtRegister = (url, data) => {
  return api.create(url, data).catch((err) => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Извините, страница, которую вы ищете, не найдена";
          break;
        case 500:
          message =
            "Извините, что-то пошло не так, обратитесь в службу поддержки";
          break;
        case 401:
          message = "Неверные учетные данные";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

// Метод входа с использованием JWT
const postJwtLogin = (data) => api.create(url.POST_FAKE_JWT_LOGIN, data);

//Метод удаления токена и закрытии сессии
const deleteJwtLogin = () => api.delete(url.DELETE_FAKE_JWT_LOGIN);

// Метод сброса пароля с использованием JWT
const postJwtForgetPwd = (data) =>
  api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// Метод социального входа
export const postSocialLogin = (data) => api.create(url.SOCIAL_LOGIN, data);

// Получение событий
export const getEvents = () => api.get(url.GET_EVENTS);

// Добавление нового события
export const addNewEvent = (event) => api.create(url.ADD_NEW_EVENT, event);

// Обновление события
export const updateEvent = (event) => api.update(url.UPDATE_EVENT, event);

// Удаление события
export const deleteEvent = (event) =>
  api.delete(url.DELETE_EVENT, { headers: { event } });

// Получение категорий
export const getCategories = () => api.get(url.GET_CATEGORIES);

//моя интеграция(получение постов)
export const getPosts = () => api.get(url.GET_POSTS_URL);

//получение аналитика
export const getAnalytics = () => api.get(url.GET_ANALYTICS_URL);

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
  deleteJwtLogin,
};
