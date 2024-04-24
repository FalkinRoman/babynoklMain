import React from "react";
import ReactApexChart from "react-apexcharts";
import { Card, CardBody, Col, Row } from "reactstrap";

const RadialChart1 = ({
  result: chartSeries = {},
  analyticsData: dataCourses = [],
  loyalty: dataLoyalty = null,
}) => {
  //ищем название курса
  const coursesId =
    dataCourses.find((data) => data.id === chartSeries.course_id) || null;

  const coursesName = coursesId ? coursesId.name : "Лояльность";

  //значение курса
  const series = [
    chartSeries.value !== null && chartSeries.value !== undefined
      ? chartSeries.value
      : dataLoyalty,
  ];

  const radialoptions = {
    chart: {
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#0ab39c"],
    stroke: {
      lineCap: "round",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
        },
        track: {
          margin: 0,
        },

        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 5,
            show: true,
          },
        },
      },
    },
  };
  return (
    <React.Fragment>
      <Col xl={4} sm={6}>
        <Card>
          <CardBody>
            <div className="d-flex text-muted">
              <div className="flex-shrink-0 me-3 align-self-center">
                <div id="radialchart-1" className="apex-charts" dir="ltr">
                  <ReactApexChart
                    options={radialoptions}
                    series={series}
                    type="radialBar"
                    height="72"
                    width="72"
                  />
                </div>
              </div>
              {series[0] < 50 ? (
                <div className="flex-grow-1 overflow-hidden">
                  <h5 className="mt-2 mb-2">{coursesName}</h5>
                  <p className="text-truncate mb-0">
                    <span className="text-danger me-2">
                      {" "}
                      <i className="dripicons-arrow-thin-down align-bottom ms-1"></i>
                    </span>{" "}
                    Уровень низкий
                  </p>
                  <p className="mb-1">Увеличьте значение {coursesName}</p>
                </div>
              ) : (
                <div className="flex-grow-1 overflow-hidden">
                  <h5 className="mt-2 mb-2">{coursesName}</h5>
                  <p className="text-truncate mb-0">
                    <span className="text-success me-2">
                      {" "}
                      <i className="dripicons-arrow-thin-up align-bottom ms-1"></i>
                    </span>{" "}
                    Уровень высокий
                  </p>
                  <p className="mb-1">Значение {coursesName} в норме </p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RadialChart1;
