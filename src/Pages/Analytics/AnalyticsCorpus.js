import React, { useEffect, useState } from "react";
import { Container, Row, Col, Alert } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from "react-router-dom";
import RadialChart1 from "../../components/Common/chartjs/RadialChart1";
import Pagination from "../../components/Common/ui/Pagination";
import Progressbar from "../../components/Common/Progressbar/Progressbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalytics } from "../../store/analytics/actions";
import MyLoderChart from "../../components/Common/Loader/MyLoderChart";
import { useFilter } from "../../Hooks/useFilter";
import MyFilter from "../../components/Common/MyFilter/MyFilter";
import usePagination from "../../Hooks/usePagination";

const Cameras = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const analyticsData = useSelector(
    (state) => state.analyticsReducer.analyticsData
  );
  const loading = useSelector((state) => state.analyticsReducer.loading);
  const error = useSelector((state) => state.analyticsReducer.error);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [filter, setFilter] = useState({ sort: "", query: "" });

  let selectedData;

  if (analyticsData && analyticsData.data && analyticsData.data.locations) {
    selectedData = analyticsData.data.locations.find(
      (data) => data.name === params.id
    );
  }

  const dataGroups = selectedData?.groups || [];
  const sortedAndSearchedCharts = useFilter(
    dataGroups,
    filter.sort,
    filter.query
  );

  useEffect(() => {
    if (analyticsData.length === 0) {
      dispatch(fetchAnalytics());
    }
  }, []);

  const options = [
    { value: "name", name: "По названию" },
    { value: "loyalty", name: "По лояльности" },
  ];

  const { currentPage, totalPages, handlePageChange } = usePagination(
    sortedAndSearchedCharts.length,
    itemsPerPage
  );

  // Brandcrumb
  const links = [
    { path: "/", label: "Главная" },
    { path: "/analytics", label: "Аналитика" },
    { label: params.id },
  ];

  document.title = `Аналитика | ${params.id}`;

  return (
    <React.Fragment>
      <div className="page-content d-flex flex-column mb-4">
        <Container fluid={true}>
          <Breadcrumbs links={links} />
          <Row>
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
                <MyFilter
                  filter={filter}
                  setFilter={setFilter}
                  options={options}
                  value={itemsPerPage}
                  onChange={(value) => setItemsPerPage(value)}
                />
                <Row>
                  {selectedData && (
                    <RadialChart1 loyalty={selectedData.loyalty} />
                  )}
                  {selectedData &&
                    selectedData.courses_result.map((result, index) => (
                      <RadialChart1
                        key={index}
                        result={result}
                        analyticsData={analyticsData.data.courses}
                      />
                    ))}
                </Row>
                {sortedAndSearchedCharts.length === 0 ? (
                  <h3>Ничего не найдено!</h3>
                ) : (
                  <Row className="mt-4">
                    {sortedAndSearchedCharts
                      .slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )
                      .map((group, index) => (
                        <Progressbar
                          key={index}
                          group={group}
                          data={analyticsData}
                        />
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

export default Cameras;
