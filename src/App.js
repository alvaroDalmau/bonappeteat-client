//IMPORTED LIBRARIES
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import config from './config';

//IMPRTED COMPONENTS
import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';
import Restaurant from './components/Restaurant';

//RUNNING UP
export default class App extends Component {
  state = {
    loggedInUser: null,
  };

  componentDidMount() {
    if (!this.state.loggedInUser) {
      axios
        .get(`${config.API_URL}/api/user`, { withCredentials: true })
        .then(response => {
          console.log(response);
          this.setState({
            loggedInUser: response.data,
          });
        })
        .catch(() => {
          console.log('Error grabing data from user session');
        });
    }
  }

  render() {
    //variable declaration
    const { loggedInUser } = this.state;

    //running
    return (
      <React.Fragment>
        <NavBar user={loggedInUser} />
        <Switch>
          <Route exact path="/" user={loggedInUser} />
          <Route
            path="/restaurant/:id"
            render={routeProps => {
              <Restaurant {...routeProps} />;
            }}
          />
          <Route
            path="/profile"
            render={() => {
              return <UserProfile user={loggedInUser} />;
            }}
          />
        </Switch>
      </React.Fragment>
    );
  }
}
