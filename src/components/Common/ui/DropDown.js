import React from "react";

const DropDown = ({ name, options, defaultValue, value, onChange }) => {
  return (
    <div className=" d-flex align-items-center justify-content-end">
      <div className="mx-4">
        <h5 className="card-title  my-1">{name}</h5>
      </div>
      <div className="">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="form-select form-select-sm mb-0 my-n1"
        >
          {defaultValue ? (
            <option disabled value="">
              {defaultValue}
            </option>
          ) : (
            ""
          )}

          {options.map((item, key) => (
            <option key={key} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropDown;
