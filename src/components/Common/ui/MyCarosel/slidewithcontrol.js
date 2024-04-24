import React, { useState } from "react";
import { UncontrolledCarousel } from "reactstrap";

import MyLoderChart from "../../Loader/MyLoderChart";

const Slidewithcontrol = ({ image }) => {
  const [loading, setLoading] = useState(true);

  // Функция обработчика события onLoad изображения
  const handleImageLoad = () => {
    // Установить состояние загрузки в false после загрузки изображения
    setLoading(false);
  };

  return (
    <React.Fragment>
      {loading ? (
        // Отображение прелоадера во время загрузки изображения
        <MyLoderChart />
      ) : (
        // Компонент Carousel, который будет отображаться после загрузки изображения
        <UncontrolledCarousel
          interval={false}
          indicators={false}
          items={[
            {
              altText: " ",
              caption: " ",
              key: 1,
              src: image,
            },
          ]}
        />
      )}
      {/* Скрытый изображенный компонент для загрузки изображения с последующим вызовом handleImageLoad */}
      <img
        src={image}
        alt=""
        onLoad={handleImageLoad}
        style={{ display: "none" }}
      />
    </React.Fragment>
  );
};

export default Slidewithcontrol;
