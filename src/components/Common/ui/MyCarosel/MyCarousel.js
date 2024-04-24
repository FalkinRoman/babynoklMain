import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

import Slidewithcontrol from "./slidewithcontrol";

const MyCarousel = () => {
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold">Название</CardTitle>
          <CardSubtitle className="mb-3">Первое описание</CardSubtitle>

          <CardSubtitle className="mt-3">
            Второе описание что в этом курсе бла бла бла бла бла бла бла бла бла
            бла бла бла
          </CardSubtitle>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default MyCarousel;
