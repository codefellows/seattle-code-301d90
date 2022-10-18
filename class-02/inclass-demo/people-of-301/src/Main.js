import React from 'react';
import Person from './Person.js';
import data from './data.json';
import './Main.css';

class Main extends React.Component {
  render() {
    let people = [];

    data.forEach((student, index)=>{
      people.push(
        <Person 
          name={student.name}
          imageURL={student.imageURL}
          key={index}
        />
      )
    });



    return (
      <>
        <main>
          {people}
        </main>
      </>
    )
  }
}

export default Main;