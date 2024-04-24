// index.js

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// Constants
import { layoutTypes } from "../constants/layout";

// Layouts
import NonAuthLayout from "../Layout/NonAuthLayout";
import VerticalLayout from "../Layout/VerticalLayout/index";
import HorizontalLayout from "../Layout/HorizontalLayout/index";

// Components
import AuthProtected from "./AuthProtected"; // Импортируем компонент AuthProtected

// Routes
import { authProtectedRoutes, publicRoutes } from "./routes";
import NonIsAuth from "./NonIsAuth";

const getLayout = (layoutType) => {
  let Layout = VerticalLayout;
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout;
      break;
    case layoutTypes.HORIZONTAL:
      Layout = HorizontalLayout;
      break;
    default:
      break;
  }
  return Layout;
};

const Index = () => {
  const { layoutType } = useSelector((state) => state.Layout); // Получаем тип макета и состояние аутентификации из Redux

  const Layout = getLayout(layoutType); // Получаем соответствующий макет

  return (
    <Routes>
      {/* Публичные маршруты */}
      {publicRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={
            // Проверка на авторизацию и редирект на аналитику
            <NonIsAuth path={route.path}>
              <NonAuthLayout>{route.component}</NonAuthLayout>
            </NonIsAuth>
          }
        />
      ))}

      {/* Защищенные маршруты */}
      {authProtectedRoutes.map((route, idx) => (
        <Route
          key={idx}
          path={route.path}
          element={
            // Если пользователь аутентифицирован, отображаем компонент в защищенном маршруте
            // В противном случае перенаправляем на страницу входа
            <AuthProtected>
              <Layout>{route.component}</Layout>
            </AuthProtected>
          }
        />
      ))}

      {/* Перенаправляем на маршрут аналитики по умолчанию */}
      <Route path="/" element={<Navigate to="/analytics" replace />} />
    </Routes>
  );
};

export default Index;
