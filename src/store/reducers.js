import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import forgetPassword from "./auth/forgetpwd/reducer";
import login from "./auth/login/reducer";
import myLogin from "./myAuth/login/reducer";
import profile from "./auth/profile/reducer";
import account from "./auth/register/reducer";
import postsReducer from "./post/reduser"; //моя
import analyticsReducer from "./analytics/reduser";

const rootReducer = combineReducers({
  // public
  Layout,
  forgetPassword,
  login,
  profile,
  account,
  postsReducer, //моя
  analyticsReducer,
  myLogin,
});

export default rootReducer;
