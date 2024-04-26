// reducer.js
import {
  GET_ANALYTICS_SUCCESS,
  GET_ANALYTICS_FAIL,
  SET_ANALYTICS_LOADING,
  LOGOUT_USER,
} from "./actionTypes";

const INIT_STATE = {
  analyticsData: [],
  error: null,
  loading: false, // Добавляем новое состояние loading
};

const analyticsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ANALYTICS_SUCCESS:
      return {
        ...state,
        analyticsData: action.payload,
        error: null,
        loading: false, // Устанавливаем loading в false после успешного получения данных
      };
    case GET_ANALYTICS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false, // Устанавливаем loading в false в случае ошибки
      };
    case SET_ANALYTICS_LOADING: // Обрабатываем новый тип действия для установки состояния загрузки
      return {
        ...state,
        loading: action.payload,
      };
    case LOGOUT_USER: // Обрабатываем действие выхода пользователя
      return INIT_STATE;
    default:
      return state;
  }
};

export default analyticsReducer;
