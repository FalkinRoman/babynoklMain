import React from "react";

import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//brandcrumb
const links = [{ path: "/", label: "Главная" }, { label: "Инструкции" }];

const Instructions = () => {
  document.title = "Бебинокль | Инструкции";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs links={links} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Instructions;
