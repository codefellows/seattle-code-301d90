import { Component } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import UpdateCatForm from './UpdateCatForm.js';

class Cats extends Component {
  render() {
    let cats = this.props.cats.map(cat => (
      <Cat 
        cat={cat} 
        key={cat._id} 
        handleDelete={this.props.handleDelete}
        updateCats={this.props.updateCats}
      />
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
  constructor(props){
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }

  render() {
    console.log(this.props.cat);
    return (
      <>
      <ListGroup.Item>
        {this.props.cat.name} is {this.props.cat.color} cat
        <Button variant="dark" onClick={() => {this.props.handleDelete(this.props.cat._id)}}>Delete</Button>
        <Button variant="info" onClick={() => this.setState({ showUpdateForm: true })}>Update</Button>
      </ListGroup.Item>
      {
        this.state.showUpdateForm &&
        <UpdateCatForm 
          cat={this.props.cat}
          updateCats={this.props.updateCats}
        />
      }
      </>
    )
  }
}

export default Cats;