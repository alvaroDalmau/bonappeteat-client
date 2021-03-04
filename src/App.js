//IMPORTED LIBRARIES
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import config from './config';

//IMPRTED COMPONENTS
// import NavBar from './components/NavBar';

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
        {/* <NavBar user={loggedInUser}/> */}
        <Switch>
          <Route patch="/" user={loggedInUser} />
          <Route patch="/restaurant" />
          <Route patch="/profile" user={loggedInUser} />
        </Switch>
      </React.Fragment>
    );
  }
}
