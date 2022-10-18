import React from 'react';
import './Person.css';
import Button from 'react-bootstrap/Button'

class Person extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      waves: 0,
      helpMe: false,
    };
  };

  needsHelp = () => {
    this.setState({
      helpMe: true,
    });
  }

  gotHelp = () => {
    this.setState({
      helpMe: false,
    })
  }

  handleWaves = () => {
    this.setState({
      waves: this.state.waves + 1,
    });
  }

  render(){
    console.log('app state', this.state);
    return(
      <article>
        <h3>{this.props.name}</h3>
        <p>💙 {this.state.waves} Greetings</p>
        <p onClick={this.handleWaves}>Say Hello!</p>
        <img src={this.props.imageURL} alt={this.props.name} />
        <Button onClick={this.needsHelp}variant="danger">Help!</Button>
        <Button onClick={this.gotHelp} variant="success">I got Help</Button>
        <div>{this.state.helpMe ? 'I need help' : ''}</div>
      </article>
    )
  }
}

export default Person;