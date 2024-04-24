import React, { useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";

const CamerasId = () => {
  // Get the parameter from the URL
  const params = useParams();
  // Set the page title using the parameter from the URL
  document.title = `Мои камеры | ${params.id}`;
  // Formulate the breadcrumb links
  const links = [{ label: "Мои камеры" }, { label: `${params.id}` }];

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

  const router = useNavigate();
  const handleCardClick = (myClass) => {
    router(`/cameras/${params.id}/${myClass}`);
  };

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
            {players.map((player) => (
              <Col key={player.id} xl={4} lg={6} md={6}>
                <Card
                  style={{ cursor: "pointer" }}
                  onClick={() => handleCardClick(player.title)}
                >
                  <CardBody>
                    <CardTitle>{player.title}</CardTitle>
                    <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
                      <iframe
                        title={player.id}
                        id={player.id}
                        className="embed-responsive-item"
                        src={player.src}
                        allowFullScreen
                        allow="autoplay; fullscreen"
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CamerasId;
