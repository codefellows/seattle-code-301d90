import React from 'react';
import Accordion from 'react-bootstrap/Accordion';


class Weather extends React.Component {
  render() {
    return (
      <>
        <h1>Forecast Data</h1>
        <Accordion defaultActiveKey="0">
          {this.props.weatherData.map((day, index) =>
            <Accordion.Item key={index} eventKey={index}>
              <Accordion.Header>
                {day.date}
              </Accordion.Header>
              <Accordion.Body>
                {day.description}
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      </>
    )
  }
}

export default Weather;