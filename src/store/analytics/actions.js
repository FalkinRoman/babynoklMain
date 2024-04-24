// actions.js
import {
  GET_ANALYTICS,
  GET_ANALYTICS_SUCCESS,
  GET_ANALYTICS_FAIL,
  SET_ANALYTICS_LOADING, // Импортируем новый тип действия
} from "./actionTypes";

export const fetchAnalytics = () => ({
  type: GET_ANALYTICS,
});

export const fetchAnalyticsSuccess = (analyticsData) => ({
  type: GET_ANALYTICS_SUCCESS,
  payload: analyticsData,
});

export const fetchAnalyticsFail = (error) => ({
  type: GET_ANALYTICS_FAIL,
  payload: error,
});

export const setAnalyticsLoading = (loading) => ({
  // Новое действие для установки состояния загрузки
  type: SET_ANALYTICS_LOADING,
  payload: loading,
});
