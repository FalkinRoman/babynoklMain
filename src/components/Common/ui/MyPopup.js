// MyPopup.js
import React from "react";
import { Modal, ModalHeader, ModalBody, Col, CardSubtitle } from "reactstrap";
import MyCarousel from "./MyCarosel/MyCarousel";
import Slidewithcontrol from "./MyCarosel/slidewithcontrol";

const MyPopup = ({ isOpen, toggle, topic }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered>
      <ModalHeader toggle={toggle}>{topic.name}</ModalHeader>
      <ModalBody>
        <CardSubtitle className="mb-4">{topic.description}</CardSubtitle>
        <Col lg={12}>
          <Slidewithcontrol image={topic.image} />
        </Col>
      </ModalBody>
    </Modal>
  );
};

export default MyPopup;
