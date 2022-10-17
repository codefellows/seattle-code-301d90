import React from 'react';
import Person from './Person.js'


class Main extends React.Component {
  render() {
    return (
      <>
        <main>
          <Person
            name="Zoe"
            course="301d90"
          />
          <Person name="Marc" />
          <Person name="Kenny" />
          <Person name="Hunter" />
          <Person name="Dennis" />
        </main>
      </>
    )
  }
}

export default Main;