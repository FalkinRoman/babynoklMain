import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";

const Breadcrumbs = ({ links }) => {
  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-0 font-size-18">
              {links[links.length - 1].label}
            </h4>
            <div className="page-title-right">
              <Breadcrumb listClassName="m-0 justify-content-end">
                {links.map((link, index) => (
                  <BreadcrumbItem key={index}>
                    {index === links.length - 1 ? (
                      link.label
                    ) : (
                      <Link to={link.path}>{link.label}</Link>
                    )}
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Breadcrumbs;
