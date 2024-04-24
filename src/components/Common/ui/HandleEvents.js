import React from "react";
import Rating from "react-rating";

const HandleEvents = ({ data }) => {
  console.log(data);
  return (
    <React.Fragment>
      <Rating
        stop={1}
        emptySymbol="mdi mdi-checkbox-blank-outline text-muted fa-2x"
        fullSymbol={[
          "mdi mdi-checkbox-marked-outline text-primary fa-2x",
          "mdi mdi-checkbox-marked-outline text-primary fa-2x",
          "mdi mdi-checkbox-marked-outline text-primary fa-2x",
          "mdi mdi-checkbox-marked-outline text-primary fa-2x",
        ]}
        hoverMode={false}
        initialRating={data} //сюда отдаем ходим видеть или нет
        readonly={true}
      />
    </React.Fragment>
  );
};

export default HandleEvents;
