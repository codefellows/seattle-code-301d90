import React from 'react';
import Person from './Person.js';
import './Main.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Main extends React.Component {
  render() {
    let people = this.props.data.map((student, index)=>{
        return <Person 
          name={student.name}
          imageURL={student.imageURL}
          key={index}
          addHearts={this.props.addHearts}
          handleOpenModal={this.props.handleOpenModal}
        />
    });



    return (
      <>
        <main>
          <Container>
            <Row xs={1} sm={2} md={3} lg={4}>
              {people}
            </Row>
          </Container>
        </main>
      </>
    )
  }
}

export default Main;