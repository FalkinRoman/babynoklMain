import axios from "axios";

export const API_URL = "https://dev.bbnkl.ru/api.n"; //базовый url

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  AppVersion: "7.4.0",
  AppClient: "ANDROID",
});

//функция которая автоматически отправляется с запросом
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default $api;
