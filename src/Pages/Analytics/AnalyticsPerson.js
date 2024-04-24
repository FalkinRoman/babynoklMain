import React, { useEffect, useState } from "react";

import { Accordion, Container, Row, Col, Alert } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from "react-router-dom";

import PersonTable from "../../components/Common/table/personTable";
import MyLoderChart from "../../components/Common/Loader/MyLoderChart";
import MyCarousel from "../../components/Common/ui/MyCarosel/MyCarousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalytics } from "../../store/analytics/actions";
import MyPopup from "../../components/Common/ui/MyPopup";

const Cameras = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const analyticsData = useSelector(
    (state) => state.analyticsReducer.analyticsData
  );
  const loading = useSelector((state) => state.analyticsReducer.loading);
  const error = useSelector((state) => state.analyticsReducer.error);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [topic, setTopic] = useState({}); //храним курс его значения для попапа

  //выбранный корпус ищем и отрисосовываем через params
  let selectedLocation;
  let selectGroup;
  let selectuser;

  if (analyticsData && analyticsData.data && analyticsData.data.locations) {
    selectedLocation = analyticsData.data.locations.find(
      (data) => data.name === params.id
    );
    selectGroup = selectedLocation.groups.find(
      (group) => group.name === params.class
    );
    selectuser = selectGroup.users.find((user) => user.name === params.person);
  }

  useEffect(() => {
    if (analyticsData.length === 0) {
      dispatch(fetchAnalytics());
    }
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Функция обратного вызова для получения topicId из PersonTable
  const handlePopupToggle = (courseId, topicId) => {
    togglePopup();
    const cours = analyticsData.data.courses.find(
      (course) => course.id === courseId
    );
    const topic = cours.topics.find((topic) => topic.id === topicId);
    setTopic(topic);
  };

  //brandcrumb
  const links = [
    { path: "/", label: "Главная" },
    { path: "/analytics", label: "Аналитика" },
    { path: `/analytics/${params.id}`, label: params.id },
    { path: `/analytics/${params.id}/${params.class}`, label: params.class },
    { label: params.person },
  ];

  document.title = `Аналитика | ${params.id} | ${params.class} | ${params.person}  `;
  return (
    <React.Fragment>
      <div className="page-content d-flex flex-column mb-4">
        <Container fluid={true}>
          <Breadcrumbs links={links} />
          <Row className="mt-2">
            {loading ? (
              [...Array(6)].map((_, index) => (
                <Col key={index} xl={4} lg={6} md={6}>
                  <MyLoderChart />
                </Col>
              ))
            ) : error ? (
              <Col>
                <Alert color="danger">Ошибка загрузки данных аналитики</Alert>
              </Col>
            ) : (
              <div
                className="flex-grow-1 d-flex flex-column"
                style={{ minHeight: "85vh" }}
              >
                {/* <MyFilter
                  filter={filter}
                  setFilter={setFilter}
                  options={options}
                  value={itemsPerPage}
                  onChange={(value) => setItemsPerPage(value)}
                /> */}
                <Col lg={12}>
                  {analyticsData &&
                    analyticsData.data &&
                    analyticsData.data.courses &&
                    analyticsData.data.courses.map((course, index) => (
                      <div key={index}>
                        <PersonTable
                          buttonClick={handlePopupToggle}
                          name={course.name}
                          selectuser={selectuser}
                          analyticsData={analyticsData}
                        />
                        <div className="mb-4"></div>
                      </div>
                    ))}
                </Col>
              </div>
            )}
            <MyPopup isOpen={isPopupOpen} toggle={togglePopup} topic={topic} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Cameras;
