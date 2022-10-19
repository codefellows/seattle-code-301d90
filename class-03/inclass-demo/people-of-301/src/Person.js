import React from 'react';
import './Person.css';
import Button from 'react-bootstrap/Button'
import { Card, Col } from 'react-bootstrap';

class Person extends React.Component {
  constructor(props) {
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

  handleNameClick = () => {
    this.props.handleOpenModal(this.props.name)
  }

  render() {
    console.log('app state', this.state);
    return (
      <Col>
        <Card>
          <Card.Title onClick={this.handleNameClick}>{this.props.name}</Card.Title>
          <p>{this.state.waves}  👋</p>
          <p onClick={this.handleWaves}>Say Hello!</p>
          <Card.Img
            src={this.props.imageURL}
            alt={this.props.name}
            onClick={this.props.addHearts}
          />
          <Button onClick={this.needsHelp} variant="danger">Help!</Button>
          <Button onClick={this.gotHelp} variant="success">I got Help</Button>
          <div>{this.state.helpMe ? 'I need help' : ''}</div>
        </Card>
      </Col>
    )
  }
}

export default Person;