import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { MY_LOGIN_USER, MY_LOGOUT_USER, CHECK_AUTH } from "./actionTypes";
import {
  myAuth_apiError,
  myAuth_loginSuccess,
  myAuth_logoutUserSuccess,
} from "./actions";
import {
  postJwtLogin,
  deleteJwtLogin,
} from "../../../helpers/fakebackend_helper";
import AuthService from "../../../MyHelpers/services/AuthService";
import { useNavigate } from "react-router-dom";

function* myLoginUser({ payload: { user, history } }) {
  try {
    const response = yield call(postJwtLogin, {
      phone: user.phone,
      password: user.password,
    });

    localStorage.setItem("token", response.data.session.token);
    yield put(myAuth_loginSuccess(response)); //если нужно показать инфо о пользователе пеедать сюда
    history("/analytics");
  } catch (error) {
    console.log(error);
    yield put(myAuth_apiError(error));
  }
}

function* myLogoutUser({ payload: { history } }) {
  try {
    const response = yield call(deleteJwtLogin);
    localStorage.removeItem("token");
    yield put(myAuth_logoutUserSuccess());
    history("/login");
  } catch (error) {
    yield put(myAuth_apiError(error));
  }
}

function* checkAuth() {
  try {
    //если нужен будет рефреш токен разкоментировать
    // const response = axios.get(`${API_URL}/refresh`, { withCredentials: true});
    // localStorage.setItem("token", response.data.session.token);
    yield put(myAuth_loginSuccess());
  } catch (error) {
    yield put(myAuth_apiError(error));
  }
}

function* myAuthSaga() {
  yield takeEvery(MY_LOGIN_USER, myLoginUser);
  yield takeEvery(MY_LOGOUT_USER, myLogoutUser);
  yield takeEvery(CHECK_AUTH, checkAuth);
}

export default myAuthSaga;
