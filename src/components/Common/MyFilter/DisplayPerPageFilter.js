import React from "react";
import MySearch from "../ui/MySearch";
import DropDown from "../ui/DropDown";

const DisplayPerPageFilter = ({ value, onChange }) => {
  const options = [
    { value: 9, name: "По умолчанию" },
    { value: 12, name: "12" },
    { value: 18, name: "18" },
    { value: 24, name: "24" },
  ];

  return (
    <div className="d-flex align-items-center">
      <DropDown
        name="Количество"
        value={value}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

export default DisplayPerPageFilter;
