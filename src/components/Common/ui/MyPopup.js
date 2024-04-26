import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  CardSubtitle,
  Button,
  UncontrolledCarousel,
} from "reactstrap";
import MyLoaderChart from "../Loader/MyLoderChart";

const MyPopup = ({ isOpen, toggle, topic }) => {
  const [loading, setLoading] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      // Сбросить индекс слайда при закрытии модального окна
      setCurrentSlideIndex(0);
    }
  }, [isOpen]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === (topic.slides ? topic.slides.length - 1 : 0)
        ? 0
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prevIndex) =>
      prevIndex === 0
        ? topic.slides
          ? topic.slides.length - 1
          : 0
        : prevIndex - 1
    );
  };

  const currentSlide = topic.slides ? topic.slides[currentSlideIndex] : null;

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>
        {currentSlide && currentSlide.name}
      </ModalHeader>
      <ModalBody>
        <CardSubtitle className="mb-4">
          {currentSlide && currentSlide.description}
        </CardSubtitle>
        <Col lg={12}>
          <React.Fragment>
            {topic.slides && topic.slides.length === 0 ? (
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
                  items={topic.slides.map((slide) => ({
                    src: slide.image,
                    altText: slide.altText || "",
                    caption: slide.caption || "",
                    key: slide.id,
                  }))}
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
              <button
                className="btn btn-secondary waves-effect"
                onClick={prevSlide}
                disabled={currentSlideIndex === 0 || loading}
              >
                Назад
              </button>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 16,
                }}
              >
                {topic.slides && topic.slides.length > 0
                  ? currentSlideIndex + 1
                  : 0}{" "}
                <span style={{ color: "#C0C0C0" }}>
                  /{topic.slides ? topic.slides.length : 0}{" "}
                </span>
              </div>
              <button
                className="btn btn-primary waves-effect waves-light"
                onClick={nextSlide}
                disabled={
                  !topic.slides ||
                  currentSlideIndex ===
                    (topic.slides ? topic.slides.length - 1 : 0) ||
                  loading
                }
              >
                Далее
              </button>
            </div>

            {topic.slides &&
              topic.slides.map((slide) => (
                <img
                  key={slide.id}
                  src={slide.image}
                  alt={slide.altText}
                  onLoad={handleImageLoad}
                  style={{ display: "none" }}
                />
              ))}
          </React.Fragment>
        </Col>
      </ModalBody>
    </Modal>
  );
};

export default MyPopup;
