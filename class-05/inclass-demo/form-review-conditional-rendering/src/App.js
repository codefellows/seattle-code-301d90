import React from 'react';
import Weather from './Weather';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      weatherData: true
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('this was submitted', this.state.city);
    // call out to our LocationIQ API
  }

  // need this handler so input is on change when the form is submitted
  handleInput = (event) => {
    this.setState({
      city: event.target.value
    });
  }



  render() {

    return (
      <>
        <header>
          <h1>Forms in React</h1>
        </header>

        <main>
          <form onSubmit={this.handleSubmit}>
            <label>Pick a City:

              <input type="text" onInput={this.handleInput} />
            </label>
            <button type="submit">Explore!</button>
          </form>
        </main>

        {/* conditional rendering using a ternary */}
        {
          this.state.weatherData ? <Weather /> : null
        }
        {/* conditional rendering using a short circuit */}
        {this.state.weatherData && <Weather/>}

      </>
    )
  }
}

export default App;


