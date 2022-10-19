// imports
import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import './App.css';
import Modal from 'react-bootstrap/Modal';
import data from './data.json';

// class component
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      heart: '',
      showModal: false,
      selectedPerson: ''
    }
  }

  addHearts = () => {
    this.setState({
      heart: this.state.heart + '♥️'
    })
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    })
  }

  handleOpenModal = (name) => {
    this.setState({
      showModal: true,
      selectedPerson: name,
    })
  }

  render(){
    return (
      <>
      <Header 
        heart={this.state.heart}
      />
      <Main 
        addHearts={this.addHearts}
        handleOpenModal={this.handleOpenModal}
        data={data}
      />
      <Modal 
        show={this.state.showModal}
        onHide={this.handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.state.selectedPerson}</Modal.Title>

        </Modal.Header>

      </Modal>
      <footer>Code Fellows, 2022</footer>
      </>
    )
  }
}



// export
export default App;
