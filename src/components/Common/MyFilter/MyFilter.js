import React from "react";
import MySearch from "../ui/MySearch";
import DropDown from "../ui/DropDown";
import DisplayPerPageFilter from "./DisplayPerPageFilter";

const MyFilter = ({ filter, setFilter, options, value, onChange }) => {
  return (
    <div className="mb-4 d-flex align-items-center justify-content-between">
      <MySearch
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
      />
      <div className="d-flex align-items-center">
        <DropDown
          name="Cортировка"
          value={filter.sort}
          onChange={(selectedSort) =>
            setFilter({ ...filter, sort: selectedSort })
          }
          defaultValue="По умолчанию"
          options={options}
        />
        <DisplayPerPageFilter value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default MyFilter;
