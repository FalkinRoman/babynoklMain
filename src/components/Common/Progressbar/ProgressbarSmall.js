import React from "react";
import { Progress } from "reactstrap";

const ProgressbarSmall = ({ series }) => {
  return (
    <React.Fragment>
      <ProgressWithColor value={series} />
    </React.Fragment>
  );
};

const ProgressWithColor = ({ value }) => {
  // Вычисляем цвет в зависимости от значения value
  const color = value < 50 ? "danger" : "primary";

  return (
    <Progress className="mt-2" color={color} value={value}>
      {value}%
    </Progress>
  );
};

export default ProgressbarSmall;
