// AuthProtected.js

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthProtected = ({ children }) => {
  const { isAuth } = useSelector((state) => state.myLogin); // Получаем состояние аутентификации из Redux

  // Если пользователь аутентифицирован, отображаем содержимое компонента,
  // в противном случае перенаправляем на страницу входа
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

export default AuthProtected;
