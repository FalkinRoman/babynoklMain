import React from "react";
import { Link } from "react-router-dom";

//SimpleBar
import SimpleBar from "simplebar-react";

import { Card, CardBody, CardTitle, Col } from "reactstrap";

const MySlideBar = ({ children }) => {
  return (
    <React.Fragment>
      <Col>
        <Card>
          <CardBody>
            {/* <CardTitle>Камеры</CardTitle> */}

            <div style={{ position: "relative", overflow: "hidden" }}>
              <SimpleBar style={{ height: "100vh", overflowX: "hidden" }}>
                <div
                  className="simplebar-content"
                  style={{ paddingRight: "15px", overflowY: "auto" }}
                >
                  {children}
                </div>
                <div
                  className="simplebar-scrollbar"
                  style={{
                    position: "absolute",
                    right: "0",
                    width: "10px",
                    zIndex: "10",
                  }}
                >
                  <div
                    className="simplebar-scrollbar-track"
                    style={{ height: "100%" }}
                  >
                    <div
                      className="simplebar-scrollbar-thumb"
                      style={{ backgroundColor: "#ccc" }}
                    ></div>
                  </div>
                </div>
              </SimpleBar>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};
export default MySlideBar;
