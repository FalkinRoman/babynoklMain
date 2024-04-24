// NonIsAuth.js

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NonIsAuth = ({ children, path }) => {
  // Проверяем аутентификацию пользователя
  const isAuthenticated = useSelector((state) => state.myLogin.isAuth);

  // Если пользователь аутентифицирован и пытается открыть страницу входа,
  // перенаправляем его на страницу аналитики
  if (isAuthenticated && path === "/login") {
    return <Navigate to="/analytics" replace />;
  }

  // Иначе отображаем содержимое компонента
  return <>{children}</>;
};

export default NonIsAuth;
