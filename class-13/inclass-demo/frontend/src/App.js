import React from 'react';
import './App.css';
import axios from 'axios';
import Cats from './Cats.js';
import { Button, Container, Form } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
    }
  }

  getCats = async () => {
    try {
      // make a call to my server/cats to get cats
      let catData = await axios.get(`${process.env.REACT_APP_SERVER}/cats`);
      // catData.data
      this.setState({
        cats: catData.data
      });

    } catch (error) {
      console.log('we have an error: ', error.response);
    }
  }

  handleCatSubmit = (event) => {
    event.preventDefault();
    let newCat = {
      name: event.target.name.value,
      color: event.target.color.value,
      spayNeuter: event.target.spayNeuter.checked,
      location: event.target.location.value
    }
    console.log(newCat);

    // TODO: post my cat to my DB - another handler
    this.postCats(newCat);
  }

  postCats = async (newCatObj) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/cats`;

      let createdCat = await axios.post(url, newCatObj);
      
      this.setState({
        cats: [...this.state.cats, createdCat.data]
      })
      
    } catch (error) {
      console.log(error.message);
    }
  }

  deleteCats = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/cats/${id}`;

      await axios.delete(url);

      let updatedCats = this.state.cats.filter(cat => cat._id !== id);

      this.setState({
        cats: updatedCats
      });


    } catch (error) {
      console.log(error.message);
    }
  }

  updateCats = async (catToUpdate) => {
    try {

      let url = `${process.env.REACT_APP_SERVER}/cats/${catToUpdate._id}`
      let updatedCat = await axios.put(url, catToUpdate);

      let updatedCatArray = this.state.cats.map(existingCat => {
        return existingCat._id === catToUpdate._id
        ? updatedCat.data
        : existingCat
      });

      this.setState({
        cats: updatedCatArray
      });
      
    } catch (error) {
      console.log(error.message);
    }

  }

  // REACT LIFECYCLE METHOD - FUNCTION WILL RUN AS SOON AS COMPONENT IS ADDED TO THE DOM TREE
  componentDidMount() {
    this.getCats();
  }

  render() {
    console.log('App State >>>', this.state);

    return (
      <>
        <header>
          <h1>Cool Cats</h1>
        </header>
        <main>
          {
            this.state.cats.length > 0 &&
            <>
              <Cats 
              cats={this.state.cats}
              handleDelete={this.deleteCats}
              updateCats={this.updateCats}
              />
            </>
          }
          <Container className="mt-5">
            <Form onSubmit={this.handleCatSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="color">
                <Form.Label>Color</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="spayNeuter">
                <Form.Check type="checkbox" label="spay-neuter" />
              </Form.Group>
              <Button type="submit">Add Cat</Button>
            </Form>
          </Container>
        </main>
      </>
    );
  }
}

export default App;
