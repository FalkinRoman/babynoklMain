import React, { useState } from "react";
import { Button, UncontrolledCarousel } from "reactstrap";
import MyLoaderChart from "../../Loader/MyLoderChart";

const Slidewithcontrol = ({ topic }) => {
  const [loading, setLoading] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === topic.slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0 ? topic.slides.length - 1 : prevIndex - 1
    );
  };

  const slides = topic.slides.map((slide) => ({
    src: slide.image,
    altText: slide.altText || "",
    caption: slide.caption || "",
    key: slide.id,
  }));

  return (
    <React.Fragment>
      {topic.slides.length === 0 ? (
        <div
          style={{
            height: "40vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Нет данных!</p>
        </div>
      ) : loading ? (
        <MyLoaderChart />
      ) : (
        <React.Fragment>
          <UncontrolledCarousel
            interval={false}
            indicators={false}
            items={slides}
            activeIndex={currentSlideIndex}
            next={nextSlide}
            previous={prevSlide}
            controls={false}
          />
        </React.Fragment>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Button
          onClick={prevSlide}
          disabled={currentSlideIndex === 0 || loading}
        >
          Назад
        </Button>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 16,
          }}
        >
          {topic.slides.length > 0 ? currentSlideIndex + 1 : 0}{" "}
          <span style={{ color: "#C0C0C0" }}>
            /{topic.slides ? topic.slides.length : 0}{" "}
          </span>
        </div>
        <Button
          onClick={nextSlide}
          disabled={
            !topic.slides ||
            currentSlideIndex ===
              (topic.slides ? topic.slides.length - 1 : 0) ||
            loading
          }
        >
          Далее
        </Button>
      </div>

      {topic.slides.map((slide) => {
        return (
          <img
            key={slide.id}
            src={slide.image}
            alt=""
            onLoad={handleImageLoad}
            style={{ display: "none" }}
          />
        );
      })}
    </React.Fragment>
  );
};

export default Slidewithcontrol;
