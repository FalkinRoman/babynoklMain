import axios from "axios";
import config from "../config";

// Файл src/helpers/api_helper.js настраивает axios для выполнения HTTP-запросов к серверу,
// включая методы get, put, post, delete и другие, а также интерсепторы и методы установки токена.

// По умолчанию
// axios.defaults.baseURL = config.API_URL;
axios.defaults.baseURL = "https://dev.bbnkl.ru/api.n";

// Тип контента
axios.defaults.headers.post["Content-Type"] = "application/json";

// Устанавливает значения по умолчанию для заголовков запросов
axios.defaults.headers.common = {
  ...axios.defaults.headers.common,
  AppVersion: "7.4.0",
  AppClient: "ANDROID",
};

//функция которая автоматически отправляется с запросом
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

// Перехват для обработки ошибок
axios.interceptors.response.use(
  function (response) {
    // Любые коды статуса, не попадающие в диапазон 2xx, вызывают эту функцию
    return response.data ? response.data : response;
  },
  function (error) {
    let message;
    switch (error.status) {
      case 500:
        message = "Внутренняя ошибка сервера";
        break;
      case 401:
        message = "Недопустимые учетные данные";
        break;
      case 404:
        message = "Извините! запрошенные данные не найдены";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);

//функция которая выполняется с ответом от сервера
axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error === "Request failed with status code 401") {
      localStorage.removeItem("token");
    }
  }
);

// Класс API-клиента
class APIClient {
  /**
   * Получает данные по указанному URL
   */
  get = (url, params) => {
    return axios.get(url, params);
  };

  /**
   * Отправляет данные по указанному URL
   */
  create = (url, data) => {
    return axios.post(url, data);
  };

  /**
   * Обновляет данные
   */
  update = (url, data) => {
    return axios.put(url, data);
  };

  /**
   * Удаляет данные
   */
  delete = (url, config) => {
    return axios.delete(url, { ...config });
  };
}

/**
 * Получает данные о вошедшем пользователе
 */
const getLoggedinUser = () => {
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export {
  APIClient,
  //  setAuthorization,
  getLoggedinUser,
};

//// /**
//  * Устанавливает авторизацию по умолчанию
//  * @param {*} token
//  */
// const setAuthorization = (token) => {
//   axios.defaults.headers.common["Authorization"] = "Bearer " + token;
// };

/**
 * Устанавливает авторизацию по умолчанию
//  */
// const setAuthorization = () => {
//   const token = localStorage.getItem("authUser");
//   if (token) {
//     // Убираем кавычки из токена, если он существует
//     const formattedToken = token.slice(1, -1);
//     axios.defaults.headers.common["Authorization"] = "Bearer " + formattedToken;
//   } else {
//     delete axios.defaults.headers.common["Authorization"];
//   }
// };

// // Устанавливаем авторизацию по умолчанию сразу
// setAuthorization();
