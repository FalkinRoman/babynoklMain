// saga.js
import { takeEvery, put, call } from "redux-saga/effects";
import {
  GET_ANALYTICS,
  SET_ANALYTICS_LOADING, // Импортируем новый тип действия
} from "./actionTypes";
import {
  fetchAnalyticsSuccess,
  fetchAnalyticsFail,
  setAnalyticsLoading,
} from "./actions";
import { getAnalytics } from "../../helpers/fakebackend_helper";

function* fetchAnalyticsSaga() {
  try {
    yield put(setAnalyticsLoading(true)); // Устанавливаем loading в true перед запросом данных
    const response = yield call(getAnalytics); // Вызываем функцию для получения данных аналитики
    yield put(fetchAnalyticsSuccess(response)); // Отправляем успешный результат в хранилище
    yield put(setAnalyticsLoading(false)); // Устанавливаем loading в false после получения данных
  } catch (error) {
    console.log(error);
    yield put(fetchAnalyticsFail(error)); // Отправляем ошибку в хранилище в случае неудачи
    yield put(setAnalyticsLoading(false)); // Устанавливаем loading в false в случае ошибки
  }
}

function* watchFetchAnalytics() {
  yield takeEvery(GET_ANALYTICS, fetchAnalyticsSaga); // Отслеживаем каждый экшен GET_ANALYTICS и запускаем соответствующую сагу
}

export default watchFetchAnalytics;
