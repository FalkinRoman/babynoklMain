import React from "react";
import PropTypes from "prop-types";
import withRouter from "../components/Common/withRouter";

const NonAuthLayout = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

NonAuthLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};

export default withRouter(NonAuthLayout);

// // NonIsAuth.js

// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const NonIsAuth = ({ children }) => {
//   // Проверяем аутентификацию пользователя
//   const isAuthenticated = useSelector((state) => state.myLogin.isAuth);

//   // Если пользователь аутентифицирован, перенаправляем его на страницу аналитики
//   if (isAuthenticated) {
//     return <Navigate to="/analytics" replace />;
//   }

//   // Иначе отображаем содержимое компонента
//   return <>{children}</>;
// };

// export default NonIsAuth;
