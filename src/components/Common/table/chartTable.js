import React from "react";
import { useMediaQuery } from "react-responsive";
import { Col, Row, Card, CardBody, CardTitle } from "reactstrap";

const ChartTable = ({ loyalty, courses_result, analyticsData }) => {
  // Определяем значение xl в зависимости от размера экрана
  const isLargeScreen = useMediaQuery({ minWidth: 1600 });
  const xlValue = isLargeScreen ? 14 : 12;

  const adaptation = analyticsData.data.courses.find(
    (cours) => cours.name == "Адаптация"
  );

  const basic = analyticsData.data.courses.find(
    (cours) => cours.name == "Базовый курс"
  );

  //поиск результата курса по id
  function findResultCours(id) {
    const resultBasic = courses_result.find(
      (result) => result.course_id === id
    );
    return resultBasic.value;
  }

  return (
    <div className="tablee-responsiv ">
      <Col>
        <table className="table mb-0">
          <thead>
            <tr style={{ fontSize: xlValue }}>
              <th style={{ padding: 8 }} className="text-center">
                Лояльность
              </th>
              <th style={{ padding: 8 }} className="text-center">
                Адаптация
              </th>
              <th style={{ padding: 8 }} className="text-center">
                Базовый
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">{loyalty}%</td>
              <td className="text-center">{findResultCours(adaptation.id)}%</td>
              <td className="text-center">{findResultCours(basic.id)}%</td>
            </tr>
          </tbody>
        </table>
      </Col>
    </div>
  );
};

export default ChartTable;
