//IMPORTED LIBRARIES
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import config from "./config";

//IMPRTED COMPONENTS
import NavBar from "./components/NavBar";
import Home from "./components/Home.js";
import RestaurantDetails from "./components/RestaurantDetails";
import UserProfile from "./components/UserProfile";

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
          console.log(response);
          this.setState({
            loggedInUser: response.data,
          });
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
        <NavBar user={loggedInUser} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Home user={loggedInUser} />;
            }}
          />
          <Route
            path="/restaurant/:restaurantId"
            render={(routeProps) => {
              <RestaurantDetails {...routeProps} />;
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
export default App;
