//IMPORTED LIBRARIES
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import config from './config';
import NavBar from './components/NavBar';
import Home from './components/Home.js';
import RestaurantDetails from './components/RestaurantDetails'
//IMPRTED COMPONENTS
// import NavBar from './components/NavBar';

//RUNNING UP
class App extends Component {
  state = {
    loggedInUser: null,
  };

  componentDidMount() {
    if (!this.state.loggedInUser) {
      axios
        .get(`${config.API_URL}/api/user`, { withCredentials: true })
        .then((response) => {
          // this.setState({
          loggedInUser: response.data;
          // });
        })
        .catch(() => {
          console.log("Error grabing data from user session");
        });
    }
  }

  render() {
    //variable declaration
    const { loggedInUser, restaurants } = this.state;
    //running
    return (
      <React.Fragment>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Home user={loggedInUser} />;
            }}
          />

          <Route
            exact
            path="/restaurant/:restaurantId"
            component={RestaurantDetails}
            user={loggedInUser}
          />
          <Route path="/profile" user={loggedInUser} />
        </Switch>
      </React.Fragment>
    );
  }
}
export default App
