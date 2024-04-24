import React from "react";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import { Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

const MyLoderChart2 = () => {
  return {
    series: ["-", "-", "-"],
    options: {
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },

            total: {
              show: true,
              label: ["Лояльность"],
            },
          },
        },
      },
      labels: ["Лояльность", "Базовый", "Адаптация"],
      colors: ["#556ee6", "#34c38f", "#f46a6a", "#f1b44c"],
    },
  };
};

const RadialChart = ({ dataChart }) => {
  const chartData = MyLoderChart2({ data: dataChart });

  return (
    <React.Fragment>
      <Col lg={12}>
        <Card>
          <CardBody>
            <CardTitle className="mb-4">
              <p className="card-text placeholder-glow">
                <span className="placeholder col-4"></span>
              </p>
            </CardTitle>
            <ReactApexChart
              options={chartData.options}
              series={chartData.series}
              type="radialBar"
              height="370"
              className="apex-charts"
            />
            <div className="tablee-responsiv">
              <Col lg={12}>
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th className="text-center">Лояльность</th>
                      <th className="text-center">Базовый</th>
                      <th className="text-center">Адаптация</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-4"></span>
                        </p>
                      </td>
                      <td className="text-center">
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-5"></span>
                        </p>
                      </td>
                      <td className="text-center">
                        <p className="card-text placeholder-glow">
                          <span className="placeholder col-4"></span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <Link
                to="#"
                tabIndex="-1"
                className="btn btn-secondary disabled placeholder col-2 mt-3"
              ></Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default RadialChart;
