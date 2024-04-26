import React, { useEffect, useState } from "react";
import { Container, Col, Row, Alert } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import RadialChart from "../../components/Common/chartjs/RadialChart";
import MyFilter from "../../components/Common/MyFilter/MyFilter";
import Pagination from "../../components/Common/ui/Pagination";

import { useFilter } from "../../Hooks/useFilter";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalytics } from "../../store/analytics/actions";
import MyLoderChart from "../../components/Common/Loader/MyLoderChart";
import usePagination from "../../Hooks/usePagination";
import { useMediaQuery } from "react-responsive";

const links = [{ path: "/", label: "Главная" }, { label: "Аналитика" }];

const Analytics = () => {
  document.title = "Бебинокль | Аналитика";

  const dispatch = useDispatch();
  const analyticsData = useSelector(
    (state) => state.analyticsReducer.analyticsData
  );

  const loading = useSelector((state) => state.analyticsReducer.loading);
  const error = useSelector((state) => state.analyticsReducer.error);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [filter, setFilter] = useState({ sort: "", query: "" });

  const dataLocations = analyticsData?.data?.locations || [];
  const sortedAndSearchedCharts = useFilter(
    dataLocations,
    filter.sort,
    filter.query
  );

  useEffect(() => {
    if (analyticsData.length === 0) {
      dispatch(fetchAnalytics());
    }
  }, []);

  const { currentPage, totalPages, handlePageChange } = usePagination(
    sortedAndSearchedCharts.length,
    itemsPerPage
  );

  const options = [
    { value: "name", name: "По названию" },
    { value: "loyalty", name: "По лояльности" },
  ];

  // Определяем значение xl в зависимости от размера экрана
  const isLargeScreen = useMediaQuery({ maxWidth: 1440 });
  const xlValue = isLargeScreen ? 4 : 3;

  return (
    <React.Fragment>
      <div className="page-content d-flex flex-column mb-4">
        <Container fluid={true} className="flex-grow-1 d-flex flex-column">
          <Breadcrumbs links={links} />
          <Row>
            {loading ? (
              [...Array(8)].map((_, index) => (
                <Col key={index} xl={xlValue} lg={6} md={6}>
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
                <MyFilter
                  filter={filter}
                  setFilter={setFilter}
                  options={options}
                  value={itemsPerPage}
                  onChange={(value) => setItemsPerPage(value)}
                />

                {sortedAndSearchedCharts.length === 0 ? (
                  <h3>Ничего не найдено!</h3>
                ) : (
                  <Row>
                    {sortedAndSearchedCharts
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((data, index) => (
                        <Col xl={xlValue} lg={6} md={6} key={index}>
                          <RadialChart
                            dataChart={data}
                            analyticsData={analyticsData}
                          />
                        </Col>
                      ))}
                  </Row>
                )}

                <div className="mt-auto">
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            )}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Analytics;
