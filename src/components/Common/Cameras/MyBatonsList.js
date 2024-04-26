import React, { useState } from "react";
import classnames from "classnames";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

const MyBatonsList = () => {
  const [activeTab2, setactiveTab2] = useState("5");
  const toggle2 = (tab) => {
    if (activeTab2 !== tab) {
      setactiveTab2(tab);
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle style={{ fontWeight: 500 }} className="h3 mb-3">
                События
              </CardTitle>
              <Nav pills className="navtab-bg ">
                <NavItem
                  style={{
                    background: "#F8F9FA",
                    borderRadius: 7,
                    marginRight: 20,
                  }}
                >
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab2 === "5",
                    })}
                    onClick={() => {
                      toggle2("5");
                    }}
                  >
                    <i className=" me-1 align-middle"> </i> Прогулка
                  </NavLink>
                </NavItem>
                <NavItem
                  style={{
                    background: "#F8F9FA",
                    borderRadius: 7,
                    marginRight: 20,
                  }}
                >
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab2 === "6",
                    })}
                    onClick={() => {
                      toggle2("6");
                    }}
                  >
                    <i className=" me-1 align-middle"></i> Обед
                  </NavLink>
                </NavItem>
                <NavItem
                  style={{
                    background: "#F8F9FA",
                    borderRadius: 7,
                    marginRight: 20,
                  }}
                >
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab2 === "7",
                    })}
                    onClick={() => {
                      toggle2("7");
                    }}
                  >
                    <i className=" me-1 align-middle"></i> Тихий час
                  </NavLink>
                </NavItem>
                <NavItem
                  style={{
                    background: "#F8F9FA",
                    borderRadius: 7,
                    marginRight: 20,
                  }}
                >
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab2 === "8",
                    })}
                    onClick={() => {
                      toggle2("8");
                    }}
                  >
                    <i className="me-1 align-middle"></i> Полдник
                  </NavLink>
                </NavItem>
                <NavItem
                  style={{
                    background: "#F8F9FA",
                    borderRadius: 7,
                    marginRight: 20,
                  }}
                >
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: activeTab2 === "9",
                    })}
                    onClick={() => {
                      toggle2("9");
                    }}
                  >
                    <i className="me-1 align-middle"></i> Прогулка
                  </NavLink>
                </NavItem>
              </Nav>

              {/* <TabContent activeTab={activeTab2} className="p-3 text-muted">
                <TabPane tabId="5">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        Etsy mixtape wayfarers, ethical wes anderson tofu before
                        they sold out mcsweeney's organic lomo retro fanny pack
                        lo-fi farm-to-table readymade. Messenger bag gentrify
                        pitchfork tattooed craft beer, iphone skateboard
                        locavore carles etsy salvia banksy hoodie helvetica. DIY
                        synth PBR banksy irony. Leggings gentrify squid 8-bit
                        cred pitchfork. Williamsburg banh mi whatever gluten
                        carles.
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="6">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        Raw denim you probably haven't heard of them jean shorts
                        Austin. Nesciunt tofu stumptown aliqua, retro synth
                        master cleanse. Mustache cliche tempor, williamsburg
                        carles vegan helvetica. Reprehenderit butcher retro
                        synth. Cosby sweater eu banh mi, qui irure terry
                        richardson ex squid. Aliquip placeat salvia cillum
                        iphone. Seitan aliquip quis cardigan american apparel,
                        butcher voluptate nisi qui.
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="7">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        Food truck fixie locavore, accusamus mcsweeney's marfa
                        nulla single-origin coffee squid. Exercitation +1 labore
                        velit, blog sartorial PBR leggings next level wes
                        anderson artisan four loko farm-to-table craft beer
                        twee. Qui photo booth letterpress, commodo enim craft
                        beer mlkshk aliquip jean shorts ullamco ad vinyl cillum
                        PBR. Homo nostrud organic, assumenda labore aesthetic
                        magna delectus mollit.
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tabId="8">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        Trust fund seitan letterpress, keytar raw denim keffiyeh
                        etsy art party before they sold out master cleanse
                        gluten-free squid scenester freegan cosby sweater. Fanny
                        pack portland seitan DIY, art party locavore wolf cliche
                        high life echo park Austin. Cred vinyl keffiyeh DIY
                        salvia PBR, banh mi before they sold out farm-to-table
                        VHS viral locavore cosby sweater. Lomo wolf viral,
                        mustache.
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent> */}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MyBatonsList;
