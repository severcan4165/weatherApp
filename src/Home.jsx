import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Home.css";

const apiKey = process.env.REACT_APP_apiKey;


const Home = () => {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([])
  const [weatherData, setWeatherData] = useState({
    description: "",
    name: "",
    temp: "",
    icon: "",
  });

  // const iconUrlAWS = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weatherData.icon}.svg`;
  // const icon1 = "http://openweathermap.org/img/wn/${weatherData.icon}.png";

  const getWeather = async (city) => {
    try {
      const data = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const {
        main: { temp },
        name,
        weather: [{ description }],
        weather: [{ icon }],
      } = data.data;
      setWeatherData({
        temp: temp,
        description: description,
        name: name,
        icon: `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg`,
      });
     
      setQuery("")
    } catch (error) {
      console.log(error);
    }
  };
  const updateCards = (info) => {
    if (cards.length < 5 && info.name !== "") {
      setCards([...cards, info])
    } else {
      const tempCard = cards.slice(1);
      setCards([...tempCard, info])
    }
  };

  useEffect(() => {
   updateCards(weatherData)
  },[weatherData])
  

  const handleEnter = (e) =>{
    if(e.keyCode === 13){
      getWeather(query);
    }
  }
  const handleSearch = (e) => {
    e.preventDefault();
    
    // console.log(query)
    getWeather(query);
  };

  return (
    <>
   
      <Container className="mt-5">
      <Row className="ms-auto p-5">
        <Col md={9} className="g-3">
          <InputGroup className="w-100">
            <Form.Control
              placeholder="Enter a City Name"
              aria-label="Username"
              aria-describedby="basic-addon1"
              size="lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleEnter}
            />
          </InputGroup>
        </Col>
        <Col md={3} className="g-3">
          <Button
            className="btnn"
            size="lg"
            onClick={handleSearch}
            variant="danger"
          >
            Search
          </Button>
        </Col>
      </Row>

      <Row className="ms-auto justify-content-center p-5">
        {(cards.slice(1)?.map((item, index) => {
          return (
            <Col className="g-3" xs={{ order: (cards.length - index) }} sm={6} md={4} lg={3} key={index}>
              <Card style={{ width: "100%" }}>
                <Card.Img variant="top" src={item.icon} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Card.Text>{Math.round(item.temp)}°C</Card.Text>
                </Card.Body>
              </Card>
            </Col>

          )
        }))}
      </Row>
    </Container>
    </>

  );
};

export default Home;
