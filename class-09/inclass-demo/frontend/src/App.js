import React from 'react';
import './App.css';
import { Button, Carousel, Container, Form } from 'react-bootstrap';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      photoData: [],
      showImages: false,
      photoError: false,
      photoErrorMessage: '',
    }
  }
  handleInput = (e) => {
    let searchQuery = e.target.value;

    this.setState({
      searchQuery
    })
  };
  getPhotos = async (e) => {
    e.preventDefault();

    try {
      let results = await axios.get(`${process.env.REACT_APP_SERVER}/photos?searchQuery=${this.state.searchQuery}`)
      this.setState({
        photoData: results.data,
        showImages: true,
        photoError: false,
        photoErrorMessage: ''
      })
    } catch (error) {
      this.setState({
        photoError: true,
        showImages: false,
        photoErrorMessage: `A Photo Error Occurred: ${error.response.status}, ${error.response.data}`

      })
    }
  }

  render() {
    let carouselItems = this.state.photoData.map((pic, index) => (
      <Carousel.Item key={index}>
        <img
          className="d-block w-100"
          src={pic.src}
          alt={pic.alt}
        />
        <Carousel.Caption>
          <h3 style={{ backgroundColor: 'teal', borderRadius: '5px', width: 'max-content', margin: 'auto', padding: '5px' }}>Photo by: {pic.artist}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    ))
    return (
      <>
        <h1>Image Finder</h1>
        <Container>
          <Form onSubmit={this.getPhotos} style={{ width: 'max-content', margin: 'auto' }}>

            <Form.Group controlId="searchQuery">
              <Form.Label>What do you want to see?</Form.Label>
              <Form.Control type="text" onInput={this.handleInput} />
            </Form.Group>
            <Button type="submit">Find Photos</Button>
          </Form>
        </Container>
        {
          this.state.showImages &&
          <>
          <Container>
            <Carousel>
              {carouselItems}
            </Carousel>
          </Container>
        </>
        }
      </>
    )
  }
}

export default App;