import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody } from "reactstrap";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <li
        key={number}
        className={`page-item ${currentPage === number ? "active" : ""}`}
      >
        <Link to="#" className="page-link" onClick={() => onPageChange(number)}>
          {number}
        </Link>
      </li>
    ));
  };

  return (
    <Row>
      <Col lg={12}>
        <Card className="mb-0">
          <CardBody>
            <div className="d-inline-block">
              <ul className="pagination pagination-rounded mb-0">
                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                  <Link
                    to="#"
                    className="page-link"
                    onClick={() => onPageChange(currentPage - 1)}
                  >
                    <i className="mdi mdi-chevron-left"></i>
                  </Link>
                </li>
                {renderPageNumbers()}
                <li
                  className={`page-item ${
                    currentPage === totalPages && "disabled"
                  }`}
                >
                  <Link
                    to="#"
                    className="page-link"
                    onClick={() => onPageChange(currentPage + 1)}
                  >
                    <i className="mdi mdi-chevron-right"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Pagination;
