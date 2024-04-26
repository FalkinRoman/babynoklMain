import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, Col, Progress } from "reactstrap";

const Progressbar = ({ group: oneGroup, data: dataCourses }) => {
  const router = useNavigate();
  //получаем url страницы
  const params = useParams();
  const courses = dataCourses.data.courses;

  function coursesName(id) {
    if (id == null || id == undefined) {
      return "-";
    }
    const cource = courses.find((cource) => cource.id === id);
    return cource ? cource.name : "-";
  }

  return (
    <React.Fragment>
      <Col xl={4}>
        <Card>
          <CardBody>
            <CardTitle className="fw-medium  ">{oneGroup.name}</CardTitle>

            <div className="">
              <p className="card-title-desc mb-2 mt-4"> Лояльность </p>
              <ProgressWithColor value={oneGroup.loyalty} />
              {/* <p className="card-title-desc mb-2">Адаптация</p>
              <ProgressWithColor value={oneGroup.courses_result[0].value} />
              <p className="card-title-desc mb-2">Базовый</p>
              <ProgressWithColor value={oneGroup.courses_result[1].value} /> */}
              {oneGroup.courses_result.map((result, index) => (
                <div key={index}>
                  <p className="card-title-desc mb-2">
                    {coursesName(result.course_id)}
                  </p>
                  <ProgressWithColor value={result.value} />
                </div>
              ))}
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <button
                onClick={() =>
                  router(`/analytics/${params.id}/${oneGroup.name}`)
                }
                type="button"
                className="btn btn-outline-secondary waves-effect waves-light mt-3"
              >
                Подробнее
              </button>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

const ProgressWithColor = ({ value }) => {
  // Вычисляем цвет в зависимости от значения value
  const color = value < 50 ? "danger" : "primary";

  return (
    <Progress className="mb-4" color={color} value={value}>
      {value}%
    </Progress>
  );
};

export default Progressbar;
