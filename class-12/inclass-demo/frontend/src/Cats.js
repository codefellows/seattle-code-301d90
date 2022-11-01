import { Component } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';

class Cats extends Component {
  render() {
    let cats = this.props.cats.map(cat => (
      <Cat cat={cat} key={cat._id} handleDelete={this.props.handleDelete}/>
    ))
    return (
      <Container>
        <ListGroup>
          {cats}
        </ListGroup>
      </Container>
    )
  }
}

class Cat extends Component {

  render() {
    console.log(this.props.cat);
    return (
      <ListGroup.Item>
        {this.props.cat.name} is {this.props.cat.color} cat
        <Button variant="dark" onClick={() => {this.props.handleDelete(this.props.cat._id)}}>Delete</Button>
      </ListGroup.Item>
    )
  }
}

export default Cats;