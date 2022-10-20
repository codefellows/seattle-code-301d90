import React from 'react';
import { Form, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

let data = [1,2,3,4,5,6,7,8,9,10];

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      selectedVal: '',
      sortedData: data
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let userName = event.target.name.value;
    let selected = event.target.selected.value;

    this.setState({
      name: userName,
      selectedVal: selected
    });

    console.log('From state in handleSubmit', this.state.name + ' ' + this.state.selectedVal)
  }

  handleInput = (event) => {
    let userName = event.target.value;
    this.setState({
      name: userName
    });
  }

  handleSelect = (event) => {
    let selected = event.target.value;

    if(selected === 'even'){
      let newData = data.filter(num => num % 2 === 0);
      this.setState({
        sortedData: newData
      })
    } else if(selected === 'odd'){
      let newData = data.filter(num => num % 2 === 1);
      this.setState({
        sortedData: newData
      })
    } else {
      // all - give the original data
      this.setState({
        sortedData: data
      })
    }
   
  }

  render(){
    console.log('From state in Render', this.state.name + ' ' + this.state.selectedVal)
    let numbers = this.state.sortedData.map((num, index) => {
      return <ListGroup.Item key={index}>{num}</ListGroup.Item> 
    })
    return (
      <>
      <header>
        <h1>Forms in React</h1>
      </header>

      <main>
        <ListGroup>
          {numbers}
        </ListGroup>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label>Name: 
            <Form.Control type="text" name="name" onInput={this.handleInput}/>
          </Form.Label>

          <Form.Label htmlFor="age">Age:</Form.Label>
          <Form.Control id="age" type="number" />

          <Form.Group>
            <legend>Selected Numbers</legend>
            <Form.Select name="selected" id="" onChange={this.handleSelect}>
              <option value="all">All</option>
              <option value="even">Even</option>
              <option value="odd">Odd</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </main>
      </>
    )
  }
}

export default App;


/*
  <form onSubmit={this.handleSubmit}>
          <label>Name: 
            <input type="text" name="name" onInput={this.handleInput}/>
          </label>

          <fieldset>
            <legend>Selected Numbers</legend>
            <select name="selected" id="" onChange={this.handleSelect}>
              <option value="all">All</option>
              <option value="even">Even</option>
              <option value="odd">Odd</option>
            </select>
          </fieldset>
          <button type="submit">Submit</button>
        </form>



*/