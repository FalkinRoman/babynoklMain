import React from "react";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import { Col, Card, CardBody, CardTitle } from "reactstrap";
import ChartTable from "../table/chartTable";
import { useNavigate } from "react-router-dom";

const RadialChartData = ({ data, analyticsData }) => {
  //развернули массив для отображения
  const dataCourses = data.courses_result;

  const adaptation = analyticsData.data.courses.find(
    (cours) => cours.name == "Адаптация"
  );

  const basic = analyticsData.data.courses.find(
    (cours) => cours.name == "Базовый курс"
  );

  //поиск результата курса по id
  function findResultCours(id) {
    // Check if resultBasic is found before accessing its value property
    const resultBasic = dataCourses.find((result) => result.course_id === id);
    return resultBasic ? resultBasic.value : 0; // Return 0 if resultBasic is undefined
  }

  return {
    series: [
      data.loyalty,
      findResultCours(basic.id),
      findResultCours(adaptation.id),
    ],
    options: {
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "18px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Лояльность",
              formatter: function (w) {
                return data.loyalty + "%";
              },
            },
          },
        },
      },
      labels: ["Лояльность", "Базовый", "Адаптация"],

      colors: ["#34c38f", "#556ee6", "#f46a6a"],
    },
  };
};

const RadialChart = ({ dataChart, analyticsData }) => {
  // Используем функцию RadialChartData для получения объекта с данными
  const chartData = RadialChartData({ data: dataChart, analyticsData });

  const router = useNavigate(); // Хук для перехода

  const handleCardClick = () => {
    router(`/analytics/${dataChart.name}`);
  };

  return (
    <Col onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <Card>
        <CardBody>
          <CardTitle className="mb-2">{dataChart.name}</CardTitle>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="radialBar"
            height="250"
            className="apex-charts"
          />
          <ChartTable
            analyticsData={analyticsData}
            loyalty={dataChart.loyalty}
            courses_result={dataChart.courses_result}
          />
        </CardBody>
      </Card>
    </Col>
  );
};

RadialChart.propTypes = {
  dataChart: PropTypes.shape({
    series: PropTypes.array, // Определяем проп без isRequired
  }).isRequired,
};

export default RadialChart;
