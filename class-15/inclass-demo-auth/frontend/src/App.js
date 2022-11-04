import React from 'react';
import Login from './Login';
import Logout from './Logout';
import Profile from './Profile';
import BestBooks from './BestBooks';
import { withAuth0 } from '@auth0/auth0-react';

class App extends React.Component {
  render() {
    return (
      <>
        <h1>Can of Books - Auth Demo</h1>
        {this.props.auth0.isAuthenticated ?
          <>
            <Profile />
            <BestBooks />
            <Logout />
          </>
          :
          <Login />
        }

      </>
    )
  }
}
export default withAuth0(App);
