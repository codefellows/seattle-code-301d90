// imports
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import './App.css';


// class component
class App extends React.Component{
  render(){
    return (
      <>
      <Header />
      <Main />
      <footer>Code Fellows, 2022</footer>
      </>
    )
  }
}



// export
export default App;
