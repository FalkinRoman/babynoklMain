import {
  MY_LOGIN_USER,
  MY_LOGIN_SUCCESS,
  MY_LOGOUT_USER,
  MY_LOGOUT_USER_SUCCESS,
  MY_API_ERROR,
  CHECK_AUTH,
} from "./actionTypes";

export const myAuth_loginUser = (user, history) => {
  return {
    type: MY_LOGIN_USER,
    payload: { user, history },
  };
};

export const myAuth_loginSuccess = (user = {}) => {
  return {
    type: MY_LOGIN_SUCCESS,
    payload: user || {},
  };
};

export const myAuth_logoutUser = (history) => {
  return {
    type: MY_LOGOUT_USER,
    payload: { history },
  };
};

export const myAuth_logoutUserSuccess = () => {
  return {
    type: MY_LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

export const checkAuthAction = () => ({
  type: CHECK_AUTH,
});

export const myAuth_apiError = (error) => {
  return {
    type: MY_API_ERROR,
    payload: error,
  };
};
