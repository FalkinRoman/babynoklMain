import React, { useEffect, useState } from "react";

import { Accordion, Container, Row, Col, Alert } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams } from "react-router-dom";
import DropDown from "../../components/Common/ui/DropDown";
import Pagination from "../../components/Common/ui/Pagination";
import MyAccordion from "../../components/Common/Accordion/MyAccordion";
import { useDispatch, useSelector } from "react-redux";
import MyLoderChart from "../../components/Common/Loader/MyLoderChart";
import { fetchAnalytics } from "../../store/analytics/actions";
import MyFilter from "../../components/Common/MyFilter/MyFilter";
import { useFilter } from "../../Hooks/useFilter";
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

  //brandcrumb
  const links = [
    { path: "/", label: "Главная" },
    { path: "/analytics", label: "Аналитика" },
    { path: `/analytics/${params.id}`, label: params.id },
    { label: params.class },
  ];

  //Данные передаваемые в аккордион

  const accordionData = [...(sortedAndSearchedCharts || [])];

  // Перемещаем элемент с полем name равным params.class на первую позицию массива
  const firstItemIndex = accordionData.findIndex(
    (item) => item.name === params.class
  );
  if (firstItemIndex !== -1) {
    const firstItem = accordionData.splice(firstItemIndex, 1)[0];
    accordionData.unshift(firstItem);
  }

  //пагинация
  const { currentPage, totalPages, handlePageChange } = usePagination(
    accordionData.length,
    itemsPerPage
  );

  document.title = `Аналитика | ${params.id} | ${params.class} `;
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

                {accordionData.length === 0 ? (
                  <h3>Ничего не найдено!</h3>
                ) : (
                  <MyAccordion
                    data={accordionData}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                  />
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
