import React, { useEffect, useState } from "react";
import Routes from "./Routes/index";

// Import Scss
import "./assets/scss/theme.scss";
import { useSelector, useDispatch } from "react-redux";
import { checkAuthAction } from "../src/store/myAuth/login/actions";
import { createSelector } from "reselect";

function App() {
  const dispatch = useDispatch();
  const [isTokenChecked, setIsTokenChecked] = useState(false); // Хранит информацию о проверке токена

  useEffect(() => {
    // Проверяем наличие токена в localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Если токен найден, вызываем checkAuthAction() и устанавливаем isTokenChecked в true
      dispatch(checkAuthAction());
      setIsTokenChecked(true);
    } else {
      // Если токен не найден, просто устанавливаем isTokenChecked в true
      setIsTokenChecked(true);
    }
  }, []); // При изменении dispatch, т.е. при монтировании компонента

  // Пока не проверен токен, отображаем загрузочный экран или что-то другое
  if (!isTokenChecked) {
    return <div>Загрузка...</div>;
  }

  return (
    <React.Fragment>
      <Routes />
    </React.Fragment>
  );
}

export default App;
