import React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

const MySearch = (props) => {
  // сотсояния темы
  const themeMode = createSelector(
    (state) => state.Layout,
    (state) => ({
      layoutModeTypes: state.layoutModeTypes,
    })
  );

  // Получение состояния
  const { layoutModeTypes } = useSelector(themeMode);

  return (
    <form className="app-search p-0">
      <div className="position-relative">
        <input
          {...props}
          style={{
            background: layoutModeTypes == "dark" ? "#2d3448" : "white",
          }}
          type="text"
          className="form-control form-control-search"
          placeholder="Поиск..."
        />
        <span className="ri-search-line"></span>
      </div>
    </form>
  );
};

export default MySearch;
