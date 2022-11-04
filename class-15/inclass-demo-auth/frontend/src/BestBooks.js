import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


class BestBooks extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      books: []
    }
  }

  async componentDidMount(){
    if(this.props.auth0.isAuthenticated){
      const res = await this.props.auth0.getIdTokenClaims();

      const jwt = res.__raw;

      console.log('token:  ', jwt);

      const config = {
        headers: { "Authorization": `Bearer ${jwt}`},
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books'
      }

      let bookData = await axios(config);

      this.setState({
        books: bookData.data
      })
    }
  }

  render(){
    return(
      <>
      <h1>Books...we hope</h1>

      <ul>
        {this.state.books.map(book => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>
      </>
    )
  }
}

export default withAuth0(BestBooks);