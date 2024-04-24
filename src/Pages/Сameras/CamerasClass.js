import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

const CamerasClass = () => {
  // Get the parameter from the URL
  const params = useParams();
  // Set the page title using the parameter from the URL
  document.title = `Мои камеры | ${params.id} | ${params.class}`;
  // Formulate the breadcrumb links
  const links = [
    { label: "Мои камеры" },
    { label: `${params.id}`, path: `/cameras/${params.id}` },
    { label: `${params.class}` },
  ];

  // // State to store the identifiers of active players
  // const [activePlayers, setActivePlayers] = useState([]);

  // // Click handler for the player
  // const handlePlayerClick = (playerId) => {
  //   // Toggle the active state for each player independently
  //   if (activePlayers.includes(playerId)) {
  //     setActivePlayers(activePlayers.filter((id) => id !== playerId));
  //   } else {
  //     setActivePlayers([...activePlayers, playerId]);
  //   }
  // };

  // List of players
  const players = [
    {
      id: "player1",
      title: "Birch 1",
      src: "https://player.vimeo.com/video/220210162?color=67a8e4&amp;title=0&amp;byline=0&amp;portrait=0",
    },
    {
      id: "player2",
      title: "Birch 2",
      src: "https://player.vimeo.com/video/220210162?color=67a8e4&amp;title=0&amp;byline=0&amp;portrait=0",
    },
    {
      id: "player3",
      title: "Birch 3",
      src: "https://player.vimeo.com/video/220210162?color=67a8e4&amp;title=0&amp;byline=0&amp;portrait=0",
    },
    {
      id: "player4",
      title: "Birch 4",
      src: "https://player.vimeo.com/video/220210162?color=67a8e4&amp;title=0&amp;byline=0&amp;portrait=0",
    },
    {
      id: "player5",
      title: "Birch 5",
      src: "https://player.vimeo.com/video/220210162?color=67a8e4&amp;title=0&amp;byline=0&amp;portrait=0",
    },
    {
      id: "player6",
      title: "Birch 6",
      src: "https://player.vimeo.com/video/220210162?color=67a8e4&amp;title=0&amp;byline=0&amp;portrait=0",
    },
  ];

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs links={links} />
          <Row>
            <Col xl={9} lg={9} md={12}>
              <Card>
                <CardBody>
                  {/* <CardTitle>{params.id}</CardTitle>
                  <CardSubtitle>{params.class}</CardSubtitle> */}
                  <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
                    <iframe
                      title={params.class}
                      id="player5"
                      className="embed-responsive-item"
                      src="https://player.vimeo.com/video/220210162?color=67a8e4&amp;title=0&amp;byline=0&amp;portrait=0"
                      allowFullScreen
                      allow="autoplay; fullscreen"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CamerasClass;
