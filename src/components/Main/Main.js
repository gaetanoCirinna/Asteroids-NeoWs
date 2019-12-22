import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asteroidi: [],
      distanzaAsteroidi: [],
      days: 0
    };
  }
  componentWillMount() {
    axios
      .get(
        "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-15&end_date=2015-09-09&api_key=A2aA1MY7wB6tu4GngyjkdRK0NrPacqgb0u831nH6"
      )
      .then(res => {
        const { days } = this.state;
        const aste = res.data;
        const near_earth_objects = [Object.values(aste.near_earth_objects)[0]];
        const arrNearObjs = Object.values(near_earth_objects)[0];

        const asteroidi = [...Object.values(aste.near_earth_objects)[days]];
        this.setState({
          asteroidi: asteroidi,
          distanzaAsteroidi: [
            ...arrNearObjs.map(ele => {
              return ele;
            })
          ]
        });

        //console.log(viamare[0].map(ele => ele.links.self));
      });
  }
  render() {
    const { asteroidi, distanzaAsteroidi, days } = this.state;

    const arrDistance = distanzaAsteroidi.map(ele => {
      return ele.close_approach_data[0].miss_distance.astronomical;
    });
    const arrVelocity = distanzaAsteroidi.map(ele => {
      return ele.close_approach_data[0].relative_velocity.kilometers_per_second;
    });

    let maxX = Math.max(...arrVelocity);
    let maxY = Math.max(...arrDistance);
    let biggerMagnitude = Math.max(
      ...asteroidi.map(ele => {
        return ele.absolute_magnitude_h;
      })
    );
    let biggerDiameter = Math.max(
      ...asteroidi.map(ele => {
        return ele.estimated_diameter.kilometers.estimated_diameter_max;
      })
    );

    console.log(days);
    //Funzione map che genere le robe sotto. Implementare la dimensione, creare il resto
    const showAsteroids = asteroidi.map((ele, index) => {
      let x = 0;
      x = arrVelocity[index];
      let y = 0;
      y = arrDistance[index];
      let diameter = 0;
      diameter = ele.estimated_diameter.kilometers.estimated_diameter_max;

      const mystyle = {
        top: `${(y / maxY) * 100}%`,
        left: `${(x / maxX) * 100}%`,
        width: `${(diameter / biggerDiameter) * 50 + 50}px`,
        height: `${(diameter / biggerDiameter) * 50 + 50}px`
      };
      return (
        <div key={index}>
          <span
            key={index}
            style={mystyle}
            data-value={`Name: ${ele.name},
            Diameter:
              ${ele.estimated_diameter.kilometers.estimated_diameter_max}
              Magnitude: ${ele.absolute_magnitude_h}
              Distance: ${ele.close_approach_data[0].miss_distance.kilometers}
              Velocity: ${ele.close_approach_data[0].relative_velocity.kilometers_per_hour}`}
          >
            <div className="dot"></div>
          </span>
        </div>
      );
    });
    const arrMagnitudeFive = asteroidi
      .map(ele => ele.absolute_magnitude_h)
      .sort((a, b) => a - b)
      .slice(0, 5);
    console.log(arrMagnitudeFive);

    console.log(arrMagnitudeFive);
    const showBright = asteroidi.map((ele, index) => {
      const magnitude = ele.absolute_magnitude_h;
      const mystyle = {
        width: `${(magnitude / biggerMagnitude) * 34}px`,
        height: `${(magnitude / biggerMagnitude) * 34}px`
      };
      for (let i = 0; i < arrMagnitudeFive.length; i++) {
        if (magnitude === arrMagnitudeFive[i]) {
          console.log(index);
          return (
            <div className="sidebar-list__content" key={index}>
              <div className="sidebar-list__rect" style={mystyle}>
                <div className="dot"></div>
              </div>
              <div className="sidebar-list__text">
                <p>Name: {ele.name}</p>
                <p>
                  Diameter:{" "}
                  {ele.estimated_diameter.kilometers.estimated_diameter_max}
                </p>
                <p>Magnitude: {ele.absolute_magnitude_h}</p>
              </div>
            </div>
          );
        }
      }
    });

    return (
      <Container fluid={true} className="content">
        <Row>
          <Col xs={8}>
            <div className="asteroids-container">
              <h1 className="main-title">Asteroids of the day</h1>
              <div className="nav">
                <div className="nav__days">
                  <h3>Select one day to update the chart:</h3>
                  <ul>
                    <li className="active">
                      <span
                        onClick={() => {
                          this.setState({ days: 0 });
                        }}
                      >
                        mon
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={() => {
                          this.setState({ days: 1 });
                        }}
                      >
                        mon
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={() => {
                          this.setState({ days: 2 });
                        }}
                      >
                        mon
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={() => {
                          this.setState({ days: 3 });
                        }}
                      >
                        mon
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={() => {
                          this.setState({ days: 4 });
                        }}
                      >
                        mon
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={() => {
                          this.setState({ days: 5 });
                        }}
                      >
                        mon
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={() => {
                          this.setState({ days: 6 });
                        }}
                      >
                        mon
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="nav__diameter">
                  <h3>DIAMETER</h3>
                  <div className="nav__diameter__oval">
                    <div className="dot__big"></div>
                    <div className="dot__small">
                      <p>Min km</p>
                    </div>
                  </div>
                  <div className="nav__diameter__oval --right">
                    <div className="dot__big--bigger"></div>
                    <div className="dot__small">
                      <p>Max km</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="coso">
                <div className="prova">{showAsteroids}</div>
              </div>
            </div>
          </Col>
          <Col xs={4} style={{ borderLeft: `1px solid #fff` }}>
            <div className="sidebar">
              <h1>Brightest of the day</h1>
              <h2>
                MAGNITUDE <span>(H)</span>
              </h2>
              <div className="sidebar-rect-content">
                <div className="sidebar-rect"></div>
                <p>Filled area: magnitude</p>
              </div>
              <div className="sidebar-rect-content">
                <div className="sidebar-rect sidebar-rect--empty"></div>
                <p>Filled area: magnitude</p>
              </div>

              <div className="sidebar-list">{showBright}</div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;
