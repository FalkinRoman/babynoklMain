import {
  MY_LOGIN_USER,
  MY_LOGIN_SUCCESS,
  MY_LOGOUT_USER,
  MY_LOGOUT_USER_SUCCESS,
  MY_API_ERROR,
} from "./actionTypes";

const initialState = {
  isAuth: false,
  error: "",
  loading: false,
};

const myLogin = (state = initialState, action) => {
  switch (action.type) {
    case MY_LOGIN_USER:
      state = {
        ...state,
        loading: true,
      };
      break;
    case MY_LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: "",
        isAuth: true,
      };
      break;
    case MY_LOGOUT_USER:
      state = { ...state, loading: true };
      break;
    case MY_LOGOUT_USER_SUCCESS:
      state = { ...state, isAuth: false, loading: false };
      break;
    case MY_API_ERROR:
      state = {
        ...state,
        error: action.payload,
        loading: false,
        isAuth: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default myLogin;
