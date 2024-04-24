import React from "react";
import { Navigate } from "react-router-dom";

//Pages
import Analytics from "../Pages/Analytics";
import AnalyticsCorpus from "../Pages/Analytics/AnalyticsCorpus";
import AnalyticsClass from "../Pages/Analytics/AnalyticsClass";
import AnalyticsPerson from "../Pages/Analytics/AnalyticsPerson";
import CamerasId from "../Pages/Сameras";
import TeachingMaterials from "../Pages/TeachingMaterials";
import Instructions from "../Pages/Instructions";
import Error404 from "../Pages/Error404";

// Import страниц актификации
import Login from "../Pages/Authentication/Login";
import ForgetPasswordPage from "../Pages/Authentication/ForgetPassword";
import Logout from "../Pages/Authentication/Logout";
import Register from "../Pages/Authentication/Register";
import UserProfile from "../Pages/Authentication/user-profile";
import LoginMobile from "../Pages/Authentication/LoginMobile";
import NonIsAuth from "./NonIsAuth";
import CamerasClass from "../Pages/Сameras/CamerasClass";

//Роуты с аунтификацией
const authProtectedRoutes = [
  //pages
  { path: "/analytics", component: <Analytics /> },

  { path: "/cameras/:id", component: <CamerasId /> },
  { path: "/cameras/:id/:class", component: <CamerasClass /> },
  { path: "/teaching-materials", component: <TeachingMaterials /> },
  { path: "/instructions", component: <Instructions /> },
  { path: "/analytics/:id", component: <AnalyticsCorpus /> },
  { path: "/analytics/:id/:class", component: <AnalyticsClass /> },
  { path: "/analytics/:id/:class/:person", component: <AnalyticsPerson /> },

  // Profile
  { path: "/userprofile", component: <UserProfile /> },

  // этот маршрут должен находиться в конце всех остальных маршрутов
  // Этот маршрут перенаправляет на /dashboard при вводе базового URL (пустой путь)
  {
    path: "/",
    exact: true,
    component: <Navigate to="/analytics" />,
  },
];

const publicRoutes = [
  // Страницы актификации (здесь можно создавать пустые страницы без сайдбаров примеры ниже) - публичные
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  // { path: "/loginMobile", component: <LoginMobile /> },
  // { path: "/forgot-password", component: <ForgetPasswordPage /> },
  // { path: "/register", component: <Register /> },
  { path: "/error404", component: <Error404 /> },

  // Перенаправление на /analytics для всех неизвестных маршрутов
  {
    path: "*",
    component: <Navigate to="/error404" />,
  },
];

export { authProtectedRoutes, publicRoutes };
