import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Figure from 'react-bootstrap/Figure';
import './App.css';
import Weather from './Weather';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: null,
      map: '',
      error: false,
      errorMessage: '',
      weatherData: []
    }
  }

  handleInput = e => {
    this.setState({
      city: e.target.value
    });
  }

  getCityData = async e => {
    e.preventDefault();
    try {
      // TODO: call out to locationIQ and get data based on userInput
      let locationURL = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      // TODO: save data, render map
      let locationData = await axios.get(locationURL);
      let cityToDisplay = locationData.data[0];

      let mapURL = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityToDisplay.lat},${cityToDisplay.lon}&zoom=14&markers=icon:small-red-cutout|${cityToDisplay.lat},${cityToDisplay.lon}`

      // ** CALLING IT WITH MY CITY AS AN ARG(Coming from locationIQ - see line 35)
      this.getWeatherData(cityToDisplay);

      this.setState({
        cityData: cityToDisplay,
        map: mapURL,
        error: false,
      });

    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      });
    }

  }

  // TODO: get weather data from our own backend server
  // ** passing weatherData handler a parameter so that I can feed it the information coming from LocationIQ
  getWeatherData = async (location) => {
    try {
      // TODO: axios to hit my backend server - need to send it cityName, lat, lon
      // ** front-end axios.get(http://localhost:3001/weather?cityName=Seattle&lat=anothervalue&lon=anothervalue)

      let url = `${process.env.REACT_APP_SERVER}/weather?cityName=${this.state.city}&lat=${location.lat}&lon=${location.lon}`

      console.log('weather url', url);

      let weatherData = await axios.get(url)

      this.setState({
        weatherData: weatherData.data
      });
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: error.message
      });
    }
  }

  // TODO: Render weather data in a separate Weather.js component


  render() {
    return (
      <>
        <h1>City Explorer</h1>

        <form onSubmit={this.getCityData}>
          <label>Pick a city:
            <input type="text" onInput={this.handleInput} />
          </label>
          <button type="submit">Explore!</button>
        </form>

        {/* TODO: Render City and Map data  - ternary*/}

        {
          this.state.error
            ?
            <Alert variant='warning'>{this.state.errorMessage}</Alert>
            :
            this.state.cityData &&
            <>
            <Figure>
              <Figure.Image
                width={400}
                height={400}
                alt="Map of city chosen by the user"
                src={this.state.map}
              />
              <Figure.Caption>
                {this.state.cityData.display_name}
              </Figure.Caption>
            </Figure>
            <Weather
              weatherData={this.state.weatherData}
            />
            </>
        }

      </>
    )
  }
}

export default App;
